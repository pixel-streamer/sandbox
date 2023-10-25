/*
loads sounds from the once popular "rocket ranger"

try concepts of event delegation in javascript from here:
https://www.geeksforgeeks.org/event-delegation-in-javascript/
https://www.geeksforgeeks.org/phases-of-javascript-event/
https://stackoverflow.com/questions/29586046/delegating-a-function-call-in-javascript

		//The C# delegate pattern is available in native JavaScript using context binding.
		//Context binding in JavaScript is done with the .call method. 
		//The function will be called in the context given by the first argument.
		//Example:
		
		function calledFunc() {
		  console.log(this.someProp);
		}

		var myObject = {
		  someProp : 42,
		  doSomething : function() {
			calledFunc.call(this);
		  }
		}

		myObject.doSomething();
		// will write 42 to console;
		
		//TODO: maybe do a pixel_streamer_UI class that makes buttons, and curries the load of "make buttons"
		//"make links" -- that sort of thing.
		//────────
		
		
		//LOOK UP:
		//────────
		//javascript observer pattern
		
		//from https://www.dofactory.com/javascript/design-patterns/observer
		
		
		//
		//The Observer pattern offers a subscription model in which objects subscribe to an event and get notified
		//when the event occurs. This pattern is the cornerstone of event driven programming, including JavaScript.
		//The Observer pattern facilitates good object-oriented design and promotes loose coupling.
		//
		//Using Observer 
		//
		//When building web apps you end up writing many event handlers. Event handlers are functions that will be
		//notified when a certain event fires. These notifications optionally receive an event argument with details
		//about the event (for example the x and y position of the mouse at a click event).
		//
		//The event and event-handler paradigm in JavaScript is the manifestation of the Observer design pattern.
		//Another name for the Observer pattern is Pub/Sub, short for Publication/Subscription. 

*/

console.log("hi world");
var musicCollection = [];
var buttonCollection = [];
var buttonHolder = this.createEmptyMovieClip("btnHolder", this.getNextHighestDepth());

function parseLoadedList(success) {
    console.log("success: " + success);
    console.log("this._status: " + this.status);
    if (success && this.status === 0) {
        collectMusic(this.firstChild);
    }
}

function drawBtn(mcScope, increment) {
    //returns type MovieClip
    var mc = mcScope.createEmptyMovieClip("button" + increment, mcScope.getNextHighestDepth());
    var mcTextHolder = mc.createTextField("btnTextHolder", mc.getNextHighestDepth(), 0, 0, 65, 33);
    mcTextHolder.autoSize = true;
    mcTextHolder.selectable = false;
    mcTextHolder.text = "play sound " + increment;
    mc.x = increment * mc._width;
    mc.y = 33;
    return mc;
}

function makeButtons() {
    for (var i = 0; i < this.length; i++) {
        this["buttonHolder" + i] = buttonHolder.createEmptyMovieClip(
            "buttonHolder" + i,
            buttonHolder.getNextHighestDepth()
        );
        buttonCollection.push(this["buttonHolder" + i]);
        drawBtn(buttonCollection[i], i);
        buttonCollection[i].onRelease = mx.utils.Delegate.create(musicCollection[i], startSound);
    }
}

function collectMusic(listing) {
    for (var i = 0; i < listing.childNodes.length; i++) {
        //this list isn't nested, so chunk everything into the array
        musicCollection.push(listing.childNodes[i].firstChild.toString());
    }
    startMusic.apply(musicCollection);
    makeButtons.apply(musicCollection);
}

function startMusic() {
    for (var i = 0; i < this.length; i++) {
        my_sound.onLoad = function (success) {
            if (success) {
                my_sound.start();
                status_txt.text = "Sound loaded";
            } else {
                status_txt.text = "Sound failed";
            }
        };
        // load the sound

        my_sound.loadSound(this[i], true);

        my_sound.onID3 = function () {
            for (var prop in this[i].id3) {
                console.log(prop + ": " + this[i].id3[prop]);
            }
        };

        this[i] = my_sound;
    }
}

function startSound() {
    for (var something in this) {
        //	console.log (something + " " +this[something]);
        console.log(something);
    }
    this.start();
}

function stopSound() {
    //this.stop();
}

//function pauseSound(){}

var something = new XML();
something.ignoreWhite = true;
something.onLoad = parseLoadedList;
something.load("rocket_ranger_sounds.xml");
