var terror = (function($, window, document, undefined) {
  var clicked       = false
    , $jsLandingNav = $('.js-landingNav');


  var flyOut = function() {
    clicked = (clicked) ? false : true;
    if (clicked) {
      $jsLandingNav.css('visibility', 'visible').animate({
        opacity: 1
      }, 'slow', function() {
        $jsLandingNav.addClass('menu_glow');
        setTimeout(function() {
          $jsLandingNav.removeClass('menu_glow');
        }, 500);
      });
    } else {
      $jsLandingNav.css('visibility', 'hidden').animate({
        opacity: 0
      }, 'slow', function() {});
    }
  };

  var landing = function() {
    $('.js-landingLogo').on('click', function(e) {
      e.preventDefault();
      flyOut();
    });
  }

  return {
    landing: landing
  };

})(jQuery, window, document);