let buttonHandler = function() {
	let domForm = document.querySelectorAll('.comment-form');
	for(let i = 0; i < domForm.length; i++) {
		domForm[i].classList.remove("do-not-show");
	}
}


document.addEventListener('DOMContentLoaded', function(){
	let domCommentBtn = document.querySelector('#comment-button');
	domCommentBtn.addEventListener('click', buttonHandler);
});