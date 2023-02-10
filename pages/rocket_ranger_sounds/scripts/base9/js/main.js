//main.js
var canvas,stage;
var images={};

function init() {
    canvas = document.getElementById("mainView");
    stage = new createjs.StageGL(canvas);


    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("progress",progressHandler);
    loader.addEventListener("complete",completeHandler);
    loader.loadManifest([
        {src:"images/btn.png", id:"btn"}
    ]);

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);

}
function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}
function progressHandler(event)
{

}
function completeHandler(event)
{
    event.currentTarget.removeEventListener("fileload",handleFileLoad);
    event.currentTarget.removeEventListener("progress",progressHandler);
    event.currentTarget.removeEventListener("complete",completeHandler);

    var bitmap = new Soul.BaseBitmap(images.btn);
    stage.addChild(bitmap);
    bitmap.y = 50;


    var scale9Grid = new Soul.Scale9GridDisplayObject(images.btn,new createjs.Rectangle(54,43,250,60));
    stage.addChild(scale9Grid);

    scale9Grid.y = 400;

    createjs.Tween.get(bitmap,{loop:true}).to({width:1000},2000);
    createjs.Tween.get(scale9Grid,{loop:true}).to({width:1000},2000);

}
