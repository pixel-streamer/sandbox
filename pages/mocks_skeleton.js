/*
a skeleton for the flow of the bat coach


Need to create flows that show someone changing an option that is already set.

show pending image
show edit existing icon
```````````````````````````````````show highlighting of section  (scrapped)
skeleton
--------------------------

Questions:
	Do you know the bat length you will need?
	Do you know the player's height and weight?	
	Do you know the player's age?

BASEBALL
FASTPITCH
SLOWPITCH

if baseball
	What type of bat?
		yes
			display choices for bat type
			
	on event selectAType...
	Ask Bat Length (do you know what length?)
		yes
			display choices for bats matching criterion
			(show filtered list of available lengths for chosen bat types.)
		
		no
			Ask Player Weight //(do you know?)
				yes
					
		
				no
					Ask Player Age

if fastpitch
	Ask Bat Length
		yes

		
		no
			Ask Player Weight //(do you know?)
				yes
				
				
				no
		
else (slowpitch)
	Select Association

	
MAYBE?
---------------------------------------------
What are you swinging now?

If you have somethjing that's too long, or too heavy, then ask the height, weight questions to clarify that.


-3 (is a heavy bat)



end-weighted bat, or not---

are you wanting to hit to left or right of the field



do you know your bat speed?

*/



/*
askQuestion("")

ask question
check answer

if yes:
	next question
	
if no,
	next question
	
choices have to be in the question
specific next questions have to be in the "buttons" of the question
*/


/*

model:
	data (encapsulated)

view:
	display (can see model)

controller (can see the model)
	contains the basic interaction mech for the view/controller relationship usually a 1::1 relationship with the view

*/
//holds all the questions so they can be displayed as iterated through
var qList=[];


function q(){}

