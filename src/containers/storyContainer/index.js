import React, { Component } from 'react';

class StoryContainer extends Component {

render(){
  return(
  <div className="storyContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" ) ?
      <div className="storyContainer">Player1 Story elements go here</div>
            : null
          }

    {
    ( localStorage.getItem("player") === "player2" ) ?
      <div className="storyContainer">Player2 Story elements go here</div>
            : null
          }
    </div>
  )
}
}
export default StoryContainer;