<template>
  <div style="min-height: 100vh; background: #ffffff; font-family: system-ui, -apple-system, sans-serif;">
    <!-- Navigation -->
    <nav style="background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; width: 100%; border-bottom: 1px solid #e5e7eb;">
      <div style="width: 100%; padding: 0 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 4rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <div style="width: 2rem; height: 2rem; background: linear-gradient(135deg, #16a34a, #10b981); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);">
              <svg style="width: 1.25rem; height: 1.25rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
            <h1 style="font-size: 1.25rem; font-weight: 700; background: linear-gradient(135deg, #16a34a, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0;">WhenAreYouFree</h1>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <NuxtLink to="/" style="text-decoration: none; color: #374151; font-size: 0.875rem; font-weight: 500;">Home</NuxtLink>
            <button style="padding: 0.5rem 1.25rem; font-size: 0.875rem; background: transparent; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s; font-weight: 500;" onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'" onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'">Sign out</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Dashboard Content -->
    <div style="padding: 2rem; max-width: 1400px; margin: 0 auto;">
      <!-- Controls Section -->
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 1.5rem;">Calendar Settings</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <!-- Start Date -->
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Start Date</label>
            <input 
              type="date" 
              v-model="startDate"
              @change="updateCalendar"
              style="width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
              onblur="this.style.borderColor='#d1d5db'"
            />
          </div>

          <!-- Number of Dates -->
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Number of Dates</label>
            <input 
              type="number" 
              v-model.number="numberOfDates"
              @change="updateCalendar"
              min="1"
              max="14"
              style="width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
              onblur="this.style.borderColor='#d1d5db'"
            />
          </div>

          <!-- Start Time -->
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Start Time</label>
            <input 
              type="time" 
              v-model="startTime"
              @change="updateCalendar"
              style="width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
              onblur="this.style.borderColor='#d1d5db'"
            />
          </div>

          <!-- End Time -->
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">End Time</label>
            <input 
              type="time" 
              v-model="endTime"
              @change="updateCalendar"
              style="width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
              onblur="this.style.borderColor='#d1d5db'"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <button 
          @click="copyLink"
          :disabled="copyLinkLoading"
          :style="{
            display: 'flex',
            alignItems: 'center',
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
            opacity: copyLinkLoading ? 0.6 : 1
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
          style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 3px 0 rgba(22, 163, 74, 0.3);"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 6px -1px rgba(22, 163, 74, 0.4)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px 0 rgba(22, 163, 74, 0.3)'"
        >
          <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add availability</span>
        </button>
      </div>

      <!-- Calendar and Responses Section -->
      <div class="calendar-responses-grid" style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start;">
        <!-- Calendar Section -->
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
        <!-- Calendar Header -->
        <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${numberOfDates}, 1fr)`, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }">
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
        <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${numberOfDates}, 1fr)`, maxHeight: '600px', overflowY: 'auto' }">
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
              @mouseenter="$event.target.style.backgroundColor='#f0fdf4'"
              @mouseleave="$event.target.style.backgroundColor='white'"
              @click="handleCellClick(date, timeSlot)"
            >
            </div>
          </template>
        </div>

        <!-- Calendar Footer -->
        <div style="padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; background: #f9fafb; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <span style="font-size: 0.875rem; color: #6b7280;">Shown in</span>
          <select 
            v-model="timezone"
            style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
            onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
            onblur="this.style.borderColor='#d1d5db'"
          >
            <option value="America/Los_Angeles">(GMT-7:00) Pacific Time</option>
            <option value="America/New_York">(GMT-5:00) Eastern Time</option>
            <option value="America/Chicago">(GMT-6:00) Central Time</option>
            <option value="America/Denver">(GMT-7:00) Mountain Time</option>
            <option value="Europe/London">(GMT+0:00) London</option>
            <option value="Europe/Paris">(GMT+1:00) Paris</option>
            <option value="Asia/Tokyo">(GMT+9:00) Tokyo</option>
            <option value="UTC">UTC</option>
          </select>
          
          <select 
            v-model="timeFormat"
            @change="updateCalendar"
            style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
            onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
            onblur="this.style.borderColor='#d1d5db'"
          >
            <option value="12h">12h</option>
            <option value="24h">24h</option>
          </select>
        </div>
        </div>

        <!-- Responses Section -->
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
              @mouseenter="$event.currentTarget.style.backgroundColor='#f9fafb'"
              @mouseleave="$event.currentTarget.style.backgroundColor='white'"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Meta tags
useHead({
  title: 'Dashboard - WhenAreYouFree',
  meta: [
    {
      name: 'description',
      content: 'Manage your calendar and schedule meetings'
    }
  ]
})

// Calendar settings
const startDate = ref('')
const numberOfDates = ref(5)
const startTime = ref('09:00')
const endTime = ref('16:00')
const timezone = ref('America/Los_Angeles')
const timeFormat = ref('12h')

// Button states
const copyLinkLoading = ref(false)
const copyLinkSuccess = ref(false)

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

// Initialize start date to today if not set
onMounted(() => {
  if (!startDate.value) {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    startDate.value = `${year}-${month}-${day}`
  }
  updateCalendar()
})

// Generate calendar dates
const calendarDates = computed(() => {
  if (!startDate.value) return []
  
  const dates = []
  const start = new Date(startDate.value)
  
  for (let i = 0; i < numberOfDates.value; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    const month = monthNames[currentDate.getMonth()]
    const day = currentDate.getDate()
    const dayName = dayNames[currentDate.getDay()]
    
    dates.push({
      date: currentDate,
      dateStr: `${month} ${day}`,
      dayName: dayName
    })
  }
  
  return dates
})

// Generate time slots
const timeSlots = computed(() => {
  const slots = []
  const [startHour, startMinute] = startTime.value.split(':').map(Number)
  const [endHour, endMinute] = endTime.value.split(':').map(Number)
  
  let currentHour = startHour
  let currentMinute = startMinute
  
  while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
    const timeStr = formatTime(currentHour, currentMinute)
    slots.push(timeStr)
    
    currentMinute += 60
    if (currentMinute >= 60) {
      currentMinute = 0
      currentHour++
    }
  }
  
  return slots
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

// Update calendar when settings change
function updateCalendar() {
  // Calendar will update automatically through computed properties
}

// Handle cell click
function handleCellClick(date: { date: Date; dateStr: string; dayName: string }, timeSlot: string) {
  console.log('Cell clicked:', date.dateStr, timeSlot)
  // You can add event creation logic here
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

// Add availability
function addAvailability() {
  // You can add availability modal or logic here
  console.log('Add availability clicked')
  // For now, this could open a modal or navigate to an availability page
}

</script>

<style scoped>
/* Mobile Responsive Styles */
@media (max-width: 1024px) {
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
