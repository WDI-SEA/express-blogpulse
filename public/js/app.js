var formDiv = document.getElementById("comment-form");
var formUserName = document.getElementById("form-username");
var formComment = document.getElementById("form-comment");
var formSubmit = document.getElementById("form-submit");
formDiv.style.height = "0px";
var commentAdded = false;


$(document).ready(function() {
	document.getElementById("add-comment").addEventListener("click", function() {
	  //this.classList.toggle("active");
	    if (formDiv.style.height === "0px") {
	      formDiv.style.height = "280px";
	    } else {
	      formDiv.style.height = "0px";
	    }
	})

	formUserName.addEventListener("change", checkFormDirty);
	formComment.addEventListener("change", checkFormDirty);

});

function checkFormDirty() {
		if (formUserName.value != "" && formComment.value != "") {
			formSubmit.disabled = false;
		} else {
			formSubmit.disabled = true;
		}
}
