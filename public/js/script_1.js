var $ = jQuery.noConflict();

$(document).ready(function($) {
	/*-------------------------------------------------*/
	/* = Copy-text after submit
	/*-------------------------------------------------*/
	$('#copy-text').on('click', function(e){
		e.preventDefault();
		window.prompt('Press ctrl/cmd+c to copy text', $(this).parent("h3").children("p").text());
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

	$('#privacy, #share-story, #share, #go-sign-up').live('click', function(){
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

	$('#privacy, #share-story').live('click', function(){
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

			if ( z > config.secret_char_limit) {
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
			allowed: config.secret_char_limit,
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



	//New Code
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

	/*-------------------------------------------------*/
	/* =  Like
	/*-------------------------------------------------*/

	$('.secret-list #grateful').live('click', function(e){
		e.preventDefault();
		var $this = $(this),
		 	secret_id = $this.attr('rel');

		var like_data = {
							'rate_one' : secret_id,
							'secret_id' : secret_id
						};
		$.ajax({
			type: 'POST',
			url: BASE+'/like',
			data: like_data,
			success: function(response){
				if(response.error == 'ok'){
					
					if($this.hasClass('active')){
						$this.removeClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}else{						
						$this.addClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}
				}else{
					alert('Can not click more.');
				}
			},
			dataType: 'json'
		});
	});
	///////////////////////////////////////////
	$('.secret-list #solidarity').live('click', function(e){
		e.preventDefault();
		var $this = $(this),
			secret_id = $this.attr('rel');
		var like_data = {
							'rate_two' : secret_id,
							'secret_id' : secret_id
						};

		$.ajax({
			type: 'POST',
			url: BASE+'/like',
			data: like_data,
			success: function(response){
				if(response.error == 'ok'){

					if($this.hasClass('active')){
						$this.removeClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}else{						
						$this.addClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}
				}else{
					alert('Can not click more.');
				}
			},
			dataType: 'json'
		});
	});

	///////////////////////////////////////////
	$('.secret-list #heartbreak').live('click', function(e){
		e.preventDefault();
		var $this = $(this),
			secret_id = $this.attr('rel');
		var like_data = {
							'rate_three' : secret_id,
							'secret_id' : secret_id
						};

		$.ajax({
			type: 'POST',
			url: BASE+'/like',
			data: like_data,
			success: function(response){
				if(response.error == 'ok'){
					
					if($this.hasClass('active')){
						$this.removeClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}else{						
						$this.addClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}
				}else{
					alert('Can not click more.');
				}
			},
			dataType: 'json'
		});
	});
	///////////////////////////////////////////
	$('.secret-list #love').live('click', function(e){
		e.preventDefault();
		var $this = $(this),
			secret_id = $this.attr('rel');
		var like_data = {
							'rate_four' : secret_id,
							'secret_id' : secret_id
						};

		$.ajax({
			type: 'POST',
			url: BASE+'/like',
			data: like_data,
			success: function(response){
				if(response.error == 'ok'){
					
					if($this.hasClass('active')){
						$this.removeClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}else{						
						$this.addClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}
				}else{
					alert('Can not click more.');
				}
			},
			dataType: 'json'
		});
	});
	///////////////////////////////////////////
	$('.secret-list #fuck').live('click', function(e){
		e.preventDefault();
		var $this = $(this),
			secret_id = $this.attr('rel');
		var like_data = {
							'rate_five' : secret_id,
							'secret_id' : secret_id
						};

		$.ajax({
			type: 'POST',
			url: BASE+'/like',
			data: like_data,
			success: function(response){
				if(response.error == 'ok'){
					
					if($this.hasClass('active')){
						$this.removeClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}else{						
						$this.addClass('active');
						var inc 	 = $this.find('span');
						var incPlus  = parseInt(inc.text()) + 1;
						inc.text(response.count);
					}
				}else{
					alert('Can not click more.');
				}
			},
			dataType: 'json'
		});
	});

});

function IsValidEmail(a){var b=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return b.test(a)}

function CopyToClipboard(text) {
    Copied = text.createTextRange();
    Copied.execCommand("Copy");
}
