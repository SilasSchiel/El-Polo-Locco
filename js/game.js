let canvas;
let world;
keyboard = new Keyboard();
intervalIds = [];
let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let fullscreenClickCounter = 0;
let backgroundSound = new Audio('./audio/background-sound.mp3');
let mobileGameBreak = true;

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

/**
 * 
 * An interval that checks whether the device is in portrait or landscape format.
 */
setInterval(() => {
    checkOrientation();
}, 1000);

/**
 * 
 * Start the Game.
 */
function startGame() {
    createNewWorld();
    backgroundSound.play();
    hideStartMenu();
    showAfterStartGameContainer();
}

/**
 * 
 * Create a new World.
 */
function createNewWorld() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, 'throw');
}

/**
 * 
 * Shows the buttons used during the game (pause, control and reload).
 */
function showAfterStartGameContainer() {
    document.getElementById('after-start-game-container').style.display = 'flex';
}

/**
 * 
 * Restart the Game.
 */
function restartGame() {
    location.reload();
}

/**
 * 
 * @param {function} fn - Functions that have an interval are passed here.
 * @param {number} time - Time for the Interval.
 * This function saves all intervals in an array so that you can stop them
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({id, fn, time, isActive: true});
}

/**
 * 
 * Function to stop all Intervals.
 */
function stopGame() {
    intervalIds.forEach(interval => {
        if(interval.isActive)
        clearInterval(interval.id);
        interval.isActive = false;
    });
}

/**
 * 
 * After stopping the game, the game should be started again.
 */
function playGame() {
    intervals = intervalIds.map(interval => {
        if(!interval.isActive) {
            const newId = setInterval(interval.fn, interval.time);
            interval.id = newId;
            interval.isActive = true;
        }
        return interval; 
    });
}

/**
 * 
 * Stops the game sounds
 */
function muteSounds() {
   backgroundSound.pause();
   switchIconsToMuteSounds();

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
}

/**
 * 
 * Changes the icons when the sounds are stopped.
 */
function switchIconsToMuteSounds() {
    document.getElementById('unmute-sounds').style.display = 'none';
    document.getElementById('mute-sounds').style.display = 'flex';
}

/**
 * 
 * Plays the game sounds.
 */
function unmuteSounds() {
   backgroundSound.play();
   switchIconsToUnmuteSouns();
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
}

/**
 * 
 * Changes the icons when the sounds are played.
 */
function switchIconsToUnmuteSouns() {
    document.getElementById('unmute-sounds').style.display = 'flex';
    document.getElementById('mute-sounds').style.display = 'none';
}

/**
 * 
 * Change the Icons if the game is stopped.
 */
function changeMuteToPlay() {
    document.getElementById('pause-btn').style.display = 'none';
    document.getElementById('play-btn').style.display = 'flex';
}

/**
 * 
 * Change the Icons if the game is played.
 */
function changePlayToMute() {
    document.getElementById('pause-btn').style.display = 'flex';
    document.getElementById('play-btn').style.display = 'none';
}

// Mobile

/**
 * 
 * For the mobile version, the game can be stopped.
 */
function changeBreakToPlayMobile() {
    switchIconToBreak();
    mobileGameBreak = true;
}

/**
 * 
 * Changes the icons when the game is stopped.
 */
function switchIconToBreak() {
    document.getElementById('mobile-play-btn').style.display = 'none';
    document.getElementById('mobile-break-btn').style.display = 'flex';
}


/**
 * 
 * For the mobile version, the game can be played.
 */
function changePlayToBreakMobile() {
    switchIconToPlay();
    mobileGameBreak = false;
}

/**
 * 
 * Changes the icons when the game is played.
 */
function switchIconToPlay() {
    document.getElementById('mobile-play-btn').style.display = 'flex';
    document.getElementById('mobile-break-btn').style.display = 'none';
}

/**
 * 
 * Displays the home screen.
 */
function displayStartContainer() {
    document.getElementById('start-container').style.display = 'flex';  
    document.getElementById('mobile-gamecontrol').style.display = 'none';
}

/**
 * 
 * Does not display the home screen.
 */
function hideStartMenu() {
    document.getElementById('start-container').style.display = 'none';
    if(screenWidth <= 1000) {
        document.getElementById('mobile-gamecontrol').style.display = 'flex';
    }
}

/**
 * 
 * Changes the game to fullscreen mode.
 */
function openFullscreen() {
    let element = document.getElementById('game-container'); 
    changeCanvasToFullscreen();
    apiToChangeToFullscreen(element);
    changeIconsToCloseFullscreen();
    changeIconsToCloseFullscreenMobile();
}

