import express from "express";

const app = express();

app.get("/check", (req, res) => {
  res.json({ message: "Server ok!" });
});

app.listen(8080, () => {
  console.log("Server up and running on port 8080!");
});
