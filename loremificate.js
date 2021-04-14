
var lorem = {"1": ["a"], "2": ["ac", "ad", "at", "et", "eu", "id", "in", "mi", "ut"], "3": ["cum", "dui", "est", "leo", "mus", "nam", "nec", "non", "per", "sed", "sem", "sit", "vel"], "4": ["amet", "ante", "arcu", "cras", "diam", "eget", "elit", "erat", "eros", "nibh", "nisi", "nisl", "nunc", "odio", "orci", "pede", "quam", "quis", "urna", "xdis"], "5": ["augue", "class", "dolor", "donec", "etiam", "felis", "fusce", "ipsum", "justo", "lacus", "lorem", "magna", "massa", "metus", "morbi", "neque", "nulla", "proin", "purus", "risus", "velit", "vitae"], "6": ["aenean", "aptent", "auctor", "congue", "cursus", "lectus", "libero", "ligula", "litora", "luctus", "magnis", "mattis", "mauris", "mollis", "montes", "nostra", "nullam", "ornare", "sapien", "semper", "sociis", "taciti", "tellus", "tortor", "turpis", "varius"], "7": ["aliquam", "aliquet", "blandit", "commodo", "conubia", "dapibus", "egestas", "euismod", "feugiat", "gravida", "iaculis", "integer", "lacinia", "laoreet", "natoque", "posuere", "potenti", "pretium", "quisque", "sodales", "vivamus", "viverra"], "8": ["accumsan", "faucibus", "inceptos", "interdum", "nascetur", "pharetra", "placerat", "praesent", "pulvinar", "sagittis", "sociosqu", "suscipit", "torquent", "ultrices", "vehicula", "volutpat"], "9": ["consequat", "convallis", "curabitur", "dignissim", "elementum", "facilisis", "fermentum", "hendrerit", "himenaeos", "imperdiet", "malesuada", "penatibus", "phasellus", "porttitor", "ridiculus", "tincidunt", "tristique", "ultricies", "vulputate"], "10": ["adipiscing", "parturient", "vestibulum"], "11": ["condimentum", "scelerisque", "suspendisse", "ullamcorper"], "12": ["consectetuer", "pellentesque", "sollicitudin"], "max": 12};

var wordmatcher = /([^A-Za-z]*)([A-Za-z]+)([^A-Za-z]*)/g;

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash >>> 0;
};

function loremificate(s) {
	var m;
	var r = "";
	do {
		m = wordmatcher.exec(s);
		if (m) {
			//print(m);
			var prefix = m[1];
			var word = m[2];
			var suffix = m[3];
            thislen = word.length;
            if (thislen > 0) {
                if (thislen > lorem.max) {
                    thislen = lorem.max;
				}
                caps = [];
                for (i = 0; i < word.length; i++) {
                    letter = word[i];
                    if (letter >= "A" && letter <= "Z") {
                        caps.push(i);
					}
				}
				//print(lorem[thislen]);
				//print(lorem[thislen].length);
				//print(word.hashCode());
				//print(word.hashCode() % lorem[thislen].length);
                word = lorem[thislen][word.hashCode() % lorem[thislen].length];
				//print(word);
				caps.forEach(i => {
                    word = word.substr(0, i) + word[i].toUpperCase() + word.substr(i+1);
				});
			}
			r += prefix + word + suffix;
			//r += word + prefix;
		//} else {
			//print("blunk");
		}
	} while (m);
	return r;
}

print(loremificate("TODAY"));
print(loremificate(" □ This is a silly TEST (with something)"));
print(loremificate(" □ This is yet-another TEST!"));




