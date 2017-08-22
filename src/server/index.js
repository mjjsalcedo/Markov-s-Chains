const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const apiRoutes = require('../../api');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db = require('../../models');

/*app.get('/api/text', (req, res)=> {
  res.json({
    "in-queue": [
    {
      "_text": "Make Better Styles"
      }
  ]
})
})*/

app.use('/api', apiRoutes);
app.use('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, ()=> {
  db.sequelize.sync(/*{force:true}*/);
  console.log(`listening on ${PORT}`);
})