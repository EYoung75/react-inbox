import React from "react";
import Message from "./Message.jsx";

class MessageList extends React.Component {
   
    render() {
        var messages = this.props.messages.map(message => {
            return (
            <div>
                <Message message={message.subject} key={message}/>
            </div>)
        })
        return (
            <div className="row message">
                {messages}
            </div>
        )
    }
}

export default MessageList;