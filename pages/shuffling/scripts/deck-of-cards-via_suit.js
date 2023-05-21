var cardSuit_array = ["Spades", "Clubs", "Diamonds", "Hearts"];
var cardFace_array = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
var deck = [];
for (a = 0; a < cardSuit_array.length; ++a) {
  for (b = 0; b < cardFace_array.length; ++b) {
    deck.push({
      designation: cardFace_array[b],
      suit: cardSuit_array[a],
      card:
        cardFace_array[b] +
        "_" +
        cardSuit_array[a].substring(0, 1).toLowerCase(),
    });
  }
}
/* account for high AND low aces somehow */
console.log(deck);
console.log(deck.length);
/*
   var card01_h = { designation: "a", suit: "hearts" };
                var card02_h = { designation: "02", suit: "hearts" };
                var card03_h = { designation: "03", suit: "hearts" };
                var card04_h = { designation: "04", suit: "hearts" };
                var card05_h = { designation: "05", suit: "hearts" };
                var card06_h = { designation: "06", suit: "hearts" };
                var card07_h = { designation: "07", suit: "hearts" };
                var card08_h = { designation: "08", suit: "hearts" };
                var card09_h = { designation: "09", suit: "hearts" };
                var card10_h = { designation: "10", suit: "hearts" };
                var cardj_h = { designation: "j", suit: "hearts" };
                var cardq_h = { designation: "q", suit: "hearts" };
                var cardk_h = { designation: "k", suit: "hearts" };
                var carda_h = card01_h;
 */
