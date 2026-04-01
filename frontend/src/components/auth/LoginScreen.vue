<template>
  <div class="login-screen">
    <div class="login-container">
      <!-- Glass Card -->
      <div class="glass-card">
        <!-- Glow effect -->
        <div class="glow-effect" />

        <!-- Content -->
        <div class="content">
          <div class="header">
            <h1 class="title">Welcome</h1>
            <p class="subtitle">Sign in to continue</p>
          </div>

          <div class="button-wrapper">
            <button
              class="google-button"
              :class="{ hovered: isHovered }"
              @click="handleGoogleLogin"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#E8E8E8"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#D0D0D0"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#B8B8B8"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#F0F0F0"
                />
              </svg>
              <span class="button-text">Continue with Google</span>
            </button>
          </div>

          <div class="footer">
            <p class="terms">By continuing, you agree to our Terms & Privacy Policy</p>
          </div>
        </div>
      </div>

      <!-- Bottom glow effect -->
      <div class="bottom-glow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)

const emit = defineEmits<{
  authenticated: []
}>()

const handleGoogleLogin = () => {
  // Mock Google OAuth - in production, this would redirect to OAuth
  console.log('Redirecting to Google OAuth...')
  
  // Simulate successful authentication after brief delay
  setTimeout(() => {
    emit('authenticated')
  }, 500)
}
</script>

<style lang="less" scoped>
.login-screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInScale 0.8s ease-out 0.3s forwards;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.login-container {
  position: relative;
  width: 100%;
  max-width: 28rem;
  margin: 0 1rem;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUpFade 0.6s ease-out 0.5s forwards;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.glow-effect {
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  opacity: 0.3;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 10;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 0.5s ease-out 0.8s forwards;
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 2.25rem;
  font-weight: 200;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
}

.subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.button-wrapper {
  opacity: 0;
  transform: scale(0.9);
  animation: fadeInScaleUp 0.5s ease-out 1s forwards;
}

@keyframes fadeInScaleUp {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.google-button {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.hovered {
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  }
}

.button-text {
  color: white;
  font-weight: 300;
  letter-spacing: 0.025em;
}

.footer {
  margin-top: 1.5rem;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.5s ease-out 1.2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.terms {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.75rem;
}

.bottom-glow {
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  height: 2rem;
  border-radius: 9999px;
  filter: blur(1rem);
  opacity: 0.2;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  pointer-events: none;
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .login-screen {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .login-screen,
  .login-container,
  .header,
  .button-wrapper,
  .footer {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
