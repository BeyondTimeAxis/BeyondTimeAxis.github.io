// ==UserScript==
// @name         TimeAxis AAO Phoenix Wright: Ace Attornauts
// @namespace    TimeAxisAAOAceAttornauts
// @version      1.0
// @description  Enhance the experience of certain AAO trials
// @author       TimeAxis
// @match        https://aaonline.fr/player.php?trial_id=145800*
// @grant        none
// ==/UserScript==

function init() {
    console.log("Script init() function started.");

    /////////////////////////////////////////////////
    //                   STYLE
    /////////////////////////////////////////////////

    // Define the @font-face rule to load the custom font
    var fontFaceRule = `
  @font-face {
    font-family: 'MGS2MENU';
    src: url('https://BeyondTimeAxis.github.io/aao/contest/5/MGS2MENU.WOFF') format('woff'),
         url('https://BeyondTimeAxis.github.io/aao/contest/5/MGS2MENU.TTF') format('truetype');
  }

  .textbox.bottom {
    min-height: unset !important;
  }

  .dialogue {
    min-height: unset !important;
    border: unset !important;
    border-radius: unset !important;
    width: 248px !important;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)) !important;
    z-index: 0;
    text-shadow:
    0px 0.25px 0 #000,
    0.25px 0px 0 #000,
    0px -0.25px 0 #000,
    -0.25px 0px 0 #000,
    0.25px 0.25px 0 #000,
    -0.25px -0.25px 0 #000,
    0.25px -0.25px 0 #000,
    -0.25px 0.25px 0 #000,
    0px 0.5px 0 #000,
    0.5px 0px 0 #000,
    0px -0.5px 0 #000,
    -0.5px 0px 0 #000,
    0.5px 0.5px 0 #000,
    -0.5px -0.5px 0 #000,
    0.5px -0.5px 0 #000,
    -0.5px 0.5px 0 #000,
    0px 0.75px 0 #000,
    0.75px 0px 0 #000,
    0px -0.75px 0 #000,
    -0.75px 0px 0 #000,
    0.75px 0.75px 0 #000,
    -0.75px -0.75px 0 #000,
    0.75px -0.75px 0 #000,
    -0.75px 0.75px 0 #000,
    0px 1px 0 #000,
    1px 0px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    0px 1.25px 0 #000,
    1.25px 0px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    1.25px 1.25px 0 #000,
    -1px -1px 0 #000,
    1.25px -1px 0 #000,
    -1px 1.25px 0 #000,
    0px 1.5px 0 #000,
    1.5px 0px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    1.5px 1.5px 0 #000,
    -1px -1px 0 #000,
    1.5px -1px 0 #000,
    -1px 1.5px 0 #000,
    0px 1.75px 0 #000,
    1.75px 0px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    1.75px 1.75px 0 #000,
    -1px -1px 0 #000,
    1.75px -1px 0 #000,
    -1px 1.75px 0 #000,
    0px 2px 0 #000,
    2px 0px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    2px 2px 0 #000,
    -1px -1px 0 #000,
    2px -1px 0 #000,
    -1px 2px 0 #000,
    0px -1px 0 #000,
    -1px -1px 0 #000,
    2px -1px 0 #000,
    -1px 2px 0 #000,
    0px 2px 0 #000,
    2px 2px 0 #000,
    -1px 0px 0 #000,
    0px -1px 0 #000,
    -1px 2px 0 #000,
    0px -1px 0 #000,
    -1px -1px 0 #000,
    1.5px -1px 0 #000,
    -1px 2px 0 #000,
    1.5px 2px 0 #000,
    0px -1px 0 #000,
    -1px -1px 0 #000,
    1.125px -1px 0 #000,
    -1px 2px 0 #000,
    1.125px 2px 0 #000,
    0px -1px 0 #000,
    -1px -1px 0 #000,
    2px -1px 0 #000,
    -1px 1.5px 0 #000,
    2px 1.5px 0 #000,
    -1px -1px 0 #000,
    2px -1px 0 #000,
    -1px 1.125px 0 #000,
    2px 1.125px 0 #000;
  }
`;

    // Apply the @font-face rule
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(fontFaceRule));
    document.head.appendChild(style);

    // Function to change background color and text color of elements
    function modifyStyles(element) {
        element.style.backgroundColor = 'black';
        element.style.color = 'white';
    }

    // Function to process elements
    function processElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.tagName === 'A') {
                element.style.color = '#0077CC';
            } else {
                modifyStyles(element);
            }
        });
    }

    // Modify body, head, h1, h2, and section elements
    processElements('body, head, h1, h2, section');

    // Modify the "content" div
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        modifyStyles(contentDiv);
    }

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const end = document.getElementById('end');
    const topScreen = document.getElementById('screen-top');
    const bottomScreen = document.getElementById('screen-bottom');
    const examScreen = document.getElementById('screen-examination');
    const button = document.getElementById('wait');
    const check = document.getElementById('screen-cr-item-check');
    const checkContents = document.getElementById('cr-item-check-contents');
    const checkPagination = document.getElementById('cr-item-check-pagination');
    const buttonBarTop = document.querySelectorAll('.buttonbar-top');
    const buttonBarBottom = document.querySelectorAll('.buttonbar-bottom');
    const optionsDiv = document.getElementById('options');

    title.style.font = "30px courier, sans-serif";
    end.style.font = "16px MGS2MENU, sans-serif";
    end.style.opacity = "1";
    author.style.font = "18px courier, sans-serif";
    setTimeout(function(){
        author.innerHTML = "Team TIMEAXIS Translations";
        end.innerHTML = "To be<br/>continued...";
    }, 2000)


    function getElementByStartingString (elements, searchString) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML.startsWith(searchString)) {
                return elements[i];
            }
        }
        return null;
    }

    function handleDOMChanges(mutationsList, observer) {
        aElements = optionsDiv.querySelectorAll('a');

        // Apply CSS options to each element in the updated array
        aElements.forEach(function (element) {
            element.style.margin = "unset";
            element.style.backgroundColor = "unset";
            element.style.border = "unset";
            element.style.borderColor = "unset";
            element.style.borderRadius = "unset";
            element.style.boxShadow = "unset";
            if(element.innerHTML.endsWith("[x]")){
                element.innerHTML = element.innerHTML.slice(0, -3);
                element.style.color = "#808080";
                element.isGrey = true;
            } else {
                if (element.isGrey){
                    element.style.color = "#808080";
                } else {
                    element.style.color = "white";
                }
            }
            element.style.display = "block";
            element.style.marginLeft = "10px";
            element.style.padding = "0px";
            element.style.minHeight = "16px";
            element.style.fontSize = "12px";
            element.style.textAlign = "left";
            element.style.marginBottom = "0px";
            element.style.marginTop = "0px";
            element.style.position = "relative";
            element.style.font = "12px aaDialogueText, sans-serif";
        });
    }

    var optionObserver = new MutationObserver(handleDOMChanges);

    // Configure the observer to watch for changes in the optionsDiv
    var observerConfig = { childList: true, subtree: true };
    optionObserver.observe(optionsDiv, observerConfig);

    // Initial population of the aElements array
    var aElements = optionsDiv.querySelectorAll("a");

    checkContents.style.bottom = 'unset';
    checkPagination.style.bottom = 'unset';
    check.style.bottom = 'unset';

    topScreen.style.transform = 'scale(2)';
    topScreen.style.imageRendering = 'pixelated';
    bottomScreen.style.transform = 'scale(2)';
    bottomScreen.style.imageRendering = 'pixelated';
    examScreen.style.transform = 'scale(2)';
    examScreen.style.imageRendering = 'pixelated';

    // Move the element by adjusting its CSS position properties
    topScreen.style.position = 'relative';
    topScreen.style.left = '128px';
    topScreen.style.top = '64px';
    topScreen.style.boxShadow = 'unset';


    // Move the element by adjusting its CSS position properties
    bottomScreen.style.position = 'relative';
    bottomScreen.style.left = '640px';
    bottomScreen.style.top = '-138px';
    bottomScreen.style.backgroundImage = 'unset';
    bottomScreen.style.boxShadow = 'unset';

    examScreen.style.position = 'relative';
    examScreen.style.left = '640px';
    examScreen.style.top = '-138px';
    examScreen.style.boxShadow = 'unset';
    examScreen.style.userSelect = 'none';
    examScreen.style.userDrag = 'none';
    examScreen.style.webkitUserDrag = 'none';

    // Get all elements with the class 'bs-button'
    const bsButtons = document.querySelectorAll('.bs-button');

    buttonBarTop.forEach(bar => {
        bar.style.backgroundColor = 'black';
        bar.style.borderBottom = '2px solid #FFFFFF';
    });

    buttonBarBottom.forEach(bar => {
        bar.style.backgroundColor = 'black';
        bar.style.borderTop = '2px solid #FFFFFF';
    });

    // Loop through each element and change the background color to black
    bsButtons.forEach(button => {
        button.style.backgroundColor = 'black';
        button.style.border = 'unset';
        button.style.boxShadow = 'unset';
    });

    //Get court record and saves
    const courtRecord = document.getElementById('courtrecord');
    const saves = document.getElementById('player-parametres');

    // Get all elements with the class 'evidence-list'
    const evidenceList = document.querySelectorAll('.evidence-list');

    // Loop through each element and fix the bottoms
    evidenceList.forEach(evidenceListElement => {
        evidenceListElement.style.bottom = 'unset';
    });

    courtRecord.style.position = 'absolute';
    courtRecord.style.bottom = 'unset';
    courtRecord.style.top = '450px';
    saves.style.position = 'absolute';
    saves.style.bottom = 'unset';
    saves.style.top = '450px';
    saves.style.backgroundColor = 'black';
    saves.style.border = 'unset';

    // Fix Image Drag
    function disableImageDrag() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.draggable = false;
        });
    }
    disableImageDrag();
    // MutationObserver to handle dynamically added images
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedImages = mutation.addedNodes;
                addedImages.forEach(node => {
                    if (node.nodeName === 'IMG') {
                        node.draggable = false;
                    }
                });
            }
        }
    });

    // Start observing changes to the document
    observer.observe(document.body, { childList: true, subtree: true });

    //////////////////////////////////////////////////////////
    //                   DIFFERENT BLIPS
    //////////////////////////////////////////////////////////

    var maxRetries = 100; // Maximum number of retries
    var retryCount = 0;

    function waitForSoundHowler() {
        if (typeof SoundHowler !== "undefined") {
            // SoundHowler is defined, you can proceed with your code
            console.log("SoundHowler loaded");
            loadSounds();
            retryCount = 0;
        } else {
            // SoundHowler is not defined yet, check again after 2 seconds
            retryCount++;
            if (retryCount <= maxRetries) {
                setTimeout(waitForSoundHowler, 2000);
            } else {
                alert("Could not load SoundHowler");
            }
        }
    }

    // Start waiting for SoundHowler
    waitForSoundHowler();

    function loadSounds() {
        var voice1 = SoundHowler.getSoundById('voice_-1');
        var voice2 = SoundHowler.getSoundById('voice_-2');
        var voice3 = SoundHowler.getSoundById('voice_-3');

        if (voice1 !== null && voice2 !== null && voice3 !== null) {
            // All sounds are loaded, you can execute your code here
            console.log("Sounds loaded");
            SoundHowler.unloadSound('voice_-1');
            SoundHowler.unloadSound('voice_-2');
            SoundHowler.unloadSound('voice_-3');

            for(var i = 1; i <= 3; i++) {
                var voice_id = 'voice_-' + i;
                SoundHowler.registerSound(voice_id, {
                    urls: ['https://BeyondTimeAxis.github.io/aao/contest/5/voice_blip' + i + '.opus', 'https://aaonline.fr/voices/voice_' + -i + '.wav', 'https://aaonline.fr/voices/voice_' + -i + '.mp3'],
                    loop: false,
                    volume: 100
                });
            }
        } else {
            // Some sounds are still null, retry after 2 seconds
            retryCount++;
            if (retryCount <= maxRetries) {
                setTimeout(loadSounds, 2000);
            } else {
                alert("Could not change blip sounds");
            }
        }
    }

    //////////////////////////////////////////////////////////
    //                   KEYBOARD CONTROLS
    //////////////////////////////////////////////////////////


    // Define the key codes for arrow keys
    const keyCodes = {
        enter: 13,
        space: 32,
        digit1: 49,
        digit2: 50,
        digit3: 51,
        digit4: 52,
        digit5: 53,
        digit6: 54,
        digit7: 55,
        digit8: 56,
        digit9: 57,
        digit0: 48,
        numpad1: 97,
        numpad2: 98,
        numpad3: 99,
        numpad4: 100,
        numpad5: 101,
        numpad6: 102,
        numpad7: 103,
        numpad8: 104,
        numpad9: 105,
        numpad0: 96,
    };

    // Function to check if an element is visible
    function isVisible(element) {
        if(element instanceof Element || element instanceof HTMLDocument) {
            const style = getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden';
        } else {
            return false;
        }
    }

    // Define the target image source URLs
    const targetImageSrcs = {
        enter: ["http://www.aaonline.fr/img/player/proceed.gif","http://www.aaonline.fr/img/player/skip.gif","http://aaonline.fr/img/player/proceed.gif","http://aaonline.fr/img/player/skip.gif","https://aaonline.fr/img/player/proceed.gif","https://aaonline.fr/img/player/skip.gif","https://www.aaonline.fr/img/player/proceed.gif","https://www.aaonline.fr/img/player/skip.gif",],
        examine: ["https://beyondtimeaxis.github.io/aao/contest/5/check.png","http://beyondtimeaxis.github.io/aao/contest/5/check.png",],
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

    function clickOptionLinkStartingWith(searchString) {
        const clickTarget = getElementByStartingString(aElements, searchString);
        if(isVisible(clickTarget) && isVisible(clickTarget.parentElement)) {
            clickTarget.click();
        }
    }

    // Event listener for keydown
    document.addEventListener("keydown", event => {
        const keyCode = event.keyCode;
        if ((keyCode === keyCodes.enter || keyCode === keyCodes.space) && !enterClicked && !enterPressed) {
            enterPressed = true;
            clickImagesWithSrc(targetImageSrcs.enter);
            enterClicked = true;
            event.preventDefault(); // Prevent default behavior
        } else if (keyCode === keyCodes.digit1 || keyCode === keyCodes.numpad1) {
            clickOptionLinkStartingWith('1.');
        } else if (keyCode === keyCodes.digit2 || keyCode === keyCodes.numpad2) {
            clickOptionLinkStartingWith('2.');
        } else if (keyCode === keyCodes.digit3 || keyCode === keyCodes.numpad3) {
            clickOptionLinkStartingWith('3.');
        } else if (keyCode === keyCodes.digit4 || keyCode === keyCodes.numpad4) {
            clickOptionLinkStartingWith('4.');
        } else if (keyCode === keyCodes.digit5 || keyCode === keyCodes.numpad5) {
            clickOptionLinkStartingWith('5.');
        } else if (keyCode === keyCodes.digit6 || keyCode === keyCodes.numpad6) {
            clickOptionLinkStartingWith('6.');
        } else if (keyCode === keyCodes.digit7 || keyCode === keyCodes.numpad7) {
            clickOptionLinkStartingWith('7.');
        } else if (keyCode === keyCodes.digit8 || keyCode === keyCodes.numpad8) {
            clickOptionLinkStartingWith('8.');
        } else if (keyCode === keyCodes.digit9 || keyCode === keyCodes.numpad9) {
            clickOptionLinkStartingWith('9.');
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
}

window.addEventListener('load', function () {
    init(); // Call the init function after the window has loaded
});

console.log("Script loaded.");