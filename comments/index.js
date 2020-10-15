const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto');
app.use(bodyParser.json());

const commentsByPostId = {};

const port = 5000;

app.get('/posts/:id/comments', (req, res) => {

})

app.post('/posts/:id/comments', (req, res) => {

})

app.listen(4001, ()=> console.log(`Comments service started on port ${port}!`));