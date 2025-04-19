/* 
link consolidator
*/

// text area for input
// create gui
// prompt for input
// parse input
// check if text area content is html
// if content is plain text:
// parsePlainText
// else
// parseHTML
// ----
// parsePlainText:
// split input into separate lines
// filter blank lines
// create variable from line content: _LCONTENT
// create plain text content from the _LCONTENT : _LCONTENT_TEXTCONTENT
// if encounter 'http'-- use _LCONTENT_TEXTCONTENT for link text
// parseHTML:
/* TODO:
use the processInputIntoLinkDiv function from the file to
 change the youtube links while going and doing all the consolidation.
*/
/*
    VER2: check to see if the link is viable, and/or safe:

https://safeweb.norton.com/report?url=www.google.com  ==>
div.rating-share div.rating p.rating-label <== contains rating text content

When checking the remove URLs you can use a HEAD request, or a GET with the If-Modified-Since.
 They can give you responses you can use to determine the freshness of your URLs.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Modified-Since
If-Modified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT

https://stackoverflow.com/questions/4832956/best-way-to-concurrently-check-urls-for-status-i-e-200-301-404-for-multiple-u

*/
// attempt to consolidate duplicate links:
// grab all the anchors in the content
// create a object to store all the links.
// for all the anchors in the content
// if the current link doesn't exist, create a key in the object.
// store the link in the key (duplicates should replace)
// now go through all the keys in the object, and push them all into an array

// clear the output area
// add the links to the content of the output area

var sorting = true;
var keep_text = true;
var scheduled = false;
var lastEvent;

window.addEventListener("load", promptInput);

// function log(e) {
function log(msg) {
	console.log(msg);
}

var input_area,
	output_area,
	userinput,
	dialogForm,
	dialog,
	dialog_bg,
	updateButton,
	verify_btn,
	user_input_to_parse,
	user_input_PARSED,
	linkConsolidator;

input_area =
	output_area =
	userinput =
	dialogForm =
	dialog =
	dialog_bg =
	updateButton =
	verify_btn =
	user_input_to_parse =
	user_input_PARSED =
	linkConsolidator =
		null;

function promptInput() {
	resetGUI();
	createGUI();
	keyboardHandlersActivate();
}

function resetGUI() {
	if (input_area !== null) {
		clearEl(input_area);
	}
	if (output_area !== null) {
		clearEl(output_area);
	}
}

function createGUI() {
	resetGUI();
	input_area = document.querySelector("#input_area");
	output_area = document.querySelector("#output_area");
	dialogForm = document.querySelector("#main_dialog form");
	dialog = document.querySelector("#main_dialog");
	dialog_bg = document.querySelector("#dialog_bg");
	/*dynamically find out the variable for setting the dialog background. */
	dialog.style.getPropertyValue("--whole_bg_url");
	/*dynamically set dialog background to image with path after loading. */
	dialog.style.setProperty("--whole_bg_url", 'url("' + dialog_bg.src + '")');

	updateButton = document.querySelector("#updateDetails");
	verify_btn = document.querySelector("#verify_results");
	// toggleGreyOut.apply(verify_btn);

	clearEl(dialogForm);
	userinput = createEl("textarea");
	userinput.setAttribute("placeholder", "Enter The Text That You Want To Be Turned Into Links");
	userinput.setAttribute("name", "user_input");
	userinput.setAttribute("id", "user_input");
	userinput.setAttribute("rows", "25");
	userinput.setAttribute("cols", "65");

	var dialogButton_holder = createEl("div");

	var dialogY = createEl("button");
	dialogY.setAttribute("class", "dialog_button");
	dialogY.setAttribute("id", "submit");
	dialogY.setAttribute("type", "submit");
	dialogY.appendChild(createText("Ok, Process Input"));

	var dialogN = createEl("button");
	dialogN.setAttribute("class", "dialog_button");
	dialogN.setAttribute("id", "cancel");
	dialogN.setAttribute("type", "reset");
	dialogN.appendChild(createText("No, Can't Do That Right Now"));

	dialogButton_holder.appendChild(dialogY);
	dialogButton_holder.appendChild(dialogN);

	dialogForm.appendChild(userinput);
	dialogForm.appendChild(dialogButton_holder);
	input_area, output_area;
	var h1 = createEl("h1");
	h1.appendChild(createText("Enter your links for processing into the dialog shown after pressing the button."));
	input_area.appendChild(h1);

	/*
    Confirm button closes dialog if there is a selection. (refers to the select element that is in example,
and on the page, but not used here) 
    */
	dialogY.addEventListener("click", function () {
		dialog.close("YES, I'll buy your widget"); //sets return value
		handleResult(dialog.returnValue);
		// toggleGreyOut.apply(verify_btn);
	});

	// Cancel button closes the dialog box
	dialogN.addEventListener("click", function () {
		dialog.close(); // Set dialog.returnValue to null
		handleResult(dialog.returnValue);
	});

	/* 	dialog.addEventListener("close", function () {
		log(`close_event: (dialog.returnValue: "${dialog.returnValue}")`);
	});
 */
	/* 	dialog.addEventListener("cancel", function () {
		log(`cancel_event: (dialog.returnValue: "${dialog.returnValue}")`);
		dialog.returnValue = ""; //Reset value
	});
 */
	dialog.addEventListener("toggle", function (event) {
		log(`toggle_event: Dialog ${event.newState}`);
	});

	/*
 	dialog.addEventListener("click", function (event) {
		log(`toggle_event: CLICKED Dialog ${event}`);
	}); 
    */

	dialog.addEventListener("beforetoggle", function (event) {
		// log(`beforetoggle event: oldstate: ${event.oldState}, newState: ${event.newState}`);
		// dialog.returnValue = "setting the cancel value of the dialog to this long string";
		dialog.returnValue = null;
	});
}

