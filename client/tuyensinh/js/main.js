function _math_round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

(function($) {
    var vhmisModal = function(control, element, options) {
        this.options = options
        this.$element = $('#' + element)
        this.$control = $(control)

        if(this.options.element != null) {
            this.$control.on('click', this.options.element, $.proxy(this.show, this))
        } else {
            this.$control.on('click', $.proxy(this.show, this))
        }
        $('#site_overlay').on('click', $.proxy(this.hide, this))
        $('#site_overlay').on('click', '.close', function(e) {
            $('#site_overlay').trigger('click')
        })
    }

    vhmisModal.prototype = {
        constructor: vhmisModal,

        show: function (e) {
            e.preventDefault()

            var beforeShow = true

            if(this.options['beforeShow'] != null) beforeShow = this.options['beforeShow'](e.currentTarget, this.$element)

            if(beforeShow == false) return false

            $('body').addClass('site_overlay_active')
            $('#site_overlay').addClass('active')
            this.$element.addClass('active')

            //this.$element.trigger('show', [e.currentTarget])
            if(this.options['show'] != null) this.options['show'](e.currentTarget, this.$element)
        },

        hide: function (e) {
            if(e.target.id != 'site_overlay') return

            e.preventDefault()
            $('body').removeClass('site_overlay_active')
            $('#site_overlay').removeClass('active')
            this.$element.removeClass('active')

            //this.$element.trigger('hide', [e.currentTarget])
            if(this.options['hide'] != null) this.options['hide'](e.currentTarget, this.$element)
        }
    }

    $.fn.vhmisModal = function(idModal, option) {
        return this.each(function() {
            var $this = $(this)
            var options = $.extend({}, $.fn.vhmisModal.defaults, typeof option == 'object' && option)
            var modal = new vhmisModal($this, idModal, options)
        })
    }

    $.fn.vhmisModal.defaults = {
        element: null,
        beforeShow: null,
        show: null,
        hide: null,
        url: null
    }

})(jQuery);

