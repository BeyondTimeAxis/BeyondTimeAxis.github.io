// ==UserScript==
// @name         AAO Alt Nametag Font
// @namespace    AAOnametags
// @version      1.2
// @description  Changes the fonts of nametags in AAO Trials
// @author       TimeAxis
// @match        *://www.aaonline.fr/player.php*
// @match        *://aaonline.fr/player.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var nametag_style = document.createElement('style');
    document.head.appendChild(nametag_style);

    nametag_style.textContent = `div.textbox .name {
            font: 9px aaDialogueText, sans-serif;
			line-height: 1;
        }
    `;

})();