var questions=[
	 {	qType:"START"
		,qRname:"start"
		,qText:""
			,choices:
				[
					{qAction:"Click here to start the thing", isPositive:true}
				]
		,nQ:{
				 positive:"sport_detail"
				,negative:"thanks" // default
			}
	 }
	 
	 ,{	qType:"SPORT DETAIL"
		,qRname:"sport_detail"
		,qText:"What sport do you play?"
			,choices:
				[
					 {qAction:"Baseball"  , isPositive:true}
					,{qAction:"Fastpitch" , isPositive:true}
					,{qAction:"Slowpitch" , isPositive:true}
				]
		,nQ:{
				 positive:"bat_type"
				,negative:"thanks"  // default
			}
	 }
	 
	,{	qType:"BAT TYPE"
		,qRname:"bat_type"
		,qText:"What type of bat will you need?"
			,choices:
				[
				 
					 {qAction:"BBCOR"                      , isPositive:true}
					,{qAction:"Senior League Big Barrel"   , isPositive:true}
					,{qAction:"Youth / Little League"      , isPositive:true}
					,{qAction:"Junior Big Barrel"          , isPositive:true}
					,{qAction:"Tee Ball"                   , isPositive:true}
					,{qAction:"Adult Wood"                 , isPositive:true}
					,{qAction:"Youth Wood"                 , isPositive:true}
					,{qAction:"Training"                   , isPositive:true}
					,{qAction:"Fungos"                     , isPositive:true}
				]
		,nQ:{
				 positive:"bat_length_known"
				,negative:"start" //start over ?
			}
	}
		
	,{	qType:"BAT LENGTH"
		,qRname:"bat_length_known"
		,qText:"Do you know the bat length you will need?"
			,choices:
				[	
					 {qAction:"YES", isPositive:true}
					,{qAction:"NO" , isPositive:false}
				]
		,nQ:{
				 positive:"bat_length_selection"
				,negative:"player_details_h_w_known" //ask about h/w
			}
	}
	
	,{	qType:"BAT LENGTH: Selection"
		,qRname:"bat_length_selection"
		,qText:"Select your bat length"
			,choices:
				[
					 {qAction:'24"'  , isPositive:true}
					,{qAction:'25"'  , isPositive:true}
					,{qAction:'26"'  , isPositive:true}
					,{qAction:'27"'  , isPositive:true}
					,{qAction:'28"'  , isPositive:true}
					,{qAction:'29"'  , isPositive:true}
					,{qAction:'30"'  , isPositive:true}
					,{qAction:'31"'  , isPositive:true}
					,{qAction:'32"'  , isPositive:true}
					,{qAction:'33"'  , isPositive:true}
					,{qAction:'34"'  , isPositive:true}
				]
		,nQ:{
				 positive:"player_details_h_w_known"
				,negative:"start" // start over?
			}
	}
	
	,{	qType:"PLAYER DETAILS: Height and Weight"
		,qRname:"player_details_h_w_known"
		,qText:"Do you know the player's approximate height OR weight?"
			,choices:
				[	
					 {qAction:"YES"  , isPositive:true}
					,{qAction:"NO"   , isPositive:true}
				]
		,nQ:{
				 positive:"player_details_height"
				,negative:"player_details_age_known" // doesn't know h/w, ask for age
			}
	}
	
	,{	qType:"PLAYER DETAILS: Height"
		,qRname:"player_details_height"
		,qText:"Do you know the player's height?"
			,choices:
				[ //.5
					 {qAction:'3\''    , isPositive:true}
					,{qAction:'3\'1"'  , isPositive:true}
					,{qAction:'3\'2"'  , isPositive:true}
					,{qAction:'3\'3"'  , isPositive:true}
					,{qAction:'3\'4"'  , isPositive:true}
					,{qAction:'3\'5"'  , isPositive:true}
					,{qAction:'3\'6"'  , isPositive:true}
					,{qAction:'3\'7"'  , isPositive:true}
					,{qAction:'3\'8"'  , isPositive:true}
					,{qAction:'3\'9"'  , isPositive:true}
					,{qAction:'3\'10"' , isPositive:true}
					,{qAction:'3\'11"' , isPositive:true}
					,{qAction:'4\''    , isPositive:true}
					,{qAction:'4\'1"'  , isPositive:true}
					,{qAction:'4\'2"'  , isPositive:true}
					,{qAction:'4\'3"'  , isPositive:true}
					,{qAction:'4\'4"'  , isPositive:true}
					,{qAction:'4\'5"'  , isPositive:true}
					,{qAction:'4\'6"'  , isPositive:true}
					,{qAction:'4\'7"'  , isPositive:true}
					,{qAction:'4\'8"'  , isPositive:true}
					,{qAction:'4\'9"'  , isPositive:true}
					,{qAction:'4\'10"' , isPositive:true}
					,{qAction:'4\'11"' , isPositive:true}
					,{qAction:'5\''    , isPositive:true}
					,{qAction:'5\'1"'  , isPositive:true}
					,{qAction:'5\'2"'  , isPositive:true}
					,{qAction:'5\'3"'  , isPositive:true}
					,{qAction:'5\'4"'  , isPositive:true}
					,{qAction:'5\'5"'  , isPositive:true}
					,{qAction:'5\'6"'  , isPositive:true}
					,{qAction:'5\'7"'  , isPositive:true}
					,{qAction:'5\'8"'  , isPositive:true}
					,{qAction:'5\'9"'  , isPositive:true}
					,{qAction:'5\'10"' , isPositive:true}
					,{qAction:'5\'11"' , isPositive:true}
					,{qAction:'6\''    , isPositive:true}
					,{qAction:'6\'1"'  , isPositive:true}
					,{qAction:'6\'2"'  , isPositive:true}
					,{qAction:'6\'3"'  , isPositive:true}
					,{qAction:'6\'4"'  , isPositive:true}
					,{qAction:'6\'5"'  , isPositive:true}
					,{qAction:'6\'6"'  , isPositive:true}
					,{qAction:'6\'7"'  , isPositive:true}
					,{qAction:'6\'8"'  , isPositive:true}
					,{qAction:'6\'9"'  , isPositive:true}
					,{qAction:'6\'10"' , isPositive:true}
					,{qAction:'6\'11"' , isPositive:true}
					,{qAction:'7\''    , isPositive:true}
					,{qAction:'7\'1"'  , isPositive:true}
				]
		,nQ:{
				 positive:"player_details_weight"
				,negative:"start" // start over
			}
	}
	
	,{	qType:"PLAYER DETAILS: Weight"
		,qRname:"player_details_weight"
		,qText:"Do you know the player's approximate weight?"
			,choices:
				[ //.33
					 {qAction:"45" , isPositive:true}
					,{qAction:"50" , isPositive:true}
					,{qAction:"55" , isPositive:true}
					,{qAction:"60" , isPositive:true}
					,{qAction:"65" , isPositive:true}
					,{qAction:"70" , isPositive:true}
					,{qAction:"75" , isPositive:true}
					,{qAction:"80" , isPositive:true}
					,{qAction:"85" , isPositive:true}
					,{qAction:"90" , isPositive:true}
					,{qAction:"95" , isPositive:true}
					,{qAction:"100", isPositive:true}
					,{qAction:"105", isPositive:true}
					,{qAction:"110", isPositive:true}
					,{qAction:"115", isPositive:true}
					,{qAction:"120", isPositive:true}
					,{qAction:"125", isPositive:true}
					,{qAction:"130", isPositive:true}
					,{qAction:"135", isPositive:true}
					,{qAction:"140", isPositive:true}
					,{qAction:"145", isPositive:true}
					,{qAction:"150", isPositive:true}
					,{qAction:"155", isPositive:true}
					,{qAction:"160", isPositive:true}
					,{qAction:"165", isPositive:true}
					,{qAction:"170", isPositive:true}
					,{qAction:"175", isPositive:true}
					,{qAction:"180", isPositive:true}
					,{qAction:"185", isPositive:true}
					,{qAction:"190", isPositive:true}
					,{qAction:"195", isPositive:true}
				]
		,nQ:{
				 positive:"player_details_age_known"
				,negative:"start" //start over
			}
	}
	
	,{	qType:"PLAYER DETAILS: Age"
		,qRname:"player_details_age_known"
		,qText:"Do you know the player's age?"
			,choices:
				[
					 {qAction:'YES', isPositive:true}
					,{qAction:'NO' , isPositive:true}
				]
		,nQ:{
				 positive:"player_details_age_selection"
				,negative:"start"  // needs a logic check (if the user has answered player_details_weight)
			}
	}
	
	,{	qType:"PLAYER DETAILS: Age Selection"
		,qRname:"player_details_age_selection"
		,qText:"What is the player's age?"
			,choices:
				[ // .16
					 {qAction:"6" , isPositive:true}
					,{qAction:"7" , isPositive:true}
					,{qAction:"8" , isPositive:true}
					,{qAction:"9" , isPositive:true}
					,{qAction:"10", isPositive:true}
					,{qAction:"11", isPositive:true}
					,{qAction:"12", isPositive:true}
					,{qAction:"13", isPositive:true}
					,{qAction:"14", isPositive:true}
					,{qAction:"15", isPositive:true}
					,{qAction:"16", isPositive:true}
				]
		,nQ:{
				 positive:"bat_recommendation"
				,negative:"start"
			}
	}
	
	,{	qType:"BAT RECOMMENDATION"
		,qRname:"bat_recommendation"
		,qText:'A 30"\' Bat is recommended'
			,choices:
				[
					 {qAction:'Accept Recommended Bat' , isPositive:true}
					,{qAction:'Adjust Recommended Bat' , isPositive:true}
				]
		,nQ:{
				 positive:"thanks"
				,negative:"bat_recommendation_update"
			}
	}
	
	,{	qType:"BAT RECOMMENDATION: Update Length"
		,qRname:"bat_recommendation_update"
		,qText:'Select A Different Bat Length'
			,choices:
				[                               
					 {qAction:'29\"'             , isPositive:true}
					,{qAction:'30\"'             , isPositive:true}
					,{qAction:'31\"'             , isPositive:true}
					,{qAction:'Show All Lengths' , isPositive:true}
				]
		,nQ:{
				 positive:"thanks"  // needs to check the other lengths if "show all" is selected
				,negative:"start"
			}
	}
			
	,{	qType:"THANKS"
		,qRname:"thanks"
		,qText:"Did you find what you wanted?"
			,choices:
				[	
					 {qAction:"YES" , isPositive:true}
					,{qAction:"NO"  , isPositive:false}
				]
		,nQ:{
				 positive:"goodbye"
				,negative:"start"
			}
	}	
	,{	qType:"LATERZ"
		,qRname:"goodbye"
		,qText:"LATERZ"
			,choices:
				[	
					 {qAction:"LATERY" , isPositive:true}
					,{qAction:"LATERN" , isPositive:false}
				]
		,nQ:{
				 positive:"goodbye"
				,negative:"start"
			}
	}
]

