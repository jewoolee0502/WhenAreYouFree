<template>
  <div class="responses-section" style="background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); position: sticky; top: 5rem;">
    <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
      <h3 style="font-size: 1.125rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem;">Responses</h3>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">{{ responses.length }} participant{{ responses.length !== 1 ? 's' : '' }}</p>
    </div>
    
    <div style="max-height: 600px; overflow-y: auto;">
      <div 
        v-for="(response, index) in responses" 
        :key="index"
        style="padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 0.75rem; transition: background-color 0.2s;"
        :style="{ borderBottom: index === responses.length - 1 ? 'none' : '1px solid #e5e7eb' }"
        @mouseenter="handleResponseHover($event, true)"
        @mouseleave="handleResponseHover($event, false)"
      >
        <!-- Avatar -->
        <div 
          :style="{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: response.responded ? 'linear-gradient(135deg, #16a34a, #059669)' : '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: response.responded ? 'white' : '#9ca3af',
            fontWeight: '600',
            fontSize: '0.875rem',
            flexShrink: 0
          }"
        >
          {{ response.name.charAt(0).toUpperCase() }}
        </div>
        
        <!-- Name and Status -->
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem;">{{ response.name }}</div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span 
              :style="{
                fontSize: '0.75rem',
                color: response.responded ? '#16a34a' : '#6b7280',
                fontWeight: '500'
              }"
            >
              {{ response.responded ? 'Responded' : 'No response' }}
            </span>
            <span v-if="response.responded" style="font-size: 0.75rem; color: #9ca3af;">
              • {{ response.responseTime }}
            </span>
          </div>
        </div>
        
        <!-- Status Icon -->
        <div style="flex-shrink: 0;">
          <svg 
            v-if="response.responded" 
            style="width: 1.25rem; height: 1.25rem; color: #16a34a;" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg 
            v-else 
            style="width: 1.25rem; height: 1.25rem; color: #9ca3af;" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="responses.length === 0" style="padding: 3rem 1.5rem; text-align: center;">
        <svg style="width: 3rem; height: 3rem; color: #d1d5db; margin: 0 auto 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">No participants yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Response {
  name: string
  responded: boolean
  responseTime?: string
}

interface Props {
  responses: Response[]
}

defineProps<Props>()

function handleResponseHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#f9fafb'
  } else {
    target.style.backgroundColor = 'white'
  }
}
</script>

<style scoped>
/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  /* Remove sticky positioning on mobile */
  .responses-section {
    position: relative !important;
    top: auto !important;
  }
}
</style>

