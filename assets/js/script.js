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

class UserScore {
    constructor(initial, score) {
        this.init = initial;
        this.scr = score;
    }

    get getInitial() {
        return this.init;
    }

    get getScore() {
        return this.scr;
    }
}

//create questions
const question1 = new Question("Which one is not a data type?", "number", "string", "boolean", "null", "null");
const question2 = new Question("How can you add a comment in a JavaScript?", "//This is a comment", "'This is a comment", "<!--This is a comment-->", "#This is a comment", "//This is a comment");
const question3 = new Question("The symbols + - * and / are:", "operators", "expressions", "comparison operators", "none of these", "operators");
const question4 = new Question("How do you write \"Hello World\" in an alert box?", "alert(\"Hello Word\")", "msgBox(\"Hello Word\")", "alertBox=\"Hello Word\"", "alertBox(\"Hello Word\")", "alert(\"Hello Word\")");
const question5 = new Question("How do you create a function?", "function:myFunction()", "function=myFunction()", "function myFunction()", "myFunction():function", "function myFunction()");
const question6 = new Question("How do you write a conditional statement for executing some statements only if \"i\" is equal to 5?", "if i==5 then", "if (i==5)", "if i=5 then", "if i=5", "if (i==5)");
const question7 = new Question("In JavaScript, the following loop will execute ________ times. for (x=1; x<11; x++)", "9", "10", "11", "cannot tell from this portion of the script", "10");
const question8 = new Question("Which of the following is a logical operator?", "|", "&&", "%", "/", "&&");
const question9 = new Question("Alert(message), close() and reset() are JavaScript:", "Objects", "Methods", "Properties", "Commands", "Methods");
const question10 = new Question("Which HTML tag is used to define an embedded style sheet?", "<script>", "<style>", "<css>", "<stylesheet>", "<style>");

//put every question object into an array
var questionArray = [question1, question2, question3, question4,question5,question6,question7,question8,question9,question10];
var questionRandomIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var randIndexes = [0, 1, 2, 3];
var questionCounter = 0;
//grab timer element from DOM
var timeEl = document.getElementById("timer");
var secondsLeft;
//total score variable
var totalScore = 0;
//timer interval
var timerInterval;

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

//gameOver
function loadGameOver() {
    //hide game block
    gameBlock.setAttribute("data-state", "hidden");
    gameBlock.setAttribute("style", "display: none");
    //show game over screen
    gameOver.setAttribute("data-state", "visible");
    gameOver.setAttribute("style", "display: flex");

    var submitBtn = document.getElementById("submitBtn");

    //to prevent negative score, change totalScore to zero if < 0
    if (totalScore < 0) {
        totalScore = 0;
    }

    //display total score to user
    var totalScoreEl = document.getElementById("totalScore");
    totalScoreEl.textContent = " " + totalScore;

    //add click event listener to submit button
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        //grab the value in the text box
        var initials = document.getElementById("initials").value.trim();
        console.log(initials);
        //grab array of users from local storage
        var storedUsersArr = JSON.parse(localStorage.getItem("users"));
        //make array to copy stored users to it
        var usersArr = [];
        //store the value and initials in an object
        var user = new UserScore(initials, totalScore);
        //store the user in the array
        console.log(storedUsersArr);
        //if the local storage has data
        if (storedUsersArr !== null) {
            //copy the local storage array to the usersArr
            usersArr = storedUsersArr;
            //push the user object to the array
            usersArr.push(user);
        }
        //if it's empty put the object in index 0 of the usersArr
        else {
            usersArr = [user];
        }
        //store user in local storage using JSON
        localStorage.setItem("users", JSON.stringify(usersArr));
        //go to the highscores html page
        window.location.href = "assets/html/highscores.html";
    });
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
    timerInterval = setInterval(function () {
        secondsLeft--;

        //when secondsLeft reaches 0 or below
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
        //if item clicked is equal to the correct answer
        if (element.textContent === correctAns) {
            //add 10 points for correct answer
            totalScore += 10;
            validation.textContent = "Correct!";
            console.log("question random index: " + questionRandomIndex.length)
            if (questionCounter < questionRandomIndex.length - 1) {
                clearGameBlock();
                questionCounter++;
                newQuestion();
                arrayRandomize(randIndexes);
                console.log(questionCounter);
            } else {
                loadGameOver();
                clearInterval(timerInterval);
            }
        } //
        else {
            validation.textContent = "Wrong! -10 seconds!";
            totalScore -= 5;
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

    //assign questions into each list item randomly
    li1.textContent = liList[randIndexes[0]];
    li2.textContent = liList[randIndexes[1]];
    li3.textContent = liList[randIndexes[2]];
    li4.textContent = liList[randIndexes[3]];

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