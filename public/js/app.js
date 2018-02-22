$(document).ready(function() {
	$('.delete-link').click(function(e) {
		e.preventDefault(); //a tags usually gives Get action
		$.ajax({
			url: $(this).attr('href'),
			method: 'DELETE'
		}).success(function(data) {
			location.reload();
		})
	})


	$('#edit-tag').submit(function(e) {
		console.log('submit!!');
		e.preventDefault(); //a tags usually gives Get action
		$.ajax({
			url: $(this).attr('action'),
			method: 'PUT',
			data: {
				name: $("#name").val()
			}
		}).success(function(data) {
			window.location.href = '/tags';
		})
	})


});
