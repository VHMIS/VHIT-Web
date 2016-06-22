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

    // Lấy danh sách lý lịch
    $.get('http://localhost/VHMIS_WWW/research/public-api/scv/list/viethan', function (data) {
        $('div#cv_list').html(data)
    })

    $('#cv-full').each(function(){
        var $this = $(this)
        var sc = $.url('query')
        $.get('http://localhost/VHMIS_WWW/research/public-api/scv/get-cv/' + sc, function (data) {
            $this.html(data)
        })
    })



})
