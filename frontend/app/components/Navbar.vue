<template>
  <nav style="background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; width: 100%;" :style="{ borderBottom: variant === 'dashboard' ? '1px solid #e5e7eb' : 'none' }">
    <div style="width: 100%; padding: 0 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; height: 4rem;">
        <NuxtLink to="/frontpage" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; text-decoration: none;">
          <div style="width: 2rem; height: 2rem; background: linear-gradient(135deg, #16a34a, #10b981); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.3);">
            <svg style="width: 1.25rem; height: 1.25rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="nav-title" style="font-size: 1.25rem; font-weight: 700; background: linear-gradient(135deg, #16a34a, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0;">WhenAreYouFree</h1>
        </NuxtLink>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <!-- Dashboard variant: Show Sign in or Sign out based on authentication -->
          <template v-if="variant === 'dashboard'">
            <button 
              v-if="!isAuthenticated"
              @click="handleSignIn"
              style="padding: 0.5rem 1.25rem; font-size: 0.875rem; background: transparent; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s; font-weight: 500;" 
              onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'" 
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'"
            >
              Sign in
            </button>
            <button 
              v-else
              @click="handleSignOut"
              style="padding: 0.5rem 1.25rem; font-size: 0.875rem; background: transparent; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s; font-weight: 500;" 
              onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'" 
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'"
            >
              Sign out
            </button>
          </template>
          <!-- Frontpage variant: Show Sign in button -->
          <template v-else>
            <button 
              @click="handleSignIn"
              style="padding: 0.5rem 1.25rem; font-size: 0.875rem; background: transparent; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #374151; cursor: pointer; transition: all 0.2s; font-weight: 500;" 
              onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'" 
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'"
            >
              Sign in
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'frontpage' | 'dashboard'
  isAuthenticated?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'frontpage',
  isAuthenticated: false
})

const emit = defineEmits<{
  signOut: []
  signIn: []
}>()

function handleSignOut() {
  emit('signOut')
}

function handleSignIn() {
  emit('signIn')
}
</script>

<style scoped>
/* Mobile Responsive Styles */
@media (max-width: 768px) {
  /* Navigation title */
  .nav-title {
    font-size: 1rem !important;
  }
  
  /* Navigation padding */
  nav > div {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

/* Extra small mobile devices */
@media (max-width: 480px) {
  .nav-title {
    font-size: 0.875rem !important;
  }
}
</style>

