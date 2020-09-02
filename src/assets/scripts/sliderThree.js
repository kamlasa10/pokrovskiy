import { Showcase } from "./modules/sliderThree/Showcase";
import { Slides } from "./modules/sliderThree/Slides";
import { Cursor } from "./modules/sliderThree/Cursor";

const container = document.getElementById("sliderThree");
const cursor = new Cursor(document.querySelector('.cursor'));


let slidesData;
let slides;
let showcase;


function getConfigSlider(url) {
    $.ajax({
        url: url,
        method: 'POST',
        data: {action: 'mainSlider'},
    }).done(function (response) {
        slidesData = JSON.parse(response);
        slidesInit(slidesData);
    })
}
function getConf(url) {
    $.ajax(url).done(function (response) {
        slidesData = response;
        slidesInit(slidesData);
    })
}
function slidesInit(slidesData){
    slides = new Slides(slidesData);
    showcase = new Showcase(slidesData, {
        onActiveIndexChange: activeIndex => {
            slides.onActiveIndexChange(activeIndex);
        },
        onIndexChange: index => {
            slides.onMove(index);
        },
        onZoomOutStart: ({ activeIndex }) => {
            cursor.enter();
            slides.appear();
        },
        onZoomOutFinish: ({ activeIndex }) => {
        },
        onFullscreenStart: ({ activeIndex }) => {
            cursor.leave();
            slides.disperse(activeIndex);
        },
        onFullscreenFinish: ({ activeIndex }) => {
        }
    });

    showcase.mount(container);
    slides.mount(container);
    showcase.render();

    window.addEventListener("resize", function() {
        showcase.onResize();
    });

    window.addEventListener("mousemove", function(ev) {
        showcase.onMouseMove(ev);
    });
}
(function () {
    getConfigSlider('/wp-admin/admin-ajax.php');

})();

// getConf('/wp-content/themes/pokrovsky/static/configSlide.JSON');

