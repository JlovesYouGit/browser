// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    Manager, Emitter,
};
use std::sync::Arc;
use std::collections::HashMap;

mod gemini;
use gemini::{GeminiClient, Content, Role, Part};

// Store browser windows state
pub struct BrowserState {
    windows: Arc<std::sync::Mutex<HashMap<String, String>>>,
    gemini_client: Arc<std::sync::Mutex<Option<GeminiClient>>>,
}

impl Default for BrowserState {
    fn default() -> Self {
        Self {
            windows: Arc::new(std::sync::Mutex::new(HashMap::new())),
            gemini_client: Arc::new(std::sync::Mutex::new(None)),
        }
    }
}

const KEYRING_SERVICE: &str = "agentic-browser";
const KEYRING_USERNAME: &str = "gemini-api-key";

/// Save Gemini API key to secure storage
#[tauri::command]
async fn save_api_key(api_key: String) -> Result<(), String> {
    if api_key.is_empty() {
        return Err("API key cannot be empty".to_string());
    }
    
    if !api_key.starts_with("AI") || api_key.len() < 20 {
        return Err("Invalid Gemini API key format".to_string());
    }
    
    let entry = keyring::Entry::new(KEYRING_SERVICE, KEYRING_USERNAME)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;
    
    entry.set_password(&api_key)
        .map_err(|e| format!("Failed to save API key: {}", e))?;
    
    Ok(())
}

/// Get Gemini API key from secure storage
#[tauri::command]
async fn get_api_key() -> Result<Option<String>, String> {
    let entry = keyring::Entry::new(KEYRING_SERVICE, KEYRING_USERNAME)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;
    
    match entry.get_password() {
        Ok(key) => Ok(Some(key)),
        Err(keyring::Error::NoEntry) => Ok(None),
        Err(e) => Err(format!("Failed to retrieve API key: {}", e)),
    }
}

/// Delete stored API key
#[tauri::command]
async fn delete_api_key() -> Result<(), String> {
    let entry = keyring::Entry::new(KEYRING_SERVICE, KEYRING_USERNAME)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;
    
    entry.delete_password()
        .map_err(|e| format!("Failed to delete API key: {}", e))?;
    
    Ok(())
}

/// Check if API key is configured
#[tauri::command]
async fn has_api_key() -> Result<bool, String> {
    let key = get_api_key().await?;
    Ok(key.is_some())
}

/// Initialize Gemini client with stored API key
#[tauri::command]
async fn initialize_gemini(state: tauri::State<'_, BrowserState>) -> Result<(), String> {
    let api_key = get_api_key().await?;
    
    if let Some(key) = api_key {
        let client = GeminiClient::new(key);
        let mut gemini_lock = state.gemini_client.lock().unwrap();
        *gemini_lock = Some(client);
        Ok(())
    } else {
        Err("No API key configured".to_string())
    }
}

/// Chat with Gemini (agentic with function calling)
#[tauri::command]
async fn gemini_chat(
    window: tauri::Window,
    state: tauri::State<'_, BrowserState>,
    message: String,
    history: Vec<serde_json::Value>,
) -> Result<serde_json::Value, String> {
    {
        let gemini_lock = state.gemini_client.lock().unwrap();
        if gemini_lock.is_none() {
            return Err("Gemini not initialized".to_string());
        }
    }
    
    let mut contents: Vec<Content> = history.into_iter()
        .filter_map(|msg| {
            let role_str = msg.get("role")?.as_str()?;
            let content_str = msg.get("content")?.as_str()?;
            
            let role = match role_str {
                "user" => Role::User,
                "model" | "ai" => Role::Model,
                _ => Role::User,
            };
            
            Some(Content {
                role,
                parts: vec![Part {
                    text: Some(content_str.to_string()),
                    function_call: None,
                    function_response: None,
                }],
            })
        })
        .collect();
    
    contents.push(Content {
        role: Role::User,
        parts: vec![Part {
            text: Some(message),
            function_call: None,
            function_response: None,
        }],
    });
    
    let window_id = window.label().to_string();
    let current_url = {
        let windows = state.windows.lock().unwrap();
        windows.get(&window_id).cloned().unwrap_or_default()
    };
    
    let mut tool_handlers: HashMap<String, Box<dyn Fn(serde_json::Value) -> Result<serde_json::Value, String> + Send + Sync>> = HashMap::new();
    
    let window_clone = window.clone();
    tool_handlers.insert("navigate".to_string(), Box::new(move |args| {
        let url = args.get("url").and_then(|v| v.as_str())
            .ok_or("Missing URL parameter")?;
        let _ = window_clone.emit("navigate", url);
        Ok(serde_json::json!({ "success": true, "action": "navigate", "url": url }))
    }));
    
    tool_handlers.insert("search".to_string(), Box::new(|args| {
        let query = args.get("query").and_then(|v| v.as_str())
            .ok_or("Missing query parameter")?;
        let search_url = format!("https://www.google.com/search?q={}", 
            urlencoding::encode(query));
        Ok(serde_json::json!({ "success": true, "action": "search", "query": query, "search_url": search_url }))
    }));
    
    let window_clone2 = window.clone();
    tool_handlers.insert("screenshot".to_string(), Box::new(move |_args| {
        let _ = window_clone2.emit("screenshot", ());
        Ok(serde_json::json!({ "success": true, "action": "screenshot" }))
    }));
    
    let current_url_clone = current_url.clone();
    tool_handlers.insert("get_page_content".to_string(), Box::new(move |_args| {
        Ok(serde_json::json!({ "success": true, "action": "get_page_content", "current_url": current_url_clone }))
    }));
    
    let client = {
        let gemini_lock = state.gemini_client.lock().unwrap();
        gemini_lock.as_ref().cloned().ok_or("Gemini not initialized")?
    };
    
    let response = client.chat_with_agentic_tools(contents, &mut tool_handlers).await
        .map_err(|e| format!("Gemini error: {}", e))?;
    
    Ok(serde_json::json!({ "response": response, "actions": [] }))
}

