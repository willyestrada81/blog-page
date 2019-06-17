const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = [];

const aboutContent = "";
const contactContent = "";
    
 
app.get("/", (req, res) => {
  res.render("home", { post: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");    
});

app.post("/compose", (req, res) => {
  const post = {
    postTitle: req.body.postTitle,
    postContent: req.body.postContent
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:post", (req, res) => {
  let parameter = _.lowerCase(req.params.post);  
  
  posts.forEach(function(post) {
      let storedPostTitles = _.lowerCase(post.postTitle);
    if (parameter === storedPostTitles) {
      res.render("post", { 
          postTitle: post.postTitle,
          postContent: post.postContent
        });
    } 
  });

});


app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
