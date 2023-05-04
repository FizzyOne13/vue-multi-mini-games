<template>
  <div
    v-show="open"
    class="absolute z-10 h-screen w-screen bg-black/30 flex items-center"
    @click="$emit('close')"
  >
    <div class="min-h-[50%] mt-4 mb-16">
      <div
        class="bg-gray-500 border-[1px] border-gray-800 bg-opacity-95 mx-16 z-11"
      >
        <p class="text-lg text-white py-8 px-16 bg-opacity-100">
          <b><i>Rock, Paper, Scissors, Lizard, Spock</i></b> is a game of chance
          that expands the traditional game of Rock, Paper, Scissors. It is
          first used to settle a dispute about what to watch on TV between
          Sheldon and Raj in "The Lizard-Spock Expansion". It is mentioned again
          in "The Rothman Disintegration", where Sheldon explains the rules to
          Penny and Barry Kripke. <br />
          <br />
          The game was originally created by Sam Kass with Karen Bryla.
          According to an interview with Kass, the series producers did not
          originally ask for permission to use the game, but Kass was officially
          referenced by Sheldon as the creator of the game during the "The
          Rothman Disintegration", after which he states, "Hail Sam Kass!" to
          which Leonard, Howard, Raj, and Sheldon all then chant "Hail!" while
          raising their hands. <br />
          <br />
          <b>The combinations are following:</b> Scissors cuts paper. Paper
          covers rock. Rock crushes lizard. Lizard poisons Spock. Spock smashes
          scissors. Scissors decapitates lizard. Lizard eats paper. Paper
          disproves Spock. Spock vaporizes rock. Rock crushes scissors. Press
          1-5 on keyboard to select corresponding pick (increasing from left to
          right).
        </p>
        <button
          @click="$emit('close1')"
          class="my-8 bg-red-700 text-lg text-white py-2 px-8 mt-6 bg-opacity-100 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
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
