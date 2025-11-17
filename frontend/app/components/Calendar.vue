<template>
  <div 
    ref="calendarContainerRef" 
    class="calendar-container"
  >
    <!-- Calendar Header - Dates as column titles -->
    <div 
      ref="calendarHeaderRef" 
      class="calendar-header"
      :style="{ gridTemplateColumns: `120px repeat(${calendarDates.length}, 1fr)` }"
    >
      <div class="header-corner-cell"></div>
      <div 
        v-for="(date, index) in calendarDates" 
        :key="index"
        class="header-date-cell"
        :class="{ 'is-today': isToday(date.date) }"
      >
        <div class="day-name">{{ date.dayName }}</div>
        <div class="date-number">{{ getDateNumber(date.date) }}</div>
        <div class="month-name">{{ getMonthName(date.date) }}</div>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div 
      class="calendar-grid"
      :style="{ 
        gridTemplateColumns: `120px repeat(${calendarDates.length}, 1fr)`,
        gridTemplateRows: `repeat(${detailedTimeSlots.length}, ${cellHeight}px)`
      }"
    >
      <!-- Each row: Hour label (only on first slot of hour) + Calendar cells -->
      <template v-for="(timeSlot, timeIndex) in detailedTimeSlots" :key="timeIndex">
        <!-- Hour Row Label - only show on first slot of each hour -->
        <div 
          v-if="isFirstSlotOfHour(timeIndex)"
          class="hour-label-cell"
          :style="{ 
            gridRow: `${timeIndex + 1} / span ${slotsPerHour}`,
            gridColumn: 1
          }"
        >
          <span class="hour-label">{{ getHourForSlotIndex(timeIndex) }}</span>
        </div>

        <!-- Calendar Cells for this time slot - One per date -->
        <div
          v-for="(date, dateIndex) in calendarDates"
          :key="`${timeIndex}-${dateIndex}`"
          :data-date-index="dateIndex"
          :data-time-index="timeIndex"
          data-calendar-cell
          class="calendar-cell"
          :class="{
            'is-manual-mode': manualSelectionMode,
            'is-selected': isCellSelected(date, timeSlot),
            'is-in-drag-range': isDragging && isCellInDragRange(date, timeSlot),
            'is-drag-selecting': isDragging && isCellInDragRange(date, timeSlot) && isDragSelecting,
            'is-hour-start': isFirstSlotOfHour(timeIndex),
            'is-hovered': isCellHovered(date, timeSlot)
          }"
          :style="{
            gridRow: timeIndex + 1,
            gridColumn: dateIndex + 2,
            backgroundColor: manualSelectionMode ? undefined : getCellBackgroundColor(date, timeSlot)
          }"
          @mouseenter="handleCellHover($event, true, date, timeSlot)"
          @mouseleave="handleCellHover($event, false, date, timeSlot)"
          @mousedown="handleCellMouseDown($event, date, timeSlot)"
          @click="handleCellClick(date, timeSlot)"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  calendarDates: Array<{ date: Date; dateStr: string; dayName: string }>
  timeSlots: string[]
  hourlyLabels?: string[]
  timeIncrement?: 15 | 30 | 60
  manualSelectionMode?: boolean
  selectedSlots?: Set<string>
  slotAvailabilityCount?: Map<string, number>
  participantColors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  timeIncrement: 60,
  manualSelectionMode: false,
  selectedSlots: () => new Set<string>(),
  slotAvailabilityCount: () => new Map<string, number>(),
  participantColors: () => []
})

// Debug: watch props to see when they change (optional - can be removed in production)
// watch(() => [props.slotAvailabilityCount?.size, props.participantColors?.length], ([slotCount, colorCount]) => {
//   console.log('[Calendar] Props updated:', {
//     slotAvailabilityCount: slotCount,
//     participantColors: colorCount
//   })
// }, { immediate: true })

// Parse hour from time string (handles both 12h and 24h formats)
function parseHourFromTimeString(timeStr: string): number | null {
  const hourMatch = timeStr.match(/(\d+)/)
  if (!hourMatch || !hourMatch[1]) return null
  
  let hour = parseInt(hourMatch[1], 10)
  
  // Handle 12h format
  if (timeStr.includes('PM') && hour < 12) {
    hour += 12
  } else if (timeStr.includes('AM') && hour === 12) {
    hour = 0
  }
  
  return hour
}

