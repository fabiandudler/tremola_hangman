//let str inputWordGame;
var inputWordGame;
var currentGuessStatus;

function start_new_game() {
    console.log("test");
    console.log("test2");
    closeOverlay();
}

function change_picture() {
    //closeOverlay();
    console.log('change picture');
    var img = document.getElementById("hangman_image");
      console.log(img); // Check if the element is correctly selected
      img.src = "img/hangmanTest2.png";
}

function hangman_button_pressed() {
    console.log("buttontontotn");

    var typedText = document.getElementById('draft_hangman').value;
    document.getElementById('draft_hangman').value = "";

    console.log('Typed text:', typedText);
    let userInput = typedText.toString();

    // check if input := word (more than one letter) --> inputWordGame
    // check if input := letter --> user guess

    if (userInput.length == 1) {
        console.log('Guess letter:', userInput);
        guessLetter(userInput);
    } else {
        console.log('Set new input word:', userInput);
        inputWordGame = userInput;

        // Initialize Guess Array with '_' symbols
        let charArray = new Array(userInput.length).fill('_');
        currentGuessStatus = charArray;

        // Console Testing
        for (let i = 0; i < currentGuessStatus.length; i++) {
                console.log(currentGuessStatus[i]);
        }
    }

}

function change_known_word(word) {
    document.getElementById('span:text').textContent = word;
}

// parameter: letter to guess
function guessLetter(inputLetter) {
    console.log('is', inputLetter, 'in', inputWordGame);
    checkWord = inputWordGame.toString();

    let letterIsInWord = false;

    for(let i = 0; i < checkWord.length; i++) {

        if (checkWord.charAt(i) == inputLetter) {
            currentGuessStatus[i] = inputLetter;
            letterIsInWord = true;
        }

    }

    change_known_word(currentGuessStatus.join(' '));

    if (letterIsInWord != true) {
        console.log('letter is not in word:( try again!')
        // draw_part_of_hangman()
    }

    for (let j = 0; j < currentGuessStatus.length; j++) {
        console.log(currentGuessStatus[j]);
    }

}

/*function Hangman(word) {

    if (word == null || word.contains(' ')) {
        console.log("no")
    } else {
        var data = {
                'bid': null,
                'cmd': 'newWord' + word,
                'prev': null
            }
            backend(data['cmd'])
    }
}*/



