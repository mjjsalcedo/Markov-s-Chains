export default class Room {
  constructor(player1, player2) {
    this.id = Math.round(Math.random()*1000); //make this better in the future
    this.player1 = player1; //a socket to send to each player in room
    this.player2 = player2;
  }
}