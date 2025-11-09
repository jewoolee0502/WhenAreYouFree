<template>
  <div style="height: 100vh; overflow: hidden; background: #ffffff; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column;">
    <!-- Navigation -->
    <Navbar variant="dashboard" :is-authenticated="isAuthenticated" @sign-out="handleSignOut" @sign-in="handleSignIn" />

    <!-- Dashboard Content -->
    <div style="flex: 1; overflow: hidden; padding: 2rem; max-width: 1400px; margin: 0 auto; width: 100%; display: flex; flex-direction: column;">
      <!-- Settings and Buttons Section -->
      <div class="settings-buttons-grid" style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; margin-bottom: 1.5rem; align-items: start; flex-shrink: 0;">
        <!-- Calendar Settings -->
        <CalendarSettings
          v-model:timezone="timezone"
          v-model:timeFormat="timeFormat"
          v-model:dateInputText="dateInputText"
          v-model:showDatePicker="showDatePicker"
          v-model:startTime="startTime"
          v-model:endTime="endTime"
          v-model:timeIncrement="timeIncrement"
          :current-month="currentMonth"
          :current-year="currentYear"
          :selected-dates="selectedDates"
          :is-selecting="isSelecting"
          :selection-mode="selectionMode"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :date-input-width="dateInputWidth"
          @update-calendar="updateCalendar"
          @date-input="handleDateInput"
          @date-input-focus="handleDateInputFocus"
          @date-input-blur="handleDateInputBlur"
          @previous-month="previousMonth"
          @next-month="nextMonth"
          @start-date-selection="startDateSelection"
          @continue-date-selection="continueDateSelection"
          @end-date-selection="endDateSelection"
          @clear-selection="clearSelection"
        />

        <!-- Action Buttons -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button 
            @click="copyLink"
            :disabled="copyLinkLoading"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              background: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              color: copyLinkLoading ? '#9ca3af' : '#374151',
              cursor: copyLinkLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: copyLinkLoading ? 0.6 : 1,
              width: '100%'
            }"
            @mouseenter="handleCopyLinkHover($event, true)"
            @mouseleave="handleCopyLinkHover($event, false)"
          >
            <svg v-if="!copyLinkSuccess" style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else style="width: 1rem; height: 1rem; color: #16a34a;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ copyLinkSuccess ? 'Link copied!' : 'Copy link' }}</span>
          </button>
          
          <button 
            @click="addAvailability"
            style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 3px 0 rgba(22, 163, 74, 0.3); width: 100%;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(22, 163, 74, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px 0 rgba(22, 163, 74, 0.3)'"
          >
            <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add availability</span>
          </button>

          <!-- Cancel and Save Buttons (shown when in manual selection mode) -->
          <div v-if="isManualSelectionMode" style="display: flex; gap: 0.75rem;">
            <button 
              @click="handleCancelManualSelection"
              style="flex: 1; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; background: white; border: 1px solid #dc2626; border-radius: 0.5rem; color: #dc2626; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.backgroundColor='#fef2f2'; this.style.transform='translateY(-1px)'"
              onmouseout="this.style.backgroundColor='white'; this.style.transform='translateY(0)'"
            >
              Cancel
            </button>
            <button 
              @click="handleSaveManualSelection"
              style="flex: 1; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; background: white; border: 1px solid #16a34a; border-radius: 0.5rem; color: #16a34a; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.backgroundColor='#f0fdf4'; this.style.transform='translateY(-1px)'"
              onmouseout="this.style.backgroundColor='white'; this.style.transform='translateY(0)'"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar and Responses Section -->
      <div class="calendar-responses-grid" style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: stretch; flex: 1; min-height: 0;">
        <!-- Calendar Section -->
        <div style="display: flex; flex-direction: column; min-height: 0;">
          <Calendar
          :calendar-dates="calendarDates"
          :time-slots="timeSlots"
          :hourly-labels="hourlyLabels"
          :time-increment="timeIncrement"
          :manual-selection-mode="isManualSelectionMode"
          :selected-slots="selectedAvailabilitySlots"
          @cell-click="handleCellClick"
          @cell-select="handleCellSelect"
          />
        </div>

        <!-- Responses Section -->
        <Responses :responses="responses" />
      </div>
    </div>

    <!-- Add Availability Modal -->
    <AddAvailability v-model="showAddAvailabilityModal" @manual="handleManualSelection" />

    <!-- Login/Signup Modal -->
    <LoginSignupModal v-model="showModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Meta tags
useHead({
  meta: [
    {
      name: 'description',
      content: 'Manage your calendar and schedule meetings'
    }
  ]
})

// Authentication state (defaults to false for guests)
const isAuthenticated = ref(false)
const showModal = ref(false)

// Calendar settings
const selectedDates = ref<Date[]>([])
const startTime = ref('09:00')
const endTime = ref('16:00')
const timezone = ref('America/Los_Angeles')
const timeFormat = ref('12h')
const timeIncrement = ref<15 | 30 | 60>(30)

// Date picker state
const showDatePicker = ref(false)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const isSelecting = ref(false)
const selectionMode = ref<'select' | 'deselect'>('select')
const selectionStart = ref<Date | null>(null)
const selectionEnd = ref<Date | null>(null)
const dateInputText = ref('')
const isDateInputFocused = ref(false)


// Button states
const copyLinkLoading = ref(false)
const copyLinkSuccess = ref(false)
const showAddAvailabilityModal = ref(false)

// Manual selection mode
const isManualSelectionMode = ref(false)
const selectedAvailabilitySlots = ref<Set<string>>(new Set())

// Responses data
interface Response {
  name: string
  responded: boolean
  responseTime?: string
}

const responses = ref<Response[]>([
  { name: 'John Doe', responded: true, responseTime: '2 hours ago' },
  { name: 'Jane Smith', responded: true, responseTime: '1 day ago' },
  { name: 'Bob Johnson', responded: false },
  { name: 'Alice Williams', responded: true, responseTime: '3 hours ago' },
  { name: 'Charlie Brown', responded: false },
  { name: 'Diana Prince', responded: true, responseTime: '5 minutes ago' }
])

// Initialize with default dates (today + next 4 days)
onMounted(() => {
  if (selectedDates.value.length === 0) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      selectedDates.value.push(date)
    }
  }
  updateDateInputText()
  updateCalendar()
  
  // Close date picker when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  const datePicker = document.querySelector('.date-picker-calendar')
  const datePickerButton = target.closest('[data-date-picker-button]')
  const dateInput = target.closest('input[type="text"]')
  
  if (datePicker && !datePicker.contains(target) && !datePickerButton && !dateInput) {
    showDatePicker.value = false
  }
}


