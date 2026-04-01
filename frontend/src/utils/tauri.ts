import { invoke } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'

// Gemini API Key Management
export const saveApiKey = async (apiKey: string): Promise<void> => {
  return await invoke('save_api_key', { apiKey })
}

export const getApiKey = async (): Promise<string | null> => {
  return await invoke('get_api_key')
}

export const deleteApiKey = async (): Promise<void> => {
  return await invoke('delete_api_key')
}

export const hasApiKey = async (): Promise<boolean> => {
  return await invoke('has_api_key')
}

export const initializeGemini = async (): Promise<void> => {
  return await invoke('initialize_gemini')
}

// Gemini Chat
export interface ChatMessage {
  role: 'user' | 'model' | 'ai'
  content: string
  actions?: string[]
}

export const geminiChat = async (
  message: string,
  history: ChatMessage[]
): Promise<{ response: string; actions: string[] }> => {
  const result = await invoke<{ response: string; actions: string[] }>('gemini_chat', {
    message,
    history: history.map(msg => ({ role: msg.role, content: msg.content }))
  })
  return result
}

// Navigation commands
export const navigate = async (url: string): Promise<string> => {
  return await invoke('navigate', { url })
}

export const openBrowserTab = async (
  url?: string,
  title?: string
): Promise<string> => {
  return await invoke('open_browser_tab', { url, title })
}

export const closeBrowserTab = async (windowId: string): Promise<void> => {
  return await invoke('close_browser_tab', { windowId })
}

export const getCurrentUrl = async (windowId: string): Promise<string> => {
  return await invoke('get_current_url', { windowId })
}

// Window controls
export const getWindow = () => getCurrentWindow()

export const minimizeWindow = async () => {
  const window = getCurrentWindow()
  await window.minimize()
}

export const maximizeWindow = async () => {
  const window = getCurrentWindow()
  const isMaximized = await window.isMaximized()
  if (isMaximized) {
    await window.unmaximize()
  } else {
    await window.maximize()
  }
}

export const closeWindow = async () => {
  const window = getCurrentWindow()
  await window.close()
}

// Create a new browser window with WebView
// Note: WebviewWindow API changed in Tauri v2 - using invoke instead
export const createBrowserWindow = async (
  url: string = 'https://www.google.com',
  title: string = 'Agentic Browser'
): Promise<void> => {
  // In Tauri v2, use invoke to create browser window
  await invoke('create_browser_window', { url, title })
}
