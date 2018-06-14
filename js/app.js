/*
 * Create a list that holds all of your cards
 */
 /*The card array, initGame function, and parts of the clickedCard forEach
 function use material from Mike Wales webinar
 https://www.youtube.com/watch?v=_rUH-sEs68Y*/
 const cards = ['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
]


function generateCard(card){
  return `<li class="card" data-card="${card}"> <i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function initGame(){
   const deck = document.querySelector('.deck');
   const cardHTML = shuffle(cards).map(function(card){
     return generateCard(card);
   });
   deck.innerHTML = cardHTML.join('');
 }
initGame();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const clickedCard = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let matchedCards = [];
clickedCard.forEach(function(card){
  card.addEventListener('click', function(event) {

    // timeRunning is set to true with the first click so that the timer starts
    timeRunning = true;

    // checks to see if the card clicked is open or already matched, if the card isn't this opens the card
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      openCards.push(card);
      card.classList.add('open', 'show');

      // if 2 cards match adds class match and removes classes open & show
      if (openCards.length===2) {
        if (openCards[0].dataset.card === openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          openCards[0].classList.remove('open', 'show');
          openCards[1].classList.remove('open', 'show');
          matchedCards.push(openCards);

          // this checks to see if 8 sets of cards are matched to end game
          if (matchedCards.length ===8) {
            gameWon();
          }
        }

        // gives user 1 second to see clicked cards if they do not match
        setTimeout(function(){
          openCards.forEach(function(card) {
            card.classList.remove('open', 'show')
          });
          openCards = [];
        }, 1000)
      };
    }

    //move counter
    moves=moves+1;
    document.querySelector('.moves').innerText = moves;

    //star counter
    const stars = document.querySelectorAll('ul.stars li');
    const starList = document.querySelector('ul.stars')
    if (moves === 20) {
      starList.removeChild(stars[0]);
    } else if (moves === 30) {
      starList.removeChild(stars[1]);
    } else if (moves === 40) {
      starList.remove();
    }
  });
});

// restart button
const restart = document.querySelector('.restart');
restart.addEventListener('click', function(){
  location.reload(true);
 });

 //timer
let seconds = 0;
let minutes = 0;
let timeRunning = false;
function countSeconds() {
  if(timeRunning){
   seconds = seconds + 1;
   if (seconds < 10) {
     document.getElementById('seconds').innerText = `0${seconds}`;
   } else if ((seconds>9) && (seconds<60)){
     document.getElementById('seconds').innerText = seconds;
   } else if (seconds>59) {
       minutes = seconds / 60;
       let secondsCount = seconds % 60;
       document.getElementById('minutes').innerText = Math.floor(minutes);
       if (secondsCount<10){
       document.getElementById('seconds').innerText = "0"+Math.floor(secondsCount);
     } else {
       document.getElementById('seconds').innerText = Math.floor(secondsCount);
     }
   }
 }
}
setInterval(countSeconds, 1000)


//modal that pops up once the game is won to ask if the user would like to play again
function gameWon() {
  const modal = document.querySelector(".modal");
  modal.style.display="block";
  const congratsText = document.getElementById("congratsText");
  let time = document.querySelector(".timer").innerText;
  let score = document.querySelector('.stars').childElementCount;
  congratsText.textContent = `Congratulations! Your time was: ${time}. Your score was: ${score} stars. \n Would you like to play again?`;
  let replayGameModalButton = document.querySelector('#replayGameModal');
  replayGameModalButton.onclick = function(){
    location.reload(true)
  }
  let closeModalButton = document.querySelector('#closeModal');
  closeModalButton.onclick = function(){
     modal.style.display = "none";
  }
  timeRunning = false;
}
