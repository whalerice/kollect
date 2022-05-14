(() => {
	const goTop = document.querySelector('#goTop');
	let yOffset;
	let winW;
	let utillityimgPos1;
	let utillityimgPos2;
	let utillityimgPos3;

	$('.main-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		autoplay: false,
		autoplaySpeed: 5000,
	});

	let ani = lottie.loadAnimation({
		container: document.getElementById('lottie'),
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: 'https://assets3.lottiefiles.com/packages/lf20_0uqjzch2.json'
		// path: '/images/slider/data_2.json'
	});

	let ani2 = lottie.loadAnimation({
		container: document.getElementById('lottie2'),
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: 'https://assets5.lottiefiles.com/packages/lf20_e6pyivz1.json'
		// path: '/images/slider/data_3.json'
	});

	ani.play();
	$('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log(currentSlide);
		currentSlide === 0 ? ani2.play() : ani2.stop();
		currentSlide === 1 ? ani.play() : ani.stop();
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

	// setTimeout(()=>{
	// 	let iconSkipForward = document.querySelector('.bodymovinanim');
	//
	// 	let animationSkipForward = bodymovin.loadAnimation({
	// 		container: iconSkipForward,
	// 		renderer: 'svg',
	// 		loop: true,
	// 		autoplay: true,
	// 		path: "https://assets3.lottiefiles.com/packages/lf20_0dkyba8h.json"
	// 	});
	//
	// 	// iconSkipForward.addEventListener('click', function() {
	// 	// 	animationSkipForward.playSegments([0,60], true);
	// 	// });
	// 	// animationSkipForward.playSegments([0,60], false);
	// },100)


	window.addEventListener("load", () => {
		winW = window.innerWidth;
		utillityimgPos1 = $('#utillityimgPos1').offset().top;
		utillityimgPos2 = $('#utillityimgPos2').offset().top;
		utillityimgPos3 = $('#utillityimgPos3').offset().top;
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
		}
	//	ico-round
	});

})();