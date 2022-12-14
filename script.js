const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

let isAltDown = false; //TODO: need new key becuase on mac alt + c produces ç AAAAHAHAHAHWHAHAAAAAAAAAAAAaAAAAAaAAAAAaAAAAAaAAAAAaAAAAAaAAAAAaAAAAAa

function getCursorPosition() {
	return [textbox.selectionStart, textbox.selectionEnd];
};

function download() {
	saveAs(new File([textbox.value], { type: "text/plain;charset=utf-8" }), "notes.ducknote")
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		textbox.value = event.target.result;
	});
	fr.readAsText(uploadBtn.files[0]);
}

function insertTab() {
	const [startPosition, endPosition] = getCursorPosition();
	textbox.setRangeText("\t", startPosition, endPosition, "end");
}

function calculate() {
	let [startPosition, endPosition] = getCursorPosition();
	const selectedText = window.getSelection().toString();
	const [numberOneString, operand, numberTwoString] = selectedText.split(" ");
	let numberOne, numberTwo;

	try {
		if (numberOneString === "pi" && numberTwoString !== "pi") {
			numberOne = Math.PI;
			numberTwo = parseFloat(numberTwoString);
		} else if (numberOneString !== "pi" && numberTwoString === "pi") {
			numberOne = parseFloat(numberOneString);
			numberTwo = Math.PI;
		} else if (numberOneString === "pi" && numberTwoString === "pi") {
                        numberOne = Math.PI;
                        numberTwo = Math.PI;
                } else {
			numberOne = parseFloat(numberOneString); // does a weird thing where if there is a string behind the number, it will shave that string off
			numberTwo = parseFloat(numberTwoString);
		}

		if (numberOne === NaN || numberTwo === NaN) {
			alert("Please enter in a correct statement, if you need help, please review the calculations help");
			return;
		}
		if (numberOne === undefined || numberTwo === undefined || operand === undefined) {
			alert("Please enter in a correct statement, if you need help, please review the calculations help");
			return;
		}
	} catch (error) {
		alert("Please enter in a correct statement, if you need help, please review the calculations help");
		return;
	}


	let calculation = 0;

	switch (operand) {
		case "+":
			calculation = numberOne + numberTwo;
			break;

		case "-":
			calculation = numberOne - numberTwo;
			break;
		case "x":
		case "*":
			calculation = numberOne * numberTwo;
			break;

		case "/":
			calculation = numberOne / numberTwo;
			break;

		case "^":
			calculation = numberOne ** numberTwo;
			break;

		case "/^":
			calculation = Math.pow(numberOne, 1/numberTwo); // sqrt
			break;

		default:
			alert("Please enter in a correct statement, if you need help, please review the calculations help");
			return;
	}

	textbox.setSelectionRange(endPosition + 1, endPosition + 1);
	[startPosition, endPosition] = getCursorPosition();
	textbox.setRangeText(` = ${calculation}`, startPosition, endPosition, "end");
}

function replace() {
	let text = textbox.value;
	const replacee = prompt("What text do you want to replace?", "");
	const replacer = prompt("What do you want to replace that text with?", "");
	text = text.replaceAll(replacee, replacer);
	textbox.value = text;
}

uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
textbox.addEventListener("keydown", function (event) {
	if (event.key === "Tab") {
		event.preventDefault();
		insertTab();
	}
	if (event.key === "Alt") isAltDown = true;
	if (event.key === "c" && isAltDown) calculate();
	if (event.key === "r" && isAltDown) replace();
});
textbox.addEventListener("keyup", function (event) {
	if (event.key === "Alt") isAltDown = false;

});
addEventListener("focus", function() {
	isAltDown = false;
});
addEventListener("beforeunload", function (event) {
	const confirmationMessage = 'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';
	(event || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
