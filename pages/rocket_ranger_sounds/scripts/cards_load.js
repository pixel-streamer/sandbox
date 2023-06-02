/*
functional specifications: (Configuration and tasks)

load images
    large image
    small image

load xml data

overlay xml data containers on images

resize: 
    re-jigger the layout when the phone turns (v2)
*/

var stage,
    stageBounds,
    importantVideo,
    fontsHaveLoaded = false,
    ticker,
    subject_content,
    image_content,
    interactive_content,
    startup_content,
    fileLoader,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector(".full_size_canvas"),
    generalPadding = 16,
    largeText = 0,
    update = true;

let screenLog = document.querySelector("#screen-log");
/*
ResizeObserver.disconnect()
    Unobserves all observed Element targets of a particular observer.
ResizeObserver.observe()
    Initiates the observing of a specified Element.
ResizeObserver.unobserve()
    Ends the observing of a specified Element.
*/
// loadGoogleFonts inside font-loading_module.js
window.addEventListener("load", loadGoogleFonts);
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
    bigCanvas.getContext("2d").imageSmoothingEnabled = false;
    stage = bigCanvas;
    // stage = new createjs.StageGL("big_stage",{transparent:true});
    stage = new createjs.Stage("big_stage");
    stage.setBounds(0, 0, w, h);

    stageBounds = stage.getBounds();

    startup_content = new createjs.Container();
    startup_content.name = "startup_content";

    stage.addChild(startup_content);

    ticker = createjs.Ticker;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.addEventListener("tick", tick);
    interactive_content = new createjs.Container();
    interactive_content.name = "interactive_content";

    image_content = new createjs.Container();
    image_content.name = "image_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";
    stage.addChildAt(subject_content);
    stage.addChildAt(image_content);
    stage.addChild(interactive_content);
    stage.snapToPixel = true;

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    //stage.enableMouseOver(25); //changes (lessens -- under 30) the frequency of updates per second
    // stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
    stage.mouseMoveOutside = false;
    addStartupText();
}
function stop() {
    ticker.removeEventListener("tick", tick);
}
function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
        update = false; // only update once
        stage.update(event);
    }
    stage.update(event);
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

/*  // load in google fonts through the manifest... (cleaner.)
queue.loadManifest(
    [
        { src: "https://fonts.googleapis.com/css?family=Press+Start+2P", type: "fontcss" }
    ]
);
*/
window.addEventListener("fontload_evtStr", setupStageForInteraction);
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
//RESIZE VARIABLES
let resizeObserver,
    delay = 250,
    timeout;

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
    /*   var nextLargerTextSize = getGoldenRatio(w) * 0.04;
    var largerTextContainer = new createjs.Container();

    var largerText = new createjs.Text(
        "click to begin".toUpperCase(),
        "normal " + nextLargerTextSize + "px 'Press Start 2P'",
        // "normal " + nextLargerTextSize + "px 'Mystery Quest'",
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
    ); */

    window.dispatchEvent(gameSetup_evt);
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

// var outputTextClip;
function setupGame() {
    console.log("setupGame");
    /*  var phraseAsStr = "Welcome to Cards.\n\t\t\tLet's Play.";

    var phrase2 = new InteractiveText(
        phraseAsStr,
        stageBounds.width / 2,
        stageBounds.height / 2,
        "#FFCC00"
    );
    phrase2.activate().addEventListener(
        "click",
        function () {
            console.log("clicked me one time!");
            phrase2.activate().visible = false;
            phrase2.activate().mouseEnabled = false;
            window.dispatchEvent(gamePlay_evt);
        },
        { once: true }
    );
    outputTextClip = new InteractiveText(
        "city name appears here",
        stageBounds.width / 2,
        stageBounds.height - 65,
        "#FFCC00"
        // ).mouseEnabled=false;  //using this throws error...
    ); */

    window.dispatchEvent(gamePlay_evt);
}

