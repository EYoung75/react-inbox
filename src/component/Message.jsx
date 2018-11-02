import React from "react";

const Message = (props) => {
    var messages = props.messages.map(message => {
        return (
            <div>
                <div className={`row message ${message.read ? "read" : "unread"} ${message.selected ? "selected" : ""}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input id={message.id} type="checkbox" onClick={props.messageSelect} checked={message.selected} />
                            </div>
                            <div className="col-xs-2">
                                <i id={message.id} onClick={props.star} className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`}></i>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => props.showBody(message.id)}>
                        <div onClick={() => props.read(message.id)} className="col-xs-11">
                            {message.labels == "dev" ? <span class="label label-warning">dev</span> : message.labels == "personal" ? <span class="label label-warning">personal</span> : message.labels == "gschool" ? <span class="label label-warning">gschool</span> : ""}
                            <a href="#">
                                {message.subject}
                            </a>
                        </div>
                    </div>
                </div>
                {props.messageBody === message.id ? 
                    <div class="row message-body">
                        <div class="col-xs-11 col-xs-offset-1">
                            {message.body}
                        </div>
                    </div> : ""}
            </div>

        )
    })

    return (
        <div>
            {messages}
        </div>
    )
}


export default Message;