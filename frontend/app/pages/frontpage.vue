<template>
  <div style="min-height: 100vh; background: linear-gradient(to bottom, #f0f9ff, #ffffff); font-family: system-ui, -apple-system, sans-serif; position: relative; overflow-x: hidden;">
    <!-- Decorative Background Elements -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; pointer-events: none; overflow: hidden; z-index: 0;">
      <div :style="bgCircle1Style"></div>
      <div :style="bgCircle2Style"></div>
      <div :style="bgCircle3Style"></div>
    </div>

    <!-- Navigation -->
    <nav style="border-bottom: 1px solid rgba(229, 231, 235, 0.5); background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; width: 100%;">
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
          <div style="display: flex; align-items: center;">
            <button @click="showModal = true" style="padding: 0.5rem 1.25rem; font-size: 0.875rem; background: transparent; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s; font-weight: 500;" onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'" onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'">Sign in</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section style="padding: 2rem 1rem 4rem; text-align: center; position: relative; z-index: 1;">
      <div style="max-width: 896px; margin: 0 auto;">
        <!-- Badge -->
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(22, 163, 74, 0.1); border-radius: 2rem; margin-bottom: 2rem; border: 1px solid rgba(22, 163, 74, 0.2);">
          <svg style="width: 1rem; height: 1rem; color: #16a34a;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span style="font-size: 0.875rem; color: #16a34a; font-weight: 600;">It's free! No credit card required</span>
        </div>

        <h2 style="font-size: 3.5rem; font-weight: 800; background: linear-gradient(135deg, #111827, #4b5563); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 1.5rem; line-height: 1.1; letter-spacing: -0.02em;">
          WhenAreYouFree
        </h2>
        <p style="font-size: 1.375rem; color: #6b7280; margin: 0 0 2.5rem; line-height: 1.7; max-width: 700px; margin-left: auto; margin-right: auto;">
          Coordinate group hangouts and meetings without the back and forth. Integrates seamlessly with your calendar.
        </p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <button 
            style="padding: 1rem 2.5rem; font-size: 1.125rem; font-weight: 600; background: linear-gradient(135deg, #16a34a, #059669); color: white; border: none; border-radius: 0.75rem; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3), 0 4px 6px -2px rgba(22, 163, 74, 0.2); transition: all 0.3s; position: relative; overflow: hidden;"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 20px 25px -5px rgba(22, 163, 74, 0.4), 0 10px 10px -5px rgba(22, 163, 74, 0.3)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 15px -3px rgba(22, 163, 74, 0.3), 0 4px 6px -2px rgba(22, 163, 74, 0.2)'"
          >
            Create event
          </button>
        </div>
      </div>
    </section>

    <!-- Animated Calendar Section -->
    <section style="padding: 2rem 1rem 6rem; position: relative; z-index: 1;">
      <div style="max-width: 1200px; margin: 0 auto; position: relative;">
        <!-- Calendar Container with Animation -->
        <div :style="calendarContainerStyle">
          <!-- Light Theme Calendar -->
          <div :style="lightCalendarStyle">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 0 0.5rem;">
              <button style="background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;" onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#9ca3af'">&lt;</button>
              <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin: 0;">{{ currentMonth }} {{ currentYear }}</h3>
              <button style="background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;" onmouseover="this.style.color='#111827'" onmouseout="this.style.color='#9ca3af'">&gt;</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; margin-bottom: 0.5rem; width: 100%; box-sizing: border-box;">
              <div v-for="day in weekDays" :key="day" style="text-align: center; font-size: 0.75rem; font-weight: 600; color: #9ca3af; padding: 0.25rem; min-width: 0; text-transform: uppercase; letter-spacing: 0.05em;">
                {{ day }}
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; width: 100%; box-sizing: border-box;">
              <div 
                v-for="(date, index) in calendarDates" 
                :key="index"
                :style="getDateStyle(date, 'light')"
                style="min-width: 0; overflow: hidden; cursor: pointer;"
              >
                {{ date }}
              </div>
            </div>
          </div>

          <!-- Dark Theme Calendar -->
          <div :style="darkCalendarStyle">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 0 0.5rem;">
              <button style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#6b7280'">&lt;</button>
              <h3 style="font-size: 1rem; font-weight: 600; color: #ffffff; margin: 0;">{{ currentMonth }} {{ currentYear }}</h3>
              <button style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem; font-size: 1rem; transition: color 0.2s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#6b7280'">&gt;</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; margin-bottom: 0.5rem; width: 100%; box-sizing: border-box;">
              <div v-for="day in weekDays" :key="day" style="text-align: center; font-size: 0.75rem; font-weight: 600; color: #9ca3af; padding: 0.25rem; min-width: 0; text-transform: uppercase; letter-spacing: 0.05em;">
                {{ day }}
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; width: 100%; box-sizing: border-box;">
              <div 
                v-for="(date, index) in calendarDates" 
                :key="index"
                :style="getDateStyle(date, 'dark')"
                style="min-width: 0; overflow: hidden; cursor: pointer;"
              >
                {{ date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section style="padding: 4rem 1rem; background: white; position: relative; z-index: 1;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h3 style="font-size: 2rem; font-weight: 700; color: #111827; margin: 0 0 1rem;">Why choose WhenAreYouFree?</h3>
          <p style="font-size: 1.125rem; color: #6b7280; margin: 0;">Everything you need to schedule effortlessly</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            style="padding: 2rem; background: linear-gradient(135deg, #f9fafb, #ffffff); border-radius: 1rem; border: 1px solid #e5e7eb; transition: all 0.3s; cursor: pointer;"
            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 25px -5px rgba(0, 0, 0, 0.1)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
          >
            <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #16a34a, #059669); border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);">
              <div v-html="feature.icon" style="width: 1.5rem; height: 1.5rem; color: white;"></div>
            </div>
            <h4 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin: 0 0 0.75rem;">{{ feature.title }}</h4>
            <p style="font-size: 0.9375rem; color: #6b7280; margin: 0; line-height: 1.6;">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Login/Signup Modal -->
    <LoginSignupModal v-model="showModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Meta tags for SEO
useHead({
  title: 'WhenAreYouFree - Find a time to meet',
  meta: [
    {
      name: 'description',
      content: 'Coordinate group meetings without the back and forth. Integrates with your calendar.'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
})

// Modal state
const showModal = ref(false)

// Calendar data
const currentMonth = ref('September')
const currentYear = ref(2024)
const highlightedDate = ref(19)

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// Features data
const features = [
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    title: 'Multi-Calendar Sync',
    description: 'Connect Google Calendar, Outlook, and iCloud in one place. See all events in real-time.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    title: 'Lightning Fast',
    description: 'Get instant results. Our algorithms find available times in milliseconds.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>',
    title: 'Secure & Private',
    description: 'Your calendar data is encrypted. We never store passwords or sensitive information.'
  }
]

// Generate calendar dates
const calendarDates = computed(() => {
  const dates: (number | string)[] = []
  dates.push('', '', '', '', 1, 2, 3)
  for (let i = 4; i <= 30; i++) {
    dates.push(i)
  }
  return dates
})

// Animation state
const floatOffset = ref(0)
const bgOffset = ref(0)

onMounted(() => {
  const animate = () => {
    floatOffset.value += 0.02
    bgOffset.value += 0.005
    if (floatOffset.value >= Math.PI * 2) floatOffset.value = 0
    if (bgOffset.value >= Math.PI * 2) bgOffset.value = 0
    requestAnimationFrame(animate)
  }
  animate()
})

// Background decorative circles
const bgCircle1Style = computed(() => {
  const x = Math.sin(bgOffset.value) * 20
  const y = Math.cos(bgOffset.value) * 20
  return {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1), transparent 70%)',
    borderRadius: '50%',
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.1s ease-out'
  } as const
})

const bgCircle2Style = computed(() => {
  const x = Math.sin(bgOffset.value + Math.PI) * 15
  const y = Math.cos(bgOffset.value + Math.PI) * 15
  return {
    position: 'absolute',
    top: '60%',
    right: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%)',
    borderRadius: '50%',
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.1s ease-out'
  } as const
})

