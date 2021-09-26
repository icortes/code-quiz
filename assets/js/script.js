//create container for game blocks
var gameContainers = document.querySelector(".container");
//create container for play button
var playButton = gameContainers.querySelector("#playGameBtn");
var gameBlock = gameContainers.querySelector("#gameBlock");
var startMenu = document.getElementById("startMenu");
var gameOver = document.getElementById("gameOver");
var validation = document.getElementById("validate");
var listEl = document.getElementById("options");

//create class with question, 4 options, and correct answer
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

//create questions
const question1 = new Question("Which one is not a data type?", "number", "string", "boolean", "null", "null");
const question2 = new Question("How can you add a comment in a JavaScript?", "//This is a comment", "'This is a comment", "<!--This is a comment-->", "#This is a comment", "//This is a comment");
const question3 = new Question("The symbols + - * and / are:", "operators", "expressions", "comparison operators", "none of these", "operators");

//put every question object into an array
var questionArray = [question1, question2, question3];
var questionRandomIndex = [0, 1, 2];
var randIndexes = [0, 1, 2, 3];
var questionCounter = 0;
//grab timer element from DOM
var timeEl = document.getElementById("timer");
var secondsLeft;

//check if play button is clicked
playButton.addEventListener("click", function (event) {
    var element = event.target;
    console.log(element);

    //randomize questionArray
    arrayRandomize(questionArray);
    console.log(questionArray);

    //randomize questionRandomIndex
    arrayRandomize(questionRandomIndex);
    console.log(questionRandomIndex);

    //randomly sort an array if indexes to make selection random every time
    arrayRandomize(randIndexes);
    console.log(randIndexes);

    //load the game
    loadGame();

    //get parent and parent data-state
    var parent = element.parentNode;
    var parentState = element.parentNode.getAttribute("data-state");
    console.log(parentState, typeof parentState);

    // hide the startMenu
    parent.setAttribute("data-state", "hidden");
    parent.setAttribute("style", "display: none");

});

//load start menu
function loadStart() {
    gameOver.setAttribute("data-state", "hidden");
    gameOver.setAttribute("style", "display: none");


    startMenu.setAttribute("data-state", "visible");
    startMenu.setAttribute("style", "display: flex");

}

function loadGameOver(){
    
    gameBlock.setAttribute("data-state", "hidden");
    gameBlock.setAttribute("style", "display: none");

    gameOver.setAttribute("data-state", "visible");
    gameOver.setAttribute("style", "display: flex");
}


//load game
function loadGame() {

    //make gameBlock visible
    gameBlock.setAttribute("data-state", "visible");
    gameBlock.setAttribute("style", "display: flex");
    console.log(gameBlock);

    secondsLeft = 61;
    console.log(timeEl);

    //start timer countdown
    var timerInterval = setInterval(function () {
        secondsLeft--;

        //when secondsLeft reaches below 0
        if (secondsLeft < 0) {
            secondsLeft = 0;
            validation.textContent = "";
            clearInterval(timerInterval);
            //send to gameOver
            loadGameOver();
        }

        timeEl.textContent = secondsLeft;
    }, 1000);

    newQuestion();
}

//add event listener to element
function addClickEventTo(element, correctAns) {
    //add click event listener to element
    element.addEventListener("click", function () {

        if (element.textContent === correctAns) {
            validation.textContent = "Correct!";
            if (questionCounter < questionRandomIndex.length) {
                clearGameBlock();
                questionCounter++;
                newQuestion();
                console.log(questionCounter);
            } else {
                gameOver();
            }
        } //
        else {
            validation.textContent = "Wrong! -10 seconds!";
            secondsLeft -= 10;
        }
    });
}

//function to remove list items from the gameBlock for next question
function clearGameBlock() {
    //will execute if children still exist
    while (listEl.firstChild) {
        //delete child from parent
        listEl.removeChild(listEl.firstChild);
        //back to while loop, grab new child, null if child does not exist
    }
}



var displayQuestion;
var liList;
//get question element from DOM
var questEl = document.getElementById("question");
console.log(questEl);

//display new question to the gameBlock
function newQuestion() {
    //pick a question from questionRandomIndex[questionCounter] that's already been randomized
    displayQuestion = questionArray[questionRandomIndex[questionCounter]];
    console.log(displayQuestion);
    //place question from displayQuestion
    questEl.textContent = displayQuestion.getQuestion;

    //get unordered list from the gameBlock DOM
    listEl = document.getElementById("options");

    //create li elements for the questions
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");

    console.log(displayQuestion.getOptions);
    liList = displayQuestion.getOptions;

    //assign questions into each list item
    li1.textContent = liList[0];
    li2.textContent = liList[1];
    li3.textContent = liList[2];
    li4.textContent = liList[3];

    console.log(displayQuestion.getAnswer);

    //add li elements to unordered list
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);

    //add event listener to every list item
    addClickEventTo(li1, displayQuestion.getAnswer);
    addClickEventTo(li2, displayQuestion.getAnswer);
    addClickEventTo(li3, displayQuestion.getAnswer);
    addClickEventTo(li4, displayQuestion.getAnswer);

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