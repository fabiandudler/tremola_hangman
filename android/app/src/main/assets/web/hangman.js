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

/*
    Called by 'tremola.js' function 'b2f_new_event(e)'
 */
function hangman_new_event(e) {

    var word = e.public[1];
    console.log("hangman_new_event", word)
    setupGame(word);

}

/*
    Saves the new chosen word to the backend and starts the game
*/
function saveWord(word) {
    console.log("save Word:", word)
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
function setupGame(incoming) { //-> eval("setupGame(word)")
    let word = incoming.toUpperCase()
    console.log("setupGame:", word)
    let charArray = new Array(word.length).fill('_');
    currentGuessStatus = charArray.join('');

    remainingLives = 5;
    givenUp = false;
    change_picture("img/default.png"); // hangmanLives5
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
    // console.log('hangman_image.src NOW:   ', document.getElementById('hangman_image').src)
    // --> CANNOT REFERENCE hangman_image.src DIRECTLY.
    // --> INSTANCE OF hangman_image MUST BE CALLED BY ITS 'ID' AND THEN THE SPECIFIC ELEMENT REFERENCED WE WANT TO MANIPULATE

    // console.log('UPDATE IMAGE TO:', source);

    // CREATE INSTANCE OF hangman_image
    // GET "img" ATTRIBUTE FROM "hangman-image" TO DIRECTLY MANIPULATE IT!
    var hangmanImage = document.getElementById("hangman_image"); // SELECT hangman_image ELEMENT: <div id="hangman_image" ... </div>
    console.log('OBJECT OF hangmanImage:', hangmanImage);
    var imageElement = hangmanImage.getElementsByTagName("img")[0]; // SELECT ELEMENT IT IS ACCESSING: // <img src= "..." alt="..." ..>
    console.log('GET ELEMENT WITH "img" TAG --> imageElement:', imageElement);

    // SOURCE AND ALT ATTRIBUTES OF OLD IMAGE
    console.log('CURRENT PICTURE (alt):  ', imageElement.alt);
    // console.log('NOW: SOURCE', imageElement.src);

    // UPDATE SOURCE AND ALT ATTRIBUTES OF IMAGE
    imageElement.src = source;                       // PATH TO IMAGE (IS PARAMETER OF FUNCTION)
    imageElement.alt = "Hangman Picture: " + source; // NAME OF IMAGE
    console.log('UPDATE PICTURE TO (alt):', imageElement.alt);
    // console.log('UPDATE: SOURCE:', imageElement.src);


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
    let userInput = typedText.toString().toUpperCase();
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

        if (letterIsInWord != true) {
            console.log('Letter is not in word:( try again!')
            wrongGuess();
        }

        gameEndAction();

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
    change_known_word("Solution: " + inputWordGame + " with " + remainingLives + " lives remaining!")
    change_picture("img/hangmanWon.png");
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

//Sat 8.7.
   //5 lives:       nothing
   //4 lives:       chair
   //3 lives:       chilling
   //2 lives:       present drink
   //1 life:        raise glass
   //0 lives:       splash

   //Win:           Happy, sparkles, thumbs up


