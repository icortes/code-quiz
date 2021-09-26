//create container for game blocks
var gameContainers = document.querySelector(".container");
//create container for play button
var playButton = gameContainers.querySelector("#playGameBtn");

//check if play button is clicked
playButton.addEventListener("click", function(event){
    
    var element = event.target;
    console.log(element);
    
    //get parent and parent data-state
    var parent = element.parentNode;
    var parentState = element.parentNode.getAttribute("data-state");

    console.log(parentState, typeof parentState);

    // if the start menu is visible hide it
    if(parentState === "visible"){

        parent.setAttribute("data-state", "hidden");
        parent.setAttribute("style", "display: none");
    }
});


//create object with question, 4 options, and correct answer
class Question {
    constructor(question, option1, option2, option3, option4, answer) {
        this.myQuestion = question;
        this.op1 = option1;
        this.op2 = option2;
        this.op3 = option3;
        this.op4 = option4;
        this.correctAns = answer;
    }
}

//load game
function loadGame() {

}