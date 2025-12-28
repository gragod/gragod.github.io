/**
 * Graham Godfrey
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * waits to run the javascript until the page has fully loaded, calling the other functions
   */
  function init() {
    builder();
  }

  function builder() {
    let htmlContentVariable;

    fetch('otherfile.html') // Find Files for here
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // Converts the response body to a text string
        })
        .then(htmlString => {
            // The entire HTML file content is now in the htmlString variable
            htmlContentVariable = htmlString;
            console.log(htmlContentVariable);

            // Optional: You can parse the string into a DOM element if needed
            // const parser = new DOMParser();
            // const doc = parser.parseFromString(htmlContentVariable, 'text/html');
            // const specificElementText = doc.querySelector('#target-element-id').textContent;
            // console.log('Specific element text:', specificElementText);
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

  }

  function pageSetup() {
    document.getElementById('homeButton').addEventListener('click', function() {
      window.location.href = "index.html";
    });
    document.getElementById('blogButton').addEventListener('click', function() {
      window.location.href = "blog.html";
    });
    let currentPage = window.location.pathname.split("/").pop();
    //Want to have posts relevent to current location pulled in as list??
    //Make home page bring in all posts sorted by time??
    //inside #posts > ul make a <li> <hr> <header> <h2> TITLE </h2> </header> <p> BODY </p> </li>
    if (currentPage != "index.html") {
    }
  }

  /**
   * switches the page's view between the blog and fun stuff page
   */
  function funStuffView() {
    document.getElementById("blog-background").classList.toggle("hidden");
    document.getElementById("guesser-background").classList.toggle("hidden");
  }

  /**
   * lets the user guess what the random number is on the server side
   */
  function numberGuesser() {
    document.getElementById('error-fun-page').classList.add("hidden");
    let guess = document.querySelector("#number-guesser > input").value;
    fetch("/number?guess=" + guess)
      .then(statusCheck)
      .then(res => res.text())
      .then(function(response) {document.getElementById('guess-status').textContent = response;})
      .catch(handleGetError);
  }

  /**
   * sees if a word is contained in the dictionary
   */
  function getWord() {
    let word = document.querySelector("#name-guesser > input").value;
    fetch("/definition?word=" + word)
      .then(statusCheck)
      .then(res => res.json())
      .then(getWordHelper)
      .catch(handleGetError);
  }

  /**
   * shows word defenition or shows that word is not in the dictionary
   * @param {object} response - the object with the word status
   */
  function getWordHelper(response) {
    let responseCode = Object.keys(response);
    let definition = document.getElementById('definition');
    definition.textContent = response[responseCode[0]];
    if (responseCode[0] === "0") {
      document.getElementById('new-word').classList.toggle('hidden');
    }
  }

  /**
   * adds the users new word defenition to the dictionary
   */
  function newWord() {
    let definition = document.querySelector("#new-word > input").value;
    fetch("/new-definition?definition=" + definition)
      .then(statusCheck)
      .then(document.getElementById('definition').textContent = "New definition set!")
      .catch(handleGetError);
    document.getElementById('new-word').classList.toggle('hidden');
  }

  /**
   * tells user when their is an error getting information
   * @param {string} message - What went wrong with the server request
   */
  function handleGetError(message) {
    let error = document.getElementById('error-fun-page');
    error.textContent = message;
    error.classList.remove("hidden");
  }

  /**
   * toggles visibility of memes in blog posts
   */
  function memeToggle() {
    let memes = document.querySelectorAll(".memeMode");
    for (let i = 0; i < memes.length; i++) {
      memes[i].classList.toggle("hidden");
    }
  }

  /**
   * requests meme array from the API to be used in Meme Mode
   */
  function memeMode() {
    fetch(MEME_API_URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(memeDisplay)
      .catch(handleError);
  }

  /**
   * shows error message to user if the meme array was not returned
   * from the API
   */
  function handleError() {
    let msg = document.getElementById("error");
    msg.classList.toggle("hidden");
  }

  /**
   * adds an image from a random sequence of memes from the API
   * to the header of each blog post
   * @param {object} memeObj - the javascript API object containing the memes
   */
  function memeDisplay(memeObj) {
    let memeArray = memeObj.data.memes;
    let postHeaders = document.querySelectorAll("li > header");
    let randomIndex = random(101 - postHeaders.length);
    for (let i = 0; i < postHeaders.length; i++) {
      let img = document.createElement("img");
      img.src = memeArray[i + randomIndex].url;
      img.alt = memeArray[i + randomIndex].name;
      img.classList.add("memeMode");
      img.classList.add("hidden");
      postHeaders[i].appendChild(img);
    }
  }

  /**
   * checks that the response object from an API is good
   * @param {promise} response - a response object
   * @returns {promise} response promise object
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * changes site a background
   */
  function changeImage() {
    let backGround = document.getElementById("blog-background");
    backGround.classList.toggle("picture");
  }

  /**
   * gives site text a purple and gold theme
   */
  function goDawgs() {
    let text = document.querySelectorAll("p");
    let heads = document.querySelectorAll("h2");
    let lists = document.querySelectorAll("li li");
    for (let i = 0; i < lists.length; i++) {
      lists[i].classList.toggle("purple");
    }
    for (let i = 0; i < text.length; i++) {
      text[i].classList.toggle("purple");
    }
    for (let i = 0; i < heads.length; i++) {
      heads[i].classList.toggle("gold");
    }
    document.querySelector("h1").classList.toggle("gold");
  }

  /**
   * randomizes a fun message in the site heading
   * make this a legit marquees element
   */
  function headingMessage() {
    let lMscript = document.createElement('script');
    lMscript.src = "https://cdn.jsdelivr.net/gh/olivernorred/legit-marquees/legit-marquees.js";
    let element = document.getElementById("subhead");
    let message = ["test text tech test",
    "I've been known to walk away in the middle of...", "Doing less with more!",
    "Ya like jazz?", "You're my favorite deputy", "TERRAIN - TERRAIN - PULL UP - PULL UP",
    "chess is fun!", "Kept you waiting, huh?", "Ohana means family", "keepin it cool and comfortable"];
    element.setAttribute('content', message[random(message.length)]);
    document.getElementById("home").appendChild(lMscript);
  }

  /**
   * randomly picks a blog post to be a featured post
   */
  function featuredPost() {
    let length = document.querySelectorAll("ul > li").length;
    let list = document.querySelector("ul");
    list.replaceChild(list.children[random(length - 1) + 1], list.children[0]);
    let head = document.querySelector("li > header > h2");
    head.innerText = "Featured Post! " + head.innerText;
  }

  /**
   * chooses a random integer
   * @param {number} max - the non-inclusive maximum random value
   * @returns {number} a random integer from [0, max - 1]
   */
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function backGroundColorizer() {
    let num1 = random(255);
    let num1inc = 1;
    let num2 = random(255);
    let num2inc = 1;
    let num3 = random(255);
    let num3inc = 1;
    let element = document.getElementById('leftgrad');
    element.style.backgroundImage = "linear-gradient(to left, white , rgb(" + num1 + "," + num3 + "," + num2 + ")";
    let element2 = document.getElementById('rightgrad');
    element2.style.backgroundImage = "linear-gradient(to right, white , rgb(" + num3 + "," + num2 + "," + num1 + ")";
    function colorizerHelper() {
      if(num1 == 255) {
        num1inc = -1;
      }
      if(num1 == 0) {
        num1inc = 1;
      }
      num1 = num1 + num1inc;
      if(num2 == 255) {
        num2inc = -1;
      }
      if(num2 == 0) {
        num2inc = 1;
      }
      num2 = num2 + num2inc;
      if(num3 == 255) {
        num3inc = -1;
      }
      if(num3 == 0) {
        num3inc = 1;
      }
      num3 = num3 + num3inc;
      element.style.backgroundImage = "linear-gradient(to left, white , rgb(" + num1 + "," + num3 + "," + num2 + ")";
      element2.style.backgroundImage = "linear-gradient(to right, white , rgb(" + num3 + "," + num2 + "," + num1 + ")";
    }

    let interval = setInterval(colorizerHelper, 50);
  };

})();