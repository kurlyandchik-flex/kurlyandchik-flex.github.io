function initSlickPartners() {
    $('.slick-container-partners').slick({
        slidesToShow: 11,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    });
}

function initSlickGifts() {
    $('.slick-container-gifts').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 1152,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}

function initMap() {
    if($('#map').length === 1){
        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                    center: [53.912129, 27.570365],
                    zoom: 6
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 32,
                    clusterDisableClickZoom: true
                });
            objectManager.clusters.options.set('preset', 'islands#orangeClusterIcons');
            myMap.geoObjects.add(objectManager);

            $.ajax({
                url: "js/map.json"
            }).done(function(data) {
                objectManager.add(data);
            });
            if ($(window).width() < 1023) {
                myMap.behaviors.disable('drag');
                myMap.behaviors.disable('scrollZoom');
            }
        });
    }
}

function initTabs() {
    $('.container-tab-btn .tabs-link').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.container-tab-btn .tabs-link').removeClass('current-t');
        $('.container-content').removeClass('current-t');
        $(this).addClass('current-t');
        $("#"+tab_id).addClass('current-t');
    })
}

function formResponse(form) {
    if(form.closest('.wrapper-form').length){
        var cont = form.closest('.wrapper-form'),
            resp = cont.next('.response');
        if(resp.length){
            cont.fadeOut("slow",function(){
                resp.fadeIn("slow");
            });
        }
    }
}

function initValidForm() {
    var form_valid = $(".js-form");
    if (form_valid.length) {
        form_valid.each(function () {
            var form_this = $(this);
            $.validate({
                form: form_this,
                borderColorOnError: true,
                scrollToTopOnError: false,
                modules: 'html5',
                onSuccess: function ($form) {
                    formResponse(form_this);

                    return false;
                }
            });
        });
    }
}

function initNewPass(){
    $('.btn-pass').on('click', function () {
        $(this).closest('.wrapper-form').find('.wrapper-block-inputs').removeClass('edit-pass');
        $(this).closest('.wrapper-block-inputs').addClass('edit-pass');
    });
}

function initAddCheck() {
    $('.btn-pass').on('click', function () {

    });
}

function initAnchor() {
    $("a.link-anchor-menu").click(function() {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 100;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initSlickPartners();
    initSlickGifts();
    initMap();
    initTabs();
    initValidForm();
    initNewPass();
    initAddCheck();
    initAnchor();
});