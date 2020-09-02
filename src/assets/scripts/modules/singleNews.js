(function () {

    initScroll();

})();

function initScroll() {
    // let heightWrap = $('.others__wrap').height();
    // let heightContent = $('.others__wrap')[0].scrollHeight;
    // let heightToddler = heightWrap/(heightContent/100);
    let param = updateParamScroll();
    // console.log(heightContent);
    $('.js-scroll__toddler').css({'height': param.heightToddler +'%'});

    window.addEventListener('load', () => {
        param = updateParamScroll();
        console.log('load', param);
        $('.js-scroll__toddler').css({'height': param.heightToddler +'%'});
    });

    window.addEventListener('resize', ()=> {
        param = updateParamScroll();
        console.log('resize',param);
        $('.js-scroll__toddler').css({'height': param.heightToddler +'%'});
    });
    $('.others__wrap').on('scroll', () => {scroll(param) });
}

function scroll(param) {
    const top = $('.others__wrap')[0].scrollTop / ( (param.heightContent - param.heightWrap) / (100 - param.heightToddler)) ^ 0;
    $('.js-scroll__toddler').css({'height':param.heightToddler+'%','top': top+'%'});
}

function updateParamScroll() {
    const heightWrap = $('.others__wrap')[0].offsetHeight;
    const heightContent = $('.others__wrap')[0].scrollHeight;
    return new Object({
        heightWrap : heightWrap,
        heightContent : heightContent,
        heightToddler : heightWrap/(heightContent /100)
    })
}