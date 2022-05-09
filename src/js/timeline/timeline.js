(function ($) {
	$(function () {
		$(window).on("scroll", function () {
			fnOnScroll();
		});

		$(window).on("resize", function () {
			fnOnResize();
		});

		const timelineArea = $(".timeline-area");
		let timelineMain = $(".black-main-timeline");
		const timelineProgress = $(".progress-timeline");
		const timelineItem = $(".timeline-item");
		const timelineItemList = $(".timeline-item-list");
		const timelinePoint = $(".timeline-circle-box");
		let outerHeight = $(window).outerHeight();
		console.log(outerHeight);
		let height = $(window).height();
		console.log(height);
		let initial = -1;
		let fullScroll = false;

		function fnOnScroll() {
			posY = $(window).scrollTop(); // cf. 선택한 요소의 스크롤바 수직 위치를 반환하는 메서드

			fnUpdateFrame();
		}

		function fnOnResize() {
			posY = $(window).scrollTop();
			height = $(window).height();

			fnUpdateFrame();
		}

		function fnUpdateWindow() {
			timelineMain.each((index, mainline) => {
				fullScroll = false;
				$(mainline).css({
					top:
						$(timelineItemList[index])
							.children()
							.first()
							.find(timelinePoint)
							.offset().top -
						$(timelineItemList[index]).children().first().offset().top,
					bottom:
						$(timelineArea[index]).offset().top +
						$(timelineArea[index]).outerHeight() -
						$(timelineItemList[index])
							.children()
							.last()
							.find(timelinePoint)
							.offset().top,
				});

				initial !== posY && (fnUpdateProgress(index), (initial = posY));
				initial = -1;
			});
		}

		function fnUpdateProgress(index) {
			let top = $(timelineItemList[index])
				.children()
				.last()
				.find(timelinePoint)
				.offset().top;

			i = top + posY - $(window).scrollTop();
			a =
				$(timelineProgress[index]).offset().top + posY - $(window).scrollTop();
			n = posY - a + outerHeight / 2;
			i <= posY + outerHeight / 2 && (n = i - a);
			$(timelineProgress[index]).css({ height: n + "px" });

			// circle change
			timelineItem.each(function () {
				var top = $(this).find(timelinePoint).offset().top;

				top + posY - $(window).scrollTop() < posY + 0.5 * outerHeight
					? $(this).addClass("js-ag-active")
					: $(this).removeClass("js-ag-active");
			});
		}

		function fnUpdateFrame() {
			fullScroll || requestAnimationFrame(fnUpdateWindow);
			fullScroll = true;
		}
	});
})(jQuery);


// (function ($) {
//   $(function () {
//
//
//     $(window).on('scroll', function () {
//       fnOnScroll();
//     });
//
//     $(window).on('resize', function () {
//       fnOnResize();
//     });
//
//
//     var agTimeline = $('.js-timeline'),
//       agTimelineLine = $('.js-timeline_line'),
//       agTimelineLineProgress = $('.js-timeline_line-progress'),
//       agTimelinePoint = $('.js-timeline-card_point-box'),
//       agTimelineItem = $('.js-timeline_item'),
//       agOuterHeight = $(window).outerHeight(),
//       agHeight = $(window).height(),
//       f = -1,
//       agFlag = false;
//
//     function fnOnScroll() {
//       agPosY = $(window).scrollTop();
//
//       fnUpdateFrame();
//     }
//
//     function fnOnResize() {
//       agPosY = $(window).scrollTop();
//       agHeight = $(window).height();
//
//       fnUpdateFrame();
//     }
//
//     function fnUpdateWindow() {
//       agFlag = false;
//
//       agTimelineLine.css({
//         top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
//         bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
//       });
//
//       f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
//     }
//
//     function fnUpdateProgress() {
//       var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
//
//       i = agTop + agPosY - $(window).scrollTop();
//       a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
//       n = agPosY - a + agOuterHeight / 2;
//       i <= agPosY + agOuterHeight / 2 && (n = i - a);
//       agTimelineLineProgress.css({height: n + "px"});
//
//       agTimelineItem.each(function () {
//         var agTop = $(this).find(agTimelinePoint).offset().top;
//
//         (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
//       })
//     }
//
//     function fnUpdateFrame() {
//       agFlag || requestAnimationFrame(fnUpdateWindow);
//       agFlag = true;
//     }
//
//
//   });
// })(jQuery);
