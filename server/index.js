/*jshint esversion:6*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const Room = require('../src/Room');
let db = require('../models');
let Ngrams = db.ngrams;
/*const apiRoutes = require('./api');*/


const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = [];
let usersPlaying = [];
const rooms = new Map();
//rooms.set(new_room_id, new Room(new_room_id)) //when you accept an invite set the new room


let messageChain = { trigger: [], response: []};
let messageCache = [];
let triggerCache = [];
let modifiedTrigger = '';
let modifiedMessage = '';
let markovArray = [];

wss.on('connection', function connection(ws, req) {
  console.log("connected");
  let userId = ws._ultron.id;
  ws.userId = userId;

  let username = null;
  ws.username = null;
  users.push(ws);

  ws.on('close', function (){
    console.log(`${ws.username} has disconnected`);
    users.splice( users.indexOf(ws), 1 );
    // also broadcast to all other users
    users.forEach(user => {
      user.send(
        JSON.stringify({
          OP: 'USER_DISCONNECTED', // all users not in room
          username: ws.username // could be undefined
        })
        );
    });
  });

  ws.on('message', function incoming(message) {
    let payload = JSON.parse(message);
    switch (payload.OP) {
      case 'CHAT':
      let room = rooms.get(parseInt(payload.message.roomId));
      switch(true){
        case (messageChain.trigger.length === 0):
        messageChain.trigger.push(payload.message);
        modifiedTrigger = payload.message.message
        .replace(/[.,\/#!$%@\^*\*;:{}=\-_`'~()]/g,"")
        .replace(/\s{2,}/g,"").toLowerCase();
        triggerCache.push(modifiedTrigger);
        recurseThroughDb(modifiedTrigger, modifiedTrigger, room);
        break;

        case (messageChain.trigger.length > 0 && messageChain.trigger[0].username != payload.message.username):
        messageChain.response.push(payload.message);
        modifiedMessage = payload.message.message
        .replace(/[.,\/#!$%@\^*\*;:{}=\-_`'~()]/g,"")
        .replace(/\s{2,}/g,"").toLowerCase();
        messageCache.push(modifiedMessage);
        recurseThroughDb(modifiedMessage, modifiedMessage, room);
        break;

        case (messageChain.trigger[0].username === payload.message.username && messageChain.response.length  === 0):
        messageChain.trigger.push(payload.message);
        modifiedTrigger = payload.message.message
        .replace(/[.,\/#!$%@\^*\*;:{}=\-_`'~()]/g,"")
        .replace(/\s{2,}/g,"").toLowerCase();
        triggerCache.push(modifiedTrigger);
        recurseThroughDb(modifiedTrigger, modifiedTrigger, room);
        break;

        case (messageChain.trigger[0].username === payload.message.username):
        let recurseMessage = payload.message.message
        .replace(/[.,\/#!$%@\^*\*;:{}=\-_`'~()]/g,"")
        .replace(/\s{2,}/g,"").toLowerCase();
        recurseThroughDb(recurseMessage, recurseMessage, room);
        let joinedTriggers = triggerCache.join(' ');
        let cache = messageCache.join(' # ').split(' ');
        cache.push('#');
        return Ngrams.findOne({ where: { trigger: joinedTriggers, context: joinedTriggers}}).then(firstRow =>{
          if (firstRow) {
            cache.map(word => {
              return Ngrams.findOne({ where: { context: joinedTriggers, word: word} }).then(row => {
                if (row) {
                  row.update ( {
                    weight: Ngrams.sequelize.literal('weight + 1')
                  });
                }else if (!row) {
                  return Ngrams.create( {
                    word: word,
                    weight: 1,
                    trigger: joinedTriggers,
                    context: joinedTriggers
                  });
                }
              });
            });
          }else if (!firstRow) {
            return Ngrams.create( {
              word: cache[0],
              weight: 1,
              trigger: joinedTriggers,
              context: joinedTriggers
            }).then(newRows => {
              cache.reduce((trigger, response) => {
                Ngrams.create({
                  word: response,
                  weight: 1,
                  trigger: trigger,
                  context: joinedTriggers
                });
                return response;
              });
            });
          }
        }).then(resetValues => {
          room.broadcast('BROADCAST_MESSAGE', {message: payload.message.message});
          messageChain.trigger = messageChain.response;
          messageChain.response = [payload.message];
          modifiedMessage = payload.message.message
          .replace(/[.,\/#!$@%\^*\*;:{}=\-_`'~()]/g,"")
          .replace(/\s{2,}/g,"").toLowerCase();
          triggerCache = messageCache;
          messageCache = [modifiedMessage];
          markovArray = [];
        });
      }

      room.broadcast('BROADCAST_MESSAGE', {message: payload.message.message});
      break;

      case 'CONNECTED':
      ws.username = payload.message.username;
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username
          }));
      });
      break;

      case 'BROADCAST_USERNAME':
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username,
            id: payload.message.id
          }));
      });
      break;

      case 'GAME_RESULTS':
      let roomGraphic = rooms.get(parseInt(payload.score.roomId));
      roomGraphic.broadcast('BROADCAST_SCORE', {score: payload.score.score});
      break;

      case 'SEND_INVITE':
      const invitedUser = users.find( user => user.username === payload.invite.username );
      if( invitedUser !== undefined ){
        invitedUser.send(
          JSON.stringify({
            OP: 'RECEIVE_INVITE',
            sender: ws.username
          })
          );
      } else {
        ws.send(
          JSON.stringify({
            OP: 'ERROR',
            message: 'username is not found or has disconnected'
          })
          );
      }
      break;
      case 'ACCEPT_INVITE':
      const sender = users.find( user => user.username === payload.username );
      var verifySender = users.filter( user =>
        { return user.username === payload.username; }).map(user =>{
          return {username: user.username
          };});
        if( verifySender !== null ){
          let extracted = verifySender[0];
          // create the room,
          //   put both players in it
          //   remove from lobby
          // insert into current users playing
          const newRoom = new Room(sender, ws);
          // track the room in the map
          rooms.set(newRoom.id, newRoom);
          ws.roomId = newRoom.id;
          sender.roomId = newRoom.id;
          usersPlaying.push(sender);
          usersPlaying.push(ws);
          // remove both players from lobby
          users = users.filter( user => user.username !== ws.username && user.username !== verifySender[0].username);

        } else {
          ws.send(
            JSON.stringify({
              OP: 'ERROR',
              message: 'sender is not found or has disconnected'
            })
            );
        }
        break;
        case 'REPLAY':

        let foundPartner = usersPlaying.find( user => {
          return payload.invite.roomId == user.roomId && user.username !== payload.invite.username; });
        if( foundPartner !== undefined ){
          foundPartner.send(
            JSON.stringify({
              OP: 'RECEIVE_REPLAY_INVITE',
              sender: ws.username
            })
            );
        } else {
          ws.send(
            JSON.stringify({
              OP: 'ERROR',
              message: 'username is not found or has disconnected'
            })
            );
        }
        break;
        case 'NEW_GAME':
        const partner = usersPlaying.find( user => user.username === payload.username );
        var verifyPartner = usersPlaying.filter( user =>
          { return user.username === payload.username; }).map(user =>{
            return {username: user.username
            };});
          if( verifyPartner !== null ){

            const newRoom = new Room(partner, ws);
            rooms.set(newRoom.id, newRoom);
            usersPlaying = usersPlaying.filter( user => user.username !== ws.username && user.username !== verifyPartner[0].username);
            ws.roomId = newRoom.id;
            partner.roomId = newRoom.id;
            usersPlaying.push(partner);
            usersPlaying.push(ws);

          } else {
            ws.send(
              JSON.stringify({
                OP: 'ERROR',
                message: 'sender is not found or has disconnected'
              })
              );
          }
          break;
          case 'DECLINE_INVITE':
          const declinedSender = users.find( user => user.username = payload.username );
          if( declinedSender !== null ){
            declinedSender.send(
              JSON.stringify({
                OP: 'INVITE_DECLINED',
                username: ws.username
              })
              );
          } else {
            ws.send(
              JSON.stringify({
                OP: 'ERROR',
                message: 'sender is not found or has disconnected'
              })
              );
          }
          break;
        }
      });

ws.send(
  JSON.stringify({
    OP: 'SUCCESSFUL_CONNECTION',
    userId
  })
  );
});


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use('/api', apiRoutes);*/

