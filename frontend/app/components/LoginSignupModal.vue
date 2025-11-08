<template>
  <div v-if="modelValue" @click.self="closeModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: white; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); max-width: 420px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
      <!-- Close Button -->
      <button @click="closeModal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.5rem; transition: color 0.2s; z-index: 10;" onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#9ca3af'">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Tab Navigation -->
      <div style="display: flex; border-bottom: 1px solid #e5e7eb;">
        <button 
          @click="activeTab = 'login'"
          :style="activeTab === 'login' ? 'padding: 1rem 2rem; font-size: 1rem; font-weight: 600; background: transparent; border: none; color: #16a34a; cursor: pointer; border-bottom: 2px solid #16a34a; transition: all 0.2s;' : 'padding: 1rem 2rem; font-size: 1rem; font-weight: 500; background: transparent; border: none; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;'"
          onmouseover="if (this.getAttribute('data-active') !== 'true') this.style.color='#111827'"
          onmouseout="if (this.getAttribute('data-active') !== 'true') this.style.color='#6b7280'"
          :data-active="activeTab === 'login'"
        >
          Sign In
        </button>
        <button 
          @click="activeTab = 'signup'"
          :style="activeTab === 'signup' ? 'padding: 1rem 2rem; font-size: 1rem; font-weight: 600; background: transparent; border: none; color: #16a34a; cursor: pointer; border-bottom: 2px solid #16a34a; transition: all 0.2s;' : 'padding: 1rem 2rem; font-size: 1rem; font-weight: 500; background: transparent; border: none; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;'"
          onmouseover="if (this.getAttribute('data-active') !== 'true') this.style.color='#111827'"
          onmouseout="if (this.getAttribute('data-active') !== 'true') this.style.color='#6b7280'"
          :data-active="activeTab === 'signup'"
        >
          Sign Up
        </button>
      </div>

      <!-- Login Form -->
      <div v-if="activeTab === 'login'" style="padding: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem;">Welcome back</h2>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0 0 1.5rem;">Sign in to your account to access your events</p>
        
        <form @submit.prevent="handleLogin" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Email</label>
            <input 
              v-model="loginForm.email"
              type="email" 
              required
              placeholder="you@example.com"
              style="width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Password</label>
            <input 
              v-model="loginForm.password"
              type="password" 
              required
              placeholder="Enter your password"
              style="width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; color: #6b7280; cursor: pointer;">
              <input type="checkbox" style="width: 1rem; height: 1rem; cursor: pointer;" />
              <span>Remember me</span>
            </label>
            <a href="#" style="color: #16a34a; text-decoration: none; font-weight: 500;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Forgot password?</a>
          </div>
          <button 
            type="submit"
            style="width: 100%; padding: 0.875rem; font-size: 0.875rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(22, 163, 74, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(22, 163, 74, 0.3)'"
          >
            Sign In
          </button>
        </form>
      </div>

      <!-- Signup Form -->
      <div v-if="activeTab === 'signup'" style="padding: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem;">Create an account</h2>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0 0 1.5rem;">Get started with WhenAreYouFree today</p>
        
        <form @submit.prevent="handleSignup" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Full Name</label>
            <input 
              v-model="signupForm.name"
              type="text" 
              required
              placeholder="John Doe"
              style="width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Email</label>
            <input 
              v-model="signupForm.email"
              type="email" 
              required
              placeholder="you@example.com"
              style="width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">New Password</label>
            <input 
              v-model="signupForm.password"
              type="password" 
              required
              placeholder="Create a new password"
              minlength="8"
              style="width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
            />
            <p style="font-size: 0.75rem; color: #6b7280; margin: 0.5rem 0 0;">Must be at least 8 characters</p>
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Confirm New Password</label>
            <input 
              v-model="signupForm.confirmPassword"
              type="password" 
              required
              placeholder="Confirm your new password"
              :style="signupForm.confirmPassword && !passwordsMatch ? 'width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #ef4444; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;' : 'width: 100%; padding: 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #111827; transition: all 0.2s; box-sizing: border-box;'"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'; this.style.boxShadow='0 0 0 3px rgba(22, 163, 74, 0.1)'"
              @blur="handleConfirmPasswordBlur"
            />
            <p v-if="signupForm.confirmPassword && !passwordsMatch" style="font-size: 0.75rem; color: #ef4444; margin: 0.5rem 0 0;">Passwords do not match</p>
          </div>
          <div>
            <label style="display: flex; align-items: start; gap: 0.5rem; font-size: 0.875rem; color: #6b7280; cursor: pointer;">
              <input type="checkbox" required style="width: 1rem; height: 1rem; cursor: pointer; margin-top: 0.125rem; flex-shrink: 0;" />
              <span>I agree to the <a href="#" style="color: #16a34a; text-decoration: none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Terms of Service</a> and <a href="#" style="color: #16a34a; text-decoration: none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Privacy Policy</a></span>
            </label>
          </div>
          <button 
            type="submit"
            style="width: 100%; padding: 0.875rem; font-size: 0.875rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(22, 163, 74, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(22, 163, 74, 0.3)'"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Modal state
const activeTab = ref<'login' | 'signup'>('login')

// Form data
const loginForm = ref({
  email: '',
  password: ''
})

const signupForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Check if passwords match
const passwordsMatch = computed(() => {
  if (!signupForm.value.confirmPassword) return true // Don't show error until user starts typing
  return signupForm.value.password === signupForm.value.confirmPassword
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

// Close modal handler
function closeModal() {
  emit('update:modelValue', false)
}

// Handle confirm password blur
function handleConfirmPasswordBlur(event: Event) {
  const input = event.target as HTMLInputElement
  if (signupForm.value.confirmPassword && !passwordsMatch.value) {
    input.style.borderColor = '#ef4444'
    input.style.boxShadow = 'none'
  } else {
    input.style.borderColor = '#d1d5db'
    input.style.boxShadow = 'none'
  }
}

// Form handlers
function handleLogin() {
  // TODO: Implement login logic
  console.log('Login:', loginForm.value)
  // For now, just close the modal
  closeModal()
}

function handleSignup() {
  // Validate passwords match
  if (!passwordsMatch.value) {
    return
  }
  
  // TODO: Implement signup logic
  console.log('Signup:', signupForm.value)
  // For now, just close the modal
  closeModal()
}
</script>

