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

  $('#library-request').on('submit', function (e) {
    e.preventDefault()
    var me = $(this)
    var data = me.serialize()
    me.find('button').prop('disabled', true)
    $.post(domain + 'library/public-api/request', data, function (data) {
      if (data.error == 0) {
        alert('Yêu cầu mượn sách của bạn đã được gửi tới thư viện.')
        setCookie('giosach', '', -1)
        $('#library-request').find('input[name=ids]').val('')
        $('#cart').empty()
        me[0].reset()
      } else {
        alert(data.message)
      }
      me.find('button').prop('disabled', false);
    }, 'json')
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
        var ids = getCookie('giosach')
        var items = ids.split(',')
        if (!items.find(ele => {
          return ele == biblionumber
        })) {
          items.push(biblionumber)
          setCookie('giosach', items.join(','), 1)
          alert('Đã thêm cuốn sách này vào giỏ mượn')
        } else {
          alert('Cuốn sách đã được chọn')
        }
      })
    })
  })

  $('#cart').each(function () {
    var ids = getCookie('giosach')
    $('#library-request').find('input[name=ids]').val(ids)
    $.getJSON(domain + 'library/public-api/biblios?ids=' + ids, function (data) {
      for(var index in data) {
        var element = data[index];
        $('<div>').addClass('columns').html(`
          <div class="column is-cover">
            <img src="/photo/thuvien/biasach/${element.biblionumber}.jpg">
          </div>
          <div class="column is-info">
            <a href="/thuvien/bienmuc.html?${element.biblionumber}">${element.title}</a><br>
            ${element.author}
          </div>
        `).appendTo('#cart')
      }
    })
  })
})
