if(process.argv.length != 3){
	console.log(`Usage: node piglatin.js "message to translate"`);
	return;
}
const vowels = ['a','e','i','o','u','A','E','I','O','U'];
let message = process.argv.slice(2)[0];
let newMessage = "";

let suffix = "";
let splitMessage = message.split(' ');
for(let m=0;m<splitMessage.length;m++){
	for(let i=0;i<splitMessage[m].length;i++){
		if(vowels.includes(splitMessage[m][i])){
			newMessage += `${splitMessage[m].substring(i)}${suffix}ay `;
			suffix = "";
			break;
		}
		suffix += splitMessage[m][i];
	}
}
console.log(newMessage);