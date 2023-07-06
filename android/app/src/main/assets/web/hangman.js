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
    change_known_word(typedText) //TODO remove later when Benny
    let inputWord = typedText.toString();
    //CHECK IF ONLY ONE LETTER
    //  EITHER POST CHALLENGE
    //  EITHER COMPARE LETTERS
    //guessLetter(typedText);

    // check if input := word (more than one letter) -> set as new input word --> save somewhere.??
    // check if input := letter

    if (inputWord.length == 1) {
        console.log('Guess letter:', inputWord);
        guessLetter(inputWord);
    } else {
        console.log('Set new input word:', inputWord);
        inputWordGame = inputWord;
        let charArray = new Array(inputWord.length).fill('_');
        currentGuessStatus = charArray;

        for (let i = 0; i < currentGuessStatus.length; i++) {
                console.log(currentGuessStatus[i]);
        }
    }

}

function change_known_word(word) {
    document.getElementById('span:text').textContent = word
}

/* parameters: letter to guess
*/
function guessLetter(inputWord) {
    console.log('is', inputWord, 'in', inputWordGame);
    checkWord = inputWordGame.toString();

    let letterIsInWord = false;

    for(let i = 0; i < checkWord.length; i++) {

        if (checkWord.charAt(i) == inputWord) {
            currentGuessStatus[i] = inputWord;
            letterIsInWord = true;
        }

    }

    if (letterIsInWord != true) {
        console.log('letter is not in word:( try again!')
        // draw part of hangman
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



