function preload() {
    console.log(":::::::PRELOADING:::::::::");
    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", makeImage);
    fileLoader.loadManifest({
        manifest: [
            {
                src: "https://playpen.createjs.com/CORS/daisy.png",
                id: "daisy",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "https://playpen.createjs.com/CORS/duck.png",
                id: "duck",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "https://playpen.createjs.com/CORS/duck2.png",
                id: "duck2",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
        ],
    });
}

function makeImage(e) {
    console.log(":::::::makeImage:::::::::");
    var duck = e.target.getResult("duck");
    console.log("duck: ", duck);

    var bmp = new createjs.Bitmap(duck);
    bmp.filters = [new ColorMaskFilter("#FF0000")];
    bmp.cache(0, 0, bmp.image.naturalWidth, bmp.image.naturalHeight);
    stage.addChild(bmp);
    stage.update();
}

(function () {
    console.clear();
    console.log("let's begin, shall we?");
    window.stage = new createjs.Stage("canvas");
    window.fileLoader = new createjs.LoadQueue(true);

    preload();
})();

class ColorMaskFilter extends createjs.Filter {
    constructor(color) {
        super();
        this.color = color;
    }
    applyFilter = function (
        ctx,
        x,
        y,
        width,
        height,
        targetCtx,
        targetX,
        targetY
    ) {
        if (!this.color) {
            return true;
        }
        targetCtx = targetCtx || ctx;
        if (targetX == null) {
            targetX = x;
        }
        if (targetY == null) {
            targetY = y;
        }

        targetCtx.save();
        if (ctx != targetCtx) {
            return false;
        }

        targetCtx.globalCompositeOperation = "source-out"; // Use source-in to fill the shape instead
        targetCtx.fillStyle = this.color;
        targetCtx.rect(targetX, targetY, width, height);
        targetCtx.fill();

        targetCtx.restore();
        return true;
    };
    clone = function () {
        return new AlphaMaskFilter(this.color);
    };
}
