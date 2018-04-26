jQuery( document ).ready(function( $ ) {

    var $gallery = $( '.wp-block-occ-slider' );
    var slideCount = null;

    $gallery.on( 'init', function( event, slick ) {
        slideCount = slick.slideCount;
        setSlideCount();
        setCurrentSlideNumber( slick.currentSlide );
    });
                
    $gallery.slick({
        fade: true,
        autoplay: true,
        speed: 500,
        adaptiveHeight: true,
        appendArrows: false,
        pauseOnFocus: false,
        cssEase: 'linear',
        lazyLoad: 'anticipated',
        prevArrow: '.exhibit-navigation .prev',
        nextArrow: '.exhibit-navigation .next, .slick-slide img, .slick-slide div'
    });

    $gallery.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ) {
        setCurrentSlideNumber( nextSlide );
    });

    function setSlideCount() {
        var $el = $( '.exhibit-navigation .counter' ).find( '.total' );
        $el.text( slideCount );
    }

    function setCurrentSlideNumber( currentSlide ) {
        var $el = $( '.exhibit-navigation .counter' ).find( '.current' );
        $el.text( currentSlide + 1 );
    }

});