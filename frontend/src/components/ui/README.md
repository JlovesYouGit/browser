# UI Components

This directory contains Vue.js UI components for the agentic browser interface, converted from React components with enhanced features and TypeScript support.

## BrowserChrome Component

A sophisticated browser chrome component that mimics a real browser interface with window controls, address bar, and content area.

### Features

- ✅ **Native macOS window controls** (close, minimize, maximize)
- ✅ **Interactive address bar** with security indicators
- ✅ **Navigation icons** (refresh, bookmark, menu, user)
- ✅ **Animated dotted wave background** with depth effects
- ✅ **Glass morphism design** with backdrop filters
- ✅ **Responsive design** for different screen sizes
- ✅ **TypeScript support** with comprehensive prop interfaces
- ✅ **Event emission** for parent component integration

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | `'https://yoursite.com'` | Current URL displayed in address bar |
| `title` | `string` | `'Browser'` | Browser window title |
| `isLoading` | `boolean` | `false` | Loading state indicator |

### Events

| Event | Description | Payload |
|-------|-------------|---------|
| `refresh` | Refresh button clicked | - |
| `bookmark` | Bookmark button clicked | - |
| `menu` | Menu button clicked | - |
| `user` | User button clicked | - |

### Usage Examples

#### Basic Usage
```vue
<template>
  <BrowserChrome 
    url="https://agenticbrowser.com"
    title="Agentic Browser"
    @refresh="handleRefresh"
    @bookmark="handleBookmark"
  />
</template>

<script setup>
import { BrowserChrome } from '@/components/ui'

const handleRefresh = () => {
  console.log('Refreshing page')
}

const handleBookmark = () => {
  console.log('Bookmarking page')
}
</script>
```

#### With Loading State
```vue
<template>
  <BrowserChrome 
    :url="currentUrl"
    :is-loading="isLoading"
    @refresh="refreshPage"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BrowserChrome } from '@/components/ui'

const currentUrl = ref('https://example.com')
const isLoading = ref(false)

const refreshPage = async () => {
  isLoading.value = true
  // Simulate page refresh
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>
```

#### Global Registration
```typescript
// main.ts
import { createApp } from 'vue'
import { registerUIComponents } from '@/components/ui'
import App from './App.vue'

const app = createApp(App)
registerUIComponents(app)
app.mount('#app')
```

Then use anywhere:
```vue
<template>
  <BrowserChrome url="https://example.com" />
</template>
```

## GlassChatBox Component

A modern glass morphism chat interface with typing indicators and message history.

### Features

- ✅ **Glass morphism design** with backdrop blur
- ✅ **Real-time typing indicators** with animations
- ✅ **Message history** with timestamps
- ✅ **Status indicators** (online, offline, typing)
- ✅ **Responsive design** for mobile and desktop
- ✅ **Auto-scroll** to latest messages
- ✅ **Keyboard shortcuts** (Enter to send)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMessages` | `Message[]` | `[]` | Initial chat messages |
| `placeholder` | `string` | `'Type your message...'` | Input placeholder text |
| `status` | `'online' \| 'offline' \| 'typing'` | `'online'` | Chat status indicator |

### Message Interface

```typescript
interface Message {
  id: string
  text: string
  type: 'user' | 'assistant'
  timestamp: Date
}
```

### Usage Examples

#### Basic Chat
```vue
<template>
  <GlassChatBox 
    :initial-messages="messages"
    status="online"
    placeholder="Ask me anything..."
  />
</template>

<script setup>
import { ref } from 'vue'
import { GlassChatBox } from '@/components/ui'

const messages = ref([
  {
    id: '1',
    text: 'Hello! How can I help you?',
    type: 'assistant',
    timestamp: new Date()
  }
])
</script>
```

#### With Custom Status
```vue
<template>
  <GlassChatBox 
    status="typing"
    placeholder="Type your question..."
  />
</template>
```

## DottedWaveBackground Component

An animated SVG background with layered dot patterns creating a retro wave effect.

### Features

- ✅ **Multi-layered wave animations** with different speeds
- ✅ **Depth effects** with varying opacity and sizes
- ✅ **Performance optimized** with requestAnimationFrame
- ✅ **Responsive design** that adapts to container size
- ✅ **Reduced motion support** for accessibility
- ✅ **High DPI display optimization**

### Usage

```vue
<template>
  <div class="container">
    <DottedWaveBackground />
    <!-- Other content -->
  </div>
