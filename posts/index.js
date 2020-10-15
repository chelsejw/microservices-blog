const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 4000;
const {randomBytes} = require('crypto');
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', (req, res)=> {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id]);
})

app.listen(port, ()=> console.log(`Post services started on port ${port}!`))