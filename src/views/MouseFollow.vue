<script setup>
import mouseFollow from "../scripts/mouse.js";
defineProps({
  square: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="h-screen w-screen bg-white dark:bg-[#0F172A]">
    <div
      class="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute"
    >
      <div id="my">
        <div
          class="bg-gray-600 w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute"
        >
          <div
            ref="add"
            class="flex flex-wrap gap-0.5 h-screen items-center justify-center relative"
            v-for="item in div"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      div: [
        '<div class=" transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>',
      ],
    };
  },
};

const para = document.createElement("div");
para.className =
  "flex flex-wrap gap-0.5 h-screen items-center justify-center  relative";
let el =
  '<div class = "  transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
for (var k = 1; k <= 1000; k++) {
  el +=
    '<div class = " transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
}
</script>
