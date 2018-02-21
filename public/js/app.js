$(document).ready(function() {
  $("#edit-post").on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'PUT',
      url: $(this).attr('action'),
      data: $(this).serialize()
    }).done(function(response) {
      window.location = '/posts/' + $('#edit-post').attr('data-postId');
    })
  });
});



$('#addNewAuthor').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
