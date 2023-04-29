<script setup>
import { RouterLink, RouterView } from "vue-router";
import H1 from "./H1.vue";
defineProps({
  msg: String,
});
//import { rpc } from "../store/connection.js";
</script>

<template>
  <div class="h-screen w-screen bg-purple-900">
    <!---->
    <div
      class="bg-purple-900 flex flex-col items-center place-content-center text-center static"
    >
      <div class="mb-20 flex flex-col place-content-center items-center">
        <H1 msg="Multigame App" />
        <p class="w-[40%] text-red-100 text-lg">
          This small web-app is meant to replicate several basic games for 1 or
          2 participants. There is a roll game, which helps to decide, who has
          edge or turn via random choice of two numbers in user-specified range,
          a replica of the famous /roll. The Rock Paper Scissors need no further
          description, as it is popular for same purposes as roll. The cursor
          fast-follow mini-game is simple single-player little thing.
        </p>
      </div>
      <RouterLink to="/roll" class="w-[30%] h-12 mb-6">
        <button
          class="bg-rose-950 text-white border-pink-800 border-double w-full h-full box-border border-[1px] hover:brightness-110 active:opacity-80 tracking-wider"
        >
          Roll for two
        </button></RouterLink
      >
      <RouterLink to="/rpc" class="w-[30%] h-12 mb-6">
        <button
          class="bg-rose-950 text-white border-pink-800 border-double w-full h-full box-border border-[1px] hover:brightness-110 active:opacity-80 tracking-wider"
        >
          Rock Paper Scissors
        </button></RouterLink
      >
      <RouterLink to="/MouseFollow" class="w-[30%] h-12 mb-6"
        ><button
          class="bg-rose-950 text-white border-pink-800 border-double w-full h-full box-border border-[1px] hover:brightness-110 active:opacity-80 tracking-wider"
        >
          Mouse follow
        </button></RouterLink
      >
      <nav class="w-[70%] text-white flex justify-between absolute bottom-8">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="">By FizzyOne</RouterLink>
        <RouterLink to="">Contact</RouterLink>
        <RouterLink to="">Other projects</RouterLink>
        <RouterLink to="">Copyright 2023</RouterLink>
      </nav>
    </div>
  </div>
  <RouterView />
</template>
