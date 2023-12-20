// ==UserScript==
// @name         AAO Keyboard Controls
// @namespace    AAOKeyboardControls
// @version      1.2
// @description  Allow Enter/Space/Shift to be used in AAO
// @author       TimeAxis
// @match        *://www.aaonline.fr/player.php*
// @match        *://aaonline.fr/player.php*
// @grant        none
// ==/UserScript==

//////////////////////////////////////////////////////////
//                   KEYBOARD CONTROLS
//////////////////////////////////////////////////////////


// Define the key codes for arrow keys
const aaokeyboard_keyCodes = {
  enter: 13,
  space: 32,
  shift: 16,
};

// Function to check if an element is visible
function aaokeyboard_isVisible(element) {
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

// Define the target image source URLs for each arrow key
const aaokeyboard_targetImageSrcs = {
  enter: ["http://www.aaonline.fr/img/player/proceed.gif","http://www.aaonline.fr/img/player/skip.gif","http://aaonline.fr/img/player/proceed.gif","http://aaonline.fr/img/player/skip.gif","https://aaonline.fr/img/player/proceed.gif","https://aaonline.fr/img/player/skip.gif","https://www.aaonline.fr/img/player/proceed.gif","https://www.aaonline.fr/img/player/skip.gif","https://aaonline.fr/img/player/statement_forwards.gif","http://aaonline.fr/img/player/statement_forwards.gif","https://www.aaonline.fr/img/player/statement_forwards.gif","http://www.aaonline.fr/img/player/statement_forwards.gif","https://aaonline.fr/img/player/statement_skip_forwards.gif","http://aaonline.fr/img/player/statement_skip_forwards.gif","https://www.aaonline.fr/img/player/statement_skip_forwards.gif","http://www.aaonline.fr/img/player/statement_skip_forwards.gif"],
};

// Keep track of the Enter key press state and whether a click has been performed
let aaokeyboard_enterPressed = false;
let aaokeyboard_enterClicked = false;

// Function to simulate click on images with the target source URLs
function aaokeyboard_clickImagesWithSrc(srcArray) {
  const images = document.querySelectorAll('img');
  let clicked = false; // Flag to track if a click has been performed
  images.forEach(img => {
    if (aaokeyboard_isVisible(img) && aaokeyboard_isVisible(img.parentElement) && !clicked) {
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
  if ((keyCode === aaokeyboard_keyCodes.enter || keyCode === aaokeyboard_keyCodes.space) && !aaokeyboard_enterClicked && !aaokeyboard_enterPressed) {
    aaokeyboard_enterPressed = true;
    aaokeyboard_clickImagesWithSrc(aaokeyboard_targetImageSrcs.enter);
    aaokeyboard_enterClicked = true;
    event.preventDefault(); // Prevent default behavior
  }
  if (keyCode === aaokeyboard_keyCodes.shift) {
    aaokeyboard_enterPressed = false;
    aaokeyboard_enterClicked = false;
    aaokeyboard_clickImagesWithSrc(aaokeyboard_targetImageSrcs.enter);
    event.preventDefault(); // Prevent default behavior
  }
});

document.addEventListener("keyup", event => {
  const keyCode = event.keyCode;
  if (keyCode === aaokeyboard_keyCodes.enter) {
    aaokeyboard_enterPressed = false;
    aaokeyboard_enterClicked = false;
  }
  if (keyCode === aaokeyboard_keyCodes.space) {
    aaokeyboard_enterPressed = false;
    aaokeyboard_enterClicked = false;
  }
});