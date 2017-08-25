import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUsername } from '../../actions';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  createUsername(e){
    e.preventDefault()
    this.props.createUsername(this.state)
    this.setState({ username: '' })
  }
  usernameInput(e){
    this.setState({ username: e.target.value })
  }
  render() {
    return (
      <div className="username">
      <textarea className="chatInput" placeholder="input your username" value={ this.state.username } onChange={ this.usernameInput.bind(this) }>
      </textarea>
      <button type="submit" className="sendButton" onClick={ this.createUsername.bind(this) }>Submit
      </button>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log('test', state)
  return {
    messages: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUsername: (username) => {
      dispatch(createUsername(username))
    }
  }
}

UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps
  )(UserLogin)

export default UserLogin;