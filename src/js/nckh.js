/**
 * File javascript của các trang liên quan đến nội dung NCKH
 */
$(document).ready(function () {
    var pub = true;
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
            alert("Đang triển khai")
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
        }

        $.post(domain + 'research/public-api/scv/search/scientist', data, function (data) {
            $("#search-result").html(data)
        })
    })
})
