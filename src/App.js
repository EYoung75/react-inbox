import React, { Component } from 'react';
import './App.css';
import Toolbar from "./component/Toolbar.jsx";
import Message from "./component/Message.jsx";

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
    }
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8082/api/messages")
    const json = await response.json()
    this.setState({messages: json})
  }

  patch = async (id, command, attribute, value) => {
    var patch = {
      messageIds: [id],
      command: command,
      [attribute]: value
    }

    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(patch),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })

    const posted = await response.json()
    this.setState({
      messages: posted
    })
  }

    messageRead = (id) => {
      this.patch(id, "read", "read", true)
    }

    messageStarred = (event) => {
      this.patch(event.target.id, "star", "starred")
    }

    messageSelect = (event) => {
      this.patch(event.target.id, "select", "select")
      }

  render() {
    return (
      <div>
        <Toolbar />
        <Message messages={this.state.messages} read={this.messageRead} star={this.messageStarred} onClick={this.onClick} messageSelect={this.messageSelect} selected={this.state.selected}/>
      </div>
    )
  }
}

export default App;
