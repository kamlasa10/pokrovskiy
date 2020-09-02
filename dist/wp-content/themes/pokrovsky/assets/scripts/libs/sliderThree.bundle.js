!function(e){function t(t){for(var i,o,a=t[0],l=t[1],u=t[2],h=0,d=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(c&&c(t);d.length;)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(i=!1)}i&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},s={3:0},r=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;r.push([11,0]),n()}({11:function(e,t,n){"use strict";n.r(t);var i=n(0);function s(e){var t=this;this.totalEntries=e.length,this.loadedEntries=0;var n=new i.f(45,1,.1,1e4);n.position.z=5;var s=new i.h;n.lookAt=s.position;var r=new i.m({alpha:!0,antialias:!0});r.setSize(window.innerWidth,window.innerHeight),r.setPixelRatio(window.devicePixelRatio),this.render=this.render.bind(this),this.textures=e.map((function(e,n){return(new i.j).load(e.image,t.calculateAspectRatioFactor.bind(t,n))})),console.log(this.textures),this.factors=e.map((function(e){return new i.k(1,1)})),this.currentIndex=0,this.nextIndex=0,this.textureProgress=0,this.camera=n,this.scene=s,this.renderer=r,this.initialRender=!1,this.time=0,this.loopRaf=null,this.loop=this.loop.bind(this)}s.prototype.getViewSize=function(){var e=this.camera.fov*Math.PI/180;return Math.abs(this.camera.position.z*Math.tan(e/2)*2)},s.prototype.getPlaneSize=function(){var e=this.getViewSize();return{width:1.5*e,height:e}},s.prototype.calculateAspectRatioFactor=function(e,t){var n=this.getPlaneSize(),s=window.innerWidth/window.innerHeight,r=n.width/n.height*s,o=t.image.width/t.image.height,a=1,l=1;r>o?(a=1,l=1/r*o):(a=1*r/o,l=1),this.factors[e]=new i.k(a,l),this.currentIndex===e&&(this.mesh.material.uniforms.u_textureFactor.value=this.factors[e],this.mesh.material.uniforms.u_textureFactor.needsUpdate=!0),this.nextIndex===e&&(this.mesh.material.uniforms.u_texture2Factor.value=this.factors[e],this.mesh.material.uniforms.u_texture2Factor.needsUpdate=!0),this.initialRender&&(this.loadedEntries++,this.loadedEntries===this.totalEntries&&document.body.classList.remove("loading"),this.render())},s.prototype.createPlane=function(){this.getViewSize();var e=this.getPlaneSize(),t=e.width,n=e.height,s=new i.g(t,n,60,60),r=new i.i({uniforms:{u_texture:{type:"t",value:this.textures[this.currentIndex]},u_textureFactor:{type:"f",value:this.factors[this.currentIndex]},u_texture2:{type:"t",value:this.textures[this.nextIndex]},u_texture2Factor:{type:"f",value:this.factors[this.nextIndex]},u_textureProgress:{type:"f",value:this.textureProgress},u_offset:{type:"f",value:8},u_progress:{type:"f",value:0},u_direction:{type:"f",value:1},u_effect:{type:"f",value:0},u_time:{type:"f",value:this.time},u_waveIntensity:{type:"f",value:0},u_resolution:{type:"v2",value:new i.k(window.innerWidth,window.innerHeight)},u_rgbPosition:{type:"v2",value:new i.k(window.innerWidth/2,window.innerHeight/2)},u_rgbVelocity:{type:"v2",value:new i.k(0,0)}},vertexShader:"\n#define PI 3.14159265359\nuniform float u_offset;\nuniform float u_progress;\nuniform float u_direction;\nuniform float u_time;\nuniform float u_waveIntensity;\nvarying vec2 vUv;\nvoid main(){\n    vec3 pos = position.xyz;\n\n    float distance = length(uv.xy - 0.5 );\n    float sizeDist = length(vec2(0.5,0.5));\n    float normalizedDistance = distance/sizeDist ;\n\n    float stickOutEffect = normalizedDistance ;\n    float stickInEffect = -normalizedDistance ;\n\n    \n    float stickEffect = mix(stickOutEffect,stickInEffect, u_direction);\n\n    // Backwards V wave.\n    float stick = 0.5;\n\n    float waveIn = u_progress*(1. / stick); \n    float waveOut =  -( u_progress - 1.) * (1./(1.-stick) );\n    waveOut = pow(smoothstep(0.,1.,waveOut),0.7);\n\n    float stickProgress = min(waveIn, waveOut);\n\n\n\n\n\n    // We can re-use stick Influcse because this oen starts at the same position\n    float offsetInProgress = clamp(waveIn,0.,1.);\n\n    // Invert stickout to get the slope moving upwards to the right\n    // and move it left by 1\n    float offsetOutProgress = clamp(1.-waveOut,0.,1.);\n\n    float offsetProgress = mix(offsetInProgress,offsetOutProgress,u_direction);\n\n\n    float stickOffset = u_offset;\n    pos.z += stickEffect * stickOffset * stickProgress  - u_offset * offsetProgress;\n\n    \n    pos.z += sin(distance * 8. - u_time * 2. )  * u_waveIntensity;\n\n    gl_Position =   \n        projectionMatrix * \n        modelViewMatrix * \n         vec4(pos, 1.0);\n\n    vUv = uv;\n}\n",fragmentShader:"\nuniform vec2 u_resolution;\n\nuniform sampler2D u_texture;\nuniform sampler2D u_texture2;\nuniform vec2 u_textureFactor;\nuniform vec2 u_texture2Factor;\nuniform float u_textureProgress;\n\n// RGB\nuniform vec2 u_rgbPosition;\nuniform vec2 u_rgbVelocity;\n\nvarying vec2 vUv;\nvec2 centeredAspectRatio(vec2 uvs, vec2 factor){\n    return uvs * factor - factor /2. + 0.5;\n}\nvoid main(){\n    // On THREE 102 The image is has Y backwards\n    // vec2 flipedUV = vec2(vUv.x,1.-vUv.y);\n\n    vec2 normalizedRgbPos = u_rgbPosition / u_resolution;\n    normalizedRgbPos.y = 1. - normalizedRgbPos.y; \n\n    \n    vec2 vel = u_rgbVelocity;\n    float dist = distance(normalizedRgbPos + vel / u_resolution, vUv.xy);\n\n    float ratio = clamp(1.0 - dist * 5., 0., 1.);\n\n\n    vec4 tex1 = vec4(1.);\n    vec4 tex2 = vec4(1.);\n\n    vec2 uv = vUv;\n\n    uv.x -= sin(uv.y) * ratio / 100. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 100. * (vel.x + vel.y) / 7.;\n\n    tex1.r = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).r;\n    tex2.r = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).r;\n\n    \n    uv.x -= sin(uv.y) * ratio / 150. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 150. * (vel.x + vel.y) / 7.;\n\n    tex1.g = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).g;\n    tex2.g = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).g;\n    \n    uv.x -= sin(uv.y) * ratio / 300. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 300. * (vel.x + vel.y) / 7.;\n\n    tex1.b = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).b;\n    tex2.b = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).b;\n     \n    \n\n\n    vec4 fulltex1 = texture2D(u_texture, centeredAspectRatio(vUv, u_textureFactor) );\n    vec4 fulltex2 = texture2D(u_texture2, centeredAspectRatio(vUv, u_texture2Factor));\n    \n    vec4 mixedTextures =  mix(tex1,tex2,u_textureProgress);\n\n    gl_FragColor = mixedTextures;\n}\n",side:i.b}),o=new i.d(s,r);this.scene.add(o),this.mesh=o},s.prototype.updateTexture=function(e,t){var n=!1;null!=e&&this.newIndex!==this.currentIndex&&(this.currentIndex=this.nextIndex,this.nextIndex=e,this.textureProgress=0,this.mesh.material.uniforms.u_textureProgress.value=0,this.mesh.material.uniforms.u_texture.value=this.textures[this.currentIndex],this.mesh.material.uniforms.u_textureFactor.value=this.factors[this.currentIndex],this.mesh.material.uniforms.u_texture2.value=this.textures[e],this.mesh.material.uniforms.u_texture2Factor.value=this.factors[e],n=!0),null!=t&&t!==this.textureProgress&&(this.mesh.material.uniforms.u_textureProgress.value=t,this.textureProgress=t,n=!0),!this.loopRaf&&n&&this.render()},s.prototype.updateStickEffect=function(e){var t=e.progress,n=e.direction,i=e.waveIntensity;this.mesh.material.uniforms.u_progress.value=t,this.mesh.material.uniforms.u_direction.value=n,this.mesh.material.uniforms.u_waveIntensity.value=i},s.prototype.updateRgbEffect=function(e){var t=e.position,n=e.velocity;this.mesh.material.uniforms.u_rgbPosition.value=new i.k(t.x,t.y),this.mesh.material.uniforms.u_rgbVelocity.value=new i.k(n.x,n.y),this.loopRaf||this.render()},s.prototype.render=function(){this.initialRender||(this.initialRender=!0),this.renderer.render(this.scene,this.camera)},s.prototype.mount=function(e){e.appendChild(this.renderer.domElement)},s.prototype.unmount=function(){this.mesh.material.dispose(),this.mesh.geometry.dispose(),this.mesh=null,this.renderer=null,this.camera=null,this.scene=null,this.container=null},s.prototype.onResize=function(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.mesh.material.uniforms.u_resolution.value=new i.k(window.innerWidth,window.innerHeight);for(var e=0;e<this.textures.length;e++)this.textures[e].image&&this.calculateAspectRatioFactor(e,this.textures[e]);this.render()},s.prototype.scheduleLoop=function(){this.loopRaf||this.loop()},s.prototype.loop=function(){this.render(),this.time+=.1,this.mesh.material.uniforms.u_time.value=this.time,this.loopRaf=requestAnimationFrame(this.loop)},s.prototype.cancelLoop=function(){cancelAnimationFrame(this.loopRaf),this.loopRaf=null};var r=n(2);function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(t){t.indexSize,t.onIndexChange;var n=t.onGrabStart,i=t.onGrabMove,s=t.onGrabEnd;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.onGrabEnd=s,this.onGrabStart=n,this.onGrabMove=i,this.scroll={start:0,current:0,initial:0},this.listen("mousedown",this.onMouseDown.bind(this)),this.listen("mousemove",this.onMouseMove.bind(this)),this.listen("mouseup",this.onMouseUp.bind(this)),this.listen("touchstart",this.onMouseDown.bind(this),!0),this.listen("touchmove",this.onMouseMove.bind(this),!0),this.listen(["touchend","touchcancel"],this.onMouseUp.bind(this),!0)}return function(e,t,n){t&&o(e.prototype,t)}(e,[{key:"listen",value:function(e,t,n){var i=function(e){"mouseout"===e.type&&null!=e.relatedTarget||t({y:e.clientY})};if(n&&(i=function(e){e.preventDefault(),t({y:e.targetTouches[0]?e.targetTouches[0].clientY:null})}),Array.isArray(e))for(var s=0;s<e.length;s++)window.addEventListener(e[s],i,!1);else window.addEventListener(e,i,!1)}},{key:"onMouseDown",value:function(e){this.scroll.inital=this.scroll.current,this.scroll.start=e.y,this.scroll.current=e.y,this.scroll.delta=this.scroll.current-this.scroll.start,this.onGrabStart({delta:this.scroll.delta,direction:Math.abs(this.scroll.delta),current:this.scroll.current,start:this.scroll.start})}},{key:"onMouseMove",value:function(e){this.scroll.start&&(this.scroll.current=e.y,this.scroll.delta=this.scroll.current-this.scroll.start,this.onGrabMove({delta:this.scroll.delta,direction:Math.abs(this.scroll.delta),current:this.scroll.current,start:this.scroll.start}))}},{key:"onMouseUp",value:function(){this.scroll.start&&(this.onGrabEnd({delta:this.scroll.delta,direction:Math.abs(this.scroll.delta),current:this.scroll.current,start:this.scroll.start}),this.scroll.start=null,this.scroll.current=null,this.scroll.delta=null)}}]),e}(),l=function(e){var t=e.from,n=e.to,i=e.restDelta,s=void 0===i?.01:i,r=Object.assign({},t),o=Object.keys(t),a={current:null},l=function(e,t){if(0===o.length)return cancelAnimationFrame(a.current),a.current=null,void t(r);o.slice();for(var i,u,c=o.length;c>=0;c--)u=o[c],i=r[u]+.1*(n[u]-r[u]),Math.abs(n[u]-i)<s?(r[u]=n[u],o.splice(c,1),c--):r[u]=i;e(r),a.current=requestAnimationFrame(l)};return{start:function(e){var t=e.update,n=e.complete;return l=l.bind(null,t,n),a.current=requestAnimationFrame(l),{stop:function(){cancelAnimationFrame(a.current),a.current=null}}}}};function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.GL=new s(e),this.GL.createPlane(),this.data=e,this.progress=0,this.direction=1,this.waveIntensity=0,this.options=t,this.index={target:0,current:0,initial:0,scrollSize:window.innerHeight/6,active:0},this.follower={x:0,y:0},this.followerSpring=null,this.slidesSpring=null,this.grab=new a({onGrabStart:this.onGrabStart.bind(this),onGrabMove:this.onGrabMove.bind(this),onGrabEnd:this.onGrabEnd.bind(this)})}function c(e,t,n){return Math.max(t,Math.min(e,n))}function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}u.prototype.mount=function(e){this.GL.mount(e)},u.prototype.render=function(){this.GL.render()},u.prototype.onMouseMove=function(e){var t=this;this.followerSpring&&(this.followerSpring.stop(),this.followerSpring=null),this.followerSpring=l({from:{x:this.follower.x,y:this.follower.y},to:{x:e.clientX,y:e.clientY},velocity:{x:this.follower.vx,y:this.follower.vy},stiffness:500,damping:50,mass:1}).start({update:function(e){var n={x:e.x-t.follower.x,y:e.y-t.follower.y};t.GL.updateRgbEffect({position:e,velocity:n}),t.follower={x:e.x,y:e.y,vx:n.x,vy:n.y}},complete:function(){t.GL.updateRgbEffect({position:t.follower,velocity:{x:0,y:0}}),t.follower.vx=0,t.follower.vy=0}})},u.prototype.onGrabMove=function(e){var t=this;this.index.target=c(this.index.initial+e.delta/this.index.scrollSize,.51-this.data.length,.49);var n=c(Math.round(-this.index.target),0,this.data.length-1);this.index.active!==n&&(this.index.active=n,this.options.onActiveIndexChange&&this.options.onActiveIndexChange(this.index.active),this.GL.updateTexture(n),this.textureProgressSpring&&(this.textureProgressSpring.stop(),this.textureProgressSpring=null),this.textureProgressSpring=Object(r.b)({from:0,to:1,stiffness:400,damping:30}).start((function(e){t.GL.updateTexture(null,e)}))),this.slidesPop&&this.slidesPop.stop(),this.slidesPop=l({from:{index:this.index.current},to:{index:this.index.target},restDelta:.001}).start({update:function(e){t.options.onIndexChange&&t.options.onIndexChange(e.index),t.index.current=e.index},complete:function(e){t.options.onIndexChange&&t.options.onIndexChange(e.index),t.index.current=e.index}})},u.prototype.onGrabStart=function(){var e=this;document.getElementsByClassName("sliderThree__slide-bg")[0].classList.add("hidden"),this.options.onZoomOutStart&&this.options.onZoomOutStart({activeIndex:this.index.active}),this.index.initial=this.index.current,this.GLStickPop&&this.GLStickPop.stop(),this.GL.scheduleLoop();var t=Object(r.b)({from:0===this.progress?0:this.direction,to:0,mass:1,stiffness:800,damping:2e3}),n=Object(r.b)({from:this.progress,to:1,mass:5,stiffness:350,damping:500}),i=Object(r.b)({from:this.waveIntensity,to:.5,mass:5,stiffness:10,damping:200});this.GLStickPop=Object(r.a)(n,t,i).start({update:function(t){e.progress,t[0],e.progress=t[0],e.direction=t[1],e.waveIntensity=t[2],e.GL.updateStickEffect({progress:e.progress,direction:e.direction,waveIntensity:e.waveIntensity})},complete:function(){e.options.onZoomOutFinish&&e.options.onZoomOutFinish({activeIndex:e.index.active})}})},u.prototype.snapCurrentToActiveIndex=function(){var e=this;this.slidesPop&&this.slidesPop.stop(),this.slidesPop=l({from:{index:this.index.current},to:{index:Math.round(this.index.target)},restDelta:.001}).start({complete:function(){},update:function(t){e.options.onIndexChange&&e.options.onIndexChange(t.index),e.index.current=t.index}})},u.prototype.onGrabEnd=function(){var e=this;document.getElementsByClassName("sliderThree__slide-bg")[0].classList.remove("hidden"),this.options.onFullscreenStart&&this.options.onFullscreenStart({activeIndex:this.index.active}),this.snapCurrentToActiveIndex(),this.GLStickPop&&this.GLStickPop.stop();var t=Object(r.b)({from:1===this.progress?1:this.direction,to:1,mass:1,stiffness:800,damping:2e3}),n=Object(r.b)({from:this.progress,to:0,mass:4,stiffness:400,damping:70,restDelta:1e-4}),i=Object(r.b)({from:this.waveIntensity,to:0,mass:.1,stiffness:800,damping:50});this.GLStickPop=Object(r.a)(n,t,i).start({update:function(t){e.progress=t[0],e.direction=t[1],e.waveIntensity=t[2],e.GL.updateStickEffect({progress:e.progress,direction:e.direction,waveIntensity:e.waveIntensity})},complete:function(){e.options.onFullscreenFinish&&e.options.onFullscreenFinish({activeIndex:e.index.active}),e.GL.cancelLoop()}})},u.prototype.onResize=function(){this.GL.onResize()};var d=function(e,t){var n=document.createElement(e);return n.className=t,n},f=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.container=d("div","sliderThree__slides"),this.currentIdx=0,this.slides=this.data.map((function(e,t){var i=d("div","sliderThree__slide"),s=d("h1","sliderThree__slide-title"),r=d("p","sliderThree__slide-meta"),o=d("a","sliderThree__slide-more");return o.href=e.href,i.classList.add(0!==t?"sliderThree__next":"sliderThree__show-meta"),r.innerHTML=e.meta,s.innerHTML=e.title,o.innerHTML=e.button,i.appendChild(r),i.appendChild(s),i.appendChild(o),n.container.appendChild(i),i})),document.getElementById("sliderThree").appendChild(d("div","sliderThree__slide-bg"))}return function(e,t,n){t&&h(e.prototype,t)}(e,[{key:"mount",value:function(e){e.appendChild(this.container)}},{key:"onActiveIndexChange",value:function(e){this.currentIdx=e;for(var t=0;t<this.slides.length;t++)e===t?(this.slides[t].classList.remove("sliderThree__next"),this.slides[t].classList.remove("sliderThree__prev")):e>t?(this.slides[t].classList.remove("sliderThree__next"),this.slides[t].classList.add("sliderThree__prev")):(this.slides[t].classList.add("sliderThree__next"),this.slides[t].classList.remove("sliderThree__prev"))}},{key:"onMove",value:function(e){this.container.style.transform="translateY(".concat(100*e/this.slides.length,"%)")}},{key:"appear",value:function(){this.container.classList.add("sliderThree__scrolling"),this.slides[this.currentIdx].classList.remove("sliderThree__show-meta")}},{key:"disperse",value:function(e){this.slides[this.currentIdx].classList.add("sliderThree__show-meta"),this.container.classList.remove("sliderThree__scrolling");for(var t=0;t<this.data.length;t++)t>e?(this.slides[t].classList.add("sliderThree__next"),this.slides[t].classList.remove("sliderThree__prev")):t<e?(this.slides[t].classList.remove("sliderThree__next"),this.slides[t].classList.add("sliderThree__prev")):(this.slides[t].classList.remove("sliderThree__next"),this.slides[t].classList.remove("sliderThree__prev"))}}]),e}();function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p,m,x=function(e,t,n){return(1-n)*e+n*t},g=document.body,y=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.DOM={el:t},this.DOM.dot=this.DOM.el.querySelector(".cursor__inner--dot"),this.DOM.circle=this.DOM.el.querySelector(".cursor__inner--circle"),this.bounds={dot:this.DOM.dot.getBoundingClientRect(),circle:this.DOM.circle.getBoundingClientRect()},this.scale=1,this.opacity=1,this.mousePos={x:0,y:0},this.lastMousePos={dot:{x:0,y:0},circle:{x:0,y:0}},this.lastScale=1,this.initEvents(),requestAnimationFrame((function(){return n.render()}))}return function(e,t,n){t&&v(e.prototype,t)}(e,[{key:"initEvents",value:function(){var e=this;window.addEventListener("mousemove",(function(t){return e.mousePos=function(e){var t=0,n=0;return e||(e=window.event),e.pageX||e.pageY?(t=e.pageX,n=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+g.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+g.scrollTop+document.documentElement.scrollTop),{x:t,y:n}}(t)}))}},{key:"render",value:function(){var e=this;this.lastMousePos.dot.x=x(this.lastMousePos.dot.x,this.mousePos.x-this.bounds.dot.width/2,1),this.lastMousePos.dot.y=x(this.lastMousePos.dot.y,this.mousePos.y-this.bounds.dot.height/2,1),this.lastMousePos.circle.x=x(this.lastMousePos.circle.x,this.mousePos.x-this.bounds.circle.width/2,.15),this.lastMousePos.circle.y=x(this.lastMousePos.circle.y,this.mousePos.y-this.bounds.circle.height/2,.15),this.lastScale=x(this.lastScale,this.scale,.15),this.DOM.dot.style.transform="translateX(".concat(this.lastMousePos.dot.x,"px) translateY(").concat(this.lastMousePos.dot.y,"px)"),this.DOM.circle.style.transform="translateX(".concat(this.lastMousePos.circle.x,"px) translateY(").concat(this.lastMousePos.circle.y,"px) scale(").concat(this.lastScale,")"),requestAnimationFrame((function(){return e.render()}))}},{key:"enter",value:function(){this.scale=1.5,this.DOM.dot.style.display="none"}},{key:"leave",value:function(){this.scale=1,this.DOM.dot.style.display=""}}]),e}(),w=document.getElementById("sliderThree"),_=new y(document.querySelector(".cursor"));$.ajax({url:"/wp-admin/admin-ajax.php",method:"POST",data:{action:"mainSlider"}}).done((function(e){!function(e){p=new f(e),(m=new u(e,{onActiveIndexChange:function(e){p.onActiveIndexChange(e)},onIndexChange:function(e){p.onMove(e)},onZoomOutStart:function(e){e.activeIndex,_.enter(),p.appear()},onZoomOutFinish:function(e){e.activeIndex},onFullscreenStart:function(e){var t=e.activeIndex;_.leave(),p.disperse(t)},onFullscreenFinish:function(e){e.activeIndex}})).mount(w),p.mount(w),m.render(),window.addEventListener("resize",(function(){m.onResize()})),window.addEventListener("mousemove",(function(e){m.onMouseMove(e)}))}(JSON.parse(e))}))}});