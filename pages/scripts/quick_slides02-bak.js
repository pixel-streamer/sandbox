const cardflip_evt = new CustomEvent("cardflip_evt_evtStr", {
    detail: { msg: ":::flip card" },
});

window.addEventListener("cardflip_evt_evtStr", cardEventHandler);

function cardEventHandler(e) {
    console.log("cardflip_evt was dispatched.... ");
}

class SingleFileLoader extends createjs.LoadQueue {
    constructor(singleLoaderConfig) {
        super(singleLoaderConfig.prefersXHR);
        this.prefersXHR = singleLoaderConfig.prefersXHR;

        this.singleID = singleLoaderConfig.singleID;
        this.loadedProgressContainerScope = singleLoaderConfig.loadedProgressContainerScope;
        this.textX = singleLoaderConfig.textX;
        this.textY = singleLoaderConfig.textY;
        singleLoaderConfig.finalW === undefined || null
            ? (this.finalW = singleLoaderConfig.finalW)
            : (this.finalW = singleLoaderConfig.finalW = 0);
        singleLoaderConfig.finalH === undefined || null
            ? (this.finalH = singleLoaderConfig.finalH)
            : (this.finalH = singleLoaderConfig.finalH = 0);

        singleLoaderConfig.finalX === undefined || null ? (this.finalX = singleLoaderConfig.finalX) : (this.finalX = 0);
        singleLoaderConfig.finalY === undefined || null ? (this.finalY = singleLoaderConfig.finalY) : (this.finalY = 0);

        var anInstanceContainer = new createjs.Container();
        this.home = anInstanceContainer;

        this.loadedProgressContainerScope.addChild(this.home);
        this.loadedProgressContainerScope.addChild(this.home);
        this.instance = this;
        this.name = this.setName(this.singleID);
        this.bmp = null;

        this.instance.on("fileload", this.handleFileLoad);
        this.instance.on("progress", this.handleFileProgress);

        this.instance.on("complete", this.loadComplete);
        this.instance.on("error", this.loadError);

        if (this.progressText === undefined || null) {
            var anInstanceTextContainer = new createjs.Container();
            this.textContainer = anInstanceTextContainer;
            this.progressText = new createjs.Text("LOADING:0123456789%", "16px 'Press Start 2P'", "#FFCC00");
            this.textContainer.x = this.textX;
            this.textContainer.y = this.textY;
            this.textContainer.addChild(this.progressText);
            this.home.addChild(this.textContainer);
        } else {
            this.textContainer.visible = true;
        }

        this.progressText.text = "";

        if (typeof singleLoaderConfig.manifestList === "string") {
            if (
                singleLoaderConfig.manifestList === "" ||
                singleLoaderConfig.manifestList === undefined ||
                singleLoaderConfig.manifestList === null
            ) {
                this.manifestList = this.singleID;
            } else {
                this.manifestList = singleLoaderConfig.manifestList;
                console.log("FEED ME");
                console.log(
                    "○○○" + " this.manifestList :",
                    this.singleID || this.manifestList,
                    "○○○",
                    this.manifestList,
                    "○○○",
                    typeof this.manifestList,
                    "○○○",
                    this.progressText
                );
                // var sList = new createjs.LoadQueue(true);
                this.instance.loadFile(this.manifestList);
            }
        }
    }
    stuffRaw(param) {
        this._raw = param;
    }
    getRaw() {
        return this._raw;
    }
    handleFileLoad(event) {
        if (event.result.naturalWidth > 0) {
            this.getBMP();
        }
    }
    handleFileProgress(event) {
        this.progressText.text = (Math.floor(this.instance.progress * 100) | 0) + " % Loaded";
    }
    loadComplete(event) {
        // console.log(this.manifestList);
        // TODO:this isn't the correct way-- I've tried sending empty this.manifestList  to load; no bueno
        if (this.manifestList === this.singleID) {
            this.stuffRaw(event.target.getResult(event.target.singleID));
            this.setBMP(this.getRaw());
            // console.log("►►► loadComplete THIS", this.getRaw());
        }
    }
    getDetails() {
        return {
            loadery: this,
            populatedBMP: this.getBMP(),
            cardName: this.getName(),
            container: this.getContainer(),
        };
    }
    setBMP(param) {
        this.bmp = new createjs.Bitmap(param);
        var boundThang = this.continuedComplete.bind(this);
        setTimeout(boundThang, 125);
    }
    continuedComplete() {
        this.getTextContainer().visible = false;

        var wBounds = parseInt(w - 64);
        var hBounds = parseInt(h - 64);

        var BMPContainer = new createjs.Container();

        var fsBMP = this.getBMP();

        if (fsBMP === undefined) {
            fsBMP = new createjs.Bitmap(this.getRaw());
            var fsBMPimg = fsBMP.image;

            BMPContainer.addChild(fsBMP);
            BMPContainer.setBounds(0, 0, fsBMP.getBounds().width, fsBMP.getBounds().height);
            BMPContainer.x = (w - fsBMP.getBounds().width) / 2;
            BMPContainer.y = (h - fsBMP.getBounds().height) / 2;
            subject_content.addChild(BMPContainer);
        } else {
            var fsBMPimg = fsBMP.image;
            console.log(fsBMPimg);

            var newDims = resizeToKnownDimensions(fsBMPimg.naturalWidth, fsBMPimg.naturalHeight, wBounds, hBounds);

            console.log(fsBMPimg.naturalWidth, newDims.scaleRatio, newDims);

            BMPContainer.addChild(fsBMP);
            BMPContainer.scaleX = newDims.scaleRatio;
            BMPContainer.scaleY = newDims.scaleRatio;

            BMPContainer.setBounds(
                0,
                0,
                fsBMP.getBounds().width * newDims.scaleRatio,
                fsBMP.getBounds().height * newDims.scaleRatio
            );
            BMPContainer.x = (w - fsBMP.getBounds().width) / 2;
            BMPContainer.y = (h - fsBMP.getBounds().height) / 2;
            subject_content.addChild(BMPContainer);

            window.dispatchEvent(
                new CustomEvent("cardflip_evt_evtStr", {
                    detail: {
                        msg: ":::image loaded",
                    },
                })
            );
        }
    }
    getBMP() {
        this.spitOutBMP();
    }
    spitOutBMP() {
        return this.bmp;
    }

