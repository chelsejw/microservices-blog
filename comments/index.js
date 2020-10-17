const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
const port = process.env.PORT || 4001
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/events', (req, res) => {
  console.log(`Received event`, req.body.type)
  console.log(`Event body`, req.body)
  res.send(req.body)
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;


  axios.post('http://localhost:4005/events', {
    type: "CommentCreated", 
    data: {
      id: commentId, content, postId: req.params.id
    }
  })
  
  res.status(201).send(comments);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
