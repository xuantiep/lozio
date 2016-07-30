function slide() {
	$('.slider div:last-child').fadeOut(1000, function () {
		$('.slider').prepend($('.slider div:last-child'));
		$('.slider > div ').show();
	});
}
function gallerynext() {
	$('.gallery_images > div').append($('.gallery_images > div a:nth-child(1)'));
}
function galleryprev() {
	$('.gallery_images > div').prepend($('.gallery_images > div a:nth-child(5)'));
}
function quoterandom() {
	$('.textrow .quote:first-child').each(function() {
	    $(this).parent().prepend($(this).parent().find('.quote:eq('+Math.floor((Math.random() * $(this).parent().find('.quote').length))+')'));
	});
}

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) { 
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue=unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}
function set_cookie(what){
    document.cookie="splashshown="+what
}
function iOSversion(useragent) {
  if (/iP(hone|od|ad|od Touch)/.test(useragent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  return false;
}
$(window).on('orientationchange', function(e) {
	window.location.reload();
});

$(window).resize(function(){
	if($(window).height()>$('#wrapall').height()) {
		$('#wrapall').css('height',$(window).height()+'px');
		$('footer').css('position','absolute');
		$('footer').css('bottom','0');
		$('footer').css('width','100%');
	} else {
		$('footer').css('position','static');
		$('footer').css('bottom','auto');
		$('footer').css('width','auto');
	}
});

$( document ).ready(function() {
	if($(window).height()<500) {
		$('body').addClass('low_height');
	}

	var useragent = navigator.userAgent;
	//check for old stock Android browser
	//to remove position fixed and background attachment fixed
	if(	(useragent.indexOf("Mozilla/5.0") > -1) &&
		(useragent.indexOf("Android") > -1) &&
		(useragent.indexOf("Chrome") == -1)
	) {
		$('body').addClass('old_Android');
		alert('old_Android');
	}

	//check for Android
	//to remove animation
	if(useragent.indexOf("Android") > -1) $('body').addClass('Android');

	//check for old iOS version 
	//to remove position fixed
	var iOS_version = iOSversion(useragent);
	if(iOS_version[0]<5) $('body').addClass('old_iOS');
	if(iOS_version[0]>6) $('body').addClass('new_iOS');

	//check for iOS 
	//to remove background attachment fixed and animation
	var iOS = /(iPad|iPhone|iPod)/g.test(useragent);
	if(iOS) $('body').addClass('iOS');

	//detect browser with Touch Events running on touch-capable device
	if ('ontouchstart' in window) {
	     $('body').addClass('touch');
	}

	//show splash if modern device/browser
	if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
		if (get_cookie("splashshown")=="") $('#splash').show();
	}
	$('#nonsplash').show();
	set_cookie('true');

    if(window.location.hash) {
    	var hash = window.location.hash.substring(1);
    	if(hash) {
	    	var offset = $('#'+hash).offset();
	    	var scrollto = (offset.top-$( ".navbar-default" ).height()); 
			setTimeout(function() {
				window.scrollTo(0, scrollto);
			}, 1);
		}
    }
    $( window ).scroll(function() {

      if($('body').hasClass('old_Android') && $('body').hasClass('old_iOS')) {
			$( ".navbar-default" ).removeClass('attop');
	  }

	  if($(window).scrollTop()) $( ".arrow" ).hide(  );
	  else if(!$('body').hasClass('touch')) $( ".arrow" ).show( );
	});
	
	//make anchor tags scroll
	$('.navbar a').click(function(){
		if($('body').hasClass('home') && $(this).attr('href')) {
			el = $.attr(this, 'href').replace('/','');
		    $('html, body').animate({
		        scrollTop: ($( el ).offset().top - 132)
		    }, 500);
		    if($('.navmenu.offcanvas').hasClass('in')) $('.navbar-toggle').click();
		    return false;
		}
		else if (!$('body').hasClass('home')) {
			if($(this).attr('href').charAt(0)!='/' && $(this).attr('href').charAt(0)=='#') $(this).attr('href', '/'+$(this).attr('href'));
		}
	});

	
	$('#splash').click(function() {
		$(this).hide();
	})
	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		//no animation
		$('#splash').delay(1500).hide();
		$('#review').css('visibility','visible'); 
	}
	else {
		//animation
		$('#splash').delay(1500).fadeOut();
	    $('#review').css('left', '-'+$('#review').width()+'px');
    	$('#review').css('visibility','visible'); 
		$('#review').animate({"left": '+='+$('#review').width()},1500);
	}
	
	$('input[name=contact-type]:radio').change(function () {
		if($('input[name=contact-type]:checked').val() == 'vraag') {
			$('#vraagdiv').show();
			$('#vraagdiv input.required, #vraagdiv textarea.required').attr("required", true);
			$('#afspraakdiv').hide();
			$('#afspraakdiv input, #afspraakdiv textarea').removeAttr('required');
		}
		if($('input[name=contact-type]:checked').val() == 'afspraak') {
			$('#vraagdiv').hide();
			$('#vraagdiv input, #vraagdiv textarea').removeAttr('required');
			$('#afspraakdiv').show();
			$('#afspraakdiv input.required, #afspraakdiv textarea.required').attr("required", true);
		}
	});

	$('.behandelingen td.text-center').each(function () {
            $(this).html($(this).html().replace('€ ', '€&nbsp;'));
            $(this).html($(this).html().replace('.', ','));
			$(this).html($(this).html().replace('n,v.t.', 'n.v.t.'));
    });

	$('#expandbutton').click(function() {
		$('.expand1').show(); 
		$('#expand1').hide();
	})

	$("#contact_form input[type='submit']").click(function(event) {
        $('#contact_form [required]').each(function() {
        	if(!$(this).val()) {
        		$(this).addClass('error');
        		event.preventDefault();
        	}
        }); 
    });
    /* SCROLLSPY NAVBAR */
    $('#navbar').on('activate.bs.scrollspy', function (e) {
        $pageTitle = $(e.target).children("a").text();
        $pagehref = $(e.target).children("a").attr('href').replace("#","").replace("/","");
        if( $("#header").attr('class') != $pagehref){
            $('.navbar li a').blur();
            $("#header").removeClass().addClass($pagehref);
        }
        function delayupdate(){
            history.pushState({}, $pageTitle , '#'+$pagehref)
        };
        setTimeout(delayupdate,500)
    });

    setInterval(function(){ slide(); }, 6000);
    quoterandom();
    $(window).resize();
});
