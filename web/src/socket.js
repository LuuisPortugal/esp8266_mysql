import {io} from 'socket.io-client';

// Instancio o socket
const socket = io(process.env.API_URL);

// Carrego o socket
export default socket;
