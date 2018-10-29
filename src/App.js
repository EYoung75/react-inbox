import React, { Component } from 'react';
import './App.css';
import Toolbar from "./component/Toolbar.jsx";
import MessageList from './component/MessageList.jsx';

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8082/api/messages")
    const json = await response.json()
    this.setState({messages: json})
  }


  render() {
    return (
      <div>
        <Toolbar />
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