/**
 * 
 * Resizes the canvas 100%.
 */
function changeCanvasToFullscreen(){
    let canvas = document.getElementById('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
}

/**
 * 
 * Activates the JS API to activate full screen in the browser
 */
function apiToChangeToFullscreen() {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // für IE11 (bis Juni 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // für iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * 
 * Changes the icon for closing fullscreen mode.
 */
function changeIconsToCloseFullscreen() {
    document.getElementById('open-fullscreen').style.display = 'none';
    document.getElementById('close-fullscreen').style.display = 'flex';
}

/**
 * 
 * Mobile: Changes the icon for closing fullscreen mode.
 */
function changeIconsToCloseFullscreenMobile() {
    if(screenWidth <= 1000) {
        document.getElementById('mobile-open-fullscreen').style.display = 'none';
        document.getElementById('mobile-close-fullscreen').style.display = 'flex';
    }
}

/**
 * 
 * Close the fullscreen mode.
 */
function closeFullscreen() {
    apiToCloseFullscreen();
    changesIconsToOpenFullscreen();
    changesIconsToOpenFullscreenMobile();
    changesCanvasSizeToMobile();
}

/**
 * 
 * API to close the Fullscreen in the browser.
 */
function apiToCloseFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) { // für IE11 (bis Juni 2022)
        document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) { // für iOS Safari
        document.webkitExitFullscreen();
    }
}

/**
 * 
 * Changes Icon to open fullscreen.
 */
function changesIconsToOpenFullscreen() {
    document.getElementById('open-fullscreen').style.display = 'flex';
    document.getElementById('close-fullscreen').style.display = 'none';
}

/**
 * 
 * Mobile: Changes Icon to open fullscreen.
 */
function changesIconsToOpenFullscreenMobile() {
    if(screenWidth <= 1000) {
        document.getElementById('mobile-open-fullscreen').style.display = 'flex';
        document.getElementById('mobile-close-fullscreen').style.display = 'none';
    }
}

/**
 * 
 * After closing the fullscreen mode, the canvas should be changed to a certain size from a certain breakpoint.
 */
function changesCanvasSizeToMobile() {
    if(screenWidth <= 1000) {
        let canvas = document.getElementById('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100vh';
    }
}

/**
 * 
 * Opens a popup window that explains the game controls.
 */
function openDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'flex';
    stopGame();
    changeMuteToPlay();
}

/**
 * 
 * Closes a popup window that explains the game controls.
 */
function closeDirectionPopUp() {
    document.getElementById('detail-directions-container').style.display = 'none';
    playGame();
    changePlayToMute();
}

document.addEventListener('keydown', (e) => {

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

/**
 * 
 * Checks whether the mobile device is in portrait or landscape format
 */
function checkOrientation() {
    if (checkIfMobileDeviceInPortrait()) {
        ifMobilePortrait();
    } else {
        ifMobileLandscape();
  }
}

/**
 * 
 * @returns - If query whether the device is in portrait format.
 */
function checkIfMobileDeviceInPortrait() {
    return window.matchMedia("(orientation: portrait)").matches
}

/**
 * 
 * If it is in portrait format.
 */
function ifMobilePortrait() {
    hideGameContainer();
    hideMenuButtons()
    showRotateDeviceContainer();
}

/**
 * 
 * Hide the Game Container (if the mobile device in portrait format).
 */
function hideGameContainer() {
    document.getElementById('game-container').style.display = 'none';
}

/**
 * 
 * Show the Rotate Device Container (if the mobile device in portrait format).
 */
function showRotateDeviceContainer() {
    document.getElementById('rotate-device').style.display = 'flex';
}

/**
 * 
 * Hide the menu Buttons that are displayed during the game.
 */
function hideMenuButtons() {
    document.getElementById('mobile-menu-buttons').style.display = 'none';
}

/**
 * 
 * If it is in landscape format.
 */
function ifMobileLandscape() {
    showGameContainer();
    hideRotateDeviceContainer();
    showMenuButtons()
}

/**
 * 
 * Show the Game Container (if the mobile device in landscape format).
 */
function showGameContainer() {
    document.getElementById('game-container').style.display = 'flex';
}

/**
 * 
 * Hide the Rotate Device Container (if the mobile device in  format).
 */
function hideRotateDeviceContainer() {
    document.getElementById('rotate-device').style.display = 'none';
}

/**
 * 
 * Show the menu Buttons that are displayed during the game.
 */
function showMenuButtons() {
    if(screenWidth <= 1000) {
        document.getElementById('mobile-menu-buttons').style.display = 'flex';
    }
}