    setName(param) {
        this.name = param;
    }
    getName() {
        return this.name;
    }
    getContainer() {
        return this.home;
    }
    getLoader() {
        return this.instance;
    }
    loadError(evt) {
        console.log("Error!", evt.text);
    }
    getTextContainer() {
        return this.textContainer;
    }
    getID() {
        return this.name;
    }
}

/*
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
var big_map;
var big_mapIsLoaded = false;
var fileLoader;
var loadedSliders = [];

function playGame() {
    loadAssets();
}

function loadAssets() {
    console.log("playGame", "loadAssets");

    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    big_map = document.querySelector("#big_map");

    fileLoader.loadManifest({
        manifest: [
            {
                src: window.location.search + "./images/renders.xml",
                id: "renders",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
        ],
    });
}

/*
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

function toggleHidden(e) {
    var sendTarget = this.target;
    var sendBMPURL = this.fullSize;
    var newBoundToComplete = {
        target: sendTarget,
        fsURL: sendBMPURL,
    };

    var completeBound = tweenComplete.bind(newBoundToComplete);

    createjs.Tween.get(this.target)

        .to({ alpha: 0, visible: false }, 135)
        .call(completeBound);
}

function showLoaded() {
    // console.log("showLoaded ");
    for (var i = 0; i < loadedSliders.length; i++) {
        var bmp = loadedSliders[i].thumbLoader.getBMP();
        bmp.visible = true;
        bmp.alpha = 1;
        console.log("Σ Σ SHOW THIS! Σ Σ", bmp);
    }
}

function isLastID(param) {
    // console.log("isLastID ");
    var slidesAreAllOff = true;
    for (var i = 0; i < loadedSliders.length; i++) {
        // console.log(
        //     param.name,
        //     loadedSliders[i].thumbLoader.getID(),
        //     param.name === loadedSliders[i].thumbLoader.getID()
        // );
        // console.log(
        //     "☻☻",
        //     loadedSliders[i].thumbLoader.getBMP().visible,
        //     // loadedSliders[i].thumbLoader.instance.getResult(loadedSliders[i].thumbLoader.instance.getID())
        // );
        if (param.name === loadedSliders[i].thumbLoader.getID()) {
            loadedSliders[i].thumbLoader.getBMP().visible = false;
        }
        if (loadedSliders[i].thumbLoader.getBMP().visible) {
            slidesAreAllOff = false;
        }
        if (i === parseInt(loadedSliders.length - 1)) {
            if (slidesAreAllOff === true) {
                console.log("ΣΣΣΣΣΣ SLIDES ARE ALL HIDDEN ΣΣΣΣΣΣΣ");
                showLoaded();
            }
        }
    }
}

function tweenComplete() {
    var wBounds = parseInt(w - 64);
    var hBounds = parseInt(h - 64);
    isLastID(this.target);
    var BMPContainer = new createjs.Container();

    var FSIMGConfig = {
        prefersXHR: true, //singleLoaderConfig.prefersXHR;
        /* load a single file! */ manifestList: this.fsURL, //singleLoaderConfig.manifestList;
        singleID: this.fsURL, //singleLoaderConfig.singleID;
        loadedProgressContainerScope: BMPContainer, //singleLoaderConfig.loadedProgressContainerScope;
        textX: 0, //singleLoaderConfig.textX;
        textY: 0, //singleLoaderConfig.textY;
        finalW: 0, //singleLoaderConfig.finalW
        finalH: 0, //singleLoaderConfig.finalH
        finalX: 0, //singleLoaderConfig.finalX
        finalY: 0, //singleLoaderConfig.finalY
    };

    var fullSizeFileLoader = new SingleFileLoader(FSIMGConfig);
    subject_content.addChild(BMPContainer);
    var fsBMP = fullSizeFileLoader.getBMP();

    console.log(fsBMP);

    return fullSizeFileLoader;

    var fsBMP = new SkinnedIcon(this.fsURL, wBounds, hBounds);

    var newDims = resizeToKnownDimensions(fsBMP.getNaturalWidth(), fsBMP.getNaturalHeight(), wBounds, hBounds);

    fsBMP.getInstanceContainer().scaleX = newDims.scaleRatio;
    fsBMP.getInstanceContainer().scaleY = newDims.scaleRatio;
    BMPContainer.addChild(fsBMP.getInstanceContainer());
    BMPContainer.setBounds(0, 0, wBounds, hBounds);

    BMPContainer.x = (BMPContainer.getBounds().width - w) / 2;
    BMPContainer.y = (BMPContainer.getBounds().height - h) / 2;

    subject_content.addChild(BMPContainer);
}

