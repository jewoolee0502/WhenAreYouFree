<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Redirect root to frontpage
navigateTo('/frontpage', { replace: true })
</script>

