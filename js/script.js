/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
    function changeLikeValue(e) {
        var elId = e.target.id,
        likeValClass = document.getElementById(elId).classList.item(1),
        newLikeVal = parseInt(likeValClass.slice(-1)) + 1,
        newLikeValClass, icon;
        if (newLikeVal === 4) {
          newLikeVal = 0
        }
        newLikeValClass = likeValClass.slice(0, -1) + newLikeVal;
        document.getElementById(elId).classList.remove(likeValClass);
        document.getElementById(elId).classList.add(newLikeValClass);
            
        switch(newLikeValClass) {
            case "like-value-0":
                 //selects the first child element whith tag i
                icon = document.querySelector("#" + elId + " > i");
                icon.textContent = "help_outline"; 
                break;
            case "like-value-1":
                icon = document.querySelector("#" + elId + " > i");
                icon.textContent = "thumb_up"; 
                break;
            case "like-value-2":
                icon = document.querySelector("#" + elId + " > i");
                icon.textContent = "thumbs_up_down"; 
                break;
            case "like-value-3":
                icon = document.querySelector("#" + elId + " > i");
                icon.textContent = "thumb_down"; 
                break;
        }
       
    }

    function categorizeFood(users, e) {
        var food = document.getElementById("query-item").value;
        for (var user in users){
            likeValue = document.getElementById(user + "-opinion").classList[1];
            
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
                case "like-value-0": //uknown
                    break;
                case "like-value-1": //like
                    users[user].likes.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
                case "like-value-2": //will eat
                    users[user].willEats.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
                case "like-value-3": //dislike
                    users[user].dislikes.unshift(food);
                    console.log(user);
                    console.log(users[user]);
                    break;
            }

        }

    } 
    
    
    
    
    
    
    
    
    
    
      /*
        var elId = e.target.id;
        var username = document.querySelector("#" + elId + " > p").textContent;
        var food = document.getElementById("query-item").value;
        users[username].likes.unshift(food);
        window.alert(users[username].likes[0]);
        */





    
    //OOOpkp var users = {
            //carol: {
             //   likes: ["ham", "cheese", "bread"],
             //   dislikes: ["garlic"]
          //  }
       // }

//////////////////////////////////////////////////////////////////////////////////
    var users = {
        carol: {
            likes: [],
            willEats: [],
            dislikes: [] 
        },
        ray: {
            likes: [],
            willEats: [],
            dislikes: [] 
        },
        bob: {
            likes: [],
            willEats: [],
            dislikes: [] 
        },
        jim: {
            likes: [],
            willEats: [],
            dislikes: [] 
        }
    };
    var memberOpinions = document.getElementsByClassName("member-opinion");
    for (var i=0; i <memberOpinions.length; i++) {
        memberOpinions[i].addEventListener("click", function(e) {
            changeLikeValue(e);
        }, false);

    }
    var sortFoodButton = document.getElementById("categorize-food");
    sortFoodButton.addEventListener("click", function(e) {
        categorizeFood(users, e);

    }, false);

}());
