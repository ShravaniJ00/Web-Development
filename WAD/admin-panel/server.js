const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const User = require("./models/User");

const app = express();

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/adminPanelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home Route - Show All Users
app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("index", { users });
});

// New User Form
app.get("/users/new", (req, res) => {
  res.render("create");
});

// Create User
app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.redirect("/");
});

// Edit User Form
app.get("/users/:id/edit", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("edit", { user });
});

// Update User
app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
