const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios')
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4002
const posts = {};

const handleEvent = (type,data) => {

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type == 'CommentUpdated') {
    const {id, postId, status, content} = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id===id)
    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log(posts);

  handleEvent(type,data)

  res.send({});
});

app.listen(port, async() => {
  console.log(`Query service listening on ${port}`);
  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log(`Processing event: ${event.type}`) 
    const {type, data} = event
    handleEvent(type, data)
  }
});