server.listen(PORT,'0.0.0.0', ()=> {
  db.sequelize.sync(/*{force: true}*/);
  console.log(`listening on ${PORT}`);
});

function stringIntoThirds(string){
  splitString = string.split(' ');
  switch(splitString.length){
    case(1):
    stringArray.push(splitString);
    return stringArray;
    case(2):
    stringArray.push(splitString[0]);
    stringArray.push(splitString[1]);
    return stringArray;
    default:
    dividend = splitString.length/3;
    dividendCache = dividend;
    for (let i = 0; i < splitString.length; i+=dividendCache){
      let thirds = splitString.slice(i, dividend);
      stringArray.push(thirds.join(' '));
      dividend+=dividendCache;
    }
    return stringArray;
  }
}

function recurseThroughDb(trig, con, room){
  if (markovArray.indexOf('#') > -1){
    let markovSentence = markovArray.join(' ');
    console.log('THIS IS THE SENTENCE', markovSentence);
    return room.broadcast('BROADCAST_MESSAGE', { message: markovSentence });
  }
  return Ngrams.findOne({ where: { trigger: trig, context: con }, attributes: ['word']}).then(nextWord => {
    if (nextWord){
      markovArray.push(nextWord.word);
      recurseThroughDb(nextWord.word, con, room);
    }else{
      markovArray.push('#');
    }
  });
}



/*i hope this works
#
ben kwok is way too advanced for me
#
i hear you man
yeah he is super advanced
#
i hear that
*/