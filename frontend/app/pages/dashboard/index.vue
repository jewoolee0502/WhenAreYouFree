<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h2 class="text-xl font-semibold text-gray-700">Creating your session...</h2>
      <p class="text-gray-500 mt-2">Please wait while we set things up</p>

      <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
        <p class="font-semibold">Error creating session:</p>
        <p class="text-sm">{{ error }}</p>
        <button
          @click="retry"
          class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createSession } = useSessionApi();
const error = ref('');

const createNewSession = async () => {
  error.value = '';

  // Get current date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  // Format dates as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const { data, error: err } = await createSession({
    title: 'New Meeting',
    possibleDates: [
      formatDate(today),
      formatDate(tomorrow),
      formatDate(dayAfter)
    ],
    hourRange: { start: 9, end: 17 },
    timeBlockUnit: 'hour'
  });

  if (data) {
    // Redirect to the new session
    await router.push(`/dashboard/${data.sessionId}`);
  } else {
    error.value = err || 'Failed to create session';
  }
};

const retry = () => {
  createNewSession();
};

// Auto-create session when page loads
onMounted(() => {
  createNewSession();
});
</script>
