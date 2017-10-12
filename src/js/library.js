$(document).ready(function () {
  var pub = true;
  var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/VHMIS_WWW/'

  // Sach moi
  $('#biblios').each(function () {
    $.get(domain + 'library/public-api/lastest-biblios', function (data) {
      $('div#list-new-docs').html(data)
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
    })
  })
})
