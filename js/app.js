/*   user stories
I want a start game button that starts the game
I want the game to not start straight away and give a countdown
I want the game to respond to my keys without delay
I want the ghosts to behave differently so that the game is not boring(optional)
I want to have sounds that play for different actions that happen(optional)
I want to see my score update every time I gain points
I want to have different ways to gain points(optional)
I want to a have obstacles for the characters to traverse around and not an empty screen
I want to see my number of lives to update
I want there to be multiple levels with increasing difficulty(optional)
I want the game to notify me with a message when the game ends and show my score
I want the game to record my highest score and show it to me(optional)


     considerations
.In pac-man, the 4 ghosts actually behave diffferently (chase mode):
The red directly chases you, the pink tries to get ahead and "ambush" you, the blue works in a rather complex way tbh
and the orange chases you like the red ghost but once it gets too close to pac-man it runs away to the bottom-left 
portion of the screen 

there are three modes:
chase mode
scatter mode
frightened mode

      pseudocode
                   
    Variables

let score;
let lives;
let items;
let dots;
let grid; 
let 
    functions

init - starts game
.movementRed - movement for red ghost
.movementPink - movement for pink ghost
.movementBlue - movement for blue ghost
.movementOrange - movement for orange ghost
.restart - restart game function
.loseLife - handles logic for when pac-man loses a life
.swichMode - handles logic for when pac-man eats flashing food
and turns ghosts into frightened mode
.chaseMode - handles logic for chase mode which is majority of the time 
.
    User Interactions

.add a click event listener to the start game button which runs the init function
.Turn start game button into a reset button once first game is done(or once button is first clicked)
.add an arrow key event listener which listens to key events while the game is active
and moves the pac-man character accordingly


    Game Ending

.game ends when lives = 0, score is shown and reset button (or play agin button) is shown

*/
let score;
let dots;
let ghostMovement;
let color;
let innit;
let pacman;
let pacMovement;
let pacPosition;
let handleWin;
let removePacman;


squareEls = document.querySelectorAll(".sqr");
scoreEl = document.querySelector("#score");
scoreNumberEl = document.querySelector("#score-number");
pacman = document.querySelector(".pacman");
h1El = document.querySelector("h1");
buttonEl = document.querySelector("button");


index = Number(pacman.id.split("-")[1]);


init = () => {
    removePacman();
    score = 0;
    addDots();
    dots = true;
    squareEls[151].classList.add("pacman");
    h1El.style.visibility = "hidden";
    buttonEl.style.visibility = "hidden";
}

addDots = () => {
    squareEls.forEach((square) => {
        color=window.getComputedStyle( square ,null).getPropertyValue('background-color');
        if (color !== "rgb(0, 0, 255)" ) {
            square.classList.add("dot");
    }
});
    squareEls[151].classList.remove("dot");
}
// let pacmanX = 5;
// let pacmanY = 5;
// pacman.style.left = pacmanX + 'px';
// pacman.style.top = pacmanY + 'px';
//console.log(pacPosition.top, pacPosition.right, pacPosition.bottom, pacPosition.left);
// let i = 0;
// while (i < 50) {
// console.log(i);
// i++;
// }

//56.40000

handleWin = () => {
    if (dots) {return};
    h1El.style.visibility = "visible";
    buttonEl.style.visibility = "visible";
}

removePacman = () => {
    index = 151;
    squareEls.forEach((square) => {
        square.classList.remove("pacman");
    });
};


pacMovement = (event) => {
    if (dots === false) {return};
    //if (event.repeat === true) {return}; 
    switch (event.key) {
        
        case "ArrowDown":
        if (index + 16 > 255) {return};
        if (window.getComputedStyle( squareEls[index + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
            return
        };
        squareEls[index + 16].classList.add("pacman");
        break;
        
        case "ArrowUp":
        if (index - 16 < 0) {return};
        if (window.getComputedStyle( squareEls[index - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
            return;
        }
        squareEls[index - 16].classList.add("pacman");
        break;
        
        case "ArrowLeft":
        if (index - 1 < 0) {return};
        if (index % 16 === 0) {return};
        if (window.getComputedStyle( squareEls[index - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
            return;
        }
        squareEls[index -1].classList.add("pacman");
        break;
        
        case "ArrowRight":
        if (index + 1 > 255) {return};
        if ((index + 1) % 16 === 0) {return};
        if (window.getComputedStyle( squareEls[index + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
            return;
        }
        squareEls[index + 1].classList.add("pacman");
        break;
        }
    squareEls[index].classList.remove("pacman");
    pacman = document.querySelector(".pacman");
    index = Number(pacman.id.split("-")[1]);
    if (squareEls[index].classList.contains("dot")) {
        squareEls[index].classList.remove("dot");
        score += 10;
        scoreNumberEl.textContent = score;
    };
    
    for (let i = 0; i < squareEls.length; i++) {
        if (squareEls[i].classList.contains("dot")){
            return    
        }
        if (i === 255) {
            if (squareEls[i].classList.contains("dot") === false) {
                dots = false;
            }
        };
    };
    handleWin();
}
        
   


init();

window.addEventListener("keydown", pacMovement);
buttonEl.addEventListener("click", () => {
    init();
});




