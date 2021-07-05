const Twitter = require("twitter");
require("dotenv").config();

const Tweet = new Twitter({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_KEY_SECRET,
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
})

const action = (event) => {
  const { retweeted_status, id_str } = event;
  const { name } = event.user;

  const tweeted = (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Olha só, me parece que algo deu certo...");
    }
  }

  if (!retweeted_status && name !== "CowinBangalore") {
    Tweet.post("favorites/create", { id: id_str }, tweeted)
    Tweet.post("statuses/update", { status: "Bora Bahêa ?!", in_reply_to_status_id: id_str }, tweeted);
  } else {
    return
  }
}

var stream = Tweet.stream("statuses/filter", { track: "BBMP" });
stream.on("data", action);
stream.on("error", erro => console.log("Erro barril: " + erro));
