class SimpleGallery {
    constructor(gallery_config_obj) {
        this._frag = document.createDocumentFragment();
        // this._galleryCanvas =
        //     gallery_config_obj._canvasEl || document.createElement("canvas");
        this._galleryContext; // this._galleryCanvas.getContext("2d");
        //holds all the configuration data for later reference through the
        this._config_obj = gallery_config_obj;
        this._clickableSlideArr = [];
        this.pageName = "";
        this.pageURL = "";
        this._isAppended = false;
        this.width = 0;
        //stores gallery_config_obj._queryObj._collectionNames given by makeQueryObj.
        this._queryObj = {};
        this.makeQueryObj();
    }
    init() {
        this._config_obj._collectionNames = this._queryObj.collections;
        /* console.log(
            "██:SimpleSlide gallery_config_obj._collectionNames —",
            this._config_obj._collectionNames
        ); */
    }
    makeQueryObj() {
        var searchString = new URLSearchParams(this.pageURL.search);
        var val_pairs = searchString.entries();
        var finalObj = {};
        for (let vals of val_pairs) {
            if (vals[1].toLowerCase() === "true") {
                finalObj[vals[0].toString()] = true;
            } else if (vals[1].toLowerCase() === "false") {
                finalObj[vals[0].toString()] = false;
            } else {
                //TODO: should I handle values that are numerals? Floating numbers too?
                if (vals[0].toString().toLowerCase() === "collections") {
                    var tempArr = vals[1].toString().split(",").slice();
                    finalObj[vals[0].toString()] = tempArr.forEach(function (
                        el,
                        index
                    ) {
                        tempArr[index] = "#" + el;
                        //console.log("tempArr[index]: ", tempArr[index]);
                    });
                    finalObj[vals[0].toString()] = tempArr.join(",");
                } else {
                    finalObj[vals[0].toString()] = vals[1].toString();
                }
            }
        }
        finalObj.originalArr = Array.from(searchString);
        this._queryObj = finalObj;
        return this._queryObj;
    }
    addToDom(locEl) {
        console.log(":::: addToDom ::::");
        if (!locEl) {
            try {
                document.body.appendChild(this._frag);
                this._isAppended = true;
            } catch (error) {
                console.log(
                    "I'm not sure what happened, but" +
                        "SimpleGallery can't be appended there. \n [" +
                        error.message +
                        "]"
                );
            }
        } else {
            if (this._isAppended === false) {
                locEl.appendChild(this._frag);
            }
        }
    }
}
Object.defineProperty(SimpleGallery.prototype, "pageURL", {
    get: function () {
        //return pageURL;
        return pageURL || new URL(window.location.href);
    },
    set: function (param) {
        pageURL = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGallery.prototype, "pageName", {
    get: function () {
        var tempURI = this.pageURL.pathname.toString();
        tempURI = tempURI.substring(
            tempURI.lastIndexOf("/") + 1,
            tempURI.length
        );
        pageName = tempURI;
        return pageName;
    },
    set: function (param) {
        pageName = param;
    },
    configurable: true,
});