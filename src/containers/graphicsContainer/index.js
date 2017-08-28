import React, { Component } from 'react';

class GraphicsContainer extends Component {

render(){
  return(
  <div className="graphicsContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" ) ?
      <div className="graphicsContainer">Player 1 Graphics go here</div>
            : null
          }

    {
    ( localStorage.getItem("player") === "player2" ) ?
      <div className="graphicsContainer">Player 2 Graphics go here</div>
            : null
          }
    </div>
  )
}
}
export default GraphicsContainer;