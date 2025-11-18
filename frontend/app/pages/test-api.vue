<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">API Test Page</h1>

    <!-- Create Session Test -->
    <div class="mb-8 p-6 border rounded">
      <h2 class="text-2xl font-semibold mb-4">1. Create Session</h2>
      <button
        @click="testCreateSession"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="loading"
      >
        {{ loading ? 'Creating...' : 'Create Test Session' }}
      </button>
      <div v-if="createdSession" class="mt-4 p-4 bg-green-100 rounded">
        <p class="font-semibold">Session Created!</p>
        <p class="text-sm">ID: {{ createdSession._id }}</p>
        <p class="text-sm">Title: {{ createdSession.title }}</p>
      </div>
      <div v-if="error" class="mt-4 p-4 bg-red-100 rounded text-red-700">
        {{ error }}
      </div>
    </div>

    <!-- Get Session Test -->
    <div class="mb-8 p-6 border rounded">
      <h2 class="text-2xl font-semibold mb-4">2. Get Session</h2>
      <input
        v-model="sessionId"
        placeholder="Enter Session ID"
        class="border px-3 py-2 rounded mr-2 w-64"
      />
      <button
        @click="testGetSession"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        :disabled="loading || !sessionId"
      >
        {{ loading ? 'Loading...' : 'Get Session' }}
      </button>
      <div v-if="fetchedSession" class="mt-4 p-4 bg-blue-100 rounded">
        <p class="font-semibold">Session Data:</p>
        <pre class="text-xs mt-2 overflow-auto">{{ JSON.stringify(fetchedSession, null, 2) }}</pre>
      </div>
    </div>

    <!-- Add Availability Test -->
    <div class="mb-8 p-6 border rounded">
      <h2 class="text-2xl font-semibold mb-4">3. Add Availability</h2>
      <input
        v-model="participantName"
        placeholder="Your Name"
        class="border px-3 py-2 rounded mr-2"
      />
      <button
        @click="testAddAvailability"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        :disabled="loading || !sessionId || !participantName"
      >
        {{ loading ? 'Adding...' : 'Add Availability' }}
      </button>
      <div v-if="addedAvailability" class="mt-4 p-4 bg-purple-100 rounded">
        <p class="font-semibold">Availability Added!</p>
        <pre class="text-xs mt-2">{{ JSON.stringify(addedAvailability, null, 2) }}</pre>
      </div>
    </div>

    <!-- Session Polling Test -->
    <div class="mb-8 p-6 border rounded">
      <h2 class="text-2xl font-semibold mb-4">4. Session Polling</h2>
      <button
        @click="togglePolling"
        :class="isPolling ? 'bg-red-500' : 'bg-green-500'"
        class="text-white px-4 py-2 rounded hover:opacity-80"
        :disabled="!sessionId"
      >
        {{ isPolling ? 'Stop Polling' : 'Start Polling' }}
      </button>
      <div v-if="polledSession" class="mt-4 p-4 bg-yellow-100 rounded">
        <p class="font-semibold">Live Session Data (updates every 5s):</p>
        <p class="text-sm">Last Updated: {{ polledSession.updatedAt }}</p>
        <p class="text-sm">Participants: {{ polledSession.availabilities?.length || 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { createSession, getSession, updateAvailability } = useSessionApi();

const loading = ref(false);
const error = ref('');
const createdSession = ref(null);
const fetchedSession = ref(null);
const sessionId = ref('');
const participantName = ref('');
const addedAvailability = ref(null);

// For polling test
const pollingSessionId = ref<string | null>(null);
const { session: polledSession, isPolling, startPolling, stopPolling } = useSessionPolling(pollingSessionId, 5000);

const testCreateSession = async () => {
  loading.value = true;
  error.value = '';
  createdSession.value = null;

  const { data, error: err } = await createSession({
    title: 'Frontend Test Session',
    possibleDates: ['2025-11-20', '2025-11-21', '2025-11-22'],
    hourRange: { start: 9, end: 17 },
    timeBlockUnit: 'hour'
  });

  loading.value = false;

  if (data) {
    createdSession.value = data.session;
    sessionId.value = data.sessionId;
  } else {
    error.value = err || 'Failed to create session';
  }
};

const testGetSession = async () => {
  loading.value = true;
  error.value = '';
  fetchedSession.value = null;

  const { data, error: err } = await getSession(sessionId.value);

  loading.value = false;

  if (data) {
    fetchedSession.value = data;
  } else {
    error.value = err || 'Failed to get session';
  }
};

const testAddAvailability = async () => {
  loading.value = true;
  error.value = '';
  addedAvailability.value = null;

  const { data, error: err } = await updateAvailability(sessionId.value, {
    participantName: participantName.value,
    timeBlocks: [
      { date: '2025-11-20', hour: 10, halfHour: false },
      { date: '2025-11-21', hour: 14, halfHour: true }
    ]
  });

  loading.value = false;

  if (data) {
    addedAvailability.value = data;
  } else {
    error.value = err || 'Failed to add availability';
  }
};

const togglePolling = () => {
  if (isPolling.value) {
    stopPolling();
    pollingSessionId.value = null;
  } else {
    pollingSessionId.value = sessionId.value;
    startPolling();
  }
};
</script>
