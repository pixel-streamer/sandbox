/*
for all the links on the page, break the words from the descriptions into a tag cloud.
*/

/* 
TODO: add a "list urls on page:" button that makes a modal dialog that lists all the links on the
current page

*/

/*  
notKeywords keywords can be different on each page, so they are left as parameters that
come from those pages init function should be refactored to allow a list to be passed that is
unique to each page here.
*/
window.addEventListener("load", init);

var notKeywords = [
	"up",
	"will",
	"and",
	"an",
	"make",
	"the",
	"but",
	"for",
	"or",
	"nor",
	"so",
	"yet",
	"in",
	"it",
	"i",
	"-",
	"you",
	"use",
	"it",
	"do",
	"how",
	"with",
	"a",
	"of",
	"to",
	"into",
	"in",
	"un",
	"_",
	"youtube",
	"usage",
];

/*
from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
ES6 provides the Set object, which makes things a whole lot easier:
*/
function uniq(a) {
	return Array.from(new Set(a));
}
function init() {
	var all_linksArr = [];
	var all_linksCollection = {};
	var all_linksCloud = "";
	var spacesRE = /\s/gi;
	var otherChars = /\W/g;
	var digitChars = /\d/g;
	var oneCharChars = /\b[^uv]{1,3}\b/gi;

	var all_links = document.querySelectorAll(".main a");

	var goodAnchorsArr = document.querySelector("span.anchor_tags");
	if (goodAnchorsArr === null) {
		return;
	} else {
		goodAnchorsArr = document.querySelector("span.anchor_tags").textContent.trim().split(",");
		goodAnchorsArr = goodAnchorsArr.filter((good) => good !== "");

		all_links.forEach(function (key, index) {
			var keyArr = key.textContent
				.toLowerCase()
				.trim()
				.replace(otherChars, "@")
				.replace(digitChars, "@")
				.replace(oneCharChars, "@")
				.split("@")
				.join(" ")
				.replace(spacesRE, "@")
				.split("@");
			var isfound = false;

			keyArr = keyArr.filter((goodKey) => goodKey !== "");
			keyArr = keyArr.filter((betterKey) => !notKeywords.includes(betterKey.toLowerCase()));
			keyArr = uniq(keyArr);

			/*
			ok, now all the links on the pages are turned into filtered word arrays so:
			*/

			/*
			 put all the words in a large object, and keep an associated array of the link they
			 belong to (index), along with their links, too.
			*/

			keyArr.forEach(function (key, foundInKeyNum) {
				var keyNameObj = { inArr: index, linkHREF: all_links[index] };
				var keyName = key;
				if (keyName === "constructor") {
					keyName = "_" + keyName;
				}

				/* 
				if a word in a link isn't a "notword", try to track it's uniqueness
				*/
				if (all_linksCollection[keyName] === undefined) {
					// create a new object that has the name of the keyword
					all_linksCollection[keyName] = {};
					var tempArr = [];
					// make that keyword a named array object
					all_linksCollection[keyName] = tempArr;
					//start stuffing in keywords
					all_linksCollection[keyName].push(keyNameObj);
				} else {
					//keyword named array exists, so add in the latest one.
					if (checkType(all_linksCollection[keyName]) === "array") {
						all_linksCollection[keyName].push(keyNameObj);
					} else {
						/* 
						assumed in this branch that all_linksCollection[keyName] is mapping to an object
						*/
						// so these get their own unique keywords (which still have to operate like the rest)

						/* all_linksCollection[keyName] = {};
						var tempArr = []; 
						all_linksCollection[keyName] = tempArr; 
						all_linksCollection[keyName].push(keyNameObj); 
 */
						console.log("nah-uh");
						console.log(checkType(all_linksCollection[keyName]));
						console.log("all_linksCollection[keyName]", all_linksCollection[keyName]);
						console.log("keyNameObj", keyNameObj);
						console.log("keyName", keyName);
					}
				}
			});
		});

		//now we have a cloud object containing "keywords" from the links, with
		//references to all their links that mention the word

		// console.log(all_linksCollection);
		// console.log(maxLength(25, 50));

		let myMap = new Map();

		for (let [key, value] of Object.entries(all_linksCollection)) {
			myMap.set(key, value);
		}
		// console.log(myMap.get("physics").length);
		//  sort(); sortOrder(a, b)

		var map1 = new Map(
			[...myMap.entries()].sort(function (a, b) {
				//  return sortOrder(a[1], b[1])||sortOrder(a[1].length, b[1].length);
				// return sortOrder(a[1], b[1]) || sortOrder(a, b);
				// return sortOrder(a[1], b[1]);
				return sortOrder(a, b);
			})
			// .reverse()
		);

		// console.log(map1);

		// now we can turn the keyword area at the top into a cloud that hides non-relevant links
		//

		// TODO: add a "toggle tags" button
		var cloudArea = document.querySelector("#cloud_area");
		cloudArea.addEventListener("click", showLinks, true);

		var frag = document.createDocumentFragment();

		function showLinks(event, param) {
			var target = this;
			console.log("you clicked me: ", "param: ", param, "target: ", target, "this: ", this, "this.id: ", this.id);
			var curr = target;
			var frags = document.querySelectorAll(".frag_list");

			if (curr == undefined) {
				frags.forEach(function (c) {
					// console.log(c.className);
					c.className = "frag_list hidden";
				});
			} else {
				frags.forEach(function (c) {
					// console.log(c.className);
					if (c === curr) {
						c.className = "frag_list";
					} else {
						c.className = "frag_list hidden";
					}
				});
			}
		}

		var counter = 0;
		for (var [k, v] of map1) {
			// console.log( k, v );
			// console.log(k);

			var span = makeEl("span");
			span.setAttribute("style", "display:inline-block;");
			popTextContent(span, makeTextContent(k));

			var fragList = document.createDocumentFragment();
			var fragListDiv = makeEl("div");
			var fragListPositioner = makeEl("div");
			fragListPositioner.setAttribute("class", "frag_list_pos");
			fragListDiv.setAttribute("class", "frag_list hidden");
			var tagCount = makeEl("h3");
			popTextContent(tagCount, makeTextContent("results: " + v.length));
			fragListDiv.appendChild(tagCount);

			var spanBoundLinks = showLinks.bind(fragListDiv, span);
			span.addEventListener("click", spanBoundLinks);
			for (var j = 0; j < v.length; j++) {
				var anchor = v[j]["linkHREF"].cloneNode(true);
				fragListDiv.appendChild(anchor);
			}
			fragListDiv.appendChild(fragListPositioner);
			fragList.appendChild(fragListDiv);
			frag.appendChild(span);
			span.appendChild(fragList);

			if (counter < Number(map1.size - 1)) {
				var span2 = makeEl("span");
				popTextContent(span2, makeTextContent(", "));
				frag.appendChild(span2);
			}
			counter++;
			// console.log(v, all_linksCollection[k]);
		}
		cloudArea.appendChild(frag);
	}
}

