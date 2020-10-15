const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto');
app.use(bodyParser.json());

const commentsByPostId = {};

const port = 5000;

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id]);
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const {content} = req.body;

    if (!content) {
        res.status(400).send(`Content shouldn't be empty!`)
    }

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
})

app.listen(4001, ()=> console.log(`Comments service started on port ${port}!`));