/// <reference path="http://code.jquery.com/jquery-1.8.2.min.js" />

(function ($) {

    var carousel = function (element, option) {
        this.element = $(element);
        this.option = $.extend({}, _defaults, option);
        this.body = $(this.element).find(this.option.itemwrap);
        this.pageMax = this.option.items_perpage;
        this.itemCount = $(this.element).find(this.option.item).length;
        this.page = this.minPage = 0, this.maxPage = Math.ceil(this.itemCount / this.pageMax) - 1;
    }

    var framewidth, move = { prev: 'prv', next: 'nxt' }

    carousel.prototype = {
        init: function () {
            var prevBtn = $(this.element).find(this.option.prevhandle);
            var nextBtn = $(this.element).find(this.option.nexthandle);
            $(prevBtn).on('click', { mode: move.prev }, $.proxy(this.move, this));
            $(nextBtn).on('click', { mode: move.next }, $.proxy(this.move, this));
            framewidth = this.option.carousel_width;
        },
        move: function (event) {
            if (event.data.mode === move.prev)
                this.setpage(this.page - 1);
            else
                this.setpage(this.page + 1);
        },
        setpage: function (pageNo) {
            if (pageNo >= this.minPage && pageNo <= this.maxPage) {
                var l = pageNo * framewidth * -1;
                $(this.body).animate({ left: l }, this.option.duration);
                this.page = pageNo;
            }
        }
    };

    $.fn.nsarv_carousel = function (option) {
        return this.each(function () {
            var $this = new carousel(this, option);
            $this.init();
        });
    }

    var _defaults = {
        prevhandle: '.cau-prev', nexthandle: '.cau-next', itemwrap: '.cau-items', item: '.cau-item', carousel_width: 800, duration: 1000, items_perpage: 5
    }

})(window.jQuery);

$(document).ready(function () {
    $(".cau").nsarv_carousel();
});