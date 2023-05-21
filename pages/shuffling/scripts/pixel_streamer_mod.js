TODO:
  THIS CODE IS NOT COMPLETE.
  ALSO, IT IS CARRIED OVER FROM THE PORTFOLIO WORKSPACE. CONTINUE TO USE THIS AS THE BACKUP,
  AND CARRY ON WITHIN THE OTHER File UNTIL COMPLETED. TY.

window.addEventListener("load", init);

function initGallery() {
  readyCollection();
  createGUI();
}

function createGUI() {
  console.log(" :::createGUI::: ");
}

function assembleRelevantData() {
  console.log(" :::assembleRelevantData::: ");
}

function preloadFixedCount() {
  console.log(" :::preloadFixedCount::: ");
}

function readyCollection() {
  console.log(" :::readyCollection::: ");
  assembleRelevantData();
  preloadFixedCount();
}

class Preloader {
  constructor() {}
}

class SimpleImage extends Image {
  constructor(src, domContainerEl) {
    super();
    this._loaded = false;
    this._src = src;
    this._containerEl = domContainerEl;
    //https://developer.mozilla.org/en-US/docs/Web/API/
    var _self = this;
    //return _self.readyForDom.call(response, _self);
    this._img = new Image();

    this._imgContent = fetch(this._src)
      .then(function (response) {
        return response.blob();
      })
      .then(function (commits) {
        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
        var reader = new FileReader();

        reader.addEventListener(
          "load",
          function () {
            // convert image file to base64 string
            _self._img.src = reader.result;
          },
          false
        );
        reader.addEventListener(
          "error",
          function (err) {
            console.log("error reading in the file: ", err);
          },
          false
        );

        if (commits) {
          reader.readAsDataURL(commits);
          _self._img.src = reader.result;
          // _self._containerEl.appendChild(_self._img);
          return commits;
        }
        resolve(_self._img);
      });
  }
  //TODO: real handlers for events, based on promises?

  getImageContent() {
    return this._imgContent;
  }
  getImg() {
    return this._img;
    //return this._img;
  }

  setSrc(val) {
    this._img.src = val;
  }
}

class Fullsize extends SimpleImage {
  constructor(src) {
    super(src);
  }
}

class Thumbnail extends SimpleImage {
  constructor(src) {
    super(src);
  }
}

class CanvasImg extends SimpleImage {
  constructor(src) {
    super(src);
    this._source = src;
    this.t;
    this._canvasRepresention = document.createElement("canvas");
    this._context = this._canvasRepresention.getContext("2d");
  }
  setCanvasSize(w, h) {
    this._canvasRepresention.width = w;
    this._canvasRepresention.height = h;
    return this._canvasRepresention;
  }
  getCanvas() {
    return this._canvasRepresention;
  }
  getCanvasContext() {
    return this._context;
  }
  getImageContent() {
    //console.log("::: CanvasImg getImageContent :::", super.getImg());
    return super.getImg();
  }
  getImageData() {
    //console.log("::: CanvasImg super.getImg().data :::", super.getImg().data);
    return super.getImg().data;
  }
  drawImgToCanvas(x, y) {
    var someimg = super.getImg();
    var ctx = this._context;
    this.t = setTimeout(function () {
      ctx.drawImage(someimg, x, y);
    }, 50);
    return this._canvasRepresention;
  }
  drawImgToDestinationCanvas(cnvs, x, y, destW, destH) {
    var someimg = super.getImg();

    var ctx = cnvs.getContext("2d");
    this.t = setTimeout(function () {
      ctx.drawImage(someimg, x, y, destW, destH);
    }, 50);
    return super.getImg();
  }
  drawCustomTextContent(
    textContent,
    textHexColor,
    fontStyle,
    fontSize,
    fontFam,
    xPos,
    yPos
  ) {
    var spaceRE = /^\s*$/g;
    var padding = parseInt(fontSize.substring(0, fontSize.length - 2)) / 2;
    var ctx = this._context;
    var fontDetails;
    if (fontStyle === null) {
      fontDetails = fontSize + " " + fontFam;
    } else {
      fontDetails = fontStyle + " " + fontSize + " " + fontFam;
    }
    // set the font to determine font size and width.
    ctx.font = fontDetails;
    var textDims = ctx.measureText(textContent);
    if (spaceRE.test(this._source)) {
      //console.log("textDims: ", textDims);
      this.setCanvasSize(textDims.width + padding * 2, padding * 2);
    }
    //reset the font to be nice after canvas resize.
    ctx.font = fontDetails;
    console.log("this._imgIsBlank", this._imgIsBlank);
    ctx.fillStyle = textHexColor;
    ctx.fillText(textContent, padding + xPos, yPos);
    return this._canvasRepresention;
  }
}

class SimpleButton {
  constructor(container, labelTxt, classStr) {
    this._container = container;
    this._labelTxt = labelTxt;
    this._classString = classStr;
    this._button = this.createButton();
    if (labelTxt !== undefined) {
      this._buttonText = this.createLabel();
    }
    this.init();
    this.setClasses(this._classString);
  }
  init() {
    if (this._buttonText) {
      this._button.appendChild(this._buttonText);
    }
    this._container.appendChild(this._button);
    return this._button;
  }
  createButton() {
    this._button = document.createElement("button");
    return this._button;
  }
  createLabel() {
    this._buttonText = document.createTextNode(this._labelTxt);
    return this._buttonText;
  }
  setClasses(classes) {
    this._button.setAttribute("class", classes);
  }
  setAction(type, fn) {
    this._button.addEventListener(type, fn);
  }
  removeAction(type, fn) {
    this._button.removeEventListener(type, fn);
  }
}

