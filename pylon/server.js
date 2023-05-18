
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 55455 });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  // Simulate sending packet latency every 2 seconds
  const interval = setInterval(() => {
    const latency = Math.floor(Math.random() * 100); // Random latency value between 0 and 100
    const message = JSON.stringify({ type: 'latency', data: latency });
    ws.send(message);
  }, 2000);

  ws.on('close', () => {
    console.log('WebSocket disconnected');
    clearInterval(interval);
  });
});
