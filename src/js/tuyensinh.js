$(document).ready(function () {
  // Modal
  $('a.open_send_question').vhmisModal('send_question_modal', {
      beforeShow: function() {
          $('#ask_other_question').trigger('click')
      }
  })

  $('form#xettuyen').on('submit', function (e) {
      e.preventDefault()

      var me = $(this)
      var data = me.serialize();
      me.find('button').prop('disabled', true);
      $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/add', data, function (data) {
      // $.post('http://localhost/VHMIS_WWW/education/public-api/admission/add', data, function (data) {
      // $.post('http://localhost/education/public-api/admission/add', data, function (data) {
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
      $('.question-form').find(".for_question").removeClass('hidden')
      $('.question-form').find(".for_response").addClass('hidden')
      $('.question-form').find("form").removeClass('hidden')
  })

  $('form#ask_question').on('submit', function(e) {
      e.preventDefault()
      var me = $(this)
      var data = me.serialize()
      me.find('button').prop('disabled', true);
      $.post('https://vhmis.viethanit.edu.vn/education/public-api/admission/question/add', data, function (data) {
          if (data.error == '0') {
              $('.question-form').find(".for_question").addClass('hidden')
              $('.question-form').find(".for_response").removeClass('hidden')
              me[0].reset()
              me.addClass('hidden')
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

  if(site.page === 'tuyensinh_hoidap') {
      $.get('https://vhmis.viethanit.edu.vn/education/public-api/admission/questions', function (data) {
          $('div#question-list').html(data)
      })
  }
})
