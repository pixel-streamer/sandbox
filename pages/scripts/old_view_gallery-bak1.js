 
		//tasks:
		//preloader
		//quick animation built with css, or js?
		//css: everyone can see it			con:it's got to be really flat
		//script: take long to load?		con:discovery time

		//load content
		//create iframe, src= gallery_non_js.htm
		//raise event when content fully loaded
		//add anchors to memory, array  Page Guts obj?
		//remove loading iframe

		//determine device dimensions with group of dom elements corresponding to display size
		//based off the visible element (media query) load in appropriate imagery

		//if tiny, small, medium, large elements are browsed for visibility... targeted breakpoint elements will be visible.
		//use to determine asset to load


		// phone, tablet, laptop, desktop would be the sizes
		//width: 320, 768, 1024, >1280
		//		360x640		768x1024	1024x768	1280x800



		//build gui
		//setup display area
		//setup buttons for interaction
		//paginate necessary arrays

		//perform layout:
		//layout thumbnail items
		//grid the thumbnails 

		//initialize objects in memory for the following:
		//display area fullsize image (with possible interaction in mind for later)
		//pagination handling
		//interaction buttons req.

		//grab "all array"
		//split all by slice mod increment

		//thumbnail handling
		//interaction buttons req. (thumbnails)

		//THUMBNAIL INTERACTION:
		// onclick
		//display large url in display area.
		//set border on thumbnail

		var t = null;
		var anImg = null;
		var tryCount = 0;

		var loadedImgs = null;
		var thumbnailCanvases = null;
		var canvasCount = 0;

		var pgReady = null;

		var firstRun = true;
		/*
		EVENTS:
		*/
		/* 
		function pageReady(evt){
			console.log(evt.detail);
			var tgt=evt.target;
			tgt.click();
			//ran once
			//evt.target.querySelectorAll(".click_thumb").item(0);
			//console.log(document.querySelector(".click_thumb"));
			//;
		}
		
		//Listen for the event
		window.addEventListener("pageReady", pageReady, false);
		
		//Dispatch an event
		var evt = document.createEvent("CustomEvent");
		evt.initCustomEvent("pageReady", true, true, {detail:"message 1"});
		
		function doSomething(e) {
			var targ;
			if (!e) var e = window.event;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			if (targ.nodeType == 3) // defeat Safari bug
				targ = targ.parentNode;
				
			return targ;
		}
		 */
		/*
		END EVENTS
		*/
		/* 
		var timer=0;
		function fade(){
		   var _self=this;
		   var opacity=0;
		   var ctx=_self.getContext("2d");
			if (timer < 10){
				timer++;
		   ctx.globalAlpha = opacity+.03;
		   console.log("_self.style.opacity: ",opacity );
				requestAnimationFrame(
			   fade.bind(_self)
				   );
			}
		   //if (opacity <= 1){
		   //	//var opaque=parseInt( );
		   //	 
		   //	opacity+=.03;
		   //  
		   //	 
		   // 	requestAnimationFrame(
		   //	 fade.bind(_self)
		   // 	);
		   //	 		
		   //}
		   //else{
		   //	opacity=1;
		   //}	 
		} */

		function getImage() {
			clearTimeout(t);
			try {
				//anImg=document.querySelector("#hiddenimg img");
				anImg = this;
				//console.log('getImage: ',anImg);
				var img = anImg.imgDom;
				img.onload = function () {
					if (img.complete && ((img.width > 0) || (img.naturalWidth > 0))) {
						renderImage.call(img);
						reportSuccess.call(img);
						return img;
					}
				}
				img.onerror = function () {
					reportError.call(img);
				}
				img.src = anImg.img_src;
			}
			catch (e) {

			}
			finally {
				tryCount += 1;
				//console.log("finally!");
				if (anImg !== (undefined || null)) {
					clearTimeout(t);
					//console.log("success");
				}
				else if (tryCount > 5) {
					//console.log("tryCount is too high. Stop: ",tryCount);
					clearTimeout(t);
					var img = { src: "unverified image source" };
					reportError.call(img);
				}
				else {
					//console.log("tryCount: ",tryCount);
					//console.log("not yet-- trying again: ");
					clearTimeout(t);
					t = setTimeout(getImage, 125);
				}
			}
		}

		function transitionImage() {
			console.log("transitionImage");
			console.log("copy buffer into blank canvas");
			console.log("fades in new full size image");
		}

		function renderImage() {
			var img = this;
			//document.body.appendChild(img);
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", "128");
			canvas.setAttribute("height", "128");
			canvas.setAttribute("name", img.src);
			canvas.setAttribute("class", "click_thumb");
			var ctx = canvas.getContext("2d");

			//add it to where?
			var thumbHolder =
				document.querySelector(".thumbnail_area .content");
			thumbHolder.appendChild(canvas);

			//draw the loaded image into the canvas
			var thumbDims = resizeImgDims.call(img, 128, 128, true);

			//add a thumbnail to the list of loadedImgs global array.
			//loadedImgs refreshes with pageload.
			loadedImgs.push(img); //renderImage
			thumbnailCanvases.push(canvas);

			ctx.drawImage(
				img
				, (canvas.width - thumbDims[0]) / 2
				, (canvas.height - thumbDims[1]) / 2
				, thumbDims[0]
				, thumbDims[1]
			);

			ctx.restore();

			var fullSizeDisplayCanvas = document.querySelector(".display_area canvas");

			canvas.onclick = function () {
				//console.log(canvas);
				var fsDims = resizeImgDims.call(
					img
					, fullSizeDisplayCanvas.width
					, fullSizeDisplayCanvas.height
					, false
				);
				fsCtx = fullSizeDisplayCanvas.getContext("2d");
				fsCtx.clearRect(0, 0, fullSizeDisplayCanvas.width, fullSizeDisplayCanvas.height);
				fsCtx.drawImage(
					img
					, (fullSizeDisplayCanvas.width - fsDims[0]) / 2
					, (fullSizeDisplayCanvas.height - fsDims[1]) / 2
					, fsDims[0]
					, fsDims[1]
				);
				//fullSizeDisplayCanvas.style.opacity=0;
				//fsCtx.globalAlpha=0;
				//transitionImage();
				//requestAnimationFrame(fade.bind(fullSizeDisplayCanvas));

				var len = thumbnailCanvases.length;
				for (var i = 0; i < len; i++) {
					var contx = thumbnailCanvases[i].getContext("2d");
					if (thumbnailCanvases[i] !== canvas) {
						//console.log(contx);
						contx.clearRect(0, 0, canvas.width, canvas.height);
						var tDims = resizeImgDims.call(loadedImgs[i], 128, 128, true);
						contx.drawImage(
							loadedImgs[i]
							, (canvas.width - tDims[0]) / 2
							, (canvas.height - tDims[1]) / 2
							, tDims[0]
							, tDims[1]
						);
					}
					else {
						contx.clearRect(0, 0, canvas.width, canvas.height);
						var tDims = resizeImgDims.call(loadedImgs[i], 128, 128, true);
						contx.drawImage(
							loadedImgs[i]
							, (canvas.width - tDims[0]) / 2
							, (canvas.height - tDims[1]) / 2
							, tDims[0]
							, tDims[1]
						);
						strokeThis.call(canvas, "rgba(69, 0, 103,1)", 5);
					}
				}
			}
			if (firstRun === true) {
				firstRun = false;
				thumbnailCanvases[0].click();
			}
			return loadedImgs;
		}

		function reportError() {
			//console.log("reportError: ", this.src +" "+"didn't load");
		}
		function reportSuccess() {
			//console.log("reportSuccess: ", this.src +" "+"loaded Successfully");
		}

		function updateCount(direction, num) {
			//console.log("direction: ",direction);
			//get total page count from gallery.
			var high = this.getPageCount();
			//console.log("updateCount this: ",this);
			//assume low=0;
			var low = 0;
			var currentCount = this.getCurrentPage();
			if (direction === "down") {
				if (currentCount - 1 >= low) {
					currentCount--;
				}
				else {
					//keep the count from becoming greater than the array
					currentCount = high - 1;
				}
			}
			else if (direction === null) {
				currentCount = num;
			}
			else {
				if (currentCount + 1 < high) {
					currentCount++;
				}
				else {
					currentCount = 0;
				}
			}
			this.setCurrentPage(currentCount);
			//console.log("currentCount: ",currentCount);
			//console.log("this.getCurrentPage(): ",this.getCurrentPage());
		}

		function removeChildren(withinEl) {
			while (withinEl.hasChildNodes()) {
				withinEl.removeChild(withinEl.childNodes[0]);
			}
		}

		function removeElement(ELname) {
			//removes a SINGLE element from the dom
			//	console.log("typeof ELname",typeof ELname);
			this.onload = null;
			var tempParent;
			if (typeof ELname === "string") {
				var temp = document.getElementById(ELname);
				tempParent = temp.parentNode;
				tempParent.removeChild(temp);
			}
			else {
				tempParent = ELname.parentNode;
				tempParent.removeChild(ELname);
			}
		}
		function setupGUI(gallery) {
			var lastPage = document.querySelector('.thumbnail_area .thumb_nav_arrow.left');
			var nextPage = document.querySelector('.thumbnail_area .thumb_nav_arrow.right');
			var thumbArea = document.querySelector('.thumbnail_area .content');

			var domControls = {};
			domControls.left = { direction: "down", domEl: lastPage, callback: previous };
			domControls.right = { direction: "up", domEl: nextPage, callback: next };
			domControls.thumbArea = { domEl: thumbArea };
			function previous() {
				removeChildren(domControls.thumbArea.domEl);
				gallery.populatePage(updateCount.call(gallery, domControls.left.direction));
			}
			function next() {
				removeChildren(domControls.thumbArea.domEl);
				gallery.populatePage(updateCount.call(gallery, domControls.right.direction));
			}
			gallery.setDomControls(
				domControls
			);
		}

		function getCollections() {
			this._canvasCollection = {};
			var cgC = this._canvasCollection;
			var categories = document.querySelectorAll(".category");
			for (var i = 0, len = categories.length; i < len; i++) {
				var cat = {};
				cat["name"] = categories.item(i).id.trim();
				cat["base"] = categories.item(i).querySelector(".base").textContent.trim();
				cat["images"] = [];
				cgC["category_" + i] = cat;
				var catImgs = categories.item(i).querySelectorAll("a");

				if (catImgs.length > 0) {
					for (var j = 0, lenj = catImgs.length; j < lenj; j++) {
						var tempAnchor = catImgs.item(j).href;
						tempAnchor = tempAnchor.substring(tempAnchor.lastIndexOf("/") + 1, tempAnchor.length - tempAnchor.lastIndexOf(window.location.href));
						cgC["category_" + i]["images"].push(
							cgC["category_" + i]["base"] + tempAnchor);
					}
				}
			}
			return cgC;
		}

		function getImages() {
			//console.log("determine offsetWidth and offsetHeight properties. Most of the time these are the same as width and height of getBoundingClientRect(), or clientWidth and clientHeight properties");
			//	looking to remove the need for globals like these two arrays
			//	loadedImgs=[];
			//	thumbnailCanvases=[];

			var cG = new CanvasGallery();
			//var collection =document.querySelectorAll("img.displayimg");

			//	var collection = document.querySelectorAll("#hiddenimg a");
			var collection = getCollections.call(cG);
			console.log(collection);

			//populate page based on categories, now it's all stuffed into the collections array:


			var len = collection["category_2"]["images"].length;

			cG.setCurrentPage(0);
			setupGUI(cG);

			var tempArr = [];
			for (var i = 0; i < len; i++) {
				var img = new Image();
				//var imgObj = { imgDom: img, img_src: collection.item(i).href };
				var imgObj = { imgDom: img, img_src: collection["category_2"]["images"][i] };
				//tempArr.push(collection.item(i));
				tempArr.push(imgObj);
			}
			// pages are divided up based on the amt of area in the thumbnail area
			cG.setPages(paginateMe.call(tempArr.slice(), 5));
			cG.setImageDomArray(tempArr);
			cG.setImageCount(len);
			cG.setImageCollection(collection);
			cG.setCanvasCount(cG.getImageCollection().length);
			canvasCount = len;
			cG.populatePage(cG.getCurrentPage());

		}

		function strokeThis(strokeColor, lineWidth) {
			//called or bound with canvas of thing to stroke, width as param
			//context doesn't need to be saved in the context of the small page buttons
			var ctx = this.getContext("2d");
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeColor;
			ctx.strokeRect(0, 0, this.width, this.height);
		}

		//utility function for scaling scoped asset
		function resizeImgDims(contW, contH, fillSpace) {
			//returns an array containing a new width and height
			//@fillSpace  boolen-- zoom to fill space 
			//var ThumbAspect=thumbW/thumbH;
			var containerAspect = contW / contH;
			var fullW = this.width;
			var fullH = this.height;
			var aspect = fullW / fullH;
			var fullMax = Math.max(fullW, fullH);
			var fullMin = Math.min(fullW, fullH);
			var contnMax = Math.max(contW, contH);
			var contnMin = Math.min(contW, contH);

			var newW = fullW;
			var newH = fullH;

			if ((aspect < 1) || (aspect === 1)) {
				// use contnMin/fullMax
				newW = fullW * (contnMin / fullMax);
				newH = fullH * (contnMin / fullMax);
			}
			else if (aspect > 1) {
				// use contnMax/fullMax unless the container ratio is larger!
				var greater = Math.max(aspect, containerAspect);
				if (greater === aspect) {
					newW = fullW * (contnMax / fullMax);
					newH = fullH * (contnMax / fullMax);
				}
				else {
					//greater containerAspect
					newW = fullW * (contnMin / fullMin);
					newH = fullH * (contnMin / fullMin);
				}
			}

			if (fillSpace !== undefined) {

				if ((fillSpace !== false) && (fillSpace !== "false")) {
					return [Math.floor(newW), Math.floor(newH)];
				}
				else {
					if ((newW > fullW) || (newH > fullH)) {
						//console.log("true width is smaller than display");
						return [Math.floor(fullW), Math.floor(fullH)];
					}
					else {
						//console.log("true width is LARGER than display");
						return [Math.floor(newW), Math.floor(newH)];
					}
				}
			}
			else {
				//some calls to this function haven't implemented the fullsize feature
				return [Math.floor(newW), Math.floor(newH)];
			}
		}

		function paginateMe(divisions) {
			//uses a passed-in array and returns a 2d one, divided as spec'd in divisions.
			/* var arr=[];
			for (var i=0; i<57; i++){
				arr[i]=i;
			}
			console.log(paginateMe.call(arr,3)); */
			var tempArr = this.slice();
			var pagesArr = [];
			var tempCuts = Math.floor((tempArr.length) / divisions);

			for (var i = 0; i < tempCuts; i++) {
				//TODO- needs study to eliminate dealing with remainder
				var page = tempArr.splice(i % tempCuts, divisions - 1);
				page.push(tempArr[i]);
				pagesArr.push(page);
				//handle remainder if last cut
				if (i === tempCuts - 1) {
					var remainder = tempArr.splice(i + 1, divisions);
					if (remainder.length > 0) {
						pagesArr.push(remainder.slice());
					}// don't do anything if the remainder is 0
				}
			}
			delete tempArr;
			return pagesArr;
		}

		var CanvasGallery = function () {
			this._domControls = undefined;
			this._canvasCount = undefined;
			this._totImgCount = undefined;
			this._currentPage = undefined;
			this._pageCount = undefined;
			this._paginatedArray = undefined;
			this._imgCollection = undefined;
			this._imgDoms = undefined;
			this._canvasCollection = undefined;
		};

		CanvasGallery.prototype.getDomControls = function () {
			return this._domControls;
		}
		CanvasGallery.prototype.setDomControls = function (domControls) {
			//sugar for control access
			//domControls= {left:{domEl:something, callback:func},right:{domEl:something, callback:func} }
			this._domControls = {};
			this._domControls.left = domControls.left.domEl;
			this._domControls.right = domControls.right.domEl;

			this._domControls.left.behavior = domControls.left.callback;
			this._domControls.right.behavior = domControls.right.callback;

			this._domControls.left.onclick = this._domControls.left.behavior;
			this._domControls.right.onclick = this._domControls.right.behavior;

			this._domControls.thumbArea = domControls.thumbArea.domEl;
			return this._domControls;
		}

		CanvasGallery.prototype.setImageDomArray = function (p) {
			this._imgDoms = p;
		}
		CanvasGallery.prototype.setImageCollection = function (p) {
			this._imgCollection = p;
		}
		CanvasGallery.prototype.setCurrentPage = function (p) {
			this._currentPage = p;
		}
		CanvasGallery.prototype.setPageCount = function (p) {
			this._pageCount = p;
		}
		CanvasGallery.prototype.buildPageControls = function () {
			//buildPageControls
			var thumbArea = this._domControls.thumbArea;
			var _self = this;
			var group_holder = document.createElement("div");
			thumbArea.appendChild(group_holder);
			group_holder.setAttribute("class", "page_group");
			var len = this._pageCount;

			var currentPage = this.getCurrentPage();
			for (var i = 0; i < len; i++) {
				var pgNum = document.createElement("canvas");
				pgNum.setAttribute("width", "32");
				pgNum.setAttribute("height", "32"); /* */
				group_holder.appendChild(pgNum);

				var ctx = pgNum.getContext("2d");
				ctx.font = "1em Arial";
				ctx.fillStyle = "#000000";
				if (i < 9) {
					ctx.fillText(i + 1, 12, 21);
				}
				else {
					ctx.fillText(i + 1, 7, 21);
				}
				if (currentPage == i) {
					strokeThis.call(pgNum, "#450067", 5);
				}
				//creates a closure for the page population so scoping the increment works
				function popPage(num) {
					removeChildren(thumbArea);
					_self.setCurrentPage(num);
					//console.log("inc: ",num);
					//console.log("this._currentPage: ",_self.getCurrentPage());
					updateCount.call(_self, null, _self.getCurrentPage());
					_self.populatePage(_self.getCurrentPage());
				}
				//binds the i to the scope
				pgNum.onclick = popPage.bind(_self, i);
			}
		}
		CanvasGallery.prototype.setPages = function (p) {
			this._paginatedArray = p;
			this._pageCount = this._paginatedArray.length;
		}
		CanvasGallery.prototype.setImageCount = function (p) {
			this._totImgCount = p;
		}
		CanvasGallery.prototype.setCanvasCount = function (p) {
			this._canvasCount = p;
		}
		CanvasGallery.prototype.getCurrentPage = function () {
			return this._currentPage;
		}
		CanvasGallery.prototype.getImageDomArray = function () {
			return this._imgDoms;
		}
		CanvasGallery.prototype.getImageCollection = function () {
			return this._imgCollection;
		}
		CanvasGallery.prototype.getPageCount = function () {
			return this._pageCount;
		}
		CanvasGallery.prototype.getPages = function () {
			return this._paginatedArray;
		}
		CanvasGallery.prototype.getImageCount = function () {
			return this._totImgCount;
		}
		CanvasGallery.prototype.getCanvasCount = function () {
			return this._canvasCount;
		}
		CanvasGallery.prototype.populatePage = function () {
			//@whichPage :number
			//assumes that the setPages has ran, and is populated with a page
			var getThePage = this.getPages()[this.getCurrentPage()];
			//console.log("getThePage:  ",getThePage);
			//console.log("this.getPages():  ",this.getPages());
			//console.log("populatePage.whichPage:  ",this.getCurrentPage());
			var len = getThePage.length;
			//clear page images:
			loadedImgs = [];
			thumbnailCanvases = [];
			for (var i = 0; i < len; i++) {
				getImage.call(getThePage[i]);
				//set up the user interaction in the renderImage method

			}
			//console.log("thumbnailCanvases:  ",thumbnailCanvases);
			this.buildPageControls();

		}
		CanvasGallery.prototype = Object.create(CanvasGallery.prototype);
		CanvasGallery.prototype.constructor = CanvasGallery;

		isIE = false;
		window.addEventListener("load", init);

		function init() {
			if (window.event !== undefined) {
				isIE = true;
			}
			getImages();
		} 