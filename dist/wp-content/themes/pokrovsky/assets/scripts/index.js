// import $ from 'jquery'
// import slick from 'slick-carousel'

function init() {
    // sliders init start
    // $('.js-floor__filter').on('click','.floor__list',function(e){
    //     console.log(e);
    //     console.log(this);
    // });
    if($(document).scrollTop() > 0) {
        $('.header').removeClass('header__transeperent');
    }
    $(document).on('scroll',function (e) {
        if($(document).scrollTop() < 50) {
            $('.header').addClass('header__transeperent');
        } else {
            $('.header').removeClass('header__transeperent');
        }
    });

    let section = 1;
    let floor = 2;
    getPlane({house:1, sec:section, floor: floor},"POST","/wp-admin/admin-ajax.php");
    $('.js-floor__filter').on('click', '.floor__list-el',function (e) {
        if($(this).data('section')){
            section = $(this).data('section') ;
        } else if ($(this).data('floor')){
            floor = $(this).data('floor');
        }
        getPlane({house:1, sec:section, floor: floor},"POST","/wp-admin/admin-ajax.php");
    });

    $('.js-call').on('click touchstart', e => {
        e.preventDefault();
        $('.js-form').addClass('active');
    });

    $('.js-form-close').on('click touchstart', e => {
        $('.js-form').removeClass('active');
    });

    function getPlane(data,method,url){
        let r = data;
        data.action ='choose-floor';
        $.ajax({
            method: method,
            url: url,
            data: r,
        })
            .done(function(datas) {
                // let data = JSON.parse(datas);
                $('.floor__render').html(datas);
            });
    }

    // $('.js-burger').on('click', e => {
    //    if( $('.js-menu').hasClass('menu-active')) {
    //        $('.header').removeClass('header-cursor-active');
    //        $('.burger__icon').removeClass('burger-close');
    //        $('.js-menu').removeClass('menu-active');
    //
    //     } else {
    //        $('.header').addClass('header-cursor-active');
    //        $('.burger__icon').addClass('burger-close');
    //        $('.js-menu').addClass('menu-active');
    //    }
    //     // $('.js-menu').addClass('menu-active');
    // });

    $('.js-close').on('click', e => {
        $('.js-menu').removeClass('menu-active');
    });
    $('.lang').on('touchstart', e => {
        $('.lang').addClass('active');
        $(document).on('touchstart', remove);

    });
    function remove(e) {
        if(!$(e.target).hasClass('lang-list__item')){
            $('.lang').removeClass('active');
            $(document).off('touchstart', remove);
        }
    }


    const pathEnd = 'M3.5,87.5V3.5l110,17.37v66 Z';
    const pathStart = 'M3.5,87.5v-66L113.5,3.4V87.5 Z';
    $('.button-hover').on('mouseenter',hoverSvg);
    $('.button-hover').on('mouseleave',unhoverSvg);

    function hoverSvg() {
        let svg = Snap($(this).find('svg')[0]);
        let figure = svg.select('path');
        figure.animate({'d':pathEnd},1400,mina.bounce,function () {});

    }

    function unhoverSvg() {
        let svg = Snap($(this).find('svg')[0]);
        let figure = svg.select('path');
        figure.animate({'d':pathStart},1400,mina.bounce,function () {});
    }
}

document.addEventListener('DOMContentLoaded',function () {
    init();
});
