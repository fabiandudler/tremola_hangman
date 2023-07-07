//let str inputWordGame;
var inputWordGame;
var currentGuessStatus;
var remainingLives;
var givenUp;

function show_solution() {
    if(inputWordGame != null) {
        console.log("Game is ending... showing solution");
        currentGuessStatus = inputWordGame;
        change_known_word(currentGuessStatus);
        givenUp = true;
    } else {
        console.log("There is no game running")
    }
    closeOverlay();
}

function hangman_new_event(e) {

    var word = e.public[1];
    console.log("hangman_new_event", word)
    setupGame(word);

}

/*
    Saves the new chosen word to the backend and starts the game
*/
function saveWord(word) {
    backend("hangman " +  word);
    setupGame(word);
}

/*
    1. val encodedWord = Bipf.encode(word) (WebAppInterface.kt)
    2. act.tinyNode.publish_public_content(encodedWord) (WebInterface.kt)
    3.      val pkt = repo.mk_contentLogEntry(content) (tssb/Node.kt) -> ByteArray?
    4.      return repo.feed_append(context.idStore.identify.verifyKey, pkt)
*/

/*
    Sets word to guess and resets lives
    Does not save the word in the log so that it can be called when encountering a new log
*/
function setupGame(word) { //-> eval("setupGame(word)")
    let charArray = new Array(word.length).fill('_');
    currentGuessStatus = charArray.join('');

    remainingLives = 5;
    givenUp = false;
    change_picture("img/hangmanLives5.png");
    change_known_word(currentGuessStatus);
}

/**
    Returns true if the game is over,
    False otherwise
*/
function gameEnd() {
    if (remainingLives <= 0 || currentGuessStatus == null || currentGuessStatus == inputWordGame) {
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

    var show_image = document.getElementById('hangman_image')
    //change picture to hangman representing remaining lives
    if (remainingLives == 4) {
        change_picture("img/hangmanLives4.png");
        console.log('4 lives')
    } else if (remainingLives == 3) {
        change_picture("img/hangmanLives3.png");
        console.log('3 lives')
    } else if (remainingLives == 2) {
        change_picture("img/hangmanLives2.png");
    } else if (remainingLives == 1) {
        change_picture("img/hangmanLives1.png");
    } else if (remainingLives == 0) {
        change_picture("img/hangmanLives0.png");
    }
    persist();
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
    persist();
}

function hangman_button_pressed() {

    //get text typed in Textarea and delete typed text
    var typedText = document.getElementById('draft_hangman').value;
    document.getElementById('draft_hangman').value = "";
    console.log('Typed text:', typedText);
    let userInput = typedText.toString();
    persist();

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
        saveWord(userInput);
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
        gameEndAction();

        if (letterIsInWord != true) {
            console.log('Letter is not in word:( try again!')
            wrongGuess();
        }

        for (let j = 0; j < currentGuessStatus.length; j++) {
            console.log(currentGuessStatus[j]);
        }
    } else { //gameEnd returns true
        gameEndAction();
    }
    persist();
}

function gameEndAction() {
    if(remainingLives <= 0) {
        gameLost();
    } else if(!givenUp && currentGuessStatus == inputWordGame) {
        gameWon();
    }
}

function gameWon() {
    console.log("Game won!");
    change_known_word("You have found the word: " + inputWordGame + " with " + remainingLives + " lives remaining, congrats!")
    //change_picture("img/hangmanWon.png");
}

function gameLost() {
    console.log("Game lost...");
    change_known_word("You have not found the word: " + inputWordGame + ", unlucky...")
    //picture is already changed to hangmanLives0.png
}

//lives:
    //1. placing chair
    //2. sitting
    //3. drink exists
    //4. raise glass
    //5. spill  --> won game --> happy