// Generate time slots based on increment
const detailedTimeSlots = computed(() => {
  const slots: string[] = []
  
  // Use hourlyLabels if available, otherwise fall back to timeSlots
  const sourceSlots = (props.hourlyLabels && props.hourlyLabels.length > 0) 
    ? props.hourlyLabels 
    : props.timeSlots
  
  if (sourceSlots.length === 0) return slots
  
  // Generate slots for each hour in the range
  for (const hourLabel of sourceSlots) {
    const hour = parseHourFromTimeString(hourLabel)
    if (hour === null) continue
    
    // Generate all slots for this hour based on increment
    const slotsPerHour = 60 / props.timeIncrement
    for (let i = 0; i < slotsPerHour; i++) {
      const minute = i * props.timeIncrement
      slots.push(formatTimeSlot(hour, minute))
    }
  }
  
  return slots
})

// Format time slot based on time format (we'll need to get this from props or infer)
function formatTimeSlot(hour: number, minute: number): string {
  // Try to infer format from existing timeSlots
  if (props.timeSlots.length > 0) {
    const sample = props.timeSlots[0]
    if (sample && (sample.includes('AM') || sample.includes('PM'))) {
      // 12h format
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      // Always include minutes when they're not zero, or when increment is less than 60
      const minuteStr = minute === 0 && props.timeIncrement === 60 ? '' : `:${String(minute).padStart(2, '0')}`
      return `${displayHour}${minuteStr} ${period}`
    }
  }
  // Default to 24h format - always include minutes
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

// Group time slots by hour for hour labels
const slotsPerHour = computed(() => 60 / props.timeIncrement)

// Get hour label for a given time slot index
function getHourForSlotIndex(slotIndex: number): string {
  const hourIndex = Math.floor(slotIndex / slotsPerHour.value)
  if (props.hourlyLabels && props.hourlyLabels[hourIndex]) {
    return props.hourlyLabels[hourIndex]
  }
  // Fallback: calculate from slot
  const slot = detailedTimeSlots.value[slotIndex]
  if (slot) {
    const hourMatch = slot.match(/(\d+)/)
    if (hourMatch && hourMatch[1]) {
      const hour = parseInt(hourMatch[1], 10)
      return formatTimeSlot(hour, 0)
    }
  }
  return ''
}

// Check if this is the first slot of an hour
function isFirstSlotOfHour(slotIndex: number): boolean {
  return slotIndex % slotsPerHour.value === 0
}

const emit = defineEmits<{
  cellClick: [date: { date: Date; dateStr: string; dayName: string }, timeSlot: string]
  cellSelect: [date: { date: Date; dateStr: string; dayName: string }, timeSlot: string, isSelected: boolean]
}>()

// Drag selection state
const isDragging = ref(false)
const dragStartCell = ref<{ date: { date: Date; dateStr: string; dayName: string }, timeSlot: string } | null>(null)
const dragEndCell = ref<{ date: { date: Date; dateStr: string; dayName: string }, timeSlot: string } | null>(null)
const isDragSelecting = ref(false)
const hasDragged = ref(false)
const clickHandledByMouseUp = ref(false)

// Hover state
const hoveredCell = ref<{ date: { date: Date; dateStr: string; dayName: string }, timeSlot: string } | null>(null)

// Dynamic height calculation
const calendarContainerRef = ref<HTMLElement | null>(null)
const calendarHeaderRef = ref<HTMLElement | null>(null)
const availableHeight = ref(600)

// Calculate dynamic cell height to fit all time slots in fixed container
const cellHeight = computed(() => {
  if (detailedTimeSlots.value.length === 0) return 60
  
  const headerHeight = calendarHeaderRef.value?.offsetHeight || 80
  const reservedSpace = headerHeight
  const usableHeight = availableHeight.value - reservedSpace
  
  if (usableHeight <= 0 || detailedTimeSlots.value.length === 0) return 1
  
  // Calculate exact height per cell to fit all slots
  // This ensures all time slots are visible in the fixed container
  // Use the exact calculated height to fit everything, even if very small
  const heightPerCell = usableHeight / detailedTimeSlots.value.length
  
  // Return the calculated height directly (with a tiny minimum to prevent rendering issues)
  // This ensures all time slots fit in the fixed container regardless of increment
  return Math.max(1, heightPerCell)
})

// Store initial container position
let initialContainerTop: number | null = null

// Update available height
function updateAvailableHeight() {
  if (!calendarContainerRef.value) return
  
  const containerHeight = calendarContainerRef.value.offsetHeight
  
  if (containerHeight > 0) {
    availableHeight.value = containerHeight
  } else {
    const viewportHeight = window.innerHeight
    const containerTop = initialContainerTop ?? calendarContainerRef.value.getBoundingClientRect().top
    const spaceFromBottom = viewportHeight - containerTop
    availableHeight.value = Math.max(300, spaceFromBottom - 20)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  nextTick(() => {
    if (calendarContainerRef.value) {
      const rect = calendarContainerRef.value.getBoundingClientRect()
      initialContainerTop = rect.top
      updateAvailableHeight()
      
      resizeObserver = new ResizeObserver(() => {
        if (calendarContainerRef.value) {
          updateAvailableHeight()
        }
      })
      resizeObserver.observe(calendarContainerRef.value)
    }
  })
  
  window.addEventListener('resize', updateAvailableHeight)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', updateAvailableHeight)
})

watch(() => [props.timeSlots.length, props.calendarDates.length, props.timeIncrement, detailedTimeSlots.value.length], () => {
  nextTick(() => {
    updateAvailableHeight()
  })
})

// Helper functions
function getCellKey(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string): string {
  return `${date.date.getTime()}-${timeSlot}`
}

function isCellSelected(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string): boolean {
  // Show selected slots in both manual mode AND view mode (for displaying group availability)
  const key = getCellKey(date, timeSlot)
  return props.selectedSlots?.has(key) ?? false
}

// Get the background color for a cell based on availability count
function getCellBackgroundColor(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string): string {
  // In manual selection mode, use the original colors
  if (props.manualSelectionMode) {
    return '' // Will use CSS classes
  }

  // Get availability count for this slot
  const key = getCellKey(date, timeSlot)
  const count = props.slotAvailabilityCount?.get(key) || 0

  // If no one is available, return white
  if (count === 0) {
    return 'white'
  }

  // Return the color based on count (0-indexed, so count-1)
  // Colors are ordered from lightest (1 person) to darkest (max people)
  const colorIndex = count - 1
  return props.participantColors?.[colorIndex] || 'white'
}

function isCellHovered(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string): boolean {
  if (!props.manualSelectionMode) return false
  if (!hoveredCell.value) return false
  return hoveredCell.value.date.date.getTime() === date.date.getTime() && 
         hoveredCell.value.timeSlot === timeSlot
}

function isToday(date: Date): boolean {
  const today = new Date()
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
}

function getDateNumber(date: Date): number {
  return date.getDate()
}

function getMonthName(date: Date): string {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return monthNames[date.getMonth()] ?? ''
}

function isCellInDragRange(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string): boolean {
  if (!dragStartCell.value || !dragEndCell.value) return false
  
  const startDateIndex = props.calendarDates.findIndex(d => d.date.getTime() === dragStartCell.value!.date.date.getTime())
  const endDateIndex = props.calendarDates.findIndex(d => d.date.getTime() === dragEndCell.value!.date.date.getTime())
  const currentDateIndex = props.calendarDates.findIndex(d => d.date.getTime() === date.date.getTime())
  
  const startTimeIndex = detailedTimeSlots.value.indexOf(dragStartCell.value.timeSlot)
  const endTimeIndex = detailedTimeSlots.value.indexOf(dragEndCell.value.timeSlot)
  const currentTimeIndex = detailedTimeSlots.value.indexOf(timeSlot)
  
  if (startDateIndex === -1 || endDateIndex === -1 || currentDateIndex === -1) return false
  if (startTimeIndex === -1 || endTimeIndex === -1 || currentTimeIndex === -1) return false
  
  const minDateIndex = Math.min(startDateIndex, endDateIndex)
  const maxDateIndex = Math.max(startDateIndex, endDateIndex)
  const minTimeIndex = Math.min(startTimeIndex, endTimeIndex)
  const maxTimeIndex = Math.max(startTimeIndex, endTimeIndex)
  
  return currentDateIndex >= minDateIndex && 
         currentDateIndex <= maxDateIndex &&
         currentTimeIndex >= minTimeIndex &&
         currentTimeIndex <= maxTimeIndex
}

// Event handlers
function handleCellHover(event: MouseEvent, isEntering: boolean, date?: { date: Date; dateStr: string; dayName: string }, timeSlot?: string) {
  if (!props.manualSelectionMode) return
  
  if (isDragging.value && isEntering && date && timeSlot) {
    dragEndCell.value = { date, timeSlot }
    // Don't show hover effect while dragging
    return
  }
  
  // Track hover state for visual feedback (only when not dragging)
  if (!isDragging.value) {
    if (isEntering && date && timeSlot) {
      hoveredCell.value = { date, timeSlot }
    } else {
      hoveredCell.value = null
    }
  }
}

function handleCellMouseDown(event: MouseEvent, date: { date: Date; dateStr: string; dayName: string }, timeSlot: string) {
  if (!props.manualSelectionMode) return
  
  event.preventDefault()
  isDragging.value = true
  hasDragged.value = false
  dragStartCell.value = { date, timeSlot }
  dragEndCell.value = { date, timeSlot }
  isDragSelecting.value = !isCellSelected(date, timeSlot)
  hoveredCell.value = null // Clear hover state when dragging starts
  
  document.addEventListener('mousemove', handleGlobalMouseMove)
  document.addEventListener('mouseup', handleGlobalMouseUp)
}

function handleGlobalMouseMove(event: MouseEvent) {
  if (!isDragging.value || !dragStartCell.value) return
  
  hasDragged.value = true
  
  const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-calendar-cell]') as HTMLElement
  if (cell) {
    const dateIndex = parseInt(cell.dataset.dateIndex || '-1')
    const timeIndex = parseInt(cell.dataset.timeIndex || '-1')
    
    if (dateIndex >= 0 && dateIndex < props.calendarDates.length &&
        timeIndex >= 0 && timeIndex < detailedTimeSlots.value.length) {
      const date = props.calendarDates[dateIndex]
      const timeSlot = detailedTimeSlots.value[timeIndex]
      
      if (!date || !timeSlot) return
      
      const newEndCell = { date, timeSlot }
      
      if (!dragEndCell.value || 
          dragEndCell.value.date.date.getTime() !== newEndCell.date.date.getTime() ||
          dragEndCell.value.timeSlot !== newEndCell.timeSlot) {
        dragEndCell.value = newEndCell
      }
    }
  }
}

