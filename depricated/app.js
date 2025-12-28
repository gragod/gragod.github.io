/**
 * Graham Godfrey
 * This Node.JS file impliments the server-side functionality for my fun stuff
 * page of my website. Allowing number guesser and the dictionary to be used.
 */
'use strict';

const express = require('express');
const app = express();
let newWord = "";
let randomNumber = Math.floor(Math.random() * 1001);

let dictionary = {
  graham: "A super cool guy",
  cse154: "the computer science class I am in",
  thehobbit: "the first book with hobbits"
};

/**
 * sees if the user's random number guess is correct
 */
app.get('/number', (req, res) => {
  let guess = req.query.guess;
  if (guess + "" === Math.floor(guess) + "") {
    numberGuesserHelper(guess, res);
  } else {
    res.type('text').status(400)
      .send("Non integer value passed in");
  }
});

/**
 * helps determine if a random number guess is correct or not
 * @param {number} guess - the number the user guessed
 * @param {object} res - the response object that will send to the user
 */
function numberGuesserHelper(guess, res) {
  if (guess + "" === randomNumber + "") {
    res.type('text').send("Correct!");
  } else {
    if (guess <= randomNumber) {
      res.type('text').send("Wrong, too small!");
    } else {
      res.type('text').send("Wrong, too big!");
    }
  }
}

/**
 * checks if a user's word is in the dictionary or not
 */
app.get('/definition', (req, res) => {
  let word = req.query.word;
  word = word.replace(/\s+/g, '-');
  if (dictionary[word]) {
    res.json({"1": dictionary[word]});
  } else {
    newWord = word;
    res.json({"0": "Word not in dictionary"});
  }
});

/**
 * adds a news user word to the dictionary with a defenition
 */
app.get('/new-definition', (req, res) => {
  let definition = req.query.definition;
  definition.replace(/\s+/g, '-');
  dictionary[newWord] = definition;
  res.type('text').send("success");
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);