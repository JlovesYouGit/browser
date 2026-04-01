# Frontend - Vue.js Native macOS Browser Application

## Purpose
A native macOS browser application built with Vue.js, providing an intuitive interface for monitoring, controlling, and visualizing the agentic browser system operations.

## Architecture Overview
The frontend is a modern Vue.js application optimized for macOS with Electron wrapper for native desktop capabilities:

### Core Features
- **Dashboard** - Real-time system monitoring with native macOS feel
- **Control Panel** - Agent configuration with native macOS controls
- **Reports Viewer** - Interactive reports with macOS-optimized visualizations
- **Rule Editor** - Visual rule configuration with native macOS forms
- **Activity Monitor** - Live agent activity with native macOS notifications
- **Settings** - System preferences using macOS System Preferences style

### macOS Native Features
- **Native Menu Bar** - macOS menu integration
- **Dock Integration** - App icon with badge notifications
- **Spotlight Search** - Search across agent data
- **Quick Look** - Preview files and reports
- **Share Menu** - Native macOS sharing capabilities
- **Notifications** - Native macOS notification system

## Technology Stack
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript with minimal boilerplate
- **State Management**: Pinia (official Vue state management)
- **Styling**: Less with CSS modules for component-scoped styles
- **UI Components**: Custom macOS-style components
- **Desktop Wrapper**: Electron for native macOS app
- **Build Tool**: Vite for fast development and building
- **Testing**: Vitest + Vue Test Utils

## Directory Structure
```
frontend/
├── src/
│   ├── components/      # Reusable Vue components
│   ├── views/           # Page-level Vue components
│   ├── composables/     # Vue composables (reusable logic)
│   ├── stores/          # Pinia stores
│   ├── services/        # API service functions
│   ├── utils/           # Utility functions and helpers
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # Global Less styles and themes
│   ├── assets/          # Static assets (images, icons)
│   └── electron/        # Electron main process files
├── public/              # Public assets and HTML template
├── tests/               # Component and unit tests
├── docs/                # Component documentation
├── dist/                # Build output
└── package.json         # Dependencies and scripts
```

## Vue.js Architecture

### Component Structure
- **Single File Components** (.vue files)
- **Composition API** for logic composition
- **TypeScript** for type safety
- **Scoped Styles** with Less preprocessing
- **Minimal Boilerplate** - clean, concise components

### State Management with Pinia
```typescript
// stores/agents.ts
import { defineStore } from 'pinia'

export const useAgentStore = defineStore('agents', {
  state: () => ({
    agents: [],
    activeAgent: null,
    loading: false
  }),
  getters: {
    activeAgents: (state) => state.agents.filter(a => a.status === 'active')
  },
  actions: {
    async fetchAgents() {
      this.loading = true
      try {
        const response = await api.getAgents()
        this.agents = response.data
      } finally {
        this.loading = false
      }
    }
  }
})
```

### Composables Pattern
```typescript
// composables/useBrowserControl.ts
import { ref } from 'vue'
import { useAgentStore } from '@/stores/agents'

export function useBrowserControl() {
  const agentStore = useAgentStore()
  const isNavigating = ref(false)
  
  const navigateTo = async (url: string) => {
    isNavigating.value = true
    try {
      await agentStore.navigateTo(url)
    } finally {
      isNavigating.value = false
    }
  }
  
  return {
    isNavigating,
    navigateTo
  }
}
```

## macOS Integration

### Electron Main Process
```typescript
// electron/main.ts
import { app, BrowserWindow, Menu } from 'electron'
import { createMainWindow } from './windows'

app.whenReady().then(() => {
  createMainWindow()
  
  // Set up macOS menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'Agentic Browser',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
})
```

### Native macOS Features
- **Menu Bar Integration** - Native macOS menu structure
- **Dock Badge Updates** - Show agent status in dock
- **Native File Dialogs** - macOS file picker dialogs
- **System Notifications** - Native macOS notifications
- **Quick Look Support** - Preview files with spacebar
- **Spotlight Integration** - Search agent data from Spotlight

## Styling with Less

### Component-Scoped Styles
```vue
<template>
  <div class="dashboard">
    <div class="metrics-grid">
      <!-- Dashboard content -->
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style lang="less" scoped>
.dashboard {
  padding: 20px;
  background: @macos-window-bg;
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: @spacing-lg;
    
    .metric-card {
      background: @macos-card-bg;
      border-radius: @macos-border-radius;
      box-shadow: @macos-shadow;
      
      &:hover {
        box-shadow: @macos-shadow-hover;
      }
    }
  }
}
</style>
```

### macOS Design System
```less
// styles/macos-variables.less
@macos-window-bg: #f2f2f7;
@macos-card-bg: #ffffff;
@macos-border-radius: 8px;
@macos-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
@macos-shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.15);
@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;

// macOS colors
@macos-blue: #007AFF;
@macos-green: #34C759;
@macos-red: #FF3B30;
@macos-orange: #FF9500;
@macos-gray: #8E8E93;
```

## Real-time Features
- **Live Monitoring** - Real-time agent status with WebSocket
- **Activity Feed** - Live stream of agent actions and events
- **Notifications** - Native macOS notifications for alerts
- **Auto-refresh** - Reactive data updates with Vue reactivity

## Data Visualization
- **Vue Charts** - Chart.js integration with Vue 3
- **D3.js Components** - Custom visualizations with Vue
- **Real-time Graphs** - Live updating charts and metrics
- **macOS Native Charts** - Native-feeling data visualization

## Security Considerations
- **Authentication** - JWT token management with Pinia
- **Authorization** - Role-based access control (RBAC)
- **XSS Protection** - Vue's built-in XSS protection
- **CSRF Protection** - Token-based CSRF prevention
- **Secure Storage** - Electron's secure storage APIs

## Performance Optimization
- **Vue 3 Reactivity** - Efficient reactivity system
- **Code Splitting** - Route-based and component-based
- **Lazy Loading** - Dynamic imports for components
- **Virtual Scrolling** - Efficient rendering of large lists
- **Electron Optimization** - Memory and performance tuning

## Development Workflow
- **Hot Module Replacement** - Vite HMR for fast development
- **TypeScript** - Static type checking and IDE support
- **ESLint + Prettier** - Code quality and formatting
- **Vue DevTools** - Vue-specific debugging tools
- **Electron DevTools** - Electron debugging integration

## Deployment
- **macOS Bundle** - .app bundle for distribution
- **Code Signing** - macOS developer certificate signing
- **Notarization** - Apple notarization for distribution
- **Auto-updater** - Electron auto-updater integration
- **App Store** - Mac App Store distribution option

## Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```
