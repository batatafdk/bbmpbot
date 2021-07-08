const Twitter = require("twitter");
require("dotenv").config();

const Tweet = new Twitter({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_KEY_SECRET,
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
})

const action = (event) => {
  const { retweeted_status, id_str, in_reply_to_screen_name, is_quote_status } = event;
  const { screen_name } = event.user;

  const tweeted = (err) => {
    if (err) {
      console.log("Algo deu muito errado", err.message);
    } else {
      console.log("Olha só, me parece que algo deu certo...");
    }
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (!retweeted_status && !is_quote_status
    && screen_name !== "CowinBangalore"
    && screen_name !== "cowinblore1844"
    && screen_name !== "terminator0925"
  ) {

    Tweet.post("favorites/create", { id: id_str }, tweeted)
    if (in_reply_to_screen_name === "BbmpBot") {
      const randomNumber = getRandomInt(1,5)
      console.log("CHEGOUUUUUUUUU")
      if (randomNumber === 1) {
        Tweet.post("statuses/update", { status: `@${screen_name}  Bora Bahêêaa Minha P**** 🔵🔴!!`, in_reply_to_status_id: id_str }, tweeted);
      } else if (randomNumber === 2) {
        Tweet.post("statuses/update", { status: `@${screen_name}  Pula sai do chão a maior do nordestão 🔵🔴!!`, in_reply_to_status_id: id_str }, tweeted);
      } else if (randomNumber === 3) {
        Tweet.post("statuses/update", { status: `@${screen_name}  59 é nosso 88 também 🔵🔴!!`, in_reply_to_status_id: id_str }, tweeted);
      } else if (randomNumber === 4) {
        Tweet.post("statuses/update", { status: `@${screen_name}  Bahêêa o clube do povo 🔵🔴!!`, in_reply_to_status_id: id_str }, tweeted);
      }
    }
  } else {
    return
  }
}

var stream = Tweet.stream("statuses/filter", { track: "BBMP" });
stream.on("data", action);
stream.on("error", erro => console.log("Erro barril: " + erro));
