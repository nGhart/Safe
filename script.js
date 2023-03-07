let outputUpper = document.getElementById("upper");
let outputLower = document.getElementById("lower");
let open = document.getElementById("open");
var keySound = document.getElementById("keySound");
var siren = document.getElementById("siren");
let restart = document.getElementById("restart");
var timer = document.getElementById("timer");
let gameoverPopup = document.getElementById("gameover");
let interval;
let redLight = document.getElementById("red");
let greenLight = document.getElementById("green");

function game() {
  let time = 40;

  interval = setInterval(function(){
    timer.innerText = time + " s";
    time-- ;
    if (time == 15) {
      playMusic();
    } else if(time == 0){
      clearInterval(interval);
      timer.innerText = " ";
      muteMusic();
      gameoverPopup.style.visibility = "visible";

    }
  }, 1000);
}

//mute music
function playMusic() {
  siren.play();
  }

function muteMusic() {
  siren.pause();
}  
//play sound when a number key is pressed
function playAudio() {
  keySound.play();
}


let currentInput = 1;
const inputs = [document.getElementById("input1"),
                document.getElementById("input2"),
                document.getElementById("input3"),
                document.getElementById("input4")];
let code = "";

function addKey(key) {
  if (key == "#") {
    console.log("Code entered: " + code);
    // Here you can do whatever you want with the code entered
    code = "";
    for (let i = 0; i < 4; i++) {
      inputs[i].value = "";
    }
    currentInput = 1;
  } else {
    if (currentInput <= 4) {
      code += key;
      inputs[currentInput-1].value = key;
      currentInput++;
      playAudio(); 
    }
  }
}

//backspace - clear numbers one at a time
function pressClear() {
  
        playAudio(); 
}

//random array
let arr = [];

for (let i = 0; i < 4; i++) {
  const randomDigit = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
    .slice(-1);
  arr.push(Number(randomDigit));
}

console.log(arr); 

//check if number guessed matches
function checkRandom() {
    let numb = parseInt(display.innerHTML);
    /*let firstHint = document.getElementById("firstDigit");
    let secondHint = document.getElementById("secondDigit");
    let thirdHint = document.getElementById("thirdDigit");
    let fourthHint = document.getElementById("fourthDigit");
    let lastGuess = document.getElementById("lastGuess");*/
    let hint = document.getElementsByTagName("h4")
    
            const newArr = Array.from(String(numb), Number);
            console.log(newArr);
            console.log(arr);
            lastGuess.innerHTML = numb;


          
for (let i = 0; i < 4; i++) {
    if (newArr[i] === arr[i]) {
      console.log(`Element ${i} is ok`);
      hint[i].innerHTML = `Element ${i} is ok`;
      redLight.style.backgroundColor = "rgb(48, 18, 18);";
      greenLight.style.backgroundColor = "#22f032";
    } else if (newArr[i] > arr[i]) {
      console.log(`Element ${i} is too high`);
      hint[i].innerHTML = `Element ${i} too high`;
      redLight.style.backgroundColor = "#f72119";
      greenLight.style.backgroundColor = "rgb(41, 65, 41)";
    } else if (newArr[i] < arr[i]) {
      console.log(`Element ${i} is too low`);
      hint[i].innerHTML = `Element ${i} is too low`;
      redLight.style.backgroundColor = "#f72119";
      greenLight.style.backgroundColor = "rgb(41, 65, 41)";
    }
  }
}

//function to rotate safe dial
var looper;
var degrees = 0;
var speed = 1;
function turnDial() {
    var dial = document.getElementById("dial");
    dial.style.transform = "rotate("+degrees+"deg)";
    looper = setTimeout("turnDial(\''+dial+'\','+speed+')",speed);
    degrees++;
    if(degrees>359){
        degrees = 1;
    }
}

//open safe
function openSafe() {
  open.style.transform = "perspective(1000px) rotateY(-90deg) scale(0.7)"
}

//restart game
restart.addEventListener("click", function (e) {
  e.preventDefault();
  location.reload();
});
//restart game after game over
function reset() {
  gameoverPopup.style.visibility = "hidden";
}
var entries=[];
var display_message = document.getElementById("display_message");
function showMessage(){
var message = hint[i].innerHTML;
entries.push(message);
display_message.innerHTML= entries.join(",");
}
