/* 
thumbnail
*/
let galleryCFG; //galleryConfig
let img_linksBundle; //eventually packed with all the .src goodness

class SlideGalleryCFG {
    constructor(src) {
        console.log("SlideGalleryCFG");
    }
}
Object.defineProperty(SlideGalleryCFG.prototype, "_fontSize", {
    get: function () {
        return _fontSize;
    },
    set: function (param) {
        _fontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SlideGalleryCFG.prototype, "_fontFamily", {
    get: function () {
        return _fontFamily;
    },
    set: function (param) {
        _fontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SlideGalleryCFG.prototype, "_thumbNailMax", {
    get: function () {
        return _thumbNailMax;
    },
    set: function (param) {
        _thumbNailMax = param;
    },
    configurable: true,
});
Object.defineProperty(SlideGalleryCFG.prototype, "_fullSizeMax", {
    get: function () {
        return _fullSizeMax;
    },
    set: function (param) {
        _fullSizeMax = param;
    },
    configurable: true,
});
Object.defineProperty(SlideGalleryCFG.prototype, "_basePath", {
    get: function () {
        return _basePath;
    },
    set: function (param) {
        _basePath = param;
    },
    configurable: true,
});

// class Preloader extends createjs.LoadQueue {
//   constructor() {}
// }

class Fullsize {
    constructor(src) {}
}

class Thumbnail {
    constructor(src) {}
}

class SlidePanel {
    constructor(src) {}
}

class DrawnShape extends createjs.Container {
    constructor(w, h, x, y, fillColor, fillOpacity, sides, size, rotation) {
        // currently, w and h are not doing anything, being over ridden by size
        // if w and h are equal, use polygon logic, else, rectangle.
        super();
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.sides = sides;
        this.size = size;
        this.fillColor = fillColor;
        this.fillOpacity = fillOpacity;
        this.instanceShape = new createjs.Shape();
        this.addChild(this.instanceShape);
        this.drawShape();
    }
    drawShape() {
        // hexagon  from https://www.scienceprimer.com/drawing-regular-polygons-javascript-canvas
        // https://stackoverflow.com/questions/4839993/how-to-draw-polygons-on-an-html5-canvas
        var numberOfSides = this.sides;
        var size = this.size;
        var Xcenter = this.x;
        var Ycenter = this.y;
        /*  
        cxt.beginPath();
        cxt.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

        for (var i = 1; i <= numberOfSides; i += 1) {
            cxt.lineTo(
                Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
                Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
            );
        }

        cxt.strokeStyle = "#000000";
        cxt.lineWidth = 1;
        cxt.stroke(); */
        var degrees = 0;
        if (numberOfSides === 5) {
            degrees = Math.degrees(Math.radians(this.rotation)); //from local function (not native)
            // THIS DRAWS A STAR, BUT THAT'S NOT WHAT'S NEEDED ALL THE TIME
            this.instanceShape.graphics
                .clear()
                .beginFill(this.getRGBAforColor(this.fillColor))
                .drawPolyStar(Xcenter, Ycenter, size, numberOfSides, 0.6, this.rotation + 55)
                .endFill();
        } else {
            degrees = Math.degrees(Math.radians(this.rotation + 45)); //from local function (not native)

            // THIS DRAWS A STAR, BUT THAT'S NOT WHAT'S NEEDED ALL THE TIME
            this.instanceShape.graphics.clear();
            this.instanceShape.graphics.beginFill(this.getRGBAforColor(this.fillColor));
            this.instanceShape.graphics.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

            // (radians * 180) / Math.PI        // for degree output
            // (degrees * Math.PI) / 180;       // for radian output

            for (var i = 1; i <= numberOfSides; i += 1) {
                var nSide = (i * 2 * Math.PI) / numberOfSides;
                this.instanceShape.graphics.lineTo(
                    // Xcenter + size * Math.cos( nSide ),
                    // Ycenter + size * Math.sin( nSide )
                    Xcenter + size * Math.cos(nSide),
                    Ycenter + size * Math.sin(nSide)
                );
            }
        }

        this.instanceShape.setBounds(0, 0, size, size);
        this.instanceShape.x = Xcenter * 2;
        this.instanceShape.y = Ycenter * 2;

        this.instanceShape.rotation = degrees;
        this.instanceShape.graphics.endFill();
    }
    reDrawShape(w, h) {
        this.drawShape();
        // this.instanceShape.graphics
        //     .clear()
        //     .beginFill(this.getRGBAforColor(fillColor))
        //     .drawRect(0, 0, w || this.w, h || this.h)
        //     .endFill();
        // this.instanceShape.setBounds(0, 0, w || this.w, h || this.h);
    }
    outputRGBFromHexStr(hex2RBG) {
        var new_hex = hex2RBG.substr(1); //remove #
        var colorVal = "";
        colorVal =
            parseInt(new_hex.substr(0, 2), 16) +
            ", " +
            parseInt(new_hex.substr(2, 2), 16) +
            ", " +
            parseInt(new_hex.substr(4, 2), 16);
        return colorVal;
    }
    getRGBAforColor() {
        // should use the getRGB method of createjs.Graphics, like this:
        // createjs.Graphics.getRGB(50, 100, 150, 0.5);
        // bears noting that It also supports passing a single hex color value as the first param,
        // and an optional alpha value as the second param. For example:
        // createjs.Graphics.getRGB(0xFF00FF, 0.2);
        return "rgba(" + this.outputRGBFromHexStr(this.fillColor) + "," + " " + this.calculateOpacity() + ")";
    }
    calculateOpacity() {
        return parseFloat(this.fillOpacity / 100);
    }
}

class StrokedShape extends DrawnShape {
    constructor(w, h, fillColor, fillOpacity, strokeW, strokeOpacity) {
        super(w, h, fillColor, fillOpacity);
        this.strokeShape();
    }
    strokeShape() {
        this.strokedShape = new createjs.Shape();
        this.strokedShape.graphics
            .clear()
            .beginFill(this.getRGBAforColor(this.fillColor))
            .drawRect(0, 0, this.w, this.h)
            .endFill();
        this.strokedShape.setBounds(0, 0, this.w, this.h);
        this.addChild(this.strokedShape);
    }
    restrokeShape(w, h) {
        this.strokedShape.graphics
            .clear()
            .beginFill(this.getRGBAforColor(this.fillColor))
            .drawRect(0, 0, w || this.w, h || this.h)
            .endFill();
        this.strokedShape.setBounds(0, 0, w || this.w, h || this.h);
    }
}

class PageTextClip extends createjs.Text {
    // TODO: contain this within a box, so that real dimensioning wouldn't blow up
    constructor(textContent, txtSize, fontFamily, textColor, textAlign) {
        super(textContent, txtSize + "px " + fontFamily, textColor);

        this.instanceContainer = new createjs.Container();
        this.instanceShape = new createjs.Shape();

        this.txtContent = this.text;

        // console.log(this.getLabelText());

        this.txtSize = txtSize;
        this.fontFamily = fontFamily;
        this.fontChoice = txtSize + "px " + fontFamily;
        this.textColor = textColor;
        this.textAlign = textAlign || "center";
        // this.lineHeight = parseInt(txtSize * 1.125);
        this.lineHeight = txtSize;
        this.pageText = this;
        // this.pageText = new createjs.Text();
        // this.pageText.set({ lineHeight: this.lineHeight, textAlign: "left" });
        this.pageText.set({
            lineHeight: this.lineHeight,
            textAlign: this.textAlign || "center",
        });
        this.pageText.name = "pageText_" + Math.floor(Math.random() * 1000);
        this.w = 0;
        this.h = 0;
        this.letterCount = this.getTextClip().text.split("").length;
        this.pageText.text = "W";
        this.letterWidthEstimate = this.getTextClip().getMetrics().width;
        this.wordsWidthEstimate = 0;
        this.pageText.text = this.txtContent;
        this.instanceContainer.addChild(this.instanceShape);
        this.instanceContainer.addChild(this.pageText);

        // this.w = this.getTextClip().getMetrics().width;
        // this.h = this.getTextClip().getMetrics().height;

        this.wordsWidthEstimate = this.letterWidthEstimate * this.letterCount;
        this.setWidth();
        this.setHeight();

        this.drawButtonHolder();

        // console.log("PageTextClip █letterWidthEstimate█", this.letterWidthEstimate);
    }
    setTextAlign(param) {
        this.textAlign = param;
    }
    getTextAlign() {
        return this.textAlign;
    }
    getTextClip() {
        return this.pageText;
    }
    setText(param) {
        this.getTextClip().text = param;
    }
    getLabelText() {
        return this.txtContent;
    }
    setWidth() {
        this.w = this.pageText.getMetrics().width + this.lineHeight * 2;
    }
    setHeight() {
        this.h = this.getTextClip().getMetrics().height + this.lineHeight * 2;
    }
    getWidth() {
        return this.w;
    }
    getHeight() {
        return this.h;
    }
    drawButtonHolder() {
        var paddedW = this.pageText.getMetrics().width + generalPadding * 2 + 16;

        // var paddedH = this.pageText.getMetrics().height + generalPadding;
        var paddedH = this.pageText.getMetrics().height;

        this.instanceShape.graphics.clear().beginFill("rgba(255, 0, 0, 1)").drawRect(0, 0, paddedW, paddedH).endFill();

        this.instanceShape.setBounds(0, 0, Math.max(this.wordsWidthEstimate, paddedW), paddedH);
        this.pageText.x = paddedW / 2 - 8;
    }
}

class PageButton extends createjs.Container {
    constructor(
        textContent,
        txtSize,
        fontFamily,
        textColor,
        fillColor,
        fillOpacity,
        outlined,
        outlineW,
        outlineColor,
        outlineHiLiteColor,
        textAlign
    ) {
        super();
        this.w = 0;
        this.h = 0;
        this.instanceContainer = new createjs.Container();
        this.instanceShape = new createjs.Shape();
        this.fillOpacity = fillOpacity;
        this.fillColor = fillColor;
        this.outlined = outlined;
        this.outline = new createjs.Shape();
        this.outlineW = outlineW;
        this.outlineColor = outlineColor;
        this.outlineColorOriginal = outlineColor;
        this.outlineHiLiteColor = outlineHiLiteColor || null;
        this.labelText = this.setLabelText(textContent);
        this.textAlign = textAlign || "center";
        this.textClip = new PageTextClip(textContent, txtSize, fontFamily, textColor, this.textAlign);

        this.labelTextContent = this.getLabelText();
        this.letterCount = this.getLabelTextLength();

        this.currentSeen = false;

        this.getTextClip().setText("W");

        this.letterWidthEstimate = this.getTextClip().getWidth();
        this.wordsWidthEstimate = 0;

        // console.log("this.getLabelText(): ", this.getLabelText());

        this.getTextClip().setText(textContent);

        this.instanceContainer.addChild(this.instanceShape);
        this.instanceContainer.addChild(this.textClip);

        this.setLabelWidth();
        this.h = this.getTextClip().getHeight();
        this.drawButtonHolder();
    }
    setTextAlign(param) {
        this.textClip.getTextClip().setTextAlign(param);
    }
    getTextAlign() {
        return this.textClip.getTextClip().getTextAlign();
    }
    getTextClip() {
        return this.textClip.getTextClip();
    }
    getInstance() {
        return this.instanceShape;
    }
    getInstanceContainer() {
        return this.instanceContainer;
    }
    getLabelText() {
        // return this.getTextClip().text;
        return String(this.labelText);
    }
    setLabelText(param) {
        this.labelText = param;
    }
    getLabelTextLength() {
        return this.getLabelText().toString().length;
    }
    setText(param) {
        this.labelText = param;
        this.getTextClip().setText(param);
        // this.getTextClip().set({}); TODO: set textAlign!?
        this.getTextClip().set({ textAlign: this.textAlign });
        this.letterCount = this.getLabelTextLength();
        this.drawButtonHolder();
    }
    setLabelWidth() {
        this.w = this.getTextClip().getWidth();
        // parseFloat(this.w * 0.8);
    }
    setLabelHeight() {
        this.h = this.getTextClip().getMetrics().height;
    }
    setWidthEstimate() {
        this.wordsWidthEstimate = this.w + 32;
        // this.wordsWidthEstimate =
        //     this.letterWidthEstimate * this.getLabelTextLength();
    }
    getWidthEstimate() {
        return this.wordsWidthEstimate;
    }
    getLabelWidth() {
        return this.w;
    }
    getLabelHeight() {
        return this.h;
    }
    calculateOpacity() {
        return parseFloat(this.fillOpacity / 100);
    }
    getRGBAforColor() {
        // TODO: this should use the main outputRGBFromHexStr
        return "rgba(" + this.outputRGBFromHexStr(this.fillColor) + "," + " " + this.calculateOpacity() + ")";
    }
    outputRGBFromHexStr(hex2RBG) {
        //chop off the first char "#"
        var new_hex = hex2RBG.substr(1);
        var colorVal = "";
        colorVal =
            parseInt(new_hex.substr(0, 2), 16) +
            ", " +
            parseInt(new_hex.substr(2, 2), 16) +
            ", " +
            parseInt(new_hex.substr(4, 2), 16);
        return colorVal;
    }
    reStroke(newColor) {
        // is this fullsize currently in view?
        // if not, unStroke;
        // console.log("this is reStroke!");
        if (newColor === null) {
            this.unStroke();
        } else {
            this.outlineColor = newColor;
            this.drawButtonHolder();
        }
    }
    unStroke() {
        // console.log("this is unstroke!");
        this.outlineColor = this.outlineColorOriginal;
        this.drawButtonHolder();
    }
    setSeen(param) {
        this.currentSeen = param;
    }
    getSeen() {
        return this.currentSeen;
    }
    isSeen() {
        // console.log("this: is seen?", galleryCFG._outlineHighlightColor);
        if (this.currentSeen === true) {
            this.setSeen(false);
            this.reStroke(galleryCFG._outlineHighlightColor || "#FFFF00");
        } else {
            this.setSeen(false);
            this.unStroke();
        }
    }
    drawButtonHolder() {
        this.setWidthEstimate();
        this.setLabelHeight();
        var paddedW = parseInt(this.getWidthEstimate());
        var paddedH = this.h + (this.h / 2) * 0.67;
        var fCol = this.getRGBAforColor();

        this.instanceShape.graphics.clear().beginFill(fCol).drawRect(0, 0, paddedW, paddedH).endFill();

        this.instanceShape.setBounds(0, 0, paddedW, paddedH);

        this.textClip.x = parseInt(this.instanceShape.getBounds().width / 2);
        this.textClip.y = parseInt((this.instanceShape.getBounds().height - this.h) / 2);

        //seems to be a good "calibration"
        /*
      plain_btn.getInstanceContainer().x = 1;
      plain_btn.getInstanceContainer().y = 9;
    */

        this.textClip.mouseEnabled = false;

        if (this.outlined === true) {
            this.instanceContainer.addChild(this.outline);
            this.outline.graphics
                .clear()
                .beginStroke(this.outlineColor)
                // .setStrokeStyle(this.outlineW) //.setStrokeStyle(4, "round", "bevel", "round") .setStrokeDash([5,5,10,10])
                .setStrokeStyle(this.outlineW, "round", "bevel", "round")
                // .setStrokeDash([5, 5, 10, 10])
                .drawRect(0, 0, paddedW, paddedH);
            this.outline.snapToPixel = true;
            this.instanceContainer.setBounds(0, 0, paddedW, paddedH);
        } else {
            this.instanceContainer.setBounds(0, 0, paddedW, paddedH);
        }
    }
}

class MapPageButton extends PageButton {
    constructor(
        textContent,
        txtSize,
        fontFamily,
        textColor,
        fillColor,
        fillOpacity,
        outlined,
        outlineW,
        outlineColor,
        outlineHiLiteColor,
        textAlign
    ) {
        super(
            textContent,
            txtSize,
            fontFamily,
            textColor,
            fillColor,
            fillOpacity,
            outlined,
            outlineW,
            outlineColor,
            outlineHiLiteColor,
            textAlign
        );
    }
    /*getInstanceContainer() {
       return super.getInstanceContainer();
    }
    setTextAlign(param) {
        return super.setTextAlign(param);
    }
    getTextAlign() {
        return super.getTextAlign();
    }
    getTextClip() {
        return super.getTextClip();
    }
    getInstance() {
        return super.getInstance();
    }
   
    getLabelText() {
        return super.getLabelText();
    }
    setLabelText(param) {
        return super.setLabelText(param);
    }
    getLabelTextLength() {
        return super.getLabelTextLength();
    }
    setText(param) {
        return super.setText(param);
    }
    setLabelWidth() {
        return super.setLabelWidth();
    }
    setLabelHeight() {
        return super.setLabelHeight();
    }
    setWidthEstimate() {
        return super.setWidthEstimate();
    }
    getWidthEstimate() {
        return super.getWidthEstimate();
    }
    getLabelWidth() {
        return super.getLabelWidth();
    }
    getLabelHeight() {
        return super.getLabelHeight();
    }
    calculateOpacity() {
        return super.calculateOpacity();
    }
    getRGBAforColor() {
        return super.getRGBAforColor();
    }
    outputRGBFromHexStr(hex2RBG) {
        return super.outputRGBFromHexStr(hex2RBG);
    }
    reStroke(newColor) {
        return super.reStroke(newColor);
    }
    unStroke() {
        return super.unStroke();
    }
    setSeen(param) {
        return super.setSeen(param);
    }
    getSeen() {
        return super.getSeen();
    }
    isSeen() {
        return super.isSeen();
    }
    drawButtonHolder() {
        return super.drawButtonHolder();
    } */
}

class SkinnedButton extends createjs.Container {
    constructor(fillImgPath) {
        super();
        // this.instanceContainer = new createjs.Container();
        this.instanceContainer = this;
        this.instanceContainer.name = "skinned_container";
        this.instanceShape = new createjs.Shape();
        this.instanceShape.name = "skinned_shape";
        this.fillImagePath = fillImgPath;
        this.fill_img = null;
        //TODO: remove dependency on config for thumb widths/height
        this.w = galleryCFG._thumbW;
        this.h = galleryCFG._thumbH;
        this.outlineColorOriginal = null; // "#FF00FF"
        this.instanceContainer.addChild(this.instanceShape);
        this.drawButtonHolder();
    }
    reStroke(newColor) {
        // is this fullsize currently in view?
        // if not, unStroke;
        // console.log("this is reStroke!");
        if (newColor === null) {
            this.unStroke();
        } else {
            this.outlineColor = newColor;
            this.drawButtonHolder();
        }
    }
    unStroke() {
        // console.log("this is unstroke!");
        this.outlineColor = null;
        this.drawButtonHolder();
    }
    setSeen(param) {
        this.currentSeen = param;
    }
    getSeen() {
        return this.currentSeen;
    }
    isSeen() {
        // console.log("this: is seen?", galleryCFG._outlineHighlightColor);
        if (this.currentSeen === true) {
            this.setSeen(false);
            this.reStroke(galleryCFG._outlineHighlightColor || "#FFFF00");
        } else {
            this.setSeen(false);
            this.unStroke();
        }
    }
    getInstance() {
        return this.instanceShape;
    }
    getFillImg() {
        return this.fill_img;
    }
    getInstanceContainer() {
        return this.instanceContainer;
    }
    getSRC() {
        return this.fillImagePath;
    }
    drawButtonHolder() {
        // this.setLabelWidth();
        // this.setLabelHeight();

        // galleryCFG._thumbW
        // galleryCFG._thumbH
        // galleryCFG._thumbNailMax

        var bitmap = new createjs.Bitmap(this.fillImagePath);
        var _skinButton = this;
        bitmap.image.onload = function () {
            // stage.update();

            // var bmpPayload = reporter.bind(bitmap);
            // window.dispatchEvent(new Event("imgLoad_evt"));

            var scaled = resizeToKnownDimensions(
                bitmap.image.naturalWidth,
                bitmap.image.naturalHeight,
                _skinButton.w,
                _skinButton.h
            );
            _skinButton.fill_img = bitmap;
            bitmap.scaleX = scaled.scaleRatio;
            bitmap.scaleY = scaled.scaleRatio;
            _skinButton.getInstanceContainer().addChild(_skinButton.fill_img);
            window.dispatchEvent(
                new CustomEvent("imgLoad_evtStr", {
                    // detail: { name: "John" },
                    detail: _skinButton,
                })
            );
        };
        // var fill_img = new createjs.Bitmap(this.fillImagePath);
        var fill_img = bitmap;
        this.fill_img = fill_img;

        this.instanceShape.graphics
            .clear()
            .beginStroke(this.outlineColor)
            // .setStrokeStyle(this.outlineW) //.setStrokeStyle(4, "round", "bevel", "round") .setStrokeDash([5,5,10,10])
            .setStrokeStyle(this.outlineW || 2, "round", "bevel", "round")
            .beginBitmapFill(fill_img)
            .drawRect(0, 0, this.w, this.h)
            .endFill();

        this.instanceShape.setBounds(0, 0, this.w, this.h);
    }
}

class SkinnedIcon extends createjs.Container {
    //VERY similar to the SkinnedButton, but takes w, h for dims
    constructor(fillImgPath, w, h) {
        super();
        // this.instanceContainer = new createjs.Container();
        this.instanceContainer = this;
        this.instanceContainer.name = "skinned_container";
        this.instanceShape = new createjs.Shape();
        this.instanceShape.name = "skinned_shape";
        this.fillImagePath = fillImgPath;
        this.fill_img = null;
        //TODO: remove dependency on config for thumb widths/height
        this.w = w;
        this.h = h;
        this.outlineColorOriginal = null; // "#FF00FF"
        this.instanceContainer.addChild(this.instanceShape);
        this.dimW = 0;
        this.dimH = 0;
        this.drawButtonHolder();
    }
    reStroke(newColor) {
        // is this fullsize currently in view?
        // if not, unStroke;
        // console.log("this is reStroke!");
        if (newColor === null) {
            this.unStroke();
        } else {
            this.outlineColor = newColor;
            this.drawButtonHolder();
        }
    }
    unStroke() {
        // console.log("this is unstroke!");
        this.outlineColor = null;
        this.drawButtonHolder();
    }
    setSeen(param) {
        this.currentSeen = param;
    }
    getSeen() {
        return this.currentSeen;
    }
    isSeen() {
        // console.log("this: is seen?", galleryCFG._outlineHighlightColor);
        if (this.currentSeen === true) {
            this.setSeen(false);
            this.reStroke(galleryCFG._outlineHighlightColor || "#FFFF00");
        } else {
            this.setSeen(false);
            this.unStroke();
        }
    }
    getInstance() {
        return this.instanceShape;
    }
    getFillImg() {
        return this.fill_img;
    }
    getNaturalWidth() {
        return this.getFillImg().image.naturalWidth;
    }
    getNaturalHeight() {
        return this.getFillImg().image.naturalHeight;
    }
    getInstanceContainer() {
        return this.instanceContainer;
    }
    getSRC() {
        return this.fillImagePath;
    }
    drawButtonHolder() {
        // this.setLabelWidth();
        // this.setLabelHeight();

        // galleryCFG._thumbW
        // galleryCFG._thumbH
        // galleryCFG._thumbNailMax

        var bitmap = new createjs.Bitmap(this.fillImagePath);
        var _skinButton = this;
        bitmap.image.onload = function () {
            // stage.update();

            // var bmpPayload = reporter.bind(bitmap);
            // window.dispatchEvent(new Event("imgLoad_evt"));

            var scaled = resizeToKnownDimensions(
                bitmap.image.naturalWidth,
                bitmap.image.naturalHeight,
                _skinButton.w,
                _skinButton.h
            );
            _skinButton.fill_img = bitmap;
            bitmap.scaleX = scaled.scaleRatio;
            bitmap.scaleY = scaled.scaleRatio;
            _skinButton.getInstanceContainer().addChild(_skinButton.fill_img);
            window.dispatchEvent(
                new CustomEvent("imgLoad_evtStr", {
                    // detail: { name: "John" },
                    detail: _skinButton,
                })
            );
        };
        // var fill_img = new createjs.Bitmap(this.fillImagePath);
        var fill_img = bitmap;
        this.fill_img = fill_img;

        this.instanceShape.graphics
            .clear()
            .beginStroke(this.outlineColor)
            // .setStrokeStyle(this.outlineW) //.setStrokeStyle(4, "round", "bevel", "round") .setStrokeDash([5,5,10,10])
            .setStrokeStyle(this.outlineW || 2, "round", "bevel", "round")
            .beginBitmapFill(fill_img)
            .drawRect(0, 0, this.w, this.h)
            .endFill();

        this.instanceShape.setBounds(0, 0, this.w, this.h);
    }
}

class Icon extends createjs.Container {
    constructor(iconImg) {
        super();
        this._instance = new createjs.Container();
        this._bmp = new createjs.Bitmap(iconImg);

        this._self = this;
        this._hitarea = new createjs.Shape();
        this._hitarea.graphics
            .clear()
            .beginFill("rgba(255,255,255,.01)")
            .drawRect(0, 0, this._bmp.getBounds().width, this._bmp.getBounds().height)
            .endFill();
        this._hitarea.setBounds(0, 0, this._bmp.getBounds().width, this._bmp.getBounds().height);
        this._instance.addChild(this._bmp);
        this._instance.addChild(this._hitarea);

        this._self.setBounds(0, 0, this._bmp.getBounds().width, this._bmp.getBounds().height);
    }
    drawIcon() {}
    getInstance() {
        return this._instance;
    }
}

class GalleryWDetail {
    constructor() {}
    //►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►
    //	VERSION 2
    //.g_item.g_i_details = configureItemDetails(loadedXMLContent)	// this could be details read-in from the .xml listing
    //.g_item.g_i_detail = {}										// broken into sub details
    //	.g_i_details.g_i_detail.d_priority							// integer large
    //	.g_i_details.g_i_detail.d_formatting						// "left" or "right" side of gallery page (dom objects)
    //	.g_i_details.g_i_detail.d_image_arr=[]						// array of loaded thumbnails representing detail images.
    //►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►
    //
}
Object.defineProperty(GalleryWDetail.prototype, "parts_collection_arr", {
    get: function () {
        return parts_collection_arr;
    },
    set: function (param) {
        parts_collection_arr = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "seen_collection_arr", {
    get: function () {
        return seen_collection_arr;
    },
    set: function (param) {
        seen_collection_arr = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_total_images", {
    get: function () {
        return g_total_images;
    },
    set: function (param) {
        g_total_images = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_totalW", {
    get: function () {
        return g_totalW;
    },
    set: function (param) {
        g_totalW = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_totalH", {
    get: function () {
        return g_totalH;
    },
    set: function (param) {
        g_totalH = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_thumbw", {
    get: function () {
        return g_thumbw;
    },
    set: function (param) {
        g_thumbw = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_thumbh", {
    get: function () {
        return g_thumbh;
    },
    set: function (param) {
        g_thumbh = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_fullw", {
    get: function () {
        return g_fullw;
    },
    set: function (param) {
        g_fullw = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_fullh", {
    get: function () {
        return g_fullh;
    },
    set: function (param) {
        g_fullh = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryWDetail.prototype, "g_pageAmount", {
    get: function () {
        return g_pageAmount;
    },
    set: function (param) {
        g_pageAmount = param;
    },
    configurable: true,
});

class GalleryItem {
    constructor() {
        //have interaction properties
        //can be unvisualized/revisualized
        //amount threshold of objects could be made
        //this.g_item = {};
    }
}
Object.defineProperty(GalleryItem.prototype, "g_i_been_seen", {
    get: function () {
        return g_i_been_seen;
    },
    set: function (param) {
        g_i_been_seen = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_current_seen", {
    get: function () {
        return g_i_current_seen;
    },
    set: function (param) {
        g_i_current_seen = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_thumbnail", {
    get: function () {
        return g_i_thumbnail;
    },
    set: function (param) {
        g_i_thumbnail = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_fullsize", {
    get: function () {
        return g_i_fullsize;
    },
    set: function (param) {
        g_i_fullsize = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_collection_index", {
    get: function () {
        return g_i_collection_index;
    },
    set: function (param) {
        g_i_collection_index = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_page_index", {
    get: function () {
        return g_i_page_index;
    },
    set: function (param) {
        g_i_page_index = param;
    },
    configurable: true,
});
Object.defineProperty(GalleryItem.prototype, "g_i_page_displayed", {
    get: function () {
        return g_i_page_displayed;
    },
    set: function (param) {
        g_i_page_displayed = param;
    },
    configurable: true,
});

//
class SimpleImage extends createjs.Container {
    constructor(src) {
        super();
        this._self = this;
        this._source = src;
        this._image = new Image();
        this._imageHasBeenDisplayed = false;

        this._imageBinding = {
            _boundParent: this._self,
            _loadedImg: this._image,
        };
        this._img_payload = this.handleBmpImgLoad.bind(this._imageBinding);
        this._image.addEventListener("load", this._img_payload);
        this._image.addEventListener("error", function () {
            // console.log("██ This IS BORKED! " + '"' + src + '"' + " didn't load██");
            // log this error
        });
        // console.log(this._source);
    }
    handleBmpImgLoad(e) {
        // this.image
        // console.log("handleBmpImgLoad this", this);
        // console.log("handleBmpImgLoad e", e);
        // console.log("handleBmpImgLoad this._boundParent ", this._boundParent);
        // console.log("handleBmpImgLoad this._loadedImg", this._loadedImg);

        if (this._boundParent._image.complete) {
            this._boundParent.hasBeenSeen();
            this._boundParent = new createjs.Bitmap(this._loadedImg);
        }
    }
    populateImage() {
        this._image.src = this._source;
        return this._image;
    }
    getPopulatedImg() {
        return this._image;
    }
    hasBeenSeen() {
        if (!this.getPopulatedImg()) {
            this._imageHasBeenDisplayed = false;
        } else {
            this._imageHasBeenDisplayed = true;
        }
        return this._imageHasBeenDisplayed;
    }
    isOnDisplay() {
        return this._imageOnDisplay;
    }
}
Object.defineProperty(SimpleImage.prototype, "_imageOnDisplay", {
    get: function () {
        return _imageOnDisplay;
    },
    set: function (param) {
        _imageOnDisplay = param;
    },
    configurable: true,
});
Math.radians = function (degrees) {
    return (degrees * Math.PI) / 180;
};
// Convert from radians to degrees.
Math.degrees = function (radians) {
    return (radians * 180) / Math.PI;
};
function buildUI() {
    console.log("::::buildUI caller::::", arguments.callee.caller.name);

    return;

    // <div id="main">
    //     <div class="thumbnail_area">
    //       <a class="thumb_nav_arrow left" href="#"> </a>
    //       <div class="content"></div>
    //       <a class="thumb_nav_arrow right" href="#"> </a>
    //     </div>
    //     <div class="display_area">
    //       <canvas id="fullSizeDisplay" width="640" height="480"></canvas>
    //     </div>
    //   </div>

    var uiFrag = document.createDocumentFragment();

    var main = document.createElement("div");
    main.setAttribute("id", "main");
    var thumbnail_area = document.createElement("div");
    thumbnail_area.setAttribute("id", "thumbnail_area");
    var content = document.createElement("div");
    var aLeft = document.createElement("a");
    var aRight = document.createElement("a");
    var display_area = document.createElement("div");
    var fullSizeDisplay = document.createElement("canvas");
    display_area.setAttribute("class", "display_area");
    content.setAttribute("class", "content");
    fullSizeDisplay.setAttribute("id", "fullSizeDisplay");
    fullSizeDisplay.setAttribute("width", "640");
    fullSizeDisplay.setAttribute("height", "480");
    aLeft.setAttribute("class", "thumb_nav_arrow left");
    aLeft.setAttribute("href", "#");
    aRight.setAttribute("class", "thumb_nav_arrow right");
    aRight.setAttribute("href", "#");

    thumbnail_area.appendChild(aLeft);
    thumbnail_area.appendChild(content);
    thumbnail_area.appendChild(aRight);
    main.appendChild(thumbnail_area);
    display_area.appendChild(fullSizeDisplay);
    main.appendChild(display_area);
    uiFrag.appendChild(main);
    document.querySelector("#gallery").appendChild(uiFrag);
}