function handleResult(param) {
	// console.log(":::handleResult:::", param);
	// toggleGreyOut.apply(verify_btn);
	// console.log("☺☺☺ DIALOG SAYS:-- ", dialog.returnValue);

	user_input_to_parse = userinput.value;
	parseUserInput();
	userinput.value = "";
}

function toggleGreyOut() {
	// useage: invoke a bound scope when using this function, ie:
	// toggleGreyOut.apply(btn_OBJ)

	if (this.disabled) {
		this.disabled = false;
		this.setAttribute("disabled", false);
		this.removeAttribute("disabled");
	} else {
		this.disabled = true;
		this.setAttribute("disabled", true);
	}
}

function parseUserInput() {
	console.log(":::parseUserInput::: started");
	// prompt is to enter data -- prompt('enter links in the text area marked: "Input"');
	// alert('enter links in the text area marked: "Input"');
	/* 
    new to the author is a dialog element:
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement

    use in favor of prompt, or alert. Seems that would be better because of styling.
    */

	if (isInputHTML(user_input_to_parse)) {
		return parseHTML(user_input_PARSED);
	} else {
		console.log("Looks like plain text.");
		return parsePlainText(user_input_to_parse);
	}
}

function parsePlainText(param) {
	console.log("♪♪ parsePlainText started");

	// var nodeListing = param.split("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
	var nodeListing = param.split("\n");
	nodeListing = nodeListing.filter(isBlank);
	// console.log("♦♦ param", nodeListing);

	var lc = {};
	var link_ARR = [];
	linkConsolidator = lc;

	/* 
	TODO: user wants to keep the non-url data inline, effectively turning plain
	text containing links into html that mixes plain text and links.
	*/
	if (keep_text === false) {
		nodeListing.forEach(function (member, index) {
			var cleanedMember = member.trim();
			var tempA = createEl("a");
			var tempATextContent = createText(cleanedMember);
			if (cleanedMember.match("http")) {
				tempA.setAttribute("href", cleanedMember);
				tempA.appendChild(tempATextContent);
				tempA.setAttribute("target", "_blank");
				tempA.setAttribute("class", "video_link");
				var anchorKeyHref = tempA.href;
				linkConsolidator["key_" + anchorKeyHref] = {
					"link": tempA,
					"linkText": tempA.textContent,
					"href": anchorKeyHref,
				};
			} else {
				tempA.appendChild(tempATextContent);
			}
		});

		for (var str in linkConsolidator) {
			link_ARR.push(linkConsolidator[str]["link"]);
		}

		var oa = document.querySelector("#output_area");

		if (sorting === true) {
			link_ARR = link_ARR.sort((a, b) => a.href.localeCompare(b.href));
		}
		link_ARR.forEach(function (nL, nlIndex) {
			oa.appendChild(nL);
			oa.appendChild(createEl("br"));
		});
	} else {
		var oa = document.querySelector("#output_area");
		nodeListing.forEach(function (member, index) {
			var cleanedMember = member.trim();
			var tempA = createEl("a");
			var tempATextContent = createText(cleanedMember);
			if (cleanedMember.match("http")) {
				tempA.setAttribute("href", cleanedMember);
				tempA.appendChild(tempATextContent);
				tempA.setAttribute("target", "_blank");
				tempA.setAttribute("class", "video_link");
				var anchorKeyHref = tempA.href;
				linkConsolidator["key_" + anchorKeyHref] = {
					"link": tempA,
					"linkText": tempA.textContent,
					"href": anchorKeyHref,
				};
				oa.appendChild(tempA);
			} else {
				oa.appendChild(tempATextContent);
			}
			oa.appendChild(createEl("br"));
		});
	}
}