/* BY BAT TYPE:
		BBCOR - AGES 13 - 21 & OVER
		SENIOR LEAGUE BIG BARREL - AGES 7 - 13
		YOUTH / LITTLE LEAGUE - AGES 5 - 13
		JUNIOR BIG BARREL - AGES 5 - 12
		TEE BALL - AGES 3 - 7
		ADULT WOOD BATS
		YOUTH WOOD BATS
		TRAINING
		FUNGOS
*/


/* BY SPORT TYPE
		Baseball
		Senior League
		Fastpitch
		Slowpitch
		T-Ball
		Training
*/


/* BY PRICE
		Up to $20
		$20 - $50
		$50 - $100
		$100 - $200
		$200 - $350
		$350 - $500
		$500 and Up
*/

/* BY SHOPPING CATEGORY
		New this Season
		Clearance
		Exclusives
		Recently Reduced
		At cost or below
		On Sale
		Quick Ship
*/

/* BY BRAND
		Louisville Slugger
		Worth
		DeMarini
		Show All
*/

/* BY SORTING
		Recommended
		Alphabetical
		Brand
		Price - Low to High
		Price - High to Low
*/

/* BY SIZE
		30in 20oz
		31in 21oz
		32
		32in 22oz
		32in 29oz
		33
		33in 30oz
		34
		34in 26oz
		34in 31oz
		Show All
*/


