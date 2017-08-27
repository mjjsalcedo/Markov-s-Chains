/*jshint esversion:6*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
let db = require('../models');
let ngrams = db.Ngrams;
/*const apiRoutes = require('./api');*/

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = [];
const rooms = new Map();
//rooms.set(new_room_id, new Room(new_room_id)) //when you accept an invite set the new room


let messageChain = { trigger: [], response: []};
let messageCache = [];
let modifiedMessage = '';
let tuples = [];

wss.on('connection', function connection(ws, req) {
  console.log("connected");
  let userId = ws._ultron.id;
  ws.userId = userId;

  users.push(ws);
  ws.username = null;

   ws.on('close', function (){
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
    console.log('before payload',payload)

    switch (payload.OP) {
      case 'CHAT':
      switch(true){
      case (messageChain.trigger.length === 0):
      messageChain.trigger.push(payload.message);
      break;
      case (messageChain.trigger.length > 0 && messageChain.trigger[0].username != payload.message.username):
      messageChain.response.push(payload.message);
      modifiedMessage = payload.message.message
      .replace(/[.,\/#!$%@\^*\*;:{}=\-_`~()]/g,"")
      .replace(/\s{2,}/g,"").toLowerCase();
      messageCache.push(modifiedMessage);
      break;
      case (messageChain.trigger[0].username === payload.message.username && messageChain.response.length  === 0):
      messageChain.trigger.push(payload.message);
      break;
      case (messageChain.trigger[0].username === payload.message.username):
      //break up message chain then query DB
      console.log(messageCache);
      let cache = messageCache.join(' # ').split(' ');
      cache.reduce((trigger, response) => {
        let trigRes = [trigger, response];
        tuples.push(trigRes);
        console.log(tuples);
        return response;
      });
      messageChain.trigger = messageChain.response;
      messageChain.response = [payload.message];
      modifiedMessage = payload.message.message
      .replace(/[.,\/#!$%\^*\*;:{}=\-_`~()]/g,"")
      .replace(/\s{2,}/g,"").toLowerCase();
      messageCache = [modifiedMessage];
      tuples = [];
      break;
    }
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CHAT',
            message: payload.message.message,
            username: payload.message.username,
            id: payload.message.id
          })
          );
      });
      break;
      case 'CONNECTED':
      console.log('payload.message.username', payload.message.username)
      ws.username = payload.message.username;
      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username
          }))
      })
      console.log('a user has connected');
      break;
      case 'BROADCAST_USERNAME':
      console.log('payload.message.username', payload.message)

      users.forEach(user => {
        user.send(
          JSON.stringify({
            OP: 'CREATED_USER',
            username: payload.message.username,
            id: payload.message.id
          }))
      })
      console.log('a user has connected');
      break;
      case 'SEND_INVITE':
      console.log('made it to invite')

      const invitedUser = users.find( user => user.username === payload.invite.username );
        if( invitedUser !== null ){
          // send an OP to that user
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
          //create user and send to room
          const sender = users.find( user => user.username === payload.username );
        if( sender !== null ){
          // create the room,
          //   put both players in it
          //   remove from lobby
          const newRoom = new Room(sender, ws);
          // track the room in the map
          rooms.set(newRoom.id, newRoom);

          // remove both players from lobby
          users = users.filter( user => user.username !== ws.username && user.username !== sender.username );

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
    db.sequelize.sync();
  console.log(`listening on ${PORT}`);
});