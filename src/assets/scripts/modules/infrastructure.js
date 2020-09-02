function setMap(data) {

    const jsonArrData = data.points;
    if(jsonArrData.length < 1) return;
	var gmarkers1 = [];
	var markers1 = [];

	// настройка для смены языка проверяет адресную строку и в зависимости от выбраного языка подставляет нужный массив с данными
	var uri = window.location.href;
	var searchIndexRu = uri.search('/ru/');
	var searchIndexEn = uri.search('/en/');

	for (const key in jsonArrData) {
		if (jsonArrData.hasOwnProperty(key)) {
			const element = jsonArrData[key];
			markers1.push(addMapMark(element, 0))
		}
	}

	function addMapMark(obj, i) {
		const categorie = obj.categorie;
		let pos;
		let lan;
		let leg;
		if (obj.cor !== undefined) {
			pos = obj.cor.split(',');
			lan = pos[0];
			leg = pos[1];
		} else {
			pos = null;
			lan = null;
			leg = null;
		}
		// let pathIcon;
		// let dirs = '/dist/assets/images/';
		// let dirs = '/wp-content/themes/pokrovsky/assets/images/';

		// switch (categorie) {
		// 	case 'child':
		// 		pathIcon = dirs+'infrastructure/icon/point-child.svg';
		// 		break;
		// 	case 'school':
		// 		pathIcon = dirs+'infrastructure/icon/point-school.svg';
		// 		break;
		// 	case 'supermarket':
		// 		pathIcon = dirs+'infrastructure/icon/point-supermarket.svg';
		// 		break;
		// 	case 'hospital':
		// 		pathIcon = dirs+'infrastructure/icon/point-hospital.svg';
		// 		break;
		// 	case 'metro':
		// 		pathIcon = dirs+'infrastructure/icon/point-metro.svg';
		// 		break;
		// 	case 'cafe':
		// 		pathIcon = dirs+'infrastructure/icon/point-cafe.svg';
		// 		break;
		// 	case 'sport':
		// 		pathIcon = dirs+'infrastructure/icon/point-sport.svg';
		// 		break;
		// 	case 'park':
		// 		pathIcon = dirs+'infrastructure/icon/point-park.svg';
		// 		break;
		// 	case 'np':
		// 		pathIcon = dirs+'infrastructure/icon/point-np.svg';
		// 		break;
		// 	case 'bank':
		// 		pathIcon = dirs+'infrastructure/icon/point-bank.svg';
		// 		break;
		// 	case 'trc':
		// 		pathIcon = dirs+'infrastructure/icon/point-trc.svg';
		// 		break;
		// 	case 'main':
		// 		pathIcon = dirs+'infrastructure/icon/point-jk.svg';
		// 		break;
		//
		// 	default:
		// 		pathIcon = dirs+'infrastructure/icon/point.svg';
		// 		break;
		// }
		// const nameUA = obj.name_ua;
		// const nameEN = obj.name_en;
		// const nameRU = obj.name_ru;
		if (searchIndexRu > -1) {

			return [i, '', lan, leg, categorie, obj.image, obj.name]
		} else if (searchIndexEn > -1) {
			
			return [i, '', lan, leg, categorie, obj.image, obj.name]
		} else {
		
			return [i, '', lan, leg, categorie, obj.image, obj.name]
		}
	}
	var infowindow = new google.maps.InfoWindow({
		content: '',
		maxWidth: 200
	});

	// Фильтрация, функция принимает в параметр  категорию из дата атрибута и сравнивает, используя метод гугл API setMap скрывает и показывает 
	filterMarkers = function (category) {
		for (i = 0; i < markers1.length; i++) {
			marker = gmarkers1[i];
			if (category === 'all' || marker.category === category || marker.category  === 'main') {
				marker.setMap(map);
				// marker.setAnimation(google.maps.Animation.DROP);
			} else {
				marker.setMap(null)
			}
		}
	};

	// функция вешает обработчик клика на все элементы списка и вызывает функцию filterMarkers передавая в нее значение дата атрибута
	var markItems = document.querySelectorAll('.js-mark-item');

	for (var i = 0; i < markItems.length; i++) {
		markItems[i].addEventListener('click', function () {
			markItems.forEach(function (item, i) {
				if (item.classList.contains('mark-map--active')) {
					item.classList.remove('mark-map--active');
				}
			});

			this.classList.add('mark-map--active');
			var category = this.dataset.category;
			filterMarkers(category);
		});
	}

	// Функция добавления маркеров, берёт значение из масива вносит их в переменные и используя метод гугл API new google.maps.Marker клепает маркера
	function addMarker(marker) {
		var category = marker[4];
		var title = marker[1];
		var pos = new google.maps.LatLng(marker[2], marker[3]);
		var content = "<p class='content'>" + marker[6] + "</p>";
		var markerIcon = {
			url: marker[5]
		};
		marker1 = new google.maps.Marker({
			title: title,
			position: pos,
			category: category,
			map: map,
			icon: markerIcon,
			// animation: google.maps.Animation.DROP,
		});
		gmarkers1.push(marker1);

		// Marker click listener
		google.maps.event.addListener(marker1, 'click', (function (marker1, content) {
			return function () {
				infowindow.setContent(content); // установка нужного контента в всплывайку
				infowindow.open(map, marker1); // открытие нужного окна
				map.panTo(this.getPosition()); // установка центра карты в координатах кликнутой иконки
			}
		})(marker1, content));
	}

let styleMap = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "0.01"
            },
            {
                "saturation": "100"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#99d4d4"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

	// init карты все очевидно
    let poss = data.main.cor.split(',');
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: +poss[0],
			// lat: 50.361568,
			lng: +poss[1]
			// lng: 30.410603
		},
		zoom: +data.main.zoom || 15,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	map.setOptions({
		styles: styleMap
	});
	for (i = 0; i < markers1.length; i++) {
		addMarker(markers1[i]);
	}

};

