import {io} from 'socket.io-client';

// Instancio o socket
const socket = io(process.env.VUE_APP_API_SOCKET_URL);

// Carrego o socket
export default socket;
