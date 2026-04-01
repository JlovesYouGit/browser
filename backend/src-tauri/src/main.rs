// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    Manager, WebviewUrl, WebviewWindowBuilder,
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

/// Navigate to URL
#[tauri::command]
async fn navigate(
    window: tauri::Window,
    state: tauri::State<'_, BrowserState>,
    url: String,
) -> Result<String, String> {
    let parsed_url = url::Url::parse(&url).map_err(|e| format!("Invalid URL: {}", e))?;
    let window_id = window.label().to_string();
    {
        let mut windows = state.windows.lock().unwrap();
        windows.insert(window_id.clone(), url.clone());
    }
    window.emit("navigate", url.clone()).map_err(|e| e.to_string())?;
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
            navigate,
        ])
        .setup(|app| {
            let main_window = WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::App("index.html".into()),
            )
            .title("Agentic Browser")
            .inner_size(1400.0, 900.0)
            .min_inner_size(1000.0, 700.0)
            .center()
            .decorations(true)
            .transparent(true)
            .build()?;
            
            #[cfg(target_os = "macos")]
            {
                use tauri::TitleBarStyle;
                main_window.set_title_bar_style(TitleBarStyle::Overlay);
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
