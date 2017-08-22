const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/text', (req, res)=> {
  res.json({
    "in-queue": [
    {
      "_id": 1,
      "title": "Make Better Styles",
      "priority": "medium",
      "status": "in-queue",
      "createdBy": "Ben",
      "assignedTo": "Merlin"
      }
  ]
})
})

app.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`);
})