$(document).ready(function () {

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

})