function makeEl(elType) {
	return document.createElement(elType);
}

function makeTextContent(contentWords) {
	return document.createTextNode(contentWords);
}
function popTextContent(prent, textNode) {
	prent.appendChild(textNode);
}

function isNotAKeyWord(param) {
	return notKeywords.includes(param);
}

/*
  
document.querySelectorAll("a").forEach(function (part, index) {
  console.log(part.textContent, index);
  var tC = part.textContent;
  var newTC = document.createTextNode(tC);
  part.querySelector("span").prepend(newTC);
  part.querySelector("img");
});

 document.querySelectorAll("a").forEach(function (part, index) {
	console.log(part.href, index);
	console.log(part.href.match("embed|watch"), index);
	console.log(part.querySelector("img"), index);
	var href = part.href;
	var embedKey = href.substring(href.lastIndexOf("embed") + 6, href.length);
	if (embedKey.match("watch")) {
	embedKey = href.substring(href.lastIndexOf("watch?v=") + 8, href.length);
	var imgSrc = "https://i.ytimg.com/vi/" + embedKey + "/hqdefault.jpg";
	part.querySelector("img").src = imgSrc;
	console.log(imgSrc, index);
	} else {
	var imgSrc = "https://i.ytimg.com/vi/" + embedKey + "/hqdefault.jpg";
	part.querySelector("img").src = imgSrc;
	console.log(imgSrc, index);
	}

	//   if (part.href.match("embed|watch")) {
	//     var imgSrc = "https://i.ytimg.com/vi/" + +"/hqdefault.jpg";

	//     part.querySelector("img").src = imgSrc;
	//   }
});
*/

