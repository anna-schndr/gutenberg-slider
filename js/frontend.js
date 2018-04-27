jQuery( document ).ready(function( $ ) {

    $( '.wp-block-occ-slider' ).each( function() {
    
        var $gallery = $( this );
        var slideCount = null;

        $gallery.on( 'init', function( event, slick ) {
            slideCount = slick.slideCount;
            setSlideCount();
            setCurrentSlideNumber( slick.currentSlide );
        });
                
        $gallery.slick({
            fade: ( $gallery.data( 'effect' ) == 'fade' ),
            autoplay: $gallery.data( 'autoplay' ),
            speed: $gallery.data( 'speed' ),
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


});