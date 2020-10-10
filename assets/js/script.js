$( document ).ready(function() {
  $('.carousel').carousel({
    interval: 3500
  });
  $('.carousel').carousel('cycle');

  $(window).scroll(function(e) {
    if(window.pageYOffset >= 50) {
      $("#navbar").css('opacity', '0.7');
    }
    if(window.pageYOffset < 50) {
      $("#navbar").css('opacity', '1');
    }

    function myFunction(x) {
      if (x.matches) { // If media query matches
        if(window.pageYOffset >= 400) {
          $('#illustration').css('top', '0').css('opacity', '1');
          setTimeout(function() { 
            $('.edu').css('left', '0').css('opacity', '1');
          }, 300);
        }
        if(window.pageYOffset >= 800) {
          for(let i = 1; i <= $('.skill-thumb div').length; i++) {
            setTimeout(function() { 
              $(`.skill-thumb div:nth-child(${i})`).css('top', '0').css('opacity', '1');
            }, i*100);
          }
        }
      } else {
        if(window.pageYOffset >= 700) {
          $('#illustration').css('top', '0').css('opacity', '1');
          setTimeout(function() { 
            $('.edu').css('left', '0').css('opacity', '1');
          }, 300);
        }
        if(window.pageYOffset >= 1350) {
          for(let i = 1; i <= $('.skill-thumb div').length; i++) {
            setTimeout(function() { 
              $(`.skill-thumb div:nth-child(${i})`).css('top', '0').css('opacity', '1');
            }, i*100);
          }
        }
      }
    }
    
    var x = window.matchMedia("(max-width: 960px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes 
  });
})