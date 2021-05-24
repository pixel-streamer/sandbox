(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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


(lib.verdict_txt = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("verdict_txtverdict_txtverdict_txtverdict_txtverdict_txtverdict_txt", "30px 'Rockwell'", "#009933");
	this.text.textAlign = "center";
	this.text.lineHeight = 37;
	this.text.lineWidth = 531;
	this.text.parent = this;
	this.text.setTransform(267.5,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.verdict_txt, new cjs.Rectangle(0,0,535,188), null);


(lib.tombstone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1_copy
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#7B0000").setStrokeStyle(3,1,1).moveTo(180.9,-114.7).curveTo(184.9,-115.8,182.9,-123.2).lineTo(165.4,-188.6).curveTo(163.6,-195.1,159.4,-195.2).curveTo(156.9,-195.2,150.8,-193.6).lineTo(145.4,-192.2).lineTo(137.1,-223.1).curveTo(145.6,-225.4,153.3,-227.7).lineTo(203.4,-241.3).lineTo(215.8,-192.8).lineTo(208.9,-190.8).curveTo(208.6,-192.9,207.4,-197.7).curveTo(206.1,-202.4,204.2,-203.9).curveTo(202.2,-205.2,199.4,-205.6).curveTo(194.4,-206.1,186.8,-204.1).curveTo(179.1,-202,176.4,-200.4).curveTo(173.6,-198.9,172.5,-197.4).curveTo(171,-195.6,171.8,-192.4).lineTo(179.6,-163.2).lineTo(193.1,-166.8).curveTo(194.8,-167.2,195.9,-168.8).curveTo(196.9,-170.4,196.6,-172.6).curveTo(196.1,-174.9,195.4,-177.2).lineTo(194.2,-181.5).curveTo(193.6,-183.9,192.8,-186.4).lineTo(199.7,-188.8).lineTo(212.9,-141.7).lineTo(206.2,-139.9).lineTo(204.5,-146.2).curveTo(203.8,-148.9,202.9,-151.6).curveTo(201.2,-157.2,199.8,-158.4).curveTo(198.2,-159.6,197.1,-159.9).curveTo(195.2,-160.4,193.8,-160).curveTo(190.8,-159.2,187.5,-158.1).curveTo(184.2,-157.2,181.5,-156.3).curveTo(183.2,-149.6,184.8,-143.6).lineTo(189.6,-125.5).curveTo(190.8,-121.1,192.9,-120).curveTo(196.2,-118.4,198.6,-119).lineTo(224.1,-125.9).curveTo(230.9,-127.7,228.6,-135.9).lineTo(226.5,-143.6).curveTo(225.9,-145.7,225.2,-147.7).lineTo(232.1,-149.8).lineTo(245.1,-96.6).curveTo(228.6,-93.2,222.6,-91.5).lineTo(191.4,-83).curveTo(184.5,-81,177.1,-79).lineTo(168.4,-111.4).closePath().moveTo(80.2,-171.2).curveTo(79.4,-174.1,75.2,-172.9).lineTo(72.7,-172.3).curveTo(70.8,-171.8,68.5,-171.2).curveTo(66.3,-170.7,63.3,-170).lineTo(54.9,-201.3).curveTo(63.1,-203.5,68.4,-204.9).curveTo(73.6,-206.4,76.9,-207.3).lineTo(93.9,-211.9).curveTo(117.5,-218.2,129.8,-196.6).curveTo(133.1,-190.9,135.1,-183.4).curveTo(137.1,-176,137.1,-170.9).curveTo(137.2,-165.9,136.1,-161.9).curveTo(134.9,-158.1,133,-155.2).curveTo(131,-152.4,128.7,-150.5).curveTo(124.8,-147,119.9,-145.2).lineTo(120,-144.6).curveTo(125,-144.6,129.1,-141.2).curveTo(133,-137.9,134.6,-131.8).lineTo(141.3,-106.7).curveTo(142.1,-103.9,143.8,-103).curveTo(145.6,-102.1,147.5,-102.6).curveTo(149.4,-103.1,150.3,-105.2).curveTo(151.2,-107.2,150.8,-109).lineTo(149.6,-113.4).curveTo(148.8,-116.1,148.1,-119).curveTo(147.3,-122,146.5,-125.6).lineTo(152.9,-127.5).lineTo(162.2,-93).curveTo(165.4,-80.8,161.3,-75.2).curveTo(159.5,-72.6,155.3,-71.5).curveTo(144.8,-68.7,140.6,-80.6).curveTo(139.4,-83.9,138.5,-87.2).lineTo(128,-129.2).curveTo(125.8,-137.2,119,-139.8).curveTo(114,-141.5,109.4,-140.2).lineTo(99.6,-137.7).curveTo(97.8,-137.2,98.2,-135.4).lineTo(107.8,-99.3).curveTo(108.8,-95.4,112.1,-96.3).lineTo(123.7,-99.4).lineTo(132.1,-67.3).lineTo(93.9,-56.5).lineTo(85.2,-89.1).lineTo(97.3,-92.4).curveTo(101.4,-93.5,100.1,-98.3).closePath().moveTo(89.4,-177).curveTo(86.9,-176.3,87.8,-173.2).curveTo(88,-172.3,89,-168.6).curveTo(89.9,-164.9,91.3,-159.5).lineTo(94.9,-145.8).curveTo(95.3,-143.9,97,-144.4).lineTo(116.5,-149.4).curveTo(126.7,-152.2,129.1,-161.9).curveTo(129.9,-165.5,128.7,-170.1).curveTo(127.5,-174.8,125.2,-177.4).curveTo(122.8,-180.2,120.3,-181.4).curveTo(115.6,-183.8,111.5,-182.7).closePath().moveTo(33.3,-161.1).curveTo(32.3,-165,29.5,-164.2).lineTo(24.7,-163).lineTo(16.9,-191.4).lineTo(40.5,-197).lineTo(47.4,-168.9).lineTo(42,-167.4).curveTo(39.3,-166.7,40,-163.9).lineTo(44.1,-148.6).curveTo(45.7,-142.1,47.8,-134.2).lineTo(40.6,-132.4).curveTo(38.8,-139.4,37.3,-145.2).closePath().moveTo(177.1,134.3).lineTo(159.4,70.1).curveTo(157.9,64.6,155.6,62.9).curveTo(153.1,61.1,148.6,62.3).lineTo(140.8,64.4).lineTo(132.3,32.5).curveTo(139.8,30.5,147.5,28.3).lineTo(176.6,20.4).curveTo(195.5,15.4,201.8,27.8).curveTo(203.9,31.8,205.2,37).lineTo(231.6,135.1).curveTo(237.2,156.4,224.9,162.1).curveTo(221.3,163.8,217.1,164.9).lineTo(172.1,176.9).lineTo(163.6,145.6).lineTo(173.8,142.9).curveTo(177.1,142.1,177.5,140.2).curveTo(177.9,137.6,177.1,134.3).closePath().moveTo(174.6,98.3).lineTo(184.7,135.2).curveTo(185.9,139.4,189.1,139).curveTo(190,139,190.8,138.8).lineTo(215.8,132.1).curveTo(222.1,130.4,221.1,125.1).curveTo(220.9,123.6,220.5,121.9).lineTo(202.7,55.5).curveTo(200.7,48,195,48.7).curveTo(193.4,48.9,191.4,49.4).lineTo(168.9,55.4).curveTo(165.4,56.4,165,58.9).curveTo(164.6,61.4,165.4,64.5).curveTo(170.5,83.2,174.6,98.3).closePath().moveTo(124.3,67.8).curveTo(111.2,71.8,111,71.8).curveTo(109.6,72.1,110.3,73.8).curveTo(110.5,74.3,110.5,74.6).curveTo(110.6,74.8,112,77.8).curveTo(113.5,80.9,115.8,85.8).curveTo(118,90.7,121,97).curveTo(123.9,103.3,127,109.9).curveTo(130.1,116.4,133.1,122.8).curveTo(136.1,129.1,138.4,134.2).curveTo(144.6,147.3,145.6,148.6).curveTo(146.6,149.8,148.6,149.3).lineTo(155.9,147.3).lineTo(164.9,179.3).lineTo(130.1,187.8).lineTo(121.2,156.4).lineTo(132.6,153.3).curveTo(135,152.7,135.7,150.6).curveTo(136.3,148.4,135.9,147.5).curveTo(135.5,146.5,134.4,144.1).curveTo(133.2,141.6,131.5,137.6).curveTo(129.6,133.6,127.3,128.4).curveTo(124.9,123.2,122.3,117.6).lineTo(95.8,124.7).lineTo(97.7,157.2).curveTo(97.8,160.6,98.5,161.8).curveTo(99.2,162.9,101,162.5).lineTo(111.8,159.6).lineTo(119.8,191.1).lineTo(85,200.5).lineTo(77.2,168.4).lineTo(85.2,166.2).curveTo(90.1,164.9,89.9,161.4).curveTo(89.9,159.4,89.5,151.2).curveTo(89.2,142.9,88.9,136.1).curveTo(88.5,129.1,88.2,121.9).curveTo(87.9,114.6,87.7,107.5).curveTo(87.3,100.6,87.1,95).curveTo(86.8,89.3,86.7,85.6).curveTo(86.4,81.8,86.3,80.7).curveTo(86.2,78.6,83.8,79.3).lineTo(72.4,82.3).lineTo(63.6,50.7).lineTo(115.9,37.1).closePath().moveTo(12.9,184.8).curveTo(17,183.8,15,176.4).lineTo(-2.5,110.9).curveTo(-4.2,104.4,-8.5,104.3).curveTo(-11,104.3,-17.1,105.9).lineTo(-22.5,107.4).lineTo(-30.8,76.4).curveTo(-22.3,74.1,-14.6,71.9).lineTo(35.5,58.2).lineTo(47.9,106.7).lineTo(40.9,108.8).curveTo(40.8,106.7,39.4,101.9).curveTo(38.1,97.1,36.3,95.7).curveTo(34.3,94.3,31.5,93.9).curveTo(26.5,93.4,18.9,95.5).curveTo(11.2,97.5,8.5,99.1).curveTo(5.7,100.6,4.6,102.1).curveTo(3.1,104,3.9,107.1).lineTo(11.7,136.3).lineTo(25.2,132.8).curveTo(26.8,132.3,27.9,130.8).curveTo(29,129.2,28.6,126.9).curveTo(28.1,124.6,27.5,122.4).lineTo(26.3,118).curveTo(25.7,115.6,24.9,113.1).lineTo(31.8,110.8).lineTo(45,157.8).lineTo(38.3,159.6).lineTo(36.6,153.3).curveTo(35.8,150.7,35,148).curveTo(33.3,142.4,31.8,141.1).curveTo(30.3,139.9,29.1,139.6).curveTo(27.3,139.1,25.8,139.6).curveTo(22.8,140.3,19.6,141.4).curveTo(16.3,142.4,13.6,143.2).curveTo(15.3,150,16.9,155.9).lineTo(21.7,174.1).curveTo(22.8,178.4,25,179.6).curveTo(28.3,181.1,30.6,180.6).lineTo(56.1,173.7).curveTo(62.9,171.9,60.8,163.6).lineTo(58.6,155.9).curveTo(57.9,153.9,57.3,151.8).lineTo(64.2,149.8).lineTo(77.2,203).curveTo(60.6,206.4,54.6,208.1).lineTo(23.4,216.6).curveTo(16.6,218.6,9.2,220.6).lineTo(0.5,188.1).closePath().moveTo(95.3,117.5).lineTo(119.2,110.9).curveTo(116.2,104.2,113.3,97.9).curveTo(103.3,75.9,102.5,75.1).curveTo(101.5,74.3,100.5,74.6).lineTo(94.8,76.1).curveTo(93.1,76.6,93.2,78.6).closePath().moveTo(-119.1,-21.7).lineTo(-147.6,-126.3).curveTo(-149.9,-134.9,-145.9,-141.8).curveTo(-141.9,-148.3,-135.4,-150.1).curveTo(-129.1,-151.9,-124,-153.3).lineTo(-110.1,-157.2).curveTo(-100.9,-159.7,-93.4,-152.7).curveTo(-87.2,-146.9,-85.2,-139.4).lineTo(-57.8,-39.1).curveTo(-53.8,-24.3,-65.2,-16).curveTo(-68.7,-13.5,-73.3,-12.3).lineTo(-96,-5.7).curveTo(-104.8,-3.4,-111.7,-9.6).curveTo(-117.2,-14.4,-119.1,-21.7).closePath().moveTo(-180.8,-22.8).lineTo(-185.6,-41.6).curveTo(-187.4,-48.8,-189.8,-57.7).curveTo(-197.4,-65.9,-202.1,-70.7).curveTo(-206.6,-75.6,-209.2,-78.3).curveTo(-211.9,-81.1,-214.1,-83.4).curveTo(-216.4,-85.8,-217.9,-87.4).curveTo(-219.5,-89.1,-220.8,-90.3).curveTo(-224.1,-93,-226.6,-92.4).lineTo(-228.5,-91.9).curveTo(-230.1,-91.4,-232,-90.9).curveTo(-234,-90.4,-236.6,-89.9).lineTo(-245.1,-120.9).lineTo(-210.4,-130.4).lineTo(-202.9,-99.1).curveTo(-212,-97.1,-213.1,-96.8).curveTo(-214.1,-96.5,-214.6,-95.8).curveTo(-215.1,-95.2,-214.8,-94.5).curveTo(-214.4,-93.5,-213,-92).curveTo(-211.6,-90.7,-210.5,-89.5).curveTo(-209.4,-88.3,-207.6,-86.4).curveTo(-205.9,-84.6,-203.8,-82.3).curveTo(-201.7,-80,-198.1,-76.1).curveTo(-194.6,-72.3,-188.3,-65.6).curveTo(-185.8,-73.4,-184.2,-77.9).curveTo(-182.8,-82.6,-181.9,-85.2).curveTo(-180.9,-87.9,-180.2,-90.1).curveTo(-179.5,-92.4,-178.9,-94).curveTo(-178.5,-95.6,-178,-97.1).curveTo(-176.2,-102.6,-176.6,-104).curveTo(-177.1,-105.4,-180.9,-104.4).lineTo(-187.4,-102.6).lineTo(-196.1,-134.2).lineTo(-161.4,-142.8).lineTo(-153.9,-110.6).lineTo(-163.1,-108.1).curveTo(-168.1,-106.8,-169.5,-102.1).curveTo(-169.7,-101.4,-170.4,-99.2).curveTo(-170.9,-97.1,-171.9,-94).curveTo(-179,-72.7,-182.9,-60.4).curveTo(-179.4,-46,-177.9,-40.2).curveTo(-176.5,-34.5,-175.8,-31.9).curveTo(-175.2,-29.2,-174.7,-27.4).lineTo(-174.1,-24.8).curveTo(-173.4,-22.4,-171.7,-21.8).curveTo(-170.2,-21.3,-167.6,-22).lineTo(-155.6,-25.2).lineTo(-147.9,8.1).lineTo(-187.9,18.8).lineTo(-197.1,-13.3).lineTo(-185.2,-16.5).curveTo(-179.5,-18,-180.8,-22.8).closePath().moveTo(-99.2,-39.1).lineTo(-79.4,-44.8).curveTo(-71.8,-46.8,-71,-54.7).curveTo(-70.8,-57.6,-71.9,-61.5).lineTo(-86,-114).curveTo(-89.6,-127.8,-103.9,-124).lineTo(-121.9,-119.1).curveTo(-132.6,-116.3,-133.6,-107).curveTo(-133.9,-103.8,-133.1,-100.8).lineTo(-119.1,-49.7).curveTo(-117,-41.8,-110.8,-39.3).curveTo(-105.8,-37.3,-99.2,-39.1).closePath().moveTo(-30.9,-41.8).lineTo(-55.9,-134.1).curveTo(-56.8,-137.6,-60.1,-136.7).lineTo(-69.7,-134.2).lineTo(-77.8,-165.5).lineTo(-44.2,-174.9).lineTo(-36.2,-144.1).curveTo(-38.8,-143.3,-40.9,-142.7).curveTo(-44.9,-141.4,-47,-140.8).curveTo(-49.9,-140,-49,-136.7).lineTo(-31,-69.4).curveTo(-29.3,-63.2,-24.7,-61.3).curveTo(-21.5,-59.7,-17.8,-60.7).lineTo(1.9,-66).curveTo(8.6,-67.8,9.4,-74.9).curveTo(9.7,-77.3,9.1,-79.5).lineTo(-9.3,-147.7).curveTo(-10.2,-150.7,-13.9,-149.7).lineTo(-23.1,-147.2).lineTo(-32.1,-177.9).lineTo(1.4,-187.2).lineTo(10.1,-156.1).curveTo(7.9,-155.4,6.1,-154.8).curveTo(4.2,-154.3,2.4,-153.8).lineTo(-0.1,-153.2).curveTo(-3,-152.4,-2.1,-149.1).lineTo(23.2,-56.9).curveTo(25.8,-47.3,24.5,-43.6).curveTo(23,-40,20.6,-38.1).curveTo(18.1,-36.4,13.9,-35.2).lineTo(-11.9,-28.3).curveTo(-26.2,-24.5,-30.9,-41.8).closePath().moveTo(-63,198.7).lineTo(-80.6,134.5).curveTo(-82,129,-84.5,127.2).curveTo(-87,125.5,-91.4,126.7).lineTo(-99.1,128.8).lineTo(-107.6,96.8).curveTo(-100.2,94.8,-92.5,92.7).lineTo(-63.5,84.8).curveTo(-44.5,79.7,-38.2,92.2).curveTo(-36.2,96.2,-34.8,101.4).lineTo(-8.5,199.5).curveTo(-2.8,220.8,-15.2,226.4).curveTo(-18.7,228.1,-22.9,229.2).lineTo(-68,241.3).lineTo(-76.4,210).lineTo(-66.2,207.3).curveTo(-62.9,206.4,-62.5,204.6).curveTo(-62.1,202,-63,198.7).closePath().moveTo(-65.4,162.7).lineTo(-55.3,199.6).curveTo(-54.2,203.8,-50.9,203.3).curveTo(-50,203.3,-49.2,203.1).lineTo(-24.2,196.4).curveTo(-18,194.8,-18.9,189.5).curveTo(-19.1,187.9,-19.5,186.2).lineTo(-37.3,119.8).curveTo(-39.3,112.4,-45,113).curveTo(-46.7,113.2,-48.7,113.8).lineTo(-71.1,119.8).curveTo(-74.6,120.7,-75,123.3).curveTo(-75.5,125.7,-74.6,128.8).curveTo(-69.5,147.6,-65.4,162.7).closePath();
	this.shape.setTransform(-35.05,-11.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("rgba(153,0,0,0.325)").beginStroke().moveTo(-76.4,210).lineTo(-66.3,207.3).curveTo(-62.8,206.4,-62.5,204.6).curveTo(-62.1,202,-63,198.7).lineTo(-80.6,134.5).curveTo(-82,129,-84.5,127.3).curveTo(-87,125.5,-91.4,126.7).lineTo(-99.1,128.7).lineTo(-107.7,96.9).lineTo(-92.5,92.7).lineTo(-63.4,84.8).curveTo(-44.5,79.7,-38.2,92.2).curveTo(-36.2,96.2,-34.8,101.4).lineTo(-8.4,199.5).curveTo(-2.8,220.8,-15.2,226.5).curveTo(-18.7,228.1,-22.8,229.2).lineTo(-67.9,241.3).closePath().moveTo(-45,113.1).curveTo(-46.7,113.3,-48.7,113.8).lineTo(-71.1,119.8).curveTo(-74.6,120.8,-75,123.3).curveTo(-75.4,125.8,-74.6,128.8).lineTo(-65.4,162.7).lineTo(-55.3,199.6).curveTo(-54.1,203.8,-50.9,203.3).curveTo(-50,203.4,-49.2,203.1).lineTo(-24.3,196.5).curveTo(-17.9,194.7,-18.9,189.5).curveTo(-19.1,187.9,-19.5,186.2).lineTo(-37.3,119.8).curveTo(-39.1,113,-44.1,113).lineTo(-45,113.1).closePath().moveTo(0.6,188.1).lineTo(12.9,184.9).curveTo(17,183.7,15.1,176.4).lineTo(-2.5,111).curveTo(-4.3,104.4,-8.4,104.3).curveTo(-11,104.4,-17.1,105.9).lineTo(-22.5,107.4).lineTo(-30.7,76.4).lineTo(-14.5,71.9).lineTo(35.6,58.2).lineTo(47.9,106.8).lineTo(41,108.8).curveTo(40.7,106.7,39.5,101.9).curveTo(38.1,97.1,36.3,95.7).curveTo(34.3,94.3,31.5,94).curveTo(26.5,93.4,18.9,95.5).curveTo(11.3,97.5,8.6,99.1).curveTo(5.7,100.6,4.6,102.1).curveTo(3.1,104,3.9,107.1).lineTo(11.7,136.4).lineTo(25.2,132.8).curveTo(26.8,132.3,27.9,130.8).curveTo(29,129.2,28.7,126.9).curveTo(28.2,124.6,27.5,122.4).lineTo(26.3,118).lineTo(24.9,113.1).lineTo(31.8,110.8).lineTo(45,157.9).lineTo(38.3,159.7).lineTo(36.6,153.3).lineTo(35,148).curveTo(33.3,142.4,31.8,141.1).curveTo(30.3,140,29.1,139.6).curveTo(27.3,139.2,25.9,139.5).curveTo(22.9,140.4,19.6,141.4).lineTo(13.6,143.2).lineTo(16.9,156).lineTo(21.7,174.1).curveTo(22.9,178.4,25.1,179.6).curveTo(28.3,181.1,30.6,180.6).lineTo(56.1,173.7).curveTo(62.9,171.9,60.8,163.6).lineTo(58.6,156).lineTo(57.4,151.8).lineTo(64.1,149.8).lineTo(77.3,203).curveTo(60.7,206.4,54.7,208).lineTo(23.4,216.6).lineTo(9.2,220.6).closePath().moveTo(77.3,168.4).lineTo(85.2,166.2).curveTo(90.1,164.9,89.9,161.5).lineTo(89.6,151.2).lineTo(88.9,136).lineTo(88.2,121.9).lineTo(87.6,107.6).lineTo(87.1,95).lineTo(86.6,85.6).lineTo(86.3,80.7).curveTo(86.2,78.6,83.8,79.3).lineTo(72.5,82.3).lineTo(63.7,50.7).lineTo(115.9,37.2).lineTo(124.3,67.9).lineTo(111,71.8).curveTo(109.6,72.2,110.4,73.8).lineTo(110.6,74.6).lineTo(112.1,77.8).lineTo(115.8,85.8).lineTo(121,97).lineTo(127,109.9).lineTo(133.1,122.9).lineTo(138.5,134.2).curveTo(144.6,147.3,145.7,148.5).curveTo(146.7,149.8,148.5,149.3).lineTo(155.9,147.3).lineTo(164.9,179.3).lineTo(130.1,187.8).lineTo(121.3,156.4).lineTo(132.6,153.4).curveTo(135,152.7,135.7,150.7).curveTo(136.3,148.4,135.9,147.5).lineTo(134.4,144).lineTo(131.5,137.6).lineTo(127.3,128.4).lineTo(122.3,117.6).lineTo(95.8,124.8).lineTo(97.7,157.2).curveTo(97.8,160.6,98.6,161.8).curveTo(99.2,162.9,100.9,162.5).lineTo(111.8,159.6).lineTo(119.8,191.2).lineTo(85.1,200.5).closePath().moveTo(100.5,74.6).lineTo(94.8,76.2).curveTo(93.1,76.6,93.3,78.6).lineTo(95.3,117.6).lineTo(119.3,111).lineTo(113.3,97.9).curveTo(103.4,75.9,102.5,75.1).curveTo(101.8,74.5,101,74.5).lineTo(100.5,74.6).closePath().moveTo(163.7,145.6).lineTo(173.7,142.9).curveTo(177.2,142,177.5,140.2).curveTo(177.9,137.6,177.1,134.4).lineTo(159.4,70.1).curveTo(158,64.6,155.6,62.9).curveTo(153,61.1,148.6,62.4).lineTo(140.9,64.4).lineTo(132.3,32.5).lineTo(147.5,28.4).lineTo(176.5,20.5).curveTo(195.5,15.4,201.7,27.8).curveTo(203.9,31.9,205.2,37).lineTo(231.5,135.1).curveTo(237.2,156.4,224.9,162.1).curveTo(221.3,163.7,217.1,164.9).lineTo(172,177).closePath().moveTo(195,48.7).curveTo(193.3,48.9,191.4,49.4).lineTo(168.9,55.5).curveTo(165.4,56.4,165,59).curveTo(164.6,61.4,165.4,64.5).lineTo(174.6,98.4).lineTo(184.7,135.3).curveTo(185.8,139.4,189.1,139).curveTo(190,139,190.8,138.7).lineTo(215.8,132.1).curveTo(222,130.4,221.2,125.1).curveTo(221,123.6,220.5,121.9).lineTo(202.7,55.5).curveTo(200.9,48.6,195.9,48.6).lineTo(195,48.7).closePath().moveTo(-197.1,-13.3).lineTo(-185.3,-16.5).curveTo(-179.5,-18,-180.8,-22.8).lineTo(-185.6,-41.6).lineTo(-189.8,-57.7).lineTo(-202,-70.7).lineTo(-209.2,-78.3).lineTo(-214.1,-83.4).lineTo(-217.9,-87.4).lineTo(-220.7,-90.3).curveTo(-224.1,-93,-226.6,-92.3).lineTo(-228.5,-91.9).lineTo(-232,-90.9).lineTo(-236.6,-89.9).lineTo(-245.1,-120.9).lineTo(-210.4,-130.5).lineTo(-202.8,-99.1).lineTo(-213.1,-96.7).curveTo(-214.1,-96.5,-214.6,-95.8).curveTo(-215.1,-95.2,-214.8,-94.5).curveTo(-214.5,-93.5,-213,-92).lineTo(-210.5,-89.5).lineTo(-207.6,-86.4).lineTo(-203.8,-82.2).lineTo(-198.1,-76).lineTo(-188.3,-65.6).lineTo(-184.3,-77.8).lineTo(-181.9,-85.2).lineTo(-180.2,-90.1).lineTo(-179,-93.9).lineTo(-178,-97.1).curveTo(-176.3,-102.6,-176.6,-103.9).curveTo(-177.1,-105.4,-180.9,-104.4).lineTo(-187.4,-102.6).lineTo(-196.1,-134.3).lineTo(-161.3,-142.7).lineTo(-154,-110.6).lineTo(-163.1,-108.1).curveTo(-168.1,-106.8,-169.5,-102).lineTo(-170.3,-99.2).lineTo(-172,-94).curveTo(-179,-72.7,-182.9,-60.4).lineTo(-178,-40.1).lineTo(-175.8,-31.8).lineTo(-174.7,-27.3).lineTo(-174,-24.8).curveTo(-173.4,-22.4,-171.7,-21.8).curveTo(-170.2,-21.3,-167.5,-22).lineTo(-155.6,-25.2).lineTo(-147.8,8.1).lineTo(-187.9,18.8).closePath().moveTo(-111.7,-9.6).curveTo(-117.2,-14.4,-119.1,-21.7).lineTo(-147.6,-126.3).curveTo(-149.9,-134.9,-145.9,-141.8).curveTo(-141.9,-148.3,-135.4,-150).lineTo(-124.1,-153.3).lineTo(-110.1,-157.2).curveTo(-100.9,-159.7,-93.4,-152.6).curveTo(-87.2,-147,-85.3,-139.4).lineTo(-57.8,-39.1).curveTo(-53.8,-24.3,-65.2,-16).curveTo(-68.7,-13.5,-73.3,-12.2).lineTo(-96.1,-5.7).curveTo(-98.4,-5.1,-100.7,-5.1).curveTo(-106.7,-5.1,-111.7,-9.6).closePath().moveTo(-103.8,-123.9).lineTo(-121.8,-119.1).curveTo(-132.6,-116.2,-133.5,-107).curveTo(-133.9,-103.7,-133.2,-100.8).lineTo(-119.1,-49.7).curveTo(-117,-41.8,-110.8,-39.3).curveTo(-105.8,-37.3,-99.2,-39).lineTo(-79.4,-44.7).curveTo(-71.7,-46.8,-71.1,-54.7).curveTo(-70.8,-57.5,-71.9,-61.5).lineTo(-85.9,-113.9).curveTo(-88.8,-124.8,-98.2,-124.8).curveTo(-100.8,-124.8,-103.8,-123.9).closePath().moveTo(-30.9,-41.8).lineTo(-55.9,-134.1).curveTo(-56.8,-137.6,-60.1,-136.7).lineTo(-69.6,-134.2).lineTo(-77.8,-165.5).lineTo(-44.2,-174.9).lineTo(-36.2,-144.1).lineTo(-40.9,-142.6).lineTo(-46.9,-140.8).curveTo(-49.9,-140,-49,-136.7).lineTo(-30.9,-69.4).curveTo(-29.3,-63.2,-24.7,-61.3).curveTo(-21.4,-59.7,-17.8,-60.7).lineTo(1.9,-66).curveTo(8.6,-67.8,9.5,-74.9).curveTo(9.7,-77.3,9.1,-79.5).lineTo(-9.3,-147.7).curveTo(-10.2,-150.6,-13.8,-149.7).lineTo(-23.1,-147.2).lineTo(-32.1,-177.9).lineTo(1.5,-187.2).lineTo(10.1,-156.1).lineTo(6.1,-154.8).lineTo(2.4,-153.8).lineTo(-0.1,-153.2).curveTo(-3,-152.4,-2,-149.1).lineTo(23.3,-56.9).curveTo(25.9,-47.3,24.5,-43.6).curveTo(23.1,-39.9,20.6,-38.1).curveTo(18.2,-36.3,13.9,-35.2).lineTo(-11.8,-28.3).curveTo(-14.5,-27.6,-16.8,-27.6).curveTo(-27.1,-27.6,-30.9,-41.8).closePath().moveTo(85.2,-89.1).lineTo(97.3,-92.3).curveTo(101.4,-93.4,100.1,-98.3).lineTo(80.2,-171.2).curveTo(79.4,-174.1,75.2,-173).lineTo(72.7,-172.3).lineTo(68.5,-171.2).lineTo(63.3,-170).lineTo(54.9,-201.3).lineTo(68.4,-204.9).lineTo(76.9,-207.3).lineTo(93.9,-211.9).curveTo(117.6,-218.3,129.8,-196.6).curveTo(133.2,-190.9,135.1,-183.5).curveTo(137.2,-176,137.1,-171).curveTo(137.2,-165.9,136.1,-162).curveTo(134.9,-158,133,-155.1).curveTo(131,-152.5,128.7,-150.5).curveTo(124.8,-147,119.9,-145.2).lineTo(120,-144.6).curveTo(125,-144.6,129,-141.2).curveTo(133,-137.9,134.7,-131.7).lineTo(141.3,-106.6).curveTo(142.1,-103.9,143.9,-103).curveTo(145.6,-102.1,147.5,-102.6).curveTo(149.4,-103.1,150.3,-105.2).curveTo(151.2,-107.1,150.8,-109).lineTo(149.5,-113.4).lineTo(148.2,-119).lineTo(146.5,-125.6).lineTo(153,-127.5).lineTo(162.2,-93).curveTo(165.4,-80.7,161.3,-75.1).curveTo(159.5,-72.6,155.4,-71.5).curveTo(144.8,-68.7,140.5,-80.5).curveTo(139.4,-83.9,138.5,-87.2).lineTo(127.9,-129.1).curveTo(125.8,-137.2,118.9,-139.8).curveTo(114.1,-141.5,109.4,-140.3).lineTo(99.6,-137.7).curveTo(97.8,-137.1,98.2,-135.4).lineTo(107.8,-99.3).curveTo(108.8,-95.4,112.1,-96.3).lineTo(123.7,-99.4).lineTo(132.1,-67.3).lineTo(93.9,-56.4).closePath().moveTo(111.5,-182.7).lineTo(89.4,-177).curveTo(86.9,-176.3,87.8,-173.1).lineTo(89,-168.6).lineTo(91.3,-159.5).lineTo(94.9,-145.8).curveTo(95.4,-143.9,97.1,-144.4).lineTo(116.4,-149.5).curveTo(126.7,-152.2,129.1,-161.9).curveTo(129.9,-165.5,128.7,-170.1).curveTo(127.4,-174.8,125.2,-177.5).curveTo(122.9,-180.2,120.4,-181.4).curveTo(117.1,-183,114.1,-183).curveTo(112.8,-183,111.5,-182.7).closePath().moveTo(168.4,-111.4).lineTo(180.9,-114.7).curveTo(184.9,-115.8,182.9,-123.2).lineTo(165.4,-188.6).curveTo(163.6,-195.1,159.4,-195.2).curveTo(156.9,-195.2,150.8,-193.6).lineTo(145.4,-192.1).lineTo(137.1,-223.1).lineTo(153.3,-227.7).lineTo(203.4,-241.3).lineTo(215.8,-192.8).lineTo(208.8,-190.8).curveTo(208.6,-192.9,207.3,-197.6).curveTo(206,-202.5,204.2,-203.8).curveTo(202.2,-205.2,199.4,-205.6).curveTo(194.4,-206.1,186.8,-204).curveTo(179.1,-202,176.4,-200.4).curveTo(173.6,-198.9,172.5,-197.4).curveTo(171,-195.6,171.8,-192.5).lineTo(179.7,-163.2).lineTo(193.2,-166.8).curveTo(194.8,-167.3,195.9,-168.8).curveTo(196.9,-170.3,196.5,-172.6).curveTo(196,-174.9,195.4,-177.2).lineTo(194.3,-181.5).lineTo(192.8,-186.5).lineTo(199.7,-188.7).lineTo(212.9,-141.7).lineTo(206.2,-139.9).lineTo(204.5,-146.2).lineTo(202.9,-151.5).curveTo(201.2,-157.1,199.7,-158.4).curveTo(198.3,-159.6,197.1,-159.9).curveTo(195.2,-160.4,193.7,-160).curveTo(190.7,-159.2,187.5,-158.1).lineTo(181.5,-156.3).lineTo(184.8,-143.6).lineTo(189.6,-125.5).curveTo(190.8,-121.1,192.9,-120).curveTo(196.2,-118.4,198.6,-119).lineTo(224.1,-125.9).curveTo(230.9,-127.7,228.6,-136).lineTo(226.5,-143.6).lineTo(225.2,-147.7).lineTo(232.1,-149.7).lineTo(245.1,-96.6).curveTo(228.6,-93.1,222.5,-91.5).lineTo(191.4,-83).lineTo(177.2,-78.9).closePath().moveTo(37.4,-145.2).lineTo(33.3,-161.1).curveTo(32.3,-165,29.5,-164.2).lineTo(24.8,-163).lineTo(17,-191.3).lineTo(40.5,-197).lineTo(47.5,-168.8).lineTo(42.1,-167.4).curveTo(39.3,-166.7,40.1,-163.9).lineTo(44.1,-148.6).curveTo(45.7,-142.1,47.8,-134.2).lineTo(40.6,-132.5).lineTo(37.4,-145.2).closePath();
	this.shape_1.setTransform(-35.05,-11.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tombstone, new cjs.Rectangle(-281.7,-254.7,493.29999999999995,485.6), null);


(lib.scoring = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("scoring", "30px 'Paytone One'", "#3300CC");
	this.text.lineHeight = 44;
	this.text.lineWidth = 411;
	this.text.parent = this;
	this.text.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.scoring, new cjs.Rectangle(0,0,415,45.9), null);


(lib.place = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("place", "30px 'Paytone One'", "#FF3300");
	this.text.lineHeight = 44;
	this.text.lineWidth = 84;
	this.text.parent = this;
	this.text.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.place, new cjs.Rectangle(0,0,88,45.9), null);


(lib.chosen_letters = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("chosen_letters", "30px 'Changa One'", "#524F4E");
	this.text.lineHeight = 34;
	this.text.lineWidth = 210;
	this.text.parent = this;
	this.text.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.chosen_letters, new cjs.Rectangle(0,0,214,39.2), null);


// stage content:
(lib.hangmanhtml5_2020_HTML5Canvas2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {beginning:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
		
		var GAME = function () {
		    this._highScore = 0;
		    this._textFormat = null;
		    this.alphabet = null;
		    this.answer = null;
		    this.GameLog;
		    this.btnChoiceContainer = null;
		    this.buttonChoiceHistory = null;
		    this.buttonChoices = null;
		    this.choice = null;
		    this.chosenButton = null;
		    this.chosenLetter = null;
		    this.chosenLetterClip = null;
		    this.dashedStr = null;
		    this.firstRun = null;
		    this.gallowsCount = null;
		    this.GUI = null;
		    this.n1 = null;
		    this.notfound = null;
		    this.stage = null;
		    this.stageH = null;
		    this.globalScale = null;
		    this.stageW = null;
		    this.score = null;
		    this.starting = null;
		    this.steps = null;
		    this.tombstone = null;
		    this.wordbank_arr = null;
		    this._self = this;
		    this.borderW = 0;
		    this.scrollW = 25;
		    this.cardSpinner;
		    this.gallows;
		    this.CanvasDom;
		    this.TheStage;
		    this.InterfaceDisplayPieces;
		    this.StageContents;
		    this.StageContentsSizer;
		    this.DisplayItemArr;
		    this.LoadingText;
		    this.PrimoPreload;
		    this.w;
		    this.h;
		    this.initWidth = 640;
		    this.initHeight = 400;
		    this.isResizing = null;
		    this.verdict;
		    this.dashedArr = [];
		    this.padding = 16;
		    this.isPlayerDead = false;
		    this.hasWon = false;
		    this.interactRematch = null;
		
		    this.buttonsList = [];
		    this.btnAlignment = {};
		    this.theCenter = {};
		    this.btnAlignment.top = undefined;
		    this.btnAlignment.bottom = undefined;
		    this.btnAlignment.left = undefined;
		    this.btnAlignment.right = undefined;
		    this.btnAlignment.center = undefined;
		};
		
		GAME.constructor = GAME;
		var GameData = new GAME();
		
		(function () {
		    initGame();
		})();
		
		function initGame() {
		    createjs.Ticker.addEventListener("tick", handleTick);
		    //createjs.Touch.enable(stage);
		
		    GameData.DisplayItemArr = [];
		    GameData.CanvasDom = document.querySelector("canvas");
		
		    GameData.TheStage = new createjs.Stage(GameData.CanvasDom, {});
		    GameData.TheStage.name = "TheStage";
		    window.addEventListener("resize", startResize);
		
		    if (
		        GameData.CanvasDom.clientHeight < GameData.initHeight ||
		        GameData.CanvasDom.clientWidth < GameData.initWidth
		    ) {
		        GameData.w = GameData.initWidth;
		        GameData.h = GameData.initHeight;
		    } else {
		        GameData.CanvasDom.width = GameData.CanvasDom.clientWidth;
		        GameData.CanvasDom.height = GameData.CanvasDom.clientHeight;
		        GameData.w = GameData.CanvasDom.width;
		        GameData.h = GameData.CanvasDom.height;
		    }
		    prepPreloader();
		}
		
		function startHangman() {
		    GameData.startBtn.removeEventListener("click", startHangman);
		    fadeItem(GameData.startBtn, 150, 650, "out", getXMLdata);
		}
		
		function isChoiceInAnswer(chosen) {
		    var testCase = new RegExp(chosen, "gi");
		    var result = testCase.test(GameData.answer);
		    return result;
		}
		
		function areDashesLeftInPuzzle() {
		    var testCase = new RegExp("_", "gi");
		    var result = testCase.test(GameData.dashedGuess.getChildAt(0).text);
		    return result;
		}
		
		function foundLetterInAnswer(letter) {
		    //console.log("::: ██foundLetterInAnswer██ :::");
		    for (var i = 0; i < GameData.dashedArr.length; i++) {
		        if (GameData.answer.charAt(i).toLowerCase() === letter.toLowerCase()) {
		            GameData.dashedArr[i] = letter;
		        }
		    }
		    return GameData.dashedArr;
		}
		
		function createDashedStrArr() {
		    GameData.dashedArr = [];
		    for (var i = 0; i < GameData.answer.length; i++) {
		        GameData.dashedArr.push("_");
		    }
		    // logIt(GameData.answer);
		    return GameData.dashedArr;
		}
		
		function handleLetterClick(e) {
		    var theLetter = e.target.letter_choice;
		    GameData.chosenButton = e.target.parent;
		    GameData.choice = e.target.parent.btnID;
		    GameData.chosenLetter = theLetter;
		
		    e.target.enabled = false;
		    GameData.chosenButton.enabled = false;
		
		    GameData.stage.dispatchEvent("choseLetter");
		}
		
		function calcLetterChoice(e) {
		    if (GameData.gallowsCount === null) {
		        GameData.gallowsCount = 0;
		    }
		    if (isChoiceInAnswer(GameData.chosenLetter)) {
		        reportCorrectChoice(true);
		        GameData.dashedGuess.getChildAt(0).text = foundLetterInAnswer(
		            GameData.chosenLetter
		        ).join("");
		    } else {
		        reportCorrectChoice(false);
		        if (!GameData.gallows.visible) {
		            GameData.gallows.visible = true;
		        }
		        if (GameData.gallowsCount < GameData.steps.length) {
		            GameData.gallows.gotoAndStop(GameData.gallowsCount);
		            GameData.gallowsCount++;
		        }
		    }
		    if (!areDashesLeftInPuzzle()) {
		        GameData.hasWon = true;
		        GameData.stage.dispatchEvent("endGame");
		    }
		    if (GameData.gallowsCount >= GameData.steps.length) {
		        GameData.gallows.visible = true;
		        GameData.isPlayerDead = true;
		        GameData.stage.dispatchEvent("endGame");
		    }
		
		    GameData.chosenLetterClip.getChildAt(0).text += GameData.chosenLetter + " ";
		    // GameData.chosenButton.enabled = false;
		    fadeItem(GameData.chosenButton, 0, 0, "out");
		    /*   console.log(
		        " chosen letter number: " +
		            GameData.choice +
		            " chosen letter: " +
		            GameData.chosenLetter +
		            " " +
		            GameData.buttonChoices[e.target.parent.btnID]
		    ); */
		}
		
		function showPuzzle() {
		    showAllButtonChoices();
		    GameData.btnChoiceContainer.visible = true;
		    GameData.chosenLetterClip.getChildAt(0).text = "";
		    GameData.chosenLetterClip.visible = true;
		    GameData.dashedGuess.visible = true;
		    GameData.dashedGuess.getChildAt(0).text = "";
		    GameData.dashedGuess.getChildAt(0).text = createDashedStrArr().join("");
		    GameData.outcomeMSG.getChildAt(0).text =
		        '"' + GameData.answer + '"' + " was the answer";
		    GameData.outcomeMSG.getChildAt(0).x = GameData.w * 0.5;
		    GameData.outcomeMSG.y = GameData.theCenter.y - GameData.padding * 8;
		    fadeItem(GameData.InterfaceDisplayPieces, 0, 0, "in");
		}
		
		function getRandomWord() {
		    GameData.answer =
		        GameData.wordbank_arr[
		            Math.floor(Math.random() * GameData.wordbank_arr.length)
		        ];
		    return GameData.answer;
		}
		
		function populateGUI(e) {
		    // console.log(":::  populateGUI  :::");
		    GameData.InterfaceDisplayPieces = createContainer("interactives");
		    getRandomWord();
		    //death screen
		    var scoring = new lib.scoring();
		    scoring.x = GameData.w / 2 + GameData.padding * 2;
		    scoring.y = GameData.h / 2 + GameData.padding * 2;
		    scoring.visible = false;
		    GameData.score = scoring;
		    GameData.score.getChildAt(0).text = "Score: 0";
		    GameData.score.visible = true;
		
		    GameData.score.x =
		        GameData.w - GameData.padding - GameData.score.getBounds().width;
		    GameData.score.y = GameData.score.getBounds().height / 2;
		    //death screen
		    var tombstone = new lib.tombstone();
		    tombstone.x = GameData.w / 2 + GameData.padding * 2;
		    tombstone.y = GameData.h / 2 + GameData.padding * 2;
		    tombstone.visible = false;
		    GameData.deadScreen = tombstone;
		
		    //upper right
		    var verdict_txt = new lib.verdict_txt();
		    var dashedGuessStr = new lib.place();
		    var chosen_letters = new lib.chosen_letters();
		    verdict_txt.name = "verdict_txt";
		    dashedGuessStr.name = "place";
		    chosen_letters.name = "chosen_letters";
		    /*set up pointers for the parts*/
		    GameData.GUI.addChild(GameData.InterfaceDisplayPieces);
		
		    GameData.GameLog = createTextField(
		        " ",
		        "#000000",
		        "16px Roboto",
		        "left"
		    );
		    GameData.GameLog._name = "game_log";
		    GameData.GUI.addChild(GameData.GameLog);
		
		    GameData.InterfaceDisplayPieces.addChild(verdict_txt);
		    GameData.InterfaceDisplayPieces.addChild(dashedGuessStr);
		    GameData.InterfaceDisplayPieces.addChild(chosen_letters);
		    GameData.GUI.addChild(scoring);
		    /* ask for a rematch */
		    GameData.interactRematch = createContainer("rematch");
		    var rmBtn = createButtonLink(
		        GameData.interactRematch,
		        "rematch_btn",
		        320,
		        GameData.padding * 2,
		        " CLICK FOR A REMATCH ",
		        '24px "Changa One"',
		        GameData.w / 2,
		        GameData.h / 2,
		        "left",
		        "#FFFFFF",
		        "#2286b7",
		        8,
		        "",
		        "",
		        "click",
		        restartGame
		    );
		
		    GameData.interactRematch.visible = false;
		
		    GameData.btnChoiceContainer = createContainer("buttonHolderClip");
		    GameData.GUI.addChild(GameData.btnChoiceContainer);
		
		    var gallowsSheet = GameData.TheLoader.getResult("gallows");
		    GameData.gallows = new createjs.Sprite(gallowsSheet);
		    GameData.gallows.visible = true;
		
		    var gallowCont = createContainer("gallowsContainer");
		    gallowCont.addChild(GameData.gallows);
		    GameData.DisplayItemArr.push(GameData.gallows);
		    GameData.GUI.addChild(gallowCont);
		
		    GameData.GUI.addChild(GameData.deadScreen);
		    GameData.GUI.addChild(GameData.interactRematch);
		    GameData.chosenLetterClip = chosen_letters;
		
		    GameData.chosenLetterClip.x =
		        GameData.w -
		        GameData.chosenLetterClip.getBounds().width -
		        GameData.padding * 5;
		    GameData.chosenLetterClip.y =
		        GameData.h -
		        GameData.chosenLetterClip.getBounds().height -
		        GameData.padding * 7;
		    GameData.dashedGuess = dashedGuessStr;
		    GameData.dashedGuess.x = GameData.padding * 5;
		    GameData.dashedGuess.y = GameData.padding * 5;
		    GameData.outcomeMSG = verdict_txt;
		
		    GameData.outcomeMSG.getChildAt(0).text =
		        GameData.answer + " was the answer";
		    dashedGuessStr.getChildAt(0).text = "XXXXXXXXXXXXXXXXXXXXXX";
		    GameData.chosenLetterClip.getChildAt(0).text = "XXXXXXXXXXXXXXXXXXXXXX";
		    GameData.outcomeMSG.name = "outcome";
		
		    GameData.gallows.regX = 0;
		    GameData.gallows.regY = 0;
		    GameData.gallows.x =
		        GameData.gallows.getBounds().width + GameData.padding * 10;
		    GameData.gallows.y = GameData.h * 0.3 + GameData.padding * 6;
		
		    GameData.gallows.visible = false;
		    GameData.outcomeMSG.visible = false;
		    dashedGuessStr.visible = false;
		    GameData.chosenLetterClip.visible = false;
		
		    GameData.outcomeMSG.getChildAt(0).text = "";
		    dashedGuessStr.getChildAt(0).text = "";
		    GameData.chosenLetterClip.getChildAt(0).text = "";
		    var buttonHolderClip = GameData.btnChoiceContainer;
		
		    GameData.InterfaceDisplayPieces.addChild(buttonHolderClip);
		    buttonHolderClip.visible = !buttonHolderClip.visible;
		    var letters = GameData.alphabet.split("");
		    var len = letters.length;
		
		    var rows = 0;
		    var cols = 0;
		    var bW = 48;
		    var bH = 48;
		    for (var i = 0; i < len; i++) {
		        GameData.buttonChoices.push(
		            createButtonLink(
		                buttonHolderClip,
		                "btn_choice_" + letters[i],
		                bW,
		                bH,
		                letters[i],
		                '24px "Changa One"',
		                0,
		                0,
		                "left",
		                "#FFFFFF",
		                "#450067",
		                8,
		                "",
		                "",
		                "click",
		                handleLetterClick,
		                { btnID: i, letter_choice: letters[i] }
		            )
		        );
		        var cBtn = GameData.buttonChoices[i];
		        buttonHolderClip.addChild(cBtn);
		
		        var baseW = 400;
		        var lastX;
		        if (cBtn == GameData.buttonChoices[0]) {
		            lastButton = GameData.buttonChoices[0];
		            lastX = 0;
		        } else {
		            lastX = cols * bW + (cols * GameData.padding) / 4;
		        }
		
		        if (lastX >= baseW - (bW + GameData.padding / 2)) {
		            rows += 1;
		            lastX = 0;
		            cols = 0;
		        }
		        cols += 1;
		
		        GameData.buttonChoices[i].name = letters[i];
		        GameData.buttonChoices[i].x = lastX + Math.round(GameData.padding / 4);
		        GameData.buttonChoices[i].y =
		            rows * (bH + GameData.padding / 4) +
		            Math.round(GameData.padding / 4);
		    }
		    //position the button choices lower left:
		
		    /* console.log(" GameData.StageContentsSizer: ", GameData.StageContentsSizer); */
		
		    buttonHolderClip.x =
		        GameData.w - buttonHolderClip.getBounds().width - GameData.padding * 3;
		    buttonHolderClip.y =
		        GameData.h -
		        buttonHolderClip.getBounds().height -
		        GameData.padding * 12;
		    // strokeMe(buttonHolderClip);
		
		    GameData.stage.dispatchEvent("showThePuzzle");
		}
		
		function endGame() {
		    // console.log("::: ██ endGame ██ :::");
		    reportHiScore();
		    if (GameData.hasWon) {
		        // logIt("██ WINNER!! ██");
		        fadeItem(GameData.outcomeMSG, 0, 250, "in", showEndScreen);
		    }
		    if (GameData.isPlayerDead) {
		        // logIt("██ GAME OVER MAN!! ██");
		        fadeItem(GameData.outcomeMSG, 0, 250, "in");
		        fadeItem(GameData.deadScreen, 0, 250, "in", showEndScreen);
		    }
		}
		
		function reportHiScore() {
		    //console.log(":::reportHiScore:::");
		    if (GameData.hasWon) {
		        GameData._highScore += 200;
		    } else {
		        if (GameData._highScore > 0) {
		            GameData._highScore -= 200;
		        } else {
		            GameData._highScore = 0;
		        }
		    }
		
		    GameData.score.getChildAt(0).text = "Score: " + GameData._highScore;
		    GameData.score.x =
		        GameData.w - GameData.padding - GameData.score.getBounds().width;
		}
		
		function reportCorrectChoice(param) {
		    /* console.log(":::reportCorrectChoice:::");
		    param
		        ? logIt(
		              "you made a correct choice of " + GameData.chosenLetter.toString()
		          )
		        : logIt(
		              "you made a terrible choice of " +
		                  GameData.chosenLetter.toString()
		          ); */
		}
		
		function showEndScreen() {
		    // logIt(":::showEndScreen:::");
		    if (GameData.hasWon) {
		        //  fadeItem(GameData.outcomeMSG, 750, 250, "out", askForRematch);
		        askForRematch();
		    } else {
		        //   fadeItem(GameData.deadScreen, 750, 250, "out", askForRematch);
		        askForRematch();
		    }
		    //fadeItem(GameData.InterfaceDisplayPieces, 500, 250, "out");
		    fadeItem(GameData.btnChoiceContainer, 0, 250, "out");
		    fadeItem(GameData.dashedGuess, 0, 250, "out");
		    fadeItem(GameData.chosenLetterClip, 0, 250, "out");
		    GameData.gallows.visible = false;
		}
		
		function showAllButtonChoices() {
		    for (var i = 0; i < GameData.buttonChoices.length; i++) {
		        fadeItem(GameData.buttonChoices[i], 0, 0, "in");
		        GameData.buttonChoices[i].enabled = true;
		    }
		}
		
		function askForRematch(e) {
		    // console.log(":::askForRematch:::");
		    // logIt("want a rematch?");
		    fadeItem(GameData.interactRematch, 500, 250, "in");
		}
		
		function restartGame(e) {
		    // logIt("::: ██ restartGame ██ :::");
		    GameData.hasWon = false;
		    GameData.isPlayerDead = false;
		    GameData.gallowsCount = 0;
		    GameData.outcomeMSG.visible = false;
		    GameData.deadScreen.visible = false;
		    GameData.gallows.gotoAndStop("gallowbottom");
		    GameData.gallows.visible = false;
		    GameData.dashedGuess.text = "";
		    GameData.dashedGuess.text = createDashedStrArr().join("");
		  //  GameData.GameLog.text = "Game Log:";
		  GameData.GameLog.text = "";
		
		    fadeItem(GameData.btnChoiceContainer, 0, 250, "in");
		    fadeItem(GameData.dashedGuess, 0, 250, "in");
		    fadeItem(GameData.chosenLetterClip, 0, 250, "in");
		
		    fadeItem(GameData.interactRematch, 0, 250, "out", showPuzzle);
		    getRandomWord();
		}
		
		function primeGame() {
		    // GameData.GameLog.text = "";
		    GameData.buttonChoiceHistory = [];
		    GameData.choice = 0;
		    GameData.chosenButton = [];
		    GameData.chosenLetter = "";
		    GameData.answer = "";
		    GameData.firstRun = true;
		    GameData.starting = false;
		    GameData.gallowsCount = null;
		    GameData.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		    GameData.n1 = 0;
		    GameData.steps = [
		        "gallowbottom",
		        "gallowback",
		        "gallowtop",
		        "rope",
		        "body",
		        "rightleg",
		        "leftleg",
		        "leftarm",
		        "rightarm",
		        "head",
		    ];
		    GameData.notfound = false;
		    GameData.wordbank_arr = [];
		    GameData.chosenLetterClip = null;
		    GameData.dashedGuess = null;
		    GameData.outcomeMSG = null;
		    GameData.deadScreen = null;
		    GameData.stageW = stage.canvas.width;
		    GameData.stageH = stage.canvas.height;
		    GameData.globalScale = 1;
		    GameData.GUI = GameData.StageContents;
		    GameData.buttonChoices = [];
		    this.stage = GameData.TheStage;
		    GameData.stage = this.stage;
		    GameData.stage.addEventListener("choseLetter", calcLetterChoice);
		    GameData.stage.addEventListener("die", endGame);
		    GameData.stage.addEventListener("endGame", endGame);
		    GameData.stage.addEventListener("replay", restartGame);
		    GameData.stage.addEventListener("showThePuzzle", showPuzzle);
		    GameData.stage.addEventListener("loadedXML", populateGUI);
		    createGUI();
		}
		
		function createGUI() {
		    var textColor = "#FFFFFF";
		    var btnColor = "#2286b7";
		
		    var btnW = Math.max(185, GameData.w * 0.25);
		    var btnH = GameData.padding * 2;
		
		    var gameStartButton = createEmptyMC("gameStartButton");
		    GameData.GUI.addChild(gameStartButton);
		    GameData.startBtn = createButtonLink(
		        gameStartButton,
		        "start_game_btn" + "0",
		        btnW,
		        btnH,
		        " START THE GAME ",
		        '24px "Changa One"',
		        GameData.w / 2,
		        GameData.h / 2,
		        "left",
		        textColor,
		        btnColor,
		        GameData.padding,
		        GameData.btnAlignment,
		        "",
		        "",
		        null
		    );
		    GameData.startBtn = gameStartButton;
		    GameData.startBtn.addEventListener("click", startHangman);
		
		    GameData.theCenter = {
		        x: parseInt(GameData.w / 2),
		        y: parseInt(GameData.h / 2),
		    };
		
		    return GameData;
		}
		
		function layoutGui() {
		  // console.log("Layout the GUI");
		    //start game when loading text disappears, avoid conflict with the event on fade complete
		    fadeItem(GameData.LoadingText, 650, 650, "out", startGame);
		}
		
		function startGame() {
		    GameData.LoadingText.text = "LOADING: " + 0 + "%";
		   // console.log("game, started!");
		    primeGame();
		}
		
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*████████████           CONTENT BELOW IS CORE CONTENT        ██████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		/*██████████████████████████████████████████████████████████████████████████████████████*/
		
		function prepPreloader() {
		    GameData.StageContents = createContainer("StageContents");
		    GameData.StageContentsSizer = createShape("StageContentsSizer");
		    /*   drawBackground(
		        GameData.StageContentsSizer,
		        "transparent",
		        "transparent",
		        GameData.borderW
		    ); */
		    drawBackground(
		        GameData.StageContentsSizer,
		        "#FFCC00",
		        "#000000",
		        GameData.borderW
		    );
		    GameData.LoadingText = new createjs.Text(
		        "LOADING...100%",
		        Math.max(12, GameData.initWidth * 0.0625) + "px Changa One",
		        "#4d80FF"
		    );
		    GameData.LoadingText.visible = false;
		    GameData.LoadingText.text = "LOADING...100%";
		
		    GameData.LoadingText.regX = GameData.LoadingText.getMeasuredWidth() * 0.5;
		    GameData.LoadingText.regY = GameData.LoadingText.getMeasuredHeight() * 0.5;
		
		    GameData.LoadingText.x = GameData.w / 2;
		    GameData.LoadingText.y = GameData.h / 2;
		
		    GameData.LoadingText.text = "LOADING...0";
		    GameData.LoadingText.visible = true;
		
		    GameData.StageContents.addChild(GameData.StageContentsSizer);
		    GameData.StageContents.addChild(GameData.LoadingText);
		    GameData.TheStage.addChild(GameData.StageContents);
		    GameData.TheStage.x = 0;
		
		    var preloadedStuff = new createjs.LoadQueue();
		    preloadedStuff.addEventListener("complete", preloadStuff);
		    var animatedPreloader = [
		        {
		            id: "card_turn",
		            src: "../images/card-turn.json",
		            type: "spritesheet",
		            crossOrigin: true,
		        },
		    ];
		    GameData.PrimoPreload = preloadedStuff;
		    preloadedStuff.loadManifest(animatedPreloader, true);
		}
		
		function handleTick(event) {
		    // Actions carried out each tick (aka frame)
		    if (!event.paused) {
		        // Actions carried out when the Ticker is not paused.
		        GameData.TheStage.update();
		    }
		}
		
		function performResizeDuties() {
		    clearTimeout(GameData.isResizing);
		    GameData.isResizing = null;
		    // console.log("performResizeDuties");
		    calcResizeDims();
		    GameData.StageContentsSizer.graphics.clear();
		    for (var i = 0; i < GameData.DisplayItemArr.length; i++) {
		        GameData.DisplayItemArr[i].scaleX = GameData.DisplayItemArr[i].scaleY =
		            GameData.globalScale;
		    }
		
		    drawBackground(
		        GameData.StageContentsSizer,
		        "#FFCC00",
		        "#000000",
		        GameData.borderW
		    );
		    /* console.log(
		        "GameData.StageContentsSizer.graphics: ",
		        GameData.StageContentsSizer.graphics
		    ); */
		
		    GameData.TheStage.update();
		}
		
		function preloadStuff() {
		    GameData.PrimoPreload.removeAllEventListeners();
		
		    var preload = new createjs.LoadQueue();
		    preload.addEventListener("progress", preloadProgress);
		    preload.addEventListener("complete", layoutGui);
		    var manifest1 = [
		        { id: "circle", src: "../images/cards-copy/card_circle.png" },
		        { id: "diamond", src: "../images/cards-copy/card_diamond.png" },
		        { id: "spade", src: "../images/cards-copy/card_spade.png" },
		        { id: "square", src: "../images/cards-copy/card_square.png" },
		        { id: "star", src: "../images/cards-copy/card_star.png" },
		        { id: "triangle", src: "../images/cards-copy/card_triangle.png" },
		        { id: "wavey", src: "../images/cards-copy/card_wavey_lines.png" },
		        { id: "back", src: "../images/cards-copy/card_back.png" },
		        {
		            id: "gallows",
		            src: "../images/gallows.json",
		            type: "spritesheet",
		            crossOrigin: true,
		        },
		        {
		            id: "slot-symbols",
		            src: "../images/slot-symbols.json",
		            type: "spritesheet",
		            crossOrigin: true,
		        },
		    ];
		    preload.loadManifest(manifest1, true);
		    GameData.TheLoader = preload;
		
		    GameData.StageContentsSizer.graphics.clear();
		    drawBackground(
		        GameData.StageContentsSizer,
		        "#FFCC00",
		        "#000000",
		        GameData.borderW
		    );
		    /*  drawBackground(
		        GameData.StageContentsSizer,
		        "transparent",
		        "transparent",
		        GameData.borderW
		    ); */
		
		    GameData.TheStage.x = 0;
		
		    /*
		    cardSpinner = new createjs.Sprite(PrimoPreload.getResult("card_turn"));
		    cardSpinner.scale = 0.333;
		    //cardSpinner.play();
		    cardSpinner.gotoAndStop(12);
		  GameData.  TheStage.addChild(cardSpinner);
		*/
		    performResizeDuties();
		}
		
		function preloadProgress(e) {
		    GameData.LoadingText.text =
		        "LOADING: " + Math.floor(e.progress * 100) + "%";
		    var loadTextW = GameData.LoadingText.getMeasuredWidth();
		    var loadTextH = GameData.LoadingText.getMeasuredHeight();
		
		    GameData.LoadingText.regX = loadTextW * 0.5;
		    GameData.LoadingText.regY = loadTextH * 0.5;
		
		    GameData.LoadingText.x = GameData.w / 2;
		    GameData.LoadingText.y = GameData.h / 2;
		}
		
		function getXMLdata(e) {
		  //  console.log("::: ██ getXMLdata ██ :::");
		    var queue = new createjs.LoadQueue(true);
		    queue.on("fileload", loadGameData, this);
		    queue.loadFile({
		        src: "hangman_words.xml",
		        type: createjs.Types.XML,
		    });
		    queue.load();
		}
		
		function loadGameData(e) {
		    var rawXML = e.result.firstChild;
		
		    var len = rawXML.childNodes.length;
		    GameData.wordbank_arr = [];
		    for (var i = 0; i < len; i++) {
		        if (rawXML.getElementsByTagName("term")[i] !== undefined) {
		            GameData.wordbank_arr.push(
		                rawXML.getElementsByTagName("term")[i].childNodes[0].nodeValue
		            );
		        }
		    }
		    GameData.stage.dispatchEvent("loadedXML");
		}
		
		function createShape(name) {
		    var spawn = new createjs.Shape();
		    spawn.name = name || "shape_" + Math.ceil(Math.random() * 20000);
		    return spawn;
		}
		
		function createContainer(name) {
		    var spawn = new createjs.Container();
		    spawn.name = name || "container_" + Math.ceil(Math.random() * 20000);
		    return spawn;
		}
		
		function createEmptyMC(name) {
		    var spawn = new createjs.MovieClip();
		    spawn.name = name || "mc_" + Math.ceil(Math.random() * 20000);
		    return spawn;
		}
		
		function logIt(param) {
		    if (!GameData.GameLog) {
		        console.log(param);
		    } else {
		        GameData.GameLog.text += "\n" + param;
		    }
		}
		
		function strokeMe(strokedScope) {
		    //TODO: doesn't work on text objects. find a way around that?
		    if (strokedScope.getMetrics !== undefined) {
		        var shape = createShape();
		        strokedScope.parent.addChild(shape);
		        shape.graphics.beginFill("rgba(255,125,25,0.5)");
		        shape.graphics.drawRect(
		            0,
		            0,
		            strokedScope.getMetrics().width,
		            strokedScope.getMetrics().height
		        );
		        shape.graphics.endFill();
		        shape.regX = strokedScope.getMetrics().width * 0.5;
		        shape.x =
		            strokedScope.parent.parent.getBounds().width * 0.5 -
		            strokedScope.getMetrics().width * 0.5;
		    } else {
		        var shape = createShape();
		        strokedScope.addChild(shape);
		        // shape.graphics.beginFill("FF0C00");
		        shape.graphics.beginFill("rgba(255,125,25,0.5)");
		        shape.graphics.drawRect(
		            0,
		            0,
		            strokedScope.getBounds().width,
		            strokedScope.getBounds().height
		        );
		        shape.graphics.endFill();
		    }
		}
		
		function getDims(tgt) {
		    var dims = {};
		    /*  
		    this entire part needs to be rewritten
		    try {
		        dims = {
		            _x: tgt.graphics.command.x,
		            _y: tgt.graphics.command.y,
		            width: tgt.graphics.command.w,
		            height: tgt.graphics.command.h,
		        };
		    } catch (err) {
		        var temp = tgt.getBounds();
		        if (temp === null) {
		            if (tgt.canvas === undefined) {
		                return (dims = {
		                    _x: 0,
		                    _y: 0,
		                    width: tgt.width,
		                    height: tgt.height,
		                });
		            } else { 
		                return (dims = {
		                    _x: 0,
		                    _y: 0,
		                    width: tgt.canvas.width,
		                    height: tgt.canvas.height,
		                });
		            }
		        }
		        dims = {
		            _x: temp.x,
		            _y: temp.y,
		            width: temp.width,
		            height: temp.height,
		        };
		    } */
		    dims.width = tgt.width;
		    dims.height = tgt.height;
		    return dims;
		}
		
		function createButtonLink(
		    scope,
		    btnInstance,
		    _maxW,
		    _maxH,
		    _sumText,
		    _txtFont,
		    _x,
		    _y,
		    _txtAlign,
		    _tColor,
		    _btnColor,
		    _padding,
		    _btnAlignment,
		    _linkref,
		    _evt,
		    _callBackFunc,
		    extra_data
		) {
		    var btnContainer = createContainer();
		    var btn = createShape(btnInstance);
		    /*
				btn["btnSkin"] = new createjs.Shape();
				var btnSkin = btn["btnSkin"];
				btnSkin.graphics.beginStroke("#00FF00");
				btnSkin.graphics.setStrokeStyle(3);
				btnSkin.graphics.beginFill("#FFCC00").drawRoundRectComplex(0, 0, _maxW, _maxH, 3, 3, 3, 3);
				btn.addChild(btnSkin);	
			*/
		    var borderW = 2;
		    var brdrColor = "#FFFFFF";
		    var radiusTL = 3;
		    var radiusTR = 3;
		    var radiusBR = 3;
		    var radiusBL = 3;
		
		    btn.graphics
		        .beginStroke(brdrColor)
		        .setStrokeStyle(borderW)
		        .beginFill(_btnColor);
		
		    /*    btn.graphics.drawRect(
		        0,
		        0,
		        _maxW,
		        _maxH
		    ); */
		
		    btn.graphics.drawRoundRectComplex(
		        _x - _maxW / 2,
		        _y - _maxH / 2,
		        _maxW,
		        _maxH,
		        radiusTL,
		        radiusTR,
		        radiusBR,
		        radiusBL
		    );
		
		    var _someText = _sumText;
		    var _color = _tColor;
		    var _font = _txtFont;
		    var _align = _txtAlign;
		    var fl_TF = createTextField(_someText, _color, _font, _align);
		    var fl_TFW = fl_TF.getMeasuredWidth();
		    var fl_TFH = fl_TF.getMeasuredHeight();
		
		    btnContainer.addChild(btn);
		    btnContainer.addChild(fl_TF);
		    scope.addChild(btnContainer);
		
		    var btnW = btnContainer.getBounds().width;
		    var btnH = btnContainer.getBounds().height;
		
		    fl_TF.regX = fl_TFW * 0.5;
		    fl_TF.regY = fl_TFH * 0.5;
		    if (_txtAlign === "center") {
		        fl_TF.x = _x;
		        fl_TF.y = _y;
		    } else if (_txtAlign === "left") {
		        fl_TF.x = _x;
		        -fl_TFW / 2;
		        fl_TF.y = _y;
		    }
		
		    GameData.buttonsList.push(btn);
		
		    if (_evt !== "") {
		        btnContainer.addEventListener(_evt, _callBackFunc.bind(btnContainer));
		    }
		    if (extra_data !== "") {
		        for (var prop in extra_data) {
		            btn[prop] = extra_data[prop];
		        }
		    }
		
		    return btnContainer;
		}
		
		function createTextField(_txt, _color, _font, _tAlign) {
		    var fl_TF = new createjs.Text();
		    fl_TF.text = _txt;
		    fl_TF.color = _color;
		    fl_TF.font = _font;
		    fl_TF.textAlign = _tAlign; /*"left" or "center", IE*/
		    fl_TF.mouseEnabled = false;
		    return fl_TF;
		}
		
		function changeColor() {
		    //fillCommand.style = "#450067";
		    var matrix = new createjs.ColorMatrix()
		        .adjustHue(180)
		        .adjustSaturation(100);
		    shape.filters = [new createjs.ColorMatrixFilter(matrix)];
		    shape.applyFilter(shape.filters[0]);
		    shape.cache(-50, -50, 100, 100);
		}
		
		function startResize(e) {
		    clearTimeout(GameData.isResizing);
		    GameData.isResizing = setTimeout(performResizeDuties, 150);
		}
		
		function calcResizeDims() {
		    stage_aspect_ratio = GameData.w / GameData.h;
		
		    var containerWidth = window.innerWidth;
		    var containerHeight = window.innerHeight;
		    var containerAspectRatio = containerWidth / containerHeight;
		
		    if (containerAspectRatio > stage_aspect_ratio) {
		        GameData.CanvasDom.height = containerHeight;
		        GameData.CanvasDom.width = containerHeight * stage_aspect_ratio;
		    } else {
		        GameData.CanvasDom.width = containerWidth;
		        GameData.CanvasDom.height = containerWidth / stage_aspect_ratio;
		    }
		
		    var scale = GameData.CanvasDom.width / GameData.w;
		    GameData.TheStage.scaleX = scale;
		    GameData.TheStage.scaleY = scale;
		    GameData.globalScale = scale;
		    return scale;
		}
		
		function drawBackground(scope, fillColor, strokeColor, borderWidth) {
		    var halfStroke = Math.round(borderWidth / 2);
		    scope.graphics.beginStroke(strokeColor);
		    scope.graphics.setStrokeStyle(borderWidth);
		    scope.graphics
		        .beginFill(fillColor)
		        .drawRect(
		            halfStroke,
		            halfStroke,
		            GameData.w - borderWidth,
		            GameData.h - borderWidth
		        )
		        .endFill();
		}
		
		function fadeItem(item, delay, transitiontime, direction, callback) {
		    if (direction === "out") {
		        createjs.Tween.get(item)
		            .wait(delay)
		            .to({ alpha: 0, visible: false }, transitiontime)
		            .call(callback || handleComplete);
		    } else if (direction === "in") {
		        createjs.Tween.get(item)
		            .wait(delay)
		            .to({ alpha: 1, visible: true }, transitiontime)
		            .call(callback || handleComplete);
		    }
		    function handleComplete() {
		        //Tween complete
		        //console.log(" completed fading animation for " + item);
		        checkIfPlayerDied();
		    }
		}
		
		function checkIfPlayerDied() {
		    return GameData.isPlayerDead ? true : false;
		}
		
		/*
		#A49D9B -- blank background color
		a panel class
		button class (kind of alread has this)
		a class for formats (text)
		*/
		
		/*startBtn properties*/
		/*
		var stageW = document.querySelector("#animation_container").style.width;
		var stageH = document.querySelector("#animation_container").style.height;
		*/
		/*TODO:
		look into the button helper class:
			ButtonHelper Class
			https://createjs.com/docs/easeljs/classes/ButtonHelper.html
			*/
		/*button helper class
		var helper = new createjs.ButtonHelper(startBtn, "out", "over", "down", false, startBtn, "hit");
		startBtn.addEventListener("click", handleClick);
		function handleClick(event) {
			event.target.removeEventListener("click", handleClick);
			startHangman();
		}*/
		/*
		TODO:
		make a class for any stage element that uses .width and .height so it functions like the good old days
		*/
		/*
				var GUI = new createjs.MovieClip({
					loop: -1,
					labels: {
						start: 0,
						middle: 20
					}
				});
			*/
		/*
		for the durham slot machine:
		checkRange:
		
		function checkRange(value,lowerBounds, upperBounds){
			if(value >=lowerBounds &&value <=upperBounds){
				return value;
			}
			else{
				return !value;
			}
		}
		
		
		outcome[spin] =Math.floor((Math.random()*65)+1);
		
		//within switch:
		blank:checkRange(outcome[spin],1,27) //  41.5% prob
		grapes:checkRange(outcome[spin],28,37) //  15.4% prob
		banana:checkRange(outcome[spin],38,46) //   13.8% prob
		orange:checkRange(outcome[spin],47,54) //  12.3% prob
		cherry:checkRange(outcome[spin],55,59) //  7.7% prob
		bar:checkRange(outcome[spin],60,62) //  4.6% prob
		bell:checkRange(outcome[spin],63,64) //  3.1% prob
		seven:checkRange(outcome[spin],65,65) //  1.5% prob
		
		most of the function that's visible from the video:
		COMP125 - M2020 - Lesson 12 - Part 2 - UI Interactivity
		https://youtu.be/DE5_j6yvYks?t=6212
		
		spin.addEventListener --- remember, the "on" is better with EaselJS:
		
		spin.on(
		"click", ()=>
			{
				let reels=Reels();
		
				leftReel.image=assets.getResult(reels[0]) as HTMLImageElement;
				middleReel.image=assets.getResult(reels[1]) as HTMLImageElement;
				rightReel.image=assets.getResult(reels[2]) as HTMLImageElement;
			}
		);
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);
// library properties:
lib.properties = {
	id: 'FE3BCCBD19364D41A156721880A41434',
	width: 640,
	height: 400,
	fps: 24,
	color: "#A49D9B",
	opacity: 1.00,
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
an.compositions['FE3BCCBD19364D41A156721880A41434'] = {
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
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;