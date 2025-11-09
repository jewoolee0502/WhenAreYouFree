<template>
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
    <!-- Calendar Header -->
    <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${calendarDates.length}, 1fr)`, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }">
      <div style="padding: 1rem; border-right: 1px solid #e5e7eb;"></div>
      <div 
        v-for="(date, index) in calendarDates" 
        :key="index"
        style="padding: 1rem; text-align: center; border-right: 1px solid #e5e7eb; font-weight: 600; color: #111827;"
        :style="{ borderRight: index === calendarDates.length - 1 ? 'none' : '1px solid #e5e7eb' }"
      >
        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">{{ date.dayName }}</div>
        <div style="font-size: 1rem;">{{ date.dateStr }}</div>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${calendarDates.length}, 1fr)`, maxHeight: '600px', overflowY: 'auto' }">
      <!-- Time Column -->
      <div style="border-right: 1px solid #e5e7eb; background: #f9fafb;">
        <div 
          v-for="(timeSlot, index) in timeSlots" 
          :key="index"
          style="padding: 1rem 0.75rem; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 0.875rem; color: #6b7280; font-weight: 500; min-height: 60px; display: flex; align-items: center; justify-content: flex-end;"
          :style="{ borderBottom: index === timeSlots.length - 1 ? 'none' : '1px solid #e5e7eb' }"
        >
          {{ timeSlot }}
        </div>
      </div>

      <!-- Calendar Cells -->
      <template v-for="(date, dateIndex) in calendarDates" :key="dateIndex">
        <div 
          v-for="(timeSlot, timeIndex) in timeSlots" 
          :key="`${dateIndex}-${timeIndex}`"
          style="border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; min-height: 60px; cursor: pointer; transition: background-color 0.2s;"
          :style="{ 
            borderRight: dateIndex === calendarDates.length - 1 ? 'none' : '1px solid #e5e7eb',
            borderBottom: timeIndex === timeSlots.length - 1 ? 'none' : '1px solid #e5e7eb'
          }"
          @mouseenter="handleCellHover($event, true)"
          @mouseleave="handleCellHover($event, false)"
          @click="$emit('cellClick', date, timeSlot)"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  calendarDates: Array<{ date: Date; dateStr: string; dayName: string }>
  timeSlots: string[]
}

defineProps<Props>()

defineEmits<{
  cellClick: [date: { date: Date; dateStr: string; dayName: string }, timeSlot: string]
}>()

function handleCellHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#f0fdf4'
  } else {
    target.style.backgroundColor = 'white'
  }
}
</script>

