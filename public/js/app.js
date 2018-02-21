$(document).ready(function() {

  // DELETE
  $('.delete-item').on('click', function(e){
  e.preventDefault();
  var commentObj = $(this);
  var commentUrl = commentObj.attr('href');
  console.log("hit the delete link");
  $.ajax({
    method: 'DELETE',
    url: commentUrl
  }).done(function(comment){
    window.location = "/posts";
  });
});

  // PUT
  $('.put-form').on('submit', function(e){
  e.preventDefault();
  var commentObj = $(this);
  var commentUrl = commentObj.attr('action');
  var commentData = commentObj.serialize();
  $.ajax({
    method: 'PUT',
    url: commentUrl,
    data: commentData
  }).done(function(comment){
    window.location = '/posts';
  });
});


  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

});