/* BY WEIGHT DROP
		-14
		-13.5
		-13
		-12.5
		-12
		-11.5
		-11
		-10.5
		-10
		-9
		-8.5
		-8
		-7.5
		-7
		-6.5
		-6
		-5.5
		-5
		-4
		-3
		Show All
*/


/* BY COLOR
		Black
		Black/Natural
		Blue
		Brown
		Natural
		Natural/Black
		Navy
		Red
		Scarlet
		Yellow
		Show All
*/

function hideQs(){
	for (var i=0; i<qList.length; i++){
		qList[i].setAttribute("style","display:none;");		
	}
	showQ(0);
}

function showQ(param){
	if (param!==undefined){		
		for (var i=0; i<qList.length; i++){
			qList[i].setAttribute("style","display:none;");		
		}
		qList[param].setAttribute("style","display:block;");
	}
	else{
		for (var j=0; j<qList.length; j++){
			if (this!==qList[j]){
				qList[j].setAttribute("style","display:none;");		
			}
			else{
				qList[j].setAttribute("style","display:block;");
			}
		}
	}
}

function toggleQ(param){
	var el=this;
	console.log("::toggleQ:: "+param);
	console.log("::toggleQ this:: "+this);
	var t=setTimeout(
		function (){
			showQ.apply(el.parentNode.nextSibling);
		}
		,550
	)
}

