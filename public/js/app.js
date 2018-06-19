$(document).ready(function() {
	console.log('doc ready');
	$('.edit-form').submit(function(e) {
		console.log('submitted')
		e.preventDefault();
		let url = $(this).attr('action');
		let id = $()
		let newData = $(this).serialize();
		let postId = $(this).attr('data-id');
		$.ajax({
			method: 'PUT',
			url: url,
			data: newData
		}).done(function(data) {
			window.location = '/posts/' + postId;
		});
	});
});	
