var replacements = {
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;",

	" ":  "<span class='single' single-title='␠'><span> </span></span>" ,
	"\t": "<span class='single' single-title='␉'><span>\t</span></span>",
	"\n": "<span class='single' single-title='␤'><span>\n</span></span>", //"␊",
	"\r": "<span class='single' single-title='␍'><span>\r</span></span>",

	"\u200f": "<span class='single' single-title='RLM'><span></span>‏</span>",
	"\u200e": "<span class='single' single-title='LRM'><span>‎</span></span>",
	"\e061c": "<span class='single' single-title='ALM'><span>؜</span></span>",
	'\u202a(.*?)\u202c' : "<span class='element' start-title='LRE' end-title='PDF'>$1</span>", // http://unicode.org/reports/tr9/
	'\u202b(.*?)\u202c' : "<span class='element' start-title='RLE' end-title='PDF'>$1</span>",
	'\u202d(.*?)\u202c' : "<span class='element' start-title='LRO' end-title='PDF'>$1</span>",
	'\u202e(.*?)\u202c' : "<span class='element' start-title='RLO' end-title='PDF'>$1</span>",
	
	'\u2066(.*?)\u2069' : "<span class='element' dir='ltr'  start-title='LRI' end-title='PDI'>$1</span>",
	'\u2067(.*?)\u2069' : "<span class='element' dir='rtl'  start-title='RLI' end-title='PDI'>$1</span>",
	'\u2068(.*?)\u2069' : "<span class='element' dir='auto' start-title='FSI' end-title='PDI'>$1</span>",
	
};

function convertRawToControlCharacters(input) {
	for (var replacement in replacements) {
		input = input.replace(new RegExp(replacement,'g'), replacements[replacement]); 
	}
	return input;
}

function updateOutput() {
	var input = document.getElementById("input").value;
	document.getElementById("output").innerHTML = convertRawToControlCharacters(input);
}

document.addEventListener('DOMContentLoaded',function() {
	let params = new URLSearchParams(document.location.search.substring(1));
	let input = params.get("input");
	if (input != null)
		document.getElementById('input').value = input;
	document.getElementById('input').addEventListener('input', updateOutput);
	updateOutput();
}, false);