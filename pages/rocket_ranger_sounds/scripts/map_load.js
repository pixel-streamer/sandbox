/*
functional specifications: (Configuration and tasks)

load images
    large image √
    small image √

load xml data √

overlay xml data containers on images √

each rectangle within the group displays readout of its title. update within the screen area

freely move the rectangle to another spot

update both readouts for the zoom as rectangle is moved, and user isn't subjected to old feedback

task:
"zoom" on layer, so that manipulation of the rectangle below the magnification can be moved

track mouse (or tap)

expand area around tap to view what's in the zoom area.
    click for zoom, click without of the zoom area to close zoom?

    the center of the rectangle is going to have to be the epicenter of the container for the city,
    so that when the city rectangle is moved, all things are relative to only that city.

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
let fontSize = 75;

function handle_ImageLoadComplete(e) {
    console.log("██: : :handle_ImageLoadComplete: : : ██");

    var loadedMapSm = new createjs.Bitmap(e.target.getResult("interface_sm"));
    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));
    var loadedMap = loadedMapSm;
    var mapPiece = new createjs.Bitmap();
    var mapContainer = new createjs.Container();
    loadedMap.snapToPixel = true;
    mapPiece = loadedMap.clone();
    // update the canvas with the part of the image that has loaded as a background...
    //overlay the smaller image (scaled) on the larger one, like a magnifying glass

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

    var createdCities = createCitiesMap(e);

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

    createdCities.scaleX = fsCitiesScaleX * 0.995;
    createdCities.scaleY = fsCitiesScaleY * 0.995;
    image_content.addChild(mapContainer);
    image_content.addChild(createdCities);

    createdCities.addEventListener("click", function (e) {
        // var clickedCity = e.target.constructor.prototype ;
        var typeName = e.target.constructor.name;
        if (typeName === "Shape") {
            console.log(
                " target: " + " ",
                e.target,
                " x: " + " " + e.target.city_info.xPos,
                " y: " + " " + e.target.city_info.yPos,
                " clicked stage x: " + " " + e.stageX,
                ",y: " + e.stageY,
                " getGlobalBounds: " + " ",
                e.target.getBounds()
            );

            createjs.Tween.get(e.target.parent.parent, {
                loop: true,
                override: true,
            })
                //.wait(500)
                // .to({alpha:0, visible:false}, 1000)
                // .to({ cityContainer, rotation: "-360" }, 1200)
                .to({ rotation: "-360" }, 1200)
                .call(tweenComplete);

            // activateZoomer(e, stage.mouseX, stage.mouseY, rec.x, rec.y);

            outputTextClip.updateText(
                //stage.mouseX + ", " + stage.mouseY + " " + e.target.name
                e.target.city_info.xPos +
                    ", " +
                    e.target.city_info.yPos +
                    " " +
                    e.target.name
            );
        }
    });
    // createdCities.scaleX will be a factor in sizing the final locations.
    //however, the final numbers should be output in two places:
    // an interim location (with calculations)
    // and a "final" location that will house the output locations without squirreling the data
}
function tweenComplete() {
    //  do nothing
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
        var cityContainer = new createjs.Container();
        var city = new createjs.Container();
        var cityText = new createjs.Container();
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

        // original Ys seem to be oriented north, rather than south)
        // ie, IronHills are SOUTHeast, rather than NORTHEAST of MountainsofMirkwood
        var rectY = parseInt(latitude * 10 * -1 + parseInt(citiesMapH - 400));
        var rectX = parseInt(longitude * 10) + 400;

        var rec = new createjs.Shape();
        var regX_loc = cityRectW / 2;
        var regY_loc = cityRectH / 2;
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
            "#000000"
        );

        // var textWNumber = parseFloat(
        //     location_first_part.split().slice().toString().length * fontSize
        // );

        // textEl.x = cityRectW / 2;
        textEl.regX = textEl.getMetrics().width / 2;
        // textEl.regX = textEl.getTransformedBounds().width / 2;
        // textEl.y = parseInt(0 + cityRectH + cityRectH / 2);
        textEl.regY = textEl.getMetrics().height / 2;
        // textEl.regY = textEl.getTransformedBounds().height / 2;

        city.addChild(rec);
        city.name = "city";
        cityText.addChild(textEl);
        cityContainer.addChild(city);
        cityContainer.addChild(cityText);
        cityContainer.name = "finally";

        cityContainer.x = 0;
        cityContainer.y = 0;
        cityContainer.regX = regX_loc;
        cityContainer.regY = regY_loc;
        cityContainer.x = rec["city_info"].xPos;
        cityContainer.y = rec["city_info"].yPos;

        cityG.addChild(cityContainer);
    });
    // console.log(towns.join("\n"));

    citySVG.addChild(cityG);
    citySVGBox.addChild(citySVG);

    return citiesContainer;
}

function activateZoomer(e, clickX, clickY, targetLocX, targetLocY) {
    console.log(e, clickX, clickY, targetLocX, targetLocY);
}
