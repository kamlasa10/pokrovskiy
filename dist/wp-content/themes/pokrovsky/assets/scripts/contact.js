(function () {
    let configForm = {
        input: 'js-form__input',
        active: 'active',
        loader: {
            class: 'form__loader',
            addClass: 'active'
        },
        success: {
            location: '/message',
            class: 'send__success',
            addClass: 'active',
        },
        error: {
            class: 'js-result-text',
            addClass: 'js-no-valid',
            dataAttr: 'errormessage'
        }
    };

    if($("#js-tel-mask").length) {
        $("#js-tel-mask").mask("(099) 99-99-999");
    }
    if($("#form-tel-form").length) {
        $("#form-tel-form").mask("(999) 99-99-999");
    }

    $('.js-form__submit').on('click',function(e) {

        e.preventDefault();
        ajax_form(e,"POST","/wp-admin/form.php");
    });



    function initMap() {
        var contentTranslate = [{
            ru: "<p class='content'>Украина,c. Гатне,ул. Свободы 1</p>",
            ua: "<p class='content'>Україна,c. Гатне,вул. Свободи,1</p>"
        }];
        var languageDetector = () => {
            if (window.location.pathname.match(/\/ru\//)) {
                return 'ru';
            } else {
                return 'ua';
            }
        };
        var uluru = {
            lat: 50.361421,
            lng: 30.410558
        };
        var map = new google.maps.Map(document.getElementById('js-contact__map'),{
            zoom: 13,
            center: uluru,
            streetViewControl: false,
            // disableDefaultUI: true,
        });


        var content = contentTranslate[0][languageDetector()];
        // var content = "<p class='content'>Украина,г. Киев,ул. Ильинская 12</p>";
        var infowindow = new google.maps.InfoWindow({
            content: '',
            maxWidth: 500
        });
        // var styleMap = [
        //   {
        //   "featureType": "water",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#9CCED6"
        //   },{
        //     "lightness": 17
        //   }]
        // },{
        //   "featureType": "landscape",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     // "color": "#e4e4e4"
        //     "color": "#F2F3F4"
        //   },{
        //     "lightness": 20
        //   }]
        // },{
        //   "featureType": "landscape.man_made",
        //   "elementType": "geometry.stroke",
        //   "stylers": [{
        //     "color": "#b9b9b9"
        //   },{
        //     "lightness": 20
        //   }]
        // },{
        //   "featureType": "road.highway",
        //   "elementType": "geometry.fill",
        //   "stylers": [{
        //     "color": "#ffffff"
        //   },{
        //     "lightness": 17
        //   }]
        // },{
        //   "featureType": "road.highway",
        //   "elementType": "geometry.stroke",
        //   "stylers": [{
        //     "color": "#ffffff"
        //   },{
        //     "lightness": 29
        //   },{
        //     "weight": 0.2
        //   }]
        // },{
        //   "featureType": "road.arterial",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#ffffff"
        //   },{
        //     "lightness": 18
        //   }]
        // },{
        //   "featureType": "road.local",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#ffffff"
        //   },{
        //     "lightness": 16
        //   }]
        // },{
        //   "featureType": "poi",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#f5f5f5"
        //   },{
        //     "lightness": 21
        //   }]
        // },{
        //   "featureType": "poi.park",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#dedede"
        //   },{
        //     "lightness": 21
        //   }]
        // },{
        //   "elementType": "labels.text.stroke",
        //   "stylers": [{
        //     "visibility": "on"
        //   },{
        //     "color": "#ffffff"
        //   },{
        //     "lightness": 16
        //   }]
        // },{
        //   "elementType": "labels.text.fill",
        //   "stylers": [{
        //     "saturation": 36
        //   },{
        //     "color": "#333333"
        //   },{
        //     "lightness": 40
        //   }]
        // },{
        //   "elementType": "labels.icon",
        //   "stylers": [{
        //     "visibility": "off"
        //   }]
        // },{
        //   "featureType": "transit",
        //   "elementType": "geometry",
        //   "stylers": [{
        //     "color": "#f2f2f2"
        //   },{
        //     "lightness": 19
        //   }]
        // },{
        //   "featureType": "administrative",
        //   "elementType": "geometry.fill",
        //   "stylers": [{
        //     "color": "#fefefe"
        //   },{
        //     "lightness": 20
        //   }]
        // },{
        //   "featureType": "administrative",
        //   "elementType": "geometry.stroke",
        //   "stylers": [{
        //     "color": "#fefefe"
        //   },{
        //     "lightness": 17
        //   },{
        //     "weight": 1.2
        //   }]
        // }];
        var styleMap = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-60},{"lightness":60},{"color":"#e9e7e4"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"color":"#802728"},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#d5e09d"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#6f9543"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#6f9543"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"weight":"1.00"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":"2.21"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#a7a9ac"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#fffefe"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d9d7d6"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#7db3ba"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"weight":"8.21"},{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#f4f3f3"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"73"},{"saturation":"0"},{"gamma":"1"},{"color":"#cdf2f7"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#7db3ba"},{"weight":"3.49"},{"lightness":"0"},{"gamma":"1"}]}];
        map.setOptions({
            styles: styleMap
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(uluru.lat,uluru.lng),
            map: map,
            icon: new google.maps.MarkerImage('./assets/images/icon/map__marker.svg',
                new google.maps.Size(90,116),
                new google.maps.Point(0,0))
        });

        google.maps.event.addListener(marker,'click',(function (marker,content) {
            return function () {
                infowindow.setContent(content); // установка нужного контента в всплывайку
                infowindow.open(map,marker); // открытие нужного окна
                map.panTo(this.getPosition()); // установка центра карты в координатах кликнутой иконки
            }
        })(marker,content));


        var newlong = marker.getPosition().lng() + (-0.00283 * Math.pow(2,(17 - map.getZoom())));
        var newLat = marker.getPosition().lat() + (0.00013 * Math.pow(2,(17 - map.getZoom())));
        google.maps.event.addListener(map,"zoom_changed",function () {
            newlong = marker.getPosition().lng() + (-0.00283 * Math.pow(2,(17 - map.getZoom())));
            newLat = marker.getPosition().lat() + (0.00013 * Math.pow(2,(17 - map.getZoom())));
        });
    }

    function ajax_form(e,methods,url) {

        event.preventDefault();
        var form = $(e.target).closest("form");
        var str = form.serialize();
        str += '&action=app';
        var errors = false; // по умолчанию ошибок в форме нет
        $(form).find('.'+configForm.input).each(function() {
            if(validateForm(this)) errors = true;
        });
        $('.'+configForm.input).on("mouseup",delMessageErrorForm);
        if (!errors) {
            $.ajax({
                method: methods,
                url: url,
                data: str,
                beforeSend: function() {
                    $('.'+configForm.loader.class).addClass(configForm.active);
                    // $(form).find('button > span').text('Отправка...') // замена текста в кнопке при отправке
                },
                error: function() {
                    $('.'+configForm.loader.class).removeClass(configForm.active);
                    // $(form).find('button > span').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
                }
            })
                .done(data => {
                    var data = JSON.parse(data);
                    // success();
                    successSendMesage();
                    if (data) {
                        //$(e).find('.result-text').removeClass('error');
                        $(form)[0].reset();
                        window.location.href = configForm.success.location
                    } else {
                        //$(e).find('.result-text').addClass('error');
                        $('.'+configForm.loader.class).removeClass(configForm.active);
                        $(form).find('.'+configForm.error.class).html(data.message);
                    }
                    if (data.message) {
                        $(form).find('.'+configForm.error.class).html(data.message).fadeIn();
                        setTimeout(function() {
                            $(e).find('.'+configForm.error.class).fadeOut();
                        },2000)
                    }
                });
        } else {
            $('.'+configForm.loader.class).removeClass(configForm.active);
        }
    }

    function validateForm(self) {
        let elem = $(self);
        const regular = new RegExp(/^[a-zA-Zа-яА-Я ёЁ`']{2,}$/);
        const regularTel = new RegExp(/\(?([0-9]{3})\)?(?:[ .-])([0-9]{2}[ .-]?)([0-9]{2}[ .-]?)([0-9]{3})/);
        if (
            ( elem.attr('name') === 'tel' && ( elem.val().length < 5 || !regularTel.test(elem.val()) )) ||
            ( elem.attr('name') === 'name' && ( ($.trim(elem.val()).length < 2) || !regular.test(elem.val()) ))
        // (elem.attr('name') !== 'tel' && !regular.test(elem.val()) )
        ) {
            var errorMessage = $(self).data(configForm.error.dataAttr); // добавляем в input сообщение об ошибке из dataAttr и class
            elem.next().text(errorMessage);
            elem.addClass(configForm.error.addClass);
            return true
        }
        return false
    }

    function delMessageErrorForm() {
        // $(this).next().data(configForm.error.dataAttr); // при клике на input убираем сообщение и class
        $(this).next().text('');
        $(this).removeClass(configForm.error.addClass);
    }

    function successSendMesage() {
        $('.'+configForm.success.class).addClass(configForm.success.addClass);
        setTimeout(function() {
            $('.popup-wrap').removeClass(configForm.active);
            $('.'+configForm.success.class).removeClass(configForm.success.addClass);
        },2000);
    }


})();


