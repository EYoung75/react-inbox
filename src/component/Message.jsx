import React from "react";

const Message = (props) => {
    var messages = props.messages.map(message => {
        return (
            <>
            <div className={`row message ${message.read ? "read" : "unread"}`} >
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" />
                        </div>
                        <div className="col-xs-2">
                            <i id={message.id} onClick={props.star} className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`}></i>
                        {console.log(message.id)}
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <a href="#">
                        {message.subject}
                    </a>
                </div>
            </div>
            </>
        )
    })

    return (
        <div>
            {messages}
        </div>
    )
}


export default Message;