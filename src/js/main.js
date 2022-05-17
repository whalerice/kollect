(() => {
	const goTop = document.querySelector('#goTop');
	let yOffset;
	let winW;
	let utillityimgPos1;
	let utillityimgPos2;
	let utillityimgPos3;

	// function move() {
	// 	let i = 0;
	// 	if (i == 0) {
	// 		i = 1;
	// 		let elem = document.querySelector('#main-line');
	// 		let width = 1;
	// 		let id = setInterval(frame, 10);
	// 		function frame() {
	// 			if (width >= 100) {
	// 				clearInterval(id);
	// 				i = 0;
	// 				// ani.playSegments([0, 24]);
	// 				ani.play();
	// 				ani.playSegments([30,100]);
	// 			} else {
	// 				width++;
	// 				elem.style.width = width + "%";
	// 			}
	// 		}
	// 	}
	// }

	function plays (video,canvas) {
		const sourcevideo = document.getElementById(video);
		const outputcanvas = document.getElementById(canvas);
		const canvasctx = outputcanvas.getContext("2d");

		function initCanvas() {
			outputcanvas.width = sourcevideo.videoWidth;
			outputcanvas.height = sourcevideo.videoHeight;
			drawVideo();
		}

		function drawVideo() {
			canvasctx.drawImage(
				sourcevideo,
				0,
				0,
				outputcanvas.width,
				outputcanvas.height
			);
			requestAnimationFrame(drawVideo);
		}

		sourcevideo.addEventListener("loadeddata", initCanvas);
	}


	$('.main-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
	});

	// plays('sourcevideo','outputcanvas');
	// plays('sourcevideo2','outputcanvas2');

	let ani = lottie.loadAnimation({
		container: document.getElementById('lottie'),
		renderer: 'svg',
		loop: true,
		autoplay: false,
		// path: 'https://assets3.lottiefiles.com/packages/lf20_0uqjzch2.json'
		path: '/images/slider/data_2.json'
	});
	let ani2 = lottie.loadAnimation({
		container: document.getElementById('lottie2'),
		renderer: 'svg',
		loop: true,
		autoplay: false,
		// path: 'https://assets5.lottiefiles.com/packages/lf20_e6pyivz1.json'
		path: '/images/slider/data_3.json'
	});
	// ani.setDirection(-1)
	// ani2.setDirection(-1)

	$('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

		// ani.goToAndPlay(1, true)
		// ani.goToAndStop(5, true)
		currentSlide === 0 ? ani2.play() : ani2.stop();
		currentSlide === 1 ? ani.play() : ani.stop();

		// currentSlide === 0 ? ani2.play() : ani2.stop();
		// currentSlide === 1 ? move() : ani.stop();

		// document.querySelector('#sourcevideo').played()
	});

	function navToggle(e) {
		if (e === true) $('#sidebar').addClass('active')
		else $('#sidebar').removeClass('active')
	}

	function goTopPos() {
		if (yOffset > 300) {
			goTop.classList.add('on');
		}
		else {
			goTop.classList.remove('on')
		}
	}
	const sideNavLink = $('.side-nav-link');

	goTop.addEventListener('click', () => {
		sideNavLink.removeClass('active');
		window.scroll({
			behavior: "smooth",
			left:0,
			top:0
		})
	})

	$('.btn-menu').click( function() {
		navToggle(true)
	} );
	$('.btn-close').click( function() {
		navToggle(false)
	});

	for (let i = 0; sideNavLink.length > i; i++) {
		sideNavLink.eq(i).click(function(e) {
			navToggle(false);
			sideNavLink.removeClass('active');
			$(e.currentTarget).addClass('active')
			// $('.side-nav-link').eq(i).addClass('active')
		})
	}
	const teamItem = document.querySelectorAll('.team-item');
	const teamItemBox = document.querySelectorAll('.team-item .box');
	const teamItemButton = document.querySelectorAll('.team-item button');

	for (let i = 0; teamItem.length > i; i++) {
		teamItemButton[i].addEventListener('click', (e) =>{
			teamItemBox.forEach(e =>{
				e.classList.remove('active');
			})
			teamItemBox[i].classList.add('active')
		})
		teamItemBox[i].addEventListener('click', (e) =>{
			teamItemBox[i].classList.remove('active');
		})
	}

	const counterUp = window.counterUp.default;
	const callback = entries => {
		entries.forEach( entry => {
			const el = entry.target
			if ( entry.isIntersecting && ! el.classList.contains('is-visible' )) {
				counterUp( el, {
					duration: 2000,
					delay: 16,
				} )
				el.classList.add('is-visible')
			}
		} )
	}

	const IO = new IntersectionObserver(callback, { threshold: 1 });

	const el1 = document.querySelector('#counter-1');
	const el2 = document.querySelector('#counter-2');
	const el3 = document.querySelector('#counter-3');
	IO.observe(el1)
	IO.observe(el2)
	IO.observe(el3)

	function calcValues(values, currentYOffset) {
		let rv;
		// 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = cardsBoxPc.height();
		const scrollRatio = yOffset / scrollHeight;

		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;



			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}

	// const cards-box-pc
	const cardsBoxPc = $('.cards-box-pc');
	const nftSymbol = $('#nftSymbol');
	const groups1 = $('#groups1');
	const groups2 = $('#groups2');
	const groups3 = $('#groups3');
	const groups4 = $('#groups4');

	const cardA1 = $('#cardA1');
	const cardA2 = $('#cardA2');
	const cardA3 = $('#cardA3');

	const cardB1 = $('#cardB1');
	const cardB2 = $('#cardB2');
	const cardB3 = $('#cardB3');

	const cardC1 = $('#cardC1');
	const cardC2 = $('#cardC2');
	const cardC3 = $('#cardC3');

	const cardD1 = $('#cardD1');

	function cardEvent() {
		let ratio = yOffset / cardsBoxPc.height();
		// console.log(ratio)
		if (ratio > 1.7) {
			let val = calcValues([1190, 1, { start: 1.7, end: 1.9 }], yOffset);
			groups2.css('transform',`matrix(1, 0, 0, 1, ${val}, 0)`)
		}
		if (ratio > 1.6) {
			let val1 = calcValues([-600, 0, { start: 1.6, end: 1.7 }], yOffset);
			let val2 = calcValues([-1000, 1, { start: 1.7, end: 1.8 }], yOffset);
			let val3 = calcValues([-900, 1, { start: 1.8, end: 1.9 }], yOffset);
			cardA1.css({'transform': `matrix(1, 0, 0, 1, 0, ${val1})`,'opacity': 1});
			cardA2.css({'transform': `matrix(1, 0, 0, 1, 0, ${val2})`,'opacity': 1});
			cardA3.css({'transform': `matrix(1, 0, 0, 1, 0, ${val3})`,'opacity': 1});
		}
		if (ratio > 1.9) {
			let val = calcValues([-680, 1, { start: 1.9, end: 2.1 }], yOffset);
			groups1.css('transform',`matrix(1, 0, 0, 1, ${val}, 0)`)
		}
		if (ratio > 2.2) {
			let val1 = calcValues([1500, 0, { start: 2.2, end: 2.3 }], yOffset);
			let val2 = calcValues([1500, 0, { start: 2.3, end: 2.4 }], yOffset);
			let val3 = calcValues([1500, 0, { start: 2.4, end: 2.5 }], yOffset);
			cardB1.css({'transform': `matrix(1, 0, 0, 1, ${val1}, 0)`});
			cardB2.css({'transform': `matrix(1, 0, 0, 1, ${val2}, 0)`});
			cardB3.css({'transform': `matrix(1, 0, 0, 1, ${val3}, 0)`});
			let val4 = calcValues([-1500, 0, { start: 2.2, end: 2.3 }], yOffset);
			let val5 = calcValues([-1500, 0, { start: 2.3, end: 2.4 }], yOffset);
			let val6 = calcValues([-1500, 0, { start: 2.4, end: 2.5 }], yOffset);
			cardC1.css({'transform': `matrix(1, 0, 0, 1, ${val4}, 0)`});
			cardC2.css({'transform': `matrix(1, 0, 0, 1, ${val5}, 0)`});
			cardC3.css({'transform': `matrix(1, 0, 0, 1, ${val6}, 0)`});
			let val7 = calcValues([100, 0, { start: 2.4, end: 2.5 }], yOffset);
			cardD1.css({'transform': `matrix(1, 0, 0, 1, 0, ${val7})`,'opacity':1});
		}
		if (ratio > 2.3) {
			let val = calcValues([680, 1, { start: 2.3, end: 2.4 }], yOffset);
			groups4.css('transform',`matrix(1, 0, 0, 1, ${val}, 0)`)
		}
		if (ratio > 2.34) {
			let val = calcValues([2, 1, { start: 2.34, end: 2.5 }], yOffset);
			nftSymbol.css('transform',`matrix(${val}, 0, 0, ${val}, 0, 0)`)
		}
		if (ratio > 2.4) {

		}
		if (ratio > 2.5) {
			let val = calcValues([-680, 1, { start: 2.5, end: 2.6 }], yOffset);
			groups3.css('transform',`matrix(1, 0, 0, 1, ${val}, 0)`)
		}
	}
	plays('sourcevideo','outputcanvas');
	plays('sourcevideo2','outputcanvas2');
	window.addEventListener('resize', () =>{
		// lottie.resize();
		if (winW < 992) {
			ani.play();
		}
		else {
			ani2.stop();
			// plays('sourcevideo','outputcanvas');
			// plays('sourcevideo2','outputcanvas2');
		}
	})
	window.addEventListener("load", () => {
		document.body.classList.remove('before-load');
		// move();
		winW = window.innerWidth;

		if (winW < 992) {
			ani.play();
		}
		else {
			ani2.stop();
			// plays('sourcevideo','outputcanvas');
			// plays('sourcevideo2','outputcanvas2');
		}

		utillityimgPos1 = $('#utillityimgPos1').offset().top;
		utillityimgPos2 = $('#utillityimgPos2').offset().top;
		utillityimgPos3 = $('#utillityimgPos3').offset().top;

		nftSymbol.css('transform',`matrix(1.8, 0, 0, 1.8, 0, 0)`);
		groups1.css('transform',`matrix(1, 0, 0, 1, -680, 0)`);
		groups2.css('transform',`matrix(1, 0, 0, 1, 1190, 0)`);
		groups3.css('transform',`matrix(1, 0, 0, 1, -680, 0)`);
		groups4.css('transform',`matrix(1, 0, 0, 1, 680, 0)`);

		cardA1.css({'transform': `matrix(1, 0, 0, 1, 0, -600)`,'opacity': 0});
		cardA2.css({'transform': `matrix(1, 0, 0, 1, 0, -900)`,'opacity': 0});
		cardA3.css({'transform': `matrix(1, 0, 0, 1, 0, -900)`,'opacity': 0});

		cardB1.css({'transform': `matrix(1, 0, 0, 1, 1500, 0)`});
		cardB2.css({'transform': `matrix(1, 0, 0, 1, 1500, 0)`});
		cardB3.css({'transform': `matrix(1, 0, 0, 1, 1500, 0)`});

		cardC1.css({'transform': `matrix(1, 0, 0, 1, -1500, 0)`});
		cardC2.css({'transform': `matrix(1, 0, 0, 1, -1500, 0)`});
		cardC3.css({'transform': `matrix(1, 0, 0, 1, -1500, 0)`});

		cardD1.css({'transform': `matrix(1, 0, 0, 1, 0, 100)`,'opacity':0});
	});
	window.addEventListener("scroll", () => {
		yOffset	= window.pageYOffset;
		winW = window.innerWidth;
		utillityimgPos1 = $('#utillityimgPos1').offset().top;
		utillityimgPos2 = $('#utillityimgPos2').offset().top;
		utillityimgPos3 = $('#utillityimgPos3').offset().top;

		goTopPos();

		if (winW < 959) {
			if (yOffset > utillityimgPos1) {
				$('.utillity .img-1').addClass('on');
				$('.utillity .img-2').addClass('on');
			}
			else {
				$('.utillity .img-1').removeClass('on');
				$('.utillity .img-2').removeClass('on');
			}
			if (yOffset > utillityimgPos2) {
				$('.utillity .ico-round').addClass('on');
			}
			else {
				$('.utillity .ico-round').removeClass('on');
			}
		}
		else {
			if (yOffset > utillityimgPos3) {
				$('.utillity .img-1').addClass('on');
				$('.utillity .img-2').addClass('on');
				$('.utillity .ico-round').addClass('on');
			}
			else {
				$('.utillity .img-1').removeClass('on');
				$('.utillity .img-2').removeClass('on');
				$('.utillity .ico-round').removeClass('on');
			}
			//currentYOffset / scrollHeight
			cardEvent();
		}
	});
})();