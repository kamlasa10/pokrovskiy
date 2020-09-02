import { gsap } from "gsap";
import * as THREE from 'three/build/three.module.js';

document.addEventListener('DOMContentLoaded',function () {
    if($(window).width() > 1024){
        animateMenu();
    } else {
        $('.js-burger').on('click', function () {
            if( $('.js-menu').hasClass('js-menu-active')) {
                menuClose();
            } else {
                menuOpen();
            }
        })
    }
});


function animateMenu() {
    let listWrap = $('.js-menu .menu__list');
    let tl = {
        1: gsap.timeline(),
        2: gsap.timeline(),
        3: gsap.timeline()
    };

    listWrap.each( (i,elem) => {
        $(elem).find('.menu__link').each( (iu,el) => {
            tl[i+1].fromTo(el, {autoAlpha: 0},{ease: "expo.inOut", duration: 1, autoAlpha: 1} , "<0.2")
                .fromTo(el, {yPercent: 1000},{ease: "expo.out", duration: 1.5, yPercent: 0} , "<");
           tl[i+1].pause();
        });
    });

    $('.js-burger').on('click', function () {
            if( $('.js-menu').hasClass('js-menu-active')) {

                gsap.fromTo('.js-menu',{autoAlpha: 1},{autoAlpha: 0, duration: 0.4, ease: "expo.inOut"});
                $('.header').removeClass('header-cursor-active');
                $('.burger__icon').removeClass('burger-close');
                $('.js-menu').removeClass('js-menu-active');
                setTimeout(function () {
                    tl[1].pause();
                    tl[2].pause();
                    tl[3].pause();
                    tl[1].progress(0);
                    tl[2].progress(0);
                    tl[3].progress(0);
                },300);
                animateStop();

            } else {
                let menu = gsap.timeline();
                menu.fromTo('.js-menu',{autoAlpha: 0},{autoAlpha: 1, duration: 1.5, ease: "expo.inOut"});
                menu.add(function () {
                    tl[1].play();
                    tl[2].play();
                    tl[3].play();
                    gsap.from('.menu__title',{autoAlpha: 0,duration: 1.5, ease: "expo.inOut"})
                },'<-=0.8');
                $('.header').addClass('header-cursor-active');
                $('.burger__icon').addClass('burger-close');
                $('.js-menu').addClass('js-menu-active');
                animate();
            }
    });
}

function menuOpen() {
    animate();
    $('.cursor__text').hide();
    $('.header').addClass('header-cursor-active');
    $('.burger__icon').addClass('burger-close');
    $('.js-menu').addClass(['js-menu-active','menu-active']);
}

function menuClose() {
    animateStop();
    $('.cursor__text').show();
    $('.header').removeClass('header-cursor-active');
    $('.burger__icon').removeClass('burger-close');
    $('.js-menu').removeClass(['js-menu-active','menu-active']);
}





const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragment = `
 # define PI 3.14159265359
 
 
 
	varying vec2 vUv;
	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform float u_time;
	uniform float u_animation;
	uniform sampler2D u_texture;
	uniform sampler2D u_map;
	uniform sampler2D u_sky;
	uniform sampler2D u_weed;
	uniform vec4 res;
	uniform sampler2D disp;


	float rand(vec2 seed) {
		return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453123);
	}

	float noise( in vec2 st) {
		vec2 i = floor(st);
		vec2 f = fract(st);

		// Four corners in 2D of a tile
		float a = rand(i);
		float b = rand(i + vec2(1.0, 0.0));
		float c = rand(i + vec2(0.0, 1.0));
		float d = rand(i + vec2(1.0, 1.0));

		vec2 u = f * f * (3.0 - 2.0 * f);

		return mix(a, b, u.x) +
			(c - a) * u.y * (1.0 - u.x) +
			(d - b) * u.x * u.y;
	}
	
	
	
	
	
	
	
	
	
	
	void main() {
		
		vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy);
		vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);


		// ******* mASK
		
		// * transition animate

		vec2 st = gl_FragCoord.xy / u_resolution.xy;

		float scale = 1.0;
		float offset = 0.05;

		// float angle = noise(st + (u_time * 0.005)+( (u_mouse * 0.5) * 2.4) * 0.3);
		float angle = noise(st + u_time * 0.01) * 8.0;
		float radius = offset;

		st *= scale;
		st += radius * vec2(cos(angle  + u_mouse.x * 0.001), sin(angle  + u_mouse.y * 0.001));
		

		vec2 positionMouse = (u_mouse / u_resolution - 0.5) * 0.07;


		 vec4 color = texture2D(u_texture, st + 0.1 + positionMouse);

		 gl_FragColor = color;
	}

`;



