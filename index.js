const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// to change method to patch, put, delete
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "mr_sherry",
    title: "Skills Set",
    content: "I love learning new skills",
  },
  {
    id: uuidv4(),
    username: "furqan",
    title: "Color Box",
    content: "Printing new colors",
  },
  {
    id: uuidv4(),
    username: "google",
    title: "Inspiration",
    content: "We are the best",
  },
  {
    id: uuidv4(),
    username: "brain_quest",
    title: "Motivation",
    content: "Boosting mind is good for health",
  },
];

// Display All Post
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// Display Post Form
app.get("/posts/create", (req, res) => {
  res.render("create_post", { posts });
});

// Submit Post
app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, title, content } = req.body;
  posts.push({ id, username, title, content });
  // redirect to post
  res.redirect("/posts");
});

// Display Single Post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("show_post", { post });
  } else {
    res.render("error");
  }
});

// Display Single Post For Update
app.get("/posts/edit/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("edit_post", { post });
  } else {
    res.render("error");
  }
});

// Update Post
// app.post("/posts/update/:id", (req, res) => {
//   let { username, title, content } = req.body;
//   let { id } = req.params;
//   let post = posts.find((p) => id === p.id);
//   if (post) {
//     post.username = username;
//     post.title = title;
//     post.content = content;
//     res.redirect("/posts");
//   } else {
//     res.render("error");
//   }
// });

// Update Post Using Patch Method
app.patch("/posts/:id", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    post.title = title;
    post.content = content;
    res.redirect("/posts");
  } else {
    res.render("error");
  }
});

// Delete Post
// app.get("/posts/delete/:id", (req, res) => {
//   let { id } = req.params;
//   let post = posts.find((p) => id === p.id);
//   if (post) {
//     posts = posts.filter((p) => id !== p.id);
//     res.redirect("/posts");
//   } else {
//     res.render("error");
//   }
// });

// Delete Post Using DELETE Method
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
  } else {
    res.render("error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
