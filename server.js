var express = require("express");


var app = express()

app.use(express.json());

const PORT = 3000;

var posts = [
    {
        id: 1,
        name: 'First Post',
        content: 'Hello its me',
        date: new Date(),
        user:'1',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    },
    {
        id: 2, 
        name: 'Second Post',
        content: 'bla bla bla bla bla bla bla',
        date: new Date(),
        user:'2',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    }

];


app.post("/getPosts", function (req, res) {
    //console.log(posts)
    res.send(JSON.stringify(posts));
})

app.post("/addPost", function(req, res) {
    var data = req.body;
    posts.push(data)
    res.send(JSON.stringify(posts));
  });


app.get("/", function (req, res) {
    //console.log(req.body)
    res.send("GET")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})