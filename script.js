const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");

function download() {
	var myFile = new File([textbox.value], "notes.txt", {type: "text/plain;charset=utf-8"});
    saveAs(myFile);
}

function upload() {
	
}

downloadBtn.addEventListener("click", function() {
	download();
});