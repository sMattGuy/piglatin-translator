const fs = require('fs');
const vowels = ['a','e','i','o','u','y','A','E','I','O','U','Y'];

if(process.argv.length != 3){
	console.log(`Usage: node pl.js filename.txt`);
	return;
}

let input = process.argv.slice(2)[0];
fs.readFile(input,'utf8',(err,data) => {
	let newMessage = "";
	if(err){
		console.log('File not found');
		return;
	}
	console.log('Received File');
	let splitMessage = data.replace(/(\n\r)|(\r\n)/g, '\n').split(' ');
	for(let i=0;i<splitMessage.length;i++){
		let currentWord = splitMessage[i].match(/\w+|\d+/g);
		let newMix = splitMessage[i];
		if(currentWord === null){
			newMessage += splitMessage[i] + ' ';
		}
		else{
			for(let j=0;j<currentWord.length;j++){
				let convertedWord = convertToPig(currentWord[j]);
				newMix = newMix.replace(currentWord[j], convertedWord);
			}
			newMessage += newMix + ' ';
		}
	}
	fs.writeFileSync('./output.txt',newMessage);
});

function convertToPig(word){
	let suffix = "";
	let postfix = "ay";
	let capital = false;
	let uppercase = false;
	if(word[0] == word[0].toUpperCase()){
		capital = true;
		//uppercase = true;
	}
	if(word.length >= 2){
		if(word[1] == word[1].toUpperCase()){
			uppercase = true;
			capital = false;
		}
		else{
			uppercase = false;
		}
	}
	for(let i=0;i<word.length;i++){
		if(vowels.includes(word[i])){
			if(i == 0){
				postfix = "yay";
			}
			if(uppercase){
				let temp = `${word.substring(i)}${suffix}${postfix}`;
				temp = temp.toUpperCase();
				return temp;
			}
			if(capital){
				let temp = `${word.substring(i)}${suffix}${postfix}`;
				temp = temp[0].toUpperCase() + temp.substring(1).toLowerCase();
				return temp;
			}
			return `${word.substring(i)}${suffix}${postfix}`;
		}
		suffix += word[i];
	}
	return word;
}