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
  res.send({ title: "Home" });
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

app.get("/throw-error", (req, res) => {
  throw new Error("this is from inside the Error method invocation");
});

app.use((err, req, res, next) => {
  console.error(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send("this is inside res.send in the app.use method");
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
