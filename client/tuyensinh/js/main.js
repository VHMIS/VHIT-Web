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
            "001": {
                "name": "THPT Nguy\u1ec5n Hi\u1ec1n",
                "area": "3"
            },
            "002": {
                "name": "THPT Phan Ch\u00e2u Trinh",
                "area": "3"
            },
            "003": {
                "name": "THPT Tr\u1ea7n Ph\u00fa",
                "area": "3"
            },
            "006": {
                "name": "TT GDTX, KTTH-HN&DN qu\u1eadn H\u1ea3i Ch\u00e2u",
                "area": "3"
            },
            "007": {
                "name": "THPT Th\u00e1i Phi\u00ean",
                "area": "3"
            },
            "008": {
                "name": "TT TT GDTX, KTTH-HN&DN  Thanh Kh\u00ea",
                "area": "3"
            },
            "009": {
                "name": "THPT TT Quang Trung",
                "area": "3"
            },
            "028": {
                "name": "THPT Thanh Kh\u00ea",
                "area": "3"
            },
            "005": {
                "name": "THPT Chuy\u00ean L\u00ea Qu\u00fd \u0110\u00f4n",
                "area": "3"
            },
            "010": {
                "name": "THPT Ho\u00e0ng Hoa Th\u00e1m",
                "area": "3"
            },
            "011": {
                "name": "THPT Ng\u00f4 Quy\u1ec1n",
                "area": "3"
            },
            "012": {
                "name": "TT GDTX Th\u00e0nh Ph\u1ed1",
                "area": "3"
            },
            "013": {
                "name": "TT GDTX, KTTH-HN&DN  S\u01a1n Tr\u00e0",
                "area": "3"
            },
            "027": {
                "name": "THPT T\u00f4n Th\u1ea5t T\u00f9ng",
                "area": "3"
            },
            "014": {
                "name": "THPT Ng\u0169 H\u00e0nh S\u01a1n",
                "area": "3"
            },
            "015": {
                "name": "TT GDTX, KTTH-HN&DN  Ng\u0169 H\u00e0nh S\u01a1n",
                "area": "3"
            },
            "016": {
                "name": "PTDL Hermann Gmeiner",
                "area": "3"
            },
            "017": {
                "name": "THPT Nguy\u1ec5n Tr\u00e3i",
                "area": "3"
            },
            "018": {
                "name": "THPT TT Khai Tr\u00ed",
                "area": "3"
            },
            "019": {
                "name": "TT GDTX, KTTH-HN&DN  Li\u00ean Chi\u1ec3u",
                "area": "3"
            },
            "026": {
                "name": "THPT Nguy\u1ec5n Th\u01b0\u1ee3ng Hi\u1ec1n",
                "area": "3"
            },
            "021": {
                "name": "THPT Phan Th\u00e0nh T\u00e0i",
                "area": "2"
            },
            "022": {
                "name": "THPT \u00d4ng \u00cdch Khi\u00eam",
                "area": "2"
            },
            "023": {
                "name": "THPT Ph\u1ea1m Ph\u00fa Th\u1ee9",
                "area": "2"
            },
            "025": {
                "name": "TT GDTX, KTTH-HN&DN  H\u00f2a Vang",
                "area": "2"
            },
            "020": {
                "name": "THPT H\u00f2a Vang",
                "area": "2"
            },
            "024": {
                "name": "TT GDTX, KTTH-HN&DN  C\u1ea9m L\u1ec7",
                "area": "2"
            },
            "029": {
                "name": "THPT C\u1ea9m L\u1ec7",
                "area": "2"
            }
        },
        "34": {
            "001": {
                "name": "THPT Duy T\u00e2n",
                "area": "2"
            },
            "002": {
                "name": "THPT Phan B\u1ed9i Ch\u00e2u",
                "area": "2"
            },
            "003": {
                "name": "THPT Tr\u1ea7n Cao V\u00e2n",
                "area": "2"
            },
            "004": {
                "name": "THPT L\u00ea Qu\u00fd \u0110\u00f4n",
                "area": "2"
            },
            "005": {
                "name": "THPT T\u01b0 th\u1ee5c H\u00e0 Huy T\u1eadp",
                "area": "2"
            },
            "006": {
                "name": "TT. GDTX t\u1ec9nh Qu\u1ea3ng Nam",
                "area": "2"
            },
            "007": {
                "name": "THPT Chuy\u00ean Nguy\u1ec5n B\u1ec9nh Khi\u00eam",
                "area": "2"
            },
            "008": {
                "name": "TT. GDTX-HN&DN  H\u1ed9i An",
                "area": "2"
            },
            "009": {
                "name": "THPT  Tr\u1ea7n Qu\u00fd C\u00e1p",
                "area": "2"
            },
            "010": {
                "name": "THPT Chuy\u00ean L\u00ea Th\u00e1nh T\u00f4ng",
                "area": "2"
            },
            "011": {
                "name": "PTDT N\u1ed9i tr\u00fa t\u1ec9nh Qu\u1ea3ng Nam",
                "area": "2"
            },
            "012": {
                "name": "THPT Nguy\u1ec5nTr\u00e3i",
                "area": "2"
            },
            "065": {
                "name": "THPT  Tr\u1ea7n H\u01b0ng \u0110\u1ea1o",
                "area": "2"
            },
            "013": {
                "name": "THPT S\u00e0o Nam",
                "area": "2NT"
            },
            "014": {
                "name": "THPT L\u00ea H\u1ed3ng Phong",
                "area": "2NT"
            },
            "015": {
                "name": "TT. GDTX-HN  Duy Xuy\u00ean",
                "area": "2NT"
            },
            "016": {
                "name": "THPT Nguy\u1ec5n Hi\u1ec1n",
                "area": "1"
            },
            "017": {
                "name": "THPT Nguy\u1ec5n Duy Hi\u1ec7u",
                "area": "2NT"
            },
            "018": {
                "name": "THPT Ho\u00e0ng Di\u1ec7u",
                "area": "2NT"
            },
            "019": {
                "name": "THPT Ph\u1ea1m Ph\u00fa Th\u1ee9",
                "area": "2NT"
            },
            "020": {
                "name": "THPT L\u01b0\u01a1ng Th\u1ebf Vinh",
                "area": "2NT"
            },
            "021": {
                "name": "THPT Nguy\u1ec5n Khuy\u1ebfn",
                "area": "2NT"
            },
            "022": {
                "name": "TT. GDTX-HN  \u0110i\u1ec7n B\u00e0n",
                "area": "2NT"
            },
            "066": {
                "name": "Tr\u01b0\u1eddng PT nhi\u1ec1u c\u1ea5p h\u1ecdc Ho\u00e0ng Sa",
                "area": "2NT"
            },
            "067": {
                "name": "Tr\u01b0\u1eddng PT nhi\u1ec1u c\u1ea5p h\u1ecdc Qu\u1ea3ng \u0110\u00f4ng",
                "area": "2NT"
            },
            "023": {
                "name": "THPT  Hu\u1ef3nh Ng\u1ecdc Hu\u1ec7",
                "area": "2NT"
            },
            "024": {
                "name": "THPT  Chu V\u0103n An",
                "area": "1"
            },
            "025": {
                "name": "THPT  \u0110\u1ed7 \u0110\u0103ng Tuy\u1ec3n",
                "area": "2NT"
            },
            "026": {
                "name": "THPT  L\u01b0\u01a1ng Th\u00fac K\u1ef3",
                "area": "2NT"
            },
            "027": {
                "name": "TT. GDTX-HN&DN  \u0110\u1ea1i L\u1ed9c",
                "area": "2NT"
            },
            "029": {
                "name": "THPT  Qu\u1ebf S\u01a1n",
                "area": "2NT"
            },
            "030": {
                "name": "THPT  Nguy\u1ec5n V\u0103n C\u1eeb",
                "area": "2NT"
            },
            "032": {
                "name": "THPT  Tr\u1ea7n \u0110\u1ea1i Ngh\u0129a",
                "area": "2NT"
            },
            "033": {
                "name": "TT. GDTX-HN&DN  Qu\u1ebf S\u01a1n",
                "area": "2NT"
            },
            "034": {
                "name": "THPT TT Ph\u1ea1m V\u0103n \u0110\u1ed3ng",
                "area": "2NT"
            },
            "035": {
                "name": "THPT Hi\u1ec7p \u0110\u1ee9c",
                "area": "1"
            },
            "036": {
                "name": "TT. GDTX-HN&DN  Hi\u1ec7p \u0110\u1ee9c",
                "area": "1"
            },
            "063": {
                "name": "THPT  Tr\u1ea7n Ph\u00fa",
                "area": "1"
            },
            "028": {
                "name": "THPT  H\u00f9ng V\u01b0\u01a1ng",
                "area": "2NT"
            },
            "037": {
                "name": "THPT  Ti\u1ec3u La",
                "area": "2NT"
            },
            "038": {
                "name": "THPT  Nguy\u1ec5n Th\u00e1i B\u00ecnh",
                "area": "1"
            },
            "039": {
                "name": "THPT Th\u00e1i Phi\u00ean",
                "area": "2NT"
            },
            "040": {
                "name": "THPT  L\u00fd T\u1ef1 Tr\u1ecdng",
                "area": "2NT"
            },
            "041": {
                "name": "TT. GDTX-HN&DN  Th\u0103ng B\u00ecnh",
                "area": "2NT"
            },
            "042": {
                "name": "THPT  N\u00fai Th\u00e0nh",
                "area": "2NT"
            },
            "043": {
                "name": "THPT  Cao B\u00e1 Qu\u00e1t",
                "area": "1"
            },
            "044": {
                "name": "THPT  Nguy\u1ec5n Hu\u1ec7",
                "area": "2NT"
            },
            "045": {
                "name": "TT. GDTX-HN  N\u00fai Th\u00e0nh",
                "area": "2NT"
            },
            "046": {
                "name": "THPT  Hu\u1ef3nh Th\u00fac Kh\u00e1ng",
                "area": "1"
            },
            "047": {
                "name": "THPT  Phan Ch\u00e2u Trinh",
                "area": "1"
            },
            "048": {
                "name": "TT. GDTX-HN&DN  Ti\u00ean Ph\u01b0\u1edbc",
                "area": "1"
            },
            "049": {
                "name": "THPT B\u1eafc Tr\u00e0 My",
                "area": "1"
            },
            "050": {
                "name": "TT. GDTX-HN B\u1eafc Tr\u00e0 My",
                "area": "1"
            },
            "062": {
                "name": "PTDT N\u1ed9i tr\u00fa N\u01b0\u1edbc Oa",
                "area": "1"
            },
            "051": {
                "name": "THPT  Quang Trung",
                "area": "1"
            },
            "064": {
                "name": "THPT  \u00c2u C\u01a1",
                "area": "1"
            },
            "052": {
                "name": "THPT Nam Giang",
                "area": "1"
            },
            "060": {
                "name": "TT.GDTX Nam Giang",
                "area": "1"
            },
            "068": {
                "name": "THPT  Nguy\u1ec5n V\u0103n Tr\u1ed7i",
                "area": "1"
            },
            "053": {
                "name": "THPT Kh\u00e2m \u0110\u1ee9c",
                "area": "1"
            },
            "059": {
                "name": "TT GDTX-HN&DN Ph\u01b0\u1edbc S\u01a1n",
                "area": "1"
            },
            "069": {
                "name": "Ph\u1ed5 th\u00f4ng D\u00e2n t\u1ed9c N\u1ed9i tr\u00fa Ph\u01b0\u1edbc S\u01a1n",
                "area": "1"
            },
            "056": {
                "name": "THPT Nam Tr\u00e0 My",
                "area": "1"
            },
            "058": {
                "name": "TT.GDTX-HN Nam Tr\u00e0 My",
                "area": "1"
            },
            "072": {
                "name": "Ph\u1ed5 th\u00f4ng D\u00e2n t\u1ed9c n\u1ed9i tr\u00fa Nam Tr\u00e0 My",
                "area": "1"
            },
            "057": {
                "name": "THPT T\u00e2y Giang",
                "area": "1"
            },
            "054": {
                "name": "THPT Tr\u1ea7n V\u0103n D\u01b0",
                "area": "2NT"
            },
            "055": {
                "name": "TT GDTX-HN&DN  Ph\u00fa Ninh",
                "area": "2NT"
            },
            "061": {
                "name": "THPT Nguy\u1ec5n D\u1ee5c",
                "area": "2NT"
            },
            "031": {
                "name": "THPT N\u00f4ng S\u01a1n",
                "area": "1"
            }
        }
    }

    var makeSchoolSelect = function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += '<option value="' + index + '">' + value.name + '</option>'
        })
        $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').html(html).prop('disabled', false)
    }

    $('form#xettuyen select[name=province], form#xettuyen_ne select[name=province]').on('change', function (e) {
        var me = $(this)
        var pro = me.val();
        if (pro == "") {
            $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').html('<option value="0">Chọn trường</option>').prop('disabled', true)
        } else {
            if (typeof truongpt[pro] == 'undefined') {
                $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').html('<option value="0">Đang tải</option>').prop('disabled', true)
                $('form#xettuyen select[name=province], form#xettuyen_ne select[name=province]').prop('disabled', true)
                $.getJSON('data/pt_' + pro + '.json', function (data) {
                    truongpt[pro] = data
                    makeSchoolSelect(data)
                    $('form#xettuyen select[name=province], form#xettuyen_ne select[name=province]').prop('disabled', false)
                    $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').trigger('change')
                });
            } else {
                makeSchoolSelect(truongpt[pro])
                $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').trigger('change')
            }
        }
    })

    var areas = {
        '1': 'Khu vực 1',
        '2': 'Khu vực 2',
        '2NT': 'Khu vực 2-NT',
        '3': 'Khu vực 3',
    }

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

    $('form#xettuyen select[name=school], form#xettuyen_ne select[name=school]').on('change', function (e) {
        var me = $(this)
        var school = me.val()
        if (school == "") {
            $('form#xettuyen input[name=priority_area], form#xettuyen_ne input[name=priority_area]').val('')
            $('form#xettuyen input[name=priority_area_text], form#xettuyen_ne input[name=priority_area_text]').val('Khu vực')
        } else {
            var pro = $('form#xettuyen select[name=province], form#xettuyen_ne select[name=province]').val()
            var area = truongpt[pro][school]['area']
            $('form#xettuyen input[name=priority_area], form#xettuyen_ne input[name=priority_area').val(area)
            $('form#xettuyen input[name=priority_area_text], form#xettuyen_ne input[name=priority_area_text]').val(areas[area])
        }
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
        $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/add', data, function (data) {
        //$.post('http://localhost/VHMIS_WWW/education/public-api/admission/add', data, function (data) {
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
