use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;

const GEMINI_API_BASE: &str = "https://generativelanguage.googleapis.com/v1beta/models";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GeminiClient {
    api_key: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Content {
    pub role: Role,
    pub parts: Vec<Part>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum Role {
    User,
    Model,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Part {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub function_call: Option<FunctionCall>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub function_response: Option<FunctionResponse>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct FunctionCall {
    pub name: String,
    pub args: Value,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct FunctionResponse {
    pub name: String,
    pub response: Value,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Tool {
    pub function_declarations: Vec<FunctionDeclaration>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct FunctionDeclaration {
    pub name: String,
    pub description: String,
    pub parameters: Option<Value>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GenerateContentRequest {
    pub contents: Vec<Content>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tools: Option<Vec<Tool>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub generation_config: Option<GenerationConfig>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GenerationConfig {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_output_tokens: Option<i32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub top_p: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub top_k: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GenerateContentResponse {
    pub candidates: Option<Vec<Candidate>>,
    pub prompt_feedback: Option<PromptFeedback>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Candidate {
    pub content: Content,
    pub finish_reason: Option<String>,
    pub index: Option<i32>,
    pub safety_ratings: Option<Vec<SafetyRating>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SafetyRating {
    pub category: String,
    pub probability: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PromptFeedback {
    pub safety_ratings: Option<Vec<SafetyRating>>,
}

impl GeminiClient {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }

    pub async fn generate_content(
        &self,
        model: &str,
        request: GenerateContentRequest,
    ) -> Result<GenerateContentResponse, Box<dyn std::error::Error>> {
        let client = reqwest::Client::new();
        let url = format!(
            "{}/{}/generateContent?key={}",
            GEMINI_API_BASE, model, self.api_key
        );

        let response = client
            .post(&url)
            .json(&request)
            .send()
            .await?;

        if !response.status().is_success() {
            let error_text = response.text().await?;
            return Err(format!("Gemini API error: {}", error_text).into());
        }

        let result: GenerateContentResponse = response.json().await?;
        Ok(result)
    }

    pub fn create_agentic_tools() -> Vec<Tool> {
        vec![
            Tool {
                function_declarations: vec![
                    FunctionDeclaration {
                        name: "navigate".to_string(),
                        description: "Navigate to a specific URL in the browser".to_string(),
                        parameters: Some(json!({
                            "type": "object",
                            "properties": {
                                "url": {
                                    "type": "string",
                                    "description": "The URL to navigate to"
                                }
                            },
                            "required": ["url"]
                        })),
                    },
                    FunctionDeclaration {
                        name: "search".to_string(),
                        description: "Perform a web search with the given query".to_string(),
                        parameters: Some(json!({
                            "type": "object",
                            "properties": {
                                "query": {
                                    "type": "string",
                                    "description": "The search query"
                                }
                            },
                            "required": ["query"]
                        })),
                    },
                    FunctionDeclaration {
                        name: "screenshot".to_string(),
                        description: "Take a screenshot of the current page".to_string(),
                        parameters: Some(json!({
                            "type": "object",
                            "properties": {}
                        })),
                    },
                    FunctionDeclaration {
                        name: "get_page_content".to_string(),
                        description: "Get the text content of the current page".to_string(),
                        parameters: Some(json!({
                            "type": "object",
                            "properties": {}
                        })),
                    },
                ],
            },
        ]
    }

    pub async fn chat_with_agentic_tools(
        &self,
        messages: Vec<Content>,
        tool_handlers: &mut HashMap<String, Box<dyn Fn(Value) -> Result<Value, String> + Send + Sync>>,
    ) -> Result<String, Box<dyn std::error::Error>> {
        let tools = Self::create_agentic_tools();
        let mut current_messages = messages;
        
        loop {
            let request = GenerateContentRequest {
                contents: current_messages.clone(),
                tools: Some(tools.clone()),
                generation_config: Some(GenerationConfig {
                    temperature: Some(0.7),
                    max_output_tokens: Some(2048),
                    top_p: Some(0.95),
                    top_k: Some(40),
                }),
            };

            let response = self.generate_content("gemini-1.5-flash", request).await?;
            
            if let Some(candidates) = response.candidates {
                if let Some(candidate) = candidates.first() {
                    let content = &candidate.content;
                    
                    let mut tool_used = false;
                    for part in &content.parts {
                        if let Some(function_call) = &part.function_call {
                            if let Some(handler) = tool_handlers.get(&function_call.name) {
                                let result = handler(function_call.args.clone())?;
                                
                                current_messages.push(content.clone());
                                current_messages.push(Content {
                                    role: Role::User,
                                    parts: vec![Part {
                                        text: None,
                                        function_call: None,
                                        function_response: Some(FunctionResponse {
                                            name: function_call.name.clone(),
                                            response: result,
                                        }),
                                    }],
                                });
                                tool_used = true;
                                break;
                            }
                        }
                    }
                    
                    if tool_used {
                        continue;
                    }
                    
                    for part in &content.parts {
                        if let Some(text) = &part.text {
                            return Ok(text.clone());
                        }
                    }
                }
            }
            break;
        }
        
        Ok("No response from Gemini".to_string())
    }
}

#[derive(Debug, thiserror::Error)]
pub enum GeminiError {
    #[error("API key not configured")]
    ApiKeyNotConfigured,
    #[error("Request failed: {0}")]
    RequestFailed(String),
    #[error("Invalid response: {0}")]
    InvalidResponse(String),
}
