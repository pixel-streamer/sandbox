// DYNAMICALLY: aliasing the named export from mod codebase
// searched for javascript AND await AND "import("
let { AutoLink: Alink } = await import("./modular_codebase.js");
let loadedClass = Alink;

let {
	buildLink: bL,
	utilsLinkTesting: getListing,
	createText: createText,
	createEl: createEl,
	clearEl: clearEl,
	insertAfter: insertAfter,
	insertBefore: insertBefore,
	removeNode: removeNode,
	activateKeyboard: activateKeyboard,
	isBlank: isBlank,
} = await import("./modular_codebase.js");

if (loadedClass) {
	await loadMyModule();
}

async function loadMyModule() {
	// console.log(loadedClass); --- loaded ok locally :/
	// await init();
	if (loadedClass) {
		await init();
	}
}

var display, ia, ldsc, ltit, limg, l_lnk, opl, oaa;
display = ia = ldsc = ltit = limg = l_lnk = opl = oaa = null;

var linkInputOBJ = { link_description: "", link_title: "", link: "", img_source: "" };

/* 
TODO:
import maps provide a manifest-type object
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap
*/

/* 
IF NOT USING DYNAMIC, THIS ALONE WOULD WORK:
// aliasing the named export from mod codebase
// import { AutoLink as Alink } from "./modular_codebase.js" 
// window.addEventListener("load", init);
*/

/* 
MODULAR CODEBASE EXPORTS A generator function that points its parameter and such to a class:
  AutoFormatLink_withPossibleImgData . So, the class was aliased and now the shorter name used.
since at this author time, I don't know how to export that class via name here we are.
export { MyLinkGeneratorFunc as "AutoLink" };
*/

async function init() {
	replaceBackgroundWithImageSrc();
	buildGUI_linkgeneration();
	activateHandlers();
	activateKeyboard(onEnterReleased);
}

