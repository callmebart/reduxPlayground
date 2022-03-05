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

let users = [
    { id: '0', name: 'Bartosz Batosiewicz' },
    { id: '1', name: 'Jan Kowalski' },
    { id: '2', name: 'Emily Rozmarynsky' },
]


var notifications = [
    {
        id:0,
        name: 'New Post Added',
        date: new Date(),
        user:'1',
    }
]
app.post("/getUsers", function (req, res) {
    console.log("users req:",users)
    res.send(JSON.stringify(users));
})


app.post("/getPosts", function (req, res) {
    console.log("posts req:",posts)
    res.send(JSON.stringify(posts));
})

app.post("/getPost",function(req,res){
    const postId = req.body.postId;
    const selectedPost = posts.find(post=>post.id===postId)
    console.log("selectedPost:",selectedPost)
    res.send(JSON.stringify(selectedPost))
})

app.post("/getNotifications", function (req, res) {
    console.log(notifications)
    res.send(JSON.stringify(notifications));
})

app.post("/addPost", function(req, res) {
    var data = req.body;
    posts.push(data)
    //sending posts = whole arry passed 
    //sending data = only one post 
    res.send(JSON.stringify(data));
  });

  app.post("/addPostByMutation", function(req, res) {
    var data = req.body;
    console.log(data)
    posts.push(data)
    res.send(JSON.stringify(data));
  });

  app.post("/editPostByMutation", function(req, res) {
    var data = req.body
    const postToEdit = posts.find(post=>post.id===data.id)
    postToEdit.name = data.name
    postToEdit.content = data.content
    console.log("afterUpdate:",posts)
    res.send(JSON.stringify(postToEdit));
  });


  app.post("/addNotification", function(req, res) {
    var data = req.body;
    notifications.push(data)
    //sending posts = whole arry passed 
    //sending data = only one post 
    res.send(JSON.stringify(data));
  });


app.get("/", function (req, res) {
    //console.log(req.body)
    res.send("GET")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})