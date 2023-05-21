import { io } from "socket.io-client";
import { ref } from "vue";

//const SocketInfo = ({{ children }}) => {
const socket = ref("null");
const room = ref("null");
const p1 = ref("null");
const p2 = ref("null");
const navigate = func1();
const location = func2();
//};

watchEffect(() => {
  const socket = io(process.env.VUE_APP_SOCKET_URL);
  setSocket(socket);
});
