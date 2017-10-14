/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */
// user should refer to the account owner, and member refer to each of the profiles (mom is the user, her family are members 
(function () {
    function changeLikeValue(e) {
        var elId = e.target.id,
            likeVal = document.getElementById(elId).classList.item(0),
            newLikeVal;    

        switch(likeVal) {
            case "dislike":
                newLikeVal = "unknown";
                break;
            case "unknown":
                newLikeVal = "like";
                break;
            case "like":
                newLikeVal = "tolerates";
                break;
            case "tolerates":
                newLikeVal = "dislike";
                break;
        }
        document.getElementById(elId).classList.replace(likeVal, newLikeVal);
    }
    

    function categorizeFood(members, knownFoods, e) {
        var food = document.getElementById("query-item").value.trim();
        knownFoods.unshift(food);
        for (var member in members){
            likeValue = document.getElementById(member + "-opinion").classList.item(0);
            //if the food is already in an opinion list, it gets removed so that it can be
            //reassigned to a new list
            //This is easier than going back after and checking for duplicates in multiple
            //lists, then deciding which one should stay and which should get deleted
            for (var opinion in members[member]) {
                var opinionIndex = members[member][opinion].indexOf(food);
                if (opinionIndex > -1) {
                    members[member][opinion].splice(opinionIndex, 1);
                }
            }
            switch(likeValue) {
                case "unknown": //uknown
                    break;
                case "like": //like
                    members[member].likes.unshift(food);
                    console.log(member);
                    console.log(members[member]);
                    break;
                case "tolerates": //will eat
                    members[member].tolerates.unshift(food);
                    console.log(member);
                    console.log(members[member]);
                    break;
                case "dislike": //dislike
                    members[member].dislikes.unshift(food);
                    console.log(member);
                    console.log(members[member]);
                    break;
            }

        } 
    } 


    function changeOpinionColors(food, buttonType, knownFoods, members, e) {
        if (food === "0-query") {
            var food = document.getElementById("query-item").value;
        }
        for (var member in members) {
            var memberOpinion = document.getElementById(member + buttonType); 
            var oldLikeVal = memberOpinion.classList.item(0);
            var newLikeVal = "unknown";
            if (members[member].likes.indexOf(food) > -1) {
                newLikeVal = "like";
            } else if (members[member].tolerates.indexOf(food) > -1) {
                newLikeVal = "tolerates";
            } else if (members[member].dislikes.indexOf(food) > -1) {
                newLikeVal = "dislike";
            }
            memberOpinion.classList.replace(oldLikeVal, newLikeVal);
         }
    }


    function showMemberChoices(members) {
        for (member in members) {
            var sections = ["likes", "tolerates", "dislikes"];
            for (var s=0; s < 3; s++) {//section length is set at 3
                var specificSection = sections[s];
                var domSection = document.querySelector("#" + member + "-profile > .member-" + specificSection);
                domSection.innerHTML = "";
                var specificList = members[member][specificSection];
                for (var i = 0; i < specificList.length; i++) {
                    var foodText = specificList[i].replace(/ /g, "-")
                    var newDiv = document.createElement("div");
                    var newButton = document.createElement("button");
                    newButton.className = "expand-pref";
                    newButton.innerHTML = "+";
                    newButton.addEventListener("click", function(e) {
                        expandMemberChoices(members, e);
                    }, false);
                    newDiv.innerHTML = "<div class='food-choice'><p>" + specificList[i] + "</p>" + "</div>"
                    newDiv.appendChild(newButton);
                    newDiv.className =  foodText + " choice"; //to show diferences, the preferences are called opinions when set, but choices when in profiles 
                                        domSection.appendChild(newDiv);
                }
            }
         }
    }


    function expandMemberChoices(members, e) {
        var foodChoice = e.target;
        var foodParent = foodChoice.parentNode;
        var foodClass = foodParent.classList.item(0);
        var foodText = foodClass.replace(/-/g, " ");
        var choicesPopOut = document.createElement("div");
        choicesPopOut.innerHTML = '<button id="close-pop-out">X</button><div id="choices"></div><button class="save-tastes">Save Tastes</button>';
        foodParent.appendChild(choicesPopOut);
        document.getElementById("close-pop-out").addEventListener("click", function(e) {
            closePopOut(e);

        }, false);
        for (member in members) {
            var newButton = document.createElement("button");
            newButton.className = "unknown member-opinion";
            newButton.id = member + "-opinion-pop-out";
            newButton.innerHTML = member;
            newButton.addEventListener("click", function(e) {
                changeLikeValue(e);
            }, false); 
            document.getElementById("choices").appendChild(newButton);
        }
        alert(foodText);
        changeOpinionColors(foodText, "-opinion-pop-out", knownFoods, members, e); 
    }
    
    
    function closePopOut(e) {
        var target = e.target.parentNode;
        target.innerHTML = "";


    }
//////////////////////////////////////////////////////////////////////////////////
    
    var originalOpinions = document.getElementById("member-opinions").cloneNode();
    var originalState = true;

    var knownFoods = [];
    var members = {
        carol: {
            likes: [],
            tolerates: [],
            dislikes: [] 
        },
        ray: {
            likes: [],
            tolerates: [],
            dislikes: [] 
        },
        bob: {
            likes: [],
            tolerates: [],
            dislikes: [] 
        },
        jim: {
            likes: [],
            tolerates: [],
            dislikes: [] 
        }
    };
    //(function () {resetOpinions()}());
    var memberOpinions = document.getElementsByClassName("member-opinion");
    for (var i=0; i < memberOpinions.length; i++) {
        memberOpinions[i].addEventListener("click", function(e) {
            changeLikeValue(e);
        }, false);
    }
    var sortFoodButton = document.getElementById("categorize-food");
    sortFoodButton.addEventListener("click", function(e) {
        categorizeFood(members, knownFoods, e);
        showMemberChoices(members);
    }, false);
    var foodInput = document.getElementById("query-item");
    var food = document.getElementById("query-item").value;
    foodInput.addEventListener("keyup", function(e) {
        changeOpinionColors("0-query", "-opinion", knownFoods, members, e); 

    }, false);

}());
