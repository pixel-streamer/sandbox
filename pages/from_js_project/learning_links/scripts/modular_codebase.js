/* 
this is an attempt to modularize all the scripts that I've written, and keep them in one place so
that I can use this as a library, and once I know how to do minification, this will be a one-and-done
solution.

ES6 modules (import and export)

*/

/* 
TODO: it would be fun if:
background color of #MAIN  to be dependent on a hsl() angle determined by hour of day (at visit, 
and constantly updating.)
 
https://en.wikipedia.org/wiki/Rayleigh_sky_model (note 1)
Coulson, Kinsell (1988). Polarization and Intensity of Light in the Atmosphere. A. Deepak Pub.
 { \cos \gamma =\sin \theta _{s}\sin \theta \cos {(\psi _{s}-\psi )}+\cos \theta _{s}\cos \theta }
*/

/* 
TODO: I need a GUI module. One that sets apart things like font loading, and functions that only 
affect the dom of all pages, etc.
*/

/* 
TODO: tuck functions for link utils into module, utilizing the class for this autoformatter
*/

/* 
TODO: add in a block for a "sticky" menu, that collapses and almost hides so that the user can
change the text size for reading temporarily.
*/

/* 
TODO: change z-indexing so that the background covers everything except the interacting parts
*/

/* 
TO-DONE:
Change the selection color! 
*/

/* 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*/
/* class Foo {
	constructor(index) {
		console.log((this.index = index));
	}
}

class FooBar extends Foo {
	constructor(name, index) {
		super(name);
		this.index = index;
	}
}

let My_NOT_GLOBAL_Module = (function () {
	let privateData = "Private data";

	function privateFunction() {
		console.log("This is a private function");
	}

	function publicFunction() {
		console.log("This is a public function");
	}

	return {
		publicFunction: publicFunction,
	};
})();
 */
/* 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*/

class AutoFormatLink_withPossibleImgData {
	constructor(input, linkTextContent, outsideImgSrc, useImg) {
		this.videoThumbID = null;
		this.key = null;
		this.video = null;
		this.a = null;
		this.span = null;
		this.img = null;
		this.searchParams = null;
		this.wholeImgSrc = null;
		this.input = input;
		this.linkTextContent = linkTextContent;
		this.useimageinlink = useImg;
		// console.log("••• ::: this.useimageinlink::: ", this.useimageinlink);

		if (outsideImgSrc !== "") {
			this.wholeImgSrc = outsideImgSrc;
		}

		this.autoFormatLinkInput();

		if (this.linkTextContent !== "") {
			this.a.setAttribute("title", this.a.href);
			this.addLinkTextIntoAnchor(this.linkTextContent, this.a);
		} else {
			this.a.setAttribute("title", this.a.href);
			this.addLinkTextIntoAnchor(this.a.href, this.a);
		}
		if (this.useimageinlink) {
			this.utilizeLinkImage();
		}

		return this.a;
	}
	makeAnchor() {
		/* make private! */
		return document.createElement("a");
	}
	makeImg() {
		/* make private! */
		return document.createElement("img");
	}
	utilizeLinkImage() {
		/* make private! */
		this.img = this.makeImg();
		// console.log("♥♥wholeImgSrc: ", this.wholeImgSrc, "img: ", this.img);
		if (this.wholeImgSrc === "#OUTSIDE SRC") {
			this.a.setAttribute("style", "min-height:125px");
			// OR-- set this image src to a stand-in
			console.log("♠ -- DEAD IMAGE :( ");
			delete this.img;
		} else {
			var containerSpan = this.span;
			containerSpan.appendChild(this.img);
			this.img.setAttribute("style", "max-width:125px; display:block;");
			this.img.setAttribute("title", this.linkTextContent);
			this.img.src = this.wholeImgSrc;
		}
	}
	addLinkTextIntoAnchor(txt, a) {
		var linkText = document.createTextNode(txt);
		this.span.appendChild(linkText);
		return a;
	}