function handleGlobalMouseUp(event: MouseEvent) {
  if (!isDragging.value) return
  
  const wasDragging = hasDragged.value
  const startCell = dragStartCell.value
  const endCell = dragEndCell.value
  
  if (wasDragging && startCell && endCell) {
    applyDragSelection()
  }
  
  isDragging.value = false
  dragStartCell.value = null
  dragEndCell.value = null
  hasDragged.value = false
  
  document.removeEventListener('mousemove', handleGlobalMouseMove)
  document.removeEventListener('mouseup', handleGlobalMouseUp)
  
  if (!wasDragging && startCell) {
    clickHandledByMouseUp.value = true
    handleCellClick(startCell.date, startCell.timeSlot)
    // Reset flag after nextTick to allow click event to check it
    nextTick(() => {
      clickHandledByMouseUp.value = false
    })
  }
}

function applyDragSelection() {
  if (!dragStartCell.value || !dragEndCell.value) return
  
  const startDateIndex = props.calendarDates.findIndex(d => d.date.getTime() === dragStartCell.value!.date.date.getTime())
  const endDateIndex = props.calendarDates.findIndex(d => d.date.getTime() === dragEndCell.value!.date.date.getTime())
  const startTimeIndex = detailedTimeSlots.value.indexOf(dragStartCell.value.timeSlot)
  const endTimeIndex = detailedTimeSlots.value.indexOf(dragEndCell.value.timeSlot)
  
  if (startDateIndex === -1 || endDateIndex === -1 || startTimeIndex === -1 || endTimeIndex === -1) return
  
  const minDateIndex = Math.min(startDateIndex, endDateIndex)
  const maxDateIndex = Math.max(startDateIndex, endDateIndex)
  const minTimeIndex = Math.min(startTimeIndex, endTimeIndex)
  const maxTimeIndex = Math.max(startTimeIndex, endTimeIndex)
  
  for (let dateIdx = minDateIndex; dateIdx <= maxDateIndex; dateIdx++) {
    for (let timeIdx = minTimeIndex; timeIdx <= maxTimeIndex; timeIdx++) {
      const date = props.calendarDates[dateIdx]
      const timeSlot = detailedTimeSlots.value[timeIdx]
      if (date && timeSlot) {
        emit('cellSelect', date, timeSlot, isDragSelecting.value)
      }
    }
  }
}

