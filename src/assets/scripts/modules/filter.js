let year = 'all';
let month = 'all';
let element = '';
// let filterElements = [];
(function () {
    $('.js-select__items [name="year"][checked]').length ? year = $('.js-select__items [name="year"][checked]')[0].value : 'all';
    $('.js-select__items [name="month"][checked]').length ? month = $('.js-select__items [name="month"][checked]')[0].value : 'all';
    $('.js-select__items ').on('change', 'input', updateSelect);
    element = $('.js-pagination__element');
    filter();
    paginationInit({wrap: '.js-pagination',dots: true,dotsAmount: 3,dotsLast: true,arrow: true,extremeArrow: false, elementInPage: 8, el:'.js-pagination__element'});

    // checkedPage(1);
})();


function updateSelect(e) {
    if(e.target.name === 'year') {
        year = e.target.value || 'all';
    } else if(e.target.name === 'month') {
        month = e.target.value || 'all';
    }
    filterElements = [];
    filter();
}

function filter() {
    element.each(function (i,category) {
        $(category).show();
        if( (year === 'all' || category.dataset.year === year ) && (month === 'all' || category.dataset.month === month)) {
            filterElements.push(category)
        } else {
            $(category).hide();
        }
    });
    // update({wrap: '.js-pagination',dots: true,dotsAmount: 3,dotsLast: true,arrow: true,extremeArrow: true, elementInPage: 6, el:''});
}


