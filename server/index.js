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
let markovArray = [];
let stringArray = [];
let modifiedTrigger = '';
let modifiedMessage = '';
let dividendCache;
let dividend;

wss.on('connection', function connection(ws, req) {
  console.log("connected");
  let userId = ws._ultron.id;
  ws.userId = userId;

  let username = null;
  ws.username = null;
  users.push(ws);

  ws.on('close', function (){
    console.log(`${ws.username} has disconnected`);

    let usersWaiting = users.find(user => user.username === ws.username);
    let usersInGame = usersPlaying.find(user => user.username === ws.username);

    if (usersWaiting !== undefined) {
      users.splice( users.indexOf(ws), 1 );
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'USER_DISCONNECTED', // all users not in room
            username: ws.username // could be undefined
          })
          );
      });
    }

    if (usersInGame !== undefined) {
      let partner = usersPlaying.find(user => {
        return user.roomId === ws.roomId && user.username !== ws.username; });
      usersPlaying.splice( usersPlaying.indexOf(ws), 1 );
      partner.send(
        JSON.stringify({
            OP: 'USER_DISCONNECTED', // all users not in room
            username: ws.username // could be undefined
          })
        );
    }
  });

  ws.on('message', function incoming(message) {
    let payload = JSON.parse(message);
    switch (payload.OP) {
      case 'CHAT':
      modifiedMessage = removePunctuation(payload.message.message);
      stringArray = stringIntoThirds(modifiedMessage);
      let arrayPosOne = stringArray[0];
      let arrayPosTwo = stringArray[1];
      let arrayPosThree = stringArray[2];
      let room = rooms.get(parseInt(payload.message.roomId));

      let activePlayer = usersPlaying.find(user => {
        return user.username === payload.message.username && user.roomId === parseInt(payload.message.roomId);
      });
      let inactivePlayer = usersPlaying.find(user => {
        return user.username !== payload.message.username && user.roomId === parseInt(payload.message.roomId);
      });
      switch(true){
        case (messageChain.trigger.length === 0):
        messageChain.trigger.push(payload.message);
        triggerCache.push(modifiedMessage);
        recurseThroughDb(activePlayer, modifiedMessage, modifiedMessage, room);
        break;

        case (messageChain.trigger.length > 0 && messageChain.trigger[0].username != payload.message.username):
        messageChain.response.push(payload.message);
        messageCache.push(modifiedMessage);
        recurseThroughDb(activePlayer,modifiedMessage, modifiedMessage, room);
        break;

        case (messageChain.trigger[0].username === payload.message.username && messageChain.response.length  === 0):
        messageChain.trigger.push(payload.message);
        triggerCache.push(modifiedMessage);
        recurseThroughDb(activePlayer,modifiedMessage, modifiedMessage, room);
        break;

        case (messageChain.trigger[0].username === payload.message.username):
        recurseThroughDb(activePlayer, modifiedMessage, modifiedMessage, room);
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
          room.broadcast('BROADCAST_MESSAGE', {message: modifiedMessage});
          messageChain.trigger = messageChain.response;
          messageChain.response = [payload.message];
          triggerCache = messageCache;
          messageCache = [modifiedMessage];
        });
      }

      room.broadcast('BROADCAST_MESSAGE', {message: modifiedMessage});
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
      roomGraphic.broadcast('BROADCAST_SCORE', {score: payload.score.score, isVisible: payload.score.isVisible});
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
          users = users.filter( user => user.username !== ws.username && user.username !== verifySender[0].username)
          //update existing players in lobby the available people

          let existingUsernames = users.map( user => {return {username: user.username}})
          console.log('list of usernames', existingUsernames);
          users.forEach(user => {
          user.send(
          JSON.stringify({
            OP: 'UPDATED_PLAYERS',
            username: existingUsernames
          }));
          });
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

server.listen(PORT,'0.0.0.0', ()=> {
  db.sequelize.sync(/*{force: true}*/);
  console.log(`listening on ${PORT}`);
});

function stringIntoThirds(string){
  splitString = string.split(' ');
  switch(splitString.length){
    case(1):
    stringArray.push(splitString);
    stringArray.push('#');
    stringArray.push('#');
    return stringArray;
    case(2):
    stringArray.push(splitString[0]);
    stringArray.push(splitString[1]);
    stringArray.push('#');
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

function recurseThroughDb(user, trig, con, room){
  console.log('this is the recursion');
  console.log(trig);
  if (markovArray.indexOf('#') > -1){
    let markovSentence = markovArray.join(' ');
    markovArray = [];
    stringArray = [];
    return sendMarkov(user, markovSentence);
  }
  return Ngrams.find({ where: {trigger: trig, context: con }, attributes: ['word']}).then(nextWord => {//orderby
    if (nextWord){
      markovArray.push(nextWord.word);
      recurseThroughDb(user, nextWord.word, con, room);
    }else{
      markovArray.push('#');
    }
  });
}

function removePunctuation(string){
  return string
  .replace(/[.,\/<>#+!$&@?%[\]^\|*\*/;:{}=\-_`'"~()]/g,"")
  .replace(/\s{2,}/g," ").toLowerCase();
}

function sendMarkov(user, message){
  console.log(user);
  console.log(message);
  user.send(
    JSON.stringify({
      OP: 'BROADCAST_MESSAGE',
      message: message
    }));
}


/*function recurseThroughDb(user, trig1, trig2, trig3, con, room){
  if (markovArray.indexOf('#') > -1){
    let markovSentence = markovArray.join(' ');
    markovArray = [];
    stringArray = [];
    return sendMarkov(user, markovSentence);
  }
  return Ngrams.findOne({ where: {trigger: {$or: [{$like: `${trig1}`}, {$like: `${trig2}`}, {$like: `${trig3}`}]}, context: con }, attributes: ['word']}).then(nextWord => {
    if (nextWord){
      markovArray.push(nextWord.word);
      recurseThroughDb(nextWord.word, nextWord.word, nextWord.word, con, room);
    }else{
      markovArray.push('#');
    }
  });
}*/
/*
recurseThroughDb(inactivePlayer, arrayPosOne, arrayPosTwo, arrayPosThree, modifiedMessage, room);*/