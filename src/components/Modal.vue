<template>
  <div v-show="open" class="min-h-screen min-v-screen opacity-50 z-10">
    <div class="min-h-[50%] min-w-[50%] mt-12">
      <div class="bg-gray-500 border-[1px] border-gray-800 p-8">
        <button @click="$emit('close')"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    const handleKeyup = (event) => {
      if (event.KeyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return { close };
  },
};
</script>
