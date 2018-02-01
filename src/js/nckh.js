/**
 * File javascript của các trang liên quan đến nội dung NCKH
 */
$(document).ready(function () {
    var pub = false;
    var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/VHMIS_WWW/'

    // Form tra cứu lý lịch khoa khọc
    // -- Làm các thành phần select đẹp hơn
    $('#form-scv-list select[name=name]').select2({
        minimumResultsForSearch: Infinity
    })
    $('#form-scv-list select[name=workfor]').select2({
        minimumResultsForSearch: Infinity
    })
    $('#form-scv-list select[name=diploma]').select2({
        minimumResultsForSearch: Infinity
    })
    $('#form-scv-list select[name=dh]').select2({
        minimumResultsForSearch: Infinity
    })
    $('#form-scv-list select[name=field]').select2({
        minimumResultsForSearch: Infinity
    })

    // Lấy danh sách & chi tiết lý lịch
    $('div#cv_list').each(function() {
        $.get(domain + 'research/public-api/scv/list/viethan', function (data) {
            $('div#cv_list').html(data)
        })
    })

    $('div#cv-full').each(function() {
        var $this = $(this)
        var sc = $.url('query')
        $.get(domain + 'research/public-api/scv/get-cv/' + sc, function (data) {
            $this.html(data)
        })
    })

    // Xử lý tìm kiếm
    $("#search-form .type-container span").on('click', function (e) {
        $("#search-form .type-container span").removeClass('active')
        $(this).addClass('active')
        var searchFor = $(this).data('search-for')
        $("#search-form .scientist-container").addClass('hidden')
        $("#search-form .work-container").addClass('hidden')
        $("#search-form ." + searchFor + "-container").removeClass('hidden')
        $("#search-form").data('search-for', searchFor)
    })

    $("#search-form button").on('click', function (e) {
        var searchFor = $("#search-form").data('searchFor')

        if (searchFor === "work") {
            var data = {
                title: $("#search-form input[name=work-title]").val().trim(),
                description: $("#search-form input[name=work-description]").val().trim(),
                author: $("#search-form input[name=work-author]").val().trim(),
                year: $("#search-form input[name=work-year]").val().trim(),
                field: $("#search-form input[name=work-field]").val().trim()
            }

            if (data.title === "" && data.description === "" && data.author === "" && data.year === "" && data.field === "") {
                alert("Vui lòng cung cấp một nội dung cần tìm kiếm")
                $("#search-form input[name=work-title]").focus()
                return false
            }

            $.post(domain + 'research/public-api/scv/search/work', data, function (data) {
                $("#search-result").html(data)
            })

            return true;
        }

        var data = {
            name: $("#search-form input[name=scientist-name]").val().trim(),
            work: $("#search-form input[name=scientist-workfor]").val().trim(),
            field: $("#search-form input[name=scientist-field]").val().trim()
        }

        if (data.name === "" && data.work === "" && data.field === "") {
            alert("Vui lòng cung cấp một nội dung cần tìm kiếm")
            $("#search-form input[name=scientist-name]").focus()
            return false
        }

        $.post(domain + 'research/public-api/scv/search/scientist', data, function (data) {
            $("#search-result").html(data)
        })
    })

    // Hiển thị thông tin cơ bản của công trình lên
    $("#search-result, #cv-full").vhmisModal('work-detail', {
        element: "a.work-detail",
        beforeShow: function(ele, modal) {
            $(modal).html('')
            var id = $(ele).data('id')
            var type = $(ele).data('type')

            $.get(domain + 'research/public-api/scv/detail/' + type +'/' + id, function (data) {
                $(modal).html(data)
            })
        }
    })

    // Lộc công trình ở lý lích
    $('#cv-full1, #cv-full').on('click', '.works-fields .years li', function (e) {
        var $this = $(this)
        if ($this.hasClass('active')) {
            $this.removeClass('active')
            $('.scv-works .work').show()
            return true
        }

        var select = 'year_' + $this.data('year')
        $('.scv-works .work').hide()
        $('.scv-works .work.' + select).show()
        $('.works-fields li').removeClass('active')
        $this.addClass('active')
    })

    $('#cv-full1, #cv-full').on('click', '.works-fields .fields li', function (e) {
        var $this = $(this)
        if ($this.hasClass('active')) {
            $this.removeClass('active')
            $('.scv-works .work').show()
            return true
        }

        var select = 'field_' + $this.data('field')
        $('.scv-works .work').hide()
        $('.scv-works .work.' + select).show()
        $('.works-fields li').removeClass('active')
        $this.addClass('active')
    })

    $('div.full_issue').each(function () {
      var journal = $(this).data('journal')
      var issue = $(this).data('issue')
      $.getJSON(domain + 'research/public-api/journal/' + journal + '/issue/' + issue, function (data) {
          //alert(data)
          console.log(data)
          for (sub of data.submissions) {
            var a = $('<li class="work" />').html('<div class="title"><a href="#">' + sub.title + '</a></div>').appendTo('.works')
          }
      })
    })
})

$(document).ready(function () {
    var pub = false;
    var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/VHMIS_WWW/'

    // Lấy danh sách & chi tiết lý lịch
    $('div#job_list').each(function() {
        $.get(domain + 'enterprise/public-api/job/list', function (data) {
            $('div#job_list').html(data)
        })
    })
})
