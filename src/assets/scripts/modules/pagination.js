
let paginationDefaults = {
    wrap: '.pagination',
    clickClass : 'js-pagination',
    dots: false,
    dotsLast: false,
    arrow: false,
    extremeArrow: false,
    dotsAmount : 0,
    elementInPage : 8,
    currentPage : 1,
    filterElements : [],
    currentDots : {first: 1, last: 3},
};

(function () {
    $('.js-pagination').on('click', function (e) {
        e.target.dataset.page ? checkedPage(e.target.dataset.page, e) : checkedPage($(e.target).closest('.pagination__arrow').data('page'), e);
    });
})();

function paginationInit(conf) {
    updateConf(conf);

    if(paginationDefaults.dots) {
        $(paginationDefaults.wrap).append(createDots(paginationDefaults.dotsAmount,paginationDefaults.dotsLast ) );
    }
    if(paginationDefaults.arrow) {
        $(paginationDefaults.wrap).prepend(createArrow(['pagination__arrow--left','disabled'], "prev", 1));
        $(paginationDefaults.wrap).append(createArrow(['pagination__arrow--right'], "next", 1));
    }
    if(paginationDefaults.extremeArrow) {
        $(paginationDefaults.wrap).prepend(createArrow(['pagination__arrow--left','disabled'], "first", 2));
        $(paginationDefaults.wrap).append(createArrow(['pagination__arrow--right'], "last", 2));
    }

    checkedPage(paginationDefaults.currentPage);
}

function update(conf) {
    updateConf(conf);
    // if(paginationDefaults.dots) {
    //     $(paginationDefaults.wrap).append(createDots(paginationDefaults.dotsAmount,paginationDefaults.dotsLast ) );
    // }

    checkedPage(paginationDefaults.currentPage);
}

function updateConf(conf) {
    paginationDefaults.elementInPage = conf.elementInPage || 8;
    paginationDefaults.filterElements = paginationDefaults.filterElements.length === 0 ? $(conf.el) : paginationDefaults.filterElements;
    paginationDefaults.wrap = conf.wrap||'.pagination';
    paginationDefaults.clickClass = 'js-pagination';
    paginationDefaults.dots = conf.dots;
    paginationDefaults.dotsAmount = conf.dotsAmount;
    paginationDefaults.dotsLast = conf.dotsLast;
    paginationDefaults.arrow = conf.arrow;
    paginationDefaults.extremeArrow = conf.extremeArrow;
    paginationDefaults.dotsAmount = conf.dotsAmount;

    // if(paginationDefaults.dots) {
    //     $(paginationDefaults.wrap).append(createDots(paginationDefaults.dotsAmount,paginationDefaults.dotsLast ) );
    // }
}


function createDots(amount) {
    var el = document.createElement('ul');
    el.className = 'dots';
    for (let i = 1; i <= amount; i++){
        el.append(createDot(i, i));
        paginationDefaults.currentDots.last = i;
    }
    return el
}

function createArrow(clas, data, type){
    let icon = '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M17 5L1 5M1 5L5 9M1 5L5 1" stroke="#7E8888" stroke-linecap="round"/>\n' +
        '</svg>';
    let el = document.createElement('div');
    el.className = 'pagination__arrow '+ clas.join(' ');
    el.dataset.page = data;
    type === 1 ? el.innerHTML = icon : el.innerHTML = icon + icon;
    return el
}

function createDot(index, data){
    let el = document.createElement('li');
    index !== 1 ? el.className = 'dots__element' : el.className = 'dots__element active';
    el.dataset.page = data;
    el.innerHTML = data;
    return el
}
function pagination(page) {
    // $('html,body').animate( {scrollTop: $('.js-pagination__list').offset().top}, 0 );
    let elAmount = paginationDefaults.elementInPage;
    $(paginationDefaults.filterElements).each(function (i, el) {
       if(i+1 > page * elAmount - elAmount && i+1 <= page * elAmount) {
            $(el).show();
       } else {
           $(el).hide();
       }
    });
    window.scrollTo(0, 0);
}

function checkedPage(pages, conf) {
    var page = {
        last: Math.ceil(paginationDefaults.filterElements.length/paginationDefaults.elementInPage),
        current: pages,
    };
    $('.dots__element.active').removeClass('active');
    hideDots(page);
    changePage(page, conf);
    $('.dots__element[data-page='+ paginationDefaults.currentPage +']').addClass('active');
}

function hideDots(page) {
    $('.dots__element').map(function(i, elem){
        $(elem).show();
        if(i >= page.last) {
            $(elem).hide();
        }
    });
    if(page.last === 1){
        $('.pagination__arrow').hide();
    } else {
        $('.pagination__arrow').show();
    }
}

function changePage(page, conf){
    if(page.current !== undefined) {
        switch (page.current){
            case "first":
                paginationDefaults.currentPage = 1;
                break;
            case "prev":
                paginationDefaults.currentPage = paginationDefaults.currentPage > 1?paginationDefaults.currentPage-1: 1;
                break;
            case "next":
                paginationDefaults.currentPage = paginationDefaults.currentPage < page.last?paginationDefaults.currentPage+1: page.last;
                break;
            case "last":
                paginationDefaults.currentPage = page.last;
                break;
            // case "more":
            //     currentPage = currentPage + 3 < page.last?currentPage+3: page.last - 3;
            //     break;
            default:
                paginationDefaults.currentPage = +page.current;
        }
    }

    changeDots(paginationDefaults.currentPage, page.last, conf);
    pagination(paginationDefaults.currentPage);
}

function changeDots(page, last) {
    if(page > 1) {
        $('.pagination__arrow--left').removeClass('disabled');
    }
    if (page === 1){
        $('.pagination__arrow--left').addClass('disabled');
    }
    if (page === last){
        $('.pagination__arrow--right').addClass('disabled');
    }
    if (page < last){
        $('.pagination__arrow--right').removeClass('disabled');
    }
    if(last >= 3) {

    let centerAmountMin =  Math.floor(paginationDefaults.dotsAmount/2);
    let centerAmountMax =  Math.ceil(paginationDefaults.dotsAmount/2);
    if(page > last -  centerAmountMax) {
        paginationDefaults.currentDots.first = last - paginationDefaults.dotsAmount + 1;
        paginationDefaults.currentDots.last = last;
    } else if ( page <= 1 + centerAmountMin ) {
        paginationDefaults.currentDots.first = 1;
        paginationDefaults.currentDots.last = paginationDefaults.dotsAmount;
    } else {
        paginationDefaults.currentDots.first = page - centerAmountMin;
        paginationDefaults.currentDots.last = page + centerAmountMax;
    }

    // if(last > paginationDefaults.dotsAmount) {
        $('.dots__element').map( (i,li) => {
            let el = $(li);
            el.remove('active');
            li.dataset.page = paginationDefaults.currentDots.first + i;
            el.html( paginationDefaults.currentDots.first + i);
            if(paginationDefaults.currentDots.first + i === page) $(li).add('active');
        })
    }
}
