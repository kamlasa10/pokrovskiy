
(function () {
    // console.log('news');
    // const heightWrap = $('.others__wrap').height();
    // let heightContent = $('.others__wrap')[0].scrollHeight;
    // const heightToddler = heightWrap/(heightContent/100);
    // console.log(heightWrap);
    // console.log(heightContent);
    // console.log($('.others__wrap'));
    // console.log($('.others__wrap')[0].scrollHeight);
    // $('.js-scroll__toddler').css({'height':heightToddler+'%'});
    // $('.others__wrap').on('scroll', function (e) {
    //     // console.log('scroll',e);
    //     const top = $('.others__wrap')[0].scrollTop / ( (heightContent + heightWrap) /100);
    //     $('.js-scroll__toddler').css({'height':heightToddler+'%','top': top+'%'});
    //     console.log(top);
    // })
    $(window).on('beforeunload', function(){
        $(document).scrollTop(0);
    });

})();
