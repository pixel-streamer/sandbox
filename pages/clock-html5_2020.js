(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.display2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.verdict_txt = new cjs.Text("sdvsd", "33px 'Changa One'", "#990000");
	this.verdict_txt.name = "verdict_txt";
	this.verdict_txt.textAlign = "center";
	this.verdict_txt.lineHeight = 37;
	this.verdict_txt.lineWidth = 354;
	this.verdict_txt.parent = this;
	this.verdict_txt.setTransform(178.95,2);

	this.timeline.addTween(cjs.Tween.get(this.verdict_txt).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.display2, new cjs.Rectangle(0,0,358,50.1), null);


(lib.display1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.place = new cjs.Text("sdvsd", "normal 600 33px 'Zilla Slab'", "#009933");
	this.place.name = "place";
	this.place.textAlign = "center";
	this.place.lineHeight = 39;
	this.place.lineWidth = 355;
	this.place.parent = this;
	this.place.setTransform(179.45,2);
	if(!lib.properties.webfonts['Zilla Slab']) {
		lib.webFontTxtInst['Zilla Slab'] = lib.webFontTxtInst['Zilla Slab'] || [];
		lib.webFontTxtInst['Zilla Slab'].push(this.place);
	}

	this.timeline.addTween(cjs.Tween.get(this.place).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.display1, new cjs.Rectangle(0,0,359,41.4), null);


(lib.tester = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"spiral-start":0,"spiral-middle":2,"spiral-middle":6,"spiral-middle":9,"spiral-middle":11,"spiral-middle":12,"spiral-middle-insert":14,"spiral-middle":15,"spiral-middle":16,"spiral-middle":17,"spiral-middle":18,"spiral-middle":19,"spiral-middle":20,"spiral-middle":21,"spiral-middle":22,"spiral-end":23};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#009933").s().p("AAEA6IgMgDQgGgDgEgGIgMgWIgGgPQgIgVACgKQACgLANgMQAGgFAHgDIALgFQAPAOAOAUQAGAJABAGQgBAJACADIAFAHQADAFABACQABAFgDAGIgHALIgEANQgFAHgMAAIgJgBg");
	this.shape.setTransform(0.4535,-1.0875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009933").s().p("AhBAYQgCgFADgFIAHgJIAHgHQADgEAFgLQAFgJAJgEQAqAAAVADIASAEQAKAEADAGQACAFgCAEQgBAEgEABQgPgFgNgIQgdgBgTADQgJACgDACQgHAEgHAPQgHAPgKADQgFgBgCgGg");
	this.shape_1.setTransform(0.9431,-3.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#009933").s().p("AgxBBQAAgGAIgDIAlgQQgCgHAGgIIAMgMQACgDAEgKIADgHIgKAAIAJgMIgDgHQgDgIAEgIQAJgBAGAIQAFgHAAgEQABgEgCgJQAAgEACgDQACgDADAAQAKARgJAXIgFAKQABAIgCAKQgDALgLAQIgMAQQgGAMgCACQgEAFgHAEQgNAFgKAAQgLAAgJgFg");
	this.shape_2.setTransform(1.705,4.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#009933").s().p("AAkBCIgQgMQgGgCgNAAQgLgBgSgRQgMgMgDgGIgDgOIgGgPQgGgSAFgnQAHgBAEAHQADAFAAAHIgBAOQgBAHACAFQAGAIABAEQACAFAAAKQACAGAJAKQAPAPAIADIAOACQAZAFANAUIgCAHQgDACgDAAQgGAAgGgFg");
	this.shape_3.setTransform(-8.1386,4.5743);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#009933").s().p("AhZA2QgFgEgBgPQgCgfAGgNQACgGAFgHQAMgOARgJQAWgLAfABQATABAkAIQAWAGAHADQAKAEADAFQACAEgBAEQgBAFgEABQgWgLgTgFQgWgHgZAAQgrAAgXAVQgNANgEARQgEATAJAPQABAFgFACIgEABQgDAAgDgCg");
	this.shape_4.setTransform(-6.1357,-11.0316);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#009933").s().p("AgQBUIgDgHQATgNAHgYQAEgNAAgLQAAgGgDgLIgFgOQgFgTACgjIgYgIQgCgDAEgCQACgCAFgBQAUgEAIAKQADAFAAAIIgCANQgBALAEARIAHAbQAHAmgUAgQgFAJgGAEQgEACgEAAQgFAAgDgDg");
	this.shape_5.setTransform(6.27,-1.9175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#009933").s().p("AgnCPQgCgDAAgEIgLgGQgcgQgSgDQAFgHAMgBQAKgCAKAFQAHADAKAHIAIAFIAEgEIAMgIIANgHQAJgIAJgNQAGgJAIgRIAag3QARghAHgWQAHgVgEgNQgEgOgXgSQgIgFgCgGQgEgJAHgEIAMADQACAFAGAGIALAJQAPALAGAUQAEALgBAMQgBAJgIASIgjBPIgTAmQgMAVgOAMIgMALQgIAGgEAFIgKAMIgBAAIAAABIgBAAQgDACgEAAQgDAAgDgDg");
	this.shape_6.setTransform(-0.4295,13.1482);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#009933").s().p("AgdBiIgKgRQgJgOgDgHQgHgQAFgUQADgNAKgWIANgfQAJgRAGgEIAMgHQAGgEADgEIAIgNQAFgGAMgDQAQgDAEgCQADAEgCAGQgBAGgFADIgKAFIgJAHQgFAEgGALQgDADgIAEIgKAGQgHAGgGAOIgUAvQgIAUAGAKIAHAIIAHAHIACAHQACAEACACIAIAGQAFADABAEQACAEgEAFQgDAEgFABIgBAAQgIAAgHgIg");
	this.shape_7.setTransform(-10.1807,9.1264);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#009933").s().p("ABqCjQACg8gDggQgEgzgTgjQgohRh0gqIgZgKQgOgHgIgJQBiATBKBDQAeAbAPAZQATAiAGAxQACAggCA6QAAAHgFAGQgDAFgDAAIgEgCg");
	this.shape_8.setTransform(10.6,15.2113);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#009933").s().p("Ah/EWQgFgDAAgFQALgGAVgFQAXgFAKgFQAMgEAVgQQAegVAOgNQAYgUAOgVQALgPANgeIAVgsQABgFAGgCQAGgBADAFQgMAmgVAlQgTAkgWAWQgKAMgdAZQgXATgMAHQgkAWgpAAQgGAAgFgCgAB1AwQACg7gDggQgEgzgTglQgphQhzgrIgZgKQgOgGgIgJQBiASBKBDQAeAcAPAZQATAiAFAyQADAfgDA5QAAAIgEAGQgDAEgDAAIgEgBg");
	this.shape_9.setTransform(9.5229,26.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#009933").s().p("AA1EWQgFgDAAgFQALgGAVgFQAXgFAKgFQAMgEAVgQQAegVAPgNQAYgUAOgVQALgPANgeIAVgsQABgFAGgCQAGgBADAFQgMAmgVAlQgTAkgWAWQgKAMgeAZQgXATgMAHQgkAWgpAAQgGAAgFgCgAg2EVQgSgBgcgNQghgQgMgDIgigIQgTgFgKgLQgFgEgIgOQgIgMgHgFIgNgIQgIgFgEgFQgDgFgBgHIgDgOQgDgIgHgLIgMgSQgSgagEgeQgCgLAEgGQAFgFAIADQAHACAEAGQADAFACAIIADAPQADAMATAdQAQAZAAAQQALAFALANIATAXQANAPAWAKQAOAHAbAJQAdALASAEQAbAFAVgEQAHAEAAAIQAAAIgGAGQgHAGgOAAIgGAAgAEqAwQACg7gDggQgEgzgTglQgphQh0grIgZgKQgOgGgIgJQBiASBLBDQAeAcAPAZQATAiAFAyQADAfgDA5QAAAIgEAGQgDAEgDAAIgEgBg");
	this.shape_10.setTransform(-8.5808,26.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#009933").s().p("AA0GEQgGgCABgFQALgGAVgFQAXgGAJgEQANgFAVgPQAdgVAQgNQAXgUAPgVQAKgPAOgfIAUgrQACgFAGgCQAGgBADAEQgNAngUAkQgUAkgVAXQgKALgeAaQgXATgNAHQgjAWgqAAQgGAAgEgDgAg4GEQgSgCgbgNQgigPgLgDIgigIQgTgGgLgKQgEgEgJgOQgIgMgGgFIgNgIQgJgFgDgFQgDgFgCgIIgDgNQgCgIgHgLIgNgSQgRgagFgfQgCgKAFgGQAEgFAIACQAIACAEAHQADAFABAIIADAOQADANATAdQARAYgBARQALAFALANIATAXQAOAOAWALQAOAHAbAJQAdALASADQAaAGAWgEQAGAEAAAIQAAAIgGAFQgHAHgNAAIgHAAgAEpCfQACg9gDgfQgFgzgSgkQgphQh0grIgagKQgOgGgIgJQBiASBLBDQAeAbAPAaQAUAhAFAyQADAfgDA6QAAAIgEAGQgDAEgEAAIgDgBgAlPBMQgHgegBggQgBgZAFgSQAFgTACgKQABgKgBgXQAAgVACgLQAEgRAOgUQARgXAIgMQARgiANgPQAHgIAOgJIAXgRQAHgFAggfQAXgXATgIQAKgEARgEIAcgGQAJgCAXgJQAVgIAMgDQAOgDAngBIBfgFQA3gCAmALQAWAGAnARIA2AYQgFAHgKACQgJACgJgDQgHgCgXgQQgwgdhKABQgVABgqADQgqAEgVAAQgnABgOAEIgWAJQgOAHgIACIgYAGQgRACgIADQgWAHgZAWIgrAmIgiAaQgSAQgZAoQgdAugFAbQgDAQgBAhIgHAjQgEAVAAAMQgBAVAIAUQAKAZgMAGg");
	this.shape_11.setTransform(-8.4341,15.659);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#009933").s().p("AFnIxQAYgzAPgqQALgeAGgLQAGgKAQgTQAPgSAGgLQAMgYACgkIAAhAQAAgVAEglIAGg7QAEg7gPhIQgJgtgYhVQgLgrgLgcQgJgXgXgtQgag0gVgeQgegrgigZQgUgOgGgFQgNgMgBgOQAsARAoAuQAaAeAkA7QAfA0ALAcQAMAbAPA4IAVBLQANAwAGAZQAIAnACAhQABAggFA4QgGBAAAAYIAAA0QgBAfgGAUQgGAWgUAhQgXAngHAPQgIATgNApQgNAjgVAPgAhmDVQgFgCAAgFQALgGAVgFQAXgGAKgEQAMgFAVgPQAdgVAPgNQAYgUAOgVQALgPANgfIAVgrQABgEAGgCQAGgBADAEQgMAmgVAkQgTAkgWAXQgKALgeAaQgWATgMAHQgkAWgpAAQgGAAgFgDgAjSDVQgSgCgcgNQghgPgMgDIgigIQgTgGgKgKQgFgEgIgOQgIgMgHgFIgNgIQgIgFgEgFQgDgFgBgIIgDgNQgDgIgHgLIgMgSQgSgagEgeQgCgKAEgGQAFgFAIACQAHACAEAHQADAFACAIIADANQADANATAdQAQAYAAARQALAFALANIATAXQANAOAWALQAOAHAbAJQAdALASADQAbAGAVgEQAHAEAAAIQAAAIgGAFQgHAHgOAAIgGAAgACOgPQACg9gDgfQgEgzgTglQgphQhzgrIgZgKQgOgGgIgJQBhASBLBDQAeAbAPAaQATAiAFAyQADAfgDA6QAAAIgEAGQgDAEgDAAIgEgBgAnqhiQgGgegBggQgBgaAEgSQAGgTABgKQACgKgBgXQgBgVADgLQADgRAPgUQARgXAHgMQARgiANgPQAIgIAOgJIAXgRQAGgFAhgfQAXgXATgIQAKgEARgEIAbgGQAKgCAXgJQAVgIAMgDQAOgDAogBIBegFQA2gCAmALQAWAGAoARIA1AYQgFAHgJACQgJACgJgDQgHgCgYgQQgvgdhKABQgUABgqADQgqAEgVAAQgpABgNAEIgWAJQgPAHgHACIgZAGQgQACgIADQgWAHgaAWIgqAmIgjAaQgSAQgZAoQgdAugFAbQgDAQgBAhIgGAjQgEAVgBANQAAAVAHAUQALAZgNAGg");
	this.shape_12.setTransform(7.0082,33.184);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#009933").s().p("AhKJzQhLgDg8gLQh8gXhuhBQgxgegRgeIgGgKQgEgGgDgDIgGgEQgEgDgBgDQgCgFAEgGQAEgFAGAAQALAAAIANIAKAWQAIAQAaATQBsBKCBAaQA+ANBQACQAwABBegDQAigBAWgEQAPgDAhgLQAegLASgDIAcgDIAbgDQAbgFAXgQQAWgQAPgYQAHAGgEALQgDAJgJAIQgiAigYAJQgPAFgcACQgfACgMACQgOAEgWAKQgZALgLADQgYAIgvAAIhNABIg6gBgAGLHzQAYgyAQgrQALgeAGgKQAGgKAPgTQAPgTAGgLQANgXABglIAAg/QABgWAEglIAGg6QADg8gOhIQgJgtgYhUQgMgrgKgcQgJgYgXgtQgbg0gVgeQgdgqgjgZQgUgOgFgGQgNgMgCgNQAtARAnAtQAbAfAjA7QAfA0AMAcQALAaAPA4IAVBMQAOAvAFAZQAJApABAgQACAggFA4QgHA/AAAYIAAA1QAAAegGAVQgHAWgUAhQgXAngGAOQgIAUgNApQgOAjgVAPgAhBCYQgGgDABgFQALgFAVgGQAXgFAJgEQAMgFAVgQQAdgVAQgNQAXgUAPgVQAKgPAOgdIAUgsQACgFAGgBQAGgBADAEQgNAngUAjQgUAkgVAWQgKAMgeAZQgXATgNAIQgiAVgqAAQgGAAgEgCgAiuCXQgSgBgbgNQgigQgLgDIgigIQgTgFgLgKQgEgFgJgOQgIgMgGgFIgNgIQgJgFgDgFQgDgEgCgIIgDgNQgCgJgHgJIgNgSQgRgagFgfQgCgLAFgFQAEgGAIADQAIACAEAGQADAFABAIIADAPQADAMATAdQARAYgBARQALAEALANIATAXQAOAPAWALQAOAGAbAKQAdAKASAEQAaAFAWgDQAGADAAAJQAAAIgGAFQgHAHgNAAIgHgBgACzhNQACg8gDggQgFgzgSgkQgphRhzgqIgagKQgOgHgIgJQBhATBLBDQAeAbAPAZQAUAjAFAxQADAggDA6QAAAHgEAGQgDAFgEAAIgDgCgAnFigQgHgegBgfQgBgaAFgTQAFgTACgKQABgJgBgXQAAgVACgMQAEgQAOgVQARgWAIgMQARgjANgOQAHgIAOgKIAXgQQAHgFAgggQAXgWATgIQAKgFARgDIAcgGQAJgDAXgJQAVgIAMgCQAPgDAngBIBegFQA3gCAmAKQAWAGAnASIA2AYQgFAHgKABQgJACgJgDQgHgCgXgPQgwgdhKABQgVAAgpAEQgqADgVAAQgoABgOAEIgWAJQgOAHgIACIgYAGQgRADgIADQgWAHgZAWIgrAlIgiAaQgSAQgZAoQgdAugFAbQgDAQgBAiIgHAiQgEAVAAANQgBAVAIAUQAKAagMAGg");
	this.shape_13.setTransform(3.359,39.3215);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#009933").s().p("AABLLQhKgDg7gLQh9gXhthBQgxgegSgeIgFgKQgEgGgEgDIgGgEQgDgDgCgDQgCgFAEgGQAFgFAGAAQAKAAAIANIAKAWQAJAQAaATQBsBKCAAaQA/ANBPACQAvABBggDQAigBAVgEQAPgDAhgLQAfgLARgDIAcgDIAcgDQAagFAXgQQAXgQAOgYQAHAGgEALQgDAJgIAIQgjAigYAJQgPAFgbACQggACgMACQgNAEgXAKQgYALgLADQgZAIgvAAIhOABIg6gBgAHYJLQAYgyAPgrQALgeAGgKQAGgKAQgTQAPgTAGgLQAMgXACglIAAg/QAAgWAEglIAGg6QAEg8gPhJQgJgsgYhUQgLgrgLgcQgJgYgXgtQgag0gVgeQgegqgigZQgUgOgGgGQgNgMgBgNQAsARAoAtQAaAfAkA7QAfA0ALAcQAMAaAPA4IAVBMQANAvAGAYQAIApACAhQABAggFA4QgGA/AAAYIAAA1QgBAegGAVQgGAWgUAhQgXAngHAOQgIAUgNApQgNAjgVAPgAoEGyQgFgDgCgIIgihvQgahZgHgjQgRhOgChkQgCg7ADh4QACgsACgWQAEglAJgcQAQgyAqgyQAdgiA3gwQA+g3AvgiQA+gtA5gdQAugXA0gQQCGgrCYARQCRAPCHBBQAKAFAGAIQAGAJgFAHQgHAJgVgKQhrg6h6gTQh6gTh2AWQg8ALg4AWQgpAQgoAWQhQAshcBLQgyAogfAgQgoAqgVAsQgaA4gIBfQgNCPAUCPQAUCPA0CHQAKAbgHANQgDAFgEACIgFABIgEgBgAAKDwQgFgDAAgFQALgFAVgGQAXgFAKgEQAMgFAVgQQAegVAPgNQAYgUAOgVQALgPANgeIAVgsQABgFAGgBQAGgBADAEQgMAngVAkQgTAkgWAWQgKAMgeAZQgXATgMAIQgkAVgpAAQgGAAgFgCgAhhDvQgSgBgcgNQghgQgMgDIgigIQgTgFgKgKQgFgFgIgOQgIgMgHgFIgNgIQgIgFgEgFQgDgEgBgIIgDgNQgDgJgHgKIgMgSQgSgagEgfQgCgKAEgFQAFgGAIADQAHACAEAGQADAEACAIIADAPQADAMATAdQAQAZAAARQALAEALANIATAXQANAPAWALQAOAGAbAKQAdAKASAEQAbAFAVgDQAHADAAAJQAAAIgGAFQgIAHgNAAIgGgBgAD/AKQACg7gDggQgEgzgTgkQgphRh0gqIgZgKQgOgHgIgJQBiATBLBDQAeAbAPAZQATAjAFAxQADAggDA6QAAAGgEAGQgDAFgDAAIgEgCgAl5hIQgGgegBgfQgBgaAEgTQAGgTABgKQACgJgBgXQgBgVADgMQADgQAPgVQARgWAHgMQARgjANgOQAIgIAOgKIAXgQQAGgFAhggQAXgWATgIQAKgFARgDIAbgGQAKgDAXgJQAVgIAMgCQAOgDAngBIBegFQA3gCAmAKQAWAGAoASIA1AYQgFAHgJABQgJACgJgDQgHgCgYgPQgvgdhKABQgVAAgqAEQgqADgUAAQgpABgNAEIgWAJQgPAHgHACIgZAGQgQADgIADQgWAHgaAWIgqAlIgjAaQgSAQgZAoQgdAugFAbQgDAQgBAiIgGAiQgEAVgBANQAAAVAHAUQALAagNAGg");
	this.shape_14.setTransform(-4.2691,30.5068);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#009933").s().p("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");
	this.shape_15.setTransform(14.8954,30.5068);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},4).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.3,-41,160.5,143.1);


// stage content:
(lib.clockhtml5_2020 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {start:1};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.gotoAndStop("start");
	}
	this.frame_1 = function() {
		this.stop();
		
		var ClockData;
		
		var buttonsList = [];
		
		/*
		http://designstacks.net/creating-an-analog-clock-with-actionscript-using-no-design-tools-whatsoever
		*/
		
		function startClock() {
		    /* ClockData.stage.addEventListener("inited", populateGUI);
		    ClockData.stage.addEventListener("started", startTicking); */
		}
		
		function startTicking(e) {
		    console.log("█:::startTicking:::█", e.target);
		}
		
		/* ███  ──── core functions ─── ███ */
		function getDims(tgt) {
		    var dims;
		    try {
		        dims = {
		            _x: tgt.graphics.command.x,
		            _y: tgt.graphics.command.y,
		            width: tgt.graphics.command.w,
		            height: tgt.graphics.command.h
		        };
		    }
		    catch (err) {
		        var temp = tgt.getBounds();
		        if (temp === null) {
		            /*assume the stage is selected*/
		            return dims = {
		                _x: 0,
		                _y: 0,
		                width: tgt.canvas.width,
		                height: tgt.canvas.height
		            };
		        }
		        dims = {
		            _x: temp.x,
		            _y: temp.y,
		            width: temp.width,
		            height: temp.height
		        };
		    }
		    return dims;
		}
		/*████████*/
		
		function createButtonLink(scope, btnInstance, _maxW, _maxH, _sumText, _txtFont, _x, _y, _txtAlign, _tColor, _btnColor, _padding, _btnAlignment, _linkref, _evt, _callBackFunc) {
		    //console.log(":::createButtonLink:::", btnInstance);
		
		    var btn = new createjs.MovieClip();
		    scope.addChild(btn);
		
		    /*
		        btn["btnSkin"] = new createjs.Shape();
		        var btnSkin = btn["btnSkin"];
		        btnSkin.graphics.beginStroke("#00FF00");
		        btnSkin.graphics.setStrokeStyle(3);
		        btnSkin.graphics.beginFill("#FFCC00").drawRoundRectComplex(0, 0, _maxW, _maxH, 3, 3, 3, 3);
		        btn.addChild(btnSkin);	
		    */
		
		    btn[btnInstance] = new createjs.Shape();
		    var thingy = btn[btnInstance];
		    var borderW = 2;
		    var brdrColor = "#FFFFFF";
		    var radiusTL = 3;
		    var radiusTR = 3;
		    var radiusBR = 3;
		    var radiusBL = 3;
		    btn.addChild(thingy);
		
		
		    thingy.graphics.beginStroke(brdrColor);
		    thingy.graphics.setStrokeStyle(borderW);
		    thingy.graphics.beginFill(_btnColor).drawRoundRectComplex(0, 0, _maxW, _maxH, radiusTL, radiusTR, radiusBR, radiusBL);
		
		    var _someText = _sumText;
		    var _color = _tColor;
		    var _font = _txtFont;
		    var _align = _txtAlign;
		    var fl_TF = createTextField(_someText, _maxW, 0, 0, _color, _font, _align);
		    var fl_TFW = fl_TF.getMetrics().width;
		    var fl_TFH = fl_TF.getMetrics().height;
		
		    var btnW = getDims(thingy).width;
		    var btnH = getDims(thingy).height;
		
		    btn.addChild(fl_TF);
		    /* center the text on the button */
		    if (_txtAlign === "center") {
		        fl_TF.x = btnW / 2;
		    }
		    else if (_txtAlign === "left") {
		        fl_TF.x = btnW / 2 - fl_TFW / 2;
		    }
		    fl_TF.y = fl_TFH / 2;
		
		    btn.x = _x - getDims(btn).width / 2;
		    btn.y = _y - getDims(btn).height / 2;
		
		    //console.log(" getDims(btn).width: ", getDims(btn).width);
		    thingy.name = String(btnInstance);
		
		    if (_evt !== "") {
		        btn.addEventListener(_evt, _callBackFunc.bind(btn), false);
		    }
		
		    btn.x = _x;
		    btn.y = _y;
		
		    return btn;
		}
		
		function createTextField(_txt, _maxW, _x, _y, _color, _font, _tAlign) {
		    //_x, and _y are NOT used!
		    /*    getMeasuredWidth  / getMeasuredHeight
		    should return the width in pixels of a string.
		    
		    Docs say getMetrics /getBounds works better? 
		    */
		    var fl_TF = new createjs.Text();
		    fl_TF.text = _txt;
		    fl_TF.color = _color;
		    fl_TF.font = _font;
		    fl_TF.textAlign = _tAlign; /*"left" or "center", IE*/
		    fl_TF.x = _x;
		    fl_TF.y = _y;
		    return fl_TF;
		}
		function createShapeClip(w, h) {
		    var clip = new createjs.Shape();
		    clip.setBounds(0, 0, w, h);
		    //  console.log(":::createShapeClip:::", clip.getBounds());
		    return clip;
		}
		
		function createNewMovieClip(props, w, h) {
		    var propStuff = props || null;
		    if (propStuff == null) {
		        var clip = new createjs.MovieClip();
		        // console.log(":::createNewMovieClip:::", clip.getBounds());
		        return clip;
		    }
		    else {
		        var clip = new createjs.MovieClip(props);
		        clip.setBounds(0, 0, w, h);
		        // console.log(":::createNewMovieClip:::", clip.getBounds());
		        return clip;
		    }
		
		    /*
		    setBounds(x,y,w,h)
		     getBounds()
		     http://blog.createjs.com/update-width-height-in-easeljs/
		    */
		}
		/*
		function changeColor() {
		    //fillCommand.style = "#450067"; 
		    var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
		    shape.filters = [
		        new createjs.ColorMatrixFilter(matrix)
		    ];
		    shape.applyFilter(shape.filters[0]);
		    shape.cache(-50, -50, 100, 100);
		}
		*/
		/*████████████████████████████████████████████████████████████████*/
		createjs.Touch.enable(stage);
		
		
		function createGUI() {
		    console.log("█::: createGUI :::█", "clock is sized based on font size");
		    ClockData = {};
		
		    var clockStg = new createjs.Stage("canvas");
		    clockStg.setBounds(0, 0, document.querySelector("canvas").clientWidth, document.querySelector("canvas").clientHeight);
		    var sBounds = clockStg.getBounds();
		    stage.addChild(clockStg);
		    ClockData.firstRun = true;
		    ClockData.starting = false;
		    ClockData.stageW = sBounds.width;
		    ClockData.stageH = sBounds.height;
		
		    ClockData.stageScalar = clockStg.scaleX;
		    ClockData.stage = clockStg;
		    if (ClockData.stageScalar < 1) {
		        ClockData.stageW = Math.round(ClockData.stageW * 2);
		        ClockData.stageH = Math.round(ClockData.stageH * 2);
		    }
		
		    /*
		        var GUI = new createjs.MovieClip({
		            loop: -1,
		            labels: {
		                start: 0,
		                middle: 20
		            }
		        });
		    */
		    var GUI = createNewMovieClip(
		        {
		            loop: -1,
		            labels: {
		                start: 0,
		            },
		        }
		        ,
		        ClockData.stageW,
		        ClockData.stageH
		    );
		    ClockData.stage.addChild(GUI);
		    ClockData.GUI = GUI;
		
		    /*
		    var clip = createNewMovieClip();
		    var shape = new createjs.Shape();
		
		    shape.graphics.beginFill("#A49D9B").drawRect(0, 0, ClockData.stageW, ClockData.stageH);
		    clip.addChild(shape);
		    GUI.addChild(clip);
		     */
		
		    var _textColor = "#000000";
		    var _align = "center";
		    /* "bump" the angle "ninety" degrees!! (90-57.295779513) */
		    var bump = -(90 - 57);
		    var clockArea = ClockData.stageW / 2;
		    var _fSize = clockArea / 12;
		    var padding = _fSize / 2;
		    var clockCenter = clockArea - (_fSize * 2);
		    var clockRadius = clockCenter / 2;
		    var txtHeightHalf = _fSize / 2;
		    var clockFont = _fSize + "px" + '"Zilla Slab"';
		
		    console.log(" ClockData.stageW ", ClockData.stageW);
		
		    console.log("clockCenter", clockCenter);
		
		    console.log("_fSize", _fSize);
		    console.log("clockRadius", clockRadius);
		
		
		    var clockFace = createNewMovieClip(
		        {
		            loop: -1,
		            labels: {
		                start: 0
		            },
		        },
		        ClockData.stageW,
		        ClockData.stageH
		    );
		
		    var hourNums = createNewMovieClip(
		        {
		            loop: -1,
		            labels: {
		                start: 0
		            },
		        },
		        ClockData.stageW,
		        ClockData.stageH
		    );
		
		    var hourTicksContainer = createNewMovieClip(
		        {
		            loop: -1,
		            labels: {
		                start: 0
		            },
		        },
		        ClockData.stageW,
		        ClockData.stageH
		    );
		
		    var minTicksContainer = createNewMovieClip(
		        {
		            loop: -1,
		            labels: {
		                start: 0
		            },
		        },
		        ClockData.stageW,
		        ClockData.stageH
		    );
		
		    /* minute dashes */
		    var minuteLargeR = clockRadius - (clockRadius * .03);
		    var minSmallerR = clockRadius - (clockRadius * .1);
		    var minuteDivs = 60;// - 12;
		    for (var t = 0; t < minuteDivs; t++) {
		        var minuteAngle = t * 360 / minuteDivs;
		        var radMinuteAngle = minuteAngle * Math.PI / 180;
		        var x1a = (Math.cos((radMinuteAngle) + bump) * minuteLargeR) + 0;
		        var y1a = (Math.sin((radMinuteAngle) + bump) * minuteLargeR) + 0;
		
		        /* smaller radius */
		        var x2a = (Math.cos((radMinuteAngle) + bump) * minSmallerR) + 0;
		        var y2a = (Math.sin((radMinuteAngle) + bump) * minSmallerR) + 0;
		
		        var minTick = createShapeClip(ClockData.stageW, ClockData.stageH);
		        minTick.graphics.moveTo(0, 0);
		        minTick.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
		        minTick.graphics.moveTo(x1a, y1a + txtHeightHalf);
		        minTick.graphics.lineTo(x2a, y2a + txtHeightHalf);
		        minTick.graphics.endStroke();
		        minTicksContainer.addChild(minTick);
		    }
		
		    /* hour dashes */
		    var hourLargeR = clockRadius - (clockRadius * .03);
		    var hourSmallerR = clockRadius - (clockRadius * .2);
		    var hourDivs = 12;
		    for (var h = 0; h < hourDivs; h++) {
		        var hourAngle = h * 360 / hourDivs;
		        var radHourAngle = hourAngle * Math.PI / 180;
		        var x1 = (Math.cos((radHourAngle) + bump) * hourLargeR) + 0;
		        var y1 = (Math.sin((radHourAngle) + bump) * hourLargeR) + 0;
		
		        /* smaller radius */
		        var x2 = (Math.cos((radHourAngle) + bump) * hourSmallerR) + 0;
		        var y2 = (Math.sin((radHourAngle) + bump) * hourSmallerR) + 0;
		
		        var hourTick = createShapeClip(ClockData.stageW, ClockData.stageH);
		        hourTick.graphics.moveTo(0, 0);
		        hourTick.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
		        hourTick.graphics.moveTo(x1, y1 + txtHeightHalf);
		        hourTick.graphics.lineTo(x2, y2 + txtHeightHalf);
		        hourTick.graphics.endStroke();
		        hourTicksContainer.addChild(hourTick);
		    }
		    /*  (originX, originY) is the center of your circle. radius is its radius. That's it. */
		    /*  https://gamedev.stackexchange.com/questions/9607/moving-an-object-in-a-circular-path */
		
		    /* hour text */
		    for (var t = 1; t < 13; t++) {
		        var hourAngle2 = t * 360 / 12;
		        var radHourAngle2 = hourAngle2 * Math.PI / 180;
		        var _someText = t;
		        var numTxtContainer = createNewMovieClip({}, 21, 21);
		        numTxtContainer.addChild(createTextField(_someText, 21, 0, 0, _textColor, clockFont, _align));
		        /* shifted- angle w bump */
		        numTxtContainer.x = (0 + Math.cos(radHourAngle2 + bump) * (clockRadius + _fSize / 2));
		        numTxtContainer.y = (0 + Math.sin(radHourAngle2 + bump) * (clockRadius + _fSize / 2));
		        hourNums.addChild(numTxtContainer);
		    }
		
		    var hands = createNewMovieClip();
		
		    var hourHand = createShapeClip();
		    var hourHandW = _fSize / 4;
		    var hourHandWhalf = hourHandW / 2;
		    hourHand.graphics.setStrokeStyle(hourHandW).beginStroke(_textColor);
		    hourHand.graphics.moveTo(hourHandWhalf, hourHandWhalf);
		    hourHand.graphics.lineTo(hourHandWhalf + (_fSize * 3), hourHandWhalf);
		    hourHand.graphics.endStroke();
		
		    hourHand.regX = hourHandWhalf;
		    hourHand.regY = hourHandWhalf;
		    hourHand.y = txtHeightHalf - hourHandWhalf;
		    hands.addChild(hourHand);
		
		    var minHand = createShapeClip();
		    var minHandW = _fSize / 8;
		    var minHandWhalf = minHandW / 2;
		    minHand.graphics.setStrokeStyle(minHandW).beginStroke(_textColor);
		    minHand.graphics.moveTo(minHandWhalf, minHandWhalf);
		    minHand.graphics.lineTo(minHandWhalf + (_fSize * 4.25), minHandWhalf);
		    minHand.graphics.endStroke();
		
		    minHand.regX = minHandWhalf;
		    minHand.regY = minHandWhalf;
		    minHand.y = txtHeightHalf - minHandWhalf;
		    hands.addChild(minHand);
		
		    var secHand = createShapeClip();
		    var secHandW = _fSize / 16;
		    var secHandWhalf = secHandW / 2;
		    secHand.graphics.setStrokeStyle(secHandW).beginStroke(_textColor);
		    secHand.graphics.moveTo(secHandWhalf, secHandWhalf);
		    secHand.graphics.lineTo(secHandWhalf + (_fSize * 4.5), secHandWhalf);
		    secHand.graphics.endStroke();
		
		    secHand.regX = secHandWhalf;
		    secHand.regY = secHandWhalf;
		    secHand.y = txtHeightHalf - secHandWhalf;
		    hands.addChild(secHand);
		
		    hands.x = 0;
		    hands.y = 0;
		
		    clockFace.addChild(hands);
		
		    clockFace.addChild(minTicksContainer);
		    clockFace.addChild(hourTicksContainer);
		    clockFace.addChild(hourNums);
		    GUI.addChild(clockFace);
		    GUI.regX = 0;
		    GUI.regY = 0;
		
		    GUI.x = ClockData.stage.getBounds().width / 2;
		    GUI.y = ClockData.stage.getBounds().height / 2;
		
		/*     var clickBtn = createButtonLink(ClockData.stage, "something", (_fSize * 8) + (padding * 4), _fSize + (padding * 2), "click to move hands", clockFont, _fSize, (clockCenter + clockCenter / 2) + (_fSize * 4), "center", _textColor, "#FFCC00", 16, "bottom", "", "click", moveHands);
		    buttonsList.push(clickBtn); */
		
		    ClockData.GUI.hands = hands;
		    ClockData.GUI.hourHand = hourHand;
		    ClockData.GUI.minHand = minHand;
		    ClockData.GUI.secHand = secHand;
		
		    var timeOutput = createTextField("_timeout", 100, ClockData.stageW / 2, ClockData.stageH - 64, "#000000", clockFont, "center");
		
		    ClockData.stage.addChild(timeOutput);
		    ClockData.GUI.timeOutput = timeOutput;
		
		    var nowTime = parseDateTime(new Date());
		    ClockData.GUI.timeOutput.text = nowTime.digitalFormattedTime;
		
		    placeHands(nowTime.hours, nowTime.minutes, nowTime.seconds, nowTime.milliseconds);
		
		/*     var setBtn = createButtonLink(ClockData.GUI, "_setterText", (_fSize * 8) + (padding * 4), _fSize + (padding * 2), "click here to set a time", "20px Arial", _fSize, (clockCenter + clockCenter / 2) - (_fSize * 4), "center", _textColor, "#c4c4c4", 16, "bottom", "", "", setClockHands);
		    ClockData.setBtn = setBtn;
		    ClockData.setBtn.addEventListener("click", setClockHands); */
		    stage.update();
		    return ClockData;
		}
		
		function setClockHands(e) {
		    ClockData.setBtn.removeEventListener("click", setClockHands); //do this, or this function fires twice
		    console.log("setClockHands");
		    /* 
		    if user clicks this button
		    focus this text
		    border outline the text
		    blue select the text
		    capture keyboard events to enter more text
		
		    (display a clickable "commit" button so that the user can activate the next part when ready)
		    commit
		    validate
		    (may need three boxes for this part, since there are three pieces to the data)
		
		    TODO:
		    create "handles" on the hands to allow them to be dragged around
		
		    TODO: 
		    click and drag for the handle
		    */
		}
		
		function moveHands() {
		    ClockData.GUI.hourHand.rotation += 360 / frameInc / 60 / 60 / 60;
		    ClockData.GUI.minHand.rotation += 360 / frameInc / 60 / 60;
		    ClockData.GUI.secHand.rotation += 360 / frameInc / 60;
		    //stage.removeEventListener("tick", tick);
		    createjs.Ticker.removeEventListener("tick", tick);
		    stage.update();
		}
		
		function placeHands(hr, min, sec, millis) {
		    if (parseInt(hr, 10) > 12) {
		        hr = parseInt(hr, 10) - 12;
		    }
		    if (parseInt(hr, 10) == 0) {
		        hr = 12;
		    }
		    ClockData.GUI.hourHand.rotation = (parseInt(hr, 10) / 12) * 360 - 90;
		    ClockData.GUI.minHand.rotation = (parseInt(min, 10) / 60) * 360 - 90;
		    ClockData.GUI.secHand.rotation = (parseInt(sec, 10) / 60) * 360 - 90;
		}
		
		var lastTime = 0;
		var elapsedTime = 0;
		var frameInc = createjs.Ticker.framerate;
		function tick(e) {
		    /*  ClockData.GUI.hourHand.rotation += 360 / frameInc / 60 / 60 / 60;
		     ClockData.GUI.minHand.rotation += 360 / frameInc / 60 / 60;
		     ClockData.GUI.secHand.rotation += 360 / frameInc / 60; */
		    var currtime = parseDateTime(new Date());
		    ClockData.GUI.timeOutput.text = currtime.digitalFormattedTime;
		    placeHands(currtime.hours, currtime.minutes, currtime.seconds, currtime.milliseconds);
		    stage.update(e);
		}
		
		function updateTimeOutput() {
		    t = null;
		    ClockData.GUI.timeOutput.text = parseDateTime(new Date()).digitalFormattedTime;
		    stage.update();
		    t = setTimeout(updateTimeOutput, frameInc);
		}
		
		function parseDateTime(param) {
		    var months = [
		        "January",
		        "February",
		        "March",
		        "April",
		        "May",
		        "June",
		        "July",
		        "August",
		        "September",
		        "October",
		        "November",
		        "December"
		    ];
		    var allTime = param.toString();
		    allTime = allTime.substring(allTime.indexOf("GMT") - 9);
		    var hrs = allTime.substring(0, 2);
		    var mins = allTime.substring(3, 5);
		    var secs = allTime.substring(6, 8);
		    var millis = param.getMilliseconds();
		    var parsedTime = {};
		    parsedTime.hours = hrs;
		    parsedTime.minutes = mins;
		    parsedTime.seconds = secs;
		    parsedTime.milliseconds = millis;
		    parsedTime.year = param.getUTCFullYear();
		    parsedTime.month = months[param.getUTCMonth()];
		    parsedTime.digitalFormattedTime = parsedTime.hours + ":" + parsedTime.minutes + ":" + parsedTime.seconds;// + ":" + parsedTime.milliseconds;
		    return parsedTime;
		}
		var t = setTimeout(updateTimeOutput, frameInc);
		createjs.Ticker.addEventListener("tick", tick);
		
		
		
		//stage.addEventListener("tick", tick);
		
		/* this adds tester straight from the library, but there should be a way to make a sprite sheet out of it. */
		
		/* var tester = new lib.tester();
		stage.addChild(tester); */
		
		/*
		see if it's possible to make a run-time spritesheet
		*/
		
		createGUI();
		
		/*TODO:
		get new date
		    v2(format date for display)
		make gui
		gui
		    textfields for display (5)
		clock
		    body
		        body contents
		    face
		        minutes ticks
		        hours ticks
		            textfields for hours
		             12
		            hands
		                hour hand
		                minutes hand
		                seconds hand
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// Actions
	this.loadingText = new cjs.Text("loading...", "normal 400 33px 'Changa One'", "#000099");
	this.loadingText.name = "loadingText";
	this.loadingText.textAlign = "center";
	this.loadingText.lineHeight = 37;
	this.loadingText.lineWidth = 231;
	this.loadingText.parent = this;
	this.loadingText.setTransform(320,296.95);
	if(!lib.properties.webfonts['Changa One']) {
		lib.webFontTxtInst['Changa One'] = lib.webFontTxtInst['Changa One'] || [];
		lib.webFontTxtInst['Changa One'].push(this.loadingText);
	}

	this.timeline.addTween(cjs.Tween.get(this.loadingText).to({_off:true},1).wait(1));

	// Content
	this.display2 = new cjs.Text("sdvsd", "normal 400 33px 'Changa One'", "#009933");
	this.display2.name = "display2";
	this.display2.textAlign = "center";
	this.display2.lineHeight = 37;
	this.display2.lineWidth = 126;
	this.display2.parent = this;
	this.display2.setTransform(710.4,493.85);
	if(!lib.properties.webfonts['Changa One']) {
		lib.webFontTxtInst['Changa One'] = lib.webFontTxtInst['Changa One'] || [];
		lib.webFontTxtInst['Changa One'].push(this.display2);
	}

	this.display1 = new cjs.Text("sdvsd", "normal 600 33px 'Zilla Slab'", "#009933");
	this.display1.name = "display1";
	this.display1.textAlign = "center";
	this.display1.lineHeight = 39;
	this.display1.lineWidth = 126;
	this.display1.parent = this;
	this.display1.setTransform(710.4,448.9);
	if(!lib.properties.webfonts['Zilla Slab']) {
		lib.webFontTxtInst['Zilla Slab'] = lib.webFontTxtInst['Zilla Slab'] || [];
		lib.webFontTxtInst['Zilla Slab'].push(this.display1);
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.display1},{t:this.display2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(522.6,615,252.79999999999995,-81.10000000000002);
// library properties:
lib.properties = {
	id: '5FCC4BB02A92CC40AF1173949FCD7C0B',
	width: 640,
	height: 640,
	fps: 30,
	color: "#A49D9B",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['5FCC4BB02A92CC40AF1173949FCD7C0B'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;