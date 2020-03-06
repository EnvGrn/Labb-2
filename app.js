const express = require('express');
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const routes = require('./routes');

let store = {
    posts: [{
        name: 'Top 10 ES6 Features every Web Developer must know',
        url: 'https://webapplog.com/es6',
        text: 'This essay will give you a quick introduction to ES6. If you do not know what is ES6, it is a new JavaScript implementation.',
        comments: [
            {text: 'Cruel... var {house, mouse} = No type optimization at all'},
            {text: 'I think youâ€™re undervaluing the benefit of let and const.'},
            {text: '(p1,p2)=>{} , I understand this, thank you!'}
        ]
    }]
}

const app = express();
const router = express.Router();

app.use('/', router);
app.use(bodyParser.json({
    extended: false
}));
app.use(logger("dev"));
app.use(errorhandler());
app.use((req, res, next) => {
    req.store = store;
    next();
});

app.get('/', function(req, res) {
    res.sendStatus(200).send("OK");
});

app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPost);
app.put('/posts/:postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.removePost);

app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts/:postId/comments', routes.comments.addComment);
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment);

app.listen(4000, () => console.log("Ready"));
