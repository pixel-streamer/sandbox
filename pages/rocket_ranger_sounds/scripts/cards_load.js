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
//RESIZE VARIABLES
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
// loadGoogleFonts inside font-loading_module.js
window.addEventListener("load", loadGoogleFonts);
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
// import { loadGoogleFonts }
// import "font-loading_module.js";

let fontLoader;
function loadFonts(config) {
    fontLoader = new createjs.FontLoader(config, true);
    fontLoader.on("complete", handleFontLoad);
    fontLoader.load();
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
    // stage = new createjs.Stage("big_stage",{transparent:true});
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
    );
}

class InteractiveText extends createjs.Text {
    //this is a really crappy, fast class... use the other one.
    constructor(interactivePhrase, atXPos, atYPos, fillCol) {
        super();
        this.userText_xPos = atXPos;
        this.userText_yPos = atYPos;
        // largeText = getGoldenRatio(w) * 0.085;
        largeText = parseInt(
            Math.max(getGoldenRatio(w) * (0.0271 * 2), 32).toPrecision(2)
        ).toString();
        this.lineHeight = parseInt(largeText * 1.125);
        this.gamePlayText;
        this._fontCol = fillCol;
        // this._fontChoice = "16px 'Press Start 2P'";
        this._fontChoice = "32px 'Rum Raisin'";
        this._fontChoice = "24px 'Press Start 2P'";
        this._fontChoice = "24px 'Mystery Quest'";
        //this.fontFamily = "Press Start 2P";
        this.fontFamily = "Mystery Quest";
        // this.fontFamily = "Rum Raisin";
        // this.fontFamily = fontLoader.getItem("Press Start 2P");
        // this.fontFamily = fontLoader._faces("Press Start 2P");

        console.log(" largeText: ", largeText);
        console.log(" this.fontFamily: ", this.fontFamily);
        //  this._fontChoice =  (largeText + "px " + this.fontFamily) ;
        console.log("  this._fontChoice  : ", this._fontChoice);
        this.interactiveTextHitArea = new createjs.Container();
        this.interactiveTextMask = new createjs.Shape();

        this.gamePlayText = new createjs.Text(
            interactivePhrase,
            this._fontChoice,
            this._fontCol
        );
        //:rolleyes: lineheight isn't a percentage of the font.
        this.gamePlayText.set({ lineHeight: this.lineHeight });
        var textMetrics = this.gamePlayText.getMetrics();
        var textW = textMetrics.width;
        var textH = textMetrics.height;
        this.gamePlayText.x = 8;
        this.gamePlayText.y = 8;

        this.interactiveTextMask.graphics
            .beginFill("rgba(0,0,0,.3)")
            .drawRect(0, 0, textW + 16, textH + 16)
            .endFill();

        this.interactiveTextHitArea.regX = 0;
        this.interactiveTextHitArea.regY = 0;

        this.interactiveTextHitArea.addChild(this.interactiveTextMask);
        this.interactiveTextHitArea.addChild(this.gamePlayText);

        this.interactiveTextHitArea.x =
            this.userText_xPos -
            this.interactiveTextHitArea.getBounds().width / 2;
        this.interactiveTextHitArea.y =
            this.userText_yPos -
            this.interactiveTextHitArea.getBounds().height / 2;

        // handle_SoundsRegistry();
        interactive_content.addChild(this.interactiveTextHitArea);
    }
    updateText = function (param) {
        // this.gamePlayText.font = this._fontChoice;
        // this.gamePlayText.text = param;
        // this.gamePlayText.color = this._fontCol;

        this.gamePlayText.set({
            color: this._fontCol,
            font: this._fontChoice,
            text: param,
        });
        var textMetrics = this.gamePlayText.getMetrics();
        var textW = textMetrics.width;
        var textH = textMetrics.height;
        this.interactiveTextMask.graphics
            .clear()
            .beginFill("rgba(0,0,0,.3)")
            .drawRect(0, 0, textW + 16, textH + 16)
            .endFill();
        this.interactiveTextHitArea.x =
            this.userText_xPos -
            this.interactiveTextHitArea.getBounds().width / 2;
        this.interactiveTextHitArea.y =
            this.userText_yPos -
            this.interactiveTextHitArea.getBounds().height / 2;
    };
    activate = function () {
        return this.interactiveTextHitArea;
    };
}
// function addInteractiveText(interactivePhrase, atXPos, atYPos, fillCol) {

// }

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

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ CLASSES FOR SNAP UI ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
class SpecialPoint extends Number {
    //TODO: SNAP-TOGETHER UI
    //this should extend createjs Points
    constructor() {
        super();
        this.SpecialNode = null;
        this._tl = null;
        this._tr = null;
        this._bl = null;
        this._br = null;
        this._top = null;
        this._right = null;
        this._bottom = null;
        this._left = null;
    }
    doSomething = function (param) {
        return param; //as Number to do something with later
    };
}
Object.defineProperty(SpecialPoint.prototype, "vector", {
    get: function () {
        //vector = ?; I'm not sure how this is a bit of extra info yet
        return vector;
    },
    set: function (param) {
        vector = param;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_tl", {
    get: function () {
        //_tl = true (top, left)
        return _tl;
    },
    set: function (param) {
        _tl = param;
        this._top = true;
        this._left = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_tr", {
    get: function () {
        //_tr = true (top, right)
        return _tr;
    },
    set: function (param) {
        _tr = param;
        this._top = true;
        this._right = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_bl", {
    get: function () {
        //_bl = true (bottom, left)
        return _bl;
    },
    set: function (param) {
        _bl = param;
        this._bottom = true;
        this._left = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_br", {
    get: function () {
        //_br = true (bottom, right)
        return _br;
    },
    set: function (param) {
        _br = param;
        this._right = true;
        this._bottom = true;
    },
    configurable: true,
});
//
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF CLASSES FOR SNAP UI ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
var outputTextClip;
function setupGame() {
    console.log("setupGame");
    var phraseAsStr = "Welcome to Cards.\n\t\t\tLet's Play.";

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
        "card name appears here",
        stageBounds.width / 2,
        stageBounds.height - 65,
        "#FFCC00"
        // ).mouseEnabled=false;  //using this throws error...
    );
}
function playGame() {
    console.log("playGame");
    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_ImageLoadComplete);

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
                src: "./assets/overlapped-small.jpg",
                id: "interface_sm",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/overlapped-original-sized.jpg",
                id: "interface_img",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/legend-data-pass1_copy.xml",
                id: "cities",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
        ],
    });
    // gameLogic();
}

