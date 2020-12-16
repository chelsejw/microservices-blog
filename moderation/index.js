const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4003


app.post(`/events`, (req,res)=>{

    const {type, data} = req.body;

    if (type=="CommentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        axios.post("http://event-bus-srv:4005/events", {
          type: "CommentModerated",
          data: {
            id: data.id,
            postId: data.postId,
            status,
            content: data.content,
          },
        });

        res.send({})
    }

});

app.listen(port, ()=> console.log(`Moderation service is running on ${port}`))