class SkinnedButton extends SimpleButton {
  constructor(container, labelTxt, src, classStr) {
    super(container, labelTxt);
    this._img = new SimpleImage(src).getImg();
    this._buttonFrag = document.createDocumentFragment();
    this._populateListener = this.populateDom.bind(this);
    this._img.addEventListener("success", this._populateListener);
    if (classStr) {
      this._classString = classStr;
    }
  }
  populateDom() {
    console.log(":::SkinnedButton populateDom:::", this._img);
    this._buttonFrag.appendChild(this._button);
    //this._button.style.background = "url(" + this._img.src + ")";
    this._button.appendChild(this._img);
    this._button.setAttribute("class", this._classString);
    this._container.appendChild(this._buttonFrag);
  }
}

class PageControls {
  constructor() {}
}

class Interactions {
  constructor() {}
  doStuff(event) {
    console.log("some stuff has been done.");
  }
  doMoreStuff(event) {
    //console.log("doMoreStuff   has been done.");
    console.log("doMoreStuff target: ", event.target);
  }
}

class CanvasWithClicks {
  constructor(containerEl) {
    /* intended one-off use to return a canvas with an array holder for elements that can
    be called as click targets */
    this._containerEl = containerEl || document.body;
    this._frag = document.createDocumentFragment();
    this._canvasEl = document.createElement("canvas");
    this._clickableElArr = [];
    //init();
  }
  init() {}
  getMainContext() {
    return this._canvasEl.getContext("2d");
  }
  getMainCanvas() {
    return this._canvasEl;
  }
  getElementsArr() {
    return this._clickableElArr;
  }
  populateDom() {
    //console.log("CanvasWithClicks: populateDom");
    this._frag.appendChild(this._canvasEl);
    this._containerEl.appendChild(this._frag);
  }
}

class DeviceView {
  constructor() {
    this._width;
    this._height;
    this.init();
  }
  init() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  set innerWidth(val) {
    this._width = val;
  }
  get innerWidth() {
    return this._width;
  }
  set innerHeight(val) {
    this._height = val;
  }
  get innerHeight() {
    return this._height;
  }
}

class PromiseToPaintIntoDom {
  constructor(src, fsSrc, containerEl, xPos, yPos) {
    var _self = this;
    this._img;
    this._yCount = 0;
    this._src = src;
    this._FSsrc = fsSrc;
    this._FSimg;
    this._xPos = xPos;
    this._yPos = yPos;
    this._loaded = false;
    this._container = containerEl;
    this._resolution = new Promise(function (resolve, reject) {
      return this._img;
    })
      .then(this.makeImg())
      .catch(function (error) {
        if (!_self._img.complete) {
          _self.failureCallback.apply(_self, error);
        } else {
          this.getPromise();
        }
      });
    /* 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
    */
  }
  get_xPos() {
    return this._xPos;
  }
  get_yPos() {
    return this._yPos;
  }
  getSrc() {
    return this._src;
  }
  get_fsSrc() {
    return this._FSsrc;
  }
  getPromise() {
    return this._resolution;
  }

  makeImg(resolve, reject) {
    //console.log(":::makeImg::: ");
    if (this._img === undefined) {
      this._img = new Image();
    }
    //var thisLoadBind = this.addToDom.bind(this.getResolution());
    var thisLoadBind = this.addToDom.bind(this);
    this._img.addEventListener("load", thisLoadBind);
    this._img.src = this._src;
    return this._img;
  }

  loadFS() {
    console.log(":::loadFS:::");
    if (this._FSimg === undefined) {
      this._FSimg = new Image();
    }
    var thisLoadBind = this.addFStoDom.bind(this);
    this._FSimg.addEventListener("load", thisLoadBind);
    this._FSimg.src = this.get_fsSrc();
    return this._FSimg;
  }

  addFStoDom() {
    console.log(":::addFStoDom:::");
    this._FSimg.addEventListener("click", function () {
      console.log("you clicked on my thingy");
      //TODO: do a resize of the larger image to fit into the canvas at center.
      //TODO: draw resized full image to canvas at center.
      //TODO: set Event of a click to hide the larger image, and return to the
      //previous canvas state. 
      //so there needs to be a "save" on the canvas BEFORE the render of the image
      //and then the canvas can be restored to the state that records clicks to
      //bring up the enlarged image! 
    });
    document.body.appendChild(this._FSimg);
  }

  addToDom() {
    //window.dispatchEvent(img_loaded_evt);
    this._loaded = true;
    window.dispatchEvent(
      new CustomEvent("img_loaded", {
        detail: { msg: "█image loaded:" + this.getSrc() + "\n", payload: this },
      })
    );

    //console.log("this:████ ready to addToDom", this);
    var promRes = this.getResolution();

    var rectName = {};
    rectName.name = "rect_" + global_counter++;
    rectName.left = this._xPos;
    rectName.top = this._yPos;
    rectName.width = promRes.width;
    rectName.height = promRes.height;
    rectName.src = promRes.src;
    rectName.FSsrc = this._FSsrc;
    rectName.asset = this;
    elArr.push(rectName);
    /* 
      TODO: this should be able to be a clickable thing within the canvas!
      _img.addEventListener("click", function () {
        console.log("you clicked on this:: ", _img.src);
      });
     */
    return this._img;
  }

  getIsLoaded() {
    return this._loaded;
  }

  getResolution() {
    return this._img;
  }

  failureCallback(error) {
    console.log("do failureCallback.", this._src, error);
    return this.getResolution();
  }
}
