const Twitter = require("twitter");
require("dotenv").config();

const Tweet = new Twitter({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_KEY_SECRET,
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
})

function action(event){
  const {retweeted_status, id_str, screen_name, is_quote_status} = event;
  const {name} = event.user;

  if(!retweeted_status && !is_quote_status){
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Houve um erro com o retweet: " + erro)
      }else {
        console.log("Retweet: ", `https://twitter.com/${name}/status/${id_str}`)
      }
    })
    Tweet.post('favorites/create', {id: id_str}, erro => {
      if(erro){
        return console.log("Houve um erro com o like: " + erro) 
      }else {
        return console.log("Tweet liked. URL: " + `https:twitter.com/${screen_name}/status/${id_str}`) 
      }
    }) 
  }else {
       return 
     }
}

var stream = Tweet.stream("statuses/filter", {track: "BBMP"});
stream.on("data", action);
stream.on("error", erro => console.log("Erro: "+ erro));
