/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
var stage,
    isDrawing,
    drawingCanvas,
    oldPt,
    oldMidPt,
    displayCanvas,
    image,
    bitmap,
    maskFilter,
    cursor,
    text,
    blur;

image = new Image();
image.crossOrigin = "Anonymous";
image.onload = handleComplete;
image.src = "https://playpen.createjs.com/CORS/flowers.jpg";

stage = new createjs.Stage("testCanvas");
text = new createjs.Text("Loading...", "20px Arial", "#FFF");
text.set({
    x: stage.canvas.width / 2,
    y: stage.canvas.height - 40,
});
text.textAlign = "center";

function handleComplete() {
    createjs.Touch.enable(stage);
    stage.enableMouseOver();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.addEventListener("stagemousemove", handleMouseMove);
    drawingCanvas = new createjs.Shape();

    bitmap = new createjs.Bitmap(image);

    blur = new createjs.Bitmap(image);
    blur.filters = [
        new createjs.BlurFilter(24, 24, 2),
        new createjs.ColorMatrixFilter(new createjs.ColorMatrix(60)),
    ];
    blur.cache(0, 0, 960, 400);

    text.text = "Click and Drag to Reveal the Image.";

    stage.addChild(bitmap, text, blur);
    updateCacheImage(false);

    cursor = new createjs.Shape(
        new createjs.Graphics().beginFill("#FFFFFF").drawCircle(0, 0, 25)
    );
    cursor.cursor = "pointer";

    stage.addChild(cursor);
}

function handleMouseDown(event) {
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    isDrawing = true;
}

function handleMouseMove(event) {
    cursor.x = stage.mouseX;
    cursor.y = stage.mouseY;

    if (!isDrawing) {
        stage.update();
        return;
    }

    var midPoint = new createjs.Point(
        (oldPt.x + stage.mouseX) >> 1,
        (oldPt.y + stage.mouseY) >> 1
    );

    drawingCanvas.graphics
        .setStrokeStyle(40, "round", "round")
        .beginStroke("rgba(0,0,0,0.5)")
        .moveTo(midPoint.x, midPoint.y)
        .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPoint.x;
    oldMidPt.y = midPoint.y;

    updateCacheImage(true);
}

function handleMouseUp(event) {
    updateCacheImage(true);
    isDrawing = false;
}

function updateCacheImage(update) {
    if (update) {
        drawingCanvas.updateCache();
    } else {
        drawingCanvas.cache(0, 0, image.width, image.height);
    }

    maskFilter = new createjs.AlphaMaskFilter(drawingCanvas.cacheCanvas);

    blur.filters.length = 2;
    blur.filters.push(maskFilter);
    if (update) {
        blur.updateCache(0, 0, image.width, image.height);
    } else {
        blur.cache(0, 0, image.width, image.height);
    }

    stage.update();
}
