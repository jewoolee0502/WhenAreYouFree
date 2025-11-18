<template>
  <div class="responses-section" style="background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); position: sticky; top: 5rem;">
    <div style="padding: 1rem 1rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
      <h3 style="font-size: 1rem; font-weight: 700; color: #111827; margin: 0 0 0.25rem;">Responses</h3>
      <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">{{ responses.length }} participant{{ responses.length !== 1 ? 's' : '' }}</p>
    </div>

    <div style="max-height: 600px; overflow-y: auto;">
      <div
        v-for="(response, index) in responses"
        :key="index"
        style="padding: 0.625rem 1rem; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 0.625rem; transition: background-color 0.2s;"
        :style="{ borderBottom: index === responses.length - 1 ? 'none' : '1px solid #e5e7eb' }"
        @mouseenter="handleResponseHover($event, true)"
        @mouseleave="handleResponseHover($event, false)"
      >
        <!-- Avatar -->
        <div
          :style="{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: response.responded ? 'linear-gradient(135deg, #16a34a, #059669)' : '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: response.responded ? 'white' : '#9ca3af',
            fontWeight: '600',
            fontSize: '0.75rem',
            flexShrink: 0
          }"
        >
          {{ response.name.charAt(0).toUpperCase() }}
        </div>

        <!-- Name and Status -->
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.8125rem; font-weight: 600; color: #111827; margin-bottom: 0.125rem;">{{ response.name }}</div>
          <div style="display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap;">
            <span
              :style="{
                fontSize: '0.6875rem',
                color: response.responded ? '#16a34a' : '#6b7280',
                fontWeight: '500'
              }"
            >
              {{ response.responded ? 'Responded' : 'No response' }}
            </span>
            <span v-if="response.responded" style="font-size: 0.6875rem; color: #9ca3af;">
              • {{ response.responseTime }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div v-if="response.responded" style="flex-shrink: 0; display: flex; gap: 0.375rem;">
          <button
            @click="$emit('edit', response.name)"
            style="padding: 0.3125rem 0.5rem; font-size: 0.6875rem; font-weight: 600; background: white; border: 1px solid #d1d5db; border-radius: 0.25rem; color: #374151; cursor: pointer; transition: all 0.2s;"
            @mouseenter="handleEditHover($event, true)"
            @mouseleave="handleEditHover($event, false)"
          >
            Edit
          </button>
          <button
            @click="$emit('delete', response.name)"
            style="padding: 0.3125rem 0.5rem; font-size: 0.6875rem; font-weight: 600; background: white; border: 1px solid #dc2626; border-radius: 0.25rem; color: #dc2626; cursor: pointer; transition: all 0.2s;"
            @mouseenter="handleDeleteHover($event, true)"
            @mouseleave="handleDeleteHover($event, false)"
          >
            Delete
          </button>
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

defineEmits<{
  edit: [name: string]
  delete: [name: string]
}>()

function handleResponseHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#f9fafb'
  } else {
    target.style.backgroundColor = 'white'
  }
}

function handleEditHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.borderColor = '#16a34a'
    target.style.color = '#16a34a'
  } else {
    target.style.borderColor = '#d1d5db'
    target.style.color = '#374151'
  }
}

function handleDeleteHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#fef2f2'
    target.style.borderColor = '#dc2626'
  } else {
    target.style.backgroundColor = 'white'
    target.style.borderColor = '#dc2626'
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

