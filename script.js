const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const underlineBtn = document.getElementById("underline");

// setup
textbox.contentEditable = true;
const spaceNode = document.createElement("span");
spaceNode.style.display = "inline-block";
//spaceNode.innerText = "&nbsp;";
spaceNode.innerText = "\xa0";
/*
function select() {
	let selection = window.getSelection().getRangeAt(0);
        let selectedText = selection.extractContents();
        let span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.appendChild(selectedText);
        selection.insertNode(span);
}
*/
function underline() {
	let selection = window.getSelection().getRangeAt(0);
        let selectedText = selection.extractContents();
        let span = document.createElement("span");
        span.style.textDecoration = "underline";
        span.appendChild(selectedText);
        selection.insertNode(span);
	text.append(spaceNode);
}

function download(name) {
	saveAs(new File([textbox.innerHTML], {type:"text/plain;charset=utf-8"}), `${name}.xhtml`)
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		console.log(event.target.result)
    		textbox.innerHTML = event.target.result;
  	});
	fr.readAsText(uploadBtn.files[0]);
}
/*
function getSelectionText() 
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
*/
uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
underlineBtn.addEventListener("click", underline);
//text.addEventListener("DOMSubtreeModified", function() {
//	text.appendChild(spaceNode);
//});
/*
document.addEventListener("selectionchange", function() {
	//console.log(getSelectionText());

	let selection = window.getSelection().getRangeAt(0);
	let selectedText = selection.extractContents();
	let span = document.createElement("span");
	span.style.backgroundColor = "yellow";
	span.appendChild(selectedText);
	selection.insertNode(span);
});*/

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});