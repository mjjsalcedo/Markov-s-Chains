import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { inviteUser, acceptInvite, declineInvite } from '../actions';

class RoomContainer extends Component {
  constructor(props){
    super(props);

    this.state = {

    };

  }
  render() {
    return (
      <div>
        <p>Player1: {this.props.player1}</p>
        <p>Player2: {this.props.player2}</p>
        <div>
          ... make chat room ...
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player1: state.player1,
    player2: state.player2
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const Room = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContainer);

export default Room;