</template>

<script setup>
import { DottedWaveBackground } from '@/components/ui'
</script>
```

## Styling & Design System

### macOS Native Design

The components follow macOS design principles:

- **Window controls**: Native macOS colors and positioning
- **Typography**: SF Pro font family
- **Colors**: System colors with proper contrast
- **Animations**: Core Animation timing functions
- **Interactions**: Native macOS hover states

### Glass Morphism

Modern glass morphism effects with:

- **Backdrop filters**: `blur(20px)` for depth
- **Transparency**: `rgba(255, 255, 255, 0.05)` backgrounds
- **Borders**: `rgba(255, 255, 255, 0.1)` borders
- **Shadows**: Multiple shadow layers for depth

### Responsive Design

All components are responsive:

- **Mobile**: < 768px - Adjusted layouts and touch targets
- **Tablet**: 768px - 1024px - Optimized spacing
- **Desktop**: > 1024px - Full feature set

## Performance Optimizations

### BrowserChrome
- ✅ **Efficient reactivity** with computed properties
- ✅ **Optimized animations** with CSS transforms
- ✅ **Lazy loading** for heavy components
- ✅ **Memory management** with proper cleanup

### GlassChatBox
- ✅ **Virtual scrolling** for large message lists
- ✅ **Debounced input** for better performance
- ✅ **Optimized typing indicators**
- ✅ **Efficient DOM updates**

### DottedWaveBackground
- ✅ **RequestAnimationFrame** for smooth animations
- ✅ **Reduced motion support** for accessibility
- ✅ **High DPI optimization**
- ✅ **Memory-efficient dot generation**

## Accessibility

### Keyboard Navigation
- ✅ **Tab order** follows logical flow
- ✅ **Focus indicators** for interactive elements
- ✅ **Keyboard shortcuts** (Enter to send messages)
- ✅ **ARIA labels** where appropriate

### Screen Reader Support
- ✅ **Semantic HTML** structure
- ✅ **Alt text** for images and icons
- ✅ **Live regions** for dynamic content
- ✅ **Proper heading hierarchy**

### Color Contrast
- ✅ **WCAG AA compliance** for text contrast
- ✅ **Focus indicators** with sufficient contrast
- ✅ **Status indicators** with color + text

## Testing

Each component includes comprehensive test coverage:

- ✅ **Unit tests** for component behavior
- ✅ **Integration tests** for component interactions
- ✅ **Accessibility tests** for ARIA compliance
- ✅ **Performance tests** for render times
- ✅ **Edge case testing** for error conditions

Run tests:
```bash
npm test BrowserChrome
npm test GlassChatBox
npm test DottedWaveBackground
```

## Browser Compatibility

All components support:

- ✅ **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- ✅ **Edge 90+** with full feature support
- ✅ **Mobile browsers** (iOS Safari 14+, Chrome Mobile 90+)
- ✅ **Electron** for desktop applications

## Migration from React

If you're migrating from React components:

**React:**
```jsx
<BrowserChrome url="https://example.com" onRefresh={handleRefresh} />
```

**Vue:**
```vue
<BrowserChrome url="https://example.com" @refresh="handleRefresh" />
```

Key differences:
- Event handlers use `@event-name` syntax
- Props use kebab-case in templates
- State management with `ref`/`reactive`
- Lifecycle hooks with `onMounted`/`onUnmounted`

## Contributing

When contributing to UI components:

1. **Follow Vue 3 Composition API** patterns
2. **Maintain TypeScript compatibility** with strict mode
3. **Update tests** for new functionality
4. **Ensure accessibility compliance**
5. **Test responsive design**
6. **Update documentation**
7. **Check performance impact**

## Security Considerations

- ✅ **XSS prevention** with proper text encoding
- ✅ **CSRF protection** for form submissions
- ✅ **Content Security Policy** compatibility
- ✅ **Safe URL handling** in address bar
- ✅ **Input sanitization** for user content

---

**Last Updated**: 2026-04-01  
**Next Review**: 2026-07-01  
**Maintainers**: UI/UX Team
