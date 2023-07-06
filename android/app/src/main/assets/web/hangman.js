function start_new_game() {
    console.log("test");
    console.log("test2");
    closeOverlay();
}

function change_picture() {
    //closeOverlay();
    console.log('change picture');
    document.getElementById('hangman_image').src = 'img/hangmanTest2.png';
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



