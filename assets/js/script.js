//create container for game blocks
var gameContainers = document.querySelector(".container");
//create container for play button
var playButton = gameContainers.querySelector("#playGameBtn");

var gameBlock = gameContainers.querySelector("#gameBlock");

var startMenu = document.getElementById("startMenu");

//check if play button is clicked
playButton.addEventListener("click", function (event) {
    //load the game
    loadGame();
    var element = event.target;
    console.log(element);

    //get parent and parent data-state
    var parent = element.parentNode;
    var parentState = element.parentNode.getAttribute("data-state");
    console.log(parentState, typeof parentState);

    // hide the startMenu
    parent.setAttribute("data-state", "hidden");
    parent.setAttribute("style", "display: none");

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

    get getQuestion() {
        return this.myQuestion;
    }
    get getOptions() {
        var array = [this.op1, this.op2, this.op3, this.op4];
        return array;
    }
    get getAnswer() {
        return this.correctAns;
    }
}

//load start menu
function loadStart() {
    gameBlock.setAttribute("data-state", "hidden");
    startMenu.setAttribute("style", "display: none");

    startMenu.setAttribute("data-state", "visible");
    startMenu.setAttribute("style", "display: flex");

}


//load game
function loadGame() {

    //make gameBlock visible
    gameBlock.setAttribute("data-state", "visible");
    gameBlock.setAttribute("style", "display: flex");
    console.log(gameBlock);

    //grab timer element from DOM
    var timeEl = document.getElementById("timer");
    var secondsLeft = 61;
    console.log(timeEl);

    //start timer countdown
    var timerInterval = setInterval(function () {
        secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            //send to gameOver
            loadStart();
        }

        //display question and options
        else {

        }
        timeEl.textContent = secondsLeft;
    }, 1000);

    //create questions
    const question1 = new Question("Which one is not a data type?", "number", "string", "boolean", "null", "null");
    const question2 = new Question("How can you add a comment in a JavaScript?", "//This is a comment", "'This is a comment", "<!--This is a comment-->", "#This is a comment", "//This is a comment");
    const question3 = new Question("The symbols + - * and / are:", "operators", "expressions", "comparison operators", "none of these", "operators");

    //put every question object into an array
    var questionArray = [question1, question2, question3];

    //randomize questionArray
    arrayRandomize(questionArray);

    //pick a question object randomly
    var displayQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    console.log(displayQuestion);

    //get unordered list from the gameBlock DOM
    var listEl = document.getElementById("options");

    //create li elements for the questions
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");


    //randomly sort an array if indexes to make selection random every time
    randIndexes = [0, 1, 2, 3];
    console.log(randIndexes);

    //assign questions into each list item
    li1.textContent = displayQuestion.getOptions[randIndexes[0]];
    li2.textContent = displayQuestion.getOptions[randIndexes[1]];
    li3.textContent = displayQuestion.getOptions[randIndexes[2]];
    li4.textContent = displayQuestion.getOptions[randIndexes[3]];

    console.log(displayQuestion.getOptions[randIndexes[0]]);

    //add li elements to unordered list
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);

}

//randomize order of an array, keeps swapping random array values
//until it finishes counting down
function arrayRandomize(arr) {
    //count down from array.length
    for (var i = arr.length - 1; i > 0; i--) {
        //pick a random index based on the length of array
        var newIndex = Math.floor(Math.random() * i);
        //get the value stored in arr[i]
        var newValue = arr[i];
        //set the value of original arr[i] to arr[newIndex]
        arr[i] = arr[newIndex];
        //finish swap by replacing arr[newIndex] with arr[i]
        arr[newIndex] = newValue;
    }
}