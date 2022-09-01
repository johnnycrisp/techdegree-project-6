//Variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');


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
    phrase.appendChild(li);
    if(li.innerText === ''){
        li.className = 'space';
    } else {
        li.className = 'letter';
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//  Function to check whether the correct letter is chosen. Accepts parameter of clicked button. Get and loop through all elements with class .letter and check if they match the letter clicked by the user. If there is a match, add .show class to the li with that letter, store matching letter and return that letter. If there is no match - return null.

function checkLetter(isClicked) {
        const letters = document.getElementsByClassName('letter');
            for(let i = 0; i < letters.length; i++){
                   const singleLetter = letters[i]; 
                   const singleLetterText = letters[i].innerText;
                        if(singleLetterText.toLowerCase() === isClicked){
                            singleLetter.classList.add('show');
                        } 
        }
   }

qwerty.addEventListener('click', (e)=>{
    const isClicked = e.target.innerText;
    checkLetter(isClicked);
   });

 



