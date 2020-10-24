const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4005
const events = [];
app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event)
  axios.post("http://localhost:4000/events", event) // Posts

  axios.post("http://localhost:4001/events", event) // Comments

  axios.post("http://localhost:4002/events", event) // Query

  axios.post("http://localhost:4003/events", event) // Moderation

  res.send({ status: "OK" });
});


app.get('/events', (req,res) => {
  res.send(events);
})

app.listen(port, () => {
  console.log(`Events bus listening on ${port}`);
});
