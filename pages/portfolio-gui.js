function reportContentPriority(num) {
    console.log("this", this);
    console.log("num: ", num);
    this.prepend(document.createTextNode(num));
}

function removeExternalLinks() {
    var currentURL = window.location.href.substring(
        0,
        window.location.href.lastIndexOf("/") + 1
    );
    var pgAnchors = $("a");
    console.log("currentURL: ", currentURL);
    var linkHasWebProtocol = /http:|https:/g;
    for (var i = 0; i < pgAnchors.length; i++) {
        if (!pgAnchors[i].href.match(currentURL)) {
            pgAnchors.eq(i).find(":not.behance").remove();
        }
    }
}

function flushBody() {
    var contentHome = $(document.body);
    contentHome.children().remove();
}

function initCollection(param) {
    if (param.match(/\,/g)) {
        param = param.split(",");
        for (var p = 0; p < param.length; p++) {
            param[p] += ">div.spotlight";
        }
        param = param.join(",").toString();

        var showingContent = $(param).not(".suppressed");
    } else {
        var showingContent = $(param + ">div.spotlight").not(".suppressed");
    }
    var contentHome = $(document.body);

    flushBody();

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
    $("body")[0].classList.replace("hidden", "shown");

    showingContent.find(".thumbnail,.full_size").each(function (index) {
        createWholeThumbnail.call($(this), index, divArtHouseEl);
    });
}

function initGUI() {
    //  initPaginationGUI();
    // initCollection("#3d_renders");
    initCollection("#3d_renders, #gif_animations");
    //initCollection("#gif_animations");
}

function renderEltoDom(ELkind, ELtext, ELcontainer, hook) {
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
            "there was a problem loading the resource from this location: " +
                _src
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

    var pgDescription = renderEltoDom(
        "p",
        "page description",
        null,
        ".page_description"
    );
    var arrLink1 = renderEltoDom("a", null, null, null);
    loadAndRenderImgEl("images/fullsize/site_assets/previous.png", arrLink1);
    arrowNav.appendChild(arrLink1);

    var arrLink2 = renderEltoDom("a", null, null, null);
    loadAndRenderImgEl("images/fullsize/site_assets/browse-all.png", arrLink2);
    arrowNav.appendChild(arrLink2);

    var arrLink3 = renderEltoDom("a", null, null, null);
    loadAndRenderImgEl("images/fullsize/site_assets/next.png", arrLink3);
    arrowNav.appendChild(arrLink3);

    copySec.appendChild(pgDescription);
    docFrag.appendChild(arrowNav);
    docFrag.appendChild(copySec);
    document.body.appendChild(docFrag);
}

function createCanvasElement(w, h) {
    return new Image();
}

function populateNewCanvas(img, _dx, _dy) {
    var canvasEl = createCanvasElement(img.naturalWidth, img.naturalHeight);
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
    var thumb_caption = document.createElement("p");
    thumb_caption.setAttribute("class", "caption");
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
        var thumbnail_home = document.createElement("a");
        thumbnail_home.setAttribute(
            "style",
            "transform:rotate3d(1, 1, 3, " +
                randomRange(12, -12, false) +
                "deg);z-index: 50;"
        );

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

        var img = new Image();
        img.onload = function () {
            if (img.complete === true) {
                var createdCanvas = populateNewCanvas(img, 0, 0);
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
            });
            createHere.addEventListener("mouseover", function () {
                $(createdCanvas).toggle();
            });
            createHere.addEventListener("mouseout", function () {
                $(createdCanvas).toggle();
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