	autoFormatLinkInput() {
		this.a = this.makeAnchor();
		this.span = this.a.appendChild(document.createElement("span"));
		try {
			this.a.setAttribute("href", this.input.trim());
		} catch (error) {
			/* if trim fails, it's because input was already an anchor tag*/
			this.a = this.input;
		}
		this.searchParams = new URLSearchParams(this.a.href);

		if (this.a.href.match("youtu.|youtube")) {
			if (this.a.href.match("embed")) {
				this.video = this.a.href.substring(this.a.href.lastIndexOf("embed") + 6, this.a.href.length);
				this.videoThumbID = this.video;
				this.a.setAttribute("target", "_blank");
				this.a.setAttribute("href", "https://www.youtube.com/embed/" + this.video);
				this.wholeImgSrc = this.wholeImgSrc || "https://i.ytimg.com/vi/" + this.videoThumbID + "/hqdefault.jpg";
				return this.a;
			} else {
				var _this = this;
				this.searchParams.forEach(function (sKey, val) {
					if (val.match(new RegExp("/live/", "gi"))) {
						_this.video = _this.a.href.substring(_this.a.href.lastIndexOf("live/") + 5, _this.a.href.length);
						_this.a.setAttribute("href", "https://www.youtube.com/embed/" + _this.video);
						_this.videoThumbID = _this.video;
						return _this.video;
					}
					if (val.match("watch")) {
						_this.video = sKey || "";
						_this.a.setAttribute("href", "https://www.youtube.com/embed/" + _this.video);
						_this.videoThumbID = _this.video;
						return _this.video;
					}
					if (val.match("/?v")) {
						_this.video = sKey;
						_this.a.setAttribute("href", "https://www.youtube.com/embed/" + _this.video);
						_this.videoThumbID = _this.video;
						return _this.video;
					}
					if (val.match("youtu.be")) {
						_this.video = _this.a.href.substring(
							_this.a.href.lastIndexOf("youtu.be") + 9,
							_this.a.href.lastIndexOf("?")
						);
						_this.a.setAttribute("href", "https://www.youtube.com/embed/" + _this.video);
						_this.videoThumbID = _this.video;
						return _this.video;
					}
					if (val.match("playlist")) {
						if (val.match("watch")) {
							_this.videoThumbID = sKey;
							return _this.video;
						} else {
							_this.wholeImgSrc =
								"https://yt3.googleusercontent.com/PJh5BeCRze4_08Qp8zOtb2bV6JGLiqmmc9QIRTVeTlrVmC2828C7gw5KIOU8uk70jN__SSY5Ug=s160-c-k-c0x00ffffff-no-rj";
						}
						try {
							_this.a.setAttribute("href", unescape(_this.a.href));
						} catch (error) {
							return;
						}
						return _this.video;
					}
					if (val.match("desktop")) {
						_this.video = sKey;
						_this.a.setAttribute("href", "https://www.youtube.com/embed/" + _this.video);
						return _this.video;
					}
				});
				this.a.setAttribute("target", "_blank");
				this.wholeImgSrc = this.wholeImgSrc || "https://i.ytimg.com/vi/" + this.videoThumbID + "/hqdefault.jpg";
				return this.a;
			}
		} else {
			this.a.setAttribute("target", "_blank");
			this.wholeImgSrc = this.wholeImgSrc || "#OUTSIDE SRC";
			return this.a;
		}
	}
}

// function makeLinkFromInput() {
// 	var oa = document.querySelector("#output_area");

// 	var videoThumbID, key, video, a, img, searchParams, wholeImgSrc;
// 	videoThumbID = key = video = a = img = searchParams = wholeImgSrc = null;

// 	a = document.createElement("a");
// 	try {
// 		a.setAttribute("href", this.trim());
// 	} catch (error) {

// 		// passed in "this" must already be a anchor tag.... let it thru....

