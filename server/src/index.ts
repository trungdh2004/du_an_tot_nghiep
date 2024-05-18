import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("hihi");
});

app.listen(4000, () => {
  console.log("listening listening on 4000");
});
