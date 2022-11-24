const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

// setup
textbox.contentEditable = true;

function download() {
	saveAs(new File([textbox.innerHTML], {type:"text/plain;charset=utf-8"}), "notes.ducknote")
}

function upload() {
	let fr = new FileReader();
	fr.addEventListener('load', (event) => {
		textbox.innerText = event.target.result;
  	});
	fr.readAsText(uploadBtn.files[0]);
}

uploadBtn.addEventListener("change", upload);
downloadBtn.addEventListener("click", download);
underlineBtn.addEventListener("click", underline);
addEventListener("beforeunload", function (e) {
    const confirmationMessage = 'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
