wordArray = []
word = "";
hangmanStates = ["images/gallow_00.png",
                "images/gallow_01.png",
                "images/gallow_02.png",
                "images/gallow_03.png",
                "images/gallow_04.png",
                "images/gallow_05.png",
                "images/gallow_06.png"];
hangmangCurrentState = 0;
wordCharacter = [];
playedCharacters = 0;

window.onload = () =>{
    getWordList();

    $(".js-keyboard-btn").click(function(){
        character = $(this).attr("id");
        $(this).addClass("disabled");
        matchCharacter(character);
        $(this).unbind("click");
    });
}

function getWordList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // document.getElementById("demo").innerHTML =
        // this.responseText;
        responseText = this.responseText.split("\n");
        wordArray = responseText;
        getRandomWord(responseText);
      }
    };
    xhttp.open("GET", "js/listofwords.txt", true);
    xhttp.send();
  }

function getRandomWord(){
      wordIndex = Math.floor((Math.random() * wordArray.length));
      console.log(wordIndex);
      word = wordArray[wordIndex];
      console.log(word);
      console.log(word.length);
      wordCharacter = word.split("");
      wordCharacter.splice(-1,1)
      console.log(wordCharacter);
      createDashes(wordCharacter.length);
}

function createDashes(length){
    dashes = "";
    for(i = 0; i < length; i++)
    {
        dashes += "_";
    }

    $("#underscores").text(dashes);

    addSpaces();
}

function addSpaces(){
    for(i = 0; i < wordCharacter.length; i++){
        if(" " == wordCharacter[i]){
            playedCharacters++;
            split = document.getElementById('underscores').innerHTML;
            split = replaceAt(split, i, " ");
            document.getElementById('underscores').innerHTML = split;
        }
    }
}

function matchCharacter(character){
    var totalPlaces = 0;
    for(i = 0; i < wordCharacter.length; i++){
        if(character == wordCharacter[i]){
            totalPlaces++;
            playedCharacters++;
            console.log(character);
            split = document.getElementById('underscores').innerHTML;
            split = replaceAt(split, i, character);
            document.getElementById('underscores').innerHTML = split;
            console.log(split);
        } 
    }

    if(totalPlaces == 0){
        console.log("Char not found");
        hangmangCurrentState++;
    }

    checkGame();
}

function checkGame(){
    $("#js-hangmanstate-image").attr("src", hangmanStates[hangmangCurrentState]);
    if(hangmangCurrentState == hangmanStates.length -1){
        // console.log('current state ' + hangmangCurrentState);
        // console.log('total hms ' + hangmanStates.length-1);
        console.log('you\'re dead');
        var audio = new Audio('sounds/chocking.wav');
        audio.play();
        $("#hangman-message").css("color", "red");
        $("#hangman-message").text("You lose");
        $("#fullscreen").css("display", "block");
        

    }

    if(playedCharacters == wordCharacter.length){
        // console.log('played: ' + playedCharacters);
        // console.log('total: ' + wordCharacter.length)
        console.log('you won!');
        var audio = new Audio('sounds/yeah.wav');
        audio.play();
        $("#hangman-message").css("color", "green");
        $("#hangman-message").text("You won");
        $("#fullscreen").css("display", "block");
    }
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }