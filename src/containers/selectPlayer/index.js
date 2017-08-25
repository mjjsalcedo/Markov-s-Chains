import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store.js'

class SelectPlayer extends Component {

  render() {
    var currentUsers = store.getState()
    var result = currentUsers.messages.filter(users=>{
      if(users.id !== localStorage.id){
        return users.username;
      }
    })

    return (
    <div className="allusers">
    <h2> Welcome {localStorage.username}, choose your partner! </h2>
    <h2> Current Users </h2>
       <div className="userList">
          <p className="users">{result}</p>
      </div>
    </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log('testselect', state)
  return {
    messages: state
  }

}

export default SelectPlayer;