function loadAssets() {
    console.log("playGame");
    fileLoader = new createjs.LoadQueue(true);
    // fileLoader.on("complete", handle_CardGame);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    // fileLoader.loadFile(
    //     {
    //         src: "../images/sprites/cards_sprite.png",
    //         id: "all_cards",
    //         crossOrigin: true,
    //         type: createjs.Types.IMAGE,
    //     }
    // );
    fileLoader.loadManifest({
        manifest: [
            {
                src: "../images/sprites/cards_sprite.png",
                id: "all_cards",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/legend-data-pass1_copy.xml",
                id: "cities",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
            /*  {
                src: "./assets/map_whole.png",
                id: "map",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            }, */
            {
                src: "./assets/icon_sheet.png",
                id: "map",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/pan-arrow.png",
                id: "arrow",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/icon_sheet.png",
                id: "icons",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },

            /*   {
                src: "./assets/wallpaper.png",
                id: "wallpaper",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            }, */
        ],
    });
    // gameLogic();
}

function playGame() {
    loadAssets();
}

// let fontSize = 32;
let fontSize = 64;

// const cardflip_evt = new CustomEvent("cardflip_evt_evtStr", {
//     detail: { msg: ":::flip card" },
// });
function handleCardFlip(e) {
    //console.log("e.target: ", e.detail.card );
    e.detail.card.swapChildren(
        e.detail.card.getChildAt(0),
        e.detail.card.getChildAt(1)
    );
    //console.log("card_data.short_name: ", e.detail.card_data.name);
}
window.addEventListener("cardflip_evt_evtStr", handleCardFlip);

function gridLayoutAccountingWH(
    contentArr,
    contentFocus,
    contentW,
    contentH,
    xPadding,
    yPadding,
    amountPerRow,
    availW,
    availH
) {
    let xCount = 0;
    let yCount = 0;
    let xSpacing = xPadding * 2;
    let ySpacing = yPadding * 2;
    let xWidth = contentW;
    let yHeight = contentH;
    let yPos1 = ySpacing;
    let xPos1 = xSpacing;
    //TODO: allow for any width, and automatically fit the contentW's per availW/availH

    var tempArr = contentArr.filter((content1) =>
        content1.hasOwnProperty("flip")
    );
    contentArr = tempArr.slice();
    contentArr.forEach(function (member1, idx) {
        if (idx % amountPerRow === 0) {
            xPos1 = xSpacing;
            yPos1 = yCount * yHeight + yCount * ySpacing;
            yCount++;
            xCount = 0;
        }
        xPos1 = xCount * xWidth;
        contentArr[idx][contentFocus].x = xPos1 + xSpacing * xCount;
        contentArr[idx][contentFocus].y = yPos1 + ySpacing * yCount;
        xCount++;
    });
}

// function toggleVis(thing) {
//     thing.visible = !thing.visible;
// }

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
// galleryConfig.thumbnailW = 85;
// galleryConfig.thumbnailH = 64;
galleryConfig.thumbnailW = 72;
galleryConfig.thumbnailH = 102;

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

    // allCards = makeRegularDeck();
    var shortNameCards = [];
    allCards.forEach(function (member) {
        shortNameCards.push(member.short_name);
    });
    console.log(shortNameCards);

    var randomShortName = Math.floor(Math.random() * shortNameCards.length);
    var newSrc = shortNameCards[randomShortName];

    // allCards.forEach(function (doneCards) {
    //     cardsDeck.addChild(doneCards.cardWhole);
    // });

    shortNameCards = allCards
        .filter((cardTarget) => cardTarget.short_name === newSrc)
        .slice()[0].cardWhole;

    // var cardback = allCards
    // .filter((allCards) => allCards.cardWhole.name == "R-BACK2")
    // .slice()[0];

    console.log(shortNameCards.name);

    shortNameCards.regX = shortNameCards.getBounds().x;
    shortNameCards.regY = shortNameCards.getBounds().y;

    // shortNameCards.x = w - (69 + 12);
    // shortNameCards.y = h - (96 + 12);

    // width: 72,
    // height: 102,
    shortNameCards.x = w - (72 + 12);
    shortNameCards.y = h - (102 + 12);

    image_content.addChild(shortNameCards);
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
        case "diamonds":
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
let isUsingJokers = true;
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
        designation: "joker_red",
        ink_color: "red",
    };
    //red or (smaller joker, when monochrome)
    let card_joker_b = {
        numeric_value: "16",
        short_name: "J-B",
        name: "joker",
        designation: "joker_black",
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

    /* this is serving as a quick way to add an "raw" index number */

    deck.forEach(function (member, memIndex) {
        member["indexNum"] = memIndex;
    });
    // console.log("deck.forEach::: ", deck);

    return deck;
}

