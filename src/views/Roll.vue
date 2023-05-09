<script setup>
import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuidv4 } from "uuid";
import { nextTick, onMounted, ref } from "vue";

const APP_ID = "401b849490ad43c09e30a87731b1af69";
const CHANNEL = "roll";
const client = AgoraRTM.createInstance(APP_ID);
const uid = uuidv4();
let channel;
const text = ref("");
const messages = ref([]);
const scrollRef = ref(null);

const add = async () => {
  await nextTick();
  scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
};

onMounted(async () => {
  await client.login({ uid, token: null });
  channel = await client.createChannel(CHANNEL);
  await channel.join();
  channel.on("ChannelMessage", (message, peerId) => {
    messages.value.push({ text: message.text, uid: peerId });
  });
});

function sendMessage() {
  if (text.value === "") return;
  channel.sendMessage({ text: text.value, type: "text" });
  messages.value.push({ text: text.value, uid });
  add();
  text.value = "";
}
</script>

<template>
  <main
    class="min-w-screen min-h-screen bg-cyan-800 flex items-center justify-center"
  >
    <div
      class="w-[70vh] h-[85vh] bg-sky-400 flex flex-col items-center justify-center pb-6 rounded-2xl shadow-lg shadow-blue-400 backdrop-blur-md"
    >
      <div
        class="w-[90%] h-[80%] bg-sky-200 p-4 shadow-md shadow-gray-800 backdrop-blur-sm rounded-tr-sm rounded-tl-lg border-[1px] border-gray-900/80 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-cyan-800"
        ref="scrollRef"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="font-bold"
        >
          <div v-if="message.uid === uid" class="text-green-800">
            You: &nbsp;
          </div>
          <div v-else class="text-blue-800">Mate: &nbsp;</div>
          <div class="text-blue-600 font-medium mb-4 hover:opacity-80">
            {{ message.text }}
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="w-[90%] h-[6%] flex flex-row">
        <input
          class="w-[90%] h-full bg-blue-100 shadow-sm shadow-gray-800 backdrop-blur-md rounded-bl-lg border-[1px] border-cyan-900/80 pl-2 focus:border-cyan-340/80 outline-0 hover:brightness-110"
          v-model="text"
        />
        <button
          class="w-[10%] h-full bg-gray-400 text-white shadow-sm shadow-gray-800 backdrop-blur-md rounded-br-lg border-[1px] border-cyan-900/80 active:border-cyan-400/80 hover:brightness-110"
        >
          Go!
        </button>
      </form>
    </div>
  </main>
</template>
