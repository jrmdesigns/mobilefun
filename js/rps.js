window.onload = () =>{
    rpsButtons = document.getElementsByClassName("js-rps-buttons");
    messageElement = document.getElementById("js-rps-message");
    aiChoiceElement = document.getElementById("js-ai-choice");
    winningStreak = 0;
    init();


    $("#js-winning-streak").text(winningStreak);

    $(".js-rps-buttons").click(function(){
        playerChoise = $(this).attr("id");
        aiChoice = getRandom();
        aiChoiceText = aiChoice

        if(playerChoise > rpsButtons.length || playerChoise < 0){
            playerChoise = 0;
        }

        if(playerChoise == rpsButtons.length -1 && aiChoice == 0){
            writeMessage("lose");
        } else if((aiChoice == rpsButtons.length -1 && playerChoise == 0) || (aiChoice < playerChoise)){
            writeMessage("won");
            winningStreak++;
            $("#js-winning-streak").text(winningStreak);

        } else if(aiChoice == playerChoise){
            writeMessage("draw");
        } else {
            writeMessage("lose");
            winningStreak = 0;
            $("#js-winning-streak").text(winningStreak);
        }

        showAiChoice(aiChoice);

        console.log(aiChoice);
        console.log(playerChoise);

    });
}

init = () =>{
    writeMessage("Pleace make a choice");
    aiChoiceElement.innerHTML = "";
}

writeMessage = (message) => {
    messageElement.innerHTML = message;
}

showAiChoice = (aiChoice) =>{
    image = $("#" + aiChoice).attr("name");
    src = "images/" + image + ".svg";
    console.log(image);
    aiChoiceElement.setAttribute("src", src);
}

getRandom = () =>{
    return Math.floor((Math.random() * rpsButtons.length));
}

getAiText = () =>{
    getAllOptions = $(".js-rps-buttons");
    
}