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
let yellowMovement;
let color;
let innit;
let pacman;
let pacMovement;
let pacPosition;
let handleWin;
let removePacman;
let removeYellow;
let removeGreen;
let removePurple;
let removeBlue;
let directions;
let direction;
let pacmanIdx;
let yellowIdx;
let yellow;
let yellowInterval;
let blueInterval;
let greenInterval;
let purpleInterval;
let purple;
let green;
let blue;
let purpleIdx;
let greenIdx;
let blueIdx;
let blueMovement;
let greenMovement;
let purpleMovement;
let caught;


squareEls = document.querySelectorAll(".sqr");
scoreEl = document.querySelector("#score");
scoreNumberEl = document.querySelector("#score-number");
pacman = document.querySelector(".pacman");
h1El = document.querySelector("h1");
buttonEl = document.querySelector("button");
yellow = document.querySelector(".yellow-ghost");
green = document.querySelector(".green-ghost");
purple = document.querySelector(".purple-ghost");
blue = document.querySelector(".blue-ghost");



pacmanIdx = Number(pacman.id.split("-")[1]);
yellowIdx = Number(yellow.id.split("-")[1]);
greenIdx = Number(green.id.split("-")[1]);
purpleIdx = Number(purple.id.split("-")[1]);
blueIdx = Number(blue.id.split("-")[1]);


init = () => {
   removePacman();
   removeYellow();
   removeGreen();
   removeBlue();
   removePurple();
   clearInterval(yellowInterval);
   clearInterval(purpleInterval);
   clearInterval(greenInterval);
   clearInterval(blueInterval);
   score = 0;
   addDots();
   dots = true;
   caught = false;
   squareEls[151].classList.add("pacman");
   h1El.style.visibility = "hidden";
   buttonEl.style.visibility = "hidden";
   squareEls[0].classList.add("yellow-ghost");
   squareEls[15].classList.add("purple-ghost");
   squareEls[240].classList.add("green-ghost");
   squareEls[255].classList.add("blue-ghost");
   yellowInterval = setInterval(yellowMovement, 200);
   greenInterval = setInterval(greenMovement, 300);
   purpleInterval = setInterval(purpleMovement, 400);
   blueInterval = setInterval(blueMovement, 500);
   directions = ["up", "right", "down", "left"]
   direction  = directions[Math.floor(Math.random() * directions.length)];
   
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
   h1El.textContent = "You win"
   buttonEl.style.visibility = "visible";
}

removePacman = () => {
   pacmanIdx = 151;
   squareEls.forEach((square) => {
      square.classList.remove("pacman");
   });
};

removeYellow = () => {
   YellowIdx = 0;
   squareEls.forEach((square) => {
      square.classList.remove("yellow-ghost");
   });
};

removeGreen = () => {
   greenIdx = 240;
   squareEls.forEach((square) => {
      square.classList.remove("green-ghost");
   });
};

removePurple = () => {
   purpleIdx = 15;
   squareEls.forEach((square) => {
      square.classList.remove("purple-ghost");
   });
};

removeBlue = () => {
   blueIdx = 255;
   squareEls.forEach((square) => {
      square.classList.remove("blue-ghost");
   });
};

