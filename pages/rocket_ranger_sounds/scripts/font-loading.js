
	function loadGoogleFonts() {
		/*
			loadFonts({
			src: "https://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic", 
			type: "fontcss",
			});
		*/

		loadFonts({
			src: createLongGoogleFontLinkHref(),
			type: "fontcss",
		});
		return false;
	}
	
	function createLongGoogleFontLinkHref() {
		var fontFamilyArr = [
		  "Press Start 2P",
		  "Fredoka One",
		  "Alfa Slab One",
		  "Special Elite",
		  "Passion One",
		  "Squada One",
		  "Luckiest Guy",
		  "Black Ops One",
		  "Bungee",
		  "Racing Sans One",
		  "Changa One",
		  "Graduate",
		  "Bubblegum Sans",
		  "Contrail One",
		  "Wallpoet",
		  "Emilys Candy",
		  "Freckle Face",
		  "UnifrakturMaguntia",
		  "Faster One",
		  "Oregano",
		  "Creepster",
		  "Slackey",
		  "Sail",
		  "Codystar",
		  "Iceland",
		  "Nova Square",
		  "Henny Penny",
		  "Spirax",
		  "Fontdiner Swanky",
		  "Zilla Slab Highlight",
		  "Spicy Rice",
		  "Oxanium",
		  "Dynalight",
		  "Macondo Swash Caps",
		  "Germania One",
		  "Peralta",
		  "Ewert",
		  "Sancreek",
		  "Kumar One",
		  "Chicle",
		  "Nosifer",
		  "Mystery Quest",
		  "Stint Ultra Expanded",
		  "Flavors",
		  "Girassol",
		  "Odibee Sans",
		  "Snowburst One",
		  "Smokum",
		  "Caesar Dressing",
		  "New Rocker",
		  "Jolly Lodger",
		  "Londrina Shadow",
		  "Hanalei Fill",
		  "Irish Grover",
		  "Butcherman",
		  "Hanalei",
		  "Roboto",
		  "Montserrat",
		  "Open Sans",
		  "Source Sans Pro",
		  "Roboto Condensed",
		  "Oswald",
		  "Roboto Mono",
		  "Raleway",
		  "Noto Sans",
		  "Roboto Slab",
		  "Source Code Pro",
		  "Barlow",
		  "Libre Baskerville",
		  "Crimson Text",
		  "Fjalla One",
		  "Abel",
		  "Teko",
		  "Zilla Slab",
		  "Merriweather Sans",
		  "Noto Sans SC",
		  "Assistant",
		  "DM Sans",
		  "Prompt",
		  "Acme",
		  "Bree Serif",
		  "Play",
		  "Archivo",
		  "Archivo Black",
		  "Barlow Semi Condensed",
		  "Sarabun",
		  "Francois One",
		  "Noticia Text",
		  "Didact Gothic",
		  "Rokkitt",
		  "Prata",
		  "Russo One",
		  "Orbitron",
		  "IBM Plex Mono",
		  "Cousine",
		  "Asap Condensed",
		  "Ultra",
		  "Secular One",
		  "Chakra Petch",
		  "Quattrocento",
		  "Vidaloka",
		  "Noto Serif TC",
		  "Karma",
		  "Khand",
		  "Gentium Basic",
		  "Alice",
		  "Hammersmith One",
		  "Saira Semi Condensed",
		  "Electrolize",
		  "Public Sans",
		  "Krona One",
		  "Nanum Gothic Coding",
		  "Suez One",
		  "Jura",
		  "Rubik Mono One",
		  "Cutive Mono",
		  "Krub",
		  "Kosugi Maru",
		  "Michroma",
		  "Coda Caption",
		  "Lexend Deca",
		  "Holtwood One SC",
		  "Overpass Mono",
		  "Noto Serif KR",
		  "Marcellus SC",
		  "Allerta Stencil",
		  "Podkova",
		  "Blinker",
		  "Cutive",
		  "Sarpanch",
		  "Mouse Memoirs",
		  "Geo",
		  "Rum Raisin",
		  "Cormorant Unicase",
		  "Rhodium Libre",
		  "Black And White Picture",
		  "Poppins", 
		];
		
		console.log("createLongGoogleFontLinkHref");
		var resultHome = document.querySelector("#result");
		var resultFrag = document.createDocumentFragment();
		var choices = document.createElement("ul");
		choices.setAttribute("id", "column_layout");
		choices.setAttribute("style", "columns: auto 18em;");

		fontFamilyArr.forEach(function (el, index) {
		  var exampleP = document.createElement("li");
		  var exampleTextContent = document.createTextNode(el);
		  exampleP.appendChild(exampleTextContent);
		  exampleP.setAttribute(
			"style",
			"list-style:none;line-height:calc(2rem + 8px);font-size:2rem;font-family:'" +
			  el +
			  "'"
		  );
		  choices.appendChild(exampleP);
		});
		resultFrag.appendChild(choices);
		resultHome.prepend(resultFrag);

		var linkAttrib = "https://fonts.googleapis.com/css?family=";

		// fontFamilyArr = fontFamilyArr.sort();
		// fontFamilyArr.sort((a, b) => a.localeCompare(b, "en", { ignorePunctuation: true }));

		/*
			var crushableString = fontFamilyArr.slice().join("@");
			crushableString = crushableString.replaceAll(" ", "+");
			crushableString = crushableString.split("@").join("|");
		*/

		/* 
		var crushableString = fontFamilyArr.sort().slice().join("@");
		crushableString = crushableString.replaceAll(" ", "+"); //this works because it's now working as a STRING method (in the chain of events)
		crushableString = crushableString.split("@").join("|");
		*/

		var crushableString = fontFamilyArr
		  .sort()
		  .slice()
		  .join("@")
		  .replaceAll(" ", "+") //this works because it's a STRING method (in the chain of events)
		  .split("@")
		  .join("|");

		linkAttrib += crushableString;
		console.log(linkAttrib);
		return linkAttrib;
	}
	
	

 