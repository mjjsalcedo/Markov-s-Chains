import React, { Component } from "react";
import { connect } from "react-redux";
import { messageSend, broadcastMessage } from "../../actions";

class CellPhoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
      roomId: localStorage.getItem("roomId")
    };
  }

  messageSend(e) {
    e.preventDefault();
    this.props.messageSend(this.state);
    this.setState({ message: "" });
  }
  messageInput(e) {
    this.setState({ message: e.target.value });
  }

  componentWillMount() {
    this.props.broadcastMessage();
  }

  render() {
    return (
      <div className="cellPhoneBorder">
        <div className="cellPhoneContainer">
          <div className="messageBox">
            {this.props.messages
              .filter(message => {
                return message.message !== undefined;
              })
              .map(message =>
                <pre className="message">
                  {message.message}
                </pre>
              )}
          </div>
        </div>
        <form className="cellPhoneForm" onSubmit={this.messageSend.bind(this)}>
          <textarea
            className="chatInput"
            placeholder="message your friends"
            value={this.state.message}
            onChange={this.messageInput.bind(this)}
          />
          <button type="submit" className="sendButton">
            Send Message
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    messages: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    broadcastMessage: message => {},
    messageSend: message => {
      dispatch(messageSend(message));
    }
  };
};

CellPhoneContainer = connect(mapStateToProps, mapDispatchToProps)(
  CellPhoneContainer
);

export default CellPhoneContainer;
