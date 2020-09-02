import { gsap } from "gsap";

document.addEventListener('DOMContentLoaded',function () {

    if($(window).width() > 1024){
        newsAnimate();
    }
});


function newsAnimate() {
    gsap.set(".news__content", {scale: 0.3});
    gsap.set($(".js-news__el")[4], {scale: 1.4, zIndex: 10});
    gsap.fromTo('.news__content',0.3,{autoAlpha: 0},{ autoAlpha: 1});
    let tlNews = gsap.timeline({onComplete: args => {
            gsap.to($(".js-news__el")[4],{scale: 1, duration: 0.4});
            gsap.to('.news__content',0.4, { delay: 0.45, scale: 1,transformOrigin:"50% top"});
        },
        delay: 0.4
    });

    const wrap = $('.news__content')[0];
    let heightCentr = wrap.offsetHeight /2;
    let widthCentr = wrap.offsetWidth /2;

    $('.js-news__el').each((i,el) => {
        if(i !== 4) {
            let x = (((widthCentr - el.offsetWidth / 2 ) - el.offsetLeft ) / el.offsetWidth ) * 100;
            let y = (((heightCentr - el.offsetHeight / 2 ) - el.offsetTop ) / el.offsetHeight ) * 100;
            tlNews.fromTo(el,0.4,{xPercent: x, yPercent: y},{xPercent:0, yPercent:0}, "-=0.2");
        }
    });

}