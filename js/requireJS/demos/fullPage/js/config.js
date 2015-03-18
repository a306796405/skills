require.config({
	baseUrl: './js',
	paths: {
		'jquery': 'http://cdn.bootcss.com/jquery/1.11.1/jquery.min',
		'jquery.easings': 'jquery.easings.min',
		'jquery.slimscroll': 'jquery.slimscroll.min',
		'jquery.fullPage': 'jquery.fullPage.min',
		'BaiduMap': 'BaiduMap'
	},
	shim: {
		'jquery.easings': {
			deps: ['jquery']
		},
		'jquery.slimscroll': {
			deps: ['jquery']
		},
		'jquery.fullPage': {
			deps: ['jquery', 'jquery.easings', 'jquery.slimscroll']
		}
	}
});

require(['jquery.fullPage', 'BaiduMap'], function( fullPage, BaiduMap ){

	//FullPage
	$('#stage-wrap').fullpage({
		css3: true,
		onLeave: function( index, nextIndex, direction ){
			if ( direction == 'down' ){
				$('.main').attr('class', 'main step'+nextIndex);
				$('#section-'+nextIndex).addClass('ani');
			}

			if ( direction == 'up' ){
				$('.main').attr('class', 'main step'+(nextIndex)+'_reverse');
				setTimeout( function(){ $('#section-'+index).removeClass('ani'); }, 1000 );
			}

			$('#page').attr('class', 'process_wrap state'+nextIndex);
		}
	});

	//BaidMap
	BaiduMap();

	//Kill IE
	var isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome'),
	    isFireFox = window.navigator.userAgent.toLowerCase().indexOf('firefox');
	if ( isChrome < 0 && isFireFox < 0 ){
		//$('#kill-ie-bg, #kill-ie').show();
	}
});
