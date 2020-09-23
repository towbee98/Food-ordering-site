(function($) {
    "use strict";

    $(document).ready(function() {
        $("#quantity").click(function() {
            var resultVal = 0.0;
             // $('.price, .quantity').each(function(){
             //    // $(this).on('blur',function(){
             //      var totalPrice = parseInt($('.price').val()) || 0;
             //      var totalQty = parseInt($('.quantity').val()) || 0;
             //      resultVal = parseInt(resultVal) + (totalPrice*totalQty);
             //      console.log(totalPrice);
             //      console.log(totalQty);
             //      // alert(resultVal);
             //    });
            // alert(resultVal);

            var $row = $(this).closest(".row");
            var totalRcv = parseInt($row.find('.receive').val()) || 0;
            var totalRtn = parseInt($row.find('.return').val()) || 0;
            // $row.find('.balance').val(totalRcv - totalRtn);
            // console.log(totalRcv);


            // var totalRcv = parseInt($row.find('.price').val()) || 0;
            // var totalQty = parseInt($row.find('.quantity').val()) || 0;
            // alert(totalRcv-totalQty);
            // $row.find('.totalitem').val(totalRcv - totalQty);

            // var resultVal = 0.0;
            //    $(".price").each ( function() {
            //        resultVal += parseFloat ( $(this).val().replace(/\s/g,'').replace(',','.'));
            //     });
                

            // alert(totalRcv);
        });
    });
    // Convert All Image to SVG
    $('img.svg').each(function() {
        var $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass);
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
    //Lbamaba Menu
    var wWidth = $(window).width();
    var mobileMenu = $('.nav.navbar-nav > li');
    $('.nav.navbar-nav > li').on('click', function() {
        $(this).children('ul').slideToggle(1000);
        $(this).siblings('li').children('ul').slideUp();
        $(this).parents('.nav.navbar-nav').siblings('.nav.navbar-nav').children('li').children('ul').slideUp();
    });
    var isMobile = wWidth < 768;
    $(window).on('resize', function() {
        wWidth = $(window).width();
        isMobile = wWidth < 768;
    });
    $('.mobile_menu').on('click', function() {
        if (isMobile) {
            $(this).siblings('.main_menu_nav').slideToggle();
        }
    });
    //Checkout
    $('.field_title_banner').on('click', function() {
        $(this).siblings('.sortable_filed').slideToggle(500);
    });
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // Hero Slider
    var wHight = $(window).height(),
        CameraHight = $(window).height() - 140,
        mSlider2 = $('#banner_slider');
    if (mSlider2.length) {
        mSlider2.camera({
            height: CameraHight + 'px',
            loader: false,
            navigation: true,
            autoPlay: true,
            time: 4000,
            playPause: false,
            pagination: false,
            thumbnails: false,
            onEndTransition: function() {
                $('.cameraSlide img').addClass('grow');
            }
        });
    }
    $('.testimonial_slider_area').owlCarousel({
        animateOut: 'fadeOutLeft',
        animateIn: 'fadeInRight',
        items: 1,
        loop: true,
        margin: 30,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        smartSpeed: 1000,
        dots: false,
        responsiveClass: true
    })
    $(window).enllax({
        ratio: 0.0,
        direction: 'vertical'
    });
    //Add Animation on tab
    $('.bamba_tab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('.kmas_tab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    })
    //Seat researvation
    var label_width = $('.single_field label').width(),
        input_width = $('.single_field input').width() - label_width;
    $('.single_field input').css({
        'width': input_width + 'px'
    });
    $('.go-top').fadeOut();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 2000) {
            $('.go-top').fadeIn();
            $('.go-top').removeClass('no-visibility');
        } else {
            $('.go-top').fadeOut();
        }
    });
    $('.go-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });
    //Venobox
    $('.restaurent_menu_img').venobox();
    //Quentity slider
    function productQuantity() {
        $('.up').on('click', function() {
            var this_select = $(this).siblings('input');
            this_select.val(parseInt(this_select.val()) + 1, 10);
        });
        $('.down').on('click', function() {
            var this_select = $(this).siblings('input');
            var downV = this_select.val(parseInt(this_select.val()) - 1, 10);
        });
    }
    productQuantity();
    $('.cart_add_remove').on('click', function() {
        $(this).parents('li').parents('ul').parents('li').hide();
    });
    //Food Menu Gallery Carousel
    $('.food_gallery_carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        dots: false,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        nav: true,
        navText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            300: {
                items: 1
            },
            480: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
    // Google Map
    var googleMapSelector = $('#contactgoogleMap'),
        myCenter = new google.maps.LatLng(23.8103, 90.4125);

    function initialize() {
        var mapProp = {
            center: myCenter,
            zoom: 12,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#e5e5e5"
                }, {
                    "visibility": "on"
                }]
            }]
        };
        var map = new google.maps.Map(document.getElementById("contactgoogleMap"), mapProp);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE,
            icon: 'assets/img/components/location-pin.png'
        });
        marker.setMap(map);
    }
    if (googleMapSelector.length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    $(window).load(function() {
        $('.loader_container').fadeOut('slow');
    });
    $('.style_controller').on('click', function() {
        $(this).parents('.salam_styller').toggleClass('active inactive');
    });
    // $(function() {
    //     $(this).bind("contextmenu", function(e) {
    //         e.preventDefault();
    //     });
    // }); 
})(jQuery);