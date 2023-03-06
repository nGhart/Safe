let outputUpper = document.getElementById("upper");
let outputLower = document.getElementById("lower");
let open = document.getElementById("open");
var keySound = document.getElementById("keySound");

//play sound when a number key is pressed
function playAudio() {
  keySound.play();
}

//display number pressed in output area
function press(e) {
  if (display.innerHTML === '0') {
    display.innerHTML = e.innerHTML;
    }
    else {
      display.innerHTML += e.innerHTML;
      //console.log(parseInt(display.innerHTML));
      playAudio();            
      }   
    }

//backspace - clear numbers one at a time
function pressClear() {
        display.innerHTML = display.innerHTML.slice(0, -1);
        playAudio(); 
}

//check if number guessed matches 1234 
function checkRandom() {
    let numb = parseInt(display.innerHTML);
    if (parseInt(display.innerHTML) == 1234){
        playAudio(); 
                openSafe();

            } else if(parseInt(display.innerHTML) != 2){
                console.log('tryagain');
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
