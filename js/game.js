let canvas;
let world;
keyboard = new Keyboard();
intervalIds = [];
let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let fullscreenClickCounter = 0;
let backgroundSound = new Audio('./audio/background-sound.mp3');
let mobileGameBreak = false;

let gameOverSound = true;
let characterRunSounds = true;
let characterJumpSound = true;
let smashBottleSound = true;
let damageEndbossSound = true;
let collectCoinSound = true;
let collectBottleSound = true;
let throwingBottleSound = true;
let damageCharacterSound = true;
let damageChickenSound = true;
let endbossMusicSound = true;


function init() {
    stopGame();
}

setInterval(() => {
    checkOrientation();
}, 1000);

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, 'throw');
    backgroundSound.play();
    
    hideStartMenu();
    document.getElementById('after-start-game-container').style.display = 'flex';
}

function restartGame() {
    location.reload();
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({id, fn, time, isActive: true});
}

function stopGame() {
    intervalIds.forEach(interval => {
        if(interval.isActive)
        clearInterval(interval.id);
        interval.isActive = false;
    });
    mobileGameBreak = false;
}

function playGame() {
    intervals = intervalIds.map(interval => {
        if(!interval.isActive) {
            const newId = setInterval(interval.fn, interval.time);
            interval.id = newId;
            interval.isActive = true;
        }
        return interval; 
    });
    mobileGameBreak = true;
}

function muteSounds() {
   backgroundSound.pause();
   gameOverSound = false;
   characterRunSounds = false;
   characterJumpSound = false;
   smashBottleSound = false;
   damageEndbossSound = false;
   collectCoinSound = false;
   collectBottleSound = false;
   throwingBottleSound = false;
   damageCharacterSound = false;
   damageChickenSound = false;
   endbossMusicSound = false;

   document.getElementById('unmute-sounds').style.display = 'none';
   document.getElementById('mute-sounds').style.display = 'flex';
}

function unmuteSounds() {
   backgroundSound.play();
   gameOverSound = true;
   characterRunSounds = true;
   characterJumpSound = true;
   smashBottleSound = true;
   damageEndbossSound = true;
   collectCoinSound = true;
   collectBottleSound = true;
   throwingBottleSound = true;
   damageCharacterSound = true;
   damageChickenSound = true;
   endbossMusicSound = true;

   document.getElementById('unmute-sounds').style.display = 'flex';
   document.getElementById('mute-sounds').style.display = 'none';
}

function changeMuteToPlay() {
    document.getElementById('change-status-mute-play').innerHTML = `<img src="img/play-button.svg" onclick="playGame(), changePlayToMute()">`;
}

function changePlayToMute() {
    document.getElementById('change-status-mute-play').innerHTML = `<img src="img/pause-button.svg" onclick="stopGame(), changeMuteToPlay()">`;
}

// Mobile

function changeBreakToPlayMobile() {
    document.getElementById('mobile-change-status-mute-play').innerHTML = `<img src="img/play-button.svg" onclick="playGame(), changePlayToBreakMobile()">`;
}

function changePlayToBreakMobile() {
    document.getElementById('mobile-change-status-mute-play').innerHTML = `<img src="img/pause-button.svg" onclick="stopGame(), changeBreakToPlayMobile()">`;
}

function displayStartContainer() {
    document.getElementById('start-container').style.display = 'flex';  
    document.getElementById('mobile-gamecontrol').style.display = 'none';
}

function hideStartMenu() {
    document.getElementById('start-container').style.display = 'none';
    if(screenWidth <= 1000) {
        document.getElementById('mobile-gamecontrol').style.display = 'flex';
    }
}

function openFullscreen() {
    let element = document.getElementById('game-container'); 
    let canvas = document.getElementById('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // für IE11 (bis Juni 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // für iOS Safari
        element.webkitRequestFullscreen();
    }
    document.getElementById('open-fullscreen').style.display = 'none';
    document.getElementById('close-fullscreen').style.display = 'flex';
    if(screenWidth <= 1000) {
        document.getElementById('mobile-open-fullscreen').style.display = 'none';
        document.getElementById('mobile-close-fullscreen').style.display = 'flex';
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) { // für IE11 (bis Juni 2022)
        document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) { // für iOS Safari
        document.webkitExitFullscreen();
    }
    document.getElementById('open-fullscreen').style.display = 'flex';
    document.getElementById('close-fullscreen').style.display = 'none';
    if(screenWidth <= 1000) {
        document.getElementById('mobile-open-fullscreen').style.display = 'flex';
        document.getElementById('mobile-close-fullscreen').style.display = 'none';
    }
}


  function openDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'flex';
    stopGame();
    changeMuteToPlay();
  }

  function closeDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'none';
    playGame();
    changePlayToMute();
  }

document.addEventListener('keydown', (e) => {

    if(e.keyCode == 38) {
        keyboard.UP = true;
    } 

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

document.addEventListener('keyup', (e) => {
 
     if(e.keyCode == 38) {
         keyboard.UP = false;
     } 
 
     if(e.keyCode == 39) {
         keyboard.RIGHT = false;
     }
 
     if(e.keyCode == 37) {
         keyboard.LEFT = false;
     }
 
     if(e.keyCode == 40) {
         keyboard.DOWN = false;
     }
 
     if(e.keyCode == 32) {
         keyboard.SPACE = false;
     }

     if(e.keyCode == 68) {
        keyboard.D = false;
    }
 
 });

 function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      document.getElementById('game-container').style.display = 'none';
      document.getElementById('rotate-device').style.display = 'flex';
      document.getElementById('rotate-device').innerHTML = `
        <div class="rotate-container">
            <img src="./img/rotate-smartphone.svg">
            <h1>Turn your Device to play.</h1>
        </div>
      `;
      document.getElementById('mobile-menu-buttons').style.display = 'none';
    } else {
      // Derzeit im Querformat
      document.getElementById('game-container').style.display = 'flex';
      document.getElementById('rotate-device').style.display = 'none';
      if(screenWidth <= 1000) {
        document.getElementById('mobile-menu-buttons').style.display = 'flex';
      }
  }
  
  // Überwachen Sie die Änderung der Ausrichtung
  window.addEventListener('resize', checkOrientation);
 }


