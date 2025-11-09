<template>
  <div v-if="modelValue" @click.self="closeModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: white; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); max-width: 420px; width: 100%; position: relative;">
      <!-- Close Button -->
      <button @click="closeModal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.5rem; transition: color 0.2s; z-index: 10;" onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#9ca3af'">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Content -->
      <div style="padding: 2.5rem 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem; text-align: center;">Create an Event</h2>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0 0 2rem; text-align: center;">Choose how you'd like to proceed</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- Sign In Button -->
          <button 
            @click="handleSignIn"
            style="width: 100%; padding: 1rem; font-size: 1rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(22, 163, 74, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(22, 163, 74, 0.3)'"
          >
            Sign In
          </button>

          <!-- Continue as Guest Button -->
          <button 
            @click="handleContinueAsGuest"
            style="width: 100%; padding: 1rem; font-size: 1rem; font-weight: 600; background: white; color: #111827; border: 2px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'"
            onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#111827'"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'sign-in': []
  'continue-as-guest': []
}>()

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

// Handle sign in
function handleSignIn() {
  emit('sign-in')
  closeModal()
}

// Handle continue as guest
function handleContinueAsGuest() {
  emit('continue-as-guest')
  closeModal()
}
</script>

