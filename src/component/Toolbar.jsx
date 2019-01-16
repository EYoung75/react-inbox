import React from "react"

const Toolbar = (props) => {
        var messages = props.messages
        var allSelected = messages.every(message => message.selected === true)
        var noneSelected =  messages.every(message => message.selected === false)
        var unreadMessages = messages.filter(item => item.read === false).length
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadMessages}</span>
                        unread messages
                    </p>

                    <a onClick={props.compose} className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i onClick={props.selectAll} className={`fa ${allSelected ? "fa-check-square-o" : noneSelected ? "fa-square-o" : "fa-minus-square-o"}`}></i>
                    </button>

                    <button onClick={props.readAll} className="btn btn-default">Mark As Read</button>

                    <button onClick={props.unreadAll} className="btn btn-default">Mark As Unread</button>

                    <select onChange={(e) => {props.addLabel(e)}} className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select onChange={(e) => {props.removeLabel(e); e.target.selectedIndex = 0}} className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button onClick={props.delete} className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>

        )
}

export default Toolbar

