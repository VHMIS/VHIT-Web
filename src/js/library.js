$(document).ready(function () {
  var pub = false;
  var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/'

  // Sach moi
  $('div#list-new-docs').each(function () {
    $.get(domain + 'library/public-api/lastest-biblios', function (data) {
      $('div#list-new-docs').html(data)
    })
  })
})
