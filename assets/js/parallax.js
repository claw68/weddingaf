/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

var min_width;
if (Modernizr.mq('(min-width: 0px)')) {
  // Browsers that support media queries
  min_width = function (width) {
    return Modernizr.mq('(min-width: ' + width + 'px)');
  };
}
else {
  // Fallback for browsers that does not support media queries
  min_width = function (width) {
    return $(window).width() >= width;
  };
}

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight, paddingTop) {
		var $this = $(this);
		var getHeight;
		var firstTop;

		//get the starting position of each element to have parallax applied to it
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}

		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		if (arguments.length < 4 || paddingTop === null) paddingTop = 0;

		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				if (min_width(1024)) {
					xpos = "75%";
					paddingTop = "100";
				} else if (min_width(640)) {
					xpos = "280px";
					paddingTop = "100";
				} else {
					xpos = "147px";
					paddingTop = "158";
				}

				$this.css('backgroundPosition', xpos + " " + Math.round(((firstTop - pos) * speedFactor) - paddingTop) + "px");
			});
		}

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);
