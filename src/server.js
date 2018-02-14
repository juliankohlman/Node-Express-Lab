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
  const term = req.query.term;
  console.log(term);
  if (req.query.term) {
    res.json({ post : posts.filter(post => post.title.includes(term) || post.contents.includes(term))})
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
})

server.put('/posts', (req, res) => {
  // if id doesn't belong to a post => ERROR
  // update the posts object and respond with the updated posts object with res.json({posts})
  // posts.push({})
  // console.log(Object.values(req.body))
  if (Object.values(req.body).includes('')) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide valid id, title, and contents'});
    return;
  }
  console.log(posts.filter(p => req.body.id === p.id).length)
  if (!posts.filter(p => req.body.id === p.id).length) {
    res.status(STATUS_USER_ERROR).json({ error: `The post ID ${req.body.id} does not exist`})
  }
  else {
    // modify the given id updating its title and contents respond with updated post obj with a
    // res.json
    updatedPosts = posts.map(p => req.body.id === p.id ? req.body : p);
    console.log(updatedPosts);
    res.json(updatedPosts.find(p => req.body.id === p.id));
    // res.json()
  }
  // res.send('PUT REQUEST')
})

module.exports = { posts, server };
