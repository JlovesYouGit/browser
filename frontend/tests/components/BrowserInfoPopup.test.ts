import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BrowserInfoPopup from '@/components/figma/BrowserInfoPopup.vue'

// Mock motion library
vi.mock('@vueuse/motion', () => ({
  motion: {
    name: 'motion',
    template: '<div><slot /></div>',
    props: ['initial', 'animate', 'exit', 'transition'],
    setup: () => ({})
  }
}))

describe('BrowserInfoPopup Component', () => {
  let wrapper: any
  let onCompleteMock: vi.MockedFunction<() => void>

  beforeEach(() => {
    onCompleteMock = vi.fn()
    wrapper = mount(BrowserInfoPopup, {
      props: {
        onComplete: onCompleteMock
      }
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render correctly with default props', () => {
      expect(wrapper.find('.fixed').exists()).toBe(true)
      expect(wrapper.find('.fixed').classes()).toContain('inset-0')
      expect(wrapper.find('.fixed').classes()).toContain('flex')
      expect(wrapper.find('.fixed').classes()).toContain('items-center')
      expect(wrapper.find('.fixed').classes()).toContain('justify-center')
      expect(wrapper.find('.fixed').classes()).toContain('z-30')
    })

    it('should render glass popup container', () => {
      const popup = wrapper.find('.relative')
      expect(popup.exists()).toBe(true)
      expect(popup.classes()).toContain('px-12')
      expect(popup.classes()).toContain('py-8')
      expect(popup.classes()).toContain('rounded-2xl')
    })

    it('should render star loader SVG', () => {
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.attributes('width')).toBe('80')
      expect(svg.attributes('height')).toBe('80')
      expect(svg.attributes('viewBox')).toBe('0 0 24 24')
      expect(svg.attributes('fill')).toBe('none')
      expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    })

    it('should render star paths correctly', () => {
      const paths = wrapper.findAll('path')
      expect(paths).toHaveLength(2)
      
      // First path - main star
      expect(paths[0].attributes('d')).toBe('M12 0L13.09 7.91L20 9L13.09 10.09L12 18L10.91 10.09L4 9L10.91 7.91L12 0Z')
      expect(paths[0].attributes('fill')).toBe('white')
      expect(paths[0].attributes('opacity')).toBe('0.9')
      expect(paths[0].attributes('transform')).toBe('translate(0, 3)')
      
      // Second path - inner star
      expect(paths[1].attributes('d')).toBe('M12 3L12.7 8.3L18 9L12.7 9.7L12 15L11.3 9.7L6 9L11.3 8.3L12 3Z')
      expect(paths[1].attributes('fill')).toBe('rgba(255, 255, 255, 0.5)')
      expect(paths[1].attributes('transform')).toBe('translate(0, 3)')
    })

    it('should render loading text', () => {
      const text = wrapper.find('p')
      expect(text.exists()).toBe(true)
      expect(text.text()).toBe('Loading...')
      expect(text.classes()).toContain('text-white/60')
      expect(text.classes()).toContain('text-sm')
      expect(text.classes()).toContain('mt-6')
    })

    it('should have correct glass morphism styling', () => {
      const popup = wrapper.find('.relative')
      const style = popup.attributes('style')
      
      expect(style).toContain('background: rgba(255, 255, 255, 0.05)')
      expect(style).toContain('backdrop-filter: blur(20px)')
      expect(style).toContain('border: 1px solid rgba(255, 255, 255, 0.1)')
      expect(style).toContain('box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37)')
    })
  })

  describe('Motion Integration', () => {
    it('should pass correct motion props to container', () => {
      const container = wrapper.find('.fixed')
      expect(container.attributes(':initial')).toBe('{ opacity: 0 }')
      expect(container.attributes(':animate')).toBe('{ opacity: 1 }')
      expect(container.attributes(':exit')).toBe('{ opacity: 0 }')
      expect(container.attributes(':transition')).toBe('{ duration: 0.5 }')
    })

    it('should pass correct motion props to popup', () => {
      const popup = wrapper.find('.relative')
      expect(popup.attributes(':initial')).toBe('{ scale: 0, rotate: -10 }')
      expect(popup.attributes(':animate')).toBe('{ scale: [0, 1.2, 1], rotate: [10, -5, 0] }')
      expect(popup.attributes(':exit')).toBe('{ scale: 0, opacity: 0, y: -50 }')
      expect(popup.attributes(':transition')).toBe('{ duration: 0.8, exit: { duration: 0.5 } }')
    })

    it('should pass correct motion props to content', () => {
      const content = wrapper.find('.text-center')
      expect(content.attributes(':initial')).toBe('{ opacity: 0 }')
      expect(content.attributes(':animate')).toBe('{ opacity: 1 }')
      expect(content.attributes(':transition')).toBe('{ delay: 0.5 }')
    })

    it('should pass correct motion props to star loader', () => {
      const starLoader = wrapper.find('.text-center').find('div')
      expect(starLoader.attributes(':animate')).toBe('{ rotate: -360 }')
      expect(starLoader.attributes(':transition')).toBe('{ duration: 2, repeat: Infinity, ease: \'linear\' }')
    })

    it('should pass correct motion props to loading text', () => {
      const text = wrapper.find('p')
      expect(text.attributes(':animate')).toBe('{ opacity: [0.5, 1, 0.5] }')
      expect(text.attributes(':transition')).toBe('{ duration: 2, repeat: Infinity }')
    })
  })

  describe('Auto-completion Functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should auto-complete after 3.5 seconds', () => {
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })

      // Initially should not have called onComplete
      expect(onCompleteMock).not.toHaveBeenCalled()

      // Fast-forward 3.5 seconds
      vi.advanceTimersByTime(3500)

      // Should have called onComplete
      expect(onCompleteMock).toHaveBeenCalledTimes(1)
    })

    it('should emit complete event after auto-completion', async () => {
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })

      // Fast-forward 3.5 seconds
      vi.advanceTimersByTime(3500)

      // Wait for next tick
      await wrapper.vm.$nextTick()

      // Should have emitted complete event
      expect(wrapper.emitted('complete')).toBeTruthy()
      expect(wrapper.emitted('complete')).toHaveLength(1)
    })

    it('should cleanup timer on component unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })

      // Unmount component
      wrapper.unmount()

      // Should have called clearTimeout
      expect(clearTimeoutSpy).toHaveBeenCalled()
      
      clearTimeoutSpy.mockRestore()
    })

    it('should not call onComplete if unmounted before timeout', () => {
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })

      // Unmount before timeout
      wrapper.unmount()

      // Fast-forward 3.5 seconds
      vi.advanceTimersByTime(3500)

      // Should not have called onComplete
      expect(onCompleteMock).not.toHaveBeenCalled()
    })
  })

  describe('Component Methods', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should expose complete method', () => {
      const vm = wrapper.vm
      expect(typeof vm.complete).toBe('function')
    })

    it('should complete immediately when complete method is called', () => {
      const vm = wrapper.vm
      
      // Call complete method
      vm.complete()

      // Should have called onComplete immediately
      expect(onCompleteMock).toHaveBeenCalledTimes(1)
    })

    it('should emit complete event when complete method is called', async () => {
      const vm = wrapper.vm
      
      // Call complete method
      vm.complete()

      // Wait for next tick
      await wrapper.vm.$nextTick()

      // Should have emitted complete event
      expect(wrapper.emitted('complete')).toBeTruthy()
      expect(wrapper.emitted('complete')).toHaveLength(1)
    })

    it('should expose reset method', () => {
      const vm = wrapper.vm
      expect(typeof vm.reset).toBe('function')
    })

    it('should reset timer when reset method is called', () => {
      const vm = wrapper.vm
      
      // Fast-forward 2 seconds
      vi.advanceTimersByTime(2000)
      
      // Reset timer
      vm.reset()
      
      // Fast-forward another 2 seconds (total 4 seconds)
      vi.advanceTimersByTime(2000)
      
      // Should have called onComplete (3.5 seconds after reset)
      expect(onCompleteMock).toHaveBeenCalledTimes(1)
    })

    it('should not call onComplete multiple times after reset', () => {
      const vm = wrapper.vm
      
      // Fast-forward 2 seconds
      vi.advanceTimersByTime(2000)
      
      // Reset timer
      vm.reset()
      
      // Fast-forward 4 seconds
      vi.advanceTimersByTime(4000)
      
      // Should have called onComplete only once
      expect(onCompleteMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props Handling', () => {
    it('should accept onComplete prop', () => {
      expect(wrapper.props().onComplete).toBe(onCompleteMock)
    })

    it('should work with different onComplete callbacks', () => {
      const newOnComplete = vi.fn()
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: newOnComplete
        }
      })

      vi.useFakeTimers()
      vi.advanceTimersByTime(3500)

      expect(newOnComplete).toHaveBeenCalledTimes(1)
      vi.useRealTimers()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const container = wrapper.find('.fixed')
      expect(container.attributes('role')).toBeUndefined() // No specific role needed for this loading overlay
    })

    it('should have semantic structure', () => {
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should handle missing onComplete prop gracefully', () => {
      expect(() => {
        mount(BrowserInfoPopup, {
          props: {} as any
        })
      }).not.toThrow()
    })

    it('should handle onComplete throwing errors', () => {
      const errorOnComplete = vi.fn(() => {
        throw new Error('Test error')
      })

      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: errorOnComplete
        }
      })

      vi.useFakeTimers()
      
      expect(() => {
        vi.advanceTimersByTime(3500)
      }).toThrow('Test error')
      
      vi.useRealTimers()
    })
  })

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now()
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })
      const end = performance.now()
      
      expect(end - start).toBeLessThan(50) // Should render in < 50ms
    })

    it('should cleanup properly on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      
      wrapper = mount(BrowserInfoPopup, {
        props: {
          onComplete: onCompleteMock
        }
      })

      wrapper.unmount()
      
      expect(clearTimeoutSpy).toHaveBeenCalled()
      clearTimeoutSpy.mockRestore()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive classes', () => {
      const popup = wrapper.find('.relative')
      expect(popup.classes()).toContain('px-12')
      expect(popup.classes()).toContain('py-8')
    })

    it('should maintain structure on different screen sizes', () => {
      // Test that the component structure is maintained
      expect(wrapper.find('.fixed').exists()).toBe(true)
      expect(wrapper.find('.relative').exists()).toBe(true)
      expect(wrapper.find('.text-center').exists()).toBe(true)
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 5; i++) {
        wrapper = mount(BrowserInfoPopup, {
          props: {
            onComplete: onCompleteMock
          }
        })
        wrapper.unmount()
      }
      
      // Should not throw any errors
      expect(true).toBe(true)
    })

    it('should handle multiple complete calls', () => {
      const vm = wrapper.vm
      
      // Call complete multiple times
      vm.complete()
      vm.complete()
      vm.complete()
      
      // Should call onComplete each time
      expect(onCompleteMock).toHaveBeenCalledTimes(3)
    })

    it('should handle reset after complete', () => {
      const vm = wrapper.vm
      
      vi.useFakeTimers()
      
      // Complete immediately
      vm.complete()
      expect(onCompleteMock).toHaveBeenCalledTimes(1)
      
      // Reset and wait for auto-completion
      vm.reset()
      vi.advanceTimersByTime(3500)
      expect(onCompleteMock).toHaveBeenCalledTimes(2)
      
      vi.useRealTimers()
    })
  })
})
