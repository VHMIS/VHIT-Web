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
        $('#site-overlay').on('click', $.proxy(this.hide, this))
    }

    vhmisModal.prototype = {
        constructor: vhmisModal,

        show: function (e) {
            e.preventDefault()

            var beforeShow = true

            if(this.options['beforeShow'] != null) beforeShow = this.options['beforeShow'](e.currentTarget, this.$element)

            if(beforeShow == false) return false

            $('body').addClass('overlay')
            $('#site-overlay').addClass('active')
            this.$element.addClass('active')

            //this.$element.trigger('show', [e.currentTarget])
            if(this.options['show'] != null) this.options['show'](e.currentTarget, this.$element)
        },

        hide: function (e) {
            if(e.target.id != 'site-overlay') return

            e.preventDefault()
            $('body').removeClass('overlay')
            $('#site-overlay').removeClass('active')
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
        hide: null
    }

})(jQuery);