// 		a = this;
// 	}

// 	img = document.createElement("img");
// 	img.setAttribute("style", "max-width:125px; display:block;");
// 	searchParams = new URLSearchParams(a.href);

// 	if (a.href.match("youtu.|youtube")) {
// 		if (a.href.match("embed")) {

// 			// if embed is already in the link, magic with substrings and return the video code

// 			video = a.href.substring(a.href.lastIndexOf("embed") + 6, a.href.length);
// 			videoThumbID = video;
// 			addLinkTextIntoElement(a.href, a);
// 			a.setAttribute("target", "_blank");
// 			a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 			wholeImgSrc = wholeImgSrc || "https://i.ytimg.com/vi/" + videoThumbID + "/hqdefault.jpg";

// 			a.appendChild(img);
// 			img.src = wholeImgSrc;

// 			return a;
// 		} else {
// 			searchParams.forEach(function (sKey, val) {
// 				if (val.match(new RegExp("/live/", "gi"))) {
// 					video = a.href.substring(a.href.lastIndexOf("live/") + 5, a.href.length);
// 					a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 					videoThumbID = video;
// 					return video;
// 				}
// 				if (val.match("watch")) {
// 					video = sKey;
// 					console.log("VIDEO: ", video, "skEy:", sKey);
// 					a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 					videoThumbID = video;
// 					return video;
// 				}
// 				if (val.match("/?v")) {
// 					video = sKey;
// 					a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 					videoThumbID = video;
// 					return video;
// 				}
// 				if (val.match("youtu.be")) {
// 					video = a.href.substring(a.href.lastIndexOf("youtu.be") + 9, a.href.lastIndexOf("?"));
// 					a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 					videoThumbID = video;
// 					return video;
// 				}
// 				if (val.match("playlist")) {

// 					// some urls may have watch parameters AS WELL AS playlist...
// 					// https://www.youtube.com/watch?v=X05as51miDs&list=PLub9GbKpZjdBVaWbBO2U4GSDBVq7HteJC&index=112

// 					// in those cases, try setting the watch param first.

// 					if (val.match("watch")) {
// 						videoThumbID = sKey;
// 						return video;
// 					} else {
// 						wholeImgSrc =
// 							"https://yt3.googleusercontent.com/PJh5BeCRze4_08Qp8zOtb2bV6JGLiqmmc9QIRTVeTlrVmC2828C7gw5KIOU8uk70jN__SSY5Ug=s160-c-k-c0x00ffffff-no-rj";
// 					}
// 					try {
// 						a.setAttribute("href", unescape(a.href));
// 					} catch (error) {

// 						// if unescaping fails, then the link is already set.

// 						return;
// 					}
// 					return video;
// 				}
// 				if (val.match("desktop")) {
// 					video = sKey;
// 					a.setAttribute("href", "https://www.youtube.com/embed/" + video);
// 					return video;
// 				}
// 			});

// 			addLinkTextIntoElement(a.href, a);
// 			a.setAttribute("target", "_blank");
// 			wholeImgSrc = wholeImgSrc || "https://i.ytimg.com/vi/" + videoThumbID + "/hqdefault.jpg";

// 			a.appendChild(img);
// 			img.src = wholeImgSrc;
// 			return a;
// 		}
// 	} else {
// 		addLinkTextIntoElement(a.href, a);
// 		a.setAttribute("target", "_blank");
// 		wholeImgSrc = "#OUTSIDE SRC";
// 		console.log("♥♥wholeImgSrc: ", wholeImgSrc);

// 		if (wholeImgSrc === "#OUTSIDE SRC") {
// 			delete img;
// 		} else {
// 			a.appendChild(img);
// 			img.src = wholeImgSrc;
// 		}
// 		return a;
// 	}

// 	// dress up the anchor with the other content from the GUI-- DEPENDS ON THE GUI-- so...
// 	// TODO: need to handle if linkText is different from the text in the href--