function displaySetup(){
	console.log(document.getElementById("results"));
	// create questions (and hook-up interaction)
	createQs();
	// hide all Qs
	// show first Q.
}

function makeText(scope,textContent){
	var txt=document.createTextNode(textContent);
	scope.appendChild(txt);
}

function createEl(tagType){
	var el=document.createElement(tagType);
	return el;
}

function reportClick(){
	//
	console.log(this.querySelectorAll("legend")[0].textContent);
}

function createQs(){
	var frag=document.createDocumentFragment();
	for (var i=0; i<questions.length; i++){
		var q1=createEl("p");
		makeText(q1,questions[i].qText);
		
		var fs=createEl("fieldset");
		fs.appendChild(q1);
		
		var lg=createEl("legend");
		makeText(lg,questions[i].qType);
		fs.appendChild(lg);
		
		for (var j=0; j<questions[i].choices.length; j++){
			if (j!==0){
				var br=createEl("br");
				fs.appendChild(br);
			}
			var c1=createEl("input");
			
			
			c1.setAttribute("type","radio");
			c1.setAttribute("name",questions[i].qRname);
			c1.setAttribute("id",questions[i].qRname+"_"+j);
			var label=createEl("label");
			//label.appendChild(c1);
			fs.appendChild(c1);
			label.setAttribute("for",questions[i].qRname+"_"+j);
			/* if (questions[i].choices[j].choiceFunction!==undefined){				
				makeText(label,questions[i].choices[j].choiceText);
				//setting this up here causes the event to be fired off 2 times
				label.onclick=questions[i].choices[j].choiceFunction;
			}
			else{
				makeText(label,questions[i].choices[j]);
			} */
			makeText(label,questions[i].choices[j].qAction);
			c1.setAttribute("value",questions[i].choices[j].qAction);
//			label.onclick=askAnother.bind(label,questions[i].choices,questions[i].nQ);
			
			label.onclick=askAnother.bind(label,questions[i],questions[i].choices[j]);
			
			fs.appendChild(label);
		}
		
	//	fs.onclick=reportClick;
		frag.appendChild(fs);
		qList.push(fs);
	}
	document.body.appendChild(frag);
	hideQs();
}

function tallySelected(){
	var selectedInputs=[];
	var rads=document.querySelectorAll("input");

	// find the radio button with the same value as the label text
	for (var i=0; i < rads.length; i++){
		
		if (rads[i].checked){
			selectedInputs.push(rads[i]);
		}
		else{
			continue;
		}
	}
	
	console.log(selectedInputs);
}

function getQuestion(e){	
	//getQuestion
	//this.parentNode.querySelectorAll("input");
	
	if (typeof e ==="string"){
		console.log(this, arguments.callee.name);
		console.log("arguments", arguments);
	}
	else{
	
	}
}

