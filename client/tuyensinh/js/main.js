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

    var truongpt = {}

    var makePDistrictSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=gradute_school_k12_district]').html(html).prop('disabled', false)
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
                    //makeSchoolSelect(data)
                    $('form#xettuyen select[name=gradute_school_k12_province]').prop('disabled', false)
                    $('form#xettuyen select[name=gradute_school_k12_district]').trigger('change')
                })
            } else {
                makePDistrictSelect(truongpt[pro])
                //makeSchoolSelect(truongpt[pro])
                $('form#xettuyen select[name=gradute_school_k12_district]').trigger('change')
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

    $('form#xettuyen select[name=gradute_school_k12_school]').on('change', function (e) {
        var me = $(this)
        var school = me.val()
        if (school === '') {
            $('form#xettuyen input[name=gradute_school_k12_priority_area], form#xettuyen_ne input[name=priority_area]').val('')
            $('form#xettuyen input[name=gradute_school_k12_priority_area_text], form#xettuyen_ne input[name=priority_area_text]').val('Khu vực')
        } else {
            var pro = $('form#xettuyen select[name=gradute_school_k12_province]').val()
            var district = $('form#xettuyen select[name=gradute_school_k12_district]').val()
            var area = truongpt[pro][district]['school'][school]['area']
            $('form#xettuyen input[name=gradute_school_k12_priority_area], form#xettuyen_ne input[name=priority_area').val(area)
            $('form#xettuyen input[name=gradute_school_k12_priority_area_text], form#xettuyen_ne input[name=priority_area_text]').val(areas[area])
        }
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
        makeMajorSelect(majors[level])
        makeDisableMajor()
        $('#major_1').removeClass('hide')
        $('#major_2').removeClass('hide')
        $('#gradute_school_k12').removeClass('hide')
        $('#gradute_school_k9').removeClass('hide')
        if (level === 'cd') {
            $('#gradute_school_k9').addClass('hide')
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
            $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').html('<option value="">Chọn Xã phường</option>').prop('disabled', true)
        } else {
            if (typeof diachihk[pro] == 'undefined') {
                $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').html('<option value="">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').html('<option value="">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').prop('disabled', true)
                $.getJSON('data/fa_' + pro + '.json', function (data) {
                    diachihk[pro] = data
                    makeDistrictSelect(data)
                    $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').trigger('change')
                    $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').trigger('change')
                    $('form#xettuyen select[name=fa_province], form#xettuyen_ne select[name=fa_province]').prop('disabled', false)
                });
            } else {
                makeDistrictSelect(truongpt[pro])
                $('form#xettuyen select[name=fa_district], form#xettuyen_ne select[name=fa_district]').trigger('change')
                $('form#xettuyen select[name=fa_ward], form#xettuyen_ne select[name=fa_ward]').trigger('change')
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
        //var count_k = {k12: 0, k11: 0, k10: 0}
        //var sum_k = {k12: 0, k11: 0, k10: 0}
        var error = false;
        form.removeClass('has-error')

        form.find('.nhapdiemform').each(function () {
            var sub = $(this)

            if (sub.val() != '') {
                sub.val(sub.val().replace(',', '.'))
                if ($.isNumeric(sub.val()) && parseFloat(sub.val()) >= 0 && parseFloat(sub.val()) <= 10) {
                    //var heso = sub.data('count')
                    //var k = sub.data('k')
                    count += 1//heso
                    sum += parseFloat(sub.val())// * heso
                    //count_k[k] += heso;
                    //sum_k[k] += parseFloat(sub.val())// * heso
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

        //form.find('.ketqua_k10').val(count_k.k10 == 0 ? '' : _math_round(sum_k.k10 / count_k.k10, 1))
        //form.find('.ketqua_k11').val(count_k.k11 == 0 ? '' : _math_round(sum_k.k11 / count_k.k11, 1))
        //form.find('.ketqua_k12').val(count_k.k12 == 0 ? '' : _math_round(sum_k.k12 / count_k.k12, 1))
        form.find('.ketqua').val(count == 0 ? '' : _math_round(sum / 3, 1))
    })

    $('form#xettuyen input[name=gradute]').on('change', function (e) {
        var me = $(this)
        if(me.prop('checked')) {
            $('#xettuyen .gradute_year').show()
        } else {
            $('#xettuyen .gradute_year').hide()
        }
    })

    $('form#xettuyen').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        //$.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/add', data, function (data) {
        $.post('http://localhost/VHMIS_WWW/education/public-api/admission/add', data, function (data) {
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

    // $('form#xettuyen').on('submit', function (e) {
    //     e.preventDefault()
    //
    //     $('form#xettuyen input[name=fa_province_name]').val($('form#xettuyen select[name=fa_province] option:selected').text())
    //     $('form#xettuyen input[name=fa_district_name]').val($('form#xettuyen select[name=fa_district] option:selected').text())
    //     $('form#xettuyen input[name=fa_ward_name]').val($('form#xettuyen select[name=fa_ward] option:selected').text())
    //
    //     var me = $(this)
    //
    //     var data = me.serialize();
    //
    //     me.find('button').prop('disabled', true);
    //     $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/school-report/add', data, function (data) {
    //     //$.post('http://localhost/VHMIS_WWW/education/public-api/admission/school-report/add', data, function (data) {
    //         if (data.error == '0') {
    //             alert('Cảm ơn bạn đã đăng ký xét tuyển vào trường Việt Hàn, chúng tôi sẽ liên lạc và thông báo kết quả sớm với bạn.')
    //             me[0].reset();
    //         } else {
    //             if(data.error == '2') {
    //                 console.log(data.form_error.code + "\n");
    //                 console.log(data.form_error.message + "\n");
    //                 console.log(data.form_error.field + "\n");
    //             }
    //             alert(data.message)
    //         }
    //         me.find('button').prop('disabled', false);
    //     }, 'json')
    // })

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

    $('form#xettuyen_ne select.chonnganh, form#xettuyen select.chonnganh').on('change', function (e) {
        var me = $(this)
        var mysister = me.parent().parent().find('select.chontohop')
        var type = me.find('option:selected').data('type')
        mysister.val('').find('option').each(function () {
            var option = $(this)

            if(option.val() == '') {
                return;
            }

            if(option.data('type') == type || option.data('type') == '1,2') {
                option.prop('disabled', false).show()
                return;
            }

            option.prop('disabled', true).hide()
        })
    })

    $('form#xettuyen_ne input[name=other_register]').on('change', function (e) {
        var me = $(this)
        if(me.prop('checked')) {
            $('#xettuyen_ne .other_register').show()
        } else {
            $('#xettuyen_ne .other_register').hide()
        }
    })

    var caodangdh = null
    $('form#xettuyen_ne input[name=other_school]').on('change', function (e) {
        var me = $(this)
        var college = me.val();
        if (college == "") {
            $('form#xettuyen_ne input[name=other_school_name]').val("")
        } else if (college == "CHV") {
            alert('Không chọn lại mã CHV : Cao đẳng Việt Hàn')
            $('form#xettuyen_ne input[name=other_school_name]').val('')
            me.val('').get(0).focus();
        } else {
            if (caodangdh == null) {
                $.getJSON('data/college.json', function (data) {
                    caodangdh = data
                    if (typeof caodangdh[college] == 'undefined') {
                        alert('Mã trường không chính xác')
                        $('form#xettuyen_ne input[name=other_school_name]').val('')
                        me.val('').get(0).focus();
                    } else {
                        $('form#xettuyen_ne input[name=other_school_name]').val(caodangdh[college])
                    }
                });
            } else {
                if (typeof caodangdh[college] == 'undefined') {
                    alert('Mã trường không chính xác')
                    $('form#xettuyen_ne input[name=other_school_name]').val('')
                    me.val('').get(0).focus();

                } else {

                    $('form#xettuyen_ne input[name=other_school_name]').val(caodangdh[college])
                }
            }

        }
    })

    $('form#xettuyen_ne').on('submit', function (e) {
        e.preventDefault()

        $('form#xettuyen_ne input[name=fa_province_name]').val($('form#xettuyen_ne select[name=fa_province] option:selected').text())
        $('form#xettuyen_ne input[name=fa_district_name]').val($('form#xettuyen_ne select[name=fa_district] option:selected').text())
        $('form#xettuyen_ne input[name=fa_ward_name]').val($('form#xettuyen_ne select[name=fa_ward] option:selected').text())

        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/ne-result/add', data, function (data) {
        //$.post('http://localhost/VHMIS_WWW/education/public-api/admission/ne-result/add', data, function (data) {
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
