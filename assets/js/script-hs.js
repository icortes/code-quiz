//get highscore list
var hsListEl = document.getElementById("hs-list");

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