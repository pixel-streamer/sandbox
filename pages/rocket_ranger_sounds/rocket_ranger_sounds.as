//#include "rocket_ranger_sounds.as"
//stop();

trace ("hi world");
var musicCollection=[];
var buttonCollection=[];
var buttonHolder=this.createEmptyMovieClip("btnHolder",this.getNextHighestDepth());

function parseLoadedList(success){
	trace ("success: "+success);
	trace ("this._status: "+this.status);
	if (success && this.status===0){
		collectMusic(this.firstChild);
	}
}

function drawBtn(mcScope,increment):MovieClip{
	var mc=mcScope.createEmptyMovieClip("button"+increment,mcScope.getNextHighestDepth());
	var mcTextHolder= mc.createTextField("btnTextHolder", mc.getNextHighestDepth(),0,0,65,33);
	mcTextHolder.autoSize=true;
	mcTextHolder.selectable=false;
	mcTextHolder.text="play sound "+increment;
	mc._x=increment*mc._width;
	mc._y=33;
	return mc;
}

function makeButtons(){
	for (var i=0; i<this.length;i++){
		this["buttonHolder"+i]=buttonHolder.createEmptyMovieClip("buttonHolder"+i,buttonHolder.getNextHighestDepth());
		buttonCollection.push(this["buttonHolder"+i]);
		drawBtn(buttonCollection[i],i);
		buttonCollection[i].onRelease=mx.utils.Delegate.create(musicCollection[i],startSound);
	}
}

function collectMusic(listing){
	for (var i=0; i<listing.childNodes.length;i++){
	//this list isn't nested, so chunk everything into the array
		musicCollection.push(listing.childNodes[i].firstChild.toString());
	}
	startMusic.apply(musicCollection);
	makeButtons.apply(musicCollection);
}

function startMusic(){
	for (var i=0; i<this.length;i++){
		my_sound.onLoad = function(success:Boolean) {
		    if (success) {
		    my_sound.start();
		    status_txt.text = "Sound loaded";
		    } else {
		    status_txt.text = "Sound failed";
		    }
		}
		// load the sound
		
		my_sound.loadSound(this[i],true);
		
		my_sound.onID3 = function() {
		    for (var prop in this[i].id3) {
			   trace(prop + ": " + this[i].id3[prop])
		    }
		}


		this[i]=my_sound;
	}
}

function startSound(){
	for (var something:String in this){
	//	trace (something + " " +this[something]);
		trace (something);
	}
	this.start();
}

function stopSound(){
	//this.stop();
}

//function pauseSound(){}

var something:XML=new XML();
something.ignoreWhite=true;
something.onLoad=parseLoadedList;
something.load("rocket_ranger_sounds.xml");
