(function(){

    var images = [];

    var memorizeModal = document.querySelector("#memorizeModal");

    var matches = 0;

    var fails = 0;

    var imgMatchSign = document.querySelector("#imgMatchSign");

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
    
    /* --------------------------------- STARTING the game --------------------------------- */
    function startGame(){

        images = randomSort(images);

        flippedCards = [];

        matches = 0;

        fails = 0;

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");
                
        // distributing the cards throughout the container
        for(var i = 0; i < 16; i++){

            frontFaces[i].classList.remove("flipped", "match");
            backFaces[i].classList.remove("flipped", "match");

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
        
    }
    /* ------------------------------ randomly SORTING cards ------------------------------- */
    function randomSort(images){
        
        var sorted = [];

        while(sorted.length !== images.length){
            var i = Math.floor(Math.random() * images.length);

            if(sorted.indexOf(images[i]) < 0){
                sorted.push(images[i]);
            }
        }

        return sorted;
    }
    /* ----------------------------------- SHOWING cards ----------------------------------- */
    
    window.setTimeout(function(){
        showCards();
    },3500);

    function showCards(){
      
        var faces =  document.getElementsByClassName("face");
        
        for(i = 0; i < 32; i++){
            faces[i].classList.toggle("flipped");
        }
            
        setTimeout(function (){
            for(i = 0; i < 32; i++){
                faces[i].classList.toggle("flipped");
            }
        },10000);
    }
    /* ---------------------------------- FLIPPING cards ---------------------------------- */
    function flipCard(){
        
        // when less the 2 cards was clicked
        if(flippedCards.length < 2){

            var faces = this.getElementsByClassName("face");

            // it avoids functional double click in the same card
            if(faces[0].classList.length > 2){
                return;
            }

            // switching faces class to flipped  
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");

            // taking clicked cards to flippedCards array
            flippedCards.push(this);

            // when two cards were already clicked
            if(flippedCards.length === 2){

                // a match was made
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){

                    //switching faces class to match
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    // symbol shown when a match is made
                    matchCardSign();

                    // adding the class "pair" to "match"
                    flippedCards[0].childNodes[1].classList.add("pair");
                    flippedCards[0].childNodes[3].classList.add("pair");
                    flippedCards[1].childNodes[1].classList.add("pair");
                    flippedCards[1].childNodes[3].classList.add("pair");

                    removeHover()

                    matches++;

                    // array is now empty again
                    flippedCards = [];

                    getMatches();

                    // it call's the victory's page when 8 matches are made
                    if(matches === 8){
                        victory();
                    }
                }
            }
            
        }else{
            // in case of no match
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            // emptying array
            flippedCards = [];
            
            fails++;
            getFails(fails);
        }        
    }
    /* ---------------------------------- COUNTING POINTS --------------------------------- */
    /** Function for counting the points
        * @param {number} fails
        * receive the number of fails
        * final score = 50 - (fails*2)
        * Never under 50
        */
    function getFails(){        
        var initial_points = document.getElementById("points").textContent;
        initial_points = parseInt(initial_points);

        if(initial_points > 50){
            pts = initial_points - 1; // - 1 point per fail
            document.getElementById("points").innerHTML =  pts;
        }
    }
    function getMatches(){        
        var initial_points = document.getElementById("points").textContent;
        initial_points = parseInt(initial_points);
        pts = initial_points + 6; // more 6 points per match
        document.getElementById("points").innerHTML =  pts;
    }
    /* ------------------------------------ MATCH check ------------------------------------ */
    function matchCardSign(){
        imgMatchSign.style.zIndex = 1;        
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + "px";
            imgMatchSign.style.opacity = 1;
        },2000);
    }
    /* ------------------------- Remove the shine effect from pair ------------------------- */
    function removeHover(){
        let info = [];
        for(i = 0; i < 16; i++){
           info[i] = document.getElementById("card" + i); // taking the cards
        }
        for(i = 0; i < info.length; i++){
            info[i] = info[i].childNodes[3]; // turning into "front face"
            if(info[i].id === flippedCards[0].childNodes[3].id){
                info[i].parentNode.style.boxShadow = "none"; // removing hover
            }
        }
        console.log(info);
        info = [];
    }
    /* ----------------------------------- warning Modal ----------------------------------- */
    window.setTimeout(function(){
        memorizeModal.style.zIndex = 10;
    },100);

    window.setTimeout(function(){
        memorizeModal.style.zIndex = -2;
    },3000);
    /* --------------------------------- call VICTORY page --------------------------------- */
    function victory(){
        let points = document.querySelector("#points").innerHTML;
        sessionStorage.setItem("points", points);

        window.location.replace("victory.html");  
    }
}());