// Calculate input width based on content
const dateInputWidth = computed(() => {
  // Use the actual placeholder text when input is empty to ensure it's never cut off
  const placeholderText = 'YYYY/MM/DD - YYYY/MM/DD'
  const text = dateInputText.value || placeholderText
  
  const charWidth = 11 // pixels per character (slightly wider)
  const extraPadding = 10 // extra space for better readability
  const calculatedWidth = (text.length * charWidth) + extraPadding
  
  // Ensure minimum width is at least enough for the placeholder plus extra space
  const minWidth = (placeholderText.length * charWidth) + extraPadding
  return `${Math.max(calculatedWidth, minWidth)}px`
})

// Update dateInputText when selectedDates changes (but not when user is typing)
watch(selectedDates, () => {
  if (!isDateInputFocused.value) {
    updateDateInputText()
  }
}, { deep: true })

function updateDateInputText() {
  if (selectedDates.value.length === 0) {
    dateInputText.value = ''
    return
  }
  
  const sorted = [...selectedDates.value].sort((a, b) => a.getTime() - b.getTime())
  if (sorted.length === 1) {
    const date = sorted[0]
    if (date) {
      dateInputText.value = formatDateForInput(date)
    }
  } else {
    // Format as range: YYYY/MM/DD - YYYY/MM/DD
    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    if (first && last) {
      dateInputText.value = `${formatDateForInput(first)} - ${formatDateForInput(last)}`
    }
  }
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

// Generate calendar days for date picker
const calendarDays = computed(() => {
  const days: (Date | null)[] = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startDayOfWeek = firstDay.getDay()
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null)
  }
  
  // Add all days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(currentYear.value, currentMonth.value, day))
  }
  
  return days
})

// Generate calendar dates from selected dates
const calendarDates = computed(() => {
  if (selectedDates.value.length === 0) return []
  
  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Sort dates chronologically
  const sortedDates = [...selectedDates.value].sort((a, b) => a.getTime() - b.getTime())
  
  return sortedDates.map(date => {
    const month = shortMonthNames[date.getMonth()]
    const day = date.getDate()
    const dayName = dayNames[date.getDay()] ?? 'Sun'
    
    return {
      date: date,
      dateStr: `${month} ${day}`,
      dayName: dayName
    }
  })
})

// Generate time slots - hourly intervals (one slot per hour)
const timeSlots = computed(() => {
  const slots = []
  const startParts = startTime.value.split(':').map(Number)
  const endParts = endTime.value.split(':').map(Number)
  const startHour = startParts[0] ?? 9
  const endHour = endParts[0] ?? 16
  
  // Generate one slot per hour from start to end (inclusive)
  for (let hour = startHour; hour <= endHour; hour++) {
    const timeStr = formatTime(hour, 0)
    slots.push(timeStr)
  }
  
  return slots
})

