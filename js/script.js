/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
    function changeLikeValue(e) {
        var elId = e.target.id,
            likeVal = document.getElementById(elId).classList.item(1),
            newLikeVal;    

        switch(likeVal) {
            case "dislike":
                 //selects the first child element whith tag i
                newLikeVal = "unknown";
                //icon = document.querySelector("#" + elId + " > i").textContent = "help_outline"; 
                break;
            case "unknown":
                newLikeVal = "like";
                //icon = document.querySelector("#" + elId + " > i").textContent = "thumb_up"; 
                break;
            case "like":
                newLikeVal = "okay";
                //icon = document.querySelector("#" + elId + " > i").textContent = "thumbs_up_down"; 
                break;
            case "okay":
                newLikeVal = "dislike";
               // icon = document.querySelector("#" + elId + " > i").textContent = "thumb_down"; 
                break;
        }
        document.getElementById(elId).classList.remove(likeVal);
        document.getElementById(elId).classList.add(newLikeVal);
    }
    

    function categorizeFood(users, knownFoods, e) {
        var food = document.getElementById("query-item").value;
        knownFoods.unshift(food);
        for (var user in users){
            likeValue = document.getElementById(user + "-opinion").classList.item(1);
            //if the food is already in an opinion list, it gets removed so that it can be
            //reassigned to a new list
            //This is easier than going back after and checking for duplicates in multiple
            //lists, then deciding which one should stay and which should get deleted
            for (var opinion in users[user]) {
                var opinionIndex = users[user][opinion].indexOf(food);
                if (opinionIndex > -1) {
                    users[user][opinion].splice(opinionIndex, 1);
                }
            }
            switch(likeValue) {
                case "unknown": //uknown
                    break;
                case "like": //like
                    users[user].likes.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
                case "okay": //will eat
                    users[user].okays.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
                case "dislike": //dislike
                    users[user].dislikes.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
            }

        } 
    } 

    function checkPreferences(knownFoods, users, e) {
        var food = document.getElementById("query-item").value;
        for (var user in users) {
            var memberOpinion = document.getElementById(user + "-opinion");
            var oldLikeVal = memberOpinion.classList.item(1);
            var newLikeVal = "unknown";
            if (users[user].likes.indexOf(food) > -1) {
                newLikeVal = "like";
            } else if (users[user].okays.indexOf(food) > -1) {
                newLikeVal = "okay";
            } else if (users[user].dislikes.indexOf(food) > -1) {
                newLikeVal = "dislike";
            }
            memberOpinion.classList.replace(oldLikeVal, newLikeVal);
         }
    }

    function displayPreferences(users) {
        for (user in users) {
            var section = ["likes", "okays", "dislikes"];
            for (var s=0; s < 3; s++) {//section length is set at 3
                var specificSection = section[s];
                var domSection = document.querySelector("#" + user + "-profile > .member-" + specificSection);
                domSection.innerHTML = "";
                var specificList = users[user][specificSection];
                for (var i = 0; i < specificList.length; i++) {
                    var newDiv = document.createElement("div");
                    newDiv.innerHTML = "<p>" + specificList[i] + "</p>" + "<button class='expand-pref'>+</button>"
                    newDiv.className = "food-opinion";
                    domSection.appendChild(newDiv);
                }
            }
        }
    }
//////////////////////////////////////////////////////////////////////////////////
    
    var originalOpinions = document.getElementById("member-opinions").cloneNode();
    var originalState = true;

    var knownFoods = [];
    var users = {
        carol: {
            likes: [],
            okays: [],
            dislikes: [] 
        },
        ray: {
            likes: [],
            okays: [],
            dislikes: [] 
        },
        bob: {
            likes: [],
            okays: [],
            dislikes: [] 
        },
        jim: {
            likes: [],
            okays: [],
            dislikes: [] 
        }
    };
    //(function () {resetOpinions()}());
    var memberOpinions = document.getElementsByClassName("member-opinion");
    for (var i=0; i <memberOpinions.length; i++) {
        memberOpinions[i].addEventListener("click", function(e) {
            changeLikeValue(e);
        }, false);

    }
    var sortFoodButton = document.getElementById("categorize-food");
    sortFoodButton.addEventListener("click", function(e) {
        categorizeFood(users, knownFoods, e);
        displayPreferences(users);
    }, false);
    var foodInput = document.getElementById("query-item");
    foodInput.addEventListener("keyup", function(e) {
        checkPreferences(knownFoods, users, e); 



    }, false);

}());
