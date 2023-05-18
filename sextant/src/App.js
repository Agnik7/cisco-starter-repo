import React, { Component } from 'react';
import './App.css';
import Banner from './Components/Banner';
import Exhibit from './Components/Exhibit';
import Address from './Components/Address';
import Pylon from './Components/Pylon';
class App extends Component {
    render() {
        return (
            <div className="App">
                <Banner bannerText="Sextant" />
                <Exhibit name="IPv4 Address">
                    <Address url='https://api.ipify.org?format=json' />
                </Exhibit>
                <Exhibit name=" IPv6 Address">
                    <Address url='https://api64.ipify.org?format=json' />
                </Exhibit>
                <Exhibit name="Pylon Packet Latency">
                    <Pylon/>
                </Exhibit>
            </div>
        );
    }
}

export default App;