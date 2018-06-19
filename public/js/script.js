$(document).ready(function() {

  $('.sign-up').click(function() {
    $('#myModal').modal('toggle');
  });

  $('.edit-form').on('submit', function(e) {
    e.preventDefault;
    var newData = $(this).serialize;
    var url = $(this).attr('action');
    $.ajax({
      method: 'PUT',
      data: newData,
      url: url
    }).done(function(data){
      console.log(data);
      window.location = '/';
    });
  });


});
