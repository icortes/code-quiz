//create container for game blocks
var gameContainers = document.querySelector(".container");
//create container for play button
var playButton = gameContainers.querySelector("#playGameBtn");
var gameBlock = gameContainers.querySelector("#gameBlock");
var startMenu = document.getElementById("startMenu");
var validation = document.getElementById("validate");

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

var questionCounter = 0;

//check if play button is clicked
playButton.addEventListener("click", function (event) {
    //load the game
    loadGame();
    var element = event.target;
    console.log(element);

    //randomize questionArray
    arrayRandomize(questionArray);

    //randomize questionRandomIndex
    arrayRandomize(questionRandomIndex);

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
    gameBlock.setAttribute("data-state", "hidden");
    gameBlock.setAttribute("style", "display: none");

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
        }

        //display question and options
        else {

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
            if (questionCounter > questionRandomIndex.length) {
                newQuestion();
                questionCounter++;
                console.log(questionCounter);
            } else {
                //gameOver();
            }
            clearGameBlock();
        } else {
            validation.textContent = "Wrong!";
        }
    });
}

//function to clear the gameBlock for next question
function clearGameBlock(){
    
}


//pick a question from questionRandomIndex[questionCounter] that's already been randomized
var displayQuestion = questionArray[questionRandomIndex[questionCounter]];
 //get question element from DOM
 var questEl = document.getElementById("question");
 console.log(questEl);

//display new question to the gameBlock
function newQuestion() {
    console.log(displayQuestion);

    //place question from displayQuestion
    questEl.textContent = displayQuestion.getQuestion;

    //get unordered list from the gameBlock DOM
    var listEl = document.getElementById("options");

    //create li elements for the questions
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");


    //randomly sort an array if indexes to make selection random every time
    randIndexes = [0, 1, 2, 3];
    arrayRandomize(randIndexes);
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