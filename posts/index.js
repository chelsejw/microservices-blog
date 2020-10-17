const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000
const axios = require('axios');
const posts = {};

app.post('/events', (req, res) => {
  console.log(`Received event`, req.body.type)
  console.log(`Event body`, req.body)
  res.send(req.body)
})


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {id, title}
  });

  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
