const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Fortnite = require("fortnite-api");
const config = require("./config.js");
const knex = require("../db/index.js");
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

app.post('/db', (req, res) => {
  let weight = 0;
  knex.select('*').from('mapTwitchToIngame')
  .where({twitchID: req.body.gamer, ingameID: req.body.query}).then((results)=>{
    if(results.length > 0){
      knex('mapTwitchToIngame').where({twitchID: req.body.gamer, ingameID: req.body.query}).update({weight: (results[0].weight + 1)})
      .then();
    }else{
      knex('mapTwitchToIngame').insert({twitchID: req.body.gamer, ingameID: req.body.query, weight: weight})
      .then();
    }
  });
  res.end();
});

let port = process.env.PORT || 3000;
//creates server connection
app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
});
