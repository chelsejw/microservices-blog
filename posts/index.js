const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 4000

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch {
    console.log(`Couldn't post to event bus.`)
  }


  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(port, () => {
  console.log(`Docker change for updating image for deployment v2`)
  console.log("Listening on " + port);
});
