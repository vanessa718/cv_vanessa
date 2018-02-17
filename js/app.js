(function cv(){
 jQuery.fn.letterDrop = function() {
  var obj = this;
  
  var drop = {
    arr : obj.text().split( '' ),
    
    range : {
      min : 1,
      max : 9
    },
    styles : function() {
      var dropDelays = '\n', addCSS;
       for ( i = this.range.min; i <= this.range.max; i++ ) {
         dropDelays += '.ld' + i + ' { animation-delay: 1.' + i + 's; }\n';  
       }
        addCSS = $( '<style>' + dropDelays + '</style>' );
        $( 'head' ).append( addCSS );
    },
    main : function() {
      var dp = 0;
      obj.text( '' );
      $.each( this.arr, function( index, value ) {
        dp = dp.randomInt( drop.range.min, drop.range.max );
        if ( value === ' ' )
          value = '&nbsp';
          obj.append( '<span class="letterDrop ld' + dp + '">' + value + '</span>' );
      });   
    }
  }; 
  Number.prototype.randomInt = function ( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  };
  
  // Create styles
  drop.styles();
  // Initiate
  drop.main(); 
};
$( 'h1' ).letterDrop();

// Sticky navbar
// =========================
$(document).ready(function() {
    // Custom function which toggles between sticky class (is-sticky)
    var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        } else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    };

    // Find all data-toggle="sticky-onscroll" elements
    $('[data-toggle="sticky-onscroll"]').each(function() {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');

        // Scroll & resize events
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
            stickyToggle(sticky, stickyWrapper, $(this));
        });

        // On page load
        stickyToggle(sticky, stickyWrapper, $(window));
    });
});




// ####### Native browser smooth scrolling with jQuery              #######
// ####### https://css-tricks.com/snippets/jquery/smooth-scrolling  #######

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

// ####### END SMOOTH SCROLLING #######

// #######  Sticky BACK to TOP button  #######
// https://cotswoldphoto.co.uk/bootstrap-float-to-top-button 
// 
$(document).ready(function(){
      // "Back to top" for english version, "Haut de page" for french version
      $('body').append('<div id="toTop" class="btn btn-back"><i class="fa fa-arrow-up"></i>Haut de page</div>');
      $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
      } else {
        $('#toTop').fadeOut();
      }
    }); 
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
//
// #######  END BACK to TOP button  #######

 


})();
