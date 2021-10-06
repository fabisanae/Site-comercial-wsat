/* Global variables */
"use strict";
var $document = $(document),
	$window = $(window),
	plugins = {
		affixElement: $('#navbar-main'),
		mainSlider: $('#slider'),
		categoryCarousel: $('.category-carousel'),
		servicesCarousel: $('.services-carousel'),
		priceCarousel: $('.price-carousel'),
		testimonialsCarousel: $('.testimonials-carousel'),
		numberCarousel: $('.number-carousel'),
		textIconCarousel: $('.text-icon-carousel'),
		postCarousel: $('.post-carousel'),
		gallery: $('#gallery'),
		backToTop: $('.back-to-top'),
		submenu: $('[data-submenu]'),
		timer: $('#timerBlock .timer'),
		waveSlider: $('#sea'),
		waveSliderFooter: $('#footerSea'),
		isotopeGallery: $('.gallery-isotope'),
		postGallery: $('.blog-isotope'),
		requestFormSimple: $('#requestFormSimple'),
		productImage: $("#mainImage"),
		rangeSlider: $('#rangeSlider1'),
		prdCarousel: $('.prd-carousel'),
		stickyHeader: $(".page-header.sticky"),
	}


/* Initialize All Scripts */
$document.ready(function () {

	var windowWidth = window.innerWidth || $window.width();
	var windowH = $window.height();

	//remove loader
	setTimeout(function () {
		$('#loader-wrapper').fadeOut(500);
	}, 100);

	// fix navigation
	plugins.affixElement.affix({
		offset: {
			top: function () {
				return (this.top = plugins.affixElement.offset().top)
			}
		}
	});

	// back to top
	var backPos;
	if (plugins.backToTop.length) {
		var backPos = plugins.backToTop.offset();
		if (backPos.top < windowH) {
			plugins.backToTop.hide();
		}
		plugins.backToTop.on('click', function () {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
			return false;
		});
	}

	// start all the timers
	if (plugins.timer.length) {
		$('#timerBlock').waypoint(function () {
			plugins.timer.each(count);
			this.destroy();
		}, {
			triggerOnce: true,
			offset: '80%'
		});
	}

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}

	// product gallery 
	function handleResize(mq) {
		if (mq.matches) {
			ezApi.changeState('enable');
		} else {
			ezApi.changeState('disable');
		}
	}
	if (plugins.productImage.length) {
		plugins.productImage.elevateZoom({
			gallery: 'productPreviews',
			cursor: 'pointer',
			galleryActiveClass: 'active',
			zoomWindowPosition: 1,
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 500,
			lensFadeIn: 500,
			lensFadeOut: 500
		});
		var ezApi = plugins.productImage.data('elevateZoom');
		if ((window.innerWidth || $window.width()) < 769) {
			ezApi.changeState('disable');
		}
		var mq = window.matchMedia('screen and (min-width: 768px)');
		mq.addListener(handleResize);
		$('#productPreviews > a').on('click', function () {
			plugins.productImage.attr({
				src: $(this).attr('data-image'),
				'data-zoom-image': $(this).attr('data-zoom-image')
			})
		})
	}

	// icrease/decrease input
	function changeInput() {
		$(document).on('click', '.count-add, .count-reduce', function (e) {
			var $this = $(e.target),
				input = $this.parent().find('.count-input'),
				v = $this.hasClass('count-reduce') ? (input.val() - 1) : (input.val() * 1 + 1),
				min = input.attr('data-min') ? input.attr('data-min') : 1;
			if (v >= min) input.val(v);
			e.preventDefault();
		});
	}

	// rangeSlider
	if (plugins.rangeSlider.length) {
		var rangeSlider1 = document.getElementById('rangeSlider1');
		noUiSlider.create(rangeSlider1, {
			start: [100, 2000],
			connect: true,
			step: 100,
			padding: 100,
			range: {
				'min': 0,
				'max': 10100,
			}
		});
		var number1_1 = document.getElementById('number-1-1');
		var number1_2 = document.getElementById('number-1-2');
		rangeSlider1.noUiSlider.on('update', function (values, handle) {
			var value = values[handle];
			if (handle) {
				number1_1.textContent = Math.round(value);
			} else {
				number1_2.textContent = Math.round(value);
			}
		});
		number1_1.addEventListener('change', function () {
			rangeSlider1.noUiSlider.set([this.textContent, null]);
		});
		number1_2.addEventListener('change', function () {
			rangeSlider1.noUiSlider.set([null, this.textContent]);
		});
	}

	// image popup
	if (plugins.gallery.length) {
		plugins.gallery.find('a.hover, a.btn').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}

	// slider
	if (plugins.mainSlider.length) {
		plugins.mainSlider.nivoSlider({
			animSpeed: 500,
			pauseTime: 5000,
			pauseOnHover: false,
			effect: 'boxRainGrowReverse',
			prevText: '',
			nextText: '',
			controlNav: false
		});
		plugins.mainSlider.css({
			'height': 'auto'
		})
	}

	// products carousel
	if (plugins.prdCarousel.length) {
		plugins.prdCarousel.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			dots: false,
			arrows: true,
			responsive: [{
				breakpoint: 1299,
				settings: {
					dots: true,
					arrows: false
				}
				}, {
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					dots: true,
					arrows: false
				}
				}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					dots: true,
					arrows: false
				}
				}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					dots: true,
					arrows: false
				}
				}]
		});
	}

	// price carousel
	if (plugins.priceCarousel.length) {
		plugins.priceCarousel.slick({
			mobileFirst: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: true,
			dots: false,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						arrows: false
					},
				}]
		});
	}

	// testimonials carousel
	if (plugins.testimonialsCarousel.length) {
		plugins.testimonialsCarousel.slick({
			mobileFirst: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 2000,
			arrows: false,
			dots: true
		});
	}

	// post carousel
	if (plugins.postCarousel.length) {
		plugins.postCarousel.slick({
			mobileFirst: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 2000,
			arrows: true,
			dots: false
		});
	}

	// mobile carousel
	function slickMobile(carousel) {
		carousel.slick({
			mobileFirst: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 2000,
			arrows: false,
			dots: true,
			slide: '.slide-item',
			responsive: [
				{
					breakpoint: 767,
					settings: "unslick",
                }]
		});
	}

	function startCarousel() {
		if (plugins.categoryCarousel.length) {
			slickMobile(plugins.categoryCarousel);
		}
		if (plugins.servicesCarousel.length) {
			slickMobile(plugins.servicesCarousel);
		}
		if (plugins.numberCarousel.length) {
			slickMobile(plugins.numberCarousel);
		}
		if (plugins.textIconCarousel.length) {
			slickMobile(plugins.textIconCarousel);
		}
	}
	if (windowWidth < 768) {
		startCarousel();
	}
	// END mobile carousel

	// submenu
	function toggleNavbarMethod(windowWidth) {
		$(".dropdown > a, .dropdown-submenu > a").on('click.toggleNavbarMethod', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var url = $(this).attr('href');
			if (url) $(location).attr('href', url);
		});
		if (windowWidth > 767) {
			$(".dropdown, .dropdown-submenu").on('mouseenter.toggleNavbarMethod', function () {
				$(this).find('.dropdown-menu').first().stop(true, true).fadeIn("fast");
				$(this).toggleClass('open');
			}).on('mouseleave.toggleNavbarMethod', function () {
				$(this).find('.dropdown-menu').first().stop(true, true).fadeOut("fast");
				$(this).toggleClass('open');
			});
		} else {
			$(".dropdown, .dropdown-submenu").unbind('.toggleNavbarMethod');
			$(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").unbind('.toggleNavbarMethod');
			$(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").on('click.toggleNavbarMethod', function (e) {
				e.stopPropagation();
				e.preventDefault();
				var $li = $(this).parent().parent('li');
				if ($li.hasClass('opened')) {
					$li.find('.dropdown-menu').first().stop(true, true).slideUp(0);
					$li.removeClass('opened');
				} else {
					$li.find('.dropdown-menu').first().stop(true, true).slideDown(0);
					$li.addClass('opened');
				}
			})
		}
	}

	$.fn.stickyHeader = function () {
		var $header = this,
			$body = $('body'),
			headerOffset,
			stickyH;

		function setHeigth() {
			$(".stspace").remove();
			$header.removeClass('animated is-sticky fadeIn');
			$body.removeClass('hdr-sticky');
			headerOffset = $('#slidemenu', $header).offset().top;
			stickyH = $header.height() + headerOffset;
		}
		setHeigth();
		var prevWindow = window.innerWidth || $(window).width()
		$(window).on('resize', function () {
			var currentWindow = window.innerWidth || $(window).width();
			if (currentWindow != prevWindow) {
				setHeigth()
				prevWindow = currentWindow;
			}
		});
		$(window).scroll(function () {
			if (prevWindow < 992) return;
			var st = getCurrentScroll();
			if (st > headerOffset) {
				if (!$(".stspace").length && !$body.hasClass('home')) {
					$header.after('<div class="stspace"></div>');
					$(".fix-space").css({
						'height': $header.height() + 'px'
					});
				}
				$header.addClass('is-sticky animated fadeIn');
			} else {
				$(".stspace").remove();
				$header.removeClass('animated is-sticky fadeIn');
			}
		});

		function getCurrentScroll() {
			return window.pageYOffset || document.documentElement.scrollTop;
		}
	}

	if (plugins.stickyHeader.length) {
		$(plugins.stickyHeader).stickyHeader();
	}
	toggleNavbarMethod(windowWidth);
	toggleCart('.header-cart', '.header-cart-dropdown');
	popupForm('.form-popup-link');
	modalPopup('.modal-popup-link');
	changeInput();

	// slide menu
	$('#slide-nav').after($('<div id="navbar-height-col"></div>'));
	var toggler = '.navbar-toggle';
	var pagewrapper = '#page-content';
	var navigationwrapper = '.navbar-header';
	var menuwidth = '100%';
	var slidewidth = '270px';
	var menuneg = '-100%';
	var slideneg = '-270px';
	$("#slide-nav").on("click", toggler, function (e) {
		var selected = $(this).hasClass('slide-active');
		$('#slidemenu').stop().animate({
			left: selected ? menuneg : '0px'
		});
		$('#navbar-height-col').stop().animate({
			left: selected ? slideneg : '0px'
		});
		$(pagewrapper).stop().animate({
			left: selected ? '0px' : slidewidth
		});
		$(navigationwrapper).stop().animate({
			left: selected ? '0px' : slidewidth
		});
		$(this).toggleClass('slide-active', !selected);
		$('#slidemenu').toggleClass('slide-active');
		$('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
	});
	var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
	// END slide menu

	// Gallery Isotope
	if (plugins.isotopeGallery.length) {
		var $gallery = plugins.isotopeGallery;
		isotopeFilters('.gallery');
		$gallery.imagesLoaded(function () {
			setGallerySize();
		});
		$gallery.isotope({
			itemSelector: '.gallery__item',
			masonry: {
				columnWidth: '.gallery__item:not(.doubleW)'
			}
		});
		$('.view-more-gallery').on('click', function () {
			var item;
			var target = $(this).attr('data-load');
			$(this).hide();
			$.ajax({
				url: target,
				success: function (data) {
					$('#galleryPreload').append(data);
					$('#galleryPreload > div').each(function () {
						item = $(this);
						$gallery.append(item).isotope('appended', item);
						setGallerySize();
					});
				}
			});
		})
	}

	// Isotope Filters (for gallery)
	function isotopeFilters(gallery) {
		var gallery = $(gallery);
		if (gallery.length) {
			var container = gallery;
			var optionSets = $(".filters-by-category .option-set"),
				optionLinks = optionSets.find("a");
			optionLinks.on('click', function (e) {
				var thisLink = $(this);
				if (thisLink.hasClass("selected")) return false;
				var optionSet = thisLink.parents(".option-set");
				optionSet.find(".selected").removeClass("selected");
				thisLink.addClass("selected");
				var options = {},
					key = optionSet.attr("data-option-key"),
					value = thisLink.attr("data-option-value");
				value = value === "false" ? false : value;
				options[key] = value;
				if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
				else {
					container.isotope(options);
				}
				return false
			})
		}
	}



	// Post More
	$('.view-more-post').on('click', function () {
		var item;
		var target = $(this).attr('data-load');
		$(this).hide();
		$.ajax({
			url: target,
			success: function (data) {
				$('#postPreload').append(data);
				if (plugins.postGallery.length) {
					$('#postPreload > div').each(function () {
						item = $(this);
						$postgallery.append(item).isotope('appended', item);
						setPostSize();
					});
				}
			}
		});
	})

	function setGallerySize() {
		var windowW = window.innerWidth || $window.width(),
			itemsInRow = 1;
		if (windowW > 1199) {
			itemsInRow = 6;
		} else if (windowW > 767) {
			itemsInRow = 3;
		} else if (windowW > 480) {
			itemsInRow = 2;
		}
		var containerW = $('#page-content').width(),
			galleryW = containerW / itemsInRow;
		$gallery.find('.gallery__item').each(function () {
			if ($(this).hasClass('doubleW') && windowW > 767) {
				$(this).css({
					width: galleryW * 2 + 'px',
				});
			} else {
				$(this).css({
					width: galleryW + 'px'
				});
			}
		});
		var galleryH = $gallery.find('.gallery__item:not(.doubleH)').height();
		$gallery.find('.gallery__item').each(function () {
			$(this).css({
				height: ''
			});
			if ($(this).hasClass('doubleH') && windowW > 767) {
				$(this).css({
					height: galleryH * 2 + 'px'
				});
			}
		});
		$gallery.isotope('layout');
	}

	function setPostSize() {
		var windowW = window.innerWidth || $window.width(),
			itemsInRow = 1;
		if (windowW > 1199) {
			itemsInRow = 3;
		} else if (windowW > 767) {
			itemsInRow = 3;
		} else if (windowW > 480) {
			itemsInRow = 1;
		}
	

		setTimeout(function () {
			$('.slick-initialized').slick('setPosition');
			$postgallery.isotope('layout');
		}, 100);
	}

	// Contact page form
	
			

	


	// wave effect
	function waveEffect(canvas, parent, color) {

		var TAU = Math.PI * 2;
		var density = 1;
		var speed = 1;
		var res = 0.005; // percentage of screen per x segment
		var outerScale = 0.05 / density;
		var inc = 0;
		var c = $(canvas)[0];
		var ctx = c.getContext('2d');
		var grad = ctx.createLinearGradient(0, 0, 0, c.height * 4);

		function onResize() {
			$(canvas).attr({
				width: $(parent).width() + "px",
				height: $(parent).height() + "px",
			});
		}

		onResize();
		loop();
		$window.resize(onResize);

		function loop() {
			inc -= speed;
			drawWave(color);
			requestAnimationFrame(loop);
		}

		function drawWave(color) {
			var w = c.offsetWidth;
			var h = c.offsetHeight;
			var cx = w * 0.5;
			var cy = h * 0.5;
			ctx.clearRect(0, 0, w, h);
			var segmentWidth = w * res;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(0, cy);
			for (var i = 0, endi = 1 / res; i <= endi; i++) {
				var _y = cy + Math.sin((i + inc) * TAU * res * density) * cy * Math.sin(i * TAU * res * density * outerScale);
				var _x = i * segmentWidth;
				ctx.lineTo(_x, _y);
			}
			ctx.lineTo(w, h);
			ctx.lineTo(0, h);
			ctx.closePath();
			ctx.fill();
		}
	}
	if (plugins.waveSliderFooter.length) {
		waveEffect(plugins.waveSliderFooter, '.page-footer', '#28bceb');
	}
	if (plugins.waveSlider.length) {
		waveEffect(plugins.waveSlider, '#slider', '#ffffff');
	}

	// Header Cart dropdown menu
	function toggleCart(cart, drop) {
		$('> a', $(cart)).on('click', function () {
			$(cart).toggleClass('opened');
		});
		$(document).on('click', function (e) {
			if (!$(e.target).closest(cart).length) {
				if ($(cart).hasClass("opened")) {
					$(cart).removeClass('opened');
				}
			}
		})
	}

	// Dropdown Form
	function popupForm(link) {
		if ($(link).length) {
			$(link).on('click', function (e) {
				$(this).closest('.form-popup-wrap').find('.form-popup').toggleClass('opened');
				e.preventDefault();
			})
			$(document).on('click', function (event) {
				if (!$(event.target).closest('.form-popup-wrap').length) {
					if ($('.form-popup').hasClass("opened")) {
						$('.form-popup').removeClass('opened');
					}
				}
			})
		}
	}

	// Modal Form
	function modalPopup(drop) {
		$(document).on('click', drop, function (e) {
			var url = $(e.target).attr('href');
			console.log('');
			$.magnificPopup.open({
				items: {
					src: url
				},
				type: 'inline',
				midClick: true,
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		})
	}

	// Lazy Loading Effect
	function onScrollInit(items, container) {
		items.each(function () {
			var element = $(this),
				animationClass = element.attr('data-animation'),
				animationDelay = element.attr('data-animation-delay');

			element.css({
				'-webkit-animation-delay': animationDelay,
				'-moz-animation-delay': animationDelay,
				'animation-delay': animationDelay
			});

			var trigger = (container) ? container : element;

			trigger.waypoint(function () {
				element.addClass('animated').addClass(animationClass);
			}, {
				triggerOnce: true,
				offset: '90%'
			});
		});
	}
	onScrollInit($('.animation'));
	onScrollInit($('.step-animation'), $('.step-animation-container'));

	// Resize window events
	$window.resize(function () {
		var windowWidth = window.innerWidth || $window.width();
		if (windowWidth < 768) {
			startCarousel();
		}
		if (windowWidth > 767 && $('.navbar-toggle').is(':hidden')) {
			$(selected).removeClass('slide-active');
		}
		setTimeout(function () {
			toggleNavbarMethod(windowWidth);
			if (plugins.isotopeGallery.length) {
				setGallerySize();
			}
			if (plugins.postGallery.length) {
				setPostSize();
			}
		}, 500);
	});

})