// 	//  addLinkTextIntoElement(a.href, a);

// 	// part.href.match("youtu.be")
// 	// part.href.match("embed|watch")
// 	// part.href.match("embed")
// 	// part.href.match("si")

// }

function addLinkTextIntoElement(txt, el) {
	var linkText = document.createTextNode(txt);
	el.appendChild(linkText);
	return;
}

// for exporting the "class" inside the module-- PARAMS MUST ECHO CONSTRUCTOR  params of class
function MyLinkGeneratorFunc(parm1, parm2, parm3, parm4) {
	return new AutoFormatLink_withPossibleImgData(parm1, parm2, parm3, parm4);
}

function buildLink() {
	/* depends on the GUI-- this one needs to be worked with the ui elements present */
}

function getListing() {
	// temporary testing of modular codebase
	const linksListing = [
		{
			link_text: "Link has Words: link 0",
			title: "link title t000",
			link: "https://www.youtube.com/embed/PIWrg1euBro",
		},
		{
			link_text: "Link has Words: link 01",
			title: "link title t001",
			link: "https://stackoverflow.com/questions/70293629/es6-how-to-import-and-alias-a-named-exports-member",
		},
		{
			link_text: "Link has Words: link 02",
			title: "link title t002",
			link: "https://www.youtube.com/watch?v=hat7npOc68o&t=1s ",
		},
		{
			link_text: "Link has Words: link 03",
			title: "link title t003",
			link: "https://youtu.be/O18R87Oin98?si=ly0KWygI7WkkC4TN",
		},
		{
			link_text: "Link has Words: link 04",
			title: "link title t004",
			link: "https://www.youtube.com/embed/8bhygxZWOJE ",
		},
		{
			link_text: "Link has Words: link 05",
			title: "link title t005",
			link: "https://www.youtube.com/playlist?list=PLVm7O9OzjT6Fu8aDrP3N1Ni1ATbUH926s ",
		},
		{
			link_text: "Link has Words: link 06",
			title: "link title t006",
			link: "https://www.youtube.com/live/rUwyFn1cAYo ",
		},
		{
			link_text: "Link has Words: link 07",
			title: "link title t007",
			link: "https://www.youtube.com/?v=kGtofPk8KEA",
		},
		{
			link_text: "Link has Words: link 08",
			title: "link title t008",
			link: "https://www.youtube.com/watch?v=X05as51miDs&list=PLub9GbKpZjdBVaWbBO2U4GSDBVq7HteJC&index=112",
		},
	];
	return linksListing;
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

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.previousSibling);
}

function removeNode(referenceNode) {
	if (referenceNode.parentNode) {
		referenceNode.parentNode.removeChild(referenceNode);
	}
}

function whatKey(val) {
	return val.toLowerCase();
}

function handleEnterKeyPress(val, runNamedCallback) {
	if (whatKey(val) === "enter") {
		runNamedCallback();
	}
}

/* 
TODO: specialize activateKeyboard to accept callbacks for enter key, et al.
*/
var scheduled = false;
var lastEvent;
function activateKeyboard(namedCallback) {
	//this to bind functions activated when pressing enter, etc
	console.log("turned on the keyboard");

	window.addEventListener("keyup", (e) => {
		handleEnterKeyPress(`${e.key}`, namedCallback);
		// logMessage(`Key "${e.key}" released [event: keyup]`);
	});

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

/* 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*/

/* these exports are all "aliased" per testing-- they don't need the redundency */
export {
	MyLinkGeneratorFunc as "AutoLink",
	getListing as "utilsLinkTesting",
	buildLink as "buildLink",
	createText as "createText",
	createEl as "createEl",
	clearEl as "clearEl",
	insertAfter as "insertAfter",
	insertBefore as "insertBefore",
	removeNode as "removeNode",
	activateKeyboard as "activateKeyboard",
	isBlank as "isBlank",
};

// export class ClassName { }
