(function () {
	"use strict";
	function ColorMaskFilter(color) {
		this.color = color;
	}
	var p = createjs.extend(ColorMaskFilter, createjs.Filter);
	p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if (!this.color) { return true; }
		targetCtx = targetCtx || ctx;
		if (targetX == null) { targetX = x; }
		if (targetY == null) { targetY = y; }
 
		targetCtx.save();
		if (ctx != targetCtx) {
			return false;
		}
 
		targetCtx.globalCompositeOperation = "source-out"; // Use source-in to fill the shape instead
    targetCtx.fillStyle = this.color;
		targetCtx.rect(targetX,targetY,width,height);
    targetCtx.fill();
    
		targetCtx.restore();
		return true;
	};
	p.clone = function () {
		return new AlphaMaskFilter(this.color);
	}; 
	createjs.ColorMaskFilter = createjs.promote(ColorMaskFilter, "Filter");
}());
 
var stage = new createjs.Stage("canvas");
var img = document.createElement("img");
img.crossOrigin = "Anonymous";
var bmp = new createjs.Bitmap(img);
img.onload = function() {
		bmp.filters = [new createjs.ColorMaskFilter("#ff0000")];
    bmp.cache(0,0,img.width, img.height);
    stage.addChild(bmp);
    stage.update();
}
img.src = "https://playpen.createjs.com/CORS/duck.png";

/*
//from here:
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas

processor.computeFrame = function () {
  this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
  const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
  const data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i + 0];
    const green = data[i + 1];
    const blue = data[i + 2];
    if (green > 100 && red > 100 && blue < 43) {
      data[i + 3] = 0;
    }
  }
  this.ctx2.putImageData(frame, 0, 0);
};
*/