pacMovement = (event) => {
   if (dots === false) {return};
   if (caught === true) {return};
   if (event.repeat === true) {return}; 
   switch (event.key) {
        
      case "ArrowDown":
      if (pacmanIdx + 16 > 255) {return};
      if (window.getComputedStyle( squareEls[pacmanIdx + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         return
      };
      squareEls[pacmanIdx + 16].classList.add("pacman");
      break;
        
      case "ArrowUp":
      if (pacmanIdx - 16 < 0) {return};
      if (window.getComputedStyle( squareEls[pacmanIdx - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         return;
      }
      squareEls[pacmanIdx - 16].classList.add("pacman");
      break;
        
      case "ArrowLeft":
      if (pacmanIdx - 1 < 0) {return};
      if (pacmanIdx % 16 === 0) {return};
      if (window.getComputedStyle( squareEls[pacmanIdx - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         return;
      }
      squareEls[pacmanIdx -1].classList.add("pacman");
      break;
        
      case "ArrowRight":
      if (pacmanIdx + 1 > 255) {return};
      if ((pacmanIdx + 1) % 16 === 0) {return};
      if (window.getComputedStyle( squareEls[pacmanIdx + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         return;
      }
      squareEls[pacmanIdx + 1].classList.add("pacman");
      break;
      }
   squareEls[pacmanIdx].classList.remove("pacman");
   pacman = document.querySelector(".pacman");
   pacmanIdx = Number(pacman.id.split("-")[1]);
   if (squareEls[pacmanIdx].classList.contains("dot")) {
      squareEls[pacmanIdx].classList.remove("dot");
      score += 10;
      scoreNumberEl.textContent = score;
   };
   
   if (squareEls[pacmanIdx].classList.contains("yellow-ghost")||squareEls[pacmanIdx].classList.contains("green-ghost") || squareEls[pacmanIdx].classList.contains("purple-ghost")|| squareEls[pacmanIdx].classList.contains("blue-ghost")  ) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
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
   if (squareEls[pacmanIdx].classList.contains("yellow-ghost")||squareEls[pacmanIdx].classList.contains("green-ghost") || squareEls[pacmanIdx].classList.contains("purple-ghost")|| squareEls[pacmanIdx].classList.contains("blue-ghost")  ) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
   };
}

// directions = ["up", "right", "down", "left"]
// direction  = directions[Math.floor(Math.random() * directions.length)];

yellowMovement = () => {
   if (dots === false) {return};
   if (caught === true) {
      clearInterval(yellowInterval);
      return;
   };
   //if (event.repeat === true) {return}; 
   switch (direction) {
        
      case "down":
      if (yellowIdx + 16 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[yellowIdx + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      squareEls[yellowIdx + 16].classList.add("yellow-ghost");
      break;
        
      case "up":
      if (yellowIdx - 16 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[yellowIdx - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[yellowIdx - 16].classList.add("yellow-ghost");
      break;
        
      case "left":
      if (yellowIdx - 1 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (yellowIdx % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[yellowIdx - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[yellowIdx -1].classList.add("yellow-ghost");
      break;
        
      case "right":
      if (yellowIdx + 1 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if ((yellowIdx + 1) % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[yellowIdx + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[yellowIdx + 1].classList.add("yellow-ghost");
      break;
   };
   squareEls[yellowIdx].classList.remove("yellow-ghost");
   yellow = document.querySelector(".yellow-ghost");
   yellowIdx = Number(yellow.id.split("-")[1]);
   //squareEls[yellowIdx].classList.remove("yellow-ghost");
   if (squareEls[yellowIdx].classList.contains("pacman")) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
   };
};


greenMovement = () => {
   if (dots === false) {return};
   if (caught === true) {
      clearInterval(greenInterval);
      return;
   } 
   switch (direction) {
        
      case "down":
      if (greenIdx + 16 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[greenIdx + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      squareEls[greenIdx + 16].classList.add("green-ghost");
      break;
        
      case "up":
      if (greenIdx - 16 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[greenIdx - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[greenIdx - 16].classList.add("green-ghost");
      break;
        
      case "left":
      if (greenIdx - 1 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (greenIdx % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[greenIdx - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[greenIdx -1].classList.add("green-ghost");
      break;
        
      case "right":
      if (greenIdx + 1 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if ((greenIdx + 1) % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[greenIdx + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[greenIdx + 1].classList.add("green-ghost");
      break;
   };
   squareEls[greenIdx].classList.remove("green-ghost");
   green = document.querySelector(".green-ghost");
   greenIdx = Number(green.id.split("-")[1]);
   if (squareEls[greenIdx].classList.contains("pacman")) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
   };
};


purpleMovement = () => {
   if (dots === false) {return};
   if (caught === true) {
      clearInterval(purpleInterval);
      return;
   }  
   switch (direction) {
        
      case "down":
      if (purpleIdx + 16 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[purpleIdx + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      squareEls[purpleIdx + 16].classList.add("purple-ghost");
      break;
        
      case "up":
      if (purpleIdx - 16 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[purpleIdx - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[purpleIdx - 16].classList.add("purple-ghost");
      break;
        
      case "left":
      if (purpleIdx - 1 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (purpleIdx % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[purpleIdx - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[purpleIdx -1].classList.add("purple-ghost");
      break;
        
      case "right":
      if (purpleIdx + 1 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if ((purpleIdx + 1) % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[purpleIdx + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[purpleIdx + 1].classList.add("purple-ghost");
      break;
   };
   squareEls[purpleIdx].classList.remove("purple-ghost");
   purple = document.querySelector(".purple-ghost");
   purpleIdx = Number(purple.id.split("-")[1]);
   if (squareEls[purpleIdx].classList.contains("pacman")) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
   };
};

blueMovement = () => {
   if (dots === false) {return};
   if (caught === true) {
      clearInterval(blueInterval);
      return;
   }  
   switch (direction) {
        
      case "down":
      if (blueIdx + 16 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[blueIdx + 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      squareEls[blueIdx + 16].classList.add("blue-ghost");
      break;
        
      case "up":
      if (blueIdx - 16 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[blueIdx - 16] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[blueIdx - 16].classList.add("blue-ghost");
      break;
        
      case "left":
      if (blueIdx - 1 < 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (blueIdx % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[blueIdx - 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[blueIdx -1].classList.add("blue-ghost");
      break;
        
      case "right":
      if (blueIdx + 1 > 255) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if ((blueIdx + 1) % 16 === 0) {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      };
      if (window.getComputedStyle( squareEls[blueIdx + 1] ,null).getPropertyValue('background-color') === "rgb(0, 0, 255)") {
         direction  = directions[Math.floor(Math.random() * directions.length)];
         return;
      }
      squareEls[blueIdx + 1].classList.add("blue-ghost");
      break;
   };
   squareEls[blueIdx].classList.remove("blue-ghost");
   blue = document.querySelector(".blue-ghost");
   blueIdx = Number(blue.id.split("-")[1]);
   if (squareEls[blueIdx].classList.contains("pacman")) {
      caught = true;
      clearInterval(yellowInterval);
      clearInterval(blueInterval);
      clearInterval(greenInterval);
      clearInterval(purpleInterval);
      h1El.textContent = "You lose";
      h1El.style.visibility = "visible";
      buttonEl.style.visibility = "visible"
   };
};
init();

window.addEventListener("keydown", pacMovement);
buttonEl.addEventListener("click", () => {
   init();
});



