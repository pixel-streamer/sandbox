function reportContentPriority(num) {
  console.log("this", this);
  console.log("num: ", num);
  this.prepend(document.createTextNode(num));
}

function removeExternalLinks() {
  //do something with all hrefs without current domain:
  var currentURL = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/") + 1
  );
  var pgAnchors = $("a");
  console.log("currentURL: ", currentURL);
  var linkHasWebProtocol = /http:|https:/g;
  for (var i = 0; i < pgAnchors.length; i++) {
    //console.log("linkHasWebProtocol: ", pgAnchors[i].href.match(linkHasWebProtocol));
    if (!pgAnchors[i].href.match(currentURL)) {
      pgAnchors.eq(i).find(":not.behance").remove();
      //if (pgAnchors[i].href.match(linkHasWebProtocol)) {
      //	console.log("linkHasWebProtocol: ", pgAnchors[i].href);
      /* 
			from: https://stackoverflow.com/questions/6186770/ajax-request-returns-200-ok-but-an-error-event-is-fired-instead-of-success
			*/
      /* $.ajax({
				type: 'GET',
				url: pgAnchors[i].href,
				contentType: 'application/json; charset=utf-8',
				data: 'json',
				dataType: 'text json',
				cache: false,
				success: AjaxSucceeded,
				error: AjaxFailed
			}); */
      //}
    }
    /* else{

		} */
  }
  /* var showing = $("body>div").not(".suppressed");
	//display a number in the div for priority
	showing.each(
		reportContentPriority
	); */
}

function flushBody() {
  var contentHome = $(document.body);
  contentHome.children().remove();
}

function initCollection(param) {
  //assumes param is id for kept section, or sections
  //now, org the content:
  //console.log("░░░initCollection░░░");

  if (param.match(/\,/g)) {
    param = param.split(",");
    for (var p = 0; p < param.length; p++) {
      param[p] += ">div.spotlight";
    }
    param = param.join(",").toString();

    var showingContent = $(param).not(".suppressed");
    //console.log("param: ",showingContent);
  } else {
    var showingContent = $(param + ">div.spotlight").not(".suppressed");
  }
  var contentHome = $(document.body);

  flushBody();

  /* 
	<div class="main_frame">
			<div class="canvas">
				<div class="art_house_thumbs">
					 
	 */
  /* 
	.spotlight .eqN  h1.img_title feeds the name of the thumbnail
	what about the descrtiption? where is it going to reside?
	the back/forward buttons?
   
	remember the theme builder interface
	 */
  var homeDocFrag = document.createDocumentFragment();
  var main_frameEl = renderEltoDom("div", null, null, ".main_frame");
  var divCanvasEl = renderEltoDom("div", null, null, ".canvas");
  var divArtHouseEl = renderEltoDom("div", null, null, ".art_house_thumbs");

  renderEltoDom("div", null, divCanvasEl, ".palette");
  renderEltoDom("div", null, divCanvasEl, ".knife");
  renderEltoDom("div", null, divCanvasEl, ".filbert");
  renderEltoDom("div", null, divCanvasEl, ".left-col-bg");
  renderEltoDom("div", null, divCanvasEl, ".right-col-bg");
  renderEltoDom("div", null, divCanvasEl, ".upper-left-corner");
  renderEltoDom("div", null, divCanvasEl, ".upper-right-corner");
  renderEltoDom("div", null, divCanvasEl, ".lower-left-corner");
  renderEltoDom("div", null, divCanvasEl, ".lower-right-corner");
  renderEltoDom("div", null, divCanvasEl, ".canvas_header");
  renderEltoDom("div", null, divCanvasEl, ".canvas_footer");
  divCanvasEl.appendChild(divArtHouseEl);
  main_frameEl.appendChild(divCanvasEl);
  homeDocFrag.appendChild(main_frameEl);
  contentHome.append(homeDocFrag);
  //make body visible
  $("body")[0].classList.replace("hidden", "shown");

  //console.clear();
  //showingContent.find(".thumbnail,.full_size").each(createHoverPreview);
  showingContent.find(".thumbnail,.full_size").each(function (index) {
    createWholeThumbnail.call($(this), index, divArtHouseEl);
  });
}

function initGUI() {
  //removeExternalLinks();
  initPaginationGUI();
  initCollection("#3d_renders");
//  initCollection("#3d_renders, #ui_symbols, #gif_animations");
  //initCollection("#3d_renders,#ui_symbols");
}

