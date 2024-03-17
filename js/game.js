let canvas;
let world;
keyboard = new Keyboard();
intervalIds = [];

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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
}

function playGame() {
    intervals = intervalIds.map(interval => {
        if(!interval.isActive) {
            // Da das alte Intervall bereits gestoppt ist, starten wir ein neues
            const newId = setInterval(interval.fn, interval.time);
            interval.id = newId;
            interval.isActive = true;
        }
        return interval; 
    });
}

function changeMuteToPlay() {
    document.getElementById('change-status-mute-play').innerHTML = `<img src="img/play-button.svg" onclick="playGame(), changePlayToMute()">`;
}

function changePlayToMute() {
    document.getElementById('change-status-mute-play').innerHTML = `<img src="img/pause-button.svg" onclick="stopGame(), changeMuteToPlay()">`;
}

function displayStartContainer() {
    document.getElementById('start-container').style.display = 'flex';  
}

function hideStartMenu() {
    document.getElementById('start-container').style.display = 'none';
}

function openFullscreen() {
    let fullscreen = document.getElementById('game-container');
    let canvas = document.getElementById('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function openDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'flex';
    stopGame();
  }

  function closeDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'none';
    playGame();
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