function handleCellClick(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string) {
  // If click was already handled by mouseup, ignore this click event
  if (clickHandledByMouseUp.value) {
    return
  }
  
  if (props.manualSelectionMode) {
    const isCurrentlySelected = isCellSelected(date, timeSlot)
    emit('cellSelect', date, timeSlot, !isCurrentlySelected)
    return
  }
  
  emit('cellClick', date, timeSlot)
}

</script>

<style scoped>
.calendar-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.calendar-header {
  display: grid;
  background: #f5f5f5;
  border-bottom: 2px solid #b0b0b0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-corner-cell {
  padding: 12px 8px;
  border-right: 1px solid #b0b0b0;
  background: #f5f5f5;
}

.header-date-cell {
  padding: 10px 8px;
  text-align: center;
  border-right: 1px solid #b0b0b0;
  background: #f5f5f5;
  transition: background-color 0.15s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-date-cell:last-child {
  border-right: none;
}

.header-date-cell.is-today {
  background: #e3f2fd;
  border-bottom: 3px solid #2196f3;
}

.hour-label-cell {
  padding: 8px;
  text-align: center;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  left: 0;
  z-index: 5;
  /* Ensure background covers content when scrolling */
  background-color: #fafafa;
}

.hour-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.day-name {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 4px;
}

.date-number {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 2px;
}

.date-label-cell.is-today .date-number {
  color: #2196f3;
}

.month-name {
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.calendar-grid {
  display: grid;
  overflow: hidden;
  background: white;
  flex: 1;
  min-height: 0;
}


.calendar-cell {
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  cursor: pointer;
  transition: background-color 0.1s;
  position: relative;
  background: white;
}

.calendar-cell:last-child {
  border-right: none;
}

/* Hour boundary styling */
.calendar-cell.is-hour-start {
  border-top: 2px solid #b0b0b0;
}

.calendar-cell.is-hour-start:first-child {
  border-top: none;
}

/* Manual mode: all selectable slots are pastel red */
.calendar-cell.is-manual-mode {
  background: #fecaca !important;
}

/* Hover effect for manual mode slots */
.calendar-cell.is-manual-mode.is-hovered:not(.is-selected) {
  background: #fca5a5 !important;
}

/* Selected slots in manual mode: pastel green */
.calendar-cell.is-manual-mode.is-selected {
  background: #a5d6a7 !important;
}

/* Hover effect for selected slots */
.calendar-cell.is-manual-mode.is-selected.is-hovered {
  background: #86c988 !important;
}

/* When2meet-style selection (for non-manual mode) - removed since we use dynamic colors */
/* .calendar-cell.is-selected {
  background: #a5d6a7;
} */

/* Drag selection preview - only in manual mode */
.calendar-cell.is-manual-mode.is-in-drag-range {
  background: #c8e6c9 !important;
}

.calendar-cell.is-manual-mode.is-in-drag-range.is-drag-selecting {
  background: #a5d6a7 !important;
}

.calendar-cell.is-manual-mode.is-in-drag-range:not(.is-drag-selecting) {
  background: #ffcdd2 !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-corner-cell {
    padding: 8px 6px;
  }
  
  .header-date-cell {
    padding: 8px 6px;
  }
  
  .hour-label-cell {
    padding: 8px 6px;
  }
  
  .day-name {
    font-size: 9px;
  }
  
  .date-number {
    font-size: 16px;
  }
  
  .month-name {
    font-size: 9px;
  }
  
  .hour-label {
    font-size: 11px;
  }
}
</style>
