// jshint esversion: 8
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
var missed = 0;
const ul = document.querySelector('#phrase ul');

// Hide these so they can appear later
$('.main-container').hide();
$('.game-screen').hide();
$('.win').hide();
$('.lose').hide();
$('.hint').hide();

// When the user clicks the start-game button...
$(".start-game").click(function() {

  $(".home").fadeOut(3000); //fade out the home sreen
  $(".main-container").show(); //fade in the film background
  $(".game-screen").delay(2500).fadeIn(1000); //fade in the game screen a few moments after

});

$(".play-again").click(function() { //When user clicks the play again button...

  $('.win').hide(); //hide these screens
  $('.lose').hide();
  $('.hint').text('');
  $('.main-container').fadeIn(); //fade in the game screen again
  $('.hintTarget').removeClass("hint");
  $('#hint-icon').removeClass("lightOut");

// Game resets when user clicks on button after they win or lose
  missed = 0; // returns the missed guesses to 0

  // Reset phrase display board

    let oldPhrase = document.getElementById('phrase').getElementsByTagName('li'); // Select all of the li items in the phrase (the letters)
    while (oldPhrase.length > 0) {
        oldPhrase[0].parentNode.removeChild(oldPhrase[0]); // Remove them all
    }

    const chosenPhrase = generateRandomPhrase(phrases); // Call back the function to bring in a new phrase
    const phraseArray = splitPhrase(chosenPhrase); // split that phrase into letters
    addPhraseToDisplay(phraseArray); //display the new phrase on the board

    // Clear the hint settings and set new index values
    function getPhraseIndex(arr){
      const phraseIndex = arr.indexOf(chosenPhrase);
      return phraseIndex;
    }

    const hintIndex = getPhraseIndex(phrases);
    console.log(chosenPhrase);
    console.log(hintIndex);

    $('#hint-icon').click(function() {
      $('#hint-icon').addClass("lightOut");
      $('.hintTarget').addClass("hint").text(hints[hintIndex]);
    });

  // Reset the keyboard
    $(".chosen").each(function(){
    $(this).removeClass('chosen'); // set the class name back to nothing, removing the "chosen" styling
    $(this).removeAttr('disabled'); // remove the disabled atttribute so the user can click on the letters again
});

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
  'i volunteer as tribute!',
  'swish and flick',
  'one ring to rule them all',
  "i can't quit you",
  "here's looking at you kid",
  "you don't talk about fight club",
  'are the lambs still screaming clarice?',
  'wilsoooooonnnnn!',
  'life is like a box of chocolates',
  'let it go',
  'i am iron-man',
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
  'how about them apples?',
  'great scott!',
  'hakuna matata',
  'e.t. phone home',
  'wanna know how i got these scars?',
  'follow the yellow brick road!',
  "mr. demille, i'm ready for my close-up",
  "you're tearing me apart!",
  "a boy's best friend is his mother",
  "mrs. robinson, you're trying to seduce me",
  "i'm afraid i can't do that dave",
  "i'm walkin' here!",
  "fish are friends, not food",
  "is butter a carb?",
  "bye, felicia",
  "you sho is ugly!",
  "king kong ain't got shit on me!"
    ];

  const hints = [
    'Jurassic Park (1993)',
    "Titanic (1997)",
    'The Hunger Games (2012)',
    "Harry Potter and the Sorcerer's Stone (2001)",
    'The Lord of the Rings: The Fellowship of the Ring (2001)',
    "Brokeback Mountain (2005)",
    "Casablanca (1942)",
    "Fight Club (1999)",
    'The Silence of the Lambs (1991)',
    'Cast Away (2000)',
    'Forrest Gump (1994)',
    'Frozen (2013)',
    'Avengers: Endgame (2019)',
    'On the Waterfront (1954)',
    "The Godfather (1972)",
    'Sudden Impact (1983)',
    'Star Wars: Episode IV - A New Hope (1977)',
    'Jerry Maguire (1996)',
    "When Harry Met Sally (1989)",
    'The Sixth Sense (1999)',
    'Scarface (1983)',
    "The Shining (1980)",
    'Moonstruck (1987)',
    'Dirty Dancing (1987)',
    'Good Will Hunting (1997)',
    'Back to the Future (1985)',
    'The Lion King (1994)',
    'E.T. The Extra-Terrestrial (1982)',
    'The Dark Knight (2008)',
    'The Wizard of Oz (1939)',
    'Sunset Boulevard (1950)',
    'Rebel Without a Cause (1955)',
    'Psycho (1960)',
    'The Graduate (1967)',
    '2001: A Space Odyssey (1968)',
    'Midnight Cowboy (1969)',
    'Finding Nemo (2003)',
    "Mean Girls (2004)",
    "Friday (1995)",
    "The Color Purple (1985)",
    "Training Day (2001)"
    ];

//Randomly chooses one of the phrases
function generateRandomPhrase(arr){
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase;
}

const chosenPhrase = generateRandomPhrase(phrases); //Puts the random phrase into a variable we can access later

function splitPhrase(arr){ //splits the phrase into individual characters
  const phraseCharacters = arr.split('');
  return phraseCharacters;
}

//Function to take that new string of characters and display them to the screen

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const listItem = document.createElement('li'); // Cycles through the array of returned characters, turns them into list items.
    listItem.textContent = arr[i]; // Assigns those list items the text content value of the original characters
    const ul = phrase.firstElementChild; // Targets the first child element of the ".phrase" class (which is the ul) and assigns it a value of ul.
    ul.appendChild(listItem); // adds a new child element to that ul, which is the list item we created with the stored phrase letter values

    const alphabet = /^[A-Za-z]+$/; // Matches only alphabetic characters

    if (arr[i] !== ' ') {
      listItem.classList.add('letter'); // If the new item is not a space (which makes it a letter), give it the styling from ".letter".
      if (!arr[i].match(alphabet)) {
        listItem.classList.add('show'); // If it's not a letter then automatically display it in the phrase
      }
    } else {
      listItem.style.width = '2em'; // Or if it's an actual space, widen the space so we can visually tell the different phrase words apart.
    }
  }
}

//Call the function to split the phrase into characters. Then call the second function to display that value to the screen
const phraseArray = splitPhrase(chosenPhrase);
addPhraseToDisplay(phraseArray);

//Obtain the index value of the phrase being used so the right hint can correspond.

function getPhraseIndex(arr){
  const phraseIndex = arr.indexOf(chosenPhrase);
  return phraseIndex;
}

const hintIndex = getPhraseIndex(phrases);
console.log(chosenPhrase);
console.log(hintIndex);

$('#hint-icon').click(function() {
  $('#hint-icon').addClass("lightOut");
  $('.hintTarget').addClass("hint").text(hints[hintIndex]);
});

//Create a function to check if the letters the player guesses match the ones from the phrase

  function checkLetter(e){
  const letters = $(".letter"); //Finds all of the items with the class of letter which we created above. Stores them into the "letter" constant
  let matchingLetter = null;
  for (let i = 0; i < letters.length; i += 1) { // Loops through each letter in the phrase array
    if (e === letters[i].textContent){ // if the button clicked matches a letter in the array...
      letters[i].classList.add('show'); // add a class name of ".show" to that letter
      matchingLetter = $(".show"); // Now find all the elements that have the added class name and store it in matchingLetter.
    }
   }
   return matchingLetter;

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
   if (liveHeart.length > 0) { // as long as the index is greater than 0, which means they still have lives left...
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
       $('.win').show();
     } else if (missed > 4) {
       $('.lose').show();
     }
    }
    checkWin();
 });
