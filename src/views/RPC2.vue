<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { io } from "socket.io-client";

const rId = ref(null);

const wins = ref(0);
const draws = ref(0);
const losses = ref(0);

const wins_p1 = ref(0);
const draws_p1 = ref(0);
const losses_p1 = ref(0);

const wins_p2 = ref(0);
const draws_p2 = ref(0);
const losses_p2 = ref(0);

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

const socket = io(import.meta.env.VITE_VUE_APP_SOCKET_URL);
socket.on("connect", (socket) => {
  console.log(socket);
});

const getRoomId = () => {
  socket.emit("send-id");
  socket.on("get-d", (roomId) => {
    const rId = roomdId.value;
    console.log(rId);
  });
};
</script>

<template>
  <div class="bg-red-400 text-white text-center min-h-screen flex flex-col">
    <div
      class="absolute left-4 top-6 text-white text-xl font-semibold hover:opacity-50"
    >
      You're in P2P mode
    </div>
    <header class="container mx-auto p-8">
      <h1 class="text-5xl font-bold mb-2 mt-4">
        Rock, Paper, Scissors, Lizard and Spock
      </h1>
    </header>
    <main class="container mx-auto p-8">
      <div
        v-if="choise === null"
        class="flex items-center justify-center -mx-6"
      >
        <div class="flex flex-col">
          <button
            id="rock"
            @click="play('rock')"
            class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-300 active:brightness-125"
          >
            <img
              src="../components/icons/rock.png"
              alt="Rock"
              class="w-full h-full"
            />
          </button>
          <div class="flex justify-evenly mt-2">
            <input type="radio" value="rock" class="" name="p1" /><input
              type="radio"
              value="rock"
              class=""
              name="p2"
            />
          </div>
          <label for="p1"></label>
          <label for="p2"></label>
        </div>
        <div class="flex flex-col">
          <button
            id="paper"
            @click="play('paper')"
            class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-orange-300 active:brightness-125"
          >
            <img
              src="../components/icons/paper.png"
              alt="Paper"
              class="w-full h-full"
            />
          </button>
          <div class="flex justify-evenly mt-2">
            <input type="radio" value="paper" class="" name="p1" /><input
              type="radio"
              value="paper"
              class=""
              name="p2"
            />
          </div>
          <label for="p1"></label>
          <label for="p2"></label>
        </div>
        <div class="flex flex-col">
          <button
            id="scissors"
            @click="play('scissors')"
            class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-orange-400 active:brightness-125"
          >
            <img
              src="../components/icons/scissors.png"
              alt="Scissors"
              class="w-full h-full"
            />
          </button>
          <div class="flex justify-evenly mt-2">
            <input type="radio" value="scissors" class="" name="p1" /><input
              type="radio"
              value="scissors"
              class=""
              name="p2"
            />
          </div>
          <label for="p1"></label>
          <label for="p2"></label>
        </div>
        <div class="flex flex-col">
          <button
            id="lizard"
            @click="play('lizard')"
            class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-400 active:brightness-125"
          >
            <img
              src="../components/icons/animal.png"
              alt="Lizard"
              class="w-full h-full"
            />
          </button>
          <div class="flex justify-evenly mt-2">
            <input type="radio" value="lizard" class="" name="p1" /><input
              type="radio"
              value="lizard"
              class=""
              name="p2"
            />
          </div>
          <label for="p1"></label>
          <label for="p2"></label>
        </div>
        <div class="flex flex-col">
          <button
            id="spock"
            @click="play('spock')"
            class="bg-white rounded-full shadow-xl w-40 p-12 mx-8 transition-colors duration-300 hover:bg-amber-300 active:brightness-125"
          >
            <img
              src="../components/icons/spock.png"
              alt="Spock"
              class="w-full h-full"
            />
          </button>
          <div class="flex justify-evenly mt-2">
            <input type="radio" value="spock" class="" name="p1" /><input
              type="radio"
              Value="spock"
              class=""
              name="p2"
            />
          </div>
          <label for="p1"></label>
          <label for="p2"></label>
        </div>
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
      <div class="container flex flex-row justify-center">
        <div class="mt-12 text-3xl mb-4 hover:opacity-80 mr-4">
          {{ wins_p1 }} : {{ draws_p1 }} : {{ losses_p1 }}
        </div>
        <div class="mt-12 text-3xl mb-4 hover:opacity-80 ml-4">
          {{ wins_p2 }} : {{ draws_p2 }} : {{ losses_p2 }}
        </div>
      </div>
      <div class="text-lg text-gray-100 mt-4 hover:brightness-110">
        Win rate: {{ Math.round(winPercentage) }}%
      </div>
      <div
        v-if="choise === null"
        class="container mt-8 grid grid-rows-3 gap-y-6 justify-center"
      >
        <RouterLink to="/home">
          <button
            @click=""
            class="w-[100%] bg-red-700 text-lg text-white py-2 px-8 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Go back to Multigame menu
          </button></RouterLink
        >
        <RouterLink to="/rpc"
          ><button
            @click=""
            class="w-[100%] bg-red-700 text-lg text-white py-2 px-8 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Switch to Single mode
          </button></RouterLink
        >
        <div class="flex flex-row bg-red-700 text-white w-[100%] h-[100%]">
          <input
            ref="rId"
            placeholder="shortID for room"
            class="w-[60%] text-red-700 h-[100%] px-2 outline-none hover:opacity-90 focus:border-red-700 focus:border-[1px]"
          /><button
            @click="getRoomId(id)"
            class="bg-red-700 text-lg text-white py-2 px-4 active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Get</button
          ><button
            class="bg-red-700 text-lg text-white py-2 px-4 border-l-[1px] border-l-white active:box-content hover:opacity-90 active:brightness-110 hover:shadow-md active:border-2 active:border-amber-950"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
