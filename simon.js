//consts to assign colours
const RED = 0;
const RELM = document.getElementById('red');
const YELLOW = 1;
const YELM = document.getElementById('yellow');
const BLUE = 2;
const BELM = document.getElementById('blue');
const GREEN = 3;
const GELM = document.getElementById('green');
const STAGETIME = 600;
const NEWGAME = document.getElementById('newgame');
const GAMEBOARD = document.getElementById('gameboard');
const GAMEOVERBOARD = document.getElementById('gameover');
const SCOREBOARD = document.getElementById('score');
const OPACITY_HOVER = .33;
// list to hold all prior colours
var masterList = [];
// attempt logic
var countNumClicks = 0;
var score = 0;
// let's get the first turn going
nextFrame();
// detect clicks
YELM.addEventListener('click', testLogic);
BELM.addEventListener('click', testLogic);
RELM.addEventListener('click', testLogic);
GELM.addEventListener('click', testLogic);
NEWGAME.addEventListener('click', triggerNewGame);
document.addEventListener('keydown', triggerNewGame);

function testLogic(e) {
  var elementName = (event.target || event.srcElement).id;
  var elementId = getColorName(elementName);


  var elem = document.getElementById(elementName);

  if(masterList[countNumClicks] == elementId) {
    // audio
    if(elementName == 'green') {
      var audio = new Audio("sounds/green.mp3");
      audio.play();
    }

    elem.style.opacity = OPACITY_HOVER;
    setTimeout(function () {
      elem.style.opacity = 1
    }, STAGETIME);

    countNumClicks++;

    if(countNumClicks == masterList.length) {
      countNumClicks = 0;

      // update the score
      score++;
      SCOREBOARD.innerHTML = score;

      setTimeout(function() {
        nextFrame();
      }, (STAGETIME * 2.5));
    }

  } else {
    gameOver();
  }
}

function triggerNewGame(e) {
  // only respond to enter key
  if (e.keyCode !== 13) return;
  // reset everything
  countNumClicks = 0;
  masterList = [];
  // fix views
  GAMEBOARD.style.display = "block";
  GAMEOVERBOARD.style.display = "none";
  // ensure no animations from prior game occur in new game
  var highestTimeoutId = setTimeout(";");

  for (var i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i);
  }

  // render new frame
  nextFrame();
}

function gameOver() {
  var audio = new Audio("sounds/gameover.mp3").play();

  GAMEBOARD.style.display = "none";
  GAMEOVERBOARD.style.display = "block";

  score = 0;
  SCOREBOARD.innerHTML = 0;
}

function generateRandomColor() {
  var number = Math.floor(Math.random() * 4);
  switch(number) {
    case 0:
      return RED;
    break;
    case 1:
      return YELLOW;
    break;
    case 2:
      return BLUE;
    break;
    case 3:
      return GREEN;
    break;
  }
}

function getColorName(number) {
  switch(number) {
    case 'red':
      return 0;
    break;
    case 'yellow':
      return 1;
    break;
    case 'blue':
      return 2;
    break;
    case 'green':
      return 3;
    break;
    case 0:
      return 'red';
    break;
    case 1:
      return 'yellow';
    break;
    case 2:
      return 'blue';
    break;
    case 3:
      return 'green';
    break;
  }
}

function nextFrame() {
  masterList.push(generateRandomColor());
  // animate them
  var i = 1;
  masterList.forEach(function(elm) {
    // console.log("ELM-----: "+elm);
    var starttime = (i-1) * STAGETIME;
    // console.log("START TIME: " + starttime);
    var endtime = i * STAGETIME;
    // console.log("END TIME: " + endtime);

    setTimeout(function() {
      document.getElementById(getColorName(elm)).style.opacity = OPACITY_HOVER;
    }, starttime);
    setTimeout(function() {
      document.getElementById(getColorName(elm)).style.opacity = 1;
    }, endtime);

    i += 2;
  });
}
