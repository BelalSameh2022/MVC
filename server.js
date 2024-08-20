import express from "express";
import dbConnection from "./database/connection.js";
import userModel from "./database/models/user.model.js";
import { capitalize } from "./utils/capitalize.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Display users data route
app.get("/", async (req, res) => {
  const users = await userModel.find({});
  res.status(200).render("index.ejs", { users });
});

// Add new user route
app.post("/add", async (req, res) => {
  const { name, email, password } = req.body;
  await userModel.create({ name: capitalize(name), email, password });
  res.redirect("/");
});

// Update user route
app.post("/update", async (req, res) => {
  const { id, name, email, password } = req.body;
  await userModel.findByIdAndUpdate(id, {
    name: capitalize(name),
    email,
    password,
  });
  res.redirect("/");
});

// Delete user route
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await userModel.deleteOne({ _id: id });
  res.redirect("/");
});

// Connect to database
dbConnection();

// Handle invalid routes
app.use("*", (req, res) =>
  res.status(404).json({ message: `${req.originalUrl} not found` })
);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
