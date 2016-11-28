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

	//navigation
	(function () {
		var hamburger = $('.js-hamburger'),
			phone = $('.js-phone'),
			aside = $('.js-aside'),
			geoBtn = $('.js-geo'),
			navigation = $('.js-navigation'),
			navigation2 = $('.js-navigation2');

		hamburger.on('click', function () {
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
					if (((nextIndex > index) || (index == 5 && nextIndex == 1)) && !((index == 1) && (nextIndex == 5))) {
						if (!controlInd) {
							slideNext(nextBtn);
						} else {
							controlInd = false;
						}
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

});