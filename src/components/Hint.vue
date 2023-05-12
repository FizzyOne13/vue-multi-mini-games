<template>
  <div
    v-show="open"
    class="absolute z-10 h-screen w-screen bg-black/30 flex items-center"
    @click="$emit('close')"
  >
    <div class="min-h-[50%] mt-4 mb-16">
      <div
        class="bg-gray-500 border-[1px] border-gray-800 bg-opacity-95 mx-16 z-11 flex flex-col items-center"
      >
        <p class="text-lg text-white py-8 px-24 bg-opacity-100">
          <b><i>Roll for two</i></b> is a small chat-functional mini-app which
          can connect two or more participants. For now you can write a message
          to your mate or go straight to business and deside your important
          issue with roll. Roll is alike to coin flip - either you or your
          competitor win via random choice.<br />
          <br />
          The roll game meant to be for fun firstly, it enables random number
          from 0 to 100 generation. Use it as last argument if you wish. It also
          can be a challenge-related numbers generator, for example, do the
          number of push-ups you've rolled out or spent rolled amount of money
          on new clothing, whatever you wish. The game may or may not get update
          with custom roll numbers sometime.<br />
        </p>
        <button
          @click="$emit('close1')"
          class="my-8 bg-sky-400 text-lg text-white py-2 px-8 mt-6 bg-opacity-100 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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

    return { close };
  },

  setup(_, { emit }) {
    const close = () => {
      emit("close1");
    };

    return { close };
  },
};
</script>
