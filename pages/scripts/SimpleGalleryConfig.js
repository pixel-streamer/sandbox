
class SimpleGalleryConfig extends Object {
    constructor() {
        super();
        this._ticker = null;
        this._firstRun = false;
        this._mainStage = null;
        this._preLoader = null;
        this._preLoaderDisplay = null;
        this._baseURLPortion = "";
        this._canvasEl = null;
        this._captionFontColor = "black";
        this._captionFontFamily = "sans serif";
        this._captionFontSize = 0;
        this._captionText = "";
        this._collectionNames = null;
        this._effectName = "";
        this._fullH = 0;
        this._fullW = 0;
        this._galleryCanResize = false;
        this._galleryFontColor = "black";
        this._galleryFontFamily = "sans serif";
        this._galleryFontSize = 0;
        this._hasCaptionsEnabled = false;
        this._hasGalleryText = false;
        this._isUsingGridLayout = false;
        this._originalImg = null;
        this._originalImgSrc = "";
        this._originalThumb = null;
        this._originalThumbSrc = "";
        this._thumbH = 0;
        this._thumbURLPortion = "";
        this._thumbW = 0;
        this._baseText10px = 0; //baseTextTo10Px simpleGalleryConfig.
        this._baseText16px = 0; //baseTextTo16px
        this._baseText10Percent = 0; //baseTextTo10PxTo10Percent
    }
}
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseURLPortion", {
    get: function () {
        //_baseURLPortion = "";
        return _baseURLPortion;
    },
    set: function (param) {
        _baseURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_canvasEl", {
    get: function () {
        // _canvasEl = null; //no dom ready
        return _canvasEl;
    },
    set: function (param) {
        _canvasEl = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontColor", {
    get: function () {
        //_captionFontColor = "#450067";
        return _captionFontColor;
    },
    set: function (param) {
        _captionFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontFamily", {
    get: function () {
        //_captionFontFamily = "Arial";
        return _captionFontFamily;
    },
    set: function (param) {
        _captionFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontSize", {
    get: function () {
        //_captionFontSize = 16;
        return _captionFontSize;
    },
    set: function (param) {
        _captionFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionText", {
    get: function () {
        //_captionText = "_captionText";
        return _captionText;
    },
    set: function (param) {
        _captionText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_collectionNames", {
    get: function () {
        //_collectionNames = "";
        return _collectionNames;
    },
    set: function (param) {
        _collectionNames = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_effectName", {
    get: function () {
        //_effectName = "";
        return _effectName;
    },
    set: function (param) {
        _effectName = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullH", {
    get: function () {
        //_fullH = 150;
        return _fullH;
    },
    set: function (param) {
        _fullH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullW", {
    get: function () {
        //_fullW = 150;
        return _fullW;
    },
    set: function (param) {
        _fullW = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryCanResize", {
    get: function () {
        //_galleryCanResize = false;
        return _galleryCanResize;
    },
    set: function (param) {
        _galleryCanResize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontColor", {
    get: function () {
        //_galleryFontColor = "#450067";
        return _galleryFontColor;
    },
    set: function (param) {
        _galleryFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontFamily", {
    get: function () {
        //_galleryFontFamily = "Arial";
        return _galleryFontFamily;
    },
    set: function (param) {
        _galleryFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontSize", {
    get: function () {
        // _galleryFontSize = 16;
        return _galleryFontSize;
    },
    set: function (param) {
        _galleryFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasCaptionsEnabled", {
    get: function () {
        //_hasCaptionsEnabled = false;
        return _hasCaptionsEnabled;
    },
    set: function (param) {
        _hasCaptionsEnabled = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasGalleryText", {
    get: function () {
        //_hasGalleryText = false;
        return _hasGalleryText;
    },
    set: function (param) {
        _hasGalleryText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_isUsingGridLayout", {
    get: function () {
        //_isUsingGridLayout = false;
        return _isUsingGridLayout;
    },
    set: function (param) {
        _isUsingGridLayout = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImg", {
    get: function () {
        // _originalImg = null;
        return _originalImg;
    },
    set: function (param) {
        _originalImg = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImgSrc", {
    get: function () {
        //_originalImgSrc = "";
        return _originalImgSrc;
    },
    set: function (param) {
        _originalImgSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumb", {
    get: function () {
        //_originalThumb = null;
        return _originalThumb;
    },
    set: function (param) {
        _originalThumb = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumbSrc", {
    get: function () {
        //_originalThumbSrc = "";
        return _originalThumbSrc;
    },
    set: function (param) {
        _originalThumbSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbH", {
    get: function () {
        //_thumbH = 150;
        return _thumbH;
    },
    set: function (param) {
        _thumbH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbURLPortion", {
    get: function () {
        // _thumbURLPortion = "";
        return _thumbURLPortion;
    },
    set: function (param) {
        _thumbURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbW", {
    get: function () {
        //_thumbW = 150;
        return _thumbW;
    },
    set: function (param) {
        _thumbW = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_mainStage", {
    get: function () {
        return _mainStage;
    },
    set: function (param) {
        _mainStage = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_isResizing", {
    get: function () {
        return _isResizing;
    },
    set: function (param) {
        _isResizing = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_preLoader", {
    get: function () {
        return _preLoader;
    },
    set: function (param) {
        _preLoader = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_preLoaderDisplay", {
    get: function () {
        return _preLoaderDisplay;
    },
    set: function (param) {
        _preLoaderDisplay = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText10px", {
    get: function () {
        return _baseText10px;
    },
    set: function (param) {
        _baseText10px = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText16px", {
    get: function () {
        return _baseText16px;
    },
    set: function (param) {
        _baseText16px = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText10Percent", {
    get: function () {
        return _baseText10Percent;
    },
    set: function (param) {
        _baseText10Percent = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_firstRun", {
    get: function () {
        return _firstRun;
    },
    set: function (param) {
        _firstRun = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_ticker", {
    get: function () {
        return _ticker;
    },
    set: function (param) {
        _ticker = param;
    },
    configurable: true,
});