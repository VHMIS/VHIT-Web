$(document).ready(function () {
    $('form#aciids-booking').on('submit', function (e) {
        e.preventDefault()
        var me = $(this)
        var data = me.serialize();
        me.find('button').prop('disabled', true);
        $.post('https://vhmis.viethanit.edu.vn/office/public-api/aciids/book', data, function (data) {
            if (data.error == '0') {
                alert('Thanks you for booking, we will contact soon.')
                me[0].reset();
            } else {
                if(data.error == '2') {
                    console.log(data.form_error.code + "\n");
                    console.log(data.form_error.message + "\n");
                    console.log(data.form_error.field + "\n");
                }
                alert('Error! Please check your info carefully and submit again, thanks you!')
            }
            me.find('button').prop('disabled', false);
        }, 'json')
    })
})