function gameLogic() {
    console.log("apply logic to the game");
    /* 
    set up the game parameters: (for solitaire)
        alternating patterns of red and black 
            a red card can only go on top of a black card
        
        tableau play insists that the columns be constructed in decending order

        in the tableau, only the Kings can "start" an empty slot

        aces will move to the top four spots.


    */
}

function handle_CardGame(e) {
    console.log("██: : :handle_ImageLoadComplete: : : █ò█");
    var cardsNames = {};
    cardsNames.animations = {};
    allCards = makeRegularDeck();

    allCards.forEach(function (poppedCard, popped_index) {
        // console.log(poppedCard.suit);
        if (poppedCard.suit !== null && poppedCard.suit !== undefined) {
            poppedCard["symbol"] = getSuitCode(poppedCard.suit);
        } else {
            //   poppedCard["symbol"] = null;
            //playing card back expected...  https://graphemica.com/1F0A0
            poppedCard["symbol"] = "&#127136";
            poppedCard["symbol"] = String.fromCharCode("1F0A0");
        }

        if (popped_index === 0) {
            cardsNames.animations[poppedCard.short_name] = [
                0,
                popped_index + 1,
            ];
        }
        if (popped_index > 0) {
            cardsNames.animations[poppedCard.short_name] = [
                popped_index,
                popped_index + 1,
            ];
        }
        return allCards;
        // run: [0, 56,"all",.2],
    });

    //console.log(allCards);

    //allCards = kShuffle(allCards);
    // TODO: uses card backs, and doesn't work!
    console.log(allCards[12]);
    console.log(allCards[12].indexNum);

    var loadedMapSm = new createjs.Bitmap(e.target.getResult("interface_sm"));
    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));
    var loadedMap = loadedMapSm;
    var mapPiece = new createjs.Bitmap();
    var mapContainer = new createjs.Container();
    loadedMap.snapToPixel = true;
    mapPiece = loadedMap.clone();
    //TODO: update the canvas with the part of the image that has loaded as a background...

    /*
    
    using:
    direction vector
    
    map image abs. top bound
    map image abs. right bound
    map image abs. bottom bound
    map image abs. left bound
     
    screen top bound
    screen right bound
    screen bottom bound
    screen left bound

    variable percentage of overlap?

    scroll distance toward tr (drag)
    scroll distance toward tl (drag)
    scroll distance toward br (drag)
    scroll distance toward bl (drag)

    */
    /* 
    var citiesMapW = 13124;
    var citiesMapH = 9600;
    mapPiece.cache(
        0,
        0,
        Math.min(loadedMap.image.naturalWidth, citiesMapW),
        Math.min(loadedMap.image.naturalHeight, citiesMapH)
    );
    mapContainer.addChild(mapPiece);

    //var citySVGBox = createSVGMap(e);

    var createCities = createCitiesMap(e);

    var fsMapDims = resizeToKnownDimensions(
        loadedMap.image.naturalWidth,
        loadedMap.image.naturalHeight,
        w,
        h
    );
    var MapContainerScaleX = fsMapDims.scaleRatio;
    var MapContainerScaleY = fsMapDims.scaleRatio;

    var fsCitiesDims = resizeToKnownDimensions(citiesMapW, citiesMapH, w, h);
    var fsCitiesScaleX = fsCitiesDims.scaleRatio;
    var fsCitiesScaleY = fsCitiesDims.scaleRatio;
    mapContainer.scaleX = MapContainerScaleX;
    mapContainer.scaleY = MapContainerScaleY;

    // full-size image scale adjustment
    // mapContainer.scaleX = fsCitiesScaleX * 1.36;
    // mapContainer.scaleY = fsCitiesScaleY * 1.36;

    createCities.scaleX = fsCitiesScaleX * 0.995;
    createCities.scaleY = fsCitiesScaleY * 0.995;
    image_content.addChild(mapContainer);
    image_content.addChild(createCities);
*/
    // createCities.scaleX will be a factor in sizing the final locations.
    //however, the final numbers should be output in two places:
    // an interim location (with calculations)
    // and a "final" location that will house the output locations without squirreling the data
    //return;

    var cardsImg = new createjs.Bitmap(e.target.getResult("all_cards")).image;
    cardsImg.snapToPixel = true;
    var data = new createjs.SpriteSheet({
        images: [cardsImg],
        frames: {
            margin: 2,
            x: 0,
            y: 0,
            width: 96, //for the 1280 one
            height: 138, //for the 1280 one
            count: 56, //for the 1280 one
            regX: 2.5, //for the 1280 one
            regY: 2.5, //for the 1280 one
            spacing: 2, //for the 1280 one
            // width: 71 ,
            // height: 103,
            // count: 56,
            // regX: 0,
            // regY: 0,
            // spacing: 2.67,
            /*  width: 67.55,
            height: 97,
            count: 56,
            regX: 0,
            regY: 0,
            spacing: 2.19, */
        },
        animations: cardsNames.animations,
    });
    cardsAll = new createjs.Sprite(data);
    cardsAll.stop();
    //cardsAll.play();
    var cardDeckContainer = new createjs.Container();
    var cardContainer = new createjs.Container();

    let xC = 0;
    let yC = 0;
    var y_Pos = 0;
    var x_Pos = 0;
    let xW = cardsAll.spriteSheet.getFrameBounds(0).width;
    let yH = cardsAll.spriteSheet.getFrameBounds(0).height;
    let xS = 2;
    let yS = 2;

    allCards.forEach(function (arrMember, arrIdx) {
        if (arrIdx < 52 || arrIdx > 53) {
            let flipped = false;
            if (arrIdx % 13 === 0) {
                x_Pos = xS;
                y_Pos = yC * yH + yC * yS;
                yC++;
                xC = 0;
            }
            var another = cardsAll.clone();
            another.gotoAndStop(another.spriteSheet.getAnimations()[arrIdx]);

            another.addEventListener("click", function () {
                if (!flipped) {
                    another.gotoAndStop(
                        another.spriteSheet.getAnimations()[53]
                    );
                } else {
                    another.gotoAndStop(
                        another.spriteSheet.getAnimations()[arrIdx]
                    );
                }
                flipped = !flipped;

                //TODO: fix the reference to the corrected (and selected) menu
                //        console.log("arrMember:::", arrMember.indexNum[50]);

                outputTextClip.updateText(
                    allCards[arrIdx]["suit"] !== undefined
                        ? allCards[arrIdx]["name"] +
                              " of " +
                              allCards[arrIdx]["symbol"]
                        : allCards[arrIdx]["ink_color"] +
                              " " +
                              allCards[arrIdx]["name"]
                );
            });
            x_Pos = xC * xW;

            let binaryChoicePart = Math.floor(
                (Math.random() * 1000).toPrecision(3)
            );
            let binaryChoice = binaryChoicePart % 2;

            another.rotation =
                binaryChoice === 0
                    ? Math.random() * 1.5
                    : Math.random() * (1.5 * -1);
            another.regX = 0;
            another.regY = 0;
            another.x = x_Pos + xS * xC;
            another.y = y_Pos + yS * yC;
            // console.log(
            //     another.spriteSheet.getFilterBounds(another.spriteSheet)
            // );
            // another.hitTest(another.x, another.y);
            // console.log(another.hitTest(another.x, another.y));

            cardContainer.addChild(another);
            xC++;
        }
    });

    cardDeckContainer.addChild(cardsAll);
    var cardCounter = 0;
    cardDeckContainer.addEventListener("click", function () {
        //console.log(cardsAll.spriteSheet.getAnimations()[cardCounter % 56]);
        cardCounter++;
        cardsAll.gotoAndStop(
            cardsAll.spriteSheet.getAnimations()[cardCounter % 56] //mod loops without having to reset
        );
        outputTextClip.updateText(
            cardsAll.spriteSheet.getAnimations()[cardCounter % 56]["name"]
        );
    });

    var fsBiggest = resizeToKnownDimensions(
        cardsImg.width,
        cardsImg.height,
        w,
        h
    );
    cardDeckContainer.scaleX = fsBiggest.scaleRatio;
    cardDeckContainer.scaleY = fsBiggest.scaleRatio;

    cardContainer.scaleX = fsBiggest.scaleRatio;
    cardContainer.scaleY = fsBiggest.scaleRatio;

    //  image_content.addChild(cardContainer);

    // image_content.addChild(cardDeckContainer);
    // displaySingleCard(getSuitCode("hearts"));
}
