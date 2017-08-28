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
    return (
       <div className="mainContainer">
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
  console.log(state);
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