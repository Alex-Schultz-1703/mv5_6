 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";

	
	$(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	
	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    autoplay: true,
		    nav: true,
		    smartSpeed: 1000,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 0,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        },
	        1200:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 4
	        }
		    }
			});
		}

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoHeight: true,
	    autoplay: true,
	    pauseOnHover: false,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });






	  

	  $('.slide-link').on('click', function(e) {
		e.preventDefault();
		
		// Получаем данные
		const slideIndex = $(this).data('slide');
		const carousel = $('.slide-one-item');
		const section = $('#testimonials-section');
		
		// Рассчитываем позицию для скролла
		const headerHeight = $('.site-navbar').outerHeight() + 20; // Высота хедера + отступ
		const windowHeight = $(window).height();
		const sectionTop = section.offset().top;
		
		// Центрируем карусель в viewport
		const targetScroll = sectionTop - headerHeight - (windowHeight/2 - section.outerHeight()/2);
	
		// Активируем слайд
		carousel.trigger('to.owl.carousel', [slideIndex, 300]);
		
		// Плавный скролл с easing
		$('html, body').stop(true).animate({
			scrollTop: targetScroll
		}, 800, 'easeInOutQuad', function() {
			// Дополнительная коррекция после анимации
			const finalPosition = sectionTop - headerHeight;
			if($(window).scrollTop() < finalPosition) {
				$(this).scrollTop(finalPosition);
			}
		});
	});
	};
	siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	// siteStellar();



	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 0
      }, 1000, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

});



$(document).ready(function () {
	const element = $('#infinite-typing');
	const phrases = element.data('typing');
	let text = '';
	let i = 0;

	function typeWriter() {
		const fullTxt = phrases[0];

		text = fullTxt.substring(0, i + 1);
		element.html(text + '<span class="cursor">|</span>');

		i++;

		if (i < fullTxt.length) {
			setTimeout(typeWriter, 40);
		} else {
			// Печать завершена, убираем курсор
			setTimeout(() => {
				element.html(text); // без курсора
			}, 500); // небольшая задержка перед удалением курсора
		}
	}

	typeWriter();
});







  // Добавить в конец файла
$(document).ready(function() {
	$('form').submit(function(e) {
	  // Новая валидация
	  if (!validateForm()) {
		e.preventDefault();
	  }
	});
	
	function validateForm() {
	  // Проверка полей
	}
  });


  // Остановка видео после проигрывания
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    
    if(video) {
        // Убираем цикличность
        video.removeAttribute('loop');
        
        // Обработчик окончания видео
        video.addEventListener('ended', function() {
            video.pause();
            
            // Для корректной остановки на последнем кадре в некоторых браузерах
            video.currentTime = video.duration;
        });

        // Запуск видео при скролле (если автоплей заблокирован)
        window.addEventListener('scroll', function handler() {
            if(window.scrollY > 100) {
                video.play().catch(() => {});
                window.removeEventListener('scroll', handler);
            }
        }, {once: true});
    }
});


$(document).ready(function() {
    // Для "Наши партнеры"
    $('.load-more-partners').on('click', function() {
        $('#our-team-section .row > .col-md-6.col-lg-15:hidden').slice(0, 3).show();
        if ($('#our-team-section .row > .col-md-6.col-lg-15:hidden').length === 0) {
            $(this).hide(); // Скрываем кнопку, если больше нет скрытых карточек
        }
    });

    // Для "Наши клиенты"
    $('.load-more-clients').on('click', function() {
        $('#clients-section .row > .col-6.col-md-4.col-lg-3:hidden').slice(0, 4).show();
        if ($('#clients-section .row > .col-6.col-md-4.col-lg-3:hidden').length === 0) {
            $(this).hide(); // Скрываем кнопку, если больше нет скрытых карточек
        }
    });
});