<template>
  <div class="browser-chrome relative z-10 w-[90%] max-w-[1400px] h-[85vh] flex flex-col bg-[#1a1a1a] rounded-[10px] border border-[#2a2a2a] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
    <!-- Top Bar / Browser Chrome -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-[#252525]">
      <!-- Left: Window Controls -->
      <div class="flex items-center gap-2">
        <div class="window-control window-control-close" />
        <div class="window-control window-control-minimize" />
        <div class="window-control window-control-maximize" />
      </div>

      <!-- Center: Address Bar -->
      <div class="flex-1 max-w-[600px] mx-8">
        <div class="address-bar flex items-center gap-3 bg-[#252525] rounded-full px-4 py-2.5 border border-[#2f2f2f]">
          <LockIcon class="w-3.5 h-3.5 text-[#6b6b6b]" :stroke-width="2" />
          <input
            type="text"
            readonly
            :value="currentUrl"
            class="address-input flex-1 bg-transparent text-[#a0a0a0] text-sm outline-none font-normal"
          />
          <div class="flex items-center gap-2">
            <RotateCwIcon class="w-3.5 h-3.5 text-[#6b6b6b]" :stroke-width="2" />
            <StarIcon class="w-3.5 h-3.5 text-[#6b6b6b]" :stroke-width="2" />
          </div>
        </div>
      </div>

      <!-- Right: Menu Icons -->
      <div class="flex items-center gap-4">
        <MoreHorizontalIcon class="w-5 h-5 text-[#6b6b6b]" :stroke-width="1.5" />
        <UserIcon class="w-5 h-5 text-[#6b6b6b]" :stroke-width="1.5" />
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 bg-[#141414] overflow-hidden relative">
      <!-- Dotted Wave Pattern Background -->
      <div class="absolute inset-0">
        <DottedWaveBackground />
      </div>
      
      <!-- Reference image (hidden, just for inspiration) -->
      <img :src="referenceImage" alt="reference" class="hidden" />
      
      <!-- Glass Chat Box -->
      <div class="relative z-10 w-full h-full flex items-center justify-center px-8">
        <GlassChatBox />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Lock as LockIcon, RotateCw as RotateCwIcon, Star as StarIcon, MoreHorizontal as MoreHorizontalIcon, User as UserIcon } from 'lucide-vue-next'
import GlassChatBox from './GlassChatBox.vue'

// Component props interface
interface BrowserChromeProps {
  url?: string
  title?: string
  isLoading?: boolean
}

// Define props with TypeScript support
const props = withDefaults(defineProps<BrowserChromeProps>(), {
  url: 'https://yoursite.com',
  title: 'Browser',
  isLoading: false,
})

// Reactive state
const currentUrl = computed(() => props.url)

// Reference image - in a real app, this would be properly imported
const referenceImage = ref('/images/reference.jpg')

// Component emits
const emit = defineEmits<{
  refresh: []
  bookmark: []
  menu: []
  user: []
}>()

// Event handlers
const handleRefresh = () => {
  emit('refresh')
}

const handleBookmark = () => {
  emit('bookmark')
}

const handleMenu = () => {
  emit('menu')
}

const handleUser = () => {
  emit('user')
}

// Expose methods to parent components
defineExpose({
  refresh: handleRefresh,
  bookmark: handleBookmark,
  menu: handleMenu,
  user: handleUser,
})
</script>

<script lang="ts">
// Import Lucide icons for global registration
import { 
  Lock, 
  RotateCw, 
  Star, 
  MoreHorizontal, 
  User 
} from 'lucide-vue-next'

// Component metadata
export default {
  name: 'BrowserChrome',
  components: {
    Lock,
    RotateCw,
    Star,
    MoreHorizontal,
    User,
  }
}
</script>

<style lang="less" scoped>
// Window controls styling
.window-control {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  
  &.window-control-close {
    background-color: #ff5f57;
  }
  
  &.window-control-minimize {
    background-color: #febc2e;
  }
  
  &.window-control-maximize {
    background-color: #28c840;
  }
}

// Address bar styling
.address-bar {
  .address-input {
    &::placeholder {
      color: #6b6b6b;
    }
    
    &:focus {
      outline: none;
    }
  }
}

// Animation classes for wave background
@keyframes wave-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes wave-medium {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes wave-fast {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-wave-slow {
  animation: wave-slow 8s ease-in-out infinite;
}

.animate-wave-medium {
  animation: wave-medium 6s ease-in-out infinite;
}

.animate-wave-fast {
  animation: wave-fast 4s ease-in-out infinite;
}

// Browser chrome specific styles
.browser-chrome {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  // Hover effects for interactive elements
  .window-control {
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  
  // Icon hover effects
  svg {
    transition: color 0.2s ease;
    
    &:hover {
      color: #ffffff !important;
      cursor: pointer;
    }
  }
  
  // Address bar focus state
  .address-bar {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      border-color: #3a3a3a;
    }
    
    &:focus-within {
      border-color: #007aff;
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .browser-chrome {
    width: 95%;
    height: 90vh;
    
    .address-bar {
      max-width: 400px;
    }
  }
}

@media (max-width: 480px) {
  .browser-chrome {
    .address-bar {
      max-width: 300px;
      padding: 2px;
      
      .address-input {
        font-size: 12px;
      }
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
