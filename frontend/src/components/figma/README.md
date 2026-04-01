# Figma Components

This directory contains Vue.js components converted from React Figma design system components.

## ImageWithFallback Component

A robust image component with automatic fallback handling for failed image loads.

### Features

- ✅ **Automatic fallback**: Shows error placeholder when image fails to load
- ✅ **TypeScript support**: Full type safety with prop interfaces
- ✅ **Vue 3 Composition API**: Modern Vue.js patterns
- ✅ **Accessibility**: Proper alt text and semantic structure
- ✅ **Performance optimized**: Efficient reactivity and rendering
- ✅ **Customizable**: Supports all standard img attributes
- ✅ **Error state management**: Expose error state to parent components

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **Required** | Image source URL |
| `alt` | `string` | `''` | Alternative text for accessibility |
| `class` | `string` | `''` | CSS class names |
| `style` | `string \| Record<string, any>` | `''` | Inline styles |
| `width` | `string \| number` | `undefined` | Image width |
| `height` | `string \| number` | `undefined` | Image height |

### Usage Examples

#### Basic Usage
```vue
<template>
  <ImageWithFallback
    src="https://example.com/image.jpg"
    alt="Description of image"
    width="200"
    height="150"
  />
</template>

<script setup>
import { ImageWithFallback } from '@/components/figma'
</script>
```

#### With Custom Styling
```vue
<template>
  <ImageWithFallback
    src="https://example.com/profile.jpg"
    alt="User profile"
    class="rounded-full shadow-lg"
    :style="{ border: '2px solid #e5e7eb' }"
  />
</template>

<script setup>
import { ImageWithFallback } from '@/components/figma'
</script>
```

#### With Error Handling
```vue
<template>
  <div>
    <ImageWithFallback
      ref="imageRef"
      src="https://example.com/possibly-broken.jpg"
      alt="Potentially broken image"
      @error="handleImageError"
    />
    
    <button v-if="imageRef?.didError" @click="retryImage">
      Retry Loading Image
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ImageWithFallback } from '@/components/figma'

const imageRef = ref(null)

const handleImageError = () => {
  console.log('Image failed to load')
}

const retryImage = () => {
  if (imageRef.value) {
    imageRef.value.resetError()
  }
}
</script>
```

#### Global Registration
```typescript
// main.ts
import { createApp } from 'vue'
import { registerFigmaComponents } from '@/components/figma'
import App from './App.vue'

const app = createApp(App)

// Register all Figma components globally
registerFigmaComponents(app)

app.mount('#app')
```

Then use anywhere:
```vue
<template>
  <ImageWithFallback src="/logo.png" alt="Company Logo" />
</template>
```

### Error Fallback

When an image fails to load, the component displays:

1. A gray background container (`bg-gray-100`)
2. A centered error icon (SVG with broken image symbol)
3. The original URL preserved in `data-original-url` attribute
4. Proper accessibility with "Error loading image" alt text

### Accessibility

- ✅ Proper alt text for both normal and error states
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

### Performance

- ✅ Minimal reactivity overhead
- ✅ Efficient error handling
- ✅ No unnecessary re-renders
- ✅ Lightweight fallback image (inline SVG)

### Testing

The component includes comprehensive test coverage:

- ✅ Component rendering
- ✅ Error handling
- ✅ Props validation
- ✅ Accessibility testing
- ✅ Performance testing
- ✅ Edge cases

Run tests:
```bash
npm test ImageWithFallback
```

### Migration from React

If you're migrating from the React version:

**React:**
```jsx
<ImageWithFallback src="/image.jpg" alt="Image" />
```

**Vue:**
```vue
<ImageWithFallback src="/image.jpg" alt="Image" />
```

Key differences:
- Uses Vue's `@error` instead of `onError`
- Props use Vue's prop system
- Error state accessed via `ref.vm.didError`
- Style binding uses Vue syntax

### Security Considerations

- ✅ Image URLs are not executed (safe)
- ✅ No XSS risks from user-provided URLs
- ✅ Proper error handling prevents crashes
- ✅ Fallback is static SVG (no external dependencies)

### Browser Support

- ✅ Modern browsers (ES2022+)
- ✅ Vue 3 supported browsers
- ✅ Fallback works even without JavaScript (graceful degradation)

### Contributing

When modifying this component:

1. Maintain TypeScript interfaces
2. Update tests for new functionality
3. Ensure accessibility compliance
4. Test error scenarios
5. Update documentation

### Related Components

- `Avatar` - Could extend this for user avatars
- `Thumbnail` - Could use for image galleries
- `Icon` - Similar error handling pattern
