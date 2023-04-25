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
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
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

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
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
        "name appears here",
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
//let fontSize = 64;
let fontSize = 32;

function handle_ImageLoadComplete(e) {
    console.log("██: : :handle_ImageLoadComplete: : : ██");
    var centerCrosshair = new createjs.Shape();
    centerCrosshair.graphics
        .setStrokeStyle(2)
        .beginStroke("#FFCC00")
        .moveTo(5, 0)
        .lineTo(5, 10)
        .moveTo(0, 5)
        .lineTo(10, 5)
        .endStroke();

    var citiesMapW = 640;
    var citiesMapH = 480;
    var loadedMap = new createjs.Bitmap(e.target.getResult("interface_sm"));
    loadedMap.snapToPixel = true;
    var mapPiece = new createjs.Bitmap();
    mapPiece = loadedMap.clone();
    mapPiece.cache(
        0,
        0,
        Math.min(loadedMap.image.naturalWidth, citiesMapW),
        Math.min(loadedMap.image.naturalHeight, citiesMapH)
    );

    var cityRectW = 32;
    var cityRectH = 32;
    var cityG = new createjs.Container();
    var cityContainer = new createjs.Container();
    var city = new createjs.Container();
    var cityText = new createjs.Container();
    var location_name = "State of Denial";

    var location_first_part = "look at what I can do";

    var latitude = 1;
    var longitude = 2;

    var rectX = parseInt(longitude * 10) + 400;
    var rectY = parseInt(latitude * 10 * -1 + parseInt(citiesMapH - 400));

    var rec = new createjs.Shape();

    rec.graphics.beginStroke("#450067");
    rec.graphics.beginFill("#450067");
    rec.graphics.drawRect(0, 0, cityRectW, cityRectH);
    rec.setBounds(0, 0, cityRectW, cityRectH);

    rec["city_info"] = {
        xPos: rectX,
        yPos: rectY,
        city_details: location_first_part,
    };

    rec.name = location_first_part;

    var textEl = new createjs.Text(
        location_first_part,
        +fontSize + "px " + "American Uncial MN",
        "#FFCC00"
    );

    textEl.x = 0;
    textEl.y = parseInt(cityRectH + cityRectH / 2);
    textEl.regX = 0;
    textEl.regY = 0;

    city.name = "city";
    cityContainer.name = location_name;

    var textRec = new createjs.Shape();
    textRec.graphics.beginStroke("#450067");
    textRec.graphics.beginFill("#450067");
    textRec.graphics.drawRect(
        0,
        0,
        textEl.getBounds().width,
        textEl.getBounds().height
    );

    textEl.name = "this is the location name: ---- ";

    textRec.x = 0;
    textRec.y = textEl.getBounds().height + textEl.getBounds().height / 7;

    cityText.addChild(textRec);
    cityText.addChild(textEl);

    cityContainer.name = "city_container";
    cityText.name = "city_text";
    cityContainer.addChild(city);
    cityContainer.addChild(cityText); 
    cityContainer.x = 0;
    cityContainer.y = 0; 
    cityContainer.regX = cityRectW / 2;
    cityContainer.regY = cityRectH / 2; 
    cityContainer.x = rec["city_info"].xPos;
    cityContainer.y = rec["city_info"].yPos;
    city.addChild(rec);

    cityG.addChild(cityContainer);

    image_content.addChild(mapPiece);
    image_content.addChild(cityG);
    image_content.addChild(centerCrosshair);

    console.log('rec["city_info"]:', rec["city_info"]);

    centerCrosshair.setBounds(0, 0, 10, 10);
    centerCrosshair.x =
        rec["city_info"].xPos - centerCrosshair.getBounds().width / 2;
    centerCrosshair.y =
        rec["city_info"].yPos - centerCrosshair.getBounds().height / 2;

    cityContainer.addEventListener("click", function (e) {
        var typeName = e.target.constructor.name;
        console.log("e.target.parent.parent: ", e.target.parent.name);
        if (typeName === "Shape") {
            createjs.Tween.get(cityContainer, {
                loop: true,
                override: true,
            })
                //.wait(500)
                // .to({alpha:0, visible:false}, 1000)
                // .to({ cityContainer, rotation: "-360" }, 1200)
                .to({ rotation: "-360" }, 1200)
                .call(tweenComplete);

            outputTextClip.updateText(
                stage.mouseX +
                    ", " +
                    stage.mouseY +
                    " " +
                    e.target.parent.parent.name
            );
        }
    });
}

function tweenComplete() {
    //do something?
}

function activateZoomer(e, clickX, clickY, targetLocX, targetLocY) {
    console.log(e, clickX, clickY, targetLocX, targetLocY);
}