/// Create or update the browser webview in the main window
#[tauri::command]
async fn create_browser_window(
    handle: tauri::AppHandle,
    url: String,
    x: f64,
    y: f64,
    width: f64,
    height: f64,
) -> Result<(), String> {
    // Check if webview already exists
    if let Some(existing_webview) = handle.get_webview_window("browser") {
        existing_webview.set_size(tauri::LogicalSize::new(width, height)).map_err(|e: tauri::Error| e.to_string())?;
        existing_webview.set_position(tauri::LogicalPosition::new(x, y)).map_err(|e: tauri::Error| e.to_string())?;
        return Ok(());
    }

    // Create a new child webview window for the browser content
    let _window = tauri::WebviewWindowBuilder::new(&handle, "browser", tauri::WebviewUrl::External(url.parse().map_err(|e: url::ParseError| format!("Invalid URL: {}", e))?))
        .user_agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
        .build()
        .map_err(|e: tauri::Error| e.to_string())?;
    
    // Position it correctly relative to the parent window or screen?
    // In a premium macOS app, we want it to be a CHILD.
    let _ = _window.set_size(tauri::LogicalSize::new(width, height));
    let _ = _window.set_position(tauri::LogicalPosition::new(x, y));
    
    Ok(())
}

/// Resize the browser webview
#[tauri::command]
async fn resize_browser(
    handle: tauri::AppHandle,
    x: f64,
    y: f64,
    width: f64,
    height: f64,
) -> Result<(), String> {
    if let Some(webview) = handle.get_webview_window("browser") {
        webview.set_size(tauri::LogicalSize::new(width, height)).map_err(|e: tauri::Error| e.to_string())?;
        webview.set_position(tauri::LogicalPosition::new(x, y)).map_err(|e: tauri::Error| e.to_string())?;
    }
    Ok(())
}

/// Navigate the browser webview to a new URL
#[tauri::command]
async fn navigate(
    handle: tauri::AppHandle,
    url: String,
) -> Result<String, String> {
    let parsed_url = url::Url::parse(&url).map_err(|e: url::ParseError| format!("Invalid URL: {}", e))?;
    if let Some(webview) = handle.get_webview_window("browser") {
        webview.navigate(parsed_url.clone()).map_err(|e: tauri::Error| e.to_string())?;
    } else {
        return Err("Browser webview not found. Please initialize it first.".to_string());
    }
    Ok(format!("Navigated to {}", parsed_url))
}

fn main() {
    dotenvy::dotenv().ok();
    
    tauri::Builder::default()
        .manage(BrowserState::default())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![
            save_api_key, get_api_key, delete_api_key, has_api_key,
            initialize_gemini, gemini_chat,
            navigate, create_browser_window, resize_browser,
        ])
        .setup(|app| {
            if let Some(main_window) = app.get_webview_window("main") {
                #[cfg(target_os = "macos")]
                {
                    use tauri::TitleBarStyle;
                    let _ = main_window.set_title_bar_style(TitleBarStyle::Overlay);
                }
            }
            Ok(())
        })
        // The artifact protocol for loading local AI-generated artifacts
        // artifact://localhost/path/to/file -> maps to {workspace}/artifacts/path/to/file
        .register_uri_scheme_protocol("artifact", |_app, request| {
            let path = request.uri().path();
            
            // In a real app, we'd use the actual workspace path
            // For now, mapping to a relative artifacts directory
            let artifact_path = std::path::Path::new("05_reports/artifacts").join(path.trim_start_matches('/'));
            
            match std::fs::read(&artifact_path) {
                Ok(data) => {
                    let mime_type = if path.ends_with(".html") { "text/html" }
                                    else if path.ends_with(".js") { "application/javascript" }
                                    else if path.ends_with(".css") { "text/css" }
                                    else { "application/octet-stream" };
                    
                    tauri::http::Response::builder()
                        .header("Content-Type", mime_type)
                        .header("Access-Control-Allow-Origin", "*")
                        .body(data)
                        .unwrap()
                }
                Err(_) => {
                    tauri::http::Response::builder()
                        .status(404)
                        .body(Vec::<u8>::new())
                        .unwrap()
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