function activateHandlers() {
	var droppedLink = document.querySelector("#page_link");
	droppedLink.addEventListener(
		"drop",
		function (event) {
			for (const item of event.dataTransfer.items) {
				if (item.kind === "string" && item.type.match(/^text\/plain/)) {
					// This item is the target node
					item.getAsString((s) => {
						dropHandler(droppedLink, s);
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
		dropHandler
	);
}

function dropHandler(el, s) {
	el.value = s;
	// console.log("♦♠dropHandler:::", el.value);
	collectLinkInputOBJ();
	return el.value.trim();
}

function onEnterReleased() {
	collectLinkInputOBJ();
}

function collectLinkInputOBJ() {
	display = document.querySelector(".text");
	ia = document.querySelector("#interaction_area");
	ldsc = document.querySelector("#link_description");
	ltit = document.querySelector("#link_title");
	limg = document.querySelector("#link_img_src");
	l_lnk = document.querySelector("#page_link");
	opl = document.querySelector("#output_link");
	oaa = document.querySelector("#output_accumulation_area");
	linkInputOBJ.link_description = ldsc.value.trim();
	linkInputOBJ.link_title = ltit.value.trim();
	linkInputOBJ.img_source = limg.value.trim();
	linkInputOBJ.link = l_lnk.value.trim();
	console.log(linkInputOBJ);
	console.log("this is fired when the ENTER button is released");
	var newLinkHome = document.createElement("div");
	newLinkHome.setAttribute("class", "video_link");

	var populateImagesintoLinks = true;
	var newLink = newLinkHome.appendChild(
		Alink(linkInputOBJ.link, linkInputOBJ.link_description, linkInputOBJ.img_source, populateImagesintoLinks)
	);
	newLink.setAttribute("class", "href");
	document.querySelector("#output_area").appendChild(newLinkHome);
	opl.value = newLinkHome.innerHTML;
	oaa.value = oaa.value + "<br />" + newLinkHome.innerHTML;
	return linkInputOBJ;
}

function buildGUI_linkgeneration() {
	try {
		removeNode(document.querySelector("#interaction_area"));
	} catch (error) {
		console.log("interaction_area didn't exist, building it.");
	}
	var interaction_area = createEl("div");
	interaction_area.setAttribute("id", "interaction_area");
	var mainTextDisplay = document.querySelector(".text");

	insertBefore(mainTextDisplay, interaction_area);

	var allLinks = createEl("a");
	var allLinksText = createText("Go Back To Listings");
	allLinks.appendChild(allLinksText);
	allLinks.setAttribute("href", "./../__index_learning_links.html");
	allLinks.setAttribute("class", "link");

	var p = createEl("p");
	var pText = createText(
		"drag a link from the net (or youtube) into the area indicated below, and this will generate html (video_link div) below. "
	);
	p.appendChild(pText);

	var output = createEl("div");

	// input.setAttribute("id", "input_area");
	// userTextInput.setAttribute("id", "user_input");

	var div1 = createEl("div");
	var div2 = createEl("div");
	var div3 = createEl("div");

	var linkDesc = createEl("input");
	linkDesc.setAttribute("type", "text");
	linkDesc.setAttribute("id", "link_description");
	linkDesc.setAttribute("placeholder", "anchor description content");
	var lDescLabel = createEl("label");
	lDescLabel.setAttribute("for", "link_description");
	var lDescLabelText = createText("TextContent");
	lDescLabel.appendChild(lDescLabelText);
	div1.appendChild(linkDesc);
	div1.appendChild(lDescLabel);

	var linkTitle = createEl("input");
	linkTitle.setAttribute("type", "text");
	linkTitle.setAttribute("id", "link_title");
	linkTitle.setAttribute("placeholder", "link title");
	var linkTitleLabel = createEl("label");
	linkTitleLabel.setAttribute("for", "link_title");
	var linkTitleLabelText = createText("Title");
	linkTitleLabel.appendChild(linkTitleLabelText);
	div2.appendChild(linkTitle);
	div2.appendChild(linkTitleLabel);

	var linkImgSrc = createEl("input");
	linkImgSrc.setAttribute("type", "text");
	linkImgSrc.setAttribute("id", "link_img_src");
	linkImgSrc.setAttribute("placeholder", "link image source");
	var linkImgSrcLabel = createEl("label");
	linkImgSrcLabel.setAttribute("for", "link_img_src");
	var linkImgSrcLabelText = createText("Image Source");
	linkImgSrcLabel.appendChild(linkImgSrcLabelText);
	div3.appendChild(linkImgSrc);
	div3.appendChild(linkImgSrcLabel);

	interaction_area.appendChild(allLinks);
	interaction_area.appendChild(p);

	interaction_area.appendChild(div1);
	interaction_area.appendChild(div2);
	interaction_area.appendChild(div3);

	var pageLinkLabel = createEl("label");
	pageLinkLabel.setAttribute("for", "page_link");
	var pageLinkLabelText = createText("Drop Link Here:");
	pageLinkLabel.appendChild(pageLinkLabelText);

	interaction_area.appendChild(pageLinkLabel);

	var pageLink = createEl("textarea"); // -- DROP EVENT ON THIS ELEMENT
	pageLink.setAttribute("id", "page_link");
	pageLink.setAttribute("name", "page_link");
	pageLink.setAttribute("cols", "30");
	pageLink.setAttribute("rows", "3");
	pageLink.setAttribute(
		"placeholder",
		"drop a link here. (it's assumed this is a youtube link with a valid v= option, or embed)"
	);
	interaction_area.appendChild(pageLink);

	var outputLink = createEl("textarea");
	outputLink.setAttribute("id", "output_link");
	outputLink.setAttribute("name", "output_link");
	outputLink.setAttribute("cols", "30");
	outputLink.setAttribute("rows", "4");
	outputLink.setAttribute("placeholder", "here's the output as html text.");
	interaction_area.appendChild(outputLink);

	output.setAttribute("id", "output_area");
	interaction_area.appendChild(output);

	var outputAccArea = createEl("textarea");
	outputAccArea.setAttribute("id", "output_accumulation_area");
	outputAccArea.setAttribute("name", "output_accumulation_area");
	outputAccArea.setAttribute("cols", "30");
	outputAccArea.setAttribute("rows", "10");
	outputAccArea.setAttribute("placeholder", "all the accumulated output text as formatted");
	interaction_area.appendChild(outputAccArea);

	var consoleLogArea = createEl("div");
	consoleLogArea.setAttribute("id", "console_log");
	interaction_area.appendChild(consoleLogArea);

	// interaction_area.appendChild(input);
	// interaction_area.appendChild(userTextInput);
}

function linksFromList() {
	var ia = document.querySelector("#input_area");
	var oa = document.querySelector("#output_area");

	var populateImagesintoLinks = true;
	try {
		if (!ia.querySelector("#link_description")) {
			populateImagesintoLinks = false;
		}
	} catch (error) {
		/* ignore any errors because the UI may not be available */
	}

	getListing().forEach(function (listing, listingIndex) {
		var newLinkHome = document.createElement("div");
		newLinkHome.setAttribute("class", "video_link");
		var newLink = newLinkHome.appendChild(Alink(listing.link, listing.link_text, populateImagesintoLinks));
		newLink.setAttribute("class", "href");
		oa.appendChild(newLinkHome);
	});

	return droppedLink;
}

function replaceBackgroundWithImageSrc() {
	/*dynamically find out the variable for setting the bg background. */
	var bg = document.querySelector("#background");
	bg.style.getPropertyValue("--whole_bg_url");
	/*dynamically set bg background to image with path after loading. */
	var background = document.querySelector("#background_img");
	bg.style.setProperty("--whole_bg_url", 'url("' + background.src + '")' || "https://placecats.com/louie/100/100%22");
	// console.log(window.getComputedStyle(bg).getPropertyValue("background"));
	/* 
    below is only looking in the first loaded stylesheet! above is a better way to locate
    the loaded style for the specific element 
	console.log([...document.styleSheets[0].cssRules].find((x) 
    => x.selectorText == "#modular_tester"));
    */
}

/*  
	// <script src="./modular_js_testing.js"></script> 
	// <script src="./modular_codebase.js"></script> 
	 

	   
	// must declare a file is a module
	// <script type="module" src="./modular_codebase.js"></script>  
 
	// import AutoLink from "./modular_codebase";
	// const {AutoLink:AutoLink} = await import("./modular_codebase");
	// 
	//  
*/
