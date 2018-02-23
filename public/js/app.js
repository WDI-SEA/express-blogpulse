$(document).ready(function() {
  $('.delete-tag').click(function(e) {
    e.preventDefault();  //prevents the GET request it would normally perform
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).success(function(data) {
      location.reload();
    });
  });

  $('#delete-post').click(function(e) {
    e.preventDefault();  //prevents the GET request it would normally perform
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).success(function(data) {
      window.location.href = "/";
    });
  });

  $('#edit-tag').submit(function(e) {
    e.preventDefault();  //prevents the GET request it would normally perform
    $.ajax({
      url: $(this).attr('action'),
      method: 'PUT',
      data: {
        name: $('#name').val()
      }
    }).success(function(data) {
      window.location.href = "/tags";
    });
  });
});
