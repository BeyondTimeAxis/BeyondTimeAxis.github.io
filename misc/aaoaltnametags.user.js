// ==UserScript==
// @name         AAO Alt Nametag Font
// @namespace    AAOnametags
// @version      1.0
// @description  Changes the fonts of nametags in AAO Trials
// @author       TimeAxis
// @match        *://*aaonline.fr/player.php*
// @match        *://aaonline.fr/player.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var nametag_style = document.createElement('style');
    document.head.appendChild(nametag_style);

    nametag_style.textContent = `div.textbox .name {
            font: 10px aaDialogueText, sans-serif;
			line-height: 1;
        }
    `;

})();