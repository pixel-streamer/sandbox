function handle_OLD_MAP_LOAD(e) {
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

    // var ZoomMap   = mapContainer.bitmapCache;
    var ZoomMap = mapPiece.clone();

    //ZoomMap.cache(0,0,320,240,1);

    mapContainer.scaleX = MapContainerScaleX;
    mapContainer.scaleY = MapContainerScaleY;

    // full-size image scale adjustment
    // mapContainer.scaleX = fsCitiesScaleX * 1.36;
    // mapContainer.scaleY = fsCitiesScaleY * 1.36;

    createdCities.scaleX = fsCitiesScaleX * 0.995;
    createdCities.scaleY = fsCitiesScaleY * 0.995;
    //image_content.addChild(mapContainer);

    createdCities.addEventListener("click", function (e) {
        // var clickedCity = e.target.constructor.prototype ;
        var typeName = e.target.constructor.name;
        console.log("e.target.parent: ", e.target.parent);
        console.log("typeName: ", typeName);
        if (typeName === "Shape") {
            createjs.Tween.get(e.target.parent, {
                loop: true,
                override: true,
            })
                .to({ rotation: "-360" }, 1200)
                .call(tweenComplete);

            outputTextClip.updateText(
                e.target.city_info.xPos +
                    ", " +
                    e.target.city_info.yPos +
                    " " +
                    e.target.name
            );
        }
        // activateZoomer(e, stage.mouseX, stage.mouseY, rec.x, rec.y);
    });
    // createdCities.scaleX will be a factor in sizing the final locations.
    //however, the final numbers should be output in two places:
    // an interim location (with calculations)
    // and a "final" location that will house the output locations without squirreling the data

    /*
    TODO: zoom parts:
    display cache of rectangle below at normal size....
    */

    image_content.addChild(createdCities);
    // mapContainer.alpha = 0;
    //createdCities.alpha = 0;
    // image_content.addChild(ZoomMap);
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

        // original Ys seem to be oriented north, rather than south)
        // ie, IronHills are SOUTHeast, rather than NORTHEAST of MountainsofMirkwood
        var rectY = parseInt(latitude * 10 * -1 + parseInt(citiesMapH - 400));
        var rectX = parseInt(longitude * 10) + 400;

        var rec = new createjs.Shape();
        rec.graphics.beginStroke("#450067");
        rec.graphics.beginFill("#450067");
        rec.graphics.drawRect(rectX, rectY, cityRectW, cityRectH);

        // TODO: have a look at coloring a bitmap thru code:
        // from: https://stackoverflow.com/questions/40717868/easeljs-using-bitmap-for-filling-rectangle

        rec.name = location_first_part;
        rec.city_info = {
            xPos: rectX,
            yPos: rectY,
            name: location_first_part,
        };

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

        // rec.addEventListener("click", function () {
        //     console.log(" rec.name: ", rec.name);
        // });
    });
    // console.log(towns.join("\n"));

    citySVG.addChild(cityG);
    citySVGBox.addChild(citySVG);

    return citiesContainer;
}

function tweenComplete() {
    //  do nothing
}
