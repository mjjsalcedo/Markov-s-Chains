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
  return(
    <div className="inventoryContainerBorder">
      <div className="inventoryContainer">
        <div className={this.props.isVisible.indexOf('keyPlayer1') === -1 ? 'hidden' : 'keyPlayer1Inv'} >
        </div>
        <div className={this.props.isVisible.indexOf('spiderPlayer1') === -1 ? 'hidden' : 'spiderPlayer1Inv' }>
        </div>
        <div className={this.props.isVisible.indexOf('voodooPlayer1') === -1 ? 'hidden' : 'voodooPlayer1Inv' }>
        </div>
        <div className={this.props.isVisible.indexOf('wandPlayer1') === -1 ? 'hidden' : 'wandPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('marielPlayer1') === -1 ? 'hidden' : 'marielPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('whipPlayer1') === -1 ? 'hidden': 'whipPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('paintingPlayer1') === -1 ? 'hidden' : 'paintingPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('ianPlayer1') === -1 ? 'hidden' : 'ianPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('swordPlayer1') === -1 ? 'hidden' : 'swordPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('torchPlayer1') === -1 ? 'hidden' : 'torchPlayer1Inv' } >
        </div>
        <div className={this.props.isVisible.indexOf('torch-slantPlayer1') === -1 ? 'hidden' : 'torch-slantPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('batPlayer1') === -1 ? 'hidden' : 'batPlayer1Inv'}>
        </div>
        <div className={this.props.isVisible.indexOf('ratPlayer1') === -1 ? 'hidden' : 'ratPlayer1Inv'}>
        </div>
    </div>
    </div>
    )
}
}

const mapStateToProps = (state) => {
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