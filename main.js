var fs = require('fs');
var text = fs.readFileSync('dictionary.txt', 'utf-8');
var words = [];
// a – adjective - прилагательное
// adv – adverb – наречие
// cj – conjunction – союз
// int – interjection – междометие
// n- noun – существительное
// num- numeral – числительное
// part – particle – частица
// prep – preposition – предлог
// pron – pronoun – местоимение
// v- verb – глагол 
var parts = ['a-', 'adv-', 'cj-', 'int-', 'n-', 'num-', 'part-', 'prep-', 'pron-', 'v-'];
var arr = text.split('\n');

for (var i=0; i<arr.length; i++) {
	var item = arr[i];
	var obj = {};
	words[i] = obj;
	obj.id = i+1;
	var startEn = item.indexOf(' ');
	var endEn = item.indexOf(' ', startEn+1);
	var en = item.slice(startEn+1, endEn);
	obj.en = en;

	var soundEnd = item.indexOf(']', endEn+1);
	var sound = item.slice(endEn+1, soundEnd+1);
	obj.sound = sound;

	// if (item.indexOf("v-") !== -1 && )

	obj.ru = {};
		var pos = 0;
		while (true) {
			var startPart = item.lastIndexOf(' ');
			for (var l=0; l<parts.length; l++) {
				if (item.indexOf(parts[l], pos) === -1) {

					continue;
				}
				if (item.indexOf(parts[l], pos) !== -1 && 
					item.indexOf(parts[l], pos) < startPart) {
					startPart = item.indexOf(parts[l], pos);
					var thisPart = parts[l];
				}
			}
			
			function isExist (part) {
				if (item.indexOf(part) !== -1) {
					return true;
				}
				return false;
			}

			if (startPart === item.lastIndexOf(' ')) {
				if (!parts.some(isExist)) {

				var noPartEnd = item.lastIndexOf(' ');
				var translate = item.slice(soundEnd+2, noPartEnd);
				obj.ru.noPart = translate.trim();
				}
				break;
			}
			if (startPart !== -1) {
				var endPart = item.lastIndexOf(' ');
				for (var k=0; k<parts.length; k++) {
					if (item.indexOf(parts[k], item.indexOf(' ', startPart+1)) === -1) {
						continue;
					}

					if (item.indexOf(parts[k], item.indexOf(' ', startPart+1)) !== -1 && 
						item.indexOf(parts[k], item.indexOf(' ', startPart+1)) < endPart) {
						endPart = item.indexOf(parts[k], item.indexOf(' ', startPart+1));
					}
				}
				var translate = item.slice(item.indexOf('-', startPart)+1 , endPart);
				obj.ru[thisPart] = translate.trim();
				pos = item.indexOf(' ', startPart);
			} // end if (startPart !== -1)
		} // end while
}

for (var n=0; n<words.length; n++) {
	for (var name in words[n].ru) {
		if (name === 'v-') {
			if (words[n].ru[name].indexOf('[') !== -1) {
				var arrr = [].slice.call(words[n].ru[name]);
				words[n].ru[name] = arrr;
				words[n].irregular = arrr.splice(0, arrr.indexOf(')')+1);
				words[n].irregular = words[n].irregular.slice(1, -1);
				words[n].irregular = words[n].irregular.join('');
				words[n].ru[name] = arrr.join('').trim();
			}
		}
	}
}

var content = JSON.stringify(words, null, 4);

fs.writeFileSync('dictionary.json', content);