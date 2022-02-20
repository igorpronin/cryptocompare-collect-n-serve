import {handleClose} from './close_controller';

const env = require('dotenv').config().parsed;
import WebSocket from 'ws';
import {handleIncoming} from './incoming_message_controller';

const wss = new WebSocket.Server({
  port: env.WS_PORT,
  path: env.WS_API_ROOT,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

wss.on('connection', function connection(ws) {
  console.log(`WebSocket got new client connection, clients now: ${wss.clients.size}`);
  ws.on('message', function incoming(message) {
    handleIncoming(message, ws);
  });
  ws.on('close', handleClose);
});

wss.on('close', function close() {
  // handler
});

console.log(`WebSocket server listening at ws://${env.APP_HOSTNAME}:${env.WS_PORT}${env.WS_API_ROOT}`);

export default wss.clients;
