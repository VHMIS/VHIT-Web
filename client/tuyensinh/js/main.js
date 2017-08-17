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
    // if(w_page != 'index') {
    //     $(window).scroll(function () {
    //         if ($(window).scrollTop() > 80) {
    //             $('.sc-header').addClass('fixed')
    //         } else {
    //             $('.sc-header').removeClass('fixed')
    //         }
    //     })
    // }

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

    var truongpt = {}

    var makePDistrictSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=gradute_school_k12_district]').html(html).prop('disabled', false)
    }

    var makePDistrict9Select = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=gradute_school_k9_district]').html(html).prop('disabled', false)
    }

    var makeSchoolSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=gradute_school_k12_school]').html(html).prop('disabled', false)
    }

    $('form#xettuyen select[name=gradute_school_k12_province]').on('change', function (e) {
        var me = $(this)
        var pro = me.val()
        if (pro === '') {
            $('form#xettuyen select[name=gradute_school_k12_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
            $('form#xettuyen select[name=gradute_school_k12_school]').html('<option value="0">Chọn trường</option>').prop('disabled', true)
        } else {
            if (typeof truongpt[pro] === 'undefined') {
                $('form#xettuyen select[name=gradute_school_k12_district]').html('<option value="0">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=gradute_school_k12_school]').html('<option value="0">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=gradute_school_k12_province]').prop('disabled', true)
                $.getJSON('data/pt_' + pro + '.json', function (data) {
                    truongpt[pro] = data
                    makePDistrictSelect(data)
                    $('form#xettuyen select[name=gradute_school_k12_province]').prop('disabled', false)
                    $('form#xettuyen select[name=gradute_school_k12_district]').trigger('change')
                })
            } else {
                makePDistrictSelect(truongpt[pro])
                $('form#xettuyen select[name=gradute_school_k12_district]').trigger('change')
            }
        }
    })

    $('form#xettuyen select[name=gradute_school_k9_province]').on('change', function (e) {
        var me = $(this)
        var pro = me.val()
        if (pro === '') {
            $('form#xettuyen select[name=gradute_school_k9_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
        } else {
            if (typeof truongpt[pro] === 'undefined') {
                $('form#xettuyen select[name=gradute_school_k9_district]').html('<option value="0">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=gradute_school_k9_province]').prop('disabled', true)
                $.getJSON('data/pt_' + pro + '.json', function (data) {
                    truongpt[pro] = data
                    makePDistrict9Select(data)
                    $('form#xettuyen select[name=gradute_school_k9_province]').prop('disabled', false)
                })
            } else {
                makePDistrict9Select(truongpt[pro])
            }
        }
    })

    var areas = {
        '1': 'KV 1',
        '2': 'KV 2',
        '2NT': 'KV 2-NT',
        '3': 'KV 3'
    }

    $('form#xettuyen select[name=gradute_school_k12_district]').on('change', function (e) {
        var me = $(this)
        var pro = $('form#xettuyen select[name=gradute_school_k12_province]').val()
        var district = me.val()
        makeSchoolSelect(truongpt[pro][district]['school'])
        $('form#xettuyen select[name=gradute_school_k12_school]').trigger('change')
    })

    var majors = {
        cd: {
            '6210402': 'Thiết kế đồ họa',
            '6210403': 'Thiết kế nội thất',
            '6220202': 'Phiên dịch tiếng Anh thương mại',
            '6220203': 'Phiên dịch tiếng Anh du lịch',
            '6320103': 'Báo chí',
            '6320106': 'Truyền thông đa phương tiện',
            '6340117': 'Marketing du lịch',
            '6320108': 'Quan hệ công chúng',
            '6340113': 'Logistic',
            '6340303': 'Kế toán lao động, tiền lương và bảo hiểm xã hội',
            '6480102': 'Kỹ thuật sửa chữa, lắp ráp  máy tính',
            '6480103': 'Thiết kế mạch điện tử trên máy tính',
            '6480202': 'Công nghệ thông tin (ứng dụng phần mềm)',
            '6480203': 'Tin học văn phòng',
            '6480204': 'Tin học viễn thông ứng dụng',
            '6480206': 'Xử lý dữ liệu',
            '6480207': 'Lập trình máy tính',
            '6480208': 'Quản trị cơ sở dữ liệu',
            '6480209': 'Quản trị mạng máy tính',
            '6340122': 'Thương mại điện tử',
            '6480214': 'Thiết kế trang Web',
            '6480216': 'An ninh mạng',
            '6510101': 'Công nghệ kỹ thuật kiến trúc',
            '6520226': 'Điện dân dụng',
            '6810201': 'Quản trị khách sạn'
        },
        tc: {
            '5210418': 'Thiết kế trang trí sản phẩm, bao bì',
            '5340119': 'Nghiệp vụ bán hàng',
            '5340304': 'Kế toán vật tư',
            '5340122': 'Thương mại điện tử',
            '5480102': 'Kỹ thuật sửa chữa, lắp ráp máy tính',
            '5480103': 'Thiết kế mạch điện tử trên máy tính',
            '5480203': 'Tin học văn phòng',
            '5480204': 'Tin học viễn thông ứng dụng',
            '5480214': 'Thiết kế trang Web',
            '5520226': 'Điện dân dụng',
            '5580102': 'Họa viên kiến trúc'
        }
    };

    var makeMajorSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value + '</option>'
        })
        $('form#xettuyen select[name=major_1], form#xettuyen select[name=major_2]').html(html).prop('disabled', false)
    }

    var makeDisableMajor = function() {
        // var major = $("form#xettuyen select[name=major_1]").val()
        // $("form#xettuyen select[name=major_2] option").attr('disabled', false)
        // $("form#xettuyen select[name=major_2] option[value='"+ major + "']").attr('disabled', true)
    }

    $('form#xettuyen input[name=level]').on('click', function (e) {
        var me = $(this)
        var level = me.val()
        var type = me.data('tc')
        makeMajorSelect(majors[level])
        makeDisableMajor()
        $('#major_1').show()
        $('#major_2').show()
        $('#gradute_school_k12').show()
        $('#gradute_school_k9').show()
        if (type === 2) {
            $('#gradute_school_k9').hide()
            $('form#xettuyen select[name=gradute_school_k9_province]').val('')
            $('form#xettuyen select[name=gradute_school_k9_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
            $('form#xettuyen input[name=gradute_school_k9_school]').val('');
        } else {
            $('#gradute_school_k12').hide()
            $('form#xettuyen select[name=gradute_school_k12_province]').val('')
            $('form#xettuyen select[name=gradute_school_k12_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
            $('form#xettuyen select[name=gradute_school_k12_school]').html('<option value="0">Chọn trường</option>').prop('disabled', true)
        }
    })

    $('form#xettuyen select[name=major_1]').on('change', function (e) {
        makeDisableMajor()
    })

    var diachihk = {}
    var makeDistrictSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').html(html).prop('disabled', false)
    }
    var makeWardSelect = function (pro, dis) {
        var html = ''
        $.each(diachihk[pro][dis]['ward'], function (index, value) {
            html += '<option value="' + index + '">' + value + '</option>'
        })
        $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').html(html).prop('disabled', false)
    }

    $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').on('change', function (e) {
        var me = $(this)
        var pro = me.val();
        if (pro == "") {
            $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').html('<option value="">Chọn Huyện thị</option>').prop('disabled', true)
        } else {
            if (typeof diachihk[pro] == 'undefined') {
                $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').html('<option value="">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').prop('disabled', true)
                $.getJSON('data/fa_' + pro + '.json', function (data) {
                    diachihk[pro] = data
                    makeDistrictSelect(data)
                    $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').prop('disabled', false)
                });
            } else {
                makeDistrictSelect(diachihk[pro])
            }

            $('form#xettuyen select[name=province], form#xettuyen_ne select[name=province]').val(pro).trigger('change')
        }
    })

    $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').on('change', function (e) {
        var me = $(this)
        var pro = $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').val()
        var dis = me.val()
        makeWardSelect(pro, dis)
    })

    $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').on('change', function (e) {
        var me = $(this)
        var ward = me.val()

        if (ward === "00") {
            $('#xettuyen .fa_ward_other, #xettuyen_ne .fa_ward_other').show()
        } else {
            $('#xettuyen .fa_ward_other, #xettuyen_ne .fa_ward_other').hide()
        }
    })

    $('form#xettuyen').on('submit', function (e) {
        e.preventDefault()

        $('form#xettuyen input[name=fa_province_name]').val($('form#xettuyen select[name=fa_province] option:selected').text())
        $('form#xettuyen input[name=fa_district_name]').val($('form#xettuyen select[name=fa_district] option:selected').text())

        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/add', data, function (data) {
        // $.post('http://localhost/VHMIS_WWW/education/public-api/admission/add', data, function (data) {
        // $.post('http://localhost/education/public-api/admission/add', data, function (data) {
            if (data.error == '0') {
                alert('Cảm ơn bạn đã đăng ký xét tuyển vào trường Việt Hàn, chúng tôi sẽ liên lạc và thông báo kết quả sớm với bạn.')
                me[0].reset();
                $('#major_1').hide()
                $('#major_2').hide()
                $('#gradute_school_k12').hide()
                $('#gradute_school_k9').hide()
                $('form#xettuyen select[name=gradute_school_k9_province]').val('')
                $('form#xettuyen select[name=gradute_school_k9_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
                $('form#xettuyen input[name=gradute_school_k9_school]').val('');
                $('form#xettuyen select[name=gradute_school_k12_province]').val('')
                $('form#xettuyen select[name=gradute_school_k12_district]').html('<option value="0">Chọn quận huyện</option>').prop('disabled', true)
                $('form#xettuyen select[name=gradute_school_k12_school]').html('<option value="0">Chọn trường</option>').prop('disabled', true)
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

    if(w_page == 'thongke') {
        $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/lastest', function (data) {
            $('div#lastest_ad').html(data)
        })
    }

    if(w_page == 'xettuyen') {
        $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/list-ne-result', function (data) {
            $('div#admission-list').html(data)
        })
    }

    $('form#tracuu_trungtuyen').on('submit', function (e) {
        e.preventDefault()

        var me = $(this)

        var data = me.serialize();

        me.find('button').prop('disabled', true);
        $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/search-result', data, function (data) {
        //$.get('http://localhost/VHMIS_WWW/education/public-api/admission/search-result', data, function (data) {
            $('#ketqua_trungtuyen').html(data).show()
            me.find('button').prop('disabled', false);
        })
    })
})
