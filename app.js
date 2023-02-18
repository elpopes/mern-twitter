const express = require("express");

const app = express();

const logTime = (req, res, next) => {
  console.log("Current time: ", new Date().toISOString());
  next();
};

app.get("/", logTime, (req, res) => {
  res.send("Hello World! from app");
});

app.get(`/goodbye/until/forever`, (req, res) => {
  res.send("Bye forever");
});

app.get("/goodbye/until/:time", (req, res) => {
  res.send(`See you at ${req.params.time}.`);
});

app.get(`/goodbye/*`, (req, res) => {
  res.send(`laters!`);
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
