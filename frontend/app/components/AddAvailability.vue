<template>
  <div v-if="modelValue" @click.self="closeModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: #f9fafb; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); max-width: 480px; width: 100%; position: relative; padding: 2rem;">
      <!-- Close Button -->
      <button @click="closeModal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.5rem; transition: color 0.2s; z-index: 10;" onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#9ca3af'">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header Section -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem; text-align: center;">
          How would you like to add your availability?
        </h2>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0; text-align: center;">
          You can always manually edit after autofilling
        </p>
      </div>

      <!-- Calendar Integration Options -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        <!-- Google Calendar Button -->
        <button 
          @click="handleGoogleCalendar"
          style="display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); width: 100%;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.05)'"
        >
          <!-- Google Logo -->
          <svg style="width: 1.5rem; height: 1.5rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style="font-size: 0.875rem; font-weight: 500; color: #374151; flex: 1; text-align: left;">
            Autofill with Google Calendar
          </span>
        </button>

        <!-- Apple Calendar Button -->
        <button 
          @click="handleAppleCalendar"
          style="display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); width: 100%;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.05)'"
        >
          <!-- Apple Logo -->
          <svg style="width: 1.5rem; height: 1.5rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="#000000">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <span style="font-size: 0.875rem; font-weight: 500; color: #374151; flex: 1; text-align: left;">
            Autofill with Apple Calendar
          </span>
        </button>

        <!-- Outlook Calendar Button -->
        <button 
          @click="handleOutlookCalendar"
          style="display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); width: 100%;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.05)'"
        >
          <!-- Outlook Logo -->
          <svg style="width: 1.5rem; height: 1.5rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none">
            <path d="M7.5 21H2.352a1.15 1.15 0 0 1-1.15-1.15V4.15A1.15 1.15 0 0 1 2.352 3H7.5v18z" fill="#0078D4"/>
            <path d="M21.648 3H9.75v18h11.898a1.15 1.15 0 0 0 1.15-1.15V4.15A1.15 1.15 0 0 0 21.648 3z" fill="#0078D4"/>
            <path d="M9.75 3v18h11.898a1.15 1.15 0 0 0 1.15-1.15V4.15A1.15 1.15 0 0 0 21.648 3H9.75z" fill="#28A8EA"/>
            <path d="M7.5 3H2.352a1.15 1.15 0 0 0-1.15 1.15v15.7A1.15 1.15 0 0 0 2.352 21H7.5V3z" fill="#0078D4"/>
            <path d="M15.75 12l-3-2.25v1.5H9.75v1.5h3v1.5l3-2.25z" fill="#FFFFFF"/>
          </svg>
          <span style="font-size: 0.875rem; font-weight: 500; color: #374151; flex: 1; text-align: left;">
            Autofill with Outlook Calendar
          </span>
        </button>
      </div>

      <!-- Separator -->
      <div style="position: relative; margin: 1.5rem 0; text-align: center;">
        <div style="height: 1px; background: #e5e7eb; width: 100%;"></div>
        <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f9fafb; padding: 0 0.75rem; font-size: 0.875rem; color: #9ca3af;">
          or
        </span>
      </div>

      <!-- Manual Input Button -->
      <button 
        @click="handleManual"
        style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.875rem 1rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); width: 100%;"
        onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.05)'"
      >
        <span style="font-size: 0.875rem; font-weight: 500; color: #374151;">
          Manually
        </span>
      </button>
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
  'manual': []
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

// Calendar integration handlers
function handleGoogleCalendar() {
  // TODO: Implement Google Calendar integration
  console.log('Google Calendar clicked')
  closeModal()
}

function handleAppleCalendar() {
  // TODO: Implement Apple Calendar integration
  console.log('Apple Calendar clicked')
  closeModal()
}

function handleOutlookCalendar() {
  // TODO: Implement Outlook Calendar integration
  console.log('Outlook Calendar clicked')
  closeModal()
}

// Manual input handler
function handleManual() {
  emit('manual')
  closeModal()
}
</script>

<style scoped>
/* Mobile Responsive Styles */
@media (max-width: 768px) {
  div[style*="max-width: 480px"] {
    max-width: 90% !important;
    padding: 1.5rem !important;
  }
  
  h2[style*="font-size: 1.5rem"] {
    font-size: 1.25rem !important;
  }
  
  p[style*="font-size: 0.875rem"] {
    font-size: 0.8125rem !important;
  }
}
</style>

