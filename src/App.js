import React, { Component } from "react"
import "./App.css"
import Toolbar from "./component/Toolbar.jsx"
import Message from "./component/Message.jsx"
import ComposeForm from "./component/ComposeForm.jsx"

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      compose: false,
      messageBody: 0
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

    showBody = (id) => {
      if(this.state.messageBody === 0) {
        this.setState({messageBody: id})
      } else if(this.state.messageBody === id) {
        this.setState({messageBody: 0})
      }
    }

    messageStarred = (event) => {
      this.patch(event.target.id, "star", "starred")
    }

    messageSelect = (event) => {
      this.patch([event.target.id], "select", "selected")
      }

    readAll = (event) => {
      var selected = this.state.messages.filter(message => message.selected === true)
      selected.map(message => this.patch(message.id, "read", "read", true))
      }

    unreadAll = (event) => {
      var selected = this.state.messages.filter(message => message.selected === true)
      selected.map(message => this.patch(message.id, "read", "read", false))
    }

    selectAll = () => {
      let selected = this.state.messages.filter(i => {
        return i.selected === true
      })
      if (selected.length === this.state.messages.length) {
        this.state.messages.map(i => {
          this.patch([i.id], 'allFalse')
        })
      } else {
        this.state.messages.map(i => {
          this.patch([i.id], 'allTrue')
        })
      }
    }

    compose = (event) => {
      this.setState({compose: !this.state.compose})
    }

    delete = (event) => {
      var selected = this.state.messages.filter(message => message.selected === true)
      selected.map(message => this.patch(message.id, "delete"))
    }

    addLabel = (event) => {
      let selected = this.state.messages.filter(item => item.selected === true)
      selected.map(item => this.patch([item.id], "addLabel", "label", event.target.value))
    }

    removeLabel = (event) => {
      let selected = this.state.messages.filter(message => message.selected === true)
      selected.map(item => this.patch([item.id], "removeLabel", "label", event.target.value))
    }



    post = () => {
      alert("Message Sent")
      this.setState({
        compose: false
      })
    }

    holdSubject = (e) => {
      this.setState({
        subject: e.target.value
      })
    }

    holdBody = (e) => {
      this.setState({
        body: e.target.value
      })
    }


  render() {

    var compose=this.state.compose
    return (
      <div className="container">
        <Toolbar readAll={this.readAll} unreadAll={this.unreadAll} messages={this.state.messages} selectAll={this.selectAll} compose={this.compose} delete={this.delete} addLabel={this.addLabel} removeLabel={this.removeLabel}/>
        {compose ? <div className="container"><ComposeForm compose={this.compose} post={this.post}/></div> : ""}     
        <Message showBody={this.showBody} messageBody={this.state.messageBody} messages={this.state.messages} read={this.messageRead} star={this.messageStarred} onClick={this.onClick} messageSelect={this.messageSelect} selected={this.state.selected} />
      </div>
    )
  }
}

export default App;
