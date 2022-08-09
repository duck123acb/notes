const textbox = document.getElementById("text");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

function download() {
	var myFile = new File([textbox.value], "notes.txt", {type: "text/plain;charset=utf-8"});
    saveAs(myFile);
}

function upload() {
    let fr = new FileReader();
	fr.addEventListener('load', (event) => {
    	textbox.value = event.target.result;
  	});
    fr.readAsText(uploadBtn.files[0]);
}

// uploadBtn.addEventListener("change", function () {
// 	upload();
// });

// downloadBtn.addEventListener("click", function() {
// 	download();
// });


uploadBtn.addEventListener("change", upload);

downloadBtn.addEventListener("click", download);