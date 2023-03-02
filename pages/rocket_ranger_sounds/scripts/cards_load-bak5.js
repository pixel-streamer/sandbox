var stage,
    stageBounds,
    importantVideo,
    fontsHaveLoaded = false,
    ticker,
    subject_content,
    image_content,
    startup_content,
    fileLoader,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector(".full_size_canvas"),
    generalPadding = 16,
    largeText = 0;

let nofullhover;

let resizeObserver,
    delay = 250,
    timeout;

let screenLog = document.querySelector("#screen-log");
/*
ResizeObserver.disconnect()
    Unobserves all observed Element targets of a particular observer.
ResizeObserver.observe()
    Initiates the observing of a specified Element.
ResizeObserver.unobserve()
    Ends the observing of a specified Element.
*/
window.addEventListener("load", loadGoogleFonts);
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
// import { loadGoogleFonts }
// import "font-loading_module.js";

function loadFonts(config) {
    var loader = new createjs.FontLoader(config, true);
    loader.on("complete", handleFontLoad);
    loader.load();
}

const fontload_evt = new CustomEvent("fontload_evtStr", {
    detail: { msg: ":::fontloaded, now setup stage" },
});

function handleFontLoad(e) {
    fontsHaveLoaded = true;
    window.dispatchEvent(fontload_evt);
}

