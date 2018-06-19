$(document).ready(function() {
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
