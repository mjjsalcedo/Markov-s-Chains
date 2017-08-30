import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameResults, checkGameStatus } from '../../actions';
import { Link } from 'react-router-dom';


class GraphicsContainer extends Component {

constructor(props) {
    super(props);


    this.selectedItem = this.selectedItem.bind(this);
    this.sendWinningStatus = this.sendWinningStatus.bind(this);

  }

  selectedItem(e){
    this.props.gameResults( {score: e.target.getAttribute('value'), roomId: localStorage.getItem("roomId")} );
    }

  sendWinningStatus(value){
    console.log('value', value)
    this.props.checkGameStatus({result: value})
  }

render(){
  console.log('props', this.props)
  let test = this.props.score.reduce((status, score)=>{
    if(score in status){
      status[score]++;
    }
    else {
      status[score] = 1
    }
    return status;
  }, {});
  console.log('graphic props', this.props.score)
  console.log('graphic props test', test)

  if(test.bad >= 3){
    console.log('you lost')
    this.sendWinningStatus("lose")
  }
  if(test.good >= 3) {
    console.log('you win!')
    this.sendWinningStatus("win")

   }
  return(
  <div className="graphicsContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" && this.props.winningStatus === undefined ) ?
      <div className="graphicsContainer"> Player 1
          <div className="key" value="good">
          </div>
          <div className="spider" value="good" onClick={this.selectedItem}>
          </div>
          <div className='voodoo' value="bad">
          </div>
          <div className='wand' value="bad" onClick={this.selectedItem}>
          </div>
          <div className='mariel' value="bad">
          </div>
          <div className='whip' value="good">
          </div>
          <div className='painting' value="bad">
          </div>
          <div className='ian' value="bad">
          </div>
          <div className='sword' value="bad">
          </div>
          <div className='torch' value="bad">
          </div>
          <div className='torch-slant' value="bad">
          </div>
          <div className='bat' value="bad">
          </div>
          <div className='rat' value="bad">
          </div>
        </div>
            : null
          }

    {
    ( localStorage.getItem("player") === "player2" &&this.props.winningStatus === undefined ) ?
      <div className="graphicsContainer">Player 2 <div className="key">
          </div>
          <div className="spider">
          </div>
          <div className='voodoo'>
          </div>
          <div className='wand'>
          </div>
          <div className='mariel'>
          </div>
          <div className='whip'>
          </div>
          <div className='painting'>
          </div>
          <div className='ian'>
          </div>
          <div className='sword'>
          </div>
          <div className='torch'>
          </div>
          <div className='torch-slant'>
          </div>
          <div className='bat'>
          </div>
          <div className='rat'>
          </div>
        </div>
            : null
          }

  {

    (  this.props.winningStatus !== undefined  ) ?
      <div className="graphicsContainer">
          {( this.props.winningStatus === "win") ?
          <div> YOU WIN!!! </div>
            :null }
          {
          ( this.props.winningStatus === "lose") ?
          <div> YOU SUCK -_- </div>
            :null }
        </div>
            : null
          }
        </div>
  )
}
}

const mapStateToProps = (state) => {
  console.log('graphicsContainer', state)
  return {
    score: state.gameResults,
    winningStatus: state.winningStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    broadcastMessage: (score) =>{
    },
    gameResults: score => {
      dispatch(gameResults(score));
    },
    checkGameStatus: result => {
      dispatch(checkGameStatus(result))
    }
  };
};

GraphicsContainer = connect(mapStateToProps, mapDispatchToProps)(
  GraphicsContainer
);

export default GraphicsContainer;