const imageUrl = '/wp-content/themes/pokrovsky/assets/images/menu.jpg';
const parent = document.querySelector('.js-menu');
let renderer, scene, camera, uniforms, object, a1, a2, mat,animateReq;
const imagesRatio = parent.offsetHeight / parent.offsetWidth;
let mouse = {
    x: 0,
    y: 0
}
/**********************************/
/*
 * initWebGL function start
 */
function initWebGL() {

    /* scene */
    scene = new THREE.Scene();
    /*  */
    /* camera */
    camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );
    camera.position.z = 1;
    /*  */
    /* renderer */
    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
    });
    renderer.setPixelRatio(2.0);
    renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);
    /*  */
    /* loader */
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';

    /*  */

    /* image aspect */
    checkAspect();
    /*  */

    /* uniform data */
    uniforms = {
        u_time: {
            type: "f",
            value: 1.0
        },
        u_animation: {
            type: "f",
            value: 0.0
        },
        u_mouse: {
            type: "v2",
            value: new THREE.Vector2()
        },
        u_resolution: {
            type: "v2",
            value: new THREE.Vector2()
        },
        u_size: {
            type: "v2",
            value: new THREE.Vector2(parent.offsetWidth, parent.offsetHeight)
        },
        res: {
            type: 'vec4',
            value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2)
        },
        u_texture: {
            value: MyTexture,
        },
    };
    /*  */
    /* matireal shaders */
    mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
    });
    /*  */
    const geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
    /*  */
    object = new THREE.Mesh(geometry, mat);
    /*  */
    scene.add(object);


    /* initWebGL handlers */
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

}


/*  */
function checkAspect() {
    if (parent.offsetHeight / parent.offsetWidth < imagesRatio) {
        a1 = 1;
        a2 = parent.offsetHeight / parent.offsetWidth / imagesRatio;
    } else {
        a1 = (parent.offsetWidth / parent.offsetHeight) * imagesRatio;
        a2 = 1;
    }
}
/*  */
/*  */
function onWindowResize(event) {
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    uniforms.u_mouse.value.x = mouse.x;
    uniforms.u_mouse.value.y = mouse.y;

    checkAspect();
    object.material.uniforms.res.value = new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    render();

}
/*  */
/*  */
var render = function () {
    // This will be called by the TextureLoader as well as TweenMax.
    uniforms.u_time.value += 0.5;
    renderer.render(scene, camera);
};
/* */
/*  */
var MyTexture = new THREE.TextureLoader().load(imageUrl, function () {
    initWebGL();
    // animate();
});

/*  */
/*  */
function animate() {
    animateReq = requestAnimationFrame(animate);
    render();
}

function animateStop() {
    cancelAnimationFrame(animateReq);
}
/*  */
/*  */
document.onmousemove = getMouseXY;

function getMouseXY(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    uniforms.u_mouse.value.x = mouse.x;
    uniforms.u_mouse.value.y = mouse.y;
}


parent.addEventListener('mouseenter', transitionIn);
parent.addEventListener('touchstart', transitionIn);
parent.addEventListener('mouseleave', transitionOut);
parent.addEventListener('touchend', transitionOut);

function transitionIn() {

}

function transitionOut() {

}


/*  */
/*
 * initWebGL function end
 */
/**********************************/