function askAnother(e){
	//displays an additional question based on the positive or negative input from the previous question
	
	console.log(" :::askAnother::: "+this.parentNode.querySelectorAll("p")[0].textContent+" ---> (answer:"+this.textContent+")");
	
	var rads=this.parentNode.querySelectorAll("input");
	
	console.log("arguments: ",arguments[0]); // should be the hook to the correct next question
	
	//now find that next question:
	
	var Q=arguments[0];
	
	var posQ=arguments[0].nQ.positive;
	var posQuestion=document.querySelector("[id^='"+posQ+"']").parentNode;
	
	
	if (Q.choices.lenth===2){
		console.log("yup, just two choices, dull.");
	}
	
	
	
	
	console.log("showQuestion: ",arguments[0].positive);
	console.log("posQuestion: ",posQuestion);
	
	//now toggle the correct question on/off
	this.parentNode.style.display="none";
	posQuestion.style.display="block";

	// find the radio button with the same value as the label text
	for (var k=0; k < rads.length; k++){
		
		if (rads[k].value===this.textContent){
			rads[k].checked="checked";
			//rads[k].selected=true;
		}
		else{
			//rads[k].selected=false;
			try {
				rads[k].removeAttribute("checked");
			}
			catch (e){
				console.log(e);
			}
		}
	}
	// if this is not the last question on the list.... 
	if (!(this.parentNode===(qList[qList.length-1]))){
		//do some stuff
		console.log("THIS IS THE **NOT** THE END");
	}
	
/*
	var sel=null;
	for (var i=0; i < rads.length; i++){
		if (rads[i].selected){
			sel=rads[i];			
		}
	}
	console.log(" :::askAnother::: selected: "+sel.value);
*/
	
	//e.stopPropagation();
	//e.preventDefault();
	
	/*
		branching----
		
		as long as the quiz isn't over....
		
		switch (answer){
			case X:
				
				ASK qlist [question text]
				
				break;
			default:
				break;
		}
		
			
			ASK another
				(pick q's from array based on....)

	
	ANSWERS: (do you know the player's height, YES,NO)
		ASK: "Do you know the player's height?"
		---------
		YES ENTERED:
			ASK: "Enter Height"
			HEIGHT ENTERED ("player height IS: "+'5\'10"')
			ASK: "Do you know the player's weight?"
			YES:
			ASK: "Enter weight"
			WEIGHT ENTERED ("player weight IS: "+"175")
		NO ENTERED:
			ASK: "Do you know the player's age?"
			ANSWER: "(yes)"
			YES ENTERED:
				ASK: "Enter Age"
				AGE ENTERED
				recommend bat length for ANSWER: AGE ENTERED
			NO ENTERED:
				recommend bat length GENERAL"
				batlength: 'this is a recommended size (30")'
				
	ANSWERS: (do you know the player's age, YES,NO)
		ASK: "Do you know the player's age?"
		---------
			ASK: "Do you know the player's age?"
			ANSWER: "(yes)"
			YES ENTERED:
				ASK: "Enter Age"
				AGE ENTERED
				recommend bat length for ANSWER: AGE ENTERED
			NO ENTERED:
				recommend bat length GENERAL"
				batlength: 'this is a recommended size (30")'
				
	ANSWERS: (Do you want to change an answer?)
		ASK: "// function for changing an answer should be set off by an icon"
		
	*/
	/* var t=setTimeout(
		function (){
			console.log("askAnother, this: "+ qText );
			if (e.target.parentNode.nodeName.toLowerCase()==="label"){
				
				// if this question isn't the last one in the list! (toggleQ wants to display the next question)
				
				// starting with the yes/no player height Q, the mouse event is lost
				//[TODO]
				toggleQ.apply(e.target.parentNode);				
			}
		}
		,550
	) */
	
	
	tallySelected();
}

/*
QUESTION SKELETON

stores the qType, qText, the choiceText, and the choices
as well as a callback that allows for branching logic
*/


/*
//https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
//--The Facade Pattern

var question = (function() {
 
    var _setQText = {
        val: "",
        get: function() {
			return this.val;
        },
        set: function( val ) {
            this.val = val;
        },
        init: function() {
            console.log( "I play Baseball" );
        }
    };
 
    return {
 
        ask: function( args ) {
            _setQText.set(args.val);
           console.log(
			"current value: "+_setQText.get()
		   )
		   ;
            if ( args.init ) {
                _setQText.init();
            }
        }
    };
}());
// Outputs: "current value: (of qText) " and "I play Baseball"
question.ask( {init: true, val: questions[0].qText} );

//*/

/*
from 
https://robertnyman.com/2008/10/14/javascript-how-to-get-private-privileged-public-and-static-members-properties-and-methods/
// Constructor
function Kid (name) {
	// Public
	this.name = name;
}
Kid.prototype.getName = function () {
	return this.name;
};
*/

window.onload=displaySetup;