(function(){

    var images = [];

    var memorizeModal = document.querySelector("#memorizeModal");

    // pushing images to array "images"
    for(var i = 0; i < 16; i++){
        // object img
        var img = {
            src: "/assets/img/"+ i +".svg",
            id: i % 8
        };
        images.push(img);
    }
       
    startGame();
    
    /* -------------------------------- STARTING the game -------------------------------- */
    function startGame(){

        var frontFaces = document.getElementsByClassName("front");
                
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

            // adding click event 
            card.addEventListener("click", flipCard, false);

            // getting images
            frontFaces[i].style.background = "url('"+ images[i].src +"')";
            frontFaces[i].setAttribute("id", images[i].id);

        }

        memorizeModal.style.zIndex = -2;
        memorizeModal.removeEventListener("click", startGame,false);
    }
    /* ---------------------------------- FLIPPING cards ---------------------------------- */
    function flipCard(){
        var faces = this.getElementsByClassName("face");

        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");
    }

    /* ---------------------------------- warning Modal ---------------------------------- */
    window.setTimeout(function(){
        memorize();
    },200)

    function memorize(){
        memorizeModal.style.zIndex = 10;
        memorizeModal.addEventListener("click", startGame,false);
    }


}());
