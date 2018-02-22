$(document).ready(function() {


  // DELETE
  $('.delete-tag').on('click', function(e){
    e.preventDefault();
    var tagObj = $(this);
    var tagUrl = tagObj.attr('href');
    console.log("hit delete tag ");
    $.ajax({
      method: 'DELETE',
      url: tagUrl
    }).success(function(tag){
      location.reload();
    });
  });


  // DELETE
  $('.delete-item').on('click', function(e){
    e.preventDefault();
    var commentObj = $(this);
    var commentUrl = commentObj.attr('href');
    // console.log("hit delete link");
    $.ajax({
      method: 'DELETE',
      url: commentUrl
    }).done(function(comment){
      location.reload();
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
      location.reload();
    });
  });

   // PUT
    $('.edit-tag').on('submit', function(e){
      e.preventDefault();
      var tagObj = $(this);
      var tagUrl = tagObj.attr('action');
      var tagData = tagObj.serialize();
      $.ajax({
        method: 'PUT',
        url: tagUrl,
        data: tagData
      }).done(function(comment){
        location.reload();
      });
    });


  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

});
