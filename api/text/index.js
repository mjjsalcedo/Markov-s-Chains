/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
let db = require('../../models');
let Ngrams = db.ngrams;
/*
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
});*/

router.post('/', (req,res)=>{
  Ngrams.findAll()
    .then((newResponse)=>{
      res.json(newResponse);
    });
});

/*router.put('/:name', (req,res)=>{
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