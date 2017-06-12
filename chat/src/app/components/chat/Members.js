import React from "react";
import {connect} from "react-redux";

class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
        this.onMembersUpdate = this.onMembersUpdate.bind(this);
    }

    onMembersUpdate(event) {
        if (event.id === this.props.selected) {
            this.setState({
                members: event.users
            });
        }
    }

    componentDidMount() {
        this.props.socket.on("roomInfo", this.onMembersUpdate);
    }

    render() {
        const membersList = this.state.members.map((member) =>
            <div className="chatMember" key={member}> {member}</div>
        );

        return (
            <div id="chatMembers">
                <div className="entityContainer">
                    <h3>w grupie</h3>
                    { membersList }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name,
    socket: state.connections.socket,
    selected: state.room.selected
});

export default connect(mapStateToProps, null)(Members);
