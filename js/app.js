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
let color;
let pacman;
let caught;

let yellowInterval;
let blueInterval;
let greenInterval;
let purpleInterval;

let directions;
let direction;

squareEls = document.querySelectorAll(".sqr");
scoreNumberEl = document.querySelector("#score-number");

pacman = document.querySelector(".pacman");

h1El = document.querySelector("h1");
buttonEl = document.querySelector("button");

// Ghost Position Values
let yellowData = { value: 0 };
let purpleData = { value: 15 };
let greenData = { value: 240 };
let blueData = { value: 255 };

let pacmanIdx = 151;

init = () => {

   clearInterval(yellowInterval);
   clearInterval(purpleInterval);
   clearInterval(greenInterval);
   clearInterval(blueInterval);

   removeAllCharacters();

   score = 0;
   scoreNumberEl.textContent = 0
   dots = true;
   caught = false;

   directions = ["up", "right", "down", "left"];
   direction = directions[Math.floor(Math.random() * directions.length)];

   // Reset Positions
   pacmanIdx = 151;

   yellowData.value = 0;
   purpleData.value = 15;
   greenData.value = 240;
   blueData.value = 255;

   addDots();

   h1El.style.visibility = "hidden";
   buttonEl.style.visibility = "hidden";

   // Add Characters
   squareEls[pacmanIdx].classList.add("pacman");

   squareEls[yellowData.value].classList.add("yellow-ghost");
   squareEls[purpleData.value].classList.add("purple-ghost");
   squareEls[greenData.value].classList.add("green-ghost");
   squareEls[blueData.value].classList.add("blue-ghost");

   // Start Movement
   yellowInterval = setInterval(() => {
      ghostMovement("yellow-ghost", yellowData, yellowInterval);
   }, 200);

   greenInterval = setInterval(() => {
      ghostMovement("green-ghost", greenData, greenInterval);
   }, 300);

   purpleInterval = setInterval(() => {
      ghostMovement("purple-ghost", purpleData, purpleInterval);
   }, 400);

   blueInterval = setInterval(() => {
      ghostMovement("blue-ghost", blueData, blueInterval);
   }, 500);
};

addDots = () => {

   squareEls.forEach((square) => {

      color = window.getComputedStyle(square, null)
         .getPropertyValue("background-color");

      if (color !== "rgb(0, 0, 255)") {
         square.classList.add("dot");
      }
   });

   squareEls[pacmanIdx].classList.remove("dot");
};

removeAllCharacters = () => {

   squareEls.forEach((square) => {

      square.classList.remove("pacman");
      square.classList.remove("yellow-ghost");
      square.classList.remove("green-ghost");
      square.classList.remove("purple-ghost");
      square.classList.remove("blue-ghost");
   });
};

pacMovement = (event) => {

   if (dots === false) return;
   if (caught === true) return;
   if (event.repeat === true) return;

   let nextIdx = pacmanIdx;

   switch (event.key) {

      case "ArrowDown":
         nextIdx += 16;
         break;

      case "ArrowUp":
         nextIdx -= 16;
         break;

      case "ArrowLeft":
         nextIdx -= 1;
         break;

      case "ArrowRight":
         nextIdx += 1;
         break;

      default:
         return;
   }

   // Wall Checks

   if (nextIdx < 0 || nextIdx > 255) return;

   if (
      event.key === "ArrowLeft" &&
      pacmanIdx % 16 === 0
   ) return;

   if (
      event.key === "ArrowRight" &&
      (pacmanIdx + 1) % 16 === 0
   ) return;

   if (
      window.getComputedStyle(squareEls[nextIdx], null)
         .getPropertyValue("background-color") === "rgb(0, 0, 255)"
   ) return;

   squareEls[pacmanIdx].classList.remove("pacman");

   pacmanIdx = nextIdx;

   squareEls[pacmanIdx].classList.add("pacman");

   // Dots

   if (squareEls[pacmanIdx].classList.contains("dot")) {

      squareEls[pacmanIdx].classList.remove("dot");

      score += 10;

      scoreNumberEl.textContent = score;
   }

   // Ghost Collision

   if (
      squareEls[pacmanIdx].classList.contains("yellow-ghost") ||
      squareEls[pacmanIdx].classList.contains("green-ghost") ||
      squareEls[pacmanIdx].classList.contains("purple-ghost") ||
      squareEls[pacmanIdx].classList.contains("blue-ghost")
   ) {

      loseGame();
   }

   // Check Win

   dots = false;

   for (let i = 0; i < squareEls.length; i++) {

      if (squareEls[i].classList.contains("dot")) {

         dots = true;
         break;
      }
   }

   if (dots === false) {

      h1El.textContent = "You win";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible";
   }
};

ghostMovement = (ghostClass, ghostData, intervalRef) => {

   if (dots === false || caught === true) {

      clearInterval(intervalRef);
      return;
   }

   let nextIdx = ghostData.value;

   switch (direction) {

      case "down":
         nextIdx += 16;
         break;

      case "up":
         nextIdx -= 16;
         break;

      case "left":
         nextIdx -= 1;
         break;

      case "right":
         nextIdx += 1;
         break;
   }

   // Invalid Move Checks

   let invalidMove = false;

   if (nextIdx < 0 || nextIdx > 255) {
      invalidMove = true;
   }

   if (
      direction === "left" &&
      ghostData.value % 16 === 0
   ) {
      invalidMove = true;
   }

   if (
      direction === "right" &&
      (ghostData.value + 1) % 16 === 0
   ) {
      invalidMove = true;
   }

   if (
      !invalidMove &&
      window.getComputedStyle(squareEls[nextIdx], null)
         .getPropertyValue("background-color") === "rgb(0, 0, 255)"
   ) {
      invalidMove = true;
   }

   // Change Direction if invalid

   if (invalidMove) {

      direction = directions[Math.floor(Math.random() * directions.length)];

      return;
   }

   // Move Ghost

   squareEls[ghostData.value].classList.remove(ghostClass);

   ghostData.value = nextIdx;

   squareEls[ghostData.value].classList.add(ghostClass);

   // Pacman Collision

   if (squareEls[ghostData.value].classList.contains("pacman")) {

      loseGame();
   }
};

loseGame = () => {

   caught = true;

   clearInterval(yellowInterval);
   clearInterval(blueInterval);
   clearInterval(greenInterval);
   clearInterval(purpleInterval);

   h1El.textContent = "You lose";

   h1El.style.visibility = "visible";

   buttonEl.style.visibility = "visible";
};

init();

window.addEventListener("keydown", pacMovement);

buttonEl.addEventListener("click", () => {

   init();
});



