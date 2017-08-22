/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
let db = require('../../models');
let Questions = db.questions;
let Responses = db.responses;

router.get('/', (req,res)=>{
  Questions.findAll()
  .then( questions => {
    let allQuestions = questions.map(question => {
      return {
        id: question.id,
        text: question.text
      };
    });
    res.json(allQuestions);
  });
});

/*router.get('/:id', (req,res)=>{
  let topicId = parseInt(req.params.id);
  Topics.findById(topicId,
    {include: [{model: Messages, include :[{model: Users, attributes:['name']}],attributes:['body', 'createdAt']}]}
    )
  .then( topic => {
    let selectedPost = {
      id: topic.id,
      name: topic.name,
      users: topic.users,
      messages: topic.messages
    };
    res.json(selectedPost);
  });
});

router.post('/', (req,res)=>{
  let submittedInfo = req.body;
  Users.findOne({where: {name: submittedInfo.created_by}})
  .then((foundUser)=> {
    console.log('foundUser', foundUser.id);
    Topics.create({
      name: submittedInfo.name,
      created_by: foundUser.id
    }).then((newUser)=>{
      res.json(newUser);
    });
  });
});

router.put('/:name', (req,res)=>{
  Users.create({
    username: req.body.username,
    password:req.body.password
  }).then((newUser)=>{
    Users.findOne({
      where: {username: newUser.username }})
    .then((displayUser)=>{
      let newlyCreatedUser = {
        username: displayUser.username
      };
      res.json(newlyCreatedUser);
    });
  });
});
*/

module.exports = router;