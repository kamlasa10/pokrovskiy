    const $body = $('body');

    if (screen.width > 1020) {
        const heightFilter = $(".filter").outerHeight(true);
        $('.js-filter-scroll-wrap').css('height', $(".filter").height());

        $(window).scroll(() => {
            if ($(window).scrollTop() > 30) {
                $body.addClass('header--small');
                $('.filter').css('height', heightFilter + 83);
                $('.js-filter-scroll-wrap').css('height', $(".filter").height());

            } else {

                $body.removeClass('header--small');
                $('.filter').css('height', heightFilter);
                $('.js-filter-scroll-wrap').css('height', $(".filter").height() - 50);
            }
        });
    }




    const tabFilterBtn = $('.js-filter-tab-nav-btn');
    const tabFilterContent = $('.js-filter-result-block-tab');
    const activeClassBtn = 'filter-tab-nav-btn--current';
    const activeClassTab = 'filter-tab--active';


    tabFilterBtn.on('click', function (e) {
        const inx = $(this).data().index;

        tabFilterBtn.removeClass(activeClassBtn);
        $(this).addClass(activeClassBtn);

        tabFilterContent.removeClass(activeClassTab);
        $(tabFilterContent[inx]).addClass(activeClassTab);
    });



    /**********************************/
    /*
    * edit table start
    */
    // let dbFlat = [
    // 	{
    // 		total_square: 12,
    // 		life_square: 14,
    // 		room: 16,
    // 		section: 1,
    // 		floor: 49,
    // 	},
    // 	{
    // 		total_square: 13,
    // 		life_square: 514,
    // 		room: 186,
    // 		section: 2,
    // 		floor: 35,
    // 	},
    // 	{
    // 		total_square: 26,
    // 		life_square: 10,
    // 		room: 3,
    // 		section: 3,
    // 		floor: 11,
    // 	},
    // 	{
    // 		total_square: 156,
    // 		life_square: 266,
    // 		room: 9,
    // 		section: 4,
    // 		floor: 14,
    // 	},
    // 	{
    // 		total_square: 765,
    // 		life_square: 754,
    // 		room: 67,
    // 		section: 2,
    // 		floor: 21,
    // 	},
    // 	{
    // 		total_square: 788,
    // 		life_square: 884,
    // 		room: 17,
    // 		section: 2,
    // 		floor: 8,
    // 	},
    // 	{
    // 		total_square: 333,
    // 		life_square: 234,
    // 		room: 6,
    // 		section: 4,
    // 		floor: 3,
    // 	},
    // ]



    // DOM elems wich need for filter
    const elemsWichMakeFilter = {
        ranges: $('.js-range-init'),
        searchBtn: document.querySelector('.js-button_search'),
        resetBtn: document.querySelector('.js-button_clear'),
        numberFlats: document.querySelector(".js-number_flats"),
        rows: document.querySelectorAll('.js-flat-item'), // все карточки с квартирами
        checkbox: [
            {
                labelKey: 'section',
                DOMElem: $('.js-section'),
                typeData: 'array'
            },
            {
                labelKey: 'room',
                DOMElem: $('.js-room'),
                typeData: 'array'
            },
        ],
    };

    // Записывает все квартиры в отдельный массив
    let appartments = [];
    elemsWichMakeFilter.rows.forEach(function (row) {
        appartments.push(appartment(row))
    });

    // show total quantity
    elemsWichMakeFilter.numberFlats.innerHTML = appartments.length;


    // make DB all flats
    function appartment(app) {
        return {
            flat: app,
            life_square: parseInt(app.dataset.life_square),
            total_square: parseInt(app.dataset.total_square),
            room: parseInt(app.dataset.room),
            section: parseInt(app.dataset.section),
            floor: parseInt(app.dataset.floor),
            //this.test = parseInt(app.dataset.test); // new param filter

        }
    }

    // ref for update table latter


    /*
    * edit table end
    */
    /**********************************/





    // current state filter
    const filter = {
        total_square: {
            min: '',
            max: ''
        },
        life_square: {
            min: '',
            max: ''
        },
        floor: {
            min: '',
            max: ''
        },
        section: [],
        room: [],
        //ro: [], // new param filter
    };


    // set state filter range
    function setFilter(ionRange, range) {
        filter[range.id].min = Number(ionRange.from);
        filter[range.id].max = Number(ionRange.to);
    };
    // set state filter checkbox
    function setCheckboxFilter(input) {
        const key = $(input).data().key;
        const inx = elemsWichMakeFilter.checkbox.findIndex(el=> el.labelKey === key);
        filter[key] = [];

        [...elemsWichMakeFilter.checkbox[inx].DOMElem].forEach(function (checkbox) {
            if (checkbox.checked) {
                filter[key].push(+checkbox.value);
            }
        });

    };


    // handler for all chackbox
    elemsWichMakeFilter.checkbox.forEach((el) => {
        el.DOMElem.on('change', function () {
            setCheckboxFilter(this);
        });
    });

    // get default val all checkbox in first load
    elemsWichMakeFilter.checkbox.forEach((el)=>{
        [...el.DOMElem].forEach((checkBox)=>{
            setCheckboxFilter(checkBox);
        });
    });




    // Обработчик на кнопку поиска
    elemsWichMakeFilter.searchBtn.addEventListener('click', function () {
        const totalAppartments = appartments.length;
        let i = 0;
        // Проход по массиву и сверка ключей и данных
        validDBTable = [];
        console.log(appartments);
        appartments.forEach(function (appartment) {
            appartment.flat.style.display = 'block';
            for (var key in filter) {
                if (Array.isArray(filter[key]) && filter[key].length > 0) {

                    if (!filter[key].includes(appartment[key])) {
                        console.log(229);
                        appartment.flat.style.display = 'none';
                        i++;
                        break;
                    }
                }

                if (filter[key].min > appartment[key] || filter[key].max < appartment[key]) {
                    console.log(appartment[key]);
                    console.log(filter[key]);
                    console.log(237);
                    appartment.flat.style.display = 'none';
                    i++;
                    break;
                }
            }
            if(appartment.flat.attributes.style.value === 'display: block;'){
                validDBTable.push(appartment)
            }
        });

        // elemsWichMakeFilter.numberFlats.innerHTML = totalAppartments - i <= 0 ? 0 : totalAppartments - i;

        if(totalAppartments - i <= 0) {
            $('.js-chooseFlat__info').css({'visibility':'visible'});
            elemsWichMakeFilter.numberFlats.innerHTML = 0;
        } else {
            $('.js-chooseFlat__info').css({'visibility':'hidden'});
            elemsWichMakeFilter.numberFlats.innerHTML = totalAppartments - i;
        }
    });



    // Обнуление данных методы плагина
    elemsWichMakeFilter.resetBtn.addEventListener('click', function (e) {
        const ch = $('.js-checkbox-project');
        ch.prop('checked', false);
        $('.js-chooseFlat__info').css({'visibility':'hidden'});
        elemsWichMakeFilter.checkbox.forEach((el)=>{
            el.DOMElem.prop('checked', false);
        });

        elemsWichMakeFilter.ranges.each(function (i, slider) {
            const range = $(slider).data("ionRangeSlider");

            range.update({
                from: range.options.min,
                to: range.options.max
            });

            setValue(range.input, range.options, ['from', 'to']);
        });
        appartments.forEach(function (appartment) {
            appartment.flat.style.display = 'block';
            validDBTable = [];
            validDBTable.push(appartment);
        });
        elemsWichMakeFilter.numberFlats.innerHTML = appartments.length;

    });

    // handlers for manualy setting input val

    function minMax(min, max, val) {
        return Math.max(min, Math.min(val, max));
    }
    function setMinMax(inputInit, val, input) {
        const inputData = inputInit.data("ionRangeSlider");
        const { max, min, from, to } = inputData.options;

        if (input.hasClass('js-current-min')) {
            const from = minMax(min, to, val);
            input.val(from)
            inputData.update({ from });
        }
        if (input.hasClass('js-current-max')) {
            const to = minMax(from, max, val);
            input.val(to)
            inputData.update({ to });
        }
    }

    // установка и обработка значений ввидённых с клавиатуру в поля инпутов минимальных и максимальных значений
    const body = $('body');

    function addHandlerMinMaxInput(event) {
        const inputInit = $(event.target).closest('.js-range-item').find('.js-range-init')[0];
        const val = event.target.value;
        setMinMax($(inputInit), val, $(event.target));
    }

    body.on('blur', '.js-current-min', addHandlerMinMaxInput);
    body.on('blur', '.js-current-max', addHandlerMinMaxInput);


    function setValue(el, val, setVal) {

        $('.js_' + el.id + '_min').val(val[setVal[0]]);
        $('.js_' + el.id + '_max').val(val[setVal[1]]);
    }

    // init range

    function initBoxRange({ range, onChange, onFinish }) {
        const { max, min, from, to } = range.dataset

        $(range).ionRangeSlider({
            type: "double",
            values_separator: '-',
            min,
            max,
            from,
            to,
            debounce: 700,
            hide_min_max: true,
            // hide_from_to: true,
            grid: false,
            onChange: function (ionRange) {
                onChange();
                setValue(range, ionRange, ['from', 'to']);
            },
            onFinish: function (ionRange) {
                onFinish(ionRange);
            }
        });
        // after init set filter state
        const dataRange = $(range).data("ionRangeSlider");
        setFilter(dataRange.options, dataRange.input);
    };



    function initFilter() {
        elemsWichMakeFilter.ranges.each((i, el) => {
            initBoxRange({
                range: el,
                onChange: () => { },
                onFinish: (ionRange) => {

                    setFilter(ionRange, ionRange.input[0]);
                },
            });
        });
    }
    initFilter();



