// ==UserScript==
// @name         AAO Backlog Script
// @namespace    AAOlogscript
// @version      1.2
// @description  Adds a Backlog button to AAO trials
// @author       TimeAxis
// @match        *://www.aaonline.fr/player.php*
// @match        *://aaonline.fr/player.php*
// @grant        none
// ==/UserScript==

function logscript_init() {
    console.log("logscript_init() function started.");

	const logscript_oldproceed = proceed;

	var logscript_lastText = "";
	var logscript_lastName = "";
	var logscript_lastFrameID = -1;
	var logscript_lastMerged = false;

	var logscript_currentFrameData = false; 
	var logscript_currentText = "";
	var logscript_currentName = "";
	var logscript_currentFrameID = -1;
	var logscript_mergedFrame = false;

	var logscript_log = [];

	proceed = function(conditions, backwards){
		logscript_currentFrameData = trial_data.frames[player_status.current_frame_index];

		logscript_currentFrameID = logscript_currentFrameData.id;
		logscript_mergedFrame = logscript_currentFrameData.merged_to_next;
		logscript_currentText = top_screen.text_display.dialogue_box.innerHTML;
		logscript_currentName = top_screen.text_display.name_box.innerHTML;

		//Check for partially completed textbox
		var ls_fake_container = document.createElement('div');
		top_screen.text_display.instantTypeText(ls_fake_container, top_screen.text_display.dialogue_box.textContent);
		var ls_clean_text_contents1 = ls_fake_container.textContent.trim();
		ls_fake_container.remove();
		ls_fake_container = document.createElement('div');
		top_screen.text_display.instantTypeText(ls_fake_container, logscript_currentFrameData.text_content);
		var ls_clean_text_contents2 = ls_fake_container.textContent.trim();
		ls_fake_container.remove();
		ls_fake_container = null;
		
		const logscript_result = logscript_oldproceed.apply(this, arguments);

		if (ls_clean_text_contents1 == ls_clean_text_contents2 || (logscript_lastMerged)){
			if ((!logscript_mergedFrame) && (logscript_currentFrameID != logscript_lastFrameID) && ((player_status.proceed_click_met) || (player_status.proceed_timer_met && player_status.proceed_timer && player_status.proceed_typing) || (player_status.proceed_typing_met) || ((!player_status.proceed_click_met) && (!player_status.proceed_timer_met) && (!player_status.proceed_typing_met))) && (logscript_currentText != "")){
				logscript_addToLog(logscript_currentName,logscript_currentText);
				logscript_refreshLog();

				logscript_lastText = logscript_currentText;
				logscript_lastName = logscript_currentName;
				logscript_lastFrameID = logscript_currentFrameID;
				logscript_lastMerged = logscript_mergedFrame;
			}
		} else {
			console.log("1:" + ls_clean_text_contents1 +"/2:" + ls_clean_text_contents2);
			logscript_lastMerged = logscript_mergedFrame;
		}



		return logscript_result;
	};

	function logscript_addToLog(name, frametext) {
		if (logscript_log.length > 99) {
			// Remove the first element
			logscript_log.shift();
		}
		logscript_log.push([name, frametext]);
	}

	function logscript_refreshLog(){
		const logscript_contentContainer = document.getElementById('backlog_content');
		logscript_contentContainer.innerHTML = ""
		for(let i = 0; i < logscript_log.length; i++){
			let name = logscript_log[i][0];
			let dialogue = logscript_log[i][1];
			if(name != ""){
				logscript_contentContainer.innerHTML = logscript_contentContainer.innerHTML + "<span class='backlog-name'>" + name + "</span><br/><div class='backlog-text'>" + dialogue + "</div>";
			} else {
				logscript_contentContainer.innerHTML = logscript_contentContainer.innerHTML + "<br/><div class='backlog-text'>" + dialogue + "</div>";
			}
		}
		logscript_contentContainer.scrollTop = logscript_contentContainer.scrollHeight;
	}

	// Create a button element
	const logscript_logButton = document.createElement("button");

	// Set the button's CSS style
	logscript_logButton.style.position = 'absolute';
	logscript_logButton.style.top = '-2px';
	logscript_logButton.style.left = '-2px';

	// Find the parent element with the id "screen-meta"
	const logscript_screenMeta = document.getElementById('screen-meta');

	// Append the button to the parent element
	logscript_screenMeta.appendChild(logscript_logButton);
	logscript_logButton.id = "backlog-button";
	logscript_logButton.innerHTML = "Backlog"; 
	logscript_logButton.onclick = toggleBacklog;

	// Create Backlog HTML and CSS
	function logscript_generateBacklog() {
		// Create main container
		const logscript_container = document.createElement('div');
		logscript_container.id = 'backlog';
		logscript_container.className = 'backlog-container';

		// Create header
		const logscript_header = document.createElement('div');
		logscript_header.className = 'backlog-header';
		logscript_header.textContent = 'Backlog:';

		// Create close icon
		const logscript_closeIcon = document.createElement('div');
		logscript_closeIcon.className = 'backlog-close-icon';
		logscript_closeIcon.textContent = '✖';
		logscript_closeIcon.onclick = closeBacklog;

		// Append close icon to the header
		logscript_header.appendChild(logscript_closeIcon);

		// Create content container
		const logscript_contentContainer = document.createElement('div');
		logscript_contentContainer.id = 'backlog_content';
		logscript_contentContainer.className = 'backlog-content';

		// Append header and content to the main container
		logscript_container.appendChild(logscript_header);
		logscript_container.appendChild(logscript_contentContainer);

		// Append the main container to the document body
		const logscript_parentDiv = document.getElementById('screens');
		logscript_parentDiv.insertBefore(logscript_container, logscript_parentDiv.childNodes[2]);
		logscript_container.style.display = 'none';

		// Create style element
		const styleElement = document.createElement('style');
		styleElement.textContent = `
			.backlog-container {
				width: 254px;
				z-index: 999;
				height: 185px;
				position: absolute;
				color: white;
				left: 0px;
				width: 256px;
				min-height: 52px;
				margin: 10px;
				padding: 2px 2px 2px 2px;
				border: 2px ridge rgba(136, 136, 136, 0.75);
				border-radius: 3px;
				resize: none;
				background: rgba(0, 0, 0, 0.85);
				font: 12px aaDialogueText, sans-serif;
				text-align: start;
				line-height: 16px;
			}

			.backlog-header {
				font: 12px sans-serif;
				color: white;
			}

			.backlog-close-icon {
				position: absolute;
				top: 1px;
				right: 2px;
				cursor: pointer;
				font: 12px sans-serif;
				text-align: start;
				white-space: pre-wrap;
				line-height: 16px;
				color: white;
			}

			.backlog-close-icon:hover {
				color: grey;
			}

			.backlog-content {
				overflow-y: auto !important;
				height: 150px;
				text-align: left;
				scrollbar-width: thin;
				padding: 20px 10px 0px 0px;
				position: relative;
				width: 256px;
				color: white;
			}
			
			.backlog-name {
				margin-top: 7px;
				height: 12px;
				min-width: 44px;
				padding: 0 2px;
				overflow: hidden;
				border: 2px ridge rgba(136,136,136,0.75);
				border-radius: 3px;
				background: rgba(27,34,108,0.75);
				white-space: nowrap;
				font-size: 10px;
				line-height: 10px;
				color: white;
			}

			.backlog-text {
				margin-bottom: 0px;
			}
		`;

		// Append style element to the document head
		document.head.appendChild(styleElement);
	}

	// Function to close backlog (example function, replace with your logic)
	function closeBacklog() {
		const logscript_container = document.getElementById('backlog');
		logscript_container.style.display = 'none';
	}

	function openBacklog() {
		const logscript_container = document.getElementById('backlog');
		const logscript_contentContainer = document.getElementById('backlog_content');

		logscript_container.style.display = 'block';
		logscript_contentContainer.scrollTop = logscript_contentContainer.scrollHeight;
	}

	function toggleBacklog() {
		const logscript_container = document.getElementById('backlog');
		if (logscript_container.style.display === 'none' || logscript_container.style.display === '') {
			openBacklog();
		} else {
			closeBacklog();
		}
		logscript_logButton.blur();
	}

	// Call the function to generate HTML and CSS
	logscript_generateBacklog();
}

window.addEventListener('load', function () {
    logscript_init(); // Call the init function after the window has loaded
});

console.log("Logscript loaded.");