window.addEventListener("fontload_evtStr", setupStageForInteraction);

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const startup_evt = new CustomEvent("startup_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});
window.addEventListener("startup_evtStr", addStartupText);

const gameSetup_evt = new CustomEvent("gameSetup_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});
window.addEventListener("gameSetup_evtStr", setupGame);

const gamePlay_evt = new CustomEvent("gamePlay_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});
window.addEventListener("gamePlay_evtStr", playGame);

function setupStageForInteraction() {
    init();
    bigCanvas.setAttribute("width", w);
    bigCanvas.setAttribute("height", h);
    stage = bigCanvas;
    stage = new createjs.Stage("big_stage");
    stage.setBounds(0, 0, w, h);
    stageBounds = stage.getBounds();

    startup_content = new createjs.Container();
    startup_content.name = "startup_content";

    stage.addChild(startup_content);

    ticker = createjs.Ticker;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.addEventListener("tick", tick);
    //nofullhover = window.matchMedia("(hover:none), (hover:on-demand)").matches;
    interactive_content = new createjs.Container();
    interactive_content.name = "interactive_content";

    image_content = new createjs.Container();
    image_content.name = "image_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";
    stage.addChildAt(subject_content);
    stage.addChildAt(image_content);
    stage.addChild(interactive_content);

    addStartupText();
}

function tick(event) {
    stage.update(event);
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

resizeObserver = new ResizeObserver((entries) => {});
resizeObserver.observe(document.querySelector("#testCanvas"));
window.addEventListener("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(handle_Redraw, delay);
    return;
});

function handle_Redraw() {
    // console.log(
    //     "▄▄▄▄▄▄▄▄▄handle_Redraw▄▄▄▄▄▄▄▄",
    //     "find a way to add something to all corners of the stage, and re-dim that sucker"
    // );
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

function init() {
    // console.log("▄▄▄▄▄▄▄▄▄init▄▄▄▄▄▄▄▄");
}

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
function addStartupText() {
    console.log("addStartupText");
    var nextLargerTextSize = getGoldenRatio(w) * 0.04;
    var largerTextContainer = new createjs.Container();

    var largerText = new createjs.Text(
        "click to begin".toUpperCase(),
        "normal " + nextLargerTextSize + "px 'Press Start 2P'",
        "#ffffff"
    );

    var largerTextMetrics = largerText.getMetrics();

    var textClickArea = new createjs.Shape();
    textClickArea.graphics
        .beginFill("#450067")
        .drawRect(
            0,
            0,
            largerTextMetrics.width + 32,
            largerTextMetrics.height + 32
        )
        .endFill();
    largerTextContainer.addChild(textClickArea);
    largerTextContainer.addChild(largerText);
    var largerTextW = largerTextMetrics.width;
    var largerTextH = largerTextMetrics.height;

    largerText.x = (stageBounds.width - largerTextMetrics.width) / 2;
    largerText.y = largerTextMetrics.height / 2;

    textClickArea.x = (stageBounds.width - (largerTextMetrics.width + 32)) / 2;
    textClickArea.y = largerText.y - (largerTextMetrics.height + 24) / 2;
    largerTextContainer.y = 0;
    interactive_content.addChild(largerTextContainer);

    largerTextContainer.addEventListener(
        "click",
        function () {
            largerTextContainer.visible = false;
            largerTextContainer.mouseEnabled = false;
            window.dispatchEvent(gameSetup_evt);
        },
        { once: true }
    );
}

function addInteractiveText(interactivePhrase) {
    largeText = getGoldenRatio(w) * 0.085;
    var interactiveTextHitArea = new createjs.Container();
    var interactiveTextMask = new createjs.Shape();

    var gamePlayText = new createjs.Text(
        interactivePhrase,
        "16px 'Press Start 2P'",
        "#FFCC00"
    );
    var textMetrics = gamePlayText.getMetrics();
    var textW = textMetrics.width;
    var textH = textMetrics.height;
    gamePlayText.x = 8;
    gamePlayText.y = 8;

    interactiveTextMask.graphics
        .beginFill("rgba(0,0,0,.3)")
        .drawRect(0, 0, textW + 16, textH + 16)
        .endFill();

    interactiveTextHitArea.regX = 0;
    interactiveTextHitArea.regY = 0;

    interactiveTextHitArea.addChild(interactiveTextMask);
    interactiveTextHitArea.addChild(gamePlayText);

    interactiveTextHitArea.x =
        (stageBounds.width - interactiveTextHitArea.getBounds().width) / 2;
    interactiveTextHitArea.y =
        (stageBounds.height - interactiveTextHitArea.getBounds().height) / 2;

    interactiveTextHitArea.addEventListener(
        "click",
        function () {
            console.log("clicked me one time!");
            interactiveTextHitArea.visible = false;
            interactiveTextHitArea.mouseEnabled = false;
            window.dispatchEvent(gamePlay_evt);
        },
        { once: true }
    );

    // handle_SoundsRegistry();
    interactive_content.addChild(interactiveTextHitArea);
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

function getRandomHexNum() {
    // get a random hex value for the color of something:
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function getGoldenRatio(num) {
    /*
    sin(54°) = φ/2

    Golden ratio formula is ϕ = 1 + (1/ϕ). ϕ is also equal to 2 × sin (54°)
    If we take any two successive Fibonacci Numbers, their ratio is very close
    to the value 1.618 (Golden ratio).  cos(36°)*2
    From en.wikipedia.org/wiki/Golden_ratio#Alternative_forms :
    "These correspond to the fact that the length of the diagonal of a regular
    pentagon is φ times the length of its side" 
    */
    return parseFloat(num / 1.618).toPrecision(3);
}

function resizeToKnownDimensions(contentW, contentH, constraintW, constraintH) {
    var containerAspect = constraintW / constraintH;

    var fullW = contentW;
    var fullH = contentH;

    var aspect = fullW / fullH;
    var imageAspect;

    var fullMax = Math.max(fullW, fullH);
    var fullMin = Math.min(fullW, fullH);

    var contentMax = Math.max(constraintW, constraintH);
    var contentMin = Math.min(constraintW, constraintH);

    let newScaleRatio;

    imageAspect = aspect <= 1 ? "portrait" : "landscape";

    if (aspect < 1 || aspect === 1) {
        //use contentMin/fullMax
        newScaleRatio = contentMin / fullMax;
        contentW = fullW * newScaleRatio;
        contentH = fullH * newScaleRatio;
    } else if (aspect > 1) {
        //use contentMax/fullMax unless the containerAspect is greater than aspect
        var greater = Math.max(aspect, containerAspect);
        if (greater === aspect) {
            //console.log("greater.... ASPECT!");
            newScaleRatio = contentMax / fullMax;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        } else {
            //console.log("greater.... CONTAINERASPECT!");
            newScaleRatio = contentMin / fullMin;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
    }
    return {
        imageAspect: imageAspect,
        aspect: containerAspect,
        scaleRatio: newScaleRatio,
        newW: contentW,
        newH: contentH,
    };
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
function setupGame() {
    console.log("setupGame");
    var phraseAsStr = "Welcome to Cards.\n\t\t\tLet's Play.";
    addInteractiveText(phraseAsStr);
}
function playGame() {
    console.log("playGame");
    fileLoader = new createjs.LoadQueue(true);
    // fileLoader.on("fileload", handle_ImageLoadReady);
    // fileLoader.on("progress", handle_ImageLoadProgress);
    fileLoader.on("complete", handle_ImageLoadComplete);
    // fileLoader.loadFile({
    //     src: "../images/ui_vectors/cards_all_use-copy.svg",
    //     id: "all_cards",
    //     type: createjs.Types.IMAGE,
    // });

    //cards size @960 768 -- 69x96px
    fileLoader.loadFile({
        src: "../images/sprites/cards_sprite.png",
        id: "all_cards",
        crossOrigin: true,
        type: createjs.Types.IMAGE,
        //type: createjs.Types.SVG,
    });
    // displaySingleCard(getSuitCode("hearts"));
}

function handle_ImageLoadReady(e) {
    // console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type, e.result);
    // var svgElement = e.target.getResult("all_cards");
    // var svgElement = e.result;
    // var bg = new createjs.Bitmap(svgElement);
    // bg.image.onload = function () {
    //     console.log("OMG!", this.naturalWidth);
    // };
    // image_content.addChild(bg);

    return;
    // console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type, e.result);

    // var src = e.item.src;
    // var extension_trim = src.substring(src.lastIndexOf("/") + 1);
    // var extension = extension_trim.substring(
    //     extension_trim.lastIndexOf(".") + 1
    // );
    // console.log(":::::▄█ src █▄", e.result);
    // console.log(":::::▄█ src █▄", e.result.querySelector("#D-10"));

    // var bg = new createjs.Bitmap(e.result);
    // image_content.addChild(bg);
    // var fsBiggest = resizeToKnownDimensions(
    //     e.result.width,
    //     e.result.height,
    //     w,
    //     h
    // );
    // bg.scaleX = fsBiggest.scaleRatio;
    // bg.scaleY = fsBiggest.scaleRatio;
    //console.log(":::::▄█ svg first el █▄", e.result.querySelector( id ));

    /*  switch (extension) {
        case "svg":
            addSVG(e);
            break;
        // case "mp4":
        //     handleLoadedMovie(e);
        //     break;
        default:
            layoutImage(e);
            break;
    } */
}

function handle_ImageLoadComplete(e) {
    var svgElement = e.target.getResult("all_cards");

    let xCount = 0;
    let yCount = 0;
    let xSpacing = 3.25;
    let ySpacing = 3.25;
    let xWidth = 69.8;
    let yHeight = 97;
    var yPos1 = ySpacing;
    var xPos1 = xSpacing;

    var fsBiggest = resizeToKnownDimensions(
        svgElement.naturalWidth,
        svgElement.naturalHeight,
        w,
        h
    );
    console.log(
        "here's the size of the image: ",
        fsBiggest.newW,
        fsBiggest.newH,
        svgElement.naturalWidth,
        svgElement.naturalHeight
    );

    //assume image loaded
    //assume cards image :D
    //assume scale of cards: no scale w,h: 69 * 96  2px spacing
    //cut cards into pixel slices for inclusion onto deck.

    var cardsDeck = new createjs.Container();
    var bmp = new createjs.Bitmap(svgElement);
    bmp.scaleX = fsBiggest.scaleRatio;
    bmp.scaleY = fsBiggest.scaleRatio;
    //bmp.cache(2, 2, w, h);
    // fsBiggest.scaleRatio is calculated to fit cards on the screen
    // store all the cards in one container deck

    allCards = makeRegularDeck();
    allCards.forEach(function (member1, index1) {
        // numeric_value: "11", designation: "j",
        // bmp.cache(2, 2, 69, 96);
        // console.log(index1);
        if (index1 % 13 === 0) {
            xPos1 = xSpacing;
            yPos1 = yCount * yHeight + yCount * ySpacing;
            yCount++;
            xCount = 0;
        }
        xPos1 = xCount * xWidth;
        var cardContainer = new createjs.Container();
        cardContainer.name = allCards[index1].short_name;
        allCards[index1].bmp = bmp.clone(); //clone the LARGE image (cache only captures rect of this)
        allCards[index1].bmp.cache(xPos1, yPos1, xWidth, yHeight);
        allCards[index1].bmp.regX = 0;
        allCards[index1].bmp.regY = 0;
        allCards[index1].bmp.name = allCards[index1].short_name;
        allCards[index1].cardback = bmp.clone(); //replaced later
        allCards[index1].cardback.cache(
            xWidth,
            (ySpacing + yHeight) * 4,
            xWidth,
            yHeight
        );
        allCards[index1].cardback.name = allCards[53].short_name;

        // allCards[index1].bmp.regX =
        //      allCards[index1].bmp.getBounds().x - xWidth - xSpacing * xCount;
        // allCards[index1].bmp.regY =
        //      allCards[index1].bmp.getBounds().y - yHeight - ySpacing * yCount;
        allCards[index1].bmp.x = xSpacing * xCount;
        allCards[index1].bmp.y = ySpacing * yCount;
        allCards[index1].game_value = parseInt(allCards[index1].numeric_value);
        var cardbackBounds = allCards[index1].cardback.getBounds();

        allCards[index1].cardback.regX = cardbackBounds.x - xPos1;
        allCards[index1].cardback.regY = cardbackBounds.y - yPos1;
        allCards[index1].cardback.x = xSpacing * xCount +0;
        allCards[index1].cardback.y = ySpacing * yCount +0;

        // allCards[index1].cardback.visible = true;
        // allCards[index1].bmp.visible = true;
        cardContainer.addChild(allCards[index1].bmp);
        cardContainer.addChild(allCards[index1].cardback);
        cardsDeck.addChild(cardContainer);
        allCards[index1].cardWhole = cardContainer;
        xCount++;
    });

    cardsDeck.setBounds(0, 0, fsBiggest.newW, fsBiggest.newH);

    image_content.addChild(cardsDeck);

    var cardback = allCards
        .filter((allCards) => allCards.cardWhole.name == "R-BACK2")
        .slice()[0];

    allCards.forEach(function (popCard, index3) {
        popCard.bmp.addEventListener("click", function (e) {
            console.log("bmp designation: ", popCard.bmp.name);
            console.log("cardback designation: ", popCard.cardback.name);

            // e.target.getChildIndex(0).visible = false;
            popCard.cardWhole.getChildByName(popCard.bmp.name).visible = false;
            popCard.cardWhole.getChildByName(
                popCard.cardback.name
            ).visible = false;

            // popCard.cardWhole.getChildAt(0).visible = true;
            // popCard.cardWhole.getChildAt(1).visible = false;
        });
    });
    console.log(allCards);
}

function imgCreator(imgSrc, callBack) {
    //only works now with a verified src that needs to download, not a blob
    var imgPopped = loadImage(imgSrc)
        .then(function (imgPopped) {
            return imgPopped;
        })
        .then(function (imgPopped) {
            var fsBiggest = resizeToKnownDimensions(
                imgPopped.naturalWidth,
                imgPopped.naturalHeight,
                w,
                h
            );
            imgPopped.setAttribute("width", fsBiggest.newW);
            imgPopped.setAttribute("height", fsBiggest.newH);
            callBack(imgPopped, fsBiggest);
        })
        .catch(function (err) {
            return console.error("damn, that errored out.: ", err, err.target);
        });
}

async function populateImg64(url) {
    //console.log("::: populateImg64 :::", url);
    return await new Promise(function (resolve, reject) {
        try {
            var img = new Image();
            img.src = url;
            return resolve(img);
        } catch (err) {
            return reject;
        }
    });
}

async function loadImage(url) {
    return await new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener("load", function () {
            //console.log("::: loadImage :::", img.naturalWidth);
            if (img.complete && img.naturalWidth > 0) {
                return resolve(img);
            }
        });
        img.addEventListener("error", function (err) {
            return reject(err);
        });
        img.src = url;
    });
}

var galleryConfig = {};
galleryConfig.thumbnailW = 85;
galleryConfig.thumbnailH = 64;

function addSVG(e) {
    var bg = new createjs.Bitmap(e.result);
    image_content.addChild(bg);
    var fsBiggest = resizeToKnownDimensions(
        e.result.width,
        e.result.height,
        w,
        h
    );
    bg.scaleX = fsBiggest.scaleRatio;
    bg.scaleY = fsBiggest.scaleRatio;
}

function layoutImage(e) {
    var bg = new createjs.Bitmap(e.result);
    // bg.scaleX = galleryConfig.thumbnailW / e.result.width;
    // bg.scaleY = galleryConfig.thumbnailH / e.result.height;

    //add the images to the content
    image_content.addChild(bg);

    var fsBiggest = resizeToKnownDimensions(
        e.result.width,
        e.result.height,
        w,
        h
    );
    bg.scaleX = fsBiggest.scaleRatio;
    bg.scaleY = fsBiggest.scaleRatio;
}

function loadCards() {
    console.log("load in some cards");
}

function displaySingleCard() {
    console.log("display single card");

    allCards = makeRegularDeck();
    var shortNameCards = [];
    allCards.forEach(function (member) {
        shortNameCards.push(member.short_name);
    });
    console.log(shortNameCards);

    var randomShortName = Math.floor(Math.random() * shortNameCards.length);
    var newSrc =
        "../images/sprites/cards_sprite.png" +
        "#" +
        shortNameCards[randomShortName];

    console.log("newSrc: ", newSrc);

    fileLoader.loadFile({
        src: newSrc,
        id: "all_cards",
        crossOrigin: true,
        type: createjs.Types.IMAGE,
    });
}

function getSuitCode(suit) {
    console.log("getSuitCode");
    var symbol = suit.toLowerCase();
    var choice;
    switch (symbol) {
        case "spades":
            //♠262
            choice = "♠";
            break;
        case "hearts":
            //♥259
            choice = "♥";
            break;
        case "clubs":
            //♣261
            choice = "♣";
            break;
        case "diamods":
            //♦260
            choice = "♦";
            break;
        default:
            //
            break;
    }
    return choice;

    /*
·250 ■254 ☺257 ☻258 ♥259 ♦260 ♣261 ♠262 •263 ◘264
○265 ◙266 ♂267 ♀268 ♪269 ♫270 ☼271 ►272 ◄273 ↕274
‼275 ¶276 §277 ▬278 ↨279 ↑280 ↓281 →282 ←283 ↔285
▲286 ▼287 ▲30 ▼31 ·0183 ∙249 °248 “0147 ”0148
•0149 –0150 —0151 ™0153 ©0169 ¯0175 ‘0145 ’0146 
*/
}

/* 
makeRegularDeck IS *** MODDED *** FROM A DIFFERENT FILE!
*/
let deck; //can be accessible after building.
let isDeckBuilt = false;
let allCards;
let isUsingJokers = false;
//TODO: add event dispatch for built deck.
//isDeckBuilt makeRegularDeck

function makeRegularDeck() {
    deck = [];
    let tableauSpades = [];
    let tableauDiamonds = [];
    let tableauClubs = [];
    let tableauHearts = [];
    let countingJokersIn = [];
    let card_back = [];
    // isUsingJokers = true;

    let acesLow = true;

    let card_01_h = {
        numeric_value: "1",
        short_name: "H-A",
        name: "ace",
        designation: "a",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_02_h = {
        numeric_value: "2",
        short_name: "H-2",
        name: "two",
        designation: "02",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_03_h = {
        numeric_value: "3",
        short_name: "H-3",
        name: "three",
        designation: "03",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_04_h = {
        numeric_value: "4",
        short_name: "H-4",
        name: "four",
        designation: "04",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_05_h = {
        numeric_value: "5",
        short_name: "H-5",
        name: "five",
        designation: "05",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_06_h = {
        numeric_value: "6",
        short_name: "H-6",
        name: "six",
        designation: "06",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_07_h = {
        numeric_value: "7",
        short_name: "H-7",
        name: "seven",
        designation: "07",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_08_h = {
        numeric_value: "8",
        short_name: "H-8",
        name: "eight",
        designation: "08",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_09_h = {
        numeric_value: "9",
        short_name: "H-9",
        name: "nine",
        designation: "09",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_10_h = {
        numeric_value: "10",
        short_name: "H-10",
        name: "ten",
        designation: "10",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_j_h = {
        numeric_value: "11",
        short_name: "H-J",
        name: "jack",
        designation: "j",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_q_h = {
        numeric_value: "12",
        short_name: "H-Q",
        name: "queen",
        designation: "q",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_k_h = {
        numeric_value: "13",
        short_name: "H-K",
        name: "king",
        designation: "k",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_a_h = card_01_h;

    if ((acesLow = false)) {
        card_a_h.numeric_value = "14";
    }

    let card_01_s = {
        numeric_value: "1",
        short_name: "S-A",
        name: "ace",
        designation: "a",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_02_s = {
        numeric_value: "2",
        short_name: "S-2",
        name: "two",
        designation: "02",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_03_s = {
        numeric_value: "3",
        short_name: "S-3",
        name: "three",
        designation: "03",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_04_s = {
        numeric_value: "4",
        short_name: "S-4",
        name: "four",
        designation: "04",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_05_s = {
        numeric_value: "5",
        short_name: "S-5",
        name: "five",
        designation: "05",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_06_s = {
        numeric_value: "6",
        short_name: "S-6",
        name: "six",
        designation: "06",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_07_s = {
        numeric_value: "7",
        short_name: "S-7",
        name: "seven",
        designation: "07",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_08_s = {
        numeric_value: "8",
        short_name: "S-8",
        name: "eight",
        designation: "08",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_09_s = {
        numeric_value: "9",
        short_name: "S-9",
        name: "nine",
        designation: "09",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_10_s = {
        numeric_value: "10",
        short_name: "S-10",
        name: "ten",
        designation: "10",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_j_s = {
        numeric_value: "11",
        short_name: "S-J",
        name: "jack",
        designation: "j",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_q_s = {
        numeric_value: "12",
        short_name: "S-Q",
        name: "queen",
        designation: "q",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_k_s = {
        numeric_value: "13",
        short_name: "S-K",
        name: "king",
        designation: "k",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_a_s = card_01_s;

    if ((acesLow = false)) {
        card_a_s.numeric_value = "14";
    }

    let card_01_d = {
        numeric_value: "1",
        short_name: "D-A",
        name: "ace",
        designation: "a",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_02_d = {
        numeric_value: "2",
        short_name: "D-2",
        name: "two",
        designation: "02",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_03_d = {
        numeric_value: "3",
        short_name: "D-3",
        name: "three",
        designation: "03",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_04_d = {
        numeric_value: "4",
        short_name: "D-4",
        name: "four",
        designation: "04",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_05_d = {
        numeric_value: "5",
        short_name: "D-5",
        name: "five",
        designation: "05",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_06_d = {
        numeric_value: "6",
        short_name: "D-6",
        name: "six",
        designation: "06",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_07_d = {
        numeric_value: "7",
        short_name: "D-7",
        name: "seven",
        designation: "07",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_08_d = {
        numeric_value: "8",
        short_name: "D-8",
        name: "eight",
        designation: "08",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_09_d = {
        numeric_value: "9",
        short_name: "D-9",
        name: "nine",
        designation: "09",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_10_d = {
        numeric_value: "10",
        short_name: "D-10",
        name: "ten",
        designation: "10",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_j_d = {
        numeric_value: "11",
        short_name: "D-J",
        name: "jack",
        designation: "j",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_q_d = {
        numeric_value: "12",
        short_name: "D-Q",
        name: "queen",
        designation: "q",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_k_d = {
        numeric_value: "13",
        short_name: "D-K",
        name: "king",
        designation: "k",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_a_d = card_01_d;

    if ((acesLow = false)) {
        card_a_d.numeric_value = "14";
    }

    let card_01_c = {
        numeric_value: "1",
        short_name: "C-A",
        name: "ace",
        designation: "a",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_02_c = {
        numeric_value: "2",
        short_name: "C-2",
        name: "two",
        designation: "02",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_03_c = {
        numeric_value: "3",
        short_name: "C-3",
        name: "three",
        designation: "03",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_04_c = {
        numeric_value: "4",
        short_name: "C-4",
        name: "four",
        designation: "04",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_05_c = {
        numeric_value: "5",
        short_name: "C-5",
        name: "five",
        designation: "05",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_06_c = {
        numeric_value: "6",
        short_name: "C-6",
        name: "six",
        designation: "06",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_07_c = {
        numeric_value: "7",
        short_name: "C-7",
        name: "seven",
        designation: "07",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_08_c = {
        numeric_value: "8",
        short_name: "C-8",
        name: "eight",
        designation: "08",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_09_c = {
        numeric_value: "9",
        short_name: "C-9",
        name: "nine",
        designation: "09",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_10_c = {
        numeric_value: "10",
        short_name: "C-10",
        name: "ten",
        designation: "10",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_j_c = {
        numeric_value: "11",
        short_name: "C-J",
        name: "jack",
        designation: "j",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_q_c = {
        numeric_value: "12",
        short_name: "C-Q",
        name: "queen",
        designation: "q",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_k_c = {
        numeric_value: "13",
        short_name: "C-K",
        name: "king",
        designation: "k",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_a_c = card_01_c;

    if ((acesLow = false)) {
        card_a_c.numeric_value = "14";
    }

    /* "short_name" is used to help locate the id designation of the svg vector image. */

    let card_joker_r = {
        numeric_value: "15",
        short_name: "J-R",
        name: "joker",
        designation: "q",
        ink_color: "red",
    };
    //red or (smaller joker, when monochrome)
    let card_joker_b = {
        numeric_value: "16",
        short_name: "J-B",
        name: "joker",
        designation: "k",
        ink_color: "black",
    };

    //black (larger) out-ranks red joker
    countingJokersIn[0] = card_joker_r;
    countingJokersIn[1] = card_joker_b;

    tableauHearts[0] = card_01_h;
    tableauHearts[1] = card_02_h;
    tableauHearts[2] = card_03_h;
    tableauHearts[3] = card_04_h;
    tableauHearts[4] = card_05_h;
    tableauHearts[5] = card_06_h;
    tableauHearts[6] = card_07_h;
    tableauHearts[7] = card_08_h;
    tableauHearts[8] = card_09_h;
    tableauHearts[9] = card_10_h;
    tableauHearts[10] = card_j_h;
    tableauHearts[11] = card_q_h;
    tableauHearts[12] = card_k_h;
    tableauHearts[13] = card_a_h;

    tableauSpades[0] = card_01_s;
    tableauSpades[1] = card_02_s;
    tableauSpades[2] = card_03_s;
    tableauSpades[3] = card_04_s;
    tableauSpades[4] = card_05_s;
    tableauSpades[5] = card_06_s;
    tableauSpades[6] = card_07_s;
    tableauSpades[7] = card_08_s;
    tableauSpades[8] = card_09_s;
    tableauSpades[9] = card_10_s;
    tableauSpades[10] = card_j_s;
    tableauSpades[11] = card_q_s;
    tableauSpades[12] = card_k_s;
    tableauSpades[13] = card_a_s;

    tableauDiamonds[0] = card_01_d;
    tableauDiamonds[1] = card_02_d;
    tableauDiamonds[2] = card_03_d;
    tableauDiamonds[3] = card_04_d;
    tableauDiamonds[4] = card_05_d;
    tableauDiamonds[5] = card_06_d;
    tableauDiamonds[6] = card_07_d;
    tableauDiamonds[7] = card_08_d;
    tableauDiamonds[8] = card_09_d;
    tableauDiamonds[9] = card_10_d;
    tableauDiamonds[10] = card_j_d;
    tableauDiamonds[11] = card_q_d;
    tableauDiamonds[12] = card_k_d;
    tableauDiamonds[13] = card_a_d;

    tableauClubs[0] = card_01_c;
    tableauClubs[1] = card_02_c;
    tableauClubs[2] = card_03_c;
    tableauClubs[3] = card_04_c;
    tableauClubs[4] = card_05_c;
    tableauClubs[5] = card_06_c;
    tableauClubs[6] = card_07_c;
    tableauClubs[7] = card_08_c;
    tableauClubs[8] = card_09_c;
    tableauClubs[9] = card_10_c;
    tableauClubs[10] = card_j_c;
    tableauClubs[11] = card_q_c;
    tableauClubs[12] = card_k_c;
    tableauClubs[13] = card_a_c;

    if (acesLow !== true) {
        tableauHearts.pop();
        tableauSpades.pop();
        tableauDiamonds.pop();
        tableauClubs.pop();
    }

    let card_back_red = {
        numeric_value: null,
        short_name: "R-BACK",
        name: "card_back",
        designation: "back",
        suit: null,
        suit_color: null,
        ink_color: "red",
    };

    let card_back_red2 = {
        numeric_value: null,
        short_name: "R-BACK2",
        name: "card_back2",
        designation: "back",
        suit: null,
        suit_color: null,
        ink_color: "red",
    };

    card_back[0] = card_back_red;
    card_back[1] = card_back_red2;

    deck = tableauSpades
        .concat(tableauHearts)
        .concat(tableauDiamonds)
        .concat(tableauClubs)
        .concat(card_back);

    if (isUsingJokers) {
        deck = deck.concat(countingJokersIn);
    }

    return deck;
}
