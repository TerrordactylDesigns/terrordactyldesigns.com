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

  var parallex = function() {
    $('div[data-type="background"]').each(function(){
     var box = $(this);
     $(window).scroll(function() {
       var y = -($(window).scrollTop() / 5);
       var coords = '50%' + y + 'px';
       box.css({backgroundPosition: coords});
     });
    });
  };

  var loadPic = function(pic) {
    function GetParameterValues(param) {
      var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
          return urlparam[1].replace('#', '');
        }
      }
    }
    var param = GetParameterValues('img');
    var $img = $('<img src="img/' + param + '.jpg" />');
    var $viewer = $('#js-viewer');
    $viewer.append($img);
    $('.' + param).addClass('active-thumb');

    $('.thumb').find('.click').click(function() {
      $viewer.find('img').attr('src', 'img/' + $(this).data('img') + '.jpg');
      $('.active-thumb').removeClass('active-thumb');
      $('.' + $(this).data('img')).addClass('active-thumb');
    });
  };

  var scrollToPics = function() {
    $('html, body').animate({
       scrollTop: $('#thumb-tray').offset().top
    }, 'slow');
  }

  return {
    landing: landing,
    parallex: parallex,
    loadPic: loadPic,
    scrollToPics: scrollToPics
  };

})(jQuery, window, document);