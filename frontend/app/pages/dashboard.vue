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
      <!-- Settings and Buttons Section -->
      <div class="settings-buttons-grid" style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; margin-bottom: 1.5rem; align-items: start;">
        <!-- Calendar Settings -->
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 1.5rem;">Calendar Settings</h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            <!-- Dates Selection -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Dates</label>
              <div style="position: relative; display: inline-block;">
                <input 
                  type="text"
                  v-model="dateInputText"
                  @input="handleDateInput"
                  @focus="handleDateInputFocus"
                  @blur="handleDateInputBlur"
                  @click.stop="showDatePicker = true"
                  data-date-picker-button
                  placeholder="YYYY/MM/DD - YYYY/MM/DD"
                  :style="{
                    width: dateInputWidth,
                    padding: '0.625rem 2.5rem 0.625rem 0.75rem',
                    border: `1px solid ${showDatePicker ? '#16a34a' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#111827',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, width 0.2s'
                  }"
                />
                <div 
                  @click.stop="showDatePicker = !showDatePicker"
                  data-date-picker-button
                  style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); cursor: pointer; pointer-events: auto; display: flex; align-items: center; justify-content: center; z-index: 1;"
                >
                  <svg 
                    style="width: 1rem; height: 1rem; transition: transform 0.2s; color: #6b7280;" 
                    :style="{ transform: showDatePicker ? 'rotate(180deg)' : 'rotate(0deg)' }" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <!-- Date Picker Calendar -->
                <div 
                  v-if="showDatePicker"
                  class="date-picker-calendar"
                  @click.stop
                  style="position: absolute; top: calc(100% + 0.5rem); left: 0; background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); z-index: 100; min-width: 300px;"
                >
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <button 
                      @click="previousMonth"
                      @mouseenter="handleMonthButtonHover($event, true)"
                      @mouseleave="handleMonthButtonHover($event, false)"
                      style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;"
                    >
                      &lt;
                    </button>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin: 0;">{{ currentMonthName }} {{ currentYear }}</h3>
                    <button 
                      @click="nextMonth"
                      @mouseenter="handleMonthButtonHover($event, true)"
                      @mouseleave="handleMonthButtonHover($event, false)"
                      style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;"
                    >
                      &gt;
                    </button>
                  </div>
                  
                  <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; margin-bottom: 0.5rem;">
                    <div v-for="day in weekDays" :key="day" style="text-align: center; font-size: 0.75rem; font-weight: 600; color: #9ca3af; padding: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
                      {{ day }}
                    </div>
                  </div>
                  
                  <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem;">
                    <div 
                      v-for="(date, index) in calendarDays" 
                      :key="index"
                      @mousedown="startDateSelection(date)"
                      @mouseenter="continueDateSelection(date)"
                      @mouseup="endDateSelection"
                      :style="getDatePickerCellStyle(date)"
                      style="padding: 0.5rem; text-align: center; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; user-select: none;"
                    >
                      {{ date ? date.getDate() : '' }}
                    </div>
                  </div>
                  
                  <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button 
                      @click="clearSelection"
                      @mouseenter="handleButtonHover($event, true, '#16a34a')"
                      @mouseleave="handleButtonHover($event, false, '#d1d5db')"
                      style="padding: 0.5rem 1rem; font-size: 0.875rem; background: transparent; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s;"
                    >
                      Clear
                    </button>
                    <button 
                      @click="showDatePicker = false"
                      @mouseenter="handleDoneButtonHover($event, true)"
                      @mouseleave="handleDoneButtonHover($event, false)"
                      style="padding: 0.5rem 1rem; font-size: 0.875rem; background: linear-gradient(135deg, #16a34a, #059669); border: none; border-radius: 0.5rem; color: white; cursor: pointer; transition: all 0.2s; font-weight: 600;"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
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
        </div>
      </div>

      <!-- Calendar and Responses Section -->
      <div class="calendar-responses-grid" style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start;">
        <!-- Calendar Section -->
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
        <!-- Calendar Header -->
        <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${selectedDates.length}, 1fr)`, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }">
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
        <div :style="{ display: 'grid', gridTemplateColumns: `80px repeat(${selectedDates.length}, 1fr)`, maxHeight: '600px', overflowY: 'auto' }">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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
