// ==UserScript==
// @name         AAO Better Layout Script
// @namespace    AAObetterlayout
// @version      1.0
// @description  Changes the layout of AAO trials
// @author       TimeAxis
// @match        *://*aaonline.fr/player.php*
// @match        *://aaonline.fr/player.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var style = document.createElement('style');
    document.head.appendChild(style);

    var pixelStyles = '';
    var courtRecordStyles = '';
    var descriptionStyles = '';
    var zoomStyles = '';
    var nightStyles = '';

    var main_defaultStyles = `

        #screens {
            position: relative !important;
            left: 405px !important;
            transform: scale(1.5) !important;
            top: 110px !important;
        }

        #content {
            top: -30px !important;
            height: 900px !important;
        }

        header.compact {
            transform: scale(0.5) !important;
            left: -240px !important;
            top: -10px !important;
        }

        #courtrecord {
            right: 0px !important;
            left: 770px ;
            width: 300px !important;
        }

        #player-parametres {
            right: 0px !important;
            left: 10px ;
            width: 300px !important;
        }

		#screen-cr-item-check {
			left: -217px;
			width:520px;
			height: max-content;
			min-height: 350px;
		}
		
		#screens {
			z-index: 100 !important;
		}
		
		#cr_item_check {
			z-index: 101 !important;
			background-color: unset;
		}
    `;

    style.textContent = main_defaultStyles;

    // Create and append script settings form
    var scriptSettingsForm = document.createElement('form');
    scriptSettingsForm.id = 'aaonewlayout_settingsform';

    var scriptSettingsSection = document.createElement('section');
    scriptSettingsSection.innerHTML = `
        <h2>Script Settings</h2>
        <div id="script_settings">
            <label for="layout_pixelCheckbox" class="checkbox_label">
                <span class="form_element_container">
                    <input type="checkbox" id="layout_pixelCheckbox" name="layout_pixelCheckbox">
                </span>
                <span>Pixelated</span>
            </label>
            <label for="layout_mirrorCheckbox" class="checkbox_label">
                <span class="form_element_container">
                    <input type="checkbox" id="layout_mirrorCheckbox" name="layout_mirrorCheckbox">
                </span>
                <span>CourtRecord on Left</span>
            </label>
            <label for="layout_descriptionsCheckbox" class="checkbox_label">
                <span class="form_element_container">
                    <input type="checkbox" id="layout_descriptionsCheckbox" name="layout_descriptionsCheckbox">
                </span>
                <span>Expand Evidence Descriptions</span>
            </label>
            <label for="layout_zoomCheckbox" class="checkbox_label">
                <span class="form_element_container">
                    <input type="checkbox" id="layout_zoomCheckbox" name="layout_zoomCheckbox">
                </span>
                <span>2x Screen Size</span>
            </label>
			<label for="layout_nightCheckbox" class="checkbox_label">
                <span class="form_element_container">
                    <input type="checkbox" id="layout_nightCheckbox" name="layout_nightCheckbox">
                </span>
                <span>Night Mode</span>
            </label>
        </div>
    `;

    var settings = document.getElementById('player-parametres');
    if (settings) {
        settings.insertBefore(scriptSettingsForm, settings.firstChild.nextSibling.nextSibling);
        scriptSettingsForm.appendChild(scriptSettingsSection);

        // Add event listener to the checkbox
        var pixel_checkbox = document.getElementById('layout_pixelCheckbox');
        var mirror_checkbox = document.getElementById('layout_mirrorCheckbox');
        var desc_checkbox = document.getElementById('layout_descriptionsCheckbox');
        var zoom_checkbox = document.getElementById('layout_zoomCheckbox');
        var night_checkbox = document.getElementById('layout_nightCheckbox');

        pixel_checkbox.checked = loadCheckboxState('layout_pixelCheckbox');
        mirror_checkbox.checked = loadCheckboxState('layout_mirrorCheckbox');
        desc_checkbox.checked = loadCheckboxState('layout_descriptionsCheckbox');
        zoom_checkbox.checked = loadCheckboxState('layout_zoomCheckbox');
        night_checkbox.checked = loadCheckboxState('layout_nightCheckbox');

        pixel_checkbox.dispatchEvent(new Event('change'));
        mirror_checkbox.dispatchEvent(new Event('change'));
        desc_checkbox.dispatchEvent(new Event('change'));
        zoom_checkbox.dispatchEvent(new Event('change'));
        night_checkbox.dispatchEvent(new Event('change'));

        updateStyles();

        if (pixel_checkbox && mirror_checkbox && desc_checkbox && zoom_checkbox && night_checkbox) {
            pixel_checkbox.addEventListener('change', pixelCheckboxChange);
            mirror_checkbox.addEventListener('change', mirrorCheckboxChange);
            desc_checkbox.addEventListener('change', descriptionCheckboxChange);
            zoom_checkbox.addEventListener('change', zoomCheckboxChange);
            night_checkbox.addEventListener('change', nightCheckboxChange);

            // Initial check to set the style
            pixelCheckboxChange();
            mirrorCheckboxChange();
            descriptionCheckboxChange();
            zoomCheckboxChange();
        }
    }

    // Functions to handle checkbox changes
    function pixelCheckboxChange() {
        pixelStyles = `
            #screens {
                image-rendering: pixelated;
            }
        `;
        updateStyles();
        saveCheckboxState('layout_pixelCheckbox', pixel_checkbox.checked);
    }

    function mirrorCheckboxChange() {
        const isMirrorChecked = mirror_checkbox.checked;
        const isZoomChecked = zoom_checkbox.checked;

        courtRecordStyles = `
            #courtrecord {
                right: 10px !important;
                left: ${(!isMirrorChecked && !isZoomChecked) ? '770px' :
        (!isMirrorChecked && isZoomChecked) ? '870px' :
        '10px'} !important;
                width: 300px !important;
            }

            #player-parametres {
                right: 10px !important;
                left: ${(isMirrorChecked && !isZoomChecked) ? '770px' :
        (isMirrorChecked && isZoomChecked) ? '870px' :
        '10px'} !important;
                width: 300px !important;
            }
			
			#screen-cr-item-check {
				left: ${(!isMirrorChecked) ? '-217px' : '10px'} !important;
				width:520px !important;
				height: max-content !important;
				min-height: 350px !important;
			}
        `;

        updateStyles();
        saveCheckboxState('layout_mirrorCheckbox', mirror_checkbox.checked);
    }

    function descriptionCheckboxChange() {
        descriptionStyles = `
            .evidence-list .evidence_display .details .description {
				margin: 0 auto 15px !important;
                overflow-y: hidden !important;
                width: 252px !important;
				min-height: 33px;
            }

            .evidence-list .evidence_display .details {
                display: flex !important;
                padding-bottom: 18px !important;
                box-shadow: unset !important;
                overflow-y: hidden !important;
                height: auto !important;
                max-height: 44px !important;
                top: 3px !important;
                position: relative !important;
            }

            .evidence-list .evidence_display {
                height: 146px !important;
            }

			.evidence-list .evidence_display:hover .details,
			.evidence-list .evidence_display:active .details
			{
				display: block !important;
				position: relative !important;
				max-height: none !important;
			}
        `;

        updateStyles();
        saveCheckboxState('layout_descriptionsCheckbox', desc_checkbox.checked);
    }

    function zoomCheckboxChange() {
        const isZoomChecked = zoom_checkbox.checked;

        const initialStyles = `
            #screens {
                position: relative !important;
                left: 405px !important;
                transform: scale(1.5) !important;
                top: 110px !important;
            }

            #content {
                top: -30px !important;
                height: 900px !important;
            }
        `;

        zoomStyles = `
            #screens {
                position: relative !important;
                transform: scale(2) !important;
                left: 455px !important;
                top: 210px !important;
            }

            #content {
                top: -30px !important;
                height: 900px !important;
                width: 1200px !important;
                left: -100px !important;
            }
        `;

        updateStyles();
        saveCheckboxState('layout_zoomCheckbox', zoom_checkbox.checked);
        mirrorCheckboxChange();
    }

    function nightCheckboxChange() {
        nightStyles = `
            /* Night mode styles here */
            body {
				background-color: #000000 !important;
				color: #FFFFFF;
			}

			#player-parametres {
				background-color: #444444 !important;
				border: 1px solid #000000 !important;
			}

			header, h1, h2, h3, h4 {
				color: #FFFFFF !important;
			}

			header.compact {
				background-color: #333333 !important;
				background-image: unset !important;
			}

			#content {
				background-color: #333333 !important;
			}

			#content > section, #content > footer {
				background-color: #333333 !important;
			}

			section h2 {
				background-color: #000000 !important;
				background-image: unset !important;
				box-shadow: unset !important;
			}

			#screen-meta {
				background-color: #333333 !important;
				border: 1px solid darkgrey !important;
			}

			#player_debug .h3 {
				color: #FFFFFF !important;
			}

			#courtrecord {
				background-color: #444444 !important;
				border: 1px solid #000000 !important;
			}

			.evidence-list .evidence_display {
				background-color: #333333 !important;
				border: 1px solid #000000 !important;
			}

			.evidence-list .evidence_display .details {
				background-color: #333333 !important;
				border: 1px solid #000000 !important;
			}

			#screen-cr-item-check {
				background-color: #333 !important;
			}

			.buttonbar-bottom {
				background-color: #333 !important;
			}
        `;

        updateStyles();
        saveCheckboxState('layout_nightCheckbox', night_checkbox.checked);
    }

    function updateStyles() {
        style.textContent = `
        ${main_defaultStyles}
        ${pixel_checkbox.checked ? pixelStyles : ''}
        ${(mirror_checkbox.checked || zoom_checkbox.checked) ? courtRecordStyles : ''}
        ${desc_checkbox.checked ? descriptionStyles : ''}
        ${zoom_checkbox.checked ? zoomStyles : ''}
        ${night_checkbox.checked ? nightStyles : ''}
        `;
    }

    // Helper functions to save and load checkbox states from localStorage
    function saveCheckboxState(checkboxId, state) {
        localStorage.setItem(checkboxId, JSON.stringify(state));
    }

    function loadCheckboxState(checkboxId) {
        var state = localStorage.getItem(checkboxId);
        return state ? JSON.parse(state) : false;
    }

    setTimeout(function () {
        pixel_checkbox.dispatchEvent(new Event('change'));
        mirror_checkbox.dispatchEvent(new Event('change'));
        desc_checkbox.dispatchEvent(new Event('change'));
        zoom_checkbox.dispatchEvent(new Event('change'));
        night_checkbox.dispatchEvent(new Event('change'));
        updateStyles();
		console.log('AAO Better Layout Script Loaded');
    }, 3000);
})();