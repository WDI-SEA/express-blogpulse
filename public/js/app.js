$(document).ready(function() {

  $('.delete-tag').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).success(function(data) {
      location.reload();
    });
  });


});
