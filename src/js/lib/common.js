/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();

	if ($('.js-slider').length) {
		initSlider($('.js-slider'));
	}

	function initSlider(slider) {

		slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			prevArrow: '<button type="button" class="slick-prev"><div class="icon icon-slick-prev"></div></button>',
			nextArrow: '<button type="button" class="slick-next"><div class="icon icon-slick-next"></div></button>'
		});
	}

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	})();

	//gallery
	(function () {
		var gallery = $('.js-gallery'),
			galleryContent = $('.js-gallery-content'),
			zoomBtn = $('.js-gallery-zoom'),
			disableScroll = $('.js-disable-scroll');

		var hamburger = $('.js-hamburger'),
			phone = $('.js-phone'),
			aside = $('.js-aside'),
			geoBtn = $('.js-geo'),
			navigation = $('.js-navigation'),
			navigation2 = $('.js-navigation2'),
			moveWrapper = $('.js-move-wrapper');

		var roomFullpage = $('.js-room-fullpage'),
			roomFullpage2 = $('.js-room-fullpage2'),
			suboption = $('.js-suboption').children(),
			galleryBtn = $('.js-gallery-btn');

		if (roomFullpage.length) {
			roomFullpage.pagepiling({
				menu: null,
				direction: 'vertical',
				verticalCentered: true,
				sectionsColor: [],
				anchors: [],
				scrollingSpeed: 700,
				easing: 'swing',
				loopBottom: true,
				loopTop: true,
				css3: true,
				navigation: false,
				normalScrollElements: null,
				normalScrollElementTouchThreshold: 20,
				touchSensitivity: 20,
				keyboardScrolling: true,
				sectionSelector: '.js-room-page',
				animateAnchor: false
			});

			disableScroll.on('mouseenter', function () {
				$.fn.pagepiling.setAllowScrolling(false);
			});

			disableScroll.on('mouseleave', function () {
				$.fn.pagepiling.setAllowScrolling(true);
			});

			galleryBtn.on('click', function () {
				$.fn.pagepiling.moveSectionDown();
			});
		}

		$(this).toString();

		if (roomFullpage2.length) {
			roomFullpage2.pagepiling({
				menu: null,
				direction: 'vertical',
				verticalCentered: true,
				sectionsColor: [],
				anchors: [],
				scrollingSpeed: 700,
				easing: 'swing',
				loopBottom: true,
				loopTop: true,
				css3: true,
				navigation: false,
				normalScrollElements: null,
				normalScrollElementTouchThreshold: 20,
				touchSensitivity: 20,
				keyboardScrolling: true,
				sectionSelector: '.room__bg',
				animateAnchor: false,
				onLeave: function (index, nextIndex, direction) {
					switch (nextIndex) {
						case 1:
							suboption.removeClass('is-active');
							suboption.eq(0).addClass('is-active');
							break;
						case 2:
							suboption.removeClass('is-active');
							suboption.eq(0).addClass('is-active');
							break;
						case 3:
							suboption.removeClass('is-active');
							suboption.eq(1).addClass('is-active');
							break;
						case 4:
							suboption.removeClass('is-active');
							suboption.eq(2).addClass('is-active');
							break;
						default:
							suboption.removeClass('is-active');
					}
				}
			});

			disableScroll.on('mouseenter', function () {
				$.fn.pagepiling.setAllowScrolling(false);
			});

			disableScroll.on('mouseleave', function () {
				$.fn.pagepiling.setAllowScrolling(true);
			});
		}

		zoomBtn.on('click', function (e) {
			e.preventDefault();
			$.fn.pagepiling.setAllowScrolling(false);
			var _this = $(this),
				href = _this.data('href');
			$('<div class="gallery__bg js-gallery-bg" style="background-image: url(' + href + ')"><button type="button" class="gallery__bg-btn js-gallery-zoom-out"></button></div>').insertAfter(_this.closest(galleryContent));
			$('.js-gallery-bg').fadeIn();
			hamburger.unbind('click');
			hamburger.on('click', function () {
				if ($('.js-gallery-bg').hasClass('is-move')) {
					$('.js-gallery-bg').removeClass('is-move');
				} else {
					$('.js-gallery-bg').addClass('is-move');
				}
				if (moveWrapper.length) {
					moveWrapper.toggleClass('is-move');
				}
				$(this).toggleClass('is-active');
				phone.toggleClass('is-active');
				if ($(this).hasClass('is-geo')) {
					navigation2.fadeToggle().css('display', 'flex').toggleClass('is-active');
					$(this).removeClass('is-geo');
				} else {
					navigation.fadeToggle().css('display', 'flex').toggleClass('is-active');
				}
				aside.fadeToggle().css('display', 'flex');
			});
			$('.js-gallery-zoom-out').on('click', function () {
				var _thisBtn = $(this);
				$.fn.pagepiling.setAllowScrolling(true);
				_thisBtn.parent().fadeOut(function () {
					_thisBtn.parent().remove();
				});
			});
		});

		//navigation
		hamburger.on('click', function () {
			if (moveWrapper.length) {
				moveWrapper.toggleClass('is-move');
			}
			$(this).toggleClass('is-active');
			phone.toggleClass('is-active');
			if ($(this).hasClass('is-geo')) {
				navigation2.fadeToggle().css('display', 'flex').toggleClass('is-active');
				$(this).removeClass('is-geo');
			} else {
				navigation.fadeToggle().css('display', 'flex').toggleClass('is-active');
			}
			aside.fadeToggle().css('display', 'flex');
		});

		geoBtn.on('click', function () {
			hamburger.toggleClass('is-active').addClass('is-geo');
			phone.toggleClass('is-active');
			aside.fadeToggle().css('display', 'flex');
			navigation2.fadeToggle().css('display', 'flex').toggleClass('is-active');
		});
	})();

	//change backgrounds
	(function () {
		var bgBtn = $('.js-bg'),
			delay = 300,
			setTimeoutConst,
			preloadWrapper = $('.js-preload-image');

		if (bgBtn.length) {
			$('.section').append('<div class="section__bg"></div>');
			$('.section').append('<div class="section__bg"></div>');
		}

		bgBtn.on('mouseenter', function () {
			var _this = $(this),
				sectionStyle = _this.closest('.section').attr('style');

			preloadWrapper.html('<img src="img/bg/' + _this.data('bg') + '.jpg">');

			setTimeoutConst = setTimeout(function () {
				sectionStyle = 'background-image: url(img/bg/' + _this.data('bg') + '.jpg);';
				_this.closest('.section').find('.section__bg').eq(1).attr('style', sectionStyle).fadeIn(function () {
					$(this).prev().attr('style', sectionStyle);
					$(this).hide().prev().show();
				});
			}, delay);
		});
		bgBtn.on('mouseleave', function () {
			clearTimeout(setTimeoutConst);
		});
	})();

	//control
	if ($('.js-control').length) {
		var control = $('.js-control'),
			prevBtn,
			nextBtn,
			currentBtn,
			nextDoubleBtn,
			hiddenBtn,
			controlInd = false;

		refreshButtons();
		initNextBtn();
		initNextDoubleBtn();
		initPrevBtn();

		function refreshButtons() {
			prevBtn = control.find($('.js-control-prev'));
			nextBtn = control.find($('.js-control-next'));
			currentBtn = control.find($('.js-control-current'));
			nextDoubleBtn = control.find($('.js-control-next-double'));
			hiddenBtn = control.find($('.js-control-hidden'));
		}

		function initNextBtn() {
			refreshButtons();

			nextBtn.on('click', function (e) {
				e.preventDefault();
				controlInd = true;
				$.fn.pagepiling.moveSectionDown();
				slideNext(nextBtn);
			});
		}

		function slideNext(elNext) {
			prevBtn.unbind();
			nextDoubleBtn.unbind();
			nextBtn.unbind();
			var _this = elNext,
				_thisClass = _this.attr('class');

			_this.attr('class', currentBtn.attr('class'));
			currentBtn.attr('class', prevBtn.attr('class'));
			prevBtn.attr('class', hiddenBtn.attr('class'));
			hiddenBtn.attr('class', nextDoubleBtn.attr('class'));
			nextDoubleBtn.attr('class', _thisClass);

			initNextBtn();
			initNextDoubleBtn();
			initPrevBtn();
		}

		function initPrevBtn() {
			refreshButtons();

			prevBtn.on('click', function (e) {
				e.preventDefault();
				controlInd = true;
				$.fn.pagepiling.moveSectionUp();
				slidePrev(prevBtn);
			});
		}

		function slidePrev(elPrev) {
			prevBtn.unbind();
			nextDoubleBtn.unbind();
			nextBtn.unbind();
			var _this = elPrev,
				_thisClass = _this.attr('class');

			_this.attr('class', currentBtn.attr('class'));
			currentBtn.attr('class', nextBtn.attr('class'));
			nextBtn.attr('class', nextDoubleBtn.attr('class'));
			nextDoubleBtn.attr('class', hiddenBtn.attr('class'));
			hiddenBtn.attr('class', _thisClass);

			initNextBtn();
			initNextDoubleBtn();
			initPrevBtn();
		}

		function initNextDoubleBtn() {
			refreshButtons();

			nextDoubleBtn.on('click', function (e) {
				prevBtn.unbind();
				nextBtn.unbind();
				$(this).unbind();
				e.preventDefault();
				controlInd = true;
				$.fn.pagepiling.moveSectionDown();
				controlInd = true;
				$.fn.pagepiling.moveSectionDown();
				var _this = $(this),
					_thisClass = _this.attr('class');

				_this.attr('class', currentBtn.attr('class'));
				currentBtn.attr('class', hiddenBtn.attr('class'));
				hiddenBtn.attr('class', nextBtn.attr('class'));
				nextBtn.attr('class', prevBtn.attr('class'));
				prevBtn.attr('class', _thisClass);

				initNextBtn();
				initNextDoubleBtn();
				initPrevBtn();
			});
		}

		//fullpage
		(function () {
			$('.js-wrapper').pagepiling({
				menu: null,
				direction: 'vertical',
				verticalCentered: true,
				sectionsColor: [],
				anchors: [],
				scrollingSpeed: 700,
				easing: 'swing',
				loopBottom: true,
				loopTop: true,
				css3: true,
				navigation: {
					'textColor': '#000',
					'bulletsColor': '#fff',
					'position': 'right'
				},
				normalScrollElements: null,
				normalScrollElementTouchThreshold: 20,
				touchSensitivity: 20,
				keyboardScrolling: true,
				sectionSelector: '.section',
				animateAnchor: false,

				//events
				onLeave: function (index, nextIndex, direction) {
					if ((nextIndex > index || index == 5 && nextIndex == 1)) if (!(index == 1 && nextIndex == 5)) {
						if (!controlInd) {
							slideNext(nextBtn);
						} else {
							controlInd = false;
						}
					} else if (!controlInd) {
						slidePrev(prevBtn);
					} else {
						controlInd = false;
					} else {
						if (!controlInd) {
							slidePrev(prevBtn);
						} else {
							controlInd = false;
						}
					}
				},
				afterLoad: function (anchorLink, index) {
				},
				afterRender: function () {
				}
			});
		})();
	}

	//Room Page
	(function () {
		var requestBtn = $('.js-room-request'),
			requestShow = $('.js-room-request-show');

		requestBtn.on('click', function (e) {
			e.preventDefault();
			$(this).siblings().filter(requestShow).slideToggle();
		});

	})();

});