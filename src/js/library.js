function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

$(document).ready(function () {
  var pub = true;
  var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/VHMIS_WWW/'

  // Sach moi
  $('#biblios').each(function () {
    // $.get(domain + 'library/public-api/lastest-biblios', function (data) {
    $.get(domain + 'library/public-api/biblio/search', {'k': 'dc.kohaitemtype', 'q': 'SGT'}, function (data) {
      $('#biblios').html(data)
    })
  })

  // Loại sách
  var getBibliosByType = function(type, container) {
    $.get(domain + 'library/public-api/biblio/search', {'k': 'dc.kohaitemtype', 'q': type}, function (data) {
      $(container).html(data)
    })
  }

  // test
  $('#search-form form').on('submit', function (e) {
    e.preventDefault();
    var $this = $(this)
    var data = $this.serialize()

    $.get(domain + 'library/public-api/biblio/search', data, function (data) {
      $('#biblios').html(data)
    })
  })

  $('#search-form').on('click', 'li a', function (e) {
    e.preventDefault()
    var type = $(this).data('type')
    var container = '#biblios'
    getBibliosByType(type, container)
  })

  $('#biblios').on('click', 'a.page-search', function (e) {
    e.preventDefault()
    var data = {
      'p': $(this).data('page'),
      'k': $(this).data('keyword'),
      'q': $(this).data('query')
    }

    $.get(domain + 'library/public-api/biblio/search', data, function (data) {
      $('#biblios').html(data)
    })
  })

  $('#biblio-full').each(function () {
    var biblionumber = $.url('query')
    $.get(domain + 'library/public-api/biblio/' + biblionumber, function (data) {
      $('#biblio-full').html(data)
      document.title = "Biên mục # " + biblio.number + " | " + document.title
      $('meta[property=og\\:description]').attr('content', biblio.abstract)
      $('meta[property=og\\:title]').attr('content', biblio.title)
      $('meta[property=og\\:url]').attr('content', 'http://viethanit.edu.vn/thuvien/bienmuc.html?' + biblio.number)

      $('<button>').addClass('button is-primary').css('margin-top', '16px').html('Thêm vào giở sách').appendTo('#biblio-full .biblio-cover').on('click', function(e){
        setCookie('giosach', biblionumber, 1)
        console.log(getCookie('giosach'))
      })
    })
  })
})
