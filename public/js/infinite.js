jQuery(document).ready(function($){
/*-------------------------------------------------*/
/* = infinite scroll
/*-------------------------------------------------*/

	/*-------------------------------------------------*/
	/* =  next secret - prev secret
	/*-------------------------------------------------*/

	$('.scroll-more a.next-secret').on('click', function(e){
		e.preventDefault();
		var boxHeight = $('.secret-box').height(),
			firstoffset = $('.secret-box:eq(0)').offset().top,
			secondoffset = $('.secret-box:eq(1)').offset().top,
			diff_of_secrets = secondoffset - firstoffset - boxHeight;

		$('#content').animate({
         scrollTop: $("#content").scrollTop() + boxHeight + diff_of_secrets
     }, 'slow');
	});

	$('.scroll-more a.prev-secret').on('click', function(e){
		e.preventDefault();
		var boxHeight = $('.secret-box').height(),
			firstoffset = $('.secret-box:eq(0)').offset().top,
			secondoffset = $('.secret-box:eq(1)').offset().top,
			diff_of_secrets = secondoffset - firstoffset - boxHeight;

		$('#content').animate({
         scrollTop: $("#content").scrollTop() - boxHeight - diff_of_secrets
     }, 'slow');
	});


/*-------------------------------------------------*/
/* = infinite scroll
/*-------------------------------------------------*/
	var i = 0,
	loader = $("<div class='loader'><img alt='' src='img/loader.gif'/></div>");

	$('#content').scroll(function(){

	$('.scroll-more').css('display', 'block').fadeIn(400);
	loader.appendTo('#container');
	scrollmore();
	var boxHeight = $('.secret-box').height(),
	newBox = $("<div class='newelem'></div>"),
	totalHeight = $('.inner-content').height(),
	contentSpaceScroll = ($('#content').innerHeight()+$('#content').scrollTop());

	if(contentSpaceScroll > totalHeight - 1) {

	var foo = $("<div class='inonative'></div>");

	foo.load(config.load_page+" div.secret-box", null, function(){

	foo.find('div.secret-box')
	.slice(i*10,i*10+10)
	.addClass('inon');

	foo.find('.inon')
	.appendTo('.inner-content');

	loader.css('display', 'block').fadeOut(400);

	var y=$('.inner-box').height()/2;
	$('.inner-box').css('margin-top', ($('.secret-box').height()/2)-y);

	$('#content').getNiceScroll().resize();
	i++;

	});

	}

	});


});

function scrollmore(){
	var boxHeight = $('.secret-box').height(),
	totalHeight = $('.inner-content').height(),
	contentSpaceScroll = ($('#content').innerHeight()+$('#content').scrollTop());

	if (contentSpaceScroll > totalHeight) {
		$('.scroll-more').find('h2').text('No more secrets');
		$('.scroll-more').find('img').css('visibility', 'hidden');
	}
	else if (contentSpaceScroll < (totalHeight - boxHeight)) {
		$('.scroll-more').find('h2').text('scroll for more');
		$('.scroll-more').find('img').css('visibility', 'visible');
	}

}