const selectedDates = ref<Date[]>([])
const startTime = ref('09:00')
const endTime = ref('16:00')
const timezone = ref('America/Los_Angeles')
const timeFormat = ref('12h')

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

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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

// Computed properties for date picker
const currentMonthName = computed(() => monthNames[currentMonth.value])

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

// Generate time slots
const timeSlots = computed(() => {
  const slots = []
  const startParts = startTime.value.split(':').map(Number)
  const endParts = endTime.value.split(':').map(Number)
  const startHour = startParts[0] ?? 9
  const startMinute = startParts[1] ?? 0
  const endHour = endParts[0] ?? 16
  const endMinute = endParts[1] ?? 0
  
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

function isDateSelected(date: Date | null): boolean {
  if (!date) return false
  return selectedDates.value.some(d => dateToKey(d) === dateToKey(date))
}

function isDateInSelectionRange(date: Date | null): boolean {
  if (!date || !selectionStart.value || !selectionEnd.value) return false
  const dateTime = date.getTime()
  const startTime = selectionStart.value.getTime()
  const endTime = selectionEnd.value.getTime()
  const minTime = Math.min(startTime, endTime)
  const maxTime = Math.max(startTime, endTime)
  return dateTime >= minTime && dateTime <= maxTime
}

function getDatePickerCellStyle(date: Date | null) {
  if (!date) {
    return { color: 'transparent', cursor: 'default' }
  }
  
  const isSelected = isDateSelected(date)
  const inRange = isDateInSelectionRange(date)
  const isToday = dateToKey(date) === dateToKey(new Date())
  const isCurrentlySelecting = isSelecting.value && inRange
  
  // Show different styles for select vs deselect mode during dragging
  if (isCurrentlySelecting) {
    if (selectionMode.value === 'deselect') {
      // Deselect mode: show red background with strikethrough to indicate removal
      return {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        fontWeight: '600',
        border: '2px solid #dc2626',
        textDecoration: 'line-through',
        opacity: '0.8'
      }
    } else {
      // Select mode: show green background
      return {
        backgroundColor: '#16a34a',
        color: 'white',
        fontWeight: '600',
        opacity: '1'
      }
    }
  }
  
  // Already selected dates (not in current drag range)
  if (isSelected && !inRange) {
    return {
      backgroundColor: '#16a34a',
      color: 'white',
      fontWeight: '600',
      opacity: '1'
    }
  }
  
  if (isToday && !isSelected) {
    return {
      backgroundColor: '#f0fdf4',
      color: '#16a34a',
      fontWeight: '600',
      border: '1px solid #16a34a',
      opacity: '1'
    }
  }
  
  return {
    backgroundColor: 'transparent',
    color: '#111827',
    opacity: '1'
  }
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

function handleMonthButtonHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  target.style.color = isEntering ? '#111827' : '#6b7280'
}

function handleButtonHover(event: MouseEvent, isEntering: boolean, defaultColor: string) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.borderColor = '#16a34a'
    target.style.color = '#16a34a'
  } else {
    target.style.borderColor = defaultColor
    target.style.color = '#374151'
  }
}

function handleDoneButtonHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  target.style.transform = isEntering ? 'translateY(-1px)' : 'translateY(0)'
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

// Handle calendar cell hover
function handleCellHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#f0fdf4'
  } else {
    target.style.backgroundColor = 'white'
  }
}

// Handle response item hover
function handleResponseHover(event: MouseEvent, isEntering: boolean) {
  const target = event.currentTarget as HTMLElement
  if (isEntering) {
    target.style.backgroundColor = '#f9fafb'
  } else {
    target.style.backgroundColor = 'white'
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
