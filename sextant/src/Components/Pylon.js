import React, { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

function Pylon() {
  const [latency, setLatency] = useState(null);
  const endpoint = 'ws://localhost:55455'; // Pylon WebSocket endpoint

  useEffect(() => {
    const socket = new ReconnectingWebSocket(endpoint);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'latency') {
        setLatency(message.data);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      Latency: {latency !== null ? latency : 'Loading...'} ms
    </>
  );
}

export default Pylon;
