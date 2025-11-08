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

</script>

<style scoped>
/* Mobile Responsive Styles */
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
