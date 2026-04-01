import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue'

describe('ImageWithFallback Component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ImageWithFallback, {
      props: {
        src: 'https://example.com/test-image.jpg',
        alt: 'Test Image',
        class: 'test-class',
        width: 200,
        height: 150
      }
    })
  })

  describe('Component Rendering', () => {
    it('should render correctly with valid image', () => {
      expect(wrapper.find('img').exists()).toBe(true)
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/test-image.jpg')
      expect(wrapper.find('img').attributes('alt')).toBe('Test Image')
      expect(wrapper.find('img').attributes('class')).toBe('test-class')
    })

    it('should render fallback when image fails to load', async () => {
      // Trigger error event
      const img = wrapper.find('img')
      await img.trigger('error')

      // Should show fallback container
      expect(wrapper.find('.inline-block').exists()).toBe(true)
      expect(wrapper.find('.bg-gray-100').exists()).toBe(true)
      
      // Should show error image inside container
      const errorImg = wrapper.find('.inline-block img')
      expect(errorImg.exists()).toBe(true)
      expect(errorImg.attributes('src')).toContain('data:image/svg+xml')
      expect(errorImg.attributes('alt')).toBe('Error loading image')
    })

    it('should preserve original URL in data attribute when error occurs', async () => {
      const originalSrc = 'https://example.com/test-image.jpg'
      
      // Trigger error event
      const img = wrapper.find('img')
      await img.trigger('error')

      // Check that original URL is preserved
      const errorImg = wrapper.find('.inline-block img')
      expect(errorImg.attributes('data-original-url')).toBe(originalSrc)
    })
  })

  describe('Props Handling', () => {
    it('should handle missing alt text gracefully', () => {
      const wrapperNoAlt = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      expect(wrapperNoAlt.find('img').attributes('alt')).toBe('')
    })

    it('should handle style prop as string', () => {
      const wrapperStyle = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg',
          style: 'color: red; font-size: 16px;'
        }
      })

      expect(wrapperStyle.find('img').attributes('style')).toBe('color: red; font-size: 16px;')
    })

    it('should handle style prop as object', () => {
      const wrapperStyle = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg',
          style: { color: 'red', fontSize: '16px' }
        }
      })

      // Vue will convert object style to string
      expect(wrapperStyle.find('img').attributes('style')).toBeDefined()
    })

    it('should pass through additional attributes', () => {
      const wrapperAttrs = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg',
          'data-testid': 'test-image',
          loading: 'lazy'
        }
      })

      const img = wrapperAttrs.find('img')
      expect(img.attributes('data-testid')).toBe('test-image')
      expect(img.attributes('loading')).toBe('lazy')
    })
  })

  describe('Error State Management', () => {
    it('should expose error state to parent component', () => {
      const wrapperExposed = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      // Initially no error
      expect(wrapperExposed.vm.didError).toBe(false)

      // Trigger error
      const img = wrapperExposed.find('img')
      img.trigger('error')

      // Should show error state
      expect(wrapperExposed.vm.didError).toBe(true)
    })

    it('should allow resetting error state', async () => {
      const wrapperReset = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      // Trigger error
      const img = wrapperReset.find('img')
      await img.trigger('error')
      expect(wrapperReset.vm.didError).toBe(true)

      // Reset error
      wrapperReset.vm.resetError()
      expect(wrapperReset.vm.didError).toBe(false)
    })

    it('should handle multiple error events gracefully', async () => {
      const wrapperMultiple = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      // Trigger error multiple times
      const img = wrapperMultiple.find('img')
      await img.trigger('error')
      await img.trigger('error')
      await img.trigger('error')

      // Should still be in error state (no infinite loop)
      expect(wrapperMultiple.vm.didError).toBe(true)
      expect(wrapperMultiple.find('.inline-block').exists()).toBe(true)
    })
  })

  describe('Fallback Container', () => {
    it('should apply correct CSS classes to fallback container', async () => {
      const wrapperFallback = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg',
          class: 'custom-class'
        }
      })

      // Trigger error
      await wrapperFallback.find('img').trigger('error')

      const container = wrapperFallback.find('.inline-block')
      expect(container.classes()).toContain('inline-block')
      expect(container.classes()).toContain('bg-gray-100')
      expect(container.classes()).toContain('text-center')
      expect(container.classes()).toContain('align-middle')
      expect(container.classes()).toContain('custom-class')
    })

    it('should center error image in container', async () => {
      const wrapperCenter = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      // Trigger error
      await wrapperCenter.find('img').trigger('error')

      const flexContainer = wrapperCenter.find('.flex')
      expect(flexContainer.exists()).toBe(true)
      expect(flexContainer.classes()).toContain('items-center')
      expect(flexContainer.classes()).toContain('justify-center')
      expect(flexContainer.classes()).toContain('w-full')
      expect(flexContainer.classes()).toContain('h-full')
    })
  })

  describe('Accessibility', () => {
    it('should provide proper alt text for error image', async () => {
      const wrapperA11y = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg',
          alt: 'Original image description'
        }
      })

      // Trigger error
      await wrapperA11y.find('img').trigger('error')

      const errorImg = wrapperA11y.find('.inline-block img')
      expect(errorImg.attributes('alt')).toBe('Error loading image')
    })

    it('should maintain semantic structure', async () => {
      const wrapperSemantic = mount(ImageWithFallback, {
        props: {
          src: 'https://example.com/test.jpg'
        }
      })

      // Trigger error
      await wrapperSemantic.find('img').trigger('error')

      // Should still have proper image element
      const errorImg = wrapperSemantic.find('.inline-block img')
      expect(errorImg.exists()).toBe(true)
    })
  })

  describe('Performance', () => {
    it('should render quickly with many instances', () => {
      const start = performance.now()
      
      // Create multiple instances
      const wrappers = []
      for (let i = 0; i < 100; i++) {
        wrappers.push(mount(ImageWithFallback, {
          props: {
            src: `https://example.com/test-${i}.jpg`,
            alt: `Test ${i}`
          }
        }))
      }

      const end = performance.now()
      
      // Should render quickly (< 100ms for 100 instances)
      expect(end - start).toBeLessThan(100)
      
      // All instances should render correctly
      wrappers.forEach((wrapper, index) => {
        expect(wrapper.find('img').attributes('src')).toBe(`https://example.com/test-${index}.jpg`)
      })
    })
  })
})
