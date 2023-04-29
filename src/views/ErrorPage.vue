<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div
    class="h-screen w-screen bg-purple-900 flex flex-col items-center place-content-center text-center static"
  >
    <h1 class="mb-16 text-white text-3xl font-extrabold">
      404 - Page Not Found
    </h1>
    <p class="text-red-100 text-lg mb-10">
      This page no longer exists or was moved to another location.
    </p>
    <RouterLink to="/" class="w-[25%] h-12 mb-6"
      ><button
        class="bg-rose-950 text-white border-pink-800 border-double w-full h-full box-border border-[1px] hover:brightness-110 active:opacity-80 tracking-wider"
      >
        Back to Home
      </button></RouterLink
    >
  </div>
  <RouterView />
</template>
