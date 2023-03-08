let open = document.getElementById("open");
var keySound = document.getElementById("keySound");
var siren = document.getElementById("siren");
let restart = document.getElementById("restart");
var timer = document.getElementById("timer");
let gameoverPopup = document.getElementById("gameover");
let timeCounter;
let redLight = document.getElementById("red");
let greenLight = document.getElementById("green");
let reveal = document.getElementById("answer");
let doorSound = document.getElementById("doorSound");
let muteSound = document.getElementById("muteSound");
let start = document.getElementById("start");
let muteMusic = document.getElementById("muteMusic");



//timer
function gametimer() {
  let time = 60;
  timeCounter = setInterval(function() {
    timer.innerText = time + "s";
      time--;
    if (time == 15 && time >= 0) {
      playMusic();
    } else if(time == 0){
      clearInterval(timeCounter);
      timer.innerText = "game over";
      pauseMusic();
    gameoverPopup.style.visibility = "visible";
    reveal.innerHTML = "The code was: " + arr;
    }
}, 1000);
}

//play music
function playMusic() {
  siren.play();
  } 

  //pause music
  function pauseMusic(){
    siren.pause();
  }
//play sound when a number key is pressed
function playAudio() {
  keySound.play();
}

// mute keypad sound
function muteKeypad() {
    keySound.volume = 0.0;
}
//changes
//play sound when safe opens
function playSafe() {
  doorSound.play();
}

//get user input from keypad
let inputOne = document.getElementById("input1").innerText;
let inputTwo = document.getElementById("input2");
let inputThree = document.getElementById("input3");
let currentInput = 1;
const inputs = [document.getElementById("input1"),
                document.getElementById("input2"),
                document.getElementById("input3"),];

                let userInput = "";

                function addKey(key) {
                  if (key == "#") {
                    console.log(userInput);
                    userInput = "";
                    for (let i = 0; i < 3; i++) {
                      inputs[i].value = "";
                    }
                    currentInput = 1;
                  } else {
                    if (currentInput <= 3) {
                      userInput += key;
                      inputs[currentInput-1].value = key;
                      currentInput++;
                      setTimeout(playAudio, 10);
                    }
                  }
                }
                
                function clearInput() {
                  if (currentInput > 1) {
                    currentInput--;
                    userInput = userInput.slice(0, -1);
                    inputs[currentInput-1].value = "";
                    setTimeout(playAudio, 10);
                  }
                }
//random array
let arr = [];

for (let i = 0; i < 3; i++) {
  const randomDigit = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
    .slice(-1);
  arr.push(Number(randomDigit));
}


//check if number guessed matches
function checkRandom() {
    console.log(userInput);
    let numb = userInput;
    const newArr = Array.from(String(userInput), Number);
    lastGuess.innerHTML = numb;
    playAudio();
    let hint = document.getElementsByTagName("h4")
    
    for (let i = 0; i < 3; i++) {
        if (newArr[i] === arr[i]) {
            console.log(`Element ${i} is ok`);
            hint[i].innerHTML = `Element (${i}) is correct`;
            redLight.style.backgroundColor = "rgb(48, 18, 18);";
            greenLight.style.backgroundColor = "#22f032";
        } else if (newArr[i] > arr[i]) {
            console.log(`Element ${i} H`);
            hint[i].innerHTML = `Element (${i}) is high`;
            redLight.style.backgroundColor = "#f72119";
            greenLight.style.backgroundColor = "rgb(41, 65, 41)";
        } else if (newArr[i] < arr[i]) {
            console.log(`Element ${i} L`);
            hint[i].innerHTML = `Element (${i}) is low`;
            redLight.style.backgroundColor = "#f72119";
            greenLight.style.backgroundColor = "rgb(41, 65, 41)";
        }
    }
    
    showMessage();

    if (newArr[0] == arr[0] && newArr[1] == arr[1] && newArr[2] == arr[2]) {
        redLight.style.backgroundColor = "rgb(48, 18, 18);";
        greenLight.style.backgroundColor = "#22f032";
        clearInterval(timeCounter);
        pauseMusic();
        setTimeout(playSafe, 100);
        timer.innerText = "win";
        setTimeout(openSafe, 2000);
    } else {
        console.log("try again");
    }
}

//open safe
function openSafe() {
  openSafeDoor();
  setTimeout(hideBackOfSafe, 200);
}
//this opens safe door
function openSafeDoor() {
  open.classList.toggle("openSafe");
}
//this hides back of safe be plain
let hide = document.getElementById("hide");
function hideBackOfSafe() {
  hide.style.visibility = "hidden";
}

//restart game during play
restart.addEventListener("click", function (e) {
  e.preventDefault();
  location.reload();
});

//restart game after game over
function reset() {
  gameoverPopup.style.visibility = "hidden";
  location.reload();
}
//display all previous guesses
var prevGuess=[];
var oldGuesses = document.getElementById("oldGuesses");
function showMessage(){
prevGuess.push(lastGuess.innerHTML);
oldGuesses.innerHTML= prevGuess.join(", ");
}

//hide start modal
function hideStartModal() {
  start.style.visibility = "hidden";
}
