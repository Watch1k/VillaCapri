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
			onLeave: function(index, nextIndex, direction){},
			afterLoad: function(anchorLink, index){},
			afterRender: function(){}
		});
	})();

	(function () {
		var hamburger = $('.js-hamburger'),
			phone = $('.js-phone'),
			aside = $('.js-aside'),
			navigation = $('.js-navigation');

		hamburger.on('click', function () {
			$(this).toggleClass('is-active');
			phone.toggleClass('is-active');
			aside.fadeToggle().css('display', 'flex');
			navigation.fadeToggle().css('display', 'flex').toggleClass('is-active');
		});
	})();

});