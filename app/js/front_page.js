'use strict';
 

$(function() { 

	// Projects hover
	var videoTimeout;
	function projectsListHover(){
		var listItem = $('.projects-list > li'), 
			header = $('.main-header'),
			previewItem = $('.projects-preview-fixed-container > li'),
			sectionWrapper = $('.projects-section'),
			modalTimeout;

		// Hover
		listItem.hover(function() {
			var thisItem = $(this),
				thisIndex = thisItem.index();

			clearTimeout(videoTimeout); 
			header.addClass('hidden');
			sectionWrapper.addClass('hovered_item');
			thisItem.addClass('hovered');
			previewItem.eq(thisIndex).addClass('visible');
			if ( previewItem.eq(thisIndex).find('video').length > 0 ){
				previewItem.eq(thisIndex).find('video').get(0).play();
			}
		}, function() {
			var thisItem = $(this),
			thisIndex = thisItem.index(); 

			clearTimeout(videoTimeout);
			header.removeClass('hidden');
			sectionWrapper.removeClass('hovered_item');
			thisItem.removeClass('hovered');
			previewItem.removeClass('visible');
			if ( previewItem.eq(thisIndex).find('video').length > 0 ){
				videoTimeout = setTimeout(function(){
					previewItem.eq(thisIndex).find('video').get(0).pause();
				}, 1000);
			}
		});
	};

	if ( $(window).width() > 1000 ){ 
		projectsListHover();
	} else {
		$('#video-banner').remove(); 
	}

});