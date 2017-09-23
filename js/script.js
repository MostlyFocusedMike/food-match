/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
    function changeLikeValue(e) {
        var elId = e.target.id,
        likeValClass = document.getElementById(elId).classList.item(1),
        newLikeVal = parseInt(likeValClass.slice(-1)) + 1,
        newLikeValClass;
        if (newLikeVal === 4) {
          newLikeVal = 0
        }
        newLikeValClass = likeValClass.slice(0, -1) + newLikeVal;
        document.getElementById(elId).classList.remove(likeValClass);
        document.getElementById(elId).classList.add(newLikeValClass);
        
    }
    function changeIcon(e) {
        var elId = e.target.classList.item(1);

        switch(elClass) {
            case "like-value-0":







        }

    } 


    memberOpinions = document.getElementsByClassName("member-opinion");
    for (var i=0; i <memberOpinions.length; i++) {
        memberOpinions[i].addEventListener("click", function(e) {
            changeLikeValue(e);

        }, false);

    }


}());
