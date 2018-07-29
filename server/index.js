const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Fortnite = require("fortnite-api");
const config = require("./config.js")
app.use(bodyParser());
app.use(express.static(`${__dirname}/../client/dist`));

let FNconn = new Fortnite([
  config.EMAIL, config.PWD, config.TOKEN_LAUNCHER, config.TOKEN_CLIENT
], {debug: false});

app.get('/stats', (req, res) => {
  FNconn
    .login()
    .then(() => {
      FNconn
        .getStatsBR(req.query.gamer, "pc", "weekly")
        .then(leaderboard => {
          res.send(leaderboard);
        })
        .catch(err => {
          console.log(err);
          res.send("NOT FOUND");
        });
    });
});

let port = process.env.PORT || 3000;
//creates server connection
app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
});