// Generate hourly labels for the time column (same as time slots now)
const hourlyLabels = computed(() => {
  return timeSlots.value
})

// Format time based on 12h/24h format
function formatTime(hour: number, minute: number): string {
  if (timeFormat.value === '12h') {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const minuteStr = minute === 0 ? '' : `:${String(minute).padStart(2, '0')}`
    return `${displayHour}${minuteStr} ${period}`
  } else {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }
}

// Date picker functions
function previousMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function startDateSelection(date: Date | null) {
  if (!date) return
  isSelecting.value = true
  selectionStart.value = new Date(date)
  selectionEnd.value = new Date(date)
  
  // Determine selection mode based on whether the initial date is selected
  const dateStr = dateToKey(date)
  const isSelected = selectedDates.value.some(d => dateToKey(d) === dateStr)
  selectionMode.value = isSelected ? 'deselect' : 'select'
  
  // Toggle the initial date
  if (isSelected) {
    selectedDates.value = selectedDates.value.filter(d => dateToKey(d) !== dateStr)
  } else {
    if (!selectedDates.value.some(d => dateToKey(d) === dateStr)) {
      selectedDates.value.push(new Date(date))
    }
  }
}

function continueDateSelection(date: Date | null) {
  if (!isSelecting.value || !date || !selectionStart.value) return
  selectionEnd.value = new Date(date)
  updateSelectionRange()
}

function updateSelectionRange() {
  if (!selectionStart.value || !selectionEnd.value) return
  
  let start = new Date(selectionStart.value)
  let end = new Date(selectionEnd.value)
  
  // Ensure start is before end
  if (start.getTime() > end.getTime()) {
    const temp = start
    start = end
    end = temp
  }
  
  // Generate all dates in range
  const current = new Date(start)
  current.setHours(0, 0, 0, 0)
  
  while (current.getTime() <= end.getTime()) {
    const dateKey = dateToKey(current)
    const isSelected = selectedDates.value.some(d => dateToKey(d) === dateKey)
    
    if (selectionMode.value === 'select' && !isSelected) {
      selectedDates.value.push(new Date(current))
    } else if (selectionMode.value === 'deselect' && isSelected) {
      selectedDates.value = selectedDates.value.filter(d => dateToKey(d) !== dateKey)
    }
    
    current.setDate(current.getDate() + 1)
  }
}

function endDateSelection() {
  isSelecting.value = false
  selectionStart.value = null
  selectionEnd.value = null
}

function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}


function clearSelection() {
  selectedDates.value = []
}

// Date input handling functions
function handleDateInput() {
  const input = dateInputText.value.trim()
  if (!input) {
    selectedDates.value = []
    return
  }
  
  // Check if input is a range format: YYYY/MM/DD - YYYY/MM/DD
  const rangeMatch = input.match(/^(\d{4}\/\d{2}\/\d{2})\s*-\s*(\d{4}\/\d{2}\/\d{2})$/)
  if (rangeMatch && rangeMatch[1] && rangeMatch[2]) {
    const startDate = parseDateInput(rangeMatch[1])
    const endDate = parseDateInput(rangeMatch[2])
    
    if (startDate && endDate) {
      // Generate all dates in the range
      const dates: Date[] = []
      let current = new Date(startDate)
      current.setHours(0, 0, 0, 0)
      let end = new Date(endDate)
      end.setHours(0, 0, 0, 0)
      
      // Ensure start is before end
      if (current.getTime() > end.getTime()) {
        const temp = current
        current = end
        end = temp
      }
      
      while (current.getTime() <= end.getTime()) {
        dates.push(new Date(current))
        current.setDate(current.getDate() + 1)
      }
      
      selectedDates.value = dates
      return
    }
  }
  
  // Parse comma-separated dates or single date
  const dateStrings = input.split(',').map(s => s.trim()).filter(s => s)
  const parsedDates: Date[] = []
  
  for (const dateStr of dateStrings) {
    const date = parseDateInput(dateStr)
    if (date) {
      // Normalize to midnight
      date.setHours(0, 0, 0, 0)
      parsedDates.push(date)
    }
  }
  
  // Remove duplicates
  const uniqueDates = parsedDates.filter((date, index, self) =>
    index === self.findIndex(d => dateToKey(d) === dateToKey(date))
  )
  
  selectedDates.value = uniqueDates
}

