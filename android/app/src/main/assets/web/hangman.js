//let str inputWordGame;
var inputWordGame;
var currentGuessStatus;
var remainingLives;

function start_new_game() {
    console.log("test");
    console.log("test2");
    closeOverlay();
}

/*
    Sets word to guess and resets lives
*/
function setupGame(word) {
    let charArray = new Array(word.length).fill('_');
    currentGuessStatus = charArray.join(' ');

    remainingLives = 5;
    change_picture("img/hangmanLives5.png")
    change_known_word(currentGuessStatus)
}

/**
    Returns true if the game is over,
    False otherwise
*/
function gameEnd() {
    if (remainingLives <= 0 || currentGuessStatus == null || !currentGuessStatus.includes('_')) {
        return true;
    } else {
        return false;
    }
}

/*
    Updates lives and hangman
*/
function wrongGuess() {
    remainingLives--
    //change picture to hangman representing remaining lives
    if (remainingLives == 4) {
        change_picture("img/hangmanLives4");
    } else if (remainingLives == 3) {
        change_picture("img/hangmanLives3");
    } else if (remainingLives == 2) {
        change_picture("img/hangmanLives2");
    } else if (remainingLives == 1) {
        change_picture("img/hangmanLives1");
    } else if (remainingLives == 0) {
        change_picture("img/hangmanLives0");
    }
}

/*
    Change picture in webapp to source
    Example: change_picture("img/hangmanLives5.png")
*/
function change_picture(source) {
    //closeOverlay();
    console.log('Change hangman picture');
    document.getElementById("hangman_image").src = source;
}

function change_known_word(word) {
    document.getElementById('span:text').textContent = word;
}

function hangman_button_pressed() {

    //get text typed in Textarea and delete typed text
    var typedText = document.getElementById('draft_hangman').value;
    document.getElementById('draft_hangman').value = "";
    console.log('Typed text:', typedText);
    let userInput = typedText.toString();

    // check if input := word (more than one letter) --> inputWordGame
    // check if input := letter --> user guess
    if (userInput.length == 0) {
        console.log("Empty input -> ignore");
    } else if (userInput.length <= 1) { // user guesses a letter
        console.log('Guess letter:', userInput);
        guessLetter(userInput);
    } else { // user sets new word
        console.log('Set new input word:', userInput);
        inputWordGame = userInput;
        setupGame(userInput);
        // Console Testing
        for (let i = 0; i < currentGuessStatus.length; i++) {
                console.log(currentGuessStatus[i]);
        }
    }

}

/* parameters: letter to guess
*/
function guessLetter(inputLetter) {
    if (!gameEnd()) {
        console.log('is', inputLetter, 'in', inputWordGame);
        checkWord = inputWordGame.toString();

        let letterIsInWord = false;

        // Run over the whole word and check if the letter is present on any index
        // if so replace the index of the guess status with that letter
        for(let i = 0; i < checkWord.length; i++) {
            if (checkWord.charAt(i) == inputLetter) {

                let charArray = currentGuessStatus.split('');
                charArray[i] = inputLetter;
                currentGuessStatus = charArray.join('');

                letterIsInWord = true;
            }
        }
        change_known_word(currentGuessStatus);

        if (letterIsInWord != true) {
            console.log('Letter is not in word:( try again!')
            wrongGuess();
        }

        for (let j = 0; j < currentGuessStatus.length; j++) {
            console.log(currentGuessStatus[j]);
        }
    } else { //gameEnd returns true
        //there is no game running
        console.log("There is no game running")
    }
}



