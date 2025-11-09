<template>
  <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.5rem;">
    <!-- Header with Title and Timezone/Format Controls -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0;">Calendar Settings</h2>
      
      <!-- Timezone and Time Format -->
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <select 
          :value="timezone"
          @input="$emit('update:timezone', ($event.target as HTMLSelectElement).value)"
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
          :value="timeFormat"
          @change="$emit('update:timeFormat', ($event.target as HTMLSelectElement).value); $emit('updateCalendar')"
          style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s;"
          onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
          onblur="this.style.borderColor='#d1d5db'"
        >
          <option value="12h">12h</option>
          <option value="24h">24h</option>
        </select>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <!-- Dates Selection -->
      <div>
        <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Dates</label>
        <div style="position: relative; display: inline-block;">
          <input 
            type="text"
            :value="dateInputText"
            @input="$emit('update:dateInputText', ($event.target as HTMLInputElement).value); $emit('dateInput')"
            @focus="$emit('dateInputFocus')"
            @blur="$emit('dateInputBlur')"
            @click.stop="$emit('update:showDatePicker', true)"
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
            @click.stop="$emit('update:showDatePicker', !showDatePicker)"
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
                @click="$emit('previousMonth')"
                @mouseenter="handleMonthButtonHover($event, true)"
                @mouseleave="handleMonthButtonHover($event, false)"
                style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;"
              >
                &lt;
              </button>
              <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin: 0;">{{ currentMonthName }} {{ currentYear }}</h3>
              <button 
                @click="$emit('nextMonth')"
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
                @mousedown="$emit('startDateSelection', date)"
                @mouseenter="$emit('continueDateSelection', date)"
                @mouseup="$emit('endDateSelection')"
                :style="getDatePickerCellStyle(date)"
                style="padding: 0.5rem; text-align: center; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; user-select: none;"
              >
                {{ date ? date.getDate() : '' }}
              </div>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button 
                @click="$emit('clearSelection')"
                @mouseenter="handleButtonHover($event, true, '#16a34a')"
                @mouseleave="handleButtonHover($event, false, '#d1d5db')"
                style="padding: 0.5rem 1rem; font-size: 0.875rem; background: transparent; border: 1px solid #d1d5db; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s;"
              >
                Clear
              </button>
              <button 
                @click="$emit('update:showDatePicker', false)"
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

      <!-- Time Selection Container -->
      <div style="display: flex; gap: 0.75rem;">
        <!-- Start Time -->
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Start Time</label>
          <input 
            type="time" 
            :value="startTime"
            @change="$emit('update:startTime', ($event.target as HTMLInputElement).value); $emit('updateCalendar')"
            style="width: 8rem; padding: 0.625rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s; text-align: center;"
            onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
            onblur="this.style.borderColor='#d1d5db'"
          />
        </div>

        <!-- End Time -->
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">End Time</label>
          <input 
            type="time" 
            :value="endTime"
            @change="$emit('update:endTime', ($event.target as HTMLInputElement).value); $emit('updateCalendar')"
            style="width: 8rem; padding: 0.625rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; color: #111827; background: white; cursor: pointer; transition: border-color 0.2s; text-align: center;"
            onfocus="this.style.borderColor='#16a34a'; this.style.outline='none'"
            onblur="this.style.borderColor='#d1d5db'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  timezone: string
  timeFormat: string
  dateInputText: string
  showDatePicker: boolean
  currentMonth: number
  currentYear: number
  selectedDates: Date[]
  isSelecting: boolean
  selectionMode: 'select' | 'deselect'
  selectionStart: Date | null
  selectionEnd: Date | null
  startTime: string
  endTime: string
  dateInputWidth: string
}

const props = defineProps<Props>()

defineEmits<{
  'update:timezone': [value: string]
  'update:timeFormat': [value: string]
  'update:dateInputText': [value: string]
  'update:showDatePicker': [value: boolean]
  'update:startTime': [value: string]
  'update:endTime': [value: string]
  'updateCalendar': []
  'dateInput': []
  'dateInputFocus': []
  'dateInputBlur': []
  'previousMonth': []
  'nextMonth': []
  'startDateSelection': [date: Date | null]
  'continueDateSelection': [date: Date | null]
  'endDateSelection': []
  'clearSelection': []
}>()

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const currentMonthName = computed(() => monthNames[props.currentMonth])

// Generate calendar days for date picker
const calendarDays = computed(() => {
  const days: (Date | null)[] = []
  const firstDay = new Date(props.currentYear, props.currentMonth, 1)
  const lastDay = new Date(props.currentYear, props.currentMonth + 1, 0)
  const startDayOfWeek = firstDay.getDay()
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null)
  }
  
  // Add all days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(props.currentYear, props.currentMonth, day))
  }
  
  return days
})

function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function isDateSelected(date: Date | null): boolean {
  if (!date) return false
  return props.selectedDates.some(d => dateToKey(d) === dateToKey(date))
}

function isDateInSelectionRange(date: Date | null): boolean {
  if (!date || !props.selectionStart || !props.selectionEnd) return false
  const dateTime = date.getTime()
  const startTime = props.selectionStart.getTime()
  const endTime = props.selectionEnd.getTime()
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
  const isCurrentlySelecting = props.isSelecting && inRange
  
  // Show different styles for select vs deselect mode during dragging
  if (isCurrentlySelecting) {
    if (props.selectionMode === 'deselect') {
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
</script>

