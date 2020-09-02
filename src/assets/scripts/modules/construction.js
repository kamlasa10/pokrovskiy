(function () {
    $('.construction__filter').on('click', '.js-select__items', function (e) {
        let el = $(this);
        $('.select-bg').click();
        $('.construction__filter-list').removeClass('select-active');
        if(!el.parent().hasClass('select-active')){
            el.parent().addClass('select-active');
        }

        if(e.target.value) {
            $.ajax({
                method: 'POST',
                url: '/wp-admin/admin-ajax.php',
                data: "action=constructionFilter&month="+ e.target.value
            }).done(function (result) {
                setFilterInfoConstruct(result)
            })
        }

    });


    $('.js-construction').on('click', '.js-card__button',function (e) {
        $('.js-popup__date-text').html($(this).closest('.js-pagination__card').find('.js-card__date-text').html());
        getListImage(this.dataset.id);

        $('.js-popup__date-text').html($(this).closest('.js-pagination__card').find('.js-card__date-text').html());
        sliderInit();
        $('.js-popup').addClass('popup__active');
    });


    $('.js-popup__close').on('click', function () {
        $('.js-popup').removeClass('popup__active');
        setTimeout(function () {
            $('.js-popup__slider')[0].slick.unslick();
        },500);

    });

    function getListImage(id) {
        $.ajax({
            method: 'POST',
            url: '/wp-admin/admin-ajax.php',
            data: "action=construction&id="+id
        }).done(function (response) {
            setInfoPopup(response);
        })
    }
    function sliderInit() {
        $('.js-popup__slider').slick({
            prevArrow: $('.js-popup__left'),
            nextArrow: $('.js-popup__right'),
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true,
            setPosition: 1
        });
    }


    function setInfoPopup(data) {
        $('#construction__container').append(data);

        sliderInit();
        $('.js-popup').addClass('popup__active');
    }

    function setFilterInfoConstruct(data) {
        $('#js__filter__construct').html(data);
    }
})();