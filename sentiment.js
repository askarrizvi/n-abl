const Sentiment = require('sentiment');
const Comment = require('./models/comment')

const sentiment = new Sentiment();
const result = sentiment.analyze('Cats are stupid.');
// const result2 = sentiment.analyze({ Comment });

console.log(result);