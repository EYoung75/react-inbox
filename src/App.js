import React, { Component } from 'react';
import './App.css';
import Toolbar from "./component/Toolbar.jsx";
import Message from "./component/Message.jsx";
import ComposeForm from "./component/ComposeForm.jsx";

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      compose: false
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

    readAll = (event) => {
      var selected = this.state.messages.filter(message => message.selected === true)
      selected.map(message => this.patch(message.id, "read", "read", true))
      }

    unreadAll = (event) => {
      var selected = this.state.messages.filter(message => message.selected === true)
      selected.map(message => this.patch(message.id, "read", "read", false))
    }

    selectAll = (event) => {
      this.state.messages.map(message => this.patch(message.id, "select", "select"))
    }

    compose = (event) => {
      this.setState({compose: !this.state.compose})
    }

  render() {

    var compose=this.state.compose
    return (
      <div className="container">
        <Toolbar readAll={this.readAll} unreadAll={this.unreadAll} messages={this.state.messages} selectAll={this.selectAll} compose={this.compose}/>
        <Message messages={this.state.messages} read={this.messageRead} star={this.messageStarred} onClick={this.onClick} messageSelect={this.messageSelect} selected={this.state.selected}/>
        {compose ? <div className="container"><ComposeForm /></div> : ""}     
      </div>
    )
  }
}

export default App;