function renderEltoDom(ELkind, ELtext, ELcontainer, hook) {
  //returns EL if container isn't supplied
  if (ELkind !== (undefined || null)) {
    var EL = document.createElement(ELkind);
    if (ELkind === "p" || ELkind === "a" || ELkind === "span") {
      if (ELtext !== (undefined || null)) {
        var ELtextContent = document.createTextNode(ELtext);
        EL.appendChild(ELtextContent);
      }
    }
  } else {
    return null;
  }
  if (hook !== (undefined || null)) {
    if (hook.substring(0, 1) === "#") {
      EL.setAttribute("id", hook.substring(1, hook.length));
    } else {
      var classDots = /\./g;
      EL.setAttribute("class", hook.replace(classDots, " ").trim());
    }
  }
  if (ELcontainer !== (undefined || null)) {
    ELcontainer.appendChild(EL);
  } else {
    return EL;
  }
}

function loadAndRenderImgEl(_src, addToDomLocation) {
  var img = new Image();
  img.onload = function () {
    if (img.complete === true) {
      addToDomLocation.appendChild(img);
    }
  };
  img.onerror = function () {
    console.log(
      "there was a problem loading the resource from this location: " + _src
    );
  };
  img.src = _src;
}
function initPaginationGUI() {
  var docFrag = document.createDocumentFragment();

  console.log(
    "░░ initPaginationGUI-- put contextual content on the page for the links ░░"
  );

  var copySec = renderEltoDom("div", null, null, ".copy_section");
  var arrowNav = renderEltoDom("div", null, null, "#arrownav");

  //create Arrows, and set them up for events (passing the new links into them)

  var pgDescription = renderEltoDom(
    "p",
    "page description",
    null,
    ".page_description"
  );
  var arrLink1 = renderEltoDom("a", null, null, null);
  arrowNav.appendChild(arrLink1);
  loadAndRenderImgEl("images/fullsize/site_assets/previous.png", arrLink1);

  var arrLink2 = renderEltoDom("a", null, null, null);
  loadAndRenderImgEl("images/fullsize/site_assets/browse-all.png", arrLink2);
  arrowNav.appendChild(arrLink2);

  var arrLink3 = renderEltoDom("a", null, null, null);
  loadAndRenderImgEl("images/fullsize/site_assets/next.png", arrLink3);
  arrowNav.appendChild(arrLink3);

  copySec.appendChild(arrowNav);
  copySec.appendChild(pgDescription);
  docFrag.appendChild(arrowNav);
  docFrag.appendChild(copySec);
  /*
 div.copy_section
	  div#arrownav 
 
		<img src="images/fullsize/site_assets/previous.png" /> 

		<img src="images/fullsize/site_assets/browse-all.png"  />
 
		<img src="images/fullsize/site_assets/next.png"  />
 */
  /*
<hn.page_description *n
<p.category_page_copy *n
 
div.main_frame
		 div.canvas 
	 div.art_house 
	??	maybe:  div#arrownav instead of above
*/

  document.body.appendChild(docFrag);
}

function createCanvasElement(w, h) {
  /*   if (arguments.length == 0) {
    return document.createElement("canvas");
  } else {
    var cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    return cv;
  } */
  return new Image();
}

function populateNewCanvas(img, _dx, _dy) {
  //console.log("░░░░populateNewCanvas: ", img);
  var canvasEl = createCanvasElement(img.naturalWidth, img.naturalHeight);
  //canvasEl.getContext("2d").drawImage(img, _dx, _dy,img.naturalWidth,img.naturalHeight);
  //console.log("░░░░populateNewCanvas: ", img, canvasEl.width, canvasEl.height);

  canvasEl.src = img.src;
  return canvasEl;
}

function randomRange(max, min, bool) {
  if (bool === true) {
    return Math.round(Math.random() * (max - min) + min, 1);
  } else {
    return Math.random() * (max - min) + min;
  }
}

function createThumbCaption() {
  /*
	TODO: this caption should be a canvas object, so when it's rotated, it's not ugly 
	 */
  /*
	TODO: handle caption text sizes
	 */
  var thumb_caption = document.createElement("p");
  thumb_caption.setAttribute("class", "caption");
  //handle a really long description
  var thumb_captionText = document.createTextNode(
    this.parent().find("h1.img_title").text()
  );
  if (thumb_captionText.data.trim().slice().split(" ").length > 3) {
    thumb_caption.appendChild(thumb_captionText);
    thumb_caption.setAttribute(
      "style",
      "font-size:65%;margin-top:.5rem;line-height:110%;"
    );
  } else if (thumb_captionText.data.trim().slice().split(" ").length > 2) {
    thumb_caption.appendChild(thumb_captionText);
    thumb_caption.setAttribute("style", "font-size:85%;");
  } else {
    thumb_caption.appendChild(thumb_captionText);
  }
  return thumb_caption;
}

