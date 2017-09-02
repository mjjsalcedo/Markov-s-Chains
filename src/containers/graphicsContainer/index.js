import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameResults, checkGameStatus, anotherInvite, replayGame, lobby } from '../../actions';
import { Link} from 'react-router-dom';


class GraphicsContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      roomId: localStorage.getItem("roomId")
    }

    this.selectedItem = this.selectedItem.bind(this);
    this.sendWinningStatus = this.sendWinningStatus.bind(this);
    this.displayPlayAgain = this.displayPlayAgain.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.goToLobby = this.goToLobby.bind(this);
  }

  selectedItem(e){
    this.props.gameResults( {username: this.state.username, roomId: localStorage.getItem("roomId"), score: e.target.getAttribute('value'), isVisible: e.target.className} );
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

  goToLobby(){
    this.props.lobby({username: localStorage.getItem("username")})
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
      if(test.good >= 10) {
        this.sendWinningStatus("win")
      }
    }

    if(this.props.goToLobby === true){
      this.props.history.push('/userlist')
    }

    return(
      <div className="graphicsContainerBorder">
      {

        ( localStorage.getItem("player") === "player1" && this.props.winningStatus === null ) ?
        <div className="stageOneGraphicsContainerPlayer1"> Player 1
        <div className={this.props.isVisible.indexOf('keyPlayer1') === -1 ? 'keyPlayer1' : 'hidden'} value="bad" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('spiderPlayer1') === -1 ? 'spiderPlayer1' : 'hidden'} value="bad" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('voodooPlayer1') === -1 ? 'voodooPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('wandPlayer1') === -1 ? 'wandPlayer1' : 'hidden'}value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('marielPlayer1') === -1 ? 'marielPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('whipPlayer1') === -1 ? 'whipPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('paintingPlayer1') === -1 ? 'paintingPlayer1' : 'hidden'} value="bad" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('ianPlayer1') === -1 ? 'ianPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('swordPlayer1') === -1 ? 'swordPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('torchPlayer1') === -1 ? 'torchPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('torch-slantPlayer1') === -1 ? 'torch-slantPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('batPlayer1') === -1 ? 'batPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        <div className={this.props.isVisible.indexOf('ratPlayer1') === -1 ? 'ratPlayer1' : 'hidden'} value="good" onClick={this.selectedItem}>
        </div>
        </div>
        : null
      }

      {

        ( localStorage.getItem("player") === "player2" && this.props.winningStatus === null ) ?
        <div className="stageOneGraphicsContainerPlayer2">Player 2
        <div className="keyPlayer2">
        </div>
        <div className="spiderPlayer2">
        </div>
        <div className='voodooPlayer1'>
        </div>
        <div className='wandPlayer2'>
        </div>
        <div className='marielPlayer1'>
        </div>
        <div className='whipPlayer1'>
        </div>
        <div className='paintingPlayer2'>
        </div>
        <div className='ianPlayer1'>
        </div>
        <div className='swordPlayer1'>
        </div>
        <div className='torchPlayer1'>
        </div>
        <div className='torch-slantPlayer1'>
        </div>
        <div className='batPlayer1'>
        </div>
        <div className='ratPlayer1'>
        </div>
        </div>
        : null
      }

      {

    (  this.props.winningStatus !== null && this.props.reinvitesFrom === null) ?
      <div className='winLoseContainer'>
          {( this.props.winningStatus === "win") ?
          <div className='endContainer'>
          <h2 className='winText endText'> YOU WIN </h2>
          <div className='playAgainContainer'>
          <button className='playAgain btn' onClick={this.displayPlayAgain}>Play Again?</button>
          <button className='quit btn' onClick={this.goToLobby}>Home</button>
          </div>
          </div>
        :null }

        {

          ( this.props.winningStatus === "lose" && this.props.reinvitesFrom === null) ?
          <div className='endContainer'>
          <h2 className='loseText endText'> YOU LOSE </h2>
          <div className='playAgainContainer'>
          <button className='playAgain btn' onClick={this.displayPlayAgain}>Play Again?</button>
          <button className='quit btn' onClick={this.goToLobby}>Home</button>
          </div>
          </div>
            :null }
        </div>
            : null
          }

        {
            ( this.props.reinvitesFrom !== null ) ?
               <div className='replayContainer'>
                <p className='replay'>
                  You were invited to replay a game with { this.props.reinvitesFrom }
                </p>
                <button className='replayAccept btn' onClick={this.onClickAccept} type="button">Accept</button>
                <button className='replayDecline btn' onClick={this.onClickDecline} type="button">Decline</button>
              </div>
            : null
          }
        </div>
  )
}
}

const mapStateToProps = (state) => {
  debugger;
  console.log('graphics state', state)
  return {
    score: state.gameResults,
    winningStatus: state.winningStatus,
    reinvitesFrom: state.reinvitesFrom,
    isVisible: state.isVisible,
    goToLobby: state.goToLobby
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
    },
    lobby: player => {
      dispatch(lobby(player))
    }
  };
};

GraphicsContainer = connect(mapStateToProps, mapDispatchToProps)(
  GraphicsContainer
  );

export default GraphicsContainer;