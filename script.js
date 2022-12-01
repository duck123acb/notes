const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

function download() {
	saveAs(new File([textbox.value], {type:"text/plain;charset=utf-8"}), "notes.ducknote")
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		textbox.value = event.target.result;
  	});
	fr.readAsText(uploadBtn.files[0]);
}

uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
textbox.addEventListener("keydown", function(event) {
	if (event.key === "Tab") {
		event.preventDefault();
		const [startPos, endPos] = [textbox.selectionStart, textbox.selectionEnd];
		textbox.setRangeText("\t", startPos, endPos, "end");
	}
});
addEventListener("beforeunload", function(event) {
    const confirmationMessage = 'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';

    (event || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
