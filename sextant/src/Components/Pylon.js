/* import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:55455');

class Pylon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latency: null
        };
    }

    componentDidMount() {
        client.onmessage = (message) => {
            this.setState({
                latency: new Date().getTime() - message.data
            })
        };
    }

    render() {
        return (
            <span className="Pylon">
                {this.state.latency}
            </span>
        );
    }
}

export default Pylon;
 */

import React, { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

function PacketLatencyComponent() {
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

export default PacketLatencyComponent;
