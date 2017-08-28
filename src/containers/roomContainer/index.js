import React, { Component } from 'react';
import { connect } from 'react-redux';
import CellPhoneContainer from '../cellPhoneContainer'
import GraphicsContainer from '../graphicsContainer'
import StoryContainer from '../storyContainer'
import InventoryContainer from '../inventoryContainer'

class RoomContainer extends Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }
  render() {
    console.log('room container', this.props);
    return (
       <div className="mainContainer">
       <p>Player1: {this.props.player1}</p>
        <p>Player2: {this.props.player2}</p>
  <div className="visualContainer">
  <GraphicsContainer/>
  <InventoryContainer/>
  <StoryContainer/>
  </div>
  <CellPhoneContainer/>
  </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('roomstate', state)
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