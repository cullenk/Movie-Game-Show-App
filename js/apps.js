
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
var missed = 0;
const ul = document.querySelector('#phrase ul');
const reset = document.getElementsByClassName('btn-reset')[0];
const overlay = document.getElementById('overlay');



//Main screen disappears into the game after clicking "start game".

reset.addEventListener('click', () => {
  overlay.style.display = 'none';

// Game resets when user clicks on button after they win or lose
  missed = 0 // returns the missed guesses to 0

  // Reset phrase display board
    let oldPhrase = document.getElementById('phrase').getElementsByTagName('li'); // Select all of the li items in the phrase (the letters)
    while (oldPhrase.length > 0) {
        oldPhrase[0].parentNode.removeChild(oldPhrase[0]); // Remove them all
    }

    const phraseArray = getRandomPhraseAsArray(phrases); // Call back the function to bring in a new phrase/letters
    addPhraseToDisplay(phraseArray);

  // Reset the keyboard
    const chosen = document.querySelectorAll('.chosen'); //Find all the letters on the keyboard that were clicked on
    for (let i = 0; i < chosen.length; i += 1) {
    chosen[i].className = ' '; // set the class name back to nothing, removing the "chosen" styling
    chosen[i].removeAttribute('disabled'); // remove the disabled atttribute so the user can click on the letters again
}

  // Reset hearts

    const ol = document.querySelector('#scoreboard ol');
    const listOfHearts = ol.querySelectorAll('li img'); //Select all of the list item images in ol, whether it's a lost heart or live heart
    for (let i = 0; i < listOfHearts.length; i += 1) { // Cycle through the list images until you reach all 5...
      listOfHearts[i].setAttribute("src", "images/liveHeart.png"); //Change the src value to the new listOfHearts image, starting from the 0 index list item
    }
});

//Array of phrases for game to choose from.

const phrases = [
'life finds a way',
"i'm king of the world",
'i volunteer as tribute',
'swish and flick',
'one ring to rule them all',
"i can't quit you",
"here's looking at you kid",
"you don't talk about fight club",
'are the lambs still screaming clarice?',
'wilsoooooonnnnn',
'life is like a box of chocolates',
'let it go',
'i am iron man',
'i coulda been somebody',
"i'm gonna make him an offer he can't refuse",
'go ahead, make my day',
'may the force be with you',
'show me the money',
"i'll have what she's having",
'i see dead people',
'say hello to my little friend',
"here's johnny!",
'snap out of it!',
'nobody puts baby in the corner',
'how about them apples?'
];

//Randomly chooses one of the phrases and splits all of the characters into an array of letters

function getRandomPhraseAsArray(arr){
  const getRandomPhrase = arr[Math.floor(Math.random() * arr.length)]; //Targets the array and randomly selects one of the phrases
  const phraseCharacters = getRandomPhrase.split(''); //Splits the phrase that was chosen into separate characters
  return phraseCharacters; //returns the separate characters, stored in the phraseCharacters value
}

//Function to take that new string of characters and display them to the screen

function addPhraseToDisplay(arr){
  for (let i = 0; i < arr.length; i += 1) {
      const listItem = document.createElement('li'); // Cycles through the array of returned characters, turns them into list items.
      listItem.textContent = arr[i]; // Assigns those list items the text content value of the original characters
      const ul = phrase.firstElementChild; // Targets the first child element of the ".phrase" class (which is the ul) and assigns it a value of ul.
      ul.appendChild(listItem); // adds a new child element to that ul, which is the list item we created with the stored phrase letter values

      if(arr[i] !== ' '){
        listItem.classList.add('letter'); // If the new item is not a space (which makes it a letter), give it the styling from ".letter".
      } else {
        listItem.style.width = '2em'; // Or if it's an actual space, widen the space so we can visually tell the different phrase words apart.
      }
  }
}

//Call the function to produce the new string of characters using "phrases" as the parameter, store it into the phraseArray constant. Then call the second function to display that value to the screen
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//Create a function to check if the letters the player guesses match the ones from the phrase

  function checkLetter(e){
  const letters = document.getElementsByClassName('letter'); //Finds all of the items with the class of letter which we created above. Stores them into the "letter" constant
  let matchingLetter = null;
  for (let i = 0; i < letters.length; i += 1) { // Loops through each letter in the phrase array
    if (e === letters[i].textContent){ // if the button clicked matches a letter in the array...
      letters[i].classList.add('show'); // add a class name of ".show" to that letter
      // letters[i].classList.add('fade'); // also add a class name of ".fade" to that letter
      matchingLetter = document.getElementsByClassName('show'); // Now find all the elements that have the added class name and store it in matchingLetter.
    }
   }
   return matchingLetter;

   //Gives the new letter that is displaying to the screen a fade in class styling

 }

//Utilize the above function by adding a click handler when the user actually clicks on a letter guess

qwerty.addEventListener('click', (e) => { //When you click in the qwerty section, something will happen
  const ol = document.querySelector('#scoreboard ol');

  if (e.target.nodeName === 'BUTTON') { //If what you're clicking within this section is a button element, then something happens
      e.target.classList.add('chosen'); //Give what the user clicked an added class name of "chosen"
      e.target.setAttribute('disabled', true); //Disable what was clicked so it can't be clicked again

      const letterButtonOnClick = e.target.textContent; //Let the letter that was clicked text's content (that letter) equal this constant
      const letterFound = checkLetter(letterButtonOnClick);//Run that letter through the checkLetter function to display it


  if (letterFound === null) { //If the letter doesn't match anything from the phrase, it has a null value
      missed += 1; // When this is the case, add 1 to the missed value
      const liveHeart = ol.querySelectorAll('li img[src="images/liveHeart.png"]'); //Select all of the list items in ol with the sepcified value
   if (liveHeart.length > 0) { // as long as the index is greater than 0, which it always is since we are selecting them all...
        liveHeart[0].setAttribute("src", "images/lostHeart.png"); //Change the src value to the new lostHeart image, starting from the 0 index list item
        }
      }
   }
//function to check whether player wins or lose  game.
   function checkWin() {
     const lettersShown = ul.querySelectorAll('.show'); // Gets all elements with the class show
     const lettersNeeded = ul.querySelectorAll('.letter'); //Gets all element with the class letter
     const message = document.getElementsByClassName('title')[0]; //Gets the element with the title class for styling purposes

   if (lettersShown.length === lettersNeeded.length) { // If the letters in the display equal the amount of letters in the phrase chosen, you know you've won
       overlay.removeAttribute('class');
       overlay.classList.add('win');
       overlay.style.display = 'flex';
       message.innerText = "Congratulations, you win!";
       reset.innerText = "Play Again";
     } else if (missed > 4) {
       overlay.removeAttribute('class');
       overlay.classList.add('lose');
       overlay.style.display = 'flex';
       message.innerText = "Sorry, you lose!";
       reset.innerText = "Try Again";
     }
    }
    checkWin();
 });
