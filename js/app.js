// Fixed header
const header = $('#header');
const navToggle = $('#navToggle');
const intro = $("#intro");
let introH = intro.innerHeight();
let scrollPos = $(window).scrollTop();

$(window).on("scroll resize", function () {
    introH = intro.innerHeight();
    scrollPos = $(this).scrollTop();

    checkScroll(scrollPos, introH);
});

function checkScroll(scrollPos, introH) {
    if (scrollPos > introH) {
        header.addClass("fixed");
    } else {
        header.removeClass("fixed");
    }
}

// Smooth scroll
$("[data-scroll]").on("click", function (evt) {
    evt.preventDefault();

    let elementId = $(this).data('scroll');
    let elementOffset = $(elementId).offset().top;

    $('body').removeClass("show");
    navToggle.removeClass("clicked");

    $("html, body").animate({
        scrollTop: elementOffset - 90
    }, 700);
});

// Nav toggle
navToggle.on('click', function (evt) {
    evt.preventDefault();

    navToggle.toggleClass('clicked');
    $('body').toggleClass('show');
});

// Accordion
const accTitle = $('#accordion .accordion__title');
accTitle.on('click', function () {
    const accContent = $('#accordion .accordion__content');
    accContent.not($(this).next()).slideUp(300);
    accTitle.not($(this)).removeClass('show');

    $(this).toggleClass('show');
    $(this).next().slideToggle(300);
});

// Slider: https://kenwheeler.github.io/slick
const slider = $('.slick');
slider.slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: false,
    dots: true,
    arrows: false
});

// Modal
const modalCall = $('[data-modal]');
const modalClose = $('[data-close]');

modalCall.on('click', function (evt) {
    evt.preventDefault();

    const $this = $(this);
    const modalId = $this.data('modal');

    $(modalId).addClass('show');
    $('body').addClass('no-scroll');

    if (modalId === '#modal_response') {
        $('#modal_record').removeClass('show');
        setTimeout(function () {
            $(modalId).removeClass('show');
            $('body').removeClass('no-scroll');
        }, 5000)
    }
});

modalClose.on('click', function (evt) {
    evt.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.removeClass('show');
    $('body').removeClass('no-scroll');
});

$('.modal').on('click', function () {
    $(this).removeClass('show');
    $('body').removeClass('no-scroll');
});

$('.modal__dialog').on('click', function (evt) {
    evt.stopPropagation();
});

jQuery.support.cors = true;

// Form submit
$('.form').each(function () {
    $(this).validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 25
            },
            phone: 'required'
        },
        messages: {
            name: {
                required: 'Имя обязательное поле',
                minlength: 'Слишком короткое имя',
                maxlength: 'Слишком длинное имя'
            },
            phone: 'Телефон обязательное поле',
        },
        submitHandler: function (form) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: {},//form.serialize(),
                success: function (response) {
                    console.log('submitted');
                    form.reset();
                    $('#modal_record').removeClass('show');
                    $('#modal_response').addClass('show');
                    setTimeout(function () {
                        $('#modal_response').removeClass('show');
                        $('body').removeClass('no-scroll');
                    }, 5000)
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    });
});