import { connect } from "mongoose";

const dbConnection = () => {
  return connect("mongodb://127.0.0.1:27017/mvc")
    .then(() => console.log("Database connected successfully..."))
    .catch((err) => console.log(err.message));
};

export default dbConnection;
