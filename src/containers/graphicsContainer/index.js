import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameResults, checkGameStatus, anotherInvite, replayGame } from '../../actions';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


class GraphicsContainer extends Component {

constructor(props) {
    super(props);

    this.selectedItem = this.selectedItem.bind(this);
    this.sendWinningStatus = this.sendWinningStatus.bind(this);
    this.displayPlayAgain = this.displayPlayAgain.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);

  }

  selectedItem(e){
    this.props.gameResults( {score: e.target.getAttribute('value'), roomId: localStorage.getItem("roomId")} );
    }

  sendWinningStatus(value){
    this.props.checkGameStatus({result: value})
  }

  displayPlayAgain(){
    this.props.anotherInvite({username: localStorage.getItem("username"), roomId: localStorage.getItem("roomId")})
  }

  onClickAccept(){
    this.props.replayGame(this.props.reinvitesFrom)
  }


render(){
  if (this.props.score !== undefined) {
  let test = this.props.score.reduce((status, score)=>{
    if(score in status){
      status[score]++;
    }
    else {
      status[score] = 1
    }
    return status;
  }, {});
  if(test.bad >= 3){
    this.sendWinningStatus("lose")
  }
  if(test.good >= 3) {
    this.sendWinningStatus("win")
   }
  }

  return(
  <div className="graphicsContainerBorder">
  {

    ( localStorage.getItem("player") === "player1" && this.props.winningStatus === undefined ) ?
      <div className="graphicsContainerPlayer1"> Player 1
          <div className="keyPlayer1" value="good">
          </div>
          <div className="spiderPlayer1" value="good">
          </div>
          <div className='voodooPlayer1' value="bad">
          </div>
          <div className='wandPlayer1' value="bad" onClick={this.selectedItem}>
          </div>
          <div className='marielPlayer1' value="bad">
          </div>
          <div className='whipPlayer1' value="good">
          </div>
          <div className='paintingPlayer1' value="bad">
          </div>
          <div className='ianPlayer1' value="bad">
          </div>
          <div className='swordPlayer1' value="bad">
          </div>
          <div className='torchPlayer1' value="bad">
          </div>
          <div className='torch-slantPlayer1' value="bad">
          </div>
          <div className='batPlayer1' value="bad">
          </div>
          <div className='ratPlayer1' value="bad">
          </div>
        </div>
            : null
          }

    {
    ( localStorage.getItem("player") === "player2" &&this.props.winningStatus === undefined ) ?
      <div className="graphicsContainerPlayer2">Player 2 <div className="key">

          </div>
          <div className="keyPlayer2" value="good">
          </div>
          <div className="spiderPlayer2">
          </div>
          <div className='voodooPlayer2'>
          </div>
          <div className='wandPlayer2'>
          </div>
          <div className='marielPlayer2'>
          </div>
          <div className='whipPlayer2'>
          </div>
          <div className='paintingPlayer2'>
          </div>
          <div className='ianPlayer2'>
          </div>
          <div className='swordPlayer2'>
          </div>
          <div className='torchPlayer2'>
          </div>
          <div className='torch-slantPlayer2'>
          </div>
          <div className='batPlayer2'>
          </div>
          <div className='ratPlayer2'>
          </div>
        </div>
            : null
          }

  {

    (  this.props.winningStatus !== undefined  ) ?
      <div className="graphicsContainer">
          {( this.props.winningStatus === "win") ?
          <div>
          <h2> YOU WIN!!! </h2>
          <button onClick={this.displayPlayAgain}> Play Again </button>
          <Link to="/"> Home </Link>
          </div>

            :null }

          {
          ( this.props.winningStatus === "lose") ?
          <div>
          <h2> YOU LOSE </h2>
          <button onClick={this.displayPlayAgain}> Play Again </button>
          <Link to="/"> Home </Link>
          </div>
            :null }
        </div>
            : null
          }

      {
            ( this.props.reinvitesFrom !== undefined ) ?
              <div>
                <p>
                  You were invited to replay a game with { this.props.reinvitesFrom }
                </p>
                <button onClick={this.onClickAccept} type="button">Accept</button>
                <button onClick={this.onClickDecline} type="button">DECLINE</button>
              </div>
            : null
          }
        </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    score: state.gameResults,
    winningStatus: state.winningStatus,
    reinvitesFrom: state.reinvitesFrom
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
    },
    anotherInvite: player => {
      dispatch(anotherInvite(player))
    },
    replayGame: player => {
      dispatch(replayGame(player))
    }
  };
};

GraphicsContainer = connect(mapStateToProps, mapDispatchToProps)(
  GraphicsContainer
);

export default GraphicsContainer;