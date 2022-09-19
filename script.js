const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

textbox.contentEditable = true;

function download() {
	let notesFile = new File([textbox.innerText], "notes.txt", {type: "text/plain;charset=utf-8"});
	saveAs(notesFile);
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		console.log(event.target.result)
    		textbox.innerText = event.target.result;
		//textbox.innerText = "your mom"
  	});
	fr.readAsText(uploadBtn.files[0]);
}

function getSelectionText() {
    	var text = "";
    	var activeEl = document.activeElement;
    	var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    	if (activeEl != textbox) return
    	if ((activeElTagName == "textarea") || (activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart == "number")) {
        	text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    	} else if (window.getSelection) {
        	text = window.getSelection().toString();
    	}
    	return text; // will be undefined if not in textbox
}

uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
document.addEventListener("selectionchange", function() {
	console.log(getSelectionText());
});

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