function handle_OLD_MAP_LOAD(e) {
    console.log(":::handle_ImageLoadComplete:::");
    stage.snapToPixel = true;

    var renderUrl = e.target.getResult("renders").firstChild.attributes.url.value;
    var thumbsUrl = e.target.getResult("renders").firstChild.attributes.thumbnails.value;
    var smallList = e.target.getResult("renders").getElementsByTagName("image");
    var smallListArr = [];

    for (var i = 0; i < smallList.length; i++) {
        smallListArr.push(smallList[i].attributes.src.value);

        var thumbnailConfig = {
            prefersXHR: true, //singleLoaderConfig.prefersXHR;
            manifestList: "", //singleLoaderConfig.manifestList;
            singleID: smallList[i].attributes.title.value, //singleLoaderConfig.singleID;
            loadedProgressContainerScope: subject_content, //singleLoaderConfig.loadedProgressContainerScope;
            textX: 0, //singleLoaderConfig.textX;
            textY: i * 20, //singleLoaderConfig.textY;
            finalW: 0, //singleLoaderConfig.finalW
            finalH: 0, //singleLoaderConfig.finalH
            finalX: 0, //singleLoaderConfig.finalX
            finalY: 0, //singleLoaderConfig.finalY
        };

        var singleFileLoader = new SingleFileLoader(thumbnailConfig);

        var thisImgPayload = {
            fullURL: window.location.search + renderUrl + "/" + smallListArr[i],
            targetID: smallList[i].attributes.title.value,
            imgSrc: smallList[i].attributes.src.value,
            message: "this loaded: " + i + " █",
            thumbLoader: singleFileLoader,
            thisThumbsUrl: thumbsUrl,
            thisThumbLoc:
                window.location.search +
                thumbsUrl +
                "/" +
                smallList[i].attributes.src.value.substring(0, smallList[i].attributes.src.value.lastIndexOf(".")) +
                "-t.png",
        };

        loadedSliders.push(thisImgPayload);
    }
    loadThumbs();
}

function handleThumbLoad(e) {
    var wBounds = parseInt(w - 128);
    var hBounds = parseInt(h - 128);

    return;

    e.target.setBMP(e.target.getResult(this.targetID));

    var loadedImg = e.target.getBMP();
    loadedImg.name = this.targetID;
    var loadedContainer = new createjs.Container();

    console.log("loadedImg.image", loadedImg.image);

    if (loadedImg.image.naturalWidth > wBounds || loadedImg.image.naturalHeight > hBounds) {
        var newDims = resizeToKnownDimensions(
            loadedImg.image.naturalWidth,
            loadedImg.image.naturalHeight,
            wBounds,
            hBounds
        );

        loadedImg.scaleX = newDims.scaleRatio;
        loadedImg.scaleY = newDims.scaleRatio;
        loadedContainer.setBounds(0, 0, newDims.newW, newDims.newH);
    } else {
        loadedContainer.setBounds(0, 0, loadedImg.image.naturalWidth, loadedImg.image.naturalHeight);
    }

    loadedContainer.addChild(loadedImg);

    loadedImg.x = (w - loadedContainer.getBounds().width) / 2;
    loadedImg.y = (h - loadedContainer.getBounds().height) / 2;

    var fsURL = this.fullURL;

    var boundBmp = toggleHidden.bind({ target: e.target.getBMP(), fullSize: fsURL });
    loadedImg.addEventListener("click", boundBmp);

    interactive_content.addChild(loadedImg);
}

function loadThumbs() {
    for (var i = 0; i < loadedSliders.length; i++) {
        loadedSliders[i].thumbLoader.loadFile({
            id: loadedSliders[i].targetID,
            crossOrigin: true,
            src:
                window.location.search +
                loadedSliders[i].thisThumbsUrl +
                "/" +
                loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
                "-t.png",
        });
    }
}
