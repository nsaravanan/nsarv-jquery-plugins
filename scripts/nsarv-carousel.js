/// <reference path="http://code.jquery.com/jquery-1.8.2.min.js" />

(function ($) {

    var carousel = function (element, option) {
        this.element = $(element);
        this.option = $.extend({}, _defaults, option);
        this.body = $(this.element).find(this.option.itemwrap);
        this.pageMax = this.option.items_perpage;
        this.itemCount = $(this.element).find(this.option.item).length;
        this.page = this.minPage = 0, this.maxPage = Math.ceil(this.itemCount / this.pageMax) - 1;
        this.pagerItem = $(this.option.pager).find(this.option.pagerItem)[0];
    }

    var framewidth, move = { prev: 'prv', next: 'nxt' }, pageno = 'pageno';

    carousel.prototype = {

        init: function () {
            var prevBtn = $(this.element).find(this.option.prevhandle);
            var nextBtn = $(this.element).find(this.option.nexthandle);
            $(prevBtn).on('click', { mode: move.prev }, $.proxy(this.onMove, this));
            $(nextBtn).on('click', { mode: move.next }, $.proxy(this.onMove, this));
            framewidth = this.option.carousel_width;
            this.pagerInit();
        },

        pagerInit: function () {
            for (var i = 0; i < this.maxPage; i++) {
                var item = $(this.pagerItem).clone();
                $(item).attr(pageno, i + 1);
                $(this.option.pager).append($(item));
            }
            $(this.pagerItem).addClass(this.option.pagerItemSelectClass);
            $(this.pagerItem).attr(pageno, 0);
            if (this.maxPage > 1)
                $(this.option.pager).show();
            $(this.option.pagerItem).on('click', $.proxy(this.onPageSelect, this));
        },

        setPage: function (pageNo) {
            if (pageNo >= this.minPage && pageNo <= this.maxPage) {
                var l = pageNo * framewidth * -1;
                $(this.body).animate({ left: l }, this.option.duration);
                this.page = pageNo;
                this.setPager(pageNo);
            }
        },

        setPager: function (pageNo) {
            var selected = this.option.pagerItemSelectClass;
            $(this.option.pagerItem).each(function (index) {
                if (index === pageNo)
                    $(this).addClass(selected);
                else
                    $(this).removeClass(selected);
            });
        },

        onMove: function (event) {
            event.stopPropagation();
            if (event.data.mode === move.prev)
                this.setPage(this.page - 1);
            else
                this.setPage(this.page + 1);
        },

        onPageSelect: function (event) {
            var pno = $(event.target).attr(pageno);
            this.setPage(parseInt(pno));
        }
    };

    $.fn.nsarv_carousel = function (option) {
        return this.each(function () {
            var $this = new carousel(this, option);
            $this.init();
        });
    }

    var _defaults = {
        prevhandle: '.cau-prev', nexthandle: '.cau-next', itemwrap: '.cau-items', pager: '.pager', pagerItem: ".item",
        pagerItemSelectClass: "selected", item: '.cau-item', carousel_width: 800, duration: 1000, items_perpage: 5
    }

})(window.jQuery);

$(document).ready(function () {
    $(".cau").nsarv_carousel();
});