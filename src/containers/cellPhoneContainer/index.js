import React, { Component } from "react";
import { connect } from "react-redux";
import { messageSend } from "../../actions";

class CellPhoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      username: ''
    }
  }

  messageSend(e){
    e.preventDefault()
    this.props.messageSend(this.state)
    this.setState({ message: '' })
  }
  messageInput(e){
    this.setState({ message: e.target.value })
  }
  render() {
    return (
      <div className="cellPhoneBorder">
        <div className="cellPhoneContainer">
          <div className="messageBox">
            {this.props.messages.map(message =>
              <pre className="message">
                {message}
              </pre>
            )}
        </div>
      </div>
      <form onSubmit={ this.messageSend.bind(this) }>
      <textarea className="chatInput" placeholder="message your friends" value={ this.state.message } onChange={ this.messageInput.bind(this) }>
      </textarea>
      <button type="submit" className="sendButton">Send Message
      </button>
      </form>
    </div>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    messages: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    messageSend: message => {
      dispatch(messageSend(message));
    }
  };
};

CellPhoneContainer = connect(mapStateToProps, mapDispatchToProps)(
  CellPhoneContainer
);

export default CellPhoneContainer;

