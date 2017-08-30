import React, { Component } from 'react';

class GraphicsContainer extends Component {

render(){
  return(
  <div className="graphicsContainerBorder">
  {
    ( localStorage.getItem("player") === "player1" ) ?
      <div className="graphicsContainerPlayer1"> Player 1
          <div className="keyPlayer1" value="good">
          </div>
          <div className="spiderPlayer1" value="good">
          </div>
          <div className='voodooPlayer1' value="bad">
          </div>
          <div className='wandPlayer1' value="bad">
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
    ( localStorage.getItem("player") === "player2" ) ?
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


    </div>
  )
}
}

export default GraphicsContainer;