function parseHTML(param) {
	console.log(":::parseHTML::: started");
	// console.log(param.querySelectorAll("a"));    //<<==WORKS
	var nodeListing = param.querySelectorAll("a");
	// console.log(console.log(param.querySelectorAll("a")));
	// console.log(nodeListing.length);
	/* GOTCHA -- empty node list */
	if (nodeListing.length === 0) {
		return;
	} else {
		// create the key object
		// sort var newlisting=	listings.sort((a, b) => a.textContent.localeCompare(b.textContent));
		var lc = {};
		var link_ARR = [];
		linkConsolidator = lc;
		nodeListing.forEach(function (member, index) {
			// console.log(member.textContent);
			var anchorKeyHref = member.href;
			linkConsolidator["key_" + anchorKeyHref] = {
				"link": member,
				"linkText": member.textContent,
				"href": anchorKeyHref,
			};
		});

		// console.log(linkConsolidator);

		for (var str in linkConsolidator) {
			link_ARR.push(linkConsolidator[str]["link"]);
		}

		if (sorting === true) {
			link_ARR = link_ARR.sort((a, b) => a.href.localeCompare(b.href));
		}
		// link_ARR=link_ARR.sort((a, b) => a.textContent.localeCompare(b.textContent));

		link_ARR.forEach(function (atag, ndex) {
			var newA = createEl("a");
			var newAText = createText(atag["href"]);
			newA.setAttribute("href", atag["href"]);
			newA.setAttribute("target", "_blank");
			newA.setAttribute("title", atag.textContent);
			newA.appendChild(newAText);
			output_area.appendChild(newA);
			output_area.appendChild(createEl("br"));
		});
	}
}

function isInputHTML(str) {
	// console.log(str);
	user_input_PARSED = new DOMParser().parseFromString(str, "text/html");
	// look for shortcuturl properties on anchors too!
	return Array.from(user_input_PARSED.body.childNodes).some((node) => node.nodeType === 1);
	/* 
    NOTED: https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not 
    // 
    notice that with DOMParser, some elements (link, script, meta, ..) when placed first will
    appear inside the <head> of the document, so they won't be detected by
    your fn: isHTML('<link href="foo">') === false – 
    nachoab 
    */
}

