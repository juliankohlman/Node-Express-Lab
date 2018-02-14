const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let postId = 0
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  // res.send(posts);
  if (req.query.term) {
    res.json({ post : posts.filter(post => post.title.includes(term) || post.content.includes(term))})
  } else {
    res.json({posts});
  }
})

server.post('/posts', (req, res) => {
  // validate req.body -> /title/contents if any of them are blank => ERROR
  if (!req.body.title || !req.body.contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'Please provide both a title and content in the body'})
    return;
  }
  req.body['id'] = postId
  postId++;
  console.log(req.body)
  posts.push(req.body)
  res.json(req.body.id)
  // if id doesn't belong to a post => ERROR

  // update the posts object and respond with the updated posts object with res.json({posts})
    // posts.push({})
})

module.exports = { posts, server };
