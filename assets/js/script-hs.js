//get highscore list
var hsListEl = document.getElementById("hs-list");
//get go back button element
var goBack = document.getElementById("go-back");
//get clear highscores element
var clearBtn = document.getElementById("clear-hs");

//function to show highscores
function showHighScores() {
    //clear hsListEl
    hsListEl.innerHTML = "";
    //get list of users from local storage
    var users = JSON.parse(localStorage.getItem("users"));
    //if users has content inside
    if (users !== null) {
        //for loop to append items in users to hs-list
        for (var i = 0; i < users.length; i++) {
            //grab item in users by index of loop
            var item = users[i];
            console.log(item);
            //create li element
            var li = document.createElement("li");
            //add text to li element
            li.textContent = item.init + " scored " + item.scr;
            console.log(li);
            //append li to hsListEl
            hsListEl.appendChild(li);
        }
    } 
    //if users doesn't have items exit function
    else {
        return;
    }
}

showHighScores();

//add click event listener to go back button
goBack.addEventListener("click", function(){
    //goes back to previous page
    window.history.back();
});

//add click event on clear highscores to delete them
clearBtn.addEventListener("click", function(){
    console.log(hsListEl);
    //check if hsListEl has items, if it does continue to delete
    if(hsListEl !== null){
        //while loop to delete all items
        while(hsListEl.lastElementChild){
            //delete all children
            hsListEl.removeChild(hsListEl.lastElementChild);
        }
        //deletes the users key from local storage and erases highscores
        localStorage.removeItem("users");
    }
    //if no items then exit function
    else {
        return;
    }
});