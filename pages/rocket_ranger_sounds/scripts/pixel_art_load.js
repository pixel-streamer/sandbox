function handle_pixelArtLoad(e) {
    console.log("██: : :handle_pixelArtLoad: : : ██");

    var container = new createjs.Container();
    var targetImg = e.target.getResult("beer");
    var loadedMapSm = new createjs.Bitmap(targetImg);

    /* 
    var spriteSheet = new createjs.SpriteSheet({
        images: [targetImg],
        frames: {
            width: targetImg.naturalWidth,
            height: targetImg.naturalHeight,
        },
        animations: { fullsize: 0 },
    });
    var bitmapButton = new createjs.Sprite(spriteSheet, "fullsize");
    
    */

    var bitmapButton = loadedMapSm;

    container.addChild(loadedMapSm).set({ x: 0, y: 0, scale:.25 });
    // stage.addChild(container.set({ x: -640, y: -850, scale:1 }));
     stage.addChild(container.set({ x: 0, y: 0, scale:4 }));

    return;
    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));

    loadedMapSm.snapToPixel = true;

    // update the canvas with the part of the image that has loaded as a background...
    //overlay the smaller image (scaled) on the larger one, like a magnifying glass
    // mapPiece.cache(
    //     0,
    //     0,
    //     loadedMapSm.image.naturalWidth,
    //     loadedMapSm.image.naturalHeight,
    //     1
    // );

    var something = e.target.getResult("burger"); //regular img (blob)
    //var something = e.target.getResult("blinky"); //regular img (blob)

    var sb = new createjs.ScaleBitmap(
        something, // --- this can't be a bitmap...
        new createjs.Rectangle(
            0,
            0,
            something.naturalWidth,
            something.naturalHeight
        )
    );
    var mathDumW = parseInt(something.naturalWidth * 4);
    var mathDumH = parseInt(something.naturalHeight * 4);

    sb.setDrawSize(something.naturalWidth, something.naturalHeight); // Set an initial draw size.

    // sb.scaleX = 256/ something.naturalWidth;
    // sb.scaleY = 256 / something.naturalHeight;

    // sb.scaleX = 3;
    // sb.scaleY = 3;

    var bmpContainer = new createjs.Container();

    bmpContainer
        // .set({ x: 50, y: 50, scale: 4 })
        .addChild(sb)
        // .set({ x: 300, y: 64, scaleX: 4, scaleY: 4, snapToPixel: true });
        .set({ x: 300, y: 64, snapToPixel: true });

    //  sb.setDrawSize(mathDumW, mathDumH); // Set a new scale AFTER

    //  sb.setTransform(0, 0, 4, 4);

    var mtx = sb.getMatrix();

    mtx.scale(2, 2);
    // mtx.appendTransform(mtx.x, mtx.y, mtx.scaleX, mtx.scaleY, mtx.rotation);
    sb.transformMatrix = mtx;
    /*
    // from the anniversary sample, this is how the beer is created, and then added to the stage:
    [var] beer = new createjs.Container().set({ x: 100, y: 400, scale: 0.5 }),
    var beerImage = new createjs.Sprite(ss, "beer").set({
        regX: 130,
        regY: 138,
        shadow: chris.shadow,
        cursor: "pointer",
    });
        beer.addChild(starburst, beerImage);
    */

    /*
    get pixel from bitmap click code example

 TODO: https://copyprogramming.com/howto/get-all-pixel-data-from-bitmap-object
    */
    bmpContainer.snapToPixel = true;
    image_content.addChild(bmpContainer);
    outputTextClip.updateText("Blinky, the red ghost");
    return;
    var fsMapDims = resizeToKnownDimensions(
        loadedMapSm.image.naturalWidth,
        loadedMapSm.image.naturalHeight,
        w,
        h
    );
}

function tweenComplete() {
    //  do nothing
}

var fileLoader,
    stage,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector(".full_size_canvas");

createjs.Ticker.on("tick", handleTick);

function handleTick(event) {
    stage.update();
}

function setStage() {
    // console.log("hi,setStage");
    // bigCanvas.setAttribute("width", 1100);
    // bigCanvas.setAttribute("height", 1100);
    bigCanvas.setAttribute("width", w);
    bigCanvas.setAttribute("height", h);
    stage = new createjs.StageGL(bigCanvas, { transparent: true });
    stage.setBounds(0, 0, w, h);
    stage.snapToPixel = true;
    stage.snapToPixelsEnabled = true;

    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_pixelArtLoad);
    fileLoader.loadManifest({
        manifest: [
            {
                src: "./assets/assets_atlas_3.png",
                id: "beer",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            // {
            //     src: "./assets/blinky-pixels.png",
            //     id: "blinky",
            //     crossOrigin: true,
            //     type: createjs.Types.IMAGE,
            // },
        ],
    });
}

function doInit() {
    setStage();
}
window.addEventListener("load", doInit);

/*████████████████████████████████████████████████████████████████████████████████████████████████████*/
/*████████████████████████████████████████████████████████████████████████████████████████████████████*/
/*████████████████████████████████████████████████████████████████████████████████████████████████████*/
