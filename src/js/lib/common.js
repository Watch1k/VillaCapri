/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();

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
			},
			afterLoad: function (anchorLink, index) {
			},
			afterRender: function () {
			}
		});
	})();

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

	(function () {
		var bgBtn = $('.js-bg'),
			delay = 300,
			setTimeoutConst,
			preloadWrapper = $('.js-preload-image');

		bgBtn.on('mouseenter', function () {
			var _this = $(this),
				sectionStyle = _this.closest('.section').attr('style');

			preloadWrapper.attr('style', ' background-image: url(img/bg/' + _this.data('bg') + '.jpg);');

			setTimeoutConst = setTimeout(function () {
				sectionStyle += ' background-image: url(img/bg/' + _this.data('bg') + '.jpg);';
				_this.closest('.section').attr('style', sectionStyle);
			}, delay);
		});
		bgBtn.on('mouseleave', function () {
			clearTimeout(setTimeoutConst);
		});
	})();

	initSlider($('.js-slider'));

	function initSlider(slider) {

		slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			prevArrow: '<button type="button" class="slick-prev"><div class="icon icon-slick-prev"></div></button>',
			nextArrow: '<button type="button" class="slick-next"><div class="icon icon-slick-next"></div></button>'
		});
	}

});