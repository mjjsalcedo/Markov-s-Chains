import React, { Component } from 'react';

class StoryContainer extends Component {

render(){
  return(
  <div className="storyContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" ) ?
      <div className="storyContainer"></div>
            : null
          }

    {
    ( localStorage.getItem("player") === "player2" ) ?
      <div className="storyContainer"></div>
            : null
          }
    </div>
  )
}
}
export default StoryContainer;