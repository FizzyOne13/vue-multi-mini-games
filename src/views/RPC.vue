<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, onMounted, defineProps } from "vue";
import Modal from "../components/Modal.vue";
const props = defineProps({
  open: Boolean,
});

const isShown = ref(false);

const wins = ref(0);
const draws = ref(0);
const losses = ref(0);

const choise = ref(null);
const computerChoise = ref(null);
const verdict = ref(null);

const outcomes = {
  rock: {
    rock: "draw",
    paper: "loss",
    scissors: "win",
    lizard: "win",
    spock: "loss",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissors: "loss",
    lizard: "loss",
    spock: "win",
  },
  scissors: {
    rock: "loss",
    paper: "win",
    scissors: "draw",
    lizard: "win",
    spock: "loss",
  },
  lizard: {
    rock: "loss",
    paper: "win",
    scissors: "loss",
    lizard: "draw",
    spock: "win",
  },
  spock: {
    rock: "win",
    paper: "loss",
    scissors: "win",
    lizard: "loss",
    spock: "draw",
  },
};

const winPercentage = computed(() => {
  const total = wins.value + draws.value + losses.value;
  return total ? (wins.value / total) * 100 : 0;
});

const play = (c) => {
  choise.value = c;

  const choises = ["rock", "paper", "scissors", "lizard", "spock"];
  const random = Math.floor(Math.random() * choises.length);
  computerChoise.value = choises[random];

  const outcome = outcomes[c][computerChoise.value];

  if (outcome === "win") {
    wins.value++;
    verdict.value = "You win!";
  } else if (outcome === "loss") {
    losses.value++;
    verdict.value = "You lose!";
  } else {
    draws.value++;
    verdict.value = "Draw!";
  }

  SaveGame();
};

const SaveGame = () => {
  localStorage.setItem("wins", wins.value);
  localStorage.setItem("draws", draws.value);
  localStorage.setItem("losses", losses.value);
};

const LoadGame = () => {
  wins.value = parseInt(localStorage.getItem("wins")) || 0;
  draws.value = parseInt(localStorage.getItem("draws")) || 0;
  losses.value = parseInt(localStorage.getItem("losses")) || 0;
};

const ResetRound = () => {
  choise.value = null;
  computerChoise.value = null;
  verdict.value = null;
};

const ResetNumbers = () => {
  localStorage.setItem("wins", 0);
  localStorage.setItem("draws", 0);
  localStorage.setItem("losses", 0);
  LoadGame();
};

onMounted(() => {
  LoadGame();

  window.addEventListener("keypress", (e) => {
    if (e.key === "r") {
      ResetRound();
    } else if (e.key === "1") {
      play("rock");
    } else if (e.key === "2") {
      play("paper");
    } else if (e.key === "3") {
      play("scissors");
    } else if (e.key === "4") {
      play("lizard");
    } else if (e.key === "5") {
      play("spock");
    }
  });
});
</script>

<template>
  <div class="bg-red-400 text-white text-center min-h-screen flex flex-col">
    <header class="container mx-auto p-8">
      <h1 class="text-5xl font-bold mb-2 mt-4">
        Rock, Paper, Scissors, Lizard and Spock
      </h1>
    </header>
    <Modal :open="isShown" @close="isShown = !isShown"></Modal>
    <main class="container mx-auto p-8">
      <div
        v-if="choise === null"
        class="flex items-center justify-center -mx-6"
      >
        <button
          @click="play('rock')"
          class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-300 active:brightness-125"
        >
          <img
            src="../components/icons/rock.png"
            alt="Rock"
            class="w-full h-full"
          />
        </button>
        <button
          @click="play('paper')"
          class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-orange-300 active:brightness-125"
        >
          <img
            src="../components/icons/paper.png"
            alt="Paper"
            class="w-full h-full"
          />
        </button>
        <button
          @click="play('scissors')"
          class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-orange-400 active:brightness-125"
        >
          <img
            src="../components/icons/scissors.png"
            alt="Scissors"
            class="w-full h-full"
          />
        </button>
        <button
          @click="play('lizard')"
          class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-400 active:brightness-125"
        >
          <img
            src="../components/icons/animal.png"
            alt="Lizard"
            class="w-full h-full"
          />
        </button>
        <button
          @click="play('spock')"
          class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-300 active:brightness-125"
        >
          <img
            src="../components/icons/spock.png"
            alt="Spock"
            class="w-full h-full"
          />
        </button>
      </div>
      <div v-else>
        <div class="text-3xl mb-4">
          You picked <span class="text-rose-800">{{ choise }}</span>
        </div>
        <div class="text-3xl mb-4">
          The computer picked
          <span class="text-yellow-400">{{ computerChoise }}</span>
        </div>
        <div class="text-4xl mb-10 grid">{{ verdict }}</div>
        <div class="container my-4 grid grid-rows-2 gap-y-6 justify-center">
          <button
            @click="ResetRound"
            class="bg-red-700 text-lg text-white py-2 px-16 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Back to more
          </button>
          <button
            @click="ResetNumbers"
            class="bg-red-700 text-lg text-white py-2 px-16 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Reset all
          </button>
        </div>
      </div>
      <div class="mt-12 text-3xl mb-4 hover:opacity-80">
        {{ wins }} : {{ draws }} : {{ losses }}
      </div>
      <div class="text-lg text-gray-100 mt-4 hover:brightness-110">
        Win rate: {{ Math.round(winPercentage) }}%
      </div>
      <div
        v-if="choise === null"
        class="container mt-8 grid grid-rows-3 gap-y-6 justify-center"
      >
        <button
          @click="isShown = true"
          class="bg-red-700 text-lg text-white py-2 px-8 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
        >
          Show hint
        </button>
        <RouterLink to="/home">
          <button
            @click=""
            class="bg-red-700 text-lg text-white py-2 px-8 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Go back to Multigame menu
          </button></RouterLink
        >
        <button
          @click=""
          class="bg-red-700 text-lg text-white py-2 px-8 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
        >
          Switch to P2P mode
        </button>
      </div>
    </main>
  </div>
</template>
