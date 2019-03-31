

		$(window).scroll(function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var backTop=$("#introduce").offset().top-$(window).height()/2;
		console.log(backTop);
		if (scrollTop>backTop) {
			$(".a1").addClass("animated bounceInRight show").removeClass("fade");
			$(".a2").addClass("animated bounceInDown show").removeClass("fade");
			$(".a3").addClass("animated bounceInLeft show").removeClass("fade");
		}
	});

