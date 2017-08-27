module.exports = class Room{
  constructor( player1, player2 ){
    console.log('player1', player1)
    console.log('player2', player2)
    this.player1 = player1;
    this.player2 = player2;
    this.id = Date.now();

    // tell both players to enter room
    this.broadcast( 'ENTER_ROOM',
      {
        player1: this.player1.username,
        player2: this.player2.username
      }
    );

  }

  // send a message to both players
  broadcast( OP, payload ){
    [ this.player1, this.player2 ].forEach( player => {
      player.send(
        JSON.stringify(Object.assign({ OP }, payload))
      )
    });
  }
}