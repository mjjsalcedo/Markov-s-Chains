import React, { Component } from 'react';

class GraphicsContainer extends Component {

render(){
  return(
  <div className="graphicsContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" ) ?
      <div className="graphicsContainer"> Player 1
          <div className="key" value="good">
          </div>
          <div className="spider" value="good">
          </div>
          <div className='voodoo' value="bad">
          </div>
          <div className='wand' value="bad">
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
    ( localStorage.getItem("player") === "player2" ) ?
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


    </div>
  )
}
}

export default GraphicsContainer;