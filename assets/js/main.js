$(function () {

    var $window = $(window);

    // Window scroll data
    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowMidPosition = windowTopPosition + $window.height() / 2;
    var windowBottomPosition = (windowTopPosition + windowHeight);

    // Which elements to animate
    var animatedElements = $('.animate');

    updatePageElementsOnScroll();

    // Showing photo data
    $('.photo__data-trigger').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (event.altKey || event.shiftKey) {
            // Showing info of all photos
            $.each($('.photo'), function (key, value) {
                $(this).addClass('info');
            });
        } else {
            // Showing just the selected photo info
            $(this).closest('.photo').addClass('info');
        }
    });

    // When clicking photo data area it closes
    $('.photo__data').on('click', function () {
        if (event.altKey || event.shiftKey) {
            // Hiding info of all photos
            $.each($('.photo'), function (key, value) {
                $(this).removeClass('info');
            });
        } else {
            // Hiding just the selected photo info
            $(this).closest('.photo').removeClass('info');
        }
    });

    $('#hamburger').on('click', function () {
        if ($('#menu-wrapper').hasClass('open')) {
            $('#menu-wrapper').removeClass('open');
            $('#navigation-menu').removeClass('open');
            $('body').removeClass('no-scroll');
        } else {
            $('#menu-wrapper').addClass('open');
            $('#navigation-menu').addClass('open');
            $('body').addClass('no-scroll');
        }
    });

    if (animatedElements.length) {
        animateElements(windowHeight, windowTopPosition, windowMidPosition, windowBottomPosition);
    }

    window.onscroll = function (e) {
        updateScrollData();
        updatePageElementsOnScroll();

        if (animatedElements.length) {
            animateElements(windowHeight, windowTopPosition, windowMidPosition, windowBottomPosition);
        }
    };

    var lb_defaults = {
        // Enable infinite gallery navigation
        loop: false,

        // Should display counter at the top left corner
        infobar: true,

        // Should display close button (using `btnTpl.smallBtn` template) over the content
        // Can be true, false, "auto"
        // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
        // smallBtn: "true",

        // Should display toolbar (buttons at the top)
        // Can be true, false, "auto"
        // If "auto" - will be automatically hidden if "smallBtn" is enabled
        toolbar: "auto",

        // Horizontal space between slides
        gutter: 50,

        // Disable right-click and use simple image protection for images
        protect: false,

        // Should display navigation arrows at the screen edges
        arrows: true,

        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons: [
            "zoom",
            // "share",
            "slideShow",
            "fullScreen",
            // "download",
            // "thumbs",
            "close"
        ],

        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect: "fade",

        // Duration in ms for open/close animation
        animationDuration: 500,

        zoomOpacity: "auto",

        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect: "fade",

        // Duration in ms for transition animation
        transitionDuration: 500,

        slideShow: {
            autoStart: false,
            speed: 5000
        },

        // After image has loaded
        afterLoad: function (instance, current) {
            var pixelRatio = window.devicePixelRatio || 1;

            if (pixelRatio > 1.5) {
                current.width = current.width / (pixelRatio / 1.2);
                current.height = current.height / (pixelRatio / 1.2);
            }
        },

        // After image has loaded and animated
        afterShow: function () {
        },

        lang: "sv",
        i18n: {
            en: {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                PLAY_START: "Start slideshow",
                PLAY_STOP: "Pause slideshow",
                FULL_SCREEN: "Full screen",
                THUMBS: "Thumbnails",
                DOWNLOAD: "Download",
                SHARE: "Share",
                ZOOM: "Zoom"
            },
            sv: {
                CLOSE: "Stäng",
                NEXT: "Nästa",
                PREV: "Föregående",
                ERROR: "Innehållet kunde inte laddas. <br/> Försök igen senare.",
                PLAY_START: "Starta bildspel",
                PLAY_STOP: "Pausa bildspel",
                FULL_SCREEN: "Fullskärm",
                THUMBS: "Tumnaglar",
                DOWNLOAD: "Ladda ner",
                SHARE: "Dela",
                ZOOM: "Zooma"
            },
        }
    };

    // Initializing fancybox
    // $('[data-fancybox').fancybox(lb_defaults);

    function updateScrollData() {
        windowHeight = $window.height();
        windowTopPosition = $window.scrollTop();
        windowMidPosition = windowTopPosition + $window.height() / 2;
        windowBottomPosition = (windowTopPosition + windowHeight);
    }

    function animateElements(windowHeight, windowTopPosition, windowMidPosition, windowBottomPosition) {
        if (animatedElements.length) {
            var window_top_offset = 0; //windowHeight * 0.25;
            var window_bottom_offset = windowHeight * 0.05;
            var i = 1;

            $.each(animatedElements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                if ((element_bottom_position >= windowTopPosition + window_top_offset) && (element_top_position <= windowBottomPosition - window_bottom_offset)) {
                    $element.addClass('animate--in-view animate--animated');
                } else {
                    $element.removeClass('animate--in-view');
                }
                i++;
            });
        }
    }

    function updatePageElementsOnScroll() {
        var heroLogo = $('#hero-logo-wrapper');
        var headerLogo = $('#header-logo-mobile');
        var pageHeader = $('.page-header');

        if (heroLogo.length) {
            var heroLogoDiff = heroLogo.offset().top - windowTopPosition;
        } else {
            // heroLogoDiff = $('.page-header').outerHeight();
            heroLogoDiff = 0;
        }

        var heroLogoOpacity = heroLogoDiff;
        var headerLogoOpacity = 100 - heroLogoOpacity;

        if (heroLogoOpacity < 0) {
            heroLogoOpacity = 0;
        } else if (heroLogoOpacity > 100) {
            heroLogoOpacity = 100;
        }

        if (headerLogoOpacity < 0) {
            headerLogoOpacity = 0;
        } else if (headerLogoOpacity > 100) {
            headerLogoOpacity = 100;
        }

        heroLogoOpacity = heroLogoOpacity / 100;
        headerLogoOpacity = headerLogoOpacity / 100;

        var headerBGOpacity = headerLogoOpacity;

        if (headerBGOpacity < 0) {
            headerBGOpacity = 0;
        } else if (headerBGOpacity > 0.8) {
            headerBGOpacity = 0.8;
        }

        pageHeader.css('background-color', 'rgba(43, 43, 43, ' + headerBGOpacity + ')');

        heroLogo.css('opacity', heroLogoOpacity);
        headerLogo.css('opacity', headerLogoOpacity);
    }

    // lazySizes options
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.loadHidden = false;
    window.lazySizesConfig.requireJs = function (modules, cb) {
        window.require(modules, cb);
    };

    // lazySizes background image support
    document.addEventListener('lazybeforeunveil', function (e) {
        var bg = e.target.getAttribute('data-bg');
        console.log(e);
        if (bg) {
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });

});
