const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://jiteshgopale26:utVLK9C0YKK8YWU6@cluster0.uxlvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error: ", err));
};

module.exports = connectDB;
