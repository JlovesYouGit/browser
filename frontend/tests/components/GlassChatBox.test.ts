import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GlassChatBox from '@/components/ui/GlassChatBox.vue'

describe('GlassChatBox Component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(GlassChatBox, {
      props: {
        placeholder: 'Type your message...',
        disabled: false,
        maxLength: 500
      }
    })
  })

  describe('Component Rendering', () => {
    it('should render correctly with default props', () => {
      expect(wrapper.find('.glass-chat-box').exists()).toBe(true)
      expect(wrapper.find('.glass-chat-box').classes()).toContain('w-full')
      expect(wrapper.find('.glass-chat-box').classes()).toContain('max-w-[500px]')
    })

    it('should render input form with glass styling', () => {
      const form = wrapper.find('form')
      expect(form.exists()).toBe(true)
      
      const inputContainer = wrapper.find('.input-container')
      expect(inputContainer.exists()).toBe(true)
      expect(inputContainer.classes()).toContain('backdrop-blur-xl')
      expect(inputContainer.classes()).toContain('bg-white/[0.02]')
      expect(inputContainer.classes()).toContain('rounded-xl')
    })

    it('should render input field with correct attributes', () => {
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('text')
      expect(input.attributes('placeholder')).toBe('Type your message...')
      expect(input.classes()).toContain('text-white/90')
      expect(input.classes()).toContain('placeholder:text-white/30')
    })

    it('should render send button with gradient styling', () => {
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.attributes('type')).toBe('submit')
      expect(button.classes()).toContain('bg-gradient-to-br')
      expect(button.classes()).toContain('from-purple-500/80')
      expect(button.classes()).toContain('to-blue-500/80')
    })

    it('should have inner glow element', () => {
      const innerGlow = wrapper.find('.absolute.inset-0')
      expect(innerGlow.exists()).toBe(true)
      expect(innerGlow.classes()).toContain('bg-gradient-to-br')
      expect(innerGlow.classes()).toContain('from-white/[0.03]')
    })
  })

  describe('Props Handling', () => {
    it('should use custom placeholder when provided', async () => {
      await wrapper.setProps({ placeholder: 'Enter your text here...' })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Enter your text here...')
    })

    it('should disable input and button when disabled prop is true', async () => {
      await wrapper.setProps({ disabled: true })
      
      const input = wrapper.find('input')
      const button = wrapper.find('button')
      
      expect(input.attributes('disabled')).toBeDefined()
      expect(button.attributes('disabled')).toBeDefined()
      expect(button.classes()).toContain('disabled:cursor-not-allowed')
    })

    it('should apply maxLength to input', async () => {
      await wrapper.setProps({ maxLength: 100 })
      const input = wrapper.find('input')
      expect(input.attributes('maxlength')).toBe('100')
    })
  })

  describe('Input Functionality', () => {
    it('should update message when typing', async () => {
      const input = wrapper.find('input')
      await input.setValue('Hello world')
      expect(wrapper.vm.message).toBe('Hello world')
    })

    it('should emit input event when typing', async () => {
      const input = wrapper.find('input')
      await input.setValue('Test message')
      
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')[0]).toEqual(['Test message'])
    })

    it('should clear input after submission', async () => {
      const input = wrapper.find('input')
      await input.setValue('Test message')
      
      const form = wrapper.find('form')
      await form.trigger('submit')
      
      expect(wrapper.vm.message).toBe('')
    })

    it('should handle empty message submission', async () => {
      const form = wrapper.find('form')
      await form.trigger('submit')
      
      expect(wrapper.emitted('submit')).toBeUndefined()
    })

    it('should handle whitespace-only message', async () => {
      const input = wrapper.find('input')
      await input.setValue('   ')
      
      const form = wrapper.find('form')
      await form.trigger('submit')
      
      expect(wrapper.emitted('submit')).toBeUndefined()
    })
  })

  describe('Form Submission', () => {
    it('should emit submit event with message', async () => {
      const input = wrapper.find('input')
      await input.setValue('Test message')
      
      const form = wrapper.find('form')
      await form.trigger('submit')
      
      expect(wrapper.emitted('submit')).toBeTruthy()
      expect(wrapper.emitted('submit')[0]).toEqual(['Test message'])
    })

    it('should prevent default form submission', async () => {
      const form = wrapper.find('form')
      const preventDefaultSpy = vi.fn()
      
      await form.trigger('submit', { preventDefault: preventDefaultSpy })
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should not submit when disabled', async () => {
      await wrapper.setProps({ disabled: true })
      
      const input = wrapper.find('input')
      await input.setValue('Test message')
      
      const form = wrapper.find('form')
      await form.trigger('submit')
      
      expect(wrapper.emitted('submit')).toBeUndefined()
    })
  })

  describe('Button State', () => {
    it('should disable button when input is empty', async () => {
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
      expect(button.classes()).toContain('disabled:from-white/5')
    })

    it('should enable button when input has text', async () => {
      const input = wrapper.find('input')
      await input.setValue('Test message')
      
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('should disable button when input has only whitespace', async () => {
      const input = wrapper.find('input')
      await input.setValue('   ')
      
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  describe('Focus Management', () => {
    it('should emit focus event when input is focused', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('should emit blur event when input loses focus', async () => {
      const input = wrapper.find('input')
      await input.trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('should focus input after submission', async () => {
      const input = wrapper.find('input')
      const focusSpy = vi.spyOn(input.element, 'focus')
      
      await input.setValue('Test message')
      await wrapper.find('form').trigger('submit')
      
      // Wait for nextTick
      await wrapper.vm.$nextTick()
      
      expect(focusSpy).toHaveBeenCalled()
    })
  })

  describe('Component Methods', () => {
    it('should expose focus method', () => {
      const vm = wrapper.vm
      expect(typeof vm.focus).toBe('function')
    })

    it('should expose blur method', () => {
      const vm = wrapper.vm
      expect(typeof vm.blur).toBe('function')
    })

    it('should expose clear method', () => {
      const vm = wrapper.vm
      expect(typeof vm.clear).toBe('function')
    })

    it('should expose setMessage method', () => {
      const vm = wrapper.vm
      expect(typeof vm.setMessage).toBe('function')
    })

    it('should expose getMessage method', () => {
      const vm = wrapper.vm
      expect(typeof vm.getMessage).toBe('function')
    })

    it('should clear message when clear method is called', () => {
      wrapper.vm.setMessage('Test message')
      expect(wrapper.vm.getMessage()).toBe('Test message')
      
      wrapper.vm.clear()
      expect(wrapper.vm.getMessage()).toBe('')
    })

    it('should set message when setMessage method is called', () => {
      wrapper.vm.setMessage('New message')
      expect(wrapper.vm.getMessage()).toBe('New message')
    })
  })

  describe('Styling Classes', () => {
    it('should have correct glass morphism classes', () => {
      const inputContainer = wrapper.find('.input-container')
      expect(inputContainer.classes()).toContain('backdrop-blur-xl')
      expect(inputContainer.classes()).toContain('bg-white/[0.02]')
      expect(inputContainer.classes()).toContain('border-white/[0.08]')
      expect(inputContainer.classes()).toContain('shadow-[0_8px_32px_rgba(0,0,0,0.3)]')
    })

    it('should have correct button gradient classes', () => {
      const button = wrapper.find('button')
      expect(button.classes()).toContain('from-purple-500/80')
      expect(button.classes()).toContain('to-blue-500/80')
      expect(button.classes()).toContain('group')
    })

    it('should have correct input text classes', () => {
      const input = wrapper.find('input')
      expect(input.classes()).toContain('text-white/90')
      expect(input.classes()).toContain('placeholder:text-white/30')
      expect(input.classes()).toContain('outline-none')
    })
  })

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      const form = wrapper.find('form')
      const input = wrapper.find('input')
      const button = wrapper.find('button')
      
      expect(form.exists()).toBe(true)
      expect(input.exists()).toBe(true)
      expect(button.exists()).toBe(true)
    })

    it('should have proper button type', () => {
      const button = wrapper.find('button')
      expect(button.attributes('type')).toBe('submit')
    })

    it('should have proper input type', () => {
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('text')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long messages', async () => {
      const longMessage = 'a'.repeat(1000)
      const input = wrapper.find('input')
      await input.setValue(longMessage)
      
      expect(wrapper.vm.message).toBe(longMessage)
    })

    it('should handle special characters', async () => {
      const specialMessage = 'Hello @world #test $special %chars'
      const input = wrapper.find('input')
      await input.setValue(specialMessage)
      
      expect(wrapper.vm.message).toBe(specialMessage)
    })

    it('should handle rapid submissions', async () => {
      const input = wrapper.find('input')
      const form = wrapper.find('form')
      
      await input.setValue('Message 1')
      await form.trigger('submit')
      
      await input.setValue('Message 2')
      await form.trigger('submit')
      
      expect(wrapper.emitted('submit')).toHaveLength(2)
      expect(wrapper.emitted('submit')[0]).toEqual(['Message 1'])
      expect(wrapper.emitted('submit')[1]).toEqual(['Message 2'])
    })
  })

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now()
      const wrapperPerf = mount(GlassChatBox)
      const end = performance.now()
      
      expect(end - start).toBeLessThan(50) // Should render in < 50ms
      expect(wrapperPerf.find('.glass-chat-box').exists()).toBe(true)
    })

    it('should handle multiple instances', () => {
      const start = performance.now()
      
      const wrappers = []
      for (let i = 0; i < 10; i++) {
        wrappers.push(mount(GlassChatBox))
      }
      
      const end = performance.now()
      
      expect(end - start).toBeLessThan(200) // Should render 10 instances in < 200ms
      expect(wrappers.length).toBe(10)
      
      wrappers.forEach((wrapperInstance) => {
        expect(wrapperInstance.find('.glass-chat-box').exists()).toBe(true)
      })
    })
  })
})