function createWholeThumbnail(indexNum, createHere) {
  if (this[0].className.match("thumb")) {
    //create for a thumbnail only:
    var thumbnail_home = document.createElement("a");
    thumbnail_home.setAttribute(
      "style",
      "transform:rotate3d(1, 1, 3, " +
        randomRange(12, -12, false) +
        "deg);z-index: 50;"
    );

    //assumed full-size named exists. Needs to build a full-sized link gui
    thumbnail_home.setAttribute(
      "href",
      this.parent().find(".full_size").attr("href")
    );
    var thumbHolder = document.createElement("div");
    thumbHolder.setAttribute("class", "thumbs");
    var thumb_square = document.createElement("div");
    thumb_square.setAttribute("class", "thumb_square");

    var thumb_caption = createThumbCaption.call(this);

    thumbHolder.appendChild(thumb_square);
    thumbHolder.appendChild(thumb_caption);
    thumbnail_home.appendChild(thumbHolder);
    createHere.append(thumbnail_home);
    /* 	<a style="transform:rotate3d(1, 1, 3, 6deg); z-index: 50;"
								href="images/fullsize/3d_renders/bottle.jpg" title="bottle" target="_blank">
								<div class="thumbs">
									<div class="thumb_square">
										<img src="images/fullsize/3d_renders/bottle.jpg" />
									</div>
									<p class="caption">
										Bottle
									</p>
								</div>
							</a> */
    //this will build the home thumbnail dom for containment of the thumbnail proper
    var img = new Image();
    img.onload = function () {
      if (img.complete === true) {
        var createdCanvas = populateNewCanvas(img, 0, 0);
        //createdCanvas.setAttribute("style", "position:absolute;");
        //	$(createdCanvas).toggle();
        //	console.log("██████████████████ createHere: ", thumb_square);
        /* $(createHere).css({ "min-width": "calc(16vw - 2rem)", "min-height": "4rem", "display": "inline-block", "box-sizing": "border-box", "padding": ".5rem", "border": "1px solid black", "margin": "auto", "vertical-align": "middle", "line-height": "4rem" }); */
        /* createHere.addEventListener("click", function (e) {
					e.preventDefault();
					//console.log("░░░░createCanvasWimg createdCanvas event: ", this);
				});
				createHere.addEventListener("mouseover", function () {
					$(createdCanvas).toggle();
					//console.log("░░░░createCanvasWimg createdCanvas event: ", this);
				});
				createHere.addEventListener("mouseout", function () {
					$(createdCanvas).toggle();
					//console.log("░░░░createCanvasWimg createdCanvas event: ", this);
				}); */
        thumb_square.append(createdCanvas);
      }
    };
    img.onerror = function () {
      console.log(
        "there was a problem loading the resource from this location: " +
          this.src
      );
    };
    img.src = this[0].href;
  }
}

function createCanvasWimg(indexNum, createHere) {
  //indexNum not used
  var img = new Image();
  img.onload = function () {
    if (img.complete === true) {
      var createdCanvas = populateNewCanvas(img, 0, 0);
      createdCanvas.setAttribute("style", "position:absolute;");
      $(createdCanvas).toggle();
      console.log("██████████████████ createHere: ", createHere);
      $(createHere).css({
        "min-width": "calc(16vw - 2rem)",
        "min-height": "4rem",
        display: "inline-block",
        "box-sizing": "border-box",
        padding: ".5rem",
        border: "1px solid black",
        margin: "auto",
        "vertical-align": "middle",
        "line-height": "4rem",
      });
      createHere.addEventListener("click", function (e) {
        e.preventDefault();
        //console.log("░░░░createCanvasWimg createdCanvas event: ", this);
      });
      createHere.addEventListener("mouseover", function () {
        $(createdCanvas).toggle();
        //console.log("░░░░createCanvasWimg createdCanvas event: ", this);
      });
      createHere.addEventListener("mouseout", function () {
        $(createdCanvas).toggle();
        //console.log("░░░░createCanvasWimg createdCanvas event: ", this);
      });
      createHere.append(createdCanvas);
    }
  };
  img.src = this.href;
}

function createHoverPreview(num) {
  var hPreview = createCanvasWimg.call(this, num, this);
}

function AjaxSucceeded() {}

function AjaxFailed() {}

var contentModel = function () {
  this._ContentCollection = null;
};
contentModel.prototype.renderSection = function () {};
