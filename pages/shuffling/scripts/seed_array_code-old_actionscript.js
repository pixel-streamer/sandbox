/*****************RANDOM NUMBER ARRAY WITH AVERAGE*****************/
var steps: Number = 100;
var seedNum: Number = 0;
var seedval: Number = 0;
var seedBox: Array;
var seedAvg: Array;
var avg_seed_arr: Array;
var sblong: Number = 0;
var seedSum: Number = 0;
var seedrnd: Number = 0;
var avgtmp: Number = 0;
var avg: Number = 0;
var pi: Number = 0;
var rdm: Number = 0;
function getReallyRandom(maxNum): Number {
	return Math.random() * maxNum;
}
function getrandom(): Number { // Obtains a random number
	pi = Math.PI;
	rdm = getReallyRandom(pi) * 333; //random(pi)*333
	seedrnd = getReallyRandom(rdm) * steps; //random(rdm)*steps
	 // seedval = (((((pi * (pi * rdm))) * 1000) % (pi * rdm)) * (seedrnd / 144));
	 // seedval = (((((pi * (pi * rdm))) * 1000) % (pi * rdm)) * (144 / 3)); seedval = (((((pi * (pi * rdm))) * 1000) % (pi * rdm)) * (144 /seedrnd));
	/*		the last number used to multiply seedval is almost a range number,	meaning that multiple seedval numbers all hover around the value of	the last multiplier.	*/
	seedNum = Math.round(seedval);
	return seedNum;
}
function averageSeedling(): Array { // collects all the seeds into an array (seedBox).
	seedBox = [];
	for (var i = 0; i < steps; i++) {
		getrandom();
		seedBox.push(seedNum);
	}
	return seedBox;
}
function average(): Number { // Working from an array filled with random numbers, // this averages the numbers in that array.
	sblong = seedBox.length;
	for (var i = 0; i < sblong; i++) {
		seedSum += seedBox[i];
	}
	avgtmp = seedSum / (sblong);
	avg = Math.round(avgtmp);
	return avg;
}
function thing(): Array { /*// checks for the seedBox index with a number as close to average as possible.
*/	sblong = seedBox.length;
	avg_seed_arr = []; /* insert loop to check for duplicates here*/
	seedAvg = avg_seed_arr;
	seedAvg.sort();
	return seedAvg;
};
averageSeedling();
average();
//thing();
this.seed = seedBox;
trace("Last seed: " + seedNum);
trace("seedNum: " + seedSum);
trace("seedBox: " + seedBox);
trace("How many entries?: " + seedBox.length);
trace("seedBox average: " + avg);
trace("This is the average seedling: " + thing().toString());