$(document).ready(function () {
    // Modal
    $('a.open_send_question').vhmisModal('send_question_modal', {
        beforeShow: function() {
            $('#ask_other_question').trigger('click')
        }
    })

    // Menu
    $('.dropdown').hover(
        function () {
            $(this).addClass('open')
        },
        function () {
            $(this).removeClass('open')
        }
    )

    // Always top
    if(w_page != 'index') {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 80) {
                $('.sc-header').addClass('fixed')
            } else {
                $('.sc-header').removeClass('fixed')
            }
        })
    }

    // To top
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $('.totop').show()
        } else {
            $('.totop').hide();
        }
    })

    $('.totop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 'slow');
    })

    // Var
    var nhommon = {
        'A01': {
            1: 'Toán',
            2: 'Vật lí',
            3: 'Tiếng Anh'
        },
        'D01': {
            1: 'Ngữ văn',
            2: 'Toán',
            3: 'Tiếng Anh'
        },
        'D14': {
            1: 'Ngữ văn',
            2: 'Lịch sử',
            3: 'Tiếng Anh'
        },
        'D15': {
            1: 'Ngữ văn',
            2: 'Địa lí',
            3: 'Tiếng Anh'
        },
        'C01': {
            1: 'Ngữ văn',
            2: 'Toán',
            3: 'Vật lí'
        },
        'C04': {
            1: 'Ngữ văn',
            2: 'Toán',
            3: 'Địa lí'
        },
        'C00': {
            1: 'Ngữ văn',
            2: 'Lịch sử',
            3: 'Địa lí'
        }
    }

    var truongpt = {
        "04": {
            "001": "THPT Nguyễn Hiền",
            "002": "THPT Phan Châu Trinh",
            "003": "THPT Trần Phú",
            "004": "THPT TT Diên Hồng",
            "005": "THPT Chuyên Lê Quý Đôn",
            "006": "TTGDTX-HN Hải Châu+BTBK+CĐCN",
            "007": "THPT Thái Phiên",
            "008": "TT GDTX-HN Thanh Khê",
            "009": "THPT TT Quang Trung",
            "010": "THPT Hoàng Hoa Thám",
            "011": "THPT Ngô Quyền",
            "012": "TT GDTX Thành Phố",
            "013": "TT KTTH-HN Sơn Trà",
            "014": "THPT Ngũ Hành Sơn",
            "015": "TT GDTX -HN N.H. Sơn+ BTĐH Kinh tế",
            "016": "Dân Lập Hermann Gmeiner",
            "017": "THPT Nguyễn Trãi",
            "018": "THPT TT Khai Trí",
            "019": "TT GDTX-HN Liên Chiểu",
            "020": "THPT Hòa Vang",
            "021": "THPT Phan Thành Tài",
            "022": "THPT Ông ích Khiêm",
            "023": "THPT Phạm Phú Thứ",
            "024": "TT GDTX-HN Cẩm Lệ",
            "025": "TT GDTX-HN Hòa Vang",
            "026": "THPT Nguyễn Thượng Hiền",
            "027": "THPT Tôn Thất Tùng",
            "028": "THPT Thanh Khê",
            "029": "THPT Cẩm Lệ",
            "030": "CĐ Đông á",
            "031": "CĐ Phương Đông",
            "032": "TC CKN Việt Tiến",
            "033": "TC KTNV Thăng Long",
            "034": "TC KT-KT Miền Trung",
            "035": "TC KT-NV Việt á",
            "036": "TC KT-KT Đức Minh",
            "037": "CĐ nghề Đà Nẵng",
            "038": "CĐ nghề Hoàng Diệu",
            "039": "CĐ nghề Nguyễn Văn Trỗi",
            "040": "CĐ nghề Du Lịch Đà Nẵng",
            "041": "TC nghề Giao thông vận tải Đường bộ",
            "042": "TC nghề số 5",
            "043": "TC nghề Công nghiệp Tàu thuỷ III",
            "044": "TC nghề Giao thông Công chính ĐN",
            "045": "TC nghề Kỹ thuật Công nghệ Đà Nẵng",
            "046": "TC cấp nghề Cao Thắng Đà Nẵng",
            "047": "TC nghề Công nghiệp tàu thuỷ Đà Nẵng",
            "048": "TC cấp nghề Việt  úc"
        },
        "34": {
            "001": "THPT Duy Tân",
            "002": "THPT  Phan Bội Châu",
            "003": "THPT  Trần Cao Vân",
            "004": "THPT  Lê Quý Đôn",
            "005": "THPT DL  Hà Huy Tập",
            "006": "TT. GDTX tỉnh Quảng Nam",
            "007": "THPT Chuyên Nguyễn Bỉnh Khiêm",
            "008": "TT. GDTX-HN&DN  Hội An",
            "009": "THPT  Trần Quý Cáp",
            "010": "THPT Chuyên Lê Thánh Tông",
            "011": "PTDT Nội trú tỉnh Quảng Nam",
            "012": "THPT NguyễnTrãi",
            "013": "THPT   Sào Nam",
            "014": "THPT  Lê Hồng Phong",
            "015": "TT. GDTX-HN  Duy Xuyên",
            "016": "THPT  Nguyễn Hiền",
            "017": "THPT  Nguyễn Duy Hiệu",
            "018": "THPT  Hoàng Diệu",
            "019": "THPT  Phạm Phú Thứ",
            "020": "THPT  Lương Thế Vinh",
            "021": "THPT  Nguyễn Khuyến",
            "022": "TT. GDTX-HN  Điện Bàn",
            "023": "THPT  Huỳnh Ngọc Huệ",
            "024": "THPT  Chu Văn An",
            "025": "THPT  Đỗ Đăng Tuyển",
            "026": "THPT  Lương Thúc Kỳ",
            "027": "TT. GDTX-HN&DN  Đại Lộc",
            "028": "THPT  Hùng Vương",
            "029": "THPT   Quế Sơn",
            "030": "THPT  Nguyễn Văn Cừ",
            "031": "THPT   Nông Sơn",
            "032": "THPT  Trần Đại Nghĩa",
            "033": "TT. GDTX-HN&DN  Quế Sơn",
            "034": "THPT DL Phạm Văn Đồng",
            "035": "THPT   Hiệp Đức",
            "036": "TT. GDTX-HN&DN  Hiệp Đức",
            "037": "THPT   Tiểu La",
            "038": "THPT  Nguyễn Thái Bình",
            "039": "THPT Thái Phiên",
            "040": "THPT  Lý Tự Trọng",
            "041": "TT. GDTX-HN&DN  Thăng Bình",
            "042": "THPT   Núi Thành",
            "043": "THPT  Cao Bá Quát",
            "044": "THPT  Nguyễn Huệ",
            "045": "TT. GDTX-HN  Núi Thành",
            "046": "THPT  Huỳnh Thúc Kháng",
            "047": "THPT  Phan Châu Trinh",
            "048": "TT. GDTX-HN&DN  Tiên Phước",
            "049": "THPT Bắc Trà My",
            "050": "TT. GDTX-HN Bắc Trà My",
            "051": "THPT   Quang Trung",
            "052": "THPT   Nam Giang",
            "053": "THPT   Khâm Đức",
            "054": "THPT  Trần Văn Dư",
            "055": "TT GDTX-HN&DN  Phú Ninh",
            "056": "THPT Nam Trà My",
            "057": "THPT Tây Giang",
            "058": "TT.GDTX-HN Nam Trà My",
            "059": "TT.GDTX Phước Sơn",
            "060": "TT.GDTX Nam Giang",
            "061": "THPT Nguyễn Dục",
            "062": "PTDT Nội trú Nước Oa",
            "063": "THPT  Trần Phú",
            "064": "THPT  Âu Cơ",
            "065": "THPT  Trần Hưng Đạo",
            "066": "Trường PT nhiều cấp học Hoàng Sa",
            "067": "Trường PT nhiều cấp học Quảng Đông",
            "068": "THPT  Nguyễn Văn Trỗi"
        }
    }

    var makeSchoolSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value + '</option>'
        })
        $('form#xettuyen select[name=school]').html(html).prop('disabled', false)
    }

    $('form#xettuyen select[name=province]').on('change', function (e) {
        var me = $(this)
        var pro = me.val();
        if (pro == "") {
            $('form#xettuyen select[name=school]').html('<option value="0">Chọn trường</option>').prop('disabled', true)
        } else {
            if (typeof truongpt[pro] == 'undefined') {
                $('form#xettuyen select[name=school]').html('<option value="0">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=province]').prop('disabled', true)
                $.getJSON('data/pt_' + pro + '.json', function (data) {
                    truongpt[pro] = data
                    makeSchoolSelect(data)
                    $('form#xettuyen select[name=province]').prop('disabled', false)
                });
            } else {
                makeSchoolSelect(truongpt[pro])
            }
        }
    })

    $('form#xettuyen select[name=subject_combination]').on('change', function (e) {
        var me = $(this)
        var group = me.val();
        if (group == 0) {
            $('form#xettuyen div.sub1_form label').text('Điểm môn 1')
            $('form#xettuyen div.sub1_form input.nhapdiemform').prop('disabled', true)
            $('form#xettuyen div.sub2_form label').text('Điểm môn 2')
            $('form#xettuyen div.sub2_form input.nhapdiemform').prop('disabled', true)
            $('form#xettuyen div.sub3_form label').text('Điểm môn 3')
            $('form#xettuyen div.sub3_form input.nhapdiemform').prop('disabled', true)
        } else {
            $.each(nhommon[group], function (index, value) {
                $('form#xettuyen div.sub' + index + '_form label').text('Điểm môn ' + index + " : " + value)
                $('form#xettuyen div.sub' + index + '_form input.nhapdiemform').prop('disabled', false)
            })
        }
    })

    $('form#xettuyen input.nhapdiemform').on('change', function (e) {
        var me = $(this)
        var form = me.parent().parent()
        var count = 0;
        var sum = 0;
        var count_k = {k12: 0, k11: 0, k10: 0}
        var sum_k = {k12: 0, k11: 0, k10: 0}
        var error = false;
        form.removeClass('has-error')

        form.find('.nhapdiemform').each(function () {
            var sub = $(this)

            if (sub.val() != '') {
                sub.val(sub.val().replace(',', '.'))
                if ($.isNumeric(sub.val()) && parseFloat(sub.val()) >= 0 && parseFloat(sub.val()) <= 10) {
                    var heso = sub.data('count')
                    var k = sub.data('k')
                    count += heso
                    sum += parseFloat(sub.val()) * heso
                    count_k[k] += heso;
                    sum_k[k] += parseFloat(sub.val()) * heso
                } else {
                    error = true;
                }
            }
        })

        if (error) {
            form.find('.ketqua').val('Sai')
            form.addClass('has-error')
            return;
        }

        form.find('.ketqua_k10').val(count_k.k10 == 0 ? '' : _math_round(sum_k.k10 / count_k.k10, 1))
        form.find('.ketqua_k11').val(count_k.k11 == 0 ? '' : _math_round(sum_k.k11 / count_k.k11, 1))
        form.find('.ketqua_k12').val(count_k.k12 == 0 ? '' : _math_round(sum_k.k12 / count_k.k12, 1))
        form.find('.ketqua').val(count == 0 ? '' : _math_round(sum / count, 1))
    })

    $('form#xettuyen').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/school-report/add', data, function (data) {
            if (data.error == '0') {
                alert('Cảm ơn bạn đã đăng ký xét tuyển vào trường Việt Hàn, chúng tôi sẽ liên lạc và thông báo kết quả sớm với bạn.')
                me[0].reset();
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n");
                    console.log(data.form_error.message + "\n");
                    console.log(data.form_error.field + "\n");
                }
                alert(data.message)
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })

    /* Form xét tuyển điểm thi */
    $('form#xettuyen_ne select.chontohop').on('change', function (e) {
        var me = $(this)
        var form = me.parent().parent().parent()
        var sub = {
            sub_1: false,
            sub_2: false,
            sub_3: false,
            sub_4: false,
            sub_5: false
        }

        form.find('select.chontohop').each(function () {
            var combination = $(this)

            if (combination.val() != '') {
                if(combination.val() == 'A00') {
                    //$('form#xettuyen_ne input[name="sub_1"').prop('disabled', false)
                    sub.sub_1 = true;
                    sub.sub_2 = true;
                    sub.sub_3 = true;
                } else if(combination.val() == 'A01') {
                    sub.sub_1 = true;
                    sub.sub_2 = true;
                    sub.sub_5 = true;
                } else {
                    sub.sub_1 = true;
                    sub.sub_4 = true;
                    sub.sub_5 = true;
                }
            }
        })

        $.each(sub, function (key, value) {
            if(value) {
                $('form#xettuyen_ne input[name=' + key + ']').prop('disabled', false)
            } else {
                $('form#xettuyen_ne input[name=' + key + ']').prop('disabled', true).val('')
            }
        })
    })

    $('form#xettuyen_ne').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/ne-result/add', data, function (data) {
            if (data.error == '0') {
                alert('Cảm ơn bạn đã đăng ký xét tuyển vào trường Việt Hàn, chúng tôi sẽ liên lạc và thông báo kết quả sớm với bạn.')
                me[0].reset();
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n");
                    console.log(data.form_error.message + "\n");
                    console.log(data.form_error.field + "\n");
                }
                alert(data.message)
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })

    $('#ask_other_question').on('click', function(e) {
        e.preventDefault()
        $('#send_question_modal').find(".for_question").removeClass('hide')
        $('#send_question_modal').find(".for_response").addClass('hide')
    })

    $('form#ask_question').on('submit', function(e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize()
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/question/add', data, function (data) {
            if (data.error == '0') {
                $('#send_question_modal').find(".for_question").addClass('hide')
                $('#send_question_modal').find(".for_response").removeClass('hide')
                me[0].reset()
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n")
                    console.log(data.form_error.message + "\n")
                    console.log(data.form_error.field + "\n")
                }
                alert(data.message)
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })

    if(w_page == 'hoidap') {
        $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/questions', function (data) {
            $('div#question-list').html(data)
        })
    }

    if(w_page == 'xettuyen') {
        $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/list-ne-result', function (data) {
            $('div#admission-list').html(data)
        })
    }
})
