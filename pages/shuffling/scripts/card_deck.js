function makeRegularDeck() {
	let deck = [];
	let tableauSpades = [];
	let tableauDiamonds = [];
	let tableauClubs = [];
	let tableauHearts = []; 
	let countingJokersIn=[];
	let isUsingJokers=false;

	let acesLow = true;

  let card_01_h = {numeric_value:"1",  short_name:"H-A", name:"ace", designation: "a", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_02_h = {numeric_value:"2",  short_name:"H-2", name:"two", designation: "02", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_03_h = {numeric_value:"3",  short_name:"H-3", name:"three", designation: "03", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_04_h = {numeric_value:"4",  short_name:"H-4", name:"four", designation: "04", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_05_h = {numeric_value:"5",  short_name:"H-5", name:"five", designation: "05", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_06_h = {numeric_value:"6",  short_name:"H-6", name:"six", designation: "06", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_07_h = {numeric_value:"7",  short_name:"H-7", name:"seven", designation: "07", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_08_h = {numeric_value:"8",  short_name:"H-8", name:"eight", designation: "08", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_09_h = {numeric_value:"9",  short_name:"H-9", name:"nine", designation: "09", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_10_h = {numeric_value:"10", short_name:"H-10", name:"ten", designation: "10", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_j_h =  {numeric_value:"11", short_name:"H-J", name:"jack", designation: "j", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_q_h =  {numeric_value:"12", short_name:"H-Q", name:"queen", designation: "q", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_k_h =  {numeric_value:"13", short_name:"H-K", name:"king", designation: "k", suit: "hearts", suit_color: "red",ink_color:"various" };
  let card_a_h =  card_01_h;
  
  if (acesLow=false){
	  card_a_h.numeric_value="14";
  }

  let card_01_s ={numeric_value:"1",  short_name:"S-A", name:"ace", designation: "a", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_02_s ={numeric_value:"2",  short_name:"S-2", name:"two", designation: "02", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_03_s ={numeric_value:"3",  short_name:"S-3", name:"three", designation: "03", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_04_s ={numeric_value:"4",  short_name:"S-4", name:"four", designation: "04", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_05_s ={numeric_value:"5",  short_name:"S-5", name:"five", designation: "05", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_06_s ={numeric_value:"6",  short_name:"S-6", name:"six", designation: "06", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_07_s ={numeric_value:"7",  short_name:"S-7", name:"seven", designation: "07", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_08_s ={numeric_value:"8",  short_name:"S-8", name:"eight", designation: "08", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_09_s ={numeric_value:"9",  short_name:"S-9", name:"nine", designation: "09", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_10_s ={numeric_value:"10", short_name:"S-10", name:"ten", designation: "10", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_j_s = {numeric_value:"11", short_name:"S-J", name:"jack", designation: "j", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_q_s = {numeric_value:"12", short_name:"S-Q", name:"queen", designation: "q", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_k_s = {numeric_value:"13", short_name:"S-K", name:"king", designation: "k", suit:"spades", suit_color: "black",ink_color:"various" };
  let card_a_s =  card_01_s;
  
   if (acesLow=false){
	  card_a_s.numeric_value="14";
  }
  
  let card_01_d = {numeric_value:"1",  short_name:"D-A", name:"ace", designation: "a", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_02_d = {numeric_value:"2",  short_name:"D-2", name:"two", designation: "02", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_03_d = {numeric_value:"3",  short_name:"D-3", name:"three", designation: "03", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_04_d = {numeric_value:"4",  short_name:"D-4", name:"four", designation: "04", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_05_d = {numeric_value:"5",  short_name:"D-5", name:"five", designation: "05", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_06_d = {numeric_value:"6",  short_name:"D-6", name:"six", designation: "06", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_07_d = {numeric_value:"7",  short_name:"D-7", name:"seven", designation: "07", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_08_d = {numeric_value:"8",  short_name:"D-8", name:"eight", designation: "08", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_09_d = {numeric_value:"9",  short_name:"D-9", name:"nine", designation: "09", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_10_d = {numeric_value:"10", short_name:"D-10", name:"ten", designation: "10", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_j_d  = {numeric_value:"11", short_name:"D-J", name:"jack", designation: "j", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_q_d  = {numeric_value:"12", short_name:"D-Q", name:"queen", designation: "q", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_k_d  = {numeric_value:"13", short_name:"D-K", name:"king", designation: "k", suit: "diamonds" , suit_color: "red" ,ink_color:"various" };
  let card_a_d  = card_01_d;
  
   if (acesLow=false){
	  card_a_d.numeric_value="14";
  } 

  let card_01_c = {numeric_value:"1",  short_name:"C-A", name:"ace", designation: "a", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_02_c = {numeric_value:"2",  short_name:"C-2", name:"two", designation: "02", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_03_c = {numeric_value:"3",  short_name:"C-3", name:"three", designation: "03", suit: "clubs", suit_color: "black" ,ink_color:"various"  };
  let card_04_c = {numeric_value:"4",  short_name:"C-4", name:"four", designation: "04", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_05_c = {numeric_value:"5",  short_name:"C-5", name:"five", designation: "05", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_06_c = {numeric_value:"6",  short_name:"C-6", name:"six", designation: "06", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_07_c = {numeric_value:"7",  short_name:"C-7", name:"seven", designation: "07", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_08_c = {numeric_value:"8",  short_name:"C-8", name:"eight", designation: "08", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_09_c = {numeric_value:"9",  short_name:"C-9", name:"nine", designation: "09", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_10_c = {numeric_value:"10", short_name:"C-10", name:"ten", designation: "10", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_j_c  = {numeric_value:"11", short_name:"C-J", name:"jack", designation: "j", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_q_c  = {numeric_value:"12", short_name:"C-Q", name:"queen", designation: "q", suit: "clubs" , suit_color: "black" ,ink_color:"various" };
  let card_k_c  = {numeric_value:"13", short_name:"C-K", name:"king", designation: "k", suit: "clubs" , suit_color: "black",ink_color:"various" };
  let card_a_c  = card_01_c;
  
   if (acesLow=false){
	  card_a_c.numeric_value="14";
  }
   
/* "short_name" is used to help locate the id designation of the svg vector image. */

  let card_joker_r  = {numeric_value:"15", short_name:"J-R", name:"joker", designation: "q",ink_color:"red" }; //red or (smaller joker, when monochrome)
  let card_joker_b  = {numeric_value:"16", short_name:"J-B", name:"joker", designation: "k",ink_color:"black" }; //black (larger) out-ranks red joker 
  
  countingJokersIn[0]=card_joker_r;
  countingJokersIn[1]=card_joker_b;

  tableauHearts[0] = card_01_h;
  tableauHearts[1] = card_02_h;
  tableauHearts[2] = card_03_h;
  tableauHearts[3] = card_04_h;
  tableauHearts[4] = card_05_h;
  tableauHearts[5] = card_06_h;
  tableauHearts[6] = card_07_h;
  tableauHearts[7] = card_08_h;
  tableauHearts[8] = card_09_h;
  tableauHearts[9] = card_10_h;
  tableauHearts[10] = card_j_h;
  tableauHearts[11] = card_q_h;
  tableauHearts[12] = card_k_h;
  tableauHearts[13] = card_a_h;
  
  tableauSpades[0] = card_01_s;
  tableauSpades[1] = card_02_s;
  tableauSpades[2] = card_03_s;
  tableauSpades[3] = card_04_s;
  tableauSpades[4] = card_05_s;
  tableauSpades[5] = card_06_s;
  tableauSpades[6] = card_07_s;
  tableauSpades[7] = card_08_s;
  tableauSpades[8] = card_09_s;
  tableauSpades[9] = card_10_s;
  tableauSpades[10] = card_j_s;
  tableauSpades[11] = card_q_s;
  tableauSpades[12] = card_k_s;
  tableauSpades[13] = card_a_s; 
  
  tableauDiamonds[0] = card_01_d;
  tableauDiamonds[1] = card_02_d;
  tableauDiamonds[2] = card_03_d;
  tableauDiamonds[3] = card_04_d;
  tableauDiamonds[4] = card_05_d;
  tableauDiamonds[5] = card_06_d;
  tableauDiamonds[6] = card_07_d;
  tableauDiamonds[7] = card_08_d;
  tableauDiamonds[8] = card_09_d;
  tableauDiamonds[9] = card_10_d;
  tableauDiamonds[10] = card_j_d;
  tableauDiamonds[11] = card_q_d;
  tableauDiamonds[12] = card_k_d;
  tableauDiamonds[13] = card_a_d;
  
  tableauClubs[0] = card_01_c;
  tableauClubs[1] = card_02_c;
  tableauClubs[2] = card_03_c;
  tableauClubs[3] = card_04_c;
  tableauClubs[4] = card_05_c;
  tableauClubs[5] = card_06_c;
  tableauClubs[6] = card_07_c;
  tableauClubs[7] = card_08_c;
  tableauClubs[8] = card_09_c;
  tableauClubs[9] = card_10_c;
  tableauClubs[10] = card_j_c;
  tableauClubs[11] = card_q_c;
  tableauClubs[12] = card_k_c;
  tableauClubs[13] = card_a_c;

	if (acesLow) {
		tableauHearts.pop();
		tableauSpades.pop();
		tableauDiamonds.pop();
		tableauClubs.pop();
	}

	deck = tableauSpades
		.concat(tableauDiamonds)
		.concat(tableauClubs)
		.concat(tableauHearts);

	if (isUsingJokers){
		deck=deck.concat(countingJokersIn);
	}
	return deck;
}
function layoutDeck(){
  
}
//console.log(makeRegularDeck());
