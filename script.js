const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const underlineBtn = document.getElementById("underline");
const notAllowedTags = [
	"a",
	"abbr",
	"acronym",
	"address",
	"applet",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"basefont",
	"bdi",
	"bdo",
	"big",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1 - h6",
	"head",
	"header",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noframes",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"svg",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
];

// setup
textbox.contentEditable = true;
const spaceNode = document.createElement("span");
spaceNode.style.display = "inline-block";
spaceNode.innerText = "\xa0";

function underline() {
	const selection = window.getSelection().getRangeAt(0);
	const selectedText = selection.extractContents();
	const span = document.createElement("span");
	span.style.textDecoration = "underline";
	span.appendChild(selectedText);
	selection.insertNode(span);
	text.append(spaceNode);
}

function download() {
	saveAs(new File([textbox.innerHTML], {type:"text/plain;charset=utf-8"}), "notes.xhtml")
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		var cleanText = event.target.result;
		for (const notAllowedTag of notAllowedTags) {
			cleanText = cleanText.replaceAll(`&lt;${notAllowedTag}&gt;`, " ");
		}
		textbox.innerHTML = cleanText;
  	});
	fr.readAsText(uploadBtn.files[0]);
}

uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
underlineBtn.addEventListener("click", underline);
addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});