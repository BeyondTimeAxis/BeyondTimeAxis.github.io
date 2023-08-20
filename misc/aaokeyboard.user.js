// ==UserScript==
// @name         AAO Keyboard Controls
// @namespace    AAOKeyboardControls
// @version      1.0
// @description  Allow Enter/Space/Ctrl to be used in AAO
// @author       TimeAxis
// @match        https://aaonline.fr/player.php?*
// @grant        none
// ==/UserScript==

//////////////////////////////////////////////////////////
//                   KEYBOARD CONTROLS
//////////////////////////////////////////////////////////


// Define the key codes for arrow keys
const keyCodes = {
  enter: 13,
  space: 32,
  ctrl: 17,
};

// Function to check if an element is visible
function isVisible(element) {
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

// Define the target image source URLs for each arrow key
const targetImageSrcs = {
  enter: ["http://www.aaonline.fr/img/player/proceed.gif","http://www.aaonline.fr/img/player/skip.gif","http://aaonline.fr/img/player/proceed.gif","http://aaonline.fr/img/player/skip.gif","https://aaonline.fr/img/player/proceed.gif","https://aaonline.fr/img/player/skip.gif","https://www.aaonline.fr/img/player/proceed.gif","https://www.aaonline.fr/img/player/skip.gif","https://aaonline.fr/img/player/statement_forwards.gif","http://aaonline.fr/img/player/statement_forwards.gif","https://www.aaonline.fr/img/player/statement_forwards.gif","http://www.aaonline.fr/img/player/statement_forwards.gif","https://aaonline.fr/img/player/statement_skip_forwards.gif","http://aaonline.fr/img/player/statement_skip_forwards.gif","https://www.aaonline.fr/img/player/statement_skip_forwards.gif","http://www.aaonline.fr/img/player/statement_skip_forwards.gif"],
};

// Keep track of the Enter key press state and whether a click has been performed
let enterPressed = false;
let enterClicked = false;

// Function to simulate click on images with the target source URLs
function clickImagesWithSrc(srcArray) {
  const images = document.querySelectorAll('img');
  let clicked = false; // Flag to track if a click has been performed
  images.forEach(img => {
    if (isVisible(img) && isVisible(img.parentElement) && !clicked) {
      // Perform case-insensitive comparison of URLs
      const imgSrc = img.src.toLowerCase();
      srcArray.forEach(src => {
        if (imgSrc === src.toLowerCase()) {
          img.click();
          clicked = true; // Set the flag to prevent multiple clicks
          return; // Break out of loop after clicking the first visible image
        }
      });
    }
  });
}

document.addEventListener("keydown", event => {
  const keyCode = event.keyCode;
  if ((keyCode === keyCodes.enter || keyCode === keyCodes.space) && !enterClicked && !enterPressed) {
    enterPressed = true;
    clickImagesWithSrc(targetImageSrcs.enter);
    enterClicked = true;
    event.preventDefault(); // Prevent default behavior
  }
  if (keyCode === keyCodes.ctrl) {
    enterPressed = false;
    enterClicked = false;
    clickImagesWithSrc(targetImageSrcs.enter);
    event.preventDefault(); // Prevent default behavior
  }
});

document.addEventListener("keyup", event => {
  const keyCode = event.keyCode;
  if (keyCode === keyCodes.enter) {
    enterPressed = false;
    enterClicked = false;
  }
  if (keyCode === keyCodes.space) {
    enterPressed = false;
    enterClicked = false;
  }
});