$(function() {
	//nav activation
	$('.nav-toggle').click(function(){
		$('body').toggleClass('nav-active');
	});
	$('#mainNav a').click(function(){
		$('body').removeClass('nav-active');
	});

	//nav scrolling
	$('#mainNav ul:first-child a').click(function(e){
		e.preventDefault();
		$(document).off("scroll");
		$('#mainNav a').each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		var target = this.hash,
		menu = target;
		$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
			}, 600, 'swing', function () {
			$(document).on("scroll", onScroll);
		});
	});

	function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$('#mainNav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('#mainNav a').removeClass("active");
				currLink.addClass("active");
			}
			else{
				currLink.removeClass("active");
			}
		});
	}

	// user selection of side preference
	$('.user-toggle .left').click(function() {
		$('body.ut-active').removeClass('ut-active');
		$('body').addClass('lh');
		$('body .intro').addClass('go');

		$.cookie('set-left', 'yes', {expires: 7});
	})

	$('.user-toggle .right').click(function() {
		$('body.ut-active').removeClass('ut-active');
		$('body').addClass('rh');
		$('body .intro').addClass('go');

		$.cookie('set-right', 'yes', {expires: 7});
	})

	//instafeed
    var feed = new Instafeed({
        get: 'user',
        userId: '1417011340',
        accessToken: '1417011340.1b316b5.ccf65529597441489e972bc6d031cfec',
        sortBy: 'most-liked',
        limit: '12',
        template: '<li><a href="{{link}}" target="_blank"><img src="{{image}}" /></a></li>'
    });
    feed.run();

    //form validation
    $("#contactForm").validator().on("submit", function (event) {
	    if (event.isDefaultPrevented()) {
	        // handle the invalid form...
	        formError();
	        submitMSG(false, "Please fill out the highlighted fields");
	    } else {
	        // everything looks good!
	        event.preventDefault();
	        submitForm();
	    }
	});


	function submitForm(){
	    // Initiate Variables With Form Content
	    var name = $("#name").val();
	    var email = $("#email").val();
	    var message = $("#message").val();

	    $.ajax({
	        type: "POST",
	        url: "php/form-process.php",
	        data: "name=" + name + "&email=" + email + "&message=" + message,
	        success : function(text){
	            if (text == "success"){
	                formSuccess();
	            } else {
	                formError();
	                submitMSG(false,text);
	            }
	        }
	    });
	}

	function formSuccess(){
	    $("#contactForm")[0].reset();
	    submitMSG(true, "Message Submitted!")
	}

	function formError(){
	    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	        $(this).removeClass();
	    });
	}

	function submitMSG(valid, msg){
	    if(valid){
	        var msgClasses = "text-success";
	    } else {
	        var msgClasses = "text-danger";
	    }
	    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

});