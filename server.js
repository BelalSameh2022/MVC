import express from "express";
// import path from "path";
import dbConnection from "./database/connection.js";
import userModel from "./database/models/user.model.js";
import { capitalize } from "./utils/capitalize.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //   res.status(200).sendFile(path.join(path.resolve(), "index.html"));
  const users = await userModel.find({});
  res.status(200).render("index.ejs", { users });
});

app.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  await userModel.create({ name: capitalize(name), email, password });
  res.redirect("/");
});

app.post("/update", async (req, res) => {
  const { id, name, email, password } = req.body;
  await userModel.findByIdAndUpdate(id, {
    name: capitalize(name),
    email,
    password,
  });
  res.redirect("/");
});

app.get("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  await userModel.deleteOne({ _id: userId });
  res.redirect("/");
});

dbConnection();

app.use("*", (req, res) =>
  res.status(404).json({ message: `${req.originalUrl} not found` })
);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