function parseDateInput(input: string): Date | null {
  // Match YYYY/MM/DD or YYYY-MM-DD format (accept both for flexibility)
  const dateRegex = /^(\d{4})[\/\-](\d{2})[\/\-](\d{2})$/
  const match = input.match(dateRegex)
  
  if (!match || !match[1] || !match[2] || !match[3]) return null
  
  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10) - 1 // Month is 0-indexed
  const day = parseInt(match[3], 10)
  
  // Validate date
  if (month < 0 || month > 11) return null
  if (day < 1 || day > 31) return null
  
  const date = new Date(year, month, day)
  
  // Check if date is valid (handles invalid dates like Feb 30)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }
  
  return date
}

function handleDateInputFocus() {
  isDateInputFocused.value = true
}

function handleDateInputBlur() {
  isDateInputFocused.value = false
  // Update input text to reflect current selection
  updateDateInputText()
}


// Update calendar when settings change
function updateCalendar() {
  // Calendar will update automatically through computed properties
}

// Handle cell click
function handleCellClick(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string) {
  if (isManualSelectionMode.value) {
    // Toggle selection in manual mode
    const slotKey = `${date.date.getTime()}-${timeSlot}`
    if (selectedAvailabilitySlots.value.has(slotKey)) {
      selectedAvailabilitySlots.value.delete(slotKey)
    } else {
      selectedAvailabilitySlots.value.add(slotKey)
    }
  } else {
    console.log('Cell clicked:', date.dateStr, timeSlot)
    // You can add event creation logic here
  }
}

// Handle cell select (for drag selection)
function handleCellSelect(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string, isSelected: boolean) {
  if (!isManualSelectionMode.value) return
  
  const slotKey = `${date.date.getTime()}-${timeSlot}`
  if (isSelected) {
    selectedAvailabilitySlots.value.add(slotKey)
  } else {
    selectedAvailabilitySlots.value.delete(slotKey)
  }
}

// Handle manual selection mode
function handleManualSelection() {
  isManualSelectionMode.value = true
  // Optionally clear previous selections
  // selectedAvailabilitySlots.value.clear()
}

// Handle cancel manual selection
function handleCancelManualSelection() {
  isManualSelectionMode.value = false
  // Optionally clear selections when canceling
  selectedAvailabilitySlots.value.clear()
}

// Handle save manual selection
function handleSaveManualSelection() {
  // TODO: Implement save logic to persist the selected availability slots
  console.log('Saving availability slots:', selectedAvailabilitySlots.value)
  isManualSelectionMode.value = false
  // You can add API call here to save the availability
}

// Copy link to clipboard
async function copyLink() {
  if (copyLinkLoading.value) return
  
  copyLinkLoading.value = true
  copyLinkSuccess.value = false
  
  try {
    // Get the current page URL
    const url = window.location.href
    
    // Copy to clipboard
    await navigator.clipboard.writeText(url)
    
    copyLinkSuccess.value = true
    
    // Reset success message after 2 seconds
    setTimeout(() => {
      copyLinkSuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      copyLinkSuccess.value = true
      setTimeout(() => {
        copyLinkSuccess.value = false
      }, 2000)
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr)
    }
    document.body.removeChild(textArea)
  } finally {
    copyLinkLoading.value = false
  }
}

// Handle copy link button hover
function handleCopyLinkHover(event: MouseEvent, isEntering: boolean) {
  if (copyLinkLoading.value) return
  const target = event.target as HTMLElement
  if (isEntering) {
    target.style.borderColor = '#16a34a'
    target.style.color = '#16a34a'
  } else {
    target.style.borderColor = '#d1d5db'
    target.style.color = '#374151'
  }
}

// Handle sign in
function handleSignIn() {
  showModal.value = true
}

// Handle sign out
function handleSignOut() {
  // You can add sign out logic here
  console.log('Sign out clicked')
  isAuthenticated.value = false
  // For now, this could navigate to login page or clear session
}

// Add availability
function addAvailability() {
  showAddAvailabilityModal.value = true
}

</script>

<style scoped>
/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  /* Stack settings and buttons on tablets and smaller */
  .settings-buttons-grid {
    grid-template-columns: 1fr !important;
  }
  
  /* Stack calendar and responses on tablets and smaller */
  .calendar-responses-grid {
    grid-template-columns: 1fr !important;
  }
  
  /* Remove sticky positioning on mobile */
  .responses-section {
    position: relative !important;
    top: auto !important;
  }
}

@media (max-width: 768px) {
  div[style*="padding: 2rem"] {
    padding: 1rem !important;
  }
  
  div[style*="grid-template-columns: repeat(auto-fit"] {
    grid-template-columns: 1fr !important;
  }
  
  /* Grid columns will be handled by inline styles */
  
  div[style*="max-height: 600px"] {
    max-height: 400px !important;
  }
}
</style>
