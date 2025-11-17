/**
 * Composable for interacting with the Session API
 */

interface TimeBlock {
  date: string;
  hour: number;
  halfHour?: boolean;
}

interface Availability {
  participantName: string;
  responded: boolean;
  lastUpdated: Date;
  timeBlocks: TimeBlock[];
}

interface Session {
  _id: string;
  title: string;
  possibleDates: string[];
  hourRange: {
    start: number;
    end: number;
  };
  timeBlockUnit: 'hour' | 'half-hour';
  availabilities: Availability[];
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateSessionData {
  title: string;
  possibleDates: string[];
  hourRange: {
    start: number;
    end: number;
  };
  timeBlockUnit?: 'hour' | 'half-hour';
  expirationDate?: string;
}

interface UpdateSessionData {
  title?: string;
  expirationDate?: string;
  possibleDates?: string[];
  hourRange?: {
    start: number;
    end: number;
  };
  timeBlockUnit?: 'hour' | 'half-hour';
}

interface UpdateAvailabilityData {
  participantName: string;
  timeBlocks: TimeBlock[];
}

export const useSessionApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl || 'http://localhost:8000';

  /**
   * Create a new session
   */
  const createSession = async (data: CreateSessionData) => {
    try {
      const response = await $fetch<{
        sessionId: string;
        link: string;
        session: Session;
      }>(`${apiBase}/api/sessions`, {
        method: 'POST',
        body: data
      });
      return { data: response, error: null };
    } catch (error: any) {
      console.error('Error creating session:', error);
      return { data: null, error: error.data?.error || 'Failed to create session' };
    }
  };

  /**
   * Get session by ID
   */
  const getSession = async (sessionId: string) => {
    try {
      const response = await $fetch<{ session: Session }>(
        `${apiBase}/api/sessions/${sessionId}`
      );
      return { data: response.session, error: null };
    } catch (error: any) {
      console.error('Error fetching session:', error);
      return { data: null, error: error.data?.error || 'Session not found' };
    }
  };

  /**
   * Update session metadata
   */
  const updateSession = async (sessionId: string, data: UpdateSessionData) => {
    try {
      const response = await $fetch<{
        message: string;
        session: Session;
      }>(`${apiBase}/api/sessions/${sessionId}`, {
        method: 'PUT',
        body: data
      });
      return { data: response.session, error: null };
    } catch (error: any) {
      console.error('Error updating session:', error);
      return { data: null, error: error.data?.error || 'Failed to update session' };
    }
  };

  /**
   * Update participant availability
   */
  const updateAvailability = async (
    sessionId: string,
    data: UpdateAvailabilityData
  ) => {
    try {
      const response = await $fetch<{
        message: string;
        availability: Availability;
      }>(`${apiBase}/api/sessions/${sessionId}/availability`, {
        method: 'POST',
        body: data
      });
      return { data: response.availability, error: null };
    } catch (error: any) {
      console.error('Error updating availability:', error);
      return { data: null, error: error.data?.error || 'Failed to update availability' };
    }
  };

  /**
   * Delete participant availability
   */
  const deleteAvailability = async (sessionId: string, participantName: string) => {
    try {
      const response = await $fetch<{
        message: string;
        session: Session;
      }>(`${apiBase}/api/sessions/${sessionId}/availability/${encodeURIComponent(participantName)}`, {
        method: 'DELETE'
      });
      return { data: response.session, error: null };
    } catch (error: any) {
      console.error('Error deleting availability:', error);
      return { data: null, error: error.data?.error || 'Failed to delete availability' };
    }
  };

  /**
   * Delete session
   */
  const deleteSession = async (sessionId: string) => {
    try {
      const response = await $fetch<{ message: string }>(
        `${apiBase}/api/sessions/${sessionId}`,
        {
          method: 'DELETE'
        }
      );
      return { data: response.message, error: null };
    } catch (error: any) {
      console.error('Error deleting session:', error);
      return { data: null, error: error.data?.error || 'Failed to delete session' };
    }
  };

  return {
    createSession,
    getSession,
    updateSession,
    updateAvailability,
    deleteAvailability,
    deleteSession
  };
};

/**
 * Composable for polling session updates
 */
export const useSessionPolling = (sessionId: Ref<string | null>, intervalMs = 5000) => {
  const session = ref<Session | null>(null);
  const error = ref<string | null>(null);
  const isPolling = ref(false);
  const isPaused = ref(false);
  let pollingInterval: NodeJS.Timeout | null = null;

  const { getSession } = useSessionApi();

  const fetchSession = async () => {
    if (!sessionId.value || isPaused.value) return;

    const { data, error: fetchError } = await getSession(sessionId.value);
    if (data) {
      session.value = data;
      error.value = null;
    } else {
      error.value = fetchError;
    }
  };

  const startPolling = () => {
    if (isPolling.value) return;

    isPolling.value = true;
    fetchSession(); // Fetch immediately

    pollingInterval = setInterval(() => {
      fetchSession();
    }, intervalMs);
  };

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
    isPolling.value = false;
  };

  const pausePolling = () => {
    isPaused.value = true;
  };

  const resumePolling = async () => {
    isPaused.value = false;
    // Fetch immediately when resuming to get latest data
    await fetchSession();
  };

  // Auto-cleanup on unmount
  onUnmounted(() => {
    stopPolling();
  });

  return {
    session,
    error,
    isPolling,
    isPaused,
    fetchSession,
    startPolling,
    stopPolling,
    pausePolling,
    resumePolling
  };
};