function detectHTTP(param) {
	splitContent.forEach(function (member, key) {
		var cMembers = member.split("\n");
		cMembers = cMembers.filter(isBlank);

		cMembers.forEach(function (cMember, sKey) {
			// if "http" occurs AT ALL--

			if (cMember.match(/http/gi) !== null) {
				var aTextContent = createText(cMember.trim());
				var anchorDiv = createEl("div");
				var anchorProper = createEl("a");
				var span = createEl("span");
				anchorProper.setAttribute("class", "href");
				anchorDiv.setAttribute("class", "video_link");

				span.appendChild(aTextContent);
				anchorProper.setAttribute("href", cMember);
				anchorProper.setAttribute("title", cMember);
				anchorProper.setAttribute("alt", cMember);
				anchorProper.setAttribute("target", "_blank");

				anchorProper.setAttribute("style", "display:inline-block;");
				anchorProper.appendChild(span);
				anchorDiv.appendChild(anchorProper);
				outputDataContainer.appendChild(anchorDiv);
			} else {
				var nAnchorDiv = createEl("div");
				var naTextContent = createText(cMember);
				var span = createEl("span");
				span.appendChild(naTextContent);
				nAnchorDiv.appendChild(span);
				outputDataContainer.appendChild(nAnchorDiv);
				outputDataContainer.appendChild(createEl("br"));
			}
		});

		outputDataContainer.appendChild(createEl("hr"));
	});
}
/* 
isBlank is duplicated function from javascript workspace
useage:
cMembers = cMembers.filter(isBlank);
*/
function isBlank(tContents) {
	/* filter for blank array content */
	var pass = true;
	if (tContents === "" || tContents === " ") {
		pass = false;
	}
	return pass;
}

// KEY INPUTS: (DIFFERENT FROM LEARNING_LINKS_SCRIPT!)
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

function keyboardHandlersActivate() {
	console.log("turned on the keyboard");
	// const main_window = document.getElementById("test-target");
	// var main_window = window;
	// var consoleLog = document.getElementById("console_log");
	// var btnReset = document.getElementById("btn_reset");

	window.addEventListener("keyup", (e) => {
		handleSpecialKeyPress(`${e.key}`);
		// logMessage(`Key "${e.key}" released [event: keyup]`);
	});

	// Update button opens a modal dialog

	// updateDetails
	var boundDialogFunc = startDialog.bind(dialog);
	updateButton.addEventListener("click", boundDialogFunc);

	/* 
	window.addEventListener("beforeinput", (e) => {
		logMessage(`Key "${e.data}" about to be input [event: beforeinput]`);
	});

	window.addEventListener("input", (e) => {
		logMessage(`Key "${e.data}" input [event: input]`);
	});
    */

	/* 
	window.addEventListener("keypress", log);

	window.addEventListener("keydown", (e) => {
		lastEvent = e;

		if (!scheduled) {
			scheduled = true;
			setTimeout(function () {
				scheduled = false;
				//   displayCoords(lastEvent);
				if (!e.repeat) {
					// console.log(e.type);
					console.log(`Key "${e.key}" pressed [event: keydown]`);
					logMessage(`Key "${e.key}" pressed [event: keydown]`);
				} else {
					console.log(`Key "${e.key}" repeating [event: keydown]`);
					logMessage(`Key "${e.key}" repeating [event: keydown]`);
				}
			}, 250);
		}

		// clearTimeout(timeout);
		// timeout = setTimeout(function () {
		// 	console.log("You stopped typing.");
		// }, 500);
	});
    */
}

/* function logMessage(message) {
	console.log("pressed", `${message}\n`);
}
 */

function whatKey(val) {
	return val.toLowerCase();
}

function handleSpecialKeyPress(val) {
	if (whatKey(val) === "enter") {
		console.log(dialog.returnValue);
		if (dialog.returnValue === "") {
			console.log("A WHOLE LOT OF ZIPPO-- User pressed enter before selecting anything");
			return;
		} else if (dialog.returnValue === null) {
			console.log("dialog IS NULL");
		} else {
			// (dialog.returnValue === "null")
			console.log("YO!");
			console.log("EITHER-- dialog is opened, and ENTER was pressed, OR simply pressed ENTER");
		}
		// processInputIntoLinkDiv.call(inputField.value);
	}
}

// END KEY INPUTS.
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

function startDialog() {
	console.log(":::startDialog:::");
	this.showModal();
}

/* 
clearEl is duplicated from the code in the javascript workspace
*/
function clearEl(el) {
	while (el.hasChildNodes()) {
		el.removeChild(el.firstChild);
	}
}
/* 
createEl is duplicated from the code in the javascript workspace
*/
function createEl(type) {
	var el = document.createElement(type);
	return el;
}
/* 
createText is duplicated from the code in the javascript workspace
*/
function createText(textContent) {
	return document.createTextNode(textContent);
}
