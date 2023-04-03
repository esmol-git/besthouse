new Swiper('.hero__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 2000,
    },
    pagination: {
        el: '.hero__slider-pagination',
        type: 'bullets',
        clickable: true,
    },
    navigation: {
        nextEl: '.hero__slider-next',
        prevEl: '.hero__slider-prev',
    },
})
new Swiper('.about__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
})
