import React, { Component } from 'react';
import { connect } from 'react-redux';
class StoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="storyContainerBorder">
      {
        ( localStorage.getItem("player") === "player1" && this.props.winningStatus === null) ?
        <div className="storyContainer">
        <span className="storyText">Oh no! You and your best friend took a wrong turn, and now the both of you are trapped in the Castle Without Sensation. Over a thousand thousand years of cataclysmic divide and reconstitution have made its walls forgetful. Help them remember! Use your rad phones; communicate, spot and avoid the differences. Get out!</span></div>
        : null
      }
      {
        ( localStorage.getItem("player") === "player1" && this.props.winningStatus !== null) ?
        <div className="storyContainer">
        <div className="creditText"><p>Mariel Salcedo:<br/>ReactJS, WebSocket, and Debugging.</p><p>Ian Bovard:<br/>Database, Markov Algorithm, Game Design, and Debugging.</p><p>Reyn Leong:<br/>Styling & Animation, Deployment, and Debugging.</p></div></div>
        : null
      }
      {
        ( localStorage.getItem("player") === "player2" && this.props.winningStatus === null) ?
        <div className="storyContainer">
        <span className="storyText">Oh no! You and your best friend took a wrong turn, and now the both of you are trapped in the Castle Without Sensation. Over a thousand thousand years of cataclysmic divide and reconstitution have made its walls forgetful. Help them remember! Use your rad phones; communicate, spot and avoid the differences. Get out!</span></div>
        : null
      }
      {
        ( localStorage.getItem("player") === "player2" && this.props.winningStatus !== null) ?
        <div className="storyContainer">
        <div className="creditText"><p>Mariel Salcedo:<br/>ReactJS, WebSocket, and Debugging.</p><p>Ian Bovard:<br/>Database, Markov Algorithm, Game Design, and Debugging.</p><p>Reyn Leong:<br/>CSS, Deployment, and Debugging.</p></div></div>
        : null
      }

      </div>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    winningStatus: state.winningStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {}
}

StoryContainer = connect(mapStateToProps, mapDispatchToProps)(
  StoryContainer
  );

export default StoryContainer;