function initMap(){
    // $.ajax({
    //         method: 'GET',
    //         url: 'url',
    //         data: 'action=infrastructure',
    // }).done(function(data) {
    //     setMap(JSON.parse(data));
    // })
    let data = {
        main: {
            cor: "48.464467, 35.049480"
        },
        points:[
            {cor:"8.464338, 35.048850", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'Vape Shop Black&White'},
            {cor:"8.464469, 35.047151", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'ТЦ "Пассаж"'},
            {cor:"8.466190, 35.051372", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'ТЦ "МОСТ-Cити"'},
            {cor:"8.462351, 35.048706", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'Книжный магазин "Книгарня Є"'},
            {cor:"8.463692, 35.050218", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'Магазин электроники "Цитрус"'},
            {cor:"8.464220, 35.050568", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'Продовольственный магазин "Натуральні продукти"'},
            {cor:"0.483139, 30.668966", categorie: 'shops', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-supermarket.svg', name:'COLLABA. СИР ТА ВИНО'},
            {cor:"0.476591, 30.674436", categorie: 'study', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-study.svg', name: 'Школа № 23'},
            {cor:"0.470772, 30.667248", categorie: 'parks', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-park.svg', name: 'Веселка'},
            {cor:"8.467819, 35.049952", categorie: 'kids' , image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-kids.svg', name: 'Детский магазин "Антошка"'},
            {cor:"50.477708, 30.668332", categorie: 'gym', image: '/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-market.svg', name: 'КСК Дарвін'},
            {cor:"48.468098, 35.053812", categorie: 'entertainment', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/map-marker-enterteiment.svg', name: 'Днепропетровский государственный цирк'},
            {cor:"48.464044, 35.048472", categorie: 'restaurant', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-cafe.svg', name: 'Ресторан "Шредингер"'},
            {cor:"48.465112, 35.046061", categorie: 'restaurant', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-cafe.svg', name: 'МакДональдз'},
            {cor:"48.466685, 35.050679", categorie: 'restaurant', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-cafe.svg', name: 'МакДональдз'},
            {cor:"48.462460, 35.048855", categorie: 'restaurant', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/point-cafe.svg', name: 'Lviv Croissants'},
            {cor:"48.464467, 35.049480", categorie: 'main', image:'/wp-content/themes/pokrovsky/assets/images/point.svg', name: 'PSHKN'},
            {cor:"48.460979, 35.050869", categorie: 'hotel', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/hospital-hotel.svg', name: 'SOHO boutique hotel'},
            {cor:"48.466199, 35.051686", categorie: 'hotel', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/hospital-hotel.svg', name: 'Seven Eleven'},
            {cor:"48.466819, 35.051029", categorie: 'hotel', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/hospital-hotel.svg', name: 'Апартамент-Отель Панорама'},
            {cor:"48.465840, 35.042614", categorie: 'hotel', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/hospital-hotel.svg', name: 'Grand Hotel Ukraine'},
            {cor:"48.463878, 35.053355", categorie: 'business', image:'/wp-content/themes/pokrovsky/assets/images/infrastructure/icon/map-marker-business.svg', name: 'Деловой центр "Менора"'},
        ],
    };
    setMap(data);
}