$(document).ready(function() {
	$('#delete-comment').on('click', function(e) {
	e.preventDefault();
	var thisComment = $(this);
	var destination = thisComment.attr('href');
	$.ajax({
		method: 'DELETE', 
		url: destination
	}).done(function(data) {
		console.log(data);
	});
});


$(".button-collapse").sideNav();
});
