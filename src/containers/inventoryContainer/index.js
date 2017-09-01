import React, { Component } from 'react';
import { connect } from 'react-redux';

class InventoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    }
  }

render(){
  console.log('inv props', this.props)
  return(
    <div className="inventoryContainerBorder">
      <div className="inventoryContainer">
        <div className={this.props.isVisible === true ? 'hidden' : 'ianPlayer1Inv'} ></div>
        <div className={this.props.isVisible === true ? 'hidden' : 'marielPlayer1Inv'}>
        </div>
        <div className='keyPlayerInv'>
        </div>
        <div className='spiderPlayer1Inv'>
        </div>
        <div className='voodooPlayer1Inv'>
        </div>
        <div className='wandPlayer1Inv'>
        </div>
        <div className='whipPlayer1Inv'>
        </div>
        <div className='paintingPlayer1Inv'>
        </div>
        <div className='swordPlayer1Inv'>
        </div>
        <div className='torchPlayer1Inv'>
        </div>
        <div className='torch-slantPlayer1Inv'>
        </div>
        <div className='batPlayer1Inv'>
        </div>
        <div className='ratPlayer1Inv'>
        </div>
    </div>
    </div>
    )
}
}

const mapStateToProps = (state) => {
  console.log('inventory state', state)
  return {
    score: state.gameResults,
    winningStatus: state.winningStatus,
    reinvitesFrom: state.reinvitesFrom,
    isVisible: state.isVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {}
  };

InventoryContainer = connect(mapStateToProps, mapDispatchToProps)(
  InventoryContainer
  );

export default InventoryContainer;