// let fontSize = 32;
let fontSize = 64;

function handle_ImageLoadComplete(e) {
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

    var loadedMap = new createjs.Bitmap(e.target.getResult("interface_sm"));
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
    var citiesMapW = 13124;
    var citiesMapH = 9600;
    mapPiece.cache(0, 0, citiesMapW, citiesMapH);
    mapContainer.addChild(mapPiece);

    //var citySVGBox = createSVGMap(e);

    var createCities = createCitiesMap(e);

    var fsBiggest = resizeToKnownDimensions(citiesMapW, citiesMapH, w, h);
    containerScaleX = fsBiggest.scaleRatio;
    containerScaleY = fsBiggest.scaleRatio;
    mapContainer.scaleX = containerScaleX * 1.36;
    mapContainer.scaleY = containerScaleY * 1.36;
    createCities.scaleX = containerScaleX;
    createCities.scaleY = containerScaleY;
    image_content.addChild(mapContainer);
    image_content.addChild(createCities);

    return;

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

function createCitiesMap(e) {
    var citiesContainer = new createjs.Container();
    var cities = e.target.getResult("cities").querySelectorAll("location");
    var towns = [];
    var citiesMapW = 13124;
    var citiesMapH = 9600;
    var insideParenRE = /(?:\()(?:.*?)(?:\))/gm;
    var cityNS = "http://www.w3.org/2000/svg";
    var citySVGBox = citiesContainer;

    var citySVG = new createjs.Container();

    citySVG.setBounds(0, 0, citiesMapW, citiesMapH);

    var cityG = new createjs.Container();
    var cityRectW = 32 * 3;
    var cityRectH = 32 * 3;

    cities.forEach(function (param2) {
        var hasParens = false;
        var parenLocation = 0;
        var location_name =
            param2.getElementsByTagName("location_name")[0].firstChild.data;
        /*
        <root>
            <location>
                <location_name>Tol-in-Gaurhoth (Isle of Werewolves) (Sauron's Isle) (Tol Sirion)</location_name>
                <lattitude>731</lattitude>
                <longitude>159</longitude>
                <legend_code>0</legend_code>
            </location>
        </root>
        */
        parenLocation = location_name.indexOf("(");
        if (!(parenLocation === -1)) {
            hasParens = true;
        }
        if (hasParens) {
            //  var location_first_part = location_name.substring(0, parenLocation);
            // var location_first_part = location_name.matchAll(insideParenRE).split(" ")[0];
            var location_first_part =
                location_name.substring(0, parenLocation).trim() +
                "\n" +
                location_name.match(insideParenRE).join("\n");

            // location_first_part//
        } else {
            var location_first_part = location_name.trim();
        }

        var latitude =
            param2.getElementsByTagName("lattitude")[0].firstChild.data;
        var longitude =
            param2.getElementsByTagName("longitude")[0].firstChild.data;

        location_first_part = location_first_part.trim();
        towns.push(location_first_part);
        towns.push(latitude);
        towns.push(longitude);

        //TODO:REVERSED x, y CONFIRM
        //TODO:(Ys seem to be oriented north, rather than south)
        //TODO:ie, IronHills are SOUTHeast, rather than NORTHEAST of MountainsofMirkwood
        var rectY = parseInt(latitude * 10 * -1 + parseInt(citiesMapH - 400));
        var rectX = parseInt(longitude * 10) + 400;

        var rec = new createjs.Shape();
        rec.graphics.beginStroke("#450067");
        rec.graphics.beginFill("#450067");
        rec.graphics.drawRect(rectX, rectY, cityRectW, cityRectH);

        // TODO: have a look at coloring a bitmap thru code:
        // from: https://stackoverflow.com/questions/40717868/easeljs-using-bitmap-for-filling-rectangle

        rec.name = location_first_part;
        cityG.addChild(rec);

        var textEl = new createjs.Text(
            location_first_part,
            +fontSize + "px " + "American Uncial MN",
            "#000000"
        );

        // var textWNumber = parseFloat(
        //     location_first_part.split().slice().toString().length * fontSize
        // );
        // console.log(textWNumber);
        textEl.x = rectX;
        textEl.y = parseInt(rectY + cityRectH + cityRectH / 2);

        cityG.addChild(textEl);

        rec.addEventListener("click", function () {
            console.log(" rec.name: ", rec.name);
        });
    });
    // console.log(towns.join("\n"));

    citySVG.addChild(cityG);
    citySVGBox.addChild(citySVG);

    return citiesContainer;
}
