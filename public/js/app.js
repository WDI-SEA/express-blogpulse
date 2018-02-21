$(document).ready(function() {

  $('.delete-link').on('click', function(e) {
    e.preventDefault();
    var comment = $(this);
    var commentUrl = comment.attr('href');
    $.ajax({
      method: 'DELETE',
      url: commentUrl
    }).done(function(data) {
      // get data returned from the DELETE route
      console.log(data);

      // do stuff when the DELETE action is complete
      // comment.remove();

      // or, you can redirect to another page
      // location.reload();
    });
  });

});
