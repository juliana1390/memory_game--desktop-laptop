(function(){
       
    startGame();
    
    /* -------------------------------- STARTING the game -------------------------------- */
    function startGame(){
                
        // distributing the cards throughout the container
        for(var i = 0; i < 16; i++){

            var card = document.querySelector("#card" + i);
            
            card.style.left = i % 4 === 0? 10 + "px" : i % 4 * 150 + 10 + "px"; 

            if(i < 4){
                card.style.top = 0 + "px";
            } else if(i < 8){
                card.style.top = 150 + "px";
            }else if(i < 12){
                card.style.top = 300 + "px";
            } else{
                card.style.top = 450 + "px";
            }

        }
    }

}());
