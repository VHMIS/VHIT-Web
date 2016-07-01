$(document).ready(function () {
    // Toggle menu button
    $('#open-menu-button').click(function(e) {
        $('body').addClass('show_left_menu')
    })
    $('#close-menu-button').click(function(e) {
        $('body').removeClass('show_left_menu')
    })

    // Layer (dropdown, menu, popup ...) handle
    $(document).on('layer.clear', function(e) {
        $('.layer-toggle').each(function () {
            var toggle = $(this)
            // ? can remove and don't check =))
            if(!toggle.hasClass('active')) {
                return;
            }

            var layer = $(toggle.data('layer'))

            layer.removeClass('active')
            toggle.removeClass('active')
        })
    })

    $(document).on('click', function(e) {
        var notInLayer = $(e.target).closest(".layer-container").length === 0
        var notInToggle = $(e.target).closest(".layer-toggle").length === 0

        if (notInLayer && notInToggle) {
            $(document).trigger('layer.clear')
        }
    })

    $(document).on('click', '.layer-toggle', function(e) {
        console.log('b');
        var toggle = $(this)
        var layer = $(toggle.data('layer'))
        var isActived = toggle.hasClass('active')

        // remove current open
        $(document).trigger('layer.clear')

        if (!isActived) {
            layer.addClass('active')
            toggle.addClass('active')
        }
    })

    // Main slider
    // Slider
    var has_slide = $('.slider .slides');
	if ( has_slide.length > 0 ) {
		var totalSlides = has_slide.children('article').length,
			currentSlideNo = 0,
			playinterval,
			delay = 5000,
            endAnimationEvents = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

        var nextSlide = function() {
            currentSlide = has_slide.find('.active')
            currentSlideNo += 1;

            currentSlide
                .removeClass('active from_right from_left')
                .addClass('is_moving')
                .one(endAnimationEvents, function(){
                    currentSlide.removeClass('is_moving')
                })

            has_slide.children('article').eq(currentSlideNo)
                .addClass('active').prevAll().addClass('move_left');
        }

        var prevSlide = function() {
            currentSlide = has_slide.find('.active')
            currentSlideNo -= 1;

            currentSlide
                .removeClass('active from_right from_left')
                .addClass('is_moving')
                .one(endAnimationEvents, function(){
                    currentSlide.removeClass('is_moving')
                })

            has_slide.children('article').eq(currentSlideNo)
                .addClass('active').removeClass('move_left').nextAll().removeClass('move_left');
        }

        var autoPlaySlide = function() {
            if( currentSlideNo < totalSlides - 1) {
            	nextSlide();
            } else {
                currentSlideNo = 1
            	prevSlide();
            }
        }

        clearInterval(playinterval);
		playinterval = window.setInterval(function(){
            autoPlaySlide()
        }, delay);
    }

    // Aciids booking form
    $('form#aciids-booking select[name=in]').on('change', function(){
        var din = $(this)
        var dout = $('form#aciids-booking select[name=out]')

        if (parseInt(din.val()) > parseInt(dout.val())) {
            dout.val(parseInt(din.val()) + 1)
        }
    })

    $('form#aciids-booking select[name=out]').on('change', function(){
        var dout = $(this)
        var din = $('form#aciids-booking select[name=in]')

        if (parseInt(din.val()) > parseInt(dout.val())) {
            din.val(parseInt(dout.val()) - 1)
        }
    })

    $('#button-confirm').on('click', function(){
        $('form#aciids-booking').hide()
        $('.data-room').text($('form#aciids-booking select[name=room]').val())
        $('.data-total').text($('form#aciids-booking select[name=out]').val() - $('form#aciids-booking select[name=in]').val())
        $('.data-in').text($('form#aciids-booking select[name=in]').val())
        $('.data-out').text($('form#aciids-booking select[name=out]').val())
        $('.data-email').text($('form#aciids-booking input[name=email]').val())
        $('.data-tel').text($('form#aciids-booking input[name=tel]').val())
        $('.comfirm-booking').show()

        $('body').scrollTo('#fb')
    })

    $('#button-comeback').on('click', function(e){
        e.preventDefault()
        $('form#aciids-booking').show()
        $('.comfirm-booking').hide()

        $('body').scrollTo('#fb')
    })

    $('#button-book').on('click', function(e){
        $('.button-for-hide').hide()
        $("form#aciids-booking").trigger( "submit" );
    })

    $('form#aciids-booking').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $('.is-booking').show()
        $.post('https://vhmis.viethanit.edu.vn/office/public-api/aciids/book', data, function (data) {
        // $.post('http://localhost/VHMIS_WWW/office/public-api/aciids/book', data, function (data) {
            if (data.error == '0') {
                alert('Thanks you for booking, we will contact soon.')
                me[0].reset();
                $('.is-booking').hide()
                $('.done-booking').show()
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n");
                    console.log(data.form_error.message + "\n");
                    console.log(data.form_error.field + "\n");
                }
                alert('Error! Please check your info carefully and submit again, thanks you!')
                $('.button-for-hide').show()
                $('.is-booking').hide()
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })

    // Hoi an Registration form
    $('#button-registration-confirm').on('click', function(){
        $('form#aciids-hoian-registration').hide()
        $('.data-fullname').text($('form#aciids-hoian-registration input[name=fullname]').val())
        $('.data-idnumber').text($('form#aciids-hoian-registration input[name=idnumber]').val())
        $('.data-paperid').text($('form#aciids-hoian-registration input[name=paperid]').val())
        $('.data-email').text($('form#aciids-hoian-registration input[name=email]').val())
        $('.data-tel').text($('form#aciids-hoian-registration input[name=tel]').val())
        $('.comfirm-registration').show()

        $('body').scrollTo('#fr')
    })

    $('#button-registration-comeback').on('click', function(e){
        e.preventDefault()
        $('form#aciids-hoian-registration').show()
        $('.comfirm-registration').hide()

        $('body').scrollTo('#fr')
    })

    $('#button-registration').on('click', function(e){
        $('.button-for-hide').hide()
        $("form#aciids-hoian-registration").trigger( "submit" );
    })

    $('form#aciids-hoian-registration').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $('.is-booking').show()
        $.post('https://vhmis.viethanit.edu.vn/office/public-api/aciids/register', data, function (data) {
        // $.post('http://localhost/VHMIS_WWW/office/public-api/aciids/register', data, function (data) {
            if (data.error == '0') {
                me[0].reset();
                $('.is-booking').hide()
                $('.done-booking').show()
                alert('Thanks you for registration, we will contact soon.')
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n");
                    console.log(data.form_error.message + "\n");
                    console.log(data.form_error.field + "\n");
                }
                alert('Error! Please check your info carefully and submit again, thanks you!')
                $('.button-for-hide').show()
                $('.is-booking').hide()
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })

    if($('#count-registration').length > 0) {
        var countregistration = function() {
            $.getJSON('https://vhmis.viethanit.edu.vn/office/public-api/aciids/registration-count', function (data) {
            // $.getJSON('http://localhost/VHMIS_WWW/office/public-api/aciids/registration-count', function (data) {
                if (parseInt(data.total) >= 80) {
                    $('form#aciids-hoian-registration').hide()
                    $('.comfirm-registration').text('We had full number of registration currently! Thank you very much!').show()
                }
                $('#count-registration').text(data.total)
            })
        }

        var countInt

        countregistration()
        clearInterval(countInt)
        countInt = window.setInterval(function(){
            countregistration()
        }, 60000)
    }

    // Index page, partner logos slider
    $('.sc-partners .move-right').on('click', function(e){
        var width = $('.partners').width()
        var left = $('.partner-container').position().left + width * -1
        var container_width = $('.partner-container').width()

        if (left < width - container_width) {
            left = width - container_width
        }

        $('.partner-container').css('left', left + 'px')
    })
    $('.sc-partners .move-left').on('click', function(e){
        var width = $('.partners').width()
        var left = $('.partner-container').position().left + width
        // var container_width = $('.partner-container').width()

        if (left > 0) {
            left = 0
        }

        $('.partner-container').css('left', left + 'px')
    })
})
