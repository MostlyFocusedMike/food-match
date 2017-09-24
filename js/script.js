/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
    'use strict';
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
                icon = document.getElementById(elId).getElementsByTagName('i')[0];
                icon.textContent = "help_outline"; 
                break;
            case "like-value-1":
                icon = document.getElementById(elId).getElementsByTagName('i')[0];
                icon.textContent = "thumb_up"; 
                break;
            case "like-value-2":
                icon = document.getElementById(elId).getElementsByTagName('i')[0];
                icon.textContent = "thumbs_up_down"; 
                break;
            case "like-value-3":
                icon = document.getElementById(elId).getElementsByTagName('i')[0]; 
                icon.textContent = "thumb_down"; 
                break;
        }
       
    }


    var memberOpinions = document.getElementsByClassName("member-opinion");
    for (var i=0; i <memberOpinions.length; i++) {
        memberOpinions[i].addEventListener("click", function(e) {
            changeLikeValue(e);
        }, false);

    }


}());
