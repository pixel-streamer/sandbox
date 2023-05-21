/*
from: code: https://jsfiddle.net/lannymcnie/ndmzLt1z/4/
		question about sheen:
		https://stackoverflow.com/questions/40744814/mask-with-alpha-filter-in-easeljs-or-tweenmax
*/

var stage = new createjs.Stage("canvas");
createjs.Ticker.addEventListener("tick", stage);

var imgSheen = new createjs.Shape(), c = new createjs.Container();
c.addChild(imgSheen);
var bmp = new createjs.Bitmap("https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png");

bmp.image.onload = function() {
	imgSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0)', '#000', 'rgba(255,255,255,0)'], [0, 0.5, 1], 0, 0, 50, 0).drawRect(0, 0, 100, 400);
	c.cache(0,0,100,400);

	createjs.Tween.get(imgSheen, {loop:true}).to({x:200}, 2000, createjs.Ease.quadInOut)
	.on("change", function() { 
	c.cache(0,0,250,400); 
	bmp.cache(0,0,bmp.image.width,bmp.image.height);
	});

	bmp.filters = [
	new createjs.AlphaMaskFilter(c.cacheCanvas)
	]; 
	stage.addChild(bmp.clone());
	bmp.compositeOperation = "screen";
	stage.addChild(bmp);
	//stage.addChild(imgSheen); // Testing
}