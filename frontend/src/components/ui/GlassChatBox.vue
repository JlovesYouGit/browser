<template>
  <div class="glass-chat-box w-full max-w-[500px]">
    <!-- Input Form - Glass Style -->
    <form @submit="handleSubmit" class="relative">
      <div class="input-container relative flex items-center gap-3 backdrop-blur-xl bg-white/[0.02] rounded-xl border border-white/[0.08] p-3.5 focus-within:border-white/[0.15] transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <!-- Subtle inner glow -->
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <input
          ref="inputRef"
          v-model="message"
          type="text"
          placeholder="Type your message..."
          class="relative z-10 flex-1 bg-transparent text-white/90 placeholder:text-white/30 text-sm outline-none"
          @input="handleInput"
          @keydown.enter="handleSubmit"
        />
        <button
          type="submit"
          :disabled="!message.trim()"
          class="send-button relative z-10 flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 disabled:from-white/5 disabled:to-white/5 border border-white/[0.08] disabled:border-white/[0.03] transition-all disabled:cursor-not-allowed group"
        >
          <SendIcon class="w-4 h-4 text-white group-disabled:text-white/20" :stroke-width="2" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Send as SendIcon, Sparkles } from 'lucide-vue-next'

// Component props interface
interface GlassChatBoxProps {
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}

// Define props with TypeScript support
const props = withDefaults(defineProps<GlassChatBoxProps>(), {
  placeholder: 'Type your message...',
  disabled: false,
  maxLength: 500
})

// Reactive state
const message = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Component emits
const emit = defineEmits<{
  submit: [message: string]
  input: [message: string]
  focus: []
  blur: []
}>()

// Event handlers
const handleSubmit = (event?: Event) => {
  if (event) {
    event.preventDefault()
  }
  
  if (message.value.trim() && !props.disabled) {
    const submittedMessage = message.value.trim()
    emit('submit', submittedMessage)
    message.value = ''
    
    // Focus back to input after submission
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
}

const handleInput = () => {
  emit('input', message.value)
}

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

// Expose methods to parent components
defineExpose({
  focus: () => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  },
  blur: () => {
    if (inputRef.value) {
      inputRef.value.blur()
    }
  },
  clear: () => {
    message.value = ''
  },
  setMessage: (newMessage: string) => {
    message.value = newMessage
  },
  getMessage: () => message.value
})
</script>

<style lang="less" scoped>
.glass-chat-box {
  // Component container
}

.input-container {
  // Glass morphism effect
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  // Enhanced focus states
  &:focus-within {
    transform: translateY(-1px);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  // Hover effect
  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
  }
  
  // Animation for inner glow
  .absolute.inset-0 {
    animation: shimmer 3s ease-in-out infinite;
  }
}

.send-button {
  // Button hover effects
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 
      0 4px 16px rgba(147, 51, 234, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  
  // Active state
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  // Disabled state animations
  &:disabled {
    opacity: 0.5;
    transform: none;
  }
}

// Input field styling
input {
  // Remove default styles
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  // Custom styling
  background: transparent;
  border: none;
  outline: none;
  
  // Placeholder styling
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    transition: opacity 0.2s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.5;
  }
  
  // Text selection styling
  &::selection {
    background: rgba(147, 51, 234, 0.3);
    color: white;
  }
  
  // Autocomplete styling
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: rgba(255, 255, 255, 0.9);
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}

// Animations
@keyframes shimmer {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
}

// Responsive design
@media (max-width: 768px) {
  .glass-chat-box {
    max-width: 100%;
  }
  
  .input-container {
    padding: 3rem;
    gap: 2.5rem;
  }
  
  .send-button {
    width: 8rem;
    height: 8rem;
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .input-container {
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .input-container,
  .send-button,
  .absolute.inset-0 {
    animation: none;
    transition: none;
  }
  
  .input-container:focus-within {
    transform: none;
  }
  
  .send-button:hover:not(:disabled) {
    transform: none;
  }
}

// Dark mode support (if needed)
@media (prefers-color-scheme: dark) {
  .glass-chat-box {
    // Already optimized for dark mode
  }
}

// Focus visible support for better accessibility
.send-button:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.5);
  outline-offset: 2px;
}

input:focus-visible {
  outline: none;
}
</style>
