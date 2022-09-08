$(document).ready(() => {

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 50) {
                selectHeader.classList.add('scrolled')
            } else {
                selectHeader.classList.remove('scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active')
            }
            scrollto(this.hash)
        }
    }, true)

    $("#harmburger").click(function () {
        $("#navbar").toggleClass('active')
    });

    feather.replace();

    $('.carousel').carousel({
        interval: 2000
    });

    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    window.addEventListener('load', () => {
        let isotopeContainer = select('.gallery-container');
        if (isotopeContainer) {
            let isotopeIsotope = new Isotope(isotopeContainer, {
                itemSelector: '.gallery-item',
            });
        }

    });

    const glightbox = GLightbox({
        selector: '.gallery-lightbox'
    });



    // window.addEventListener('load', () => {
    //     let galleryContainer = select('.gallery-container');
    //     if (galleryContainer) {
    //         let galleryIsotope = new Isotope(galleryContainer, {
    //             itemSelector: '.gallery-item',
    //         });
    //     }

    // });
});

$("#contact-form").submit(function (e) {
    e.preventDefault();
    $("loading").css("display", "block");
    $("#error-message").css("display", "none");
    $("#sent-message").css("display", "none");
    var $inputs = $('#contact-form :input');
    var data = {};
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    $.ajax({
        url: `/contact`,
        data: data,
        method: "post",
        success: (response) => {
            if (response.status) {
                $("#loading").css("display", "none");
                $("#sent-message").css("display", "block");
                document.getElementsByName("contact-form")[0].reset();
            } else {
                $("#loading").css("display", "none");
                $("#error-message").css("display", "block");
            }
        },
        error: (jqXHR, exception) => {
            $("#loading").css("display", "none");
            $("#error-message").css("display", "block");
        },
    });
})