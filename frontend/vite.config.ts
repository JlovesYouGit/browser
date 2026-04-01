import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    // The Vue and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .vue, .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['reka-ui', 'lucide-vue-next'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    // Optimize build for production
    minify: 'esbuild',
  },

  // Development server configuration
  server: {
    port: 5173,
    host: true,
    cors: true,
    // Proxy configuration for API calls
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  },

  // CSS configuration
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/macos-variables.less";`
      }
    }
  },

  // Environment variables
  envPrefix: 'VITE_',

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'reka-ui',
      'lucide-vue-next',
      'clsx',
      'tailwind-merge',
      'class-variance-authority'
    ]
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  // Worker configuration
  worker: {
    format: 'es'
  }
})
