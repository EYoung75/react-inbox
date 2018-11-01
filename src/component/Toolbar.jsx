import React from "react";

class Toolbar extends React.Component {
    render() {
        var messages = this.props.messages
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

                    <a onClick={this.props.compose} className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i onClick={this.props.selectAll} className={`fa ${allSelected ? "fa-check-square-o" : noneSelected ? "fa-square-o" : "fa-minus-square-o"}`}></i>
                    </button>

                    <button onClick={this.props.readAll} className="btn btn-default">Mark As Read</button>

                    <button onClick={this.props.unreadAll} className="btn btn-default">Mark As Unread</button>

                    <select className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>

        )
    }
}

export default Toolbar;