/*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
float the video player in youtube so that video can be moved


document.querySelector(".en_US div#player").style["position"] = "absolute";
document.querySelector(".en_US div#player").style["left"] = "0";
document.querySelector(".en_US div#player").style["width"] = "100%";
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*/

function checkType(value) {
	if (value === null) {
		return "null";
	} else {
		var typeString = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

		if (!Array.prototype.isArray) {
			/*
				you can check to see if a property exists on an object like this too, 
				but it doesn't work for native prototypes:
					Array.hasOwnProperty("isArray");
			*/
			if (Array.isArray(value)) {
				return "array";
			} else {
				if (typeString === "function") {
					return "function";
				} else {
					checkType(value);
				}
			}
		} else {
			Array.prototype.isArray = function () {
				if (typeString === "array") {
					return "array was found";
				} else {
					return typeString;
				}
			};
		}
	}
}

function sortOrder(a, b) {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// LEARNING UTILS LINK BUILDER

let inputField;

window.addEventListener("load", formatInput);

function formatInput() {
	// capture and set the text in the input field so that I can populate it later...
	// inputField = document.querySelector("page_link");
	inputField = document.getElementById("page_link");
	outputField = document.getElementById("output_link");

	if (inputField && outputField) {
		resetInputValue();
		listenForInput();
	}
}

/* 
function dropHandler(ev) {// UNUSED-- for reference only!!
  console.log("Drop");
  ev.preventDefault();

  // Loop through the dropped items and log their data
  for (const item of ev.dataTransfer.items) {
	if (item.kind === "string" && item.type.match(/^text\/plain/)) {
	  // This item is the target node
	  item.getAsString((s) => {
		ev.target.appendChild(document.getElementById(s));
	  });
	} else if (item.kind === "string" && item.type.match(/^text\/html/)) {
	  // Drag data item is HTML
	  item.getAsString((s) => {
		console.log(`… Drop: HTML = ${s}`);
	  });
	} else if (item.kind === "string" && item.type.match(/^text\/uri-list/)) {
	  // Drag data item is URI
	  item.getAsString((s) => {
		console.log(`… Drop: URI = ${s}`);
	  });
	}
  }
}
*/

function listenForInput() {
	/* as usual, much of this isn't tested, but it should work as intended, which is as follows:

  drag a url into the input area.
  (assumes youtube link is being made from text.)
  if text is input by keyboard into the area, the function does conversion on return.
  */

	inputField.addEventListener(
		"drop",
		function (event) {
			for (const item of event.dataTransfer.items) {
				if (item.kind === "string" && item.type.match(/^text\/plain/)) {
					// This item is the target node
					item.getAsString((s) => {
						inputField.value = s.trim();
						reportInputDrop();
					});
				} else if (item.kind === "string" && item.type.match(/^text\/html/)) {
					// Drag data item is HTML
					item.getAsString((s) => {
						console.log(`… Drop: HTML = ${s}`);
					});
				} else if (item.kind === "string" && item.type.match(/^text\/uri-list/)) {
					// Drag data item is URI
					item.getAsString((s) => {
						console.log(`… Drop: URI = ${s}`);
					});
				}
			}
		},
		// false
		reportInputDrop
	);

	inputField.addEventListener("drop", reportInputChange);
}

function reportInputDrop() {
	processInputIntoLinkDiv.call(inputField.value);
}

function reportInputChange() {
	processInputIntoLinkDiv.call(inputField.value);
}

function resetInputValue() {
	try {
		if (inputField !== null) {
			inputField.value = "";
		} else {
			return false;
		}
	} catch (error) {
		return "not sure what to do.";
	}
}

function processInputIntoLinkDiv() { 
	/*
  this needs provisions for the mobile -formatted youtube links, as well as desktop ones,
  plus-- it needs to ignore the "youtube" portion of the thing if there are no "youtube" or mobile-
  formatted variants of the text in the original called parameter.
  */

	var linkDescription, linkTitle, linkImgSrc;
	linkDescription = linkTitle = linkImgSrc = "";
	if (document.querySelector("#page_link").value === "") {
		return;
	}

	if (document.querySelector("#link_description").value !== "") {
		linkDescription = document.querySelector("#link_description").value.trim();
	}
	if (document.querySelector("#link_title").value !== "") {
		linkTitle = document.querySelector("#link_title").value.trim();
	}
	if (document.querySelector("#link_img_src").value !== "") {
		linkImgSrc = document.querySelector("#link_img_src").value.trim();
	}

	var paramTrimmed = this.trim();
	var container_div = document.createElement("div");
	var a = document.createElement("a");
	var span = document.createElement("span");
	// var img = document.createElement("img");
	var img = new Image();

	container_div.setAttribute("class", "video_link");
	a.setAttribute("class", "href");
	a.setAttribute("target", "_blank");
	a.setAttribute("href", paramTrimmed);

	container_div.appendChild(a);
	a.appendChild(span);
	var anchorText = document.createTextNode(paramTrimmed);

	var part = a;
	index = 0;

	// console.log(part.href, index);
	// console.log(part.href.match("embed|watch"), index);
	// console.log(part.querySelector("img"), index);

	var href = part.href;
	var searchParams = new URLSearchParams(part.href);

	var topKey;
	var key;
	var vid;

	searchParams.forEach(function (value, key) {
		if (key.match("embed|watch")) {
			topKey = value;
			return value;
		}
		/* really, I think all we need to do is utilize the params object data, but the rest has been
	written already :) */
		if (key.match("v")) {
			vid = value;
			return value;
		}
	});

	key = topKey;

	if (part.href.match("youtu.be")) {
		/*   var embedKey = href.substring(href.lastIndexOf("/") + 1, href.lastIndexOf("?"));
	console.log(embedKey); */
		var embedKey = key;

		var imgSrc = "https://i.ytimg.com/vi/" + embedKey + "/hqdefault.jpg";

		// do some checks to see if the link is embedded correctly...

		// https://youtu.be/29LT0QBlx2Y

		/*   if (embedKey === "https://youtu.be/") {
	  embedKey = href.substring(href.lastIndexOf("/") + 1, href.length);
	  console.log(embedKey);
	  imgSrc = "https://i.ytimg.com/vi/" + embedKey + "/hqdefault.jpg";
	} */

		img.src = imgSrc;

		// console.log(document.querySelector("#link_description").value, document.querySelector("#link_title").value);

		if (document.querySelector("#link_description").value !== "") {
			img.setAttribute("alt", linkDescription);
			anchorText = document.createTextNode(linkDescription);
		}
		if (document.querySelector("#link_title").value !== "") {
			img.setAttribute("title", linkTitle);
		}

		span.appendChild(anchorText);
		span.appendChild(img);
		// override the href--
		a.setAttribute("href", "https://www.youtube.com/embed/" + embedKey + "");
		outputField.value = container_div.outerHTML;

		//append single output to the page for accumulation
		var oa = document.querySelector("#output_area");
		oa.appendChild(container_div);
		document.querySelector("#output_accumulation_area").value = oa.innerHTML;
	} else if (part.href.match("embed|watch")) {
		var embedKey = key;
		/*  var embedKey = part.href.substring(part.href.lastIndexOf("embed") + 6, part.href.length);

	if (embedKey.match("watch")) {
	  embedKey = part.href.substring(part.href.lastIndexOf("watch?v=") + 8, part.href.length);
	  //  something is still in the parameters
	  if (embedKey.match("=")) {
		// looks like this is part of a playlist.
		if (embedKey.match("list")) {
		  embedKey = embedKey.substring(0, embedKey.lastIndexOf("list") - 1);
		}
	  }
	} else {
	  // console.log(imgSrc, index);
	} */

		console.log("embedKey", embedKey, "part.href:", part.href);

		if (embedKey === "desktop") {
			if (vid !== "") {
				embedKey = vid;
				//console.log("embedKey", embedKey, "part.href:", part.href);
			}
		}

		if (embedKey === "") {
			// if (part.href.match("watch")) {
			//   embedKey = part.href.substring(part.href.lastIndexOf("watch") + 8, part.href.length);
			// }
			if (part.href.match("embed")) {
				embedKey = part.href.substring(part.href.lastIndexOf("embed") + 6, part.href.length);
				//console.log("embedKey", embedKey, "part.href:", part.href);
			}
		}

		var imgSrc = "https://i.ytimg.com/vi/" + embedKey + "/hqdefault.jpg";
		img.src = imgSrc;

		console.log(document.querySelector("#link_description").value, document.querySelector("#link_title").value);

		if (document.querySelector("#link_description").value !== "") {
			img.setAttribute("alt", linkDescription);
			anchorText = document.createTextNode(linkDescription);
		}
		if (document.querySelector("#link_title").value !== "") {
			img.setAttribute("title", linkTitle);
		}

		span.appendChild(anchorText);
		span.appendChild(img);
		// override the href--
		a.setAttribute("href", "https://www.youtube.com/embed/" + embedKey.trim() + "");
		outputField.value = container_div.outerHTML;

		//append single output to the page for accumulation
		var oa = document.querySelector("#output_area");
		oa.appendChild(container_div);
		document.querySelector("#output_accumulation_area").value = oa.innerHTML;

		// part.querySelector("img").src = imgSrc;

		//   if (part.href.match("embed|watch")) {
		//     var imgSrc = "https://i.ytimg.com/vi/" + +"/hqdefault.jpg";

		//     part.querySelector("img").src = imgSrc;
		//   }
	} else {
		img.src = "../not-available.svg";
		var trimmed = "";
		if (document.querySelector("#link_description").value !== "") {
			img.setAttribute("alt", linkDescription);
			anchorText = document.createTextNode(linkDescription);
		}
		if (document.querySelector("#link_title").value !== "") {
			img.setAttribute("title", linkTitle);
		}
		if (document.querySelector("#link_img_src").value !== "") {
			img.setAttribute("src", linkImgSrc);
		}

		span.appendChild(anchorText);
		span.appendChild(img);

		outputField.value = container_div.outerHTML;

		//append single output to the page for accumulation
		var oa = document.querySelector("#output_area");
		oa.appendChild(container_div);
		document.querySelector("#output_accumulation_area").value = oa.innerHTML;
	}
}

// END OF LEARNING UTILS LINK BUILDER
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

// KEY INPUTS:
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

// var keyboardActivate = keyboardHandlersActivate.bind(window, inputSection, outputSection);
var keyboardActivate = keyboardHandlersActivate.bind(window);
window.addEventListener("load", keyboardActivate, true);
function keyboardHandlersActivate() {
	// const textarea = document.getElementById("test-target");
	var textarea = this;
	var consoleLog = document.getElementById("console_log");
	var btnReset = document.getElementById("btn_reset");

	if (!(consoleLog && btnReset)) {
		return;
	}

	var scheduled = false;
	var lastEvent;
	textarea.addEventListener("keydown", (e) => {
		lastEvent = e;

		if (!scheduled) {
			scheduled = true;
			setTimeout(function () {
				scheduled = false;
				//   displayCoords(lastEvent);
				if (!e.repeat) {
					logMessage(`Key "${e.key}" pressed [event: keydown]`);
				} else {
					logMessage(`Key "${e.key}" repeating [event: keydown]`);
				}
			}, 250);
		}

		// clearTimeout(timeout);
		// timeout = setTimeout(function () {
		// 	console.log("You stopped typing.");
		// }, 500);
	});

	function whatKey(val) {
		return val.toLowerCase();
	}

	function handleSpecialKeyPress(val) {
		if (whatKey(val) === "enter") {
			processInputIntoLinkDiv.call(inputField.value);
		}
	}
	/* 
	textarea.addEventListener("beforeinput", (e) => {
		logMessage(`Key "${e.data}" about to be input [event: beforeinput]`);
	});

	textarea.addEventListener("input", (e) => {
		logMessage(`Key "${e.data}" input [event: input]`);
	});
*/

	textarea.addEventListener("keyup", (e) => {
		handleSpecialKeyPress(`${e.key}`);
		logMessage(`Key "${e.key}" released [event: keyup]`);
	});

	btnReset.addEventListener("click", (e) => {
		let child = consoleLog.firstChild;
		while (child) {
			consoleLog.removeChild(child);
			child = consoleLog.firstChild;
		}
		textarea.value = "";
	});

	function logMessage(message) {
		consoleLog.innerText += `${message}\n`;
	}
}

// END KEY INPUTS.
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ████████████████████████████████████████████████████████████████████████████████████████
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// export for later use: 
// export { processInputIntoLinkDiv }; 