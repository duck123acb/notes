const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const underlineBtn = document.getElementById("underline");
// const notAllowedTags = [
// 	"a",
// 	"abbr",
// 	"acronym",
// 	"address",
// 	"applet",
// 	"area",
// 	"article",
// 	"aside",
// 	"audio",
// 	"b",
// 	"base",
// 	"basefont",
// 	"bdi",
// 	"bdo",
// 	"big",
// 	"blockquote",
// 	"body",
// 	"br",
// 	"button",
// 	"canvas",
// 	"caption",
// 	"center",
// 	"cite",
// 	"code",
// 	"col",
// 	"colgroup",
// 	"data",
// 	"datalist",
// 	"dd",
// 	"del",
// 	"details",
// 	"dfn",
// 	"dialog",
// 	"dir",
// 	"div",
// 	"dl",
// 	"dt",
// 	"em",
// 	"embed",
// 	"fieldset",
// 	"figcaption",
// 	"figure",
// 	"font",
// 	"footer",
// 	"form",
// 	"frame",
// 	"frameset",
// 	"h1 - h6",
// 	"head",
// 	"header",
// 	"hr",
// 	"html",
// 	"i",
// 	"iframe",
// 	"img",
// 	"input",
// 	"ins",
// 	"kbd",
// 	"label",
// 	"legend",
// 	"li",
// 	"link",
// 	"main",
// 	"map",
// 	"mark",
// 	"menu",
// 	"menuitem",
// 	"meta",
// 	"meter",
// 	"nav",
// 	"noframes",
// 	"noscript",
// 	"object",
// 	"ol",
// 	"optgroup",
// 	"option",
// 	"output",
// 	"p",
// 	"param",
// 	"picture",
// 	"pre",
// 	"progress",
// 	"q",
// 	"rp",
// 	"rt",
// 	"ruby",
// 	"s",
// 	"samp",
// 	"script",
// 	"section",
// 	"select",
// 	"small",
// 	"source",
// 	"strike",
// 	"strong",
// 	"style",
// 	"sub",
// 	"summary",
// 	"sup",
// 	"svg",
// 	"table",
// 	"tbody",
// 	"td",
// 	"template",
// 	"textarea",
// 	"tfoot",
// 	"th",
// 	"thead",
// 	"time",
// 	"title",
// 	"tr",
// 	"track",
// 	"tt",
// 	"u",
// 	"ul",
// 	"var",
// 	"video",
// 	"wbr"
// 	]

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
        span.appendChild(selectedText);cdxs
        selection.insertNode(span);
	text.append(spaceNode);
}

function download() {
<<<<<<< HEAD

	saveAs(new File([textbox.innerHTML], {type:"text/plain;charset=utf-8"}), "notes.xhtml")
=======
	let notesFile = new File([textbox.innerText], "notes.txt", {type: "text/plain;charset=utf-8"});
	// saveAs(notesFile);
	saveAs(new File([textbox.innerHTML], {type:"text/plain;charset=utf-8"}), "hi.xhtml")
>>>>>>> parent of 22771e0 (no more useless vars)
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
    var confirmationMessage = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
