/**
 * File javascript của các trang liên quan đến nội dung NCKH
 */
$(document).ready(function () {
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
    var pub = false;
    var domain = pub ? 'https://vhmis.viethanit.edu.vn/' : 'http://localhost/VHMIS_WWW/'

    $('div#cv_list').each(funtion() {
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
})
