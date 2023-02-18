const express = require("express");

const app = express();

const logTime = (req, res, next) => {
  console.log("Current time: ", new Date().toISOString());
  next();
};

app.use(logTime);

const passOnMessage = (req, res, next) => {
  console.log("Passing on a message!");
  res.passedMessage = "Hello from passOnMessage!";
  next();
};

app.get("/", [logTime, passOnMessage], (req, res) => {
  console.log("Passed Message: ", res.passedMessage);
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

app.use((err, req, res, next) => {
  console.error(err);
  res.send("an error occurred!");
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
