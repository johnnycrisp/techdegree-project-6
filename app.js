//Variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');
const matchingLetters = [];
const scoreBoard = document.getElementById('scoreboard');
const tries = document.getElementsByClassName('tries');
const letters = document.getElementsByClassName('letter');


// Hide start overlay on startButton click

startButton.addEventListener('click', (e)=> {
    startOverlay.style.display = 'none';
});

// Phrases array

const phrases = [
    "Aubergine Tagine",
    "Blueberry Pancakes",
    "Spaghetti Hoops",
    "Garlic Naan",
    "Double Espresso"
];

// Select a random phrase from an array and split it into array of characters.

function getRandomPhraseAsArray(arr){
    const randomPhrase = arr[Math.floor(Math.random()*arr.length)]; 
    randomPhrase.split();
    const randomPhraseAsArray = Array.from(randomPhrase);
    return randomPhraseAsArray; 
}

// Iterate through an array and, for each character in the array, create a list item. Append the list item to the #phrase ul. If the character === a letter, add the class .letter to the li.

function addPhraseToDisplay(arr) {
    for(let i=0; i < arr.length; i++){
        const character = arr[i];
        createLi(character);

    }

}

function createLi(character){
    const li = document.createElement('li');
    li.textContent = character;
    phrase.firstElementChild.appendChild(li);
    if(li.innerText === ''){
        li.className = 'space';
    } else {
        li.className = 'letter';
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//  Event listener and function event handler to check whether the correct letter is chosen. Accepts parameter of clicked button. Get and loop through all elements with class .letter and check if they match the letter clicked by the user. If there is a match, add .show class to the li with that letter, store matching letter and return that letter. If there is no match - return null.

function checkLetter(isClicked) {
        isClicked.className = 'chosen';
        isClicked.setAttribute('disabled', 'true');
            for(let i = 0; i < letters.length; i++){
                   const singleLetter = letters[i]; 
                   const singleLetterText = letters[i].innerText;
                        if(singleLetterText.toLowerCase() === isClicked.innerText){
                            singleLetter.classList.add('show');
                            matchingLetters.push(singleLetterText); 
                        } 
                        
        }
   }

   let targetPhrase = [];
        for( item of letters){
                targetPhrase.push(item.innerText.toLowerCase());
            }

qwerty.addEventListener('click', (e)=>{
    if (e.target.tagName === 'BUTTON') {
        const isClicked = e.target;
        checkLetter(isClicked);
    if (!targetPhrase.includes(isClicked.innerText)) {
            missed++;
            const list = scoreBoard.firstElementChild;
            let firstTry = tries[0];
            firstTry.remove();
            const fail = document.createElement('li');
            scoreBoard.firstElementChild.appendChild(fail);
            fail.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
            fail.className = 'fail';
                        }         
    } checkWin();
   });

function checkWin(){
    if(letters.length === matchingLetters.length){
        startOverlay.style.display = '';
        startOverlay.className = 'win';
        startOverlay.firstElementChild.innerText = 'You Win!';
        startOverlay.lastElementChild.remove();
        const resetGameButton = document.createElement('button');
        resetGame();
        startOverlay.appendChild(resetGameButton);
        resetGameButton.className = 'btn__reset';
        resetGameButton.innerText = 'Play Again';
        resetGameButton.addEventListener('click', ()=>{
            startOverlay.style.display = 'none';
            addPhraseToDisplay(phraseArray);

        });


    } else if (missed >= 5){
        startOverlay.style.display = '';
        startOverlay.className = 'lose';
        startOverlay.firstElementChild.innerText = 'You Lose!';
        startOverlay.lastElementChild.remove();
        const resetGameButton = document.createElement('button');
        startOverlay.appendChild(resetGameButton);
        resetGame();
        resetGameButton.className = 'btn__reset';
        resetGameButton.innerText = 'Play Again';
        resetGameButton.addEventListener('click', ()=>{
            startOverlay.style.display = 'none';
            addPhraseToDisplay(phraseArray);

        });
    }
}

    const chosenLetters = document.getElementsByClassName('chosen');


function resetGame() {
    missed = 0;
    phrase.firstElementChild.innerHTML = "";
    for(let i = 0; i< chosenLetters.length; i++){ 
        chosenLetters[i].classList.remove("chosen");
        chosenLetters[i].removeAttribute("disabled");
}

    const failedAttempts = document.querySelectorAll('.fail');
    for(let i = 0; i< failedAttempts.length; i++){
    failedAttempts[i].className = 'tries';
    failedAttempts[i].innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px">`;
}

}



