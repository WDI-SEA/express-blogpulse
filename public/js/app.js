$(document).ready(function() {

  // DELETE a specific comment from the database
  $(".delete").on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var currentPost = $(this).attr('id');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      window.location = '/posts/' + currentPost;
    })
  });
});