const bgCircle3Style = computed(() => {
  const x = Math.sin(bgOffset.value * 0.5) * 10
  const y = Math.cos(bgOffset.value * 0.5) * 10
  return {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)',
    borderRadius: '50%',
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.1s ease-out'
  } as const
})

const calendarContainerStyle = computed(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0',
    position: 'relative',
    padding: '2rem 0'
  } as const
})

const lightCalendarStyle = computed(() => {
  const floatY = Math.sin(floatOffset.value) * 8
  const rotation = -8 + Math.sin(floatOffset.value * 0.5) * 2
  
  return {
    width: '320px',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: `rotate(${rotation}deg) translateY(${floatY}px)`,
    transition: 'transform 0.3s ease-out',
    zIndex: 2,
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  } as const
})

const darkCalendarStyle = computed(() => {
  const floatY = Math.sin(floatOffset.value + Math.PI) * 8
  const rotation = 8 + Math.sin(floatOffset.value * 0.5 + Math.PI) * 2
  
  return {
    width: '320px',
    padding: '1.5rem',
    backgroundColor: '#1f2937',
    borderRadius: '0.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    transform: `rotate(${rotation}deg) translateY(${floatY}px)`,
    transition: 'transform 0.3s ease-out',
    zIndex: 1,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: '-160px',
    marginTop: '-180px',
    overflow: 'hidden',
    boxSizing: 'border-box'
  } as const
})

function getDateStyle(date: number | string, theme: 'light' | 'dark'): string {
  const isHighlighted = date === highlightedDate.value
  const isEmpty = date === ''
  
  if (isEmpty) {
    return 'padding: 0.5rem; text-align: center; min-width: 0;'
  }
  
  const baseStyle = 'padding: 0.5rem; text-align: center; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; transition: all 0.2s; min-width: 0; box-sizing: border-box;'
  
  if (isHighlighted) {
    return baseStyle + 'background-color: #ef4444; color: #ffffff; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);'
  } else {
    if (theme === 'light') {
      return baseStyle + 'color: #111827;'
    } else {
      return baseStyle + 'color: #ffffff;'
    }
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
