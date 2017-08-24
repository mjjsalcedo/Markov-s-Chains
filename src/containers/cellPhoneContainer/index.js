import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageSend } from '../../actions';

class CellPhoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
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
      <div className="cellPhoneContainer">
        <textarea className="chatInput" placeholder="message your friends" value={ this.state.message } onChange={ this.messageInput.bind(this) }></textarea>
        <button type="submit" className="sendButton" onClick={ this.messageSend.bind(this) }>Send Message</button>
      </div>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    messages: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageSend: (message) => {
      dispatch(messageSend(message))
    }
  }
}

CellPhoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
  )(CellPhoneContainer)

export default CellPhoneContainer;
