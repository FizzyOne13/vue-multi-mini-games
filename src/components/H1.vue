<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1 class="mt-6 mb-8 text-white text-2xl font-extrabold">{{ msg }}</h1>
</template>
