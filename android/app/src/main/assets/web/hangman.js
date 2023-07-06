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

    //CHECK IF ONLY ONE LETTER
    //  EITHER POST CHALLENGE
    //  EITHER COMPARE LETTERS
    //guessLetter(typedText);

}

function change_known_word(word) {
    document.getElementById('span:text').textContent = word
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



