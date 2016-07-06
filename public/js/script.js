var $ = jQuery.noConflict();

// catch the "ctrl" combination keydown
$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });
};

$(document).ready(function($) {
	 //Submit button with link
	 var byName = $.getUrlVar('submit');
	 if(byName === 'submit'){
	 	$('.inner-box').css('visibility', 'hidden');
		$('#comments').focus();
		$('.scroll-more').css('visibility', 'hidden');
		$('img.scroll-more').css('visibility', 'hidden');
	 	$('#share-story').trigger('click');
	 }


	 //Privacy

	 var byName = $.getUrlVar('privacy');
	 if(byName === 'privacy'){
	 	$('.inner-box').css('visibility', 'hidden');
		$('#comments').focus();
		$('.scroll-more').css('visibility', 'hidden');
		$('img.scroll-more').css('visibility', 'hidden');
	 	$('#privacy').trigger('click');
	 }

	  //signup
	 var byName = $.getUrlVar('signup');
	 if(byName === 'signup'){

	 	$('#sign-up').trigger('click');
	 }

	/*-------------------------------------------------*/
	/* = Copy-text after submit
	/*-------------------------------------------------*/

	/*	$('#copy-text').on('click', function(e){
			e.preventDefault();
			//window.prompt('Press ctrl/cmd+c to copy text', $(this).parent("h3").children("p").text());
		});
	*/
	$('a#copy-text').zclip({
	        path: 'js/ZeroClipboard.swf',
	        copy: function(){
	        	var $this = $(this);
	        	return $this.parent('h3').children('p').text();
	        }
    });
	/*-------------------------------------------------*/
	/* =  slider
	/*-------------------------------------------------*/

	/*-------------------------------------------------*/
	/* =  content position
	/*-------------------------------------------------*/

	var y=$('.inner-box').height()/2;
	$('.inner-box').css('margin-top', ($('.secret-box').height()/2)-y);
	$(window).resize(function(){
		var y=$('.inner-box').height()/2;
		$('.inner-box').css('margin-top', ($('.secret-box').height()/2)-y);
	});



	/*-------------------------------------------------*/
	/* =  reveal-hide content and show pop-up
	/*-------------------------------------------------*/

	$('#privacy, #about-us, #share-story, #share, #go-sign-up').live('click', function(){
		$('.inner-box').css('visibility', 'hidden');
		$('.scroll-more').css('visibility', 'hidden');
		$('#supersized, header').css('opacity', 0.6);
	});

	$('body').bind('click', function (e) {
		$('.inner-box').css('visibility', 'visible');
		$('.scroll-more').css('visibility', 'visible');
		$('#supersized, header').css('opacity', 1);
	});

	$('.privacy, #comments, .modal-response, .dropdown').bind('click', function(e) {
	e.stopPropagation();
	}); 




	/*-------------------------------------------------*/
	/* =  reveal-hide content and show pop-up
	/*-------------------------------------------------*/

	$('#privacy, #about-us, #share-story').live('click', function(){
		$('.inner-box').css('visibility', 'hidden');
		$('#comments').focus();
		$('.scroll-more').css('visibility', 'hidden');
		$('img.scroll-more').css('visibility', 'hidden');
	});

	$('body, .close-reveal-modal').bind('click', function (e) {
		$('.inner-box').css('visibility', 'visible');
	});

	$('.privacy').bind('click', function(e) {
	    e.stopPropagation();
	});
	/*-------------------------------------------------*/
	/* =  sign-up
	/*-------------------------------------------------*/

	$('#sign-up').live('click', function(e){
		e.preventDefault();
		$('.dropdown').addClass('active');
	});

	$('body').bind('click', function (e) {
		$('.dropdown').removeClass('active');
	});

	$('.dropdown').bind('click', function(e) {
	    e.stopPropagation();
	});

	/*-------------------------------------------------*/
	/* =  text area
	/*-------------------------------------------------*/

/*-------------------------------------------------*/
/* = text area
/*-------------------------------------------------*/

			/*global document:false, $:false */
			var txt = $('#comments'),
			hiddenDiv = $(document.createElement('div')),
			content = null;
			txt.addClass('txtstuff');
			hiddenDiv.addClass('hiddendiv common');

			$('.share-your').append(hiddenDiv);

			txt.on('keyup', function () {

			content = $(this).val();

			content = content.replace(/\n/g, '<br>');
			hiddenDiv.html(content + '<br class="lbr">');

			$(this).css('height', hiddenDiv.height());
			var z = $("#comments").val().length;

			if ( z > 200) {
			$('#share').attr('disabled','disabled');
			$('#share').css('opacity',0.6);
			$('form .counter').css('color', '#ef370c');
			} else {
			$('#share').removeAttr('disabled');
			$('#share').css('opacity',1);
			$('form .counter').css('color', '#71cf32');
			}

			});

		$("#comments").charCount({
			allowed: 200,
			warning: 20,
			counterText: ''
		});

	/*-------------------------------------------------*/
	/* =  modal response
	/*-------------------------------------------------*/

	$('.share').live('click',function(e){
			e.preventDefault();


			var secret_post = $('#comments').val();

			if(secret_post !== ''){
			data = {
				post: secret_post
			}

			$.ajax({
				type: 'POST',
				url: BASE+'/share',
				data: data,
				success: function(response){
					if(response.error == 'ok'){

						$('.modal-response').addClass('active');/**/
						$('.share-your').css('opacity',0);
						$('.share-your textarea').val('');
						$('.inner-box').css('visibility', 'hidden');
						$('.scroll-more').css('visibility', 'hidden');


						//Set Value
						$('.modal-response .up-peace h3 p').text(response.share_url);
					}
				},
				dataType: 'json'
			});
		}else{
			alert('Please fill the box to submit your secret');
		}

	});



	//New Code for signup
	$('#go-sign-up').on('click', function(e){
		e.preventDefault();
		$('.modal-response').removeClass('active');
		$('.reveal-modal-bg').trigger('click');
		$('.dropdown').addClass('active');
		});

		$('#share-another').on('click', function(e){
		e.preventDefault();
		$('.modal-response').removeClass('active');
		$('.share-your').css('opacity',1);
		$('.share-your textarea').val('');
	});

	$('.modal-response').bind('click', function(e) {
	    e.stopPropagation();
	});



	/*------------------------------------------------*/

	/*= Close button
	/*----------------------------------------------*/

	$('.close-reveal-modal').bind('click', function(){
	$('.inner-box').css('visibility', 'visible');
	$('.scroll-more').css('visibility', 'visible');
	$('#supersized, header').css('opacity', 1);

		});

		$('.modal-response .close-reveal-modal').on('click', function(){
			$('.modal-response').removeClass('active');

		});

	/*-------------------------------------------------*/
	/* =  Subscribe
	/*-------------------------------------------------*/

	$('.dropdown #submit').on('click', function(e){
		var $this = $(this),
		    emailRegex = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$',
			mail  = $this.parent().find('#mail').val();

			if(IsValidEmail(mail) && mail !== ''){
				jQuery.ajax({
					type: 'POST',
					url: BASE+'/subscribe',
					data: {email: mail},
					success: function(response){
						if(response.error == 'ok'){

							$("<div class='signup'>"+response.message+"</div>").appendTo('.dropdown');
							//$('.dropdown').removeClass('active');
						}
					},
					dataType: 'json'
				});
			}else{

				alert('Invalid address');

			}

		return false;
	});

	$('.submit-email').on('click', function(e){
		var $this = $(this),
		    emailRegex = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$',
			mail  = $this.parent().find('#email').val();

			if(IsValidEmail(mail) && mail !== ''){
				jQuery.ajax({
					type: 'POST',
					url: BASE+'/subscribe',
					data: {email: mail},
					success: function(response){
						if(response.error == 'ok'){
							alert(response.message);
							//$("<div class='signup'>"+response.message+"</div>").appendTo('.dropdown');
							//$('.dropdown').removeClass('active');
						}
					},
					dataType: 'json'
				});
			}else{

				alert('Invalid address');

			}

		return false;
	});


	//Commenting
	/*$('.comment-number').live('click', function(e){
		e.preventDefault();
		$(this).css('display', 'none');
		var $this = $(this).parent('.comment-section');
		$this.children('.comment-section ul, .comment-section a.view-all, .comment-section a.daily-secret').addClass('active');

		$this.css('padding-bottom', '5px');
	});*/

	$('.view-all').live('click', function(e){
		e.preventDefault();
		$(this).fadeOut(1);
		var $this = $(this).parent('.comment-section');
		$this.children('.comment-section ul').addClass('wide');
	});

	/*$('.comment').live('focus', function(e){
		e.preventDefault();
		if($(this).val() !== '' ){
			$(this).parent().find('.press-enter').animate({'opacity': 1});
		}
	});*/

	$('.comment-section a.daily-secret').live('click', function(e){
		e.preventDefault();
		$('.dropdown').addClass('active');
	});

	 if($("input.comment").length != 0){
		 var el = $("input.comment").get(0);
	     var elemLen = el.value.length;

		 el.selectionStart = elemLen + 3;
		 el.selectionEnd = elemLen + 3;
		 el.focus();
	 }


		 //Commenting
	$('.comment-number').live('click', function(e){
		e.preventDefault();
		//hide reactions
		var number_comment = $(this).data('count'),
	 	$this = $(this).parent('.comment-section'),
	 	id = $(this).closest('.inner-box').find('.secret-content').attr('id');



		if( !$(this).hasClass('active')) {
			$(this).addClass('active').text('Hide Reactions');
			$this.children('.comment-section ul, .sideContent, .message').addClass('active');
			$this.css('padding-bottom', '5px');
		}else{
			$(this).removeClass('active').text(parseInt(number_comment) + ' REACTIONS');
			$this.children('.comment-section ul, .sideContent, .message').removeClass('active');
			$this.css('padding-bottom', 'inherit');
			$this.parents().find('.emai-us').removeClass('active');

			//Scroll to
			var id = $(this).closest('.inner-box').find('.secret-content').attr('id');
			var container = $('#content'),
		    scrollItem = $('#'+id);

			var currentItemGo = scrollItem.offset().top - container.offset().top + container.scrollTop();
			container.animate({
				scrollTop: currentItemGo
			});

		}
	});

});

function IsValidEmail(a){var b=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return b.test(a)}

function CopyToClipboard(text) {
    Copied = text.createTextRange();
    Copied.execCommand("Copy");
}


//Forms enter
function disableForm(formid){
	$(formid).live('submit', function(e){
		return false;
	});
}

function enterForm(formid){
	$(formid).live('submit', function(e){
		e.preventDefault();
		var value = $(this).find('#comment'),
		$this = $(this),
		secret_id = $this.data('secret');
		alert(secret_id);
		//$(this).parents('.inner-box').find('.message').fadeIn(200).find('span').text(value.val());

		$.ajax({
			type: 'POST',
			url: BASE+'/reaction',
			data: {comment: value.val(), id: secret_id},
			success: function(response){
				alert(response.error);
				$this.parents('.inner-box').find('.message').fadeIn(200).find('span.adjective').text(value.val());
				$this.find('#press-enter').animate({'opacity': 0});
				return false;
			},
			dataType: 'json'
		});
	});

}

 $.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[0];
        }
        	return vars;
      },
      getUrlVar: function(name){
		return $.getUrlVars()[name];
      }
 });

function split(val) {
	          return val.split(/,\s*/);
}

function extractLast(term) {
	          return split(term).pop();
}
