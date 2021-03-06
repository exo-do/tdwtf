/* jshint browser: true */
/* globals $, ajaxify, app, socket */
$(window).on('action:ajaxify.contentLoaded', function() {
	if (ajaxify.data && ajaxify.data.cid) {
		$('html').attr('data-category-id', ajaxify.data.cid);
	} else {
		$('html').removeAttr('data-category-id');
	}

	if (app.user && app.user.uid) {
		$('html').attr('data-user-id', app.user.uid);
	} else {
		$('html').removeAttr('data-user-id');
	}

	if (app.user && app.user.isMafiaPlayer) {
		$('html').attr('data-mafia-player', '');
	} else {
		$('html').removeAttr('data-mafia-player');
	}

	if (app.user && app.user.isMafiaPlayerSS) {
		$('html').attr('data-mafia-player-ss', '');
	} else {
		$('html').removeAttr('data-mafia-player-ss');
	}

	if (app.user && app.user.isMafiaClubDed) {
		$('html').attr('data-mafia-club-ded', app.user.isMafiaClubDed);
	} else {
		$('html').removeAttr('data-mafia-club-ded');
	}

	if (app.user && app.user.isMafiaClubDedSS) {
		$('html').attr('data-mafia-club-ded-ss', app.user.isMafiaClubDedSS);
	} else {
		$('html').removeAttr('data-mafia-club-ded-ss');
	}
});

function addClubDedQuoteButton() {
	[{
		data: 'data-mafia-club-ded',
		current: '31/current-game',
		ded: '32/club-ded'

	}, {
		data: 'data-mafia-club-ded-ss',
		current: '45/self-serve-mafia',
		ded: '47/self-serve-club-ded'
	}].forEach(function(mafia) {
		if ($('html').is('[' + mafia.data + ']') &&
				$('.breadcrumb a[href="/category/' + mafia.current + '"]').length &&
				!$('.breadcrumb a[href="/category/' + mafia.ded + '"]').length) {
			$('[component="topic"]').off('click', '[component="post/quote-club-ded"]').on('click', '[component="post/quote-club-ded"]', function() {
				var tid = $('html').attr(mafia.data);
				var p = $(this).parents('[component="post"]');
				var pid = p.attr('data-pid');
				var username = '@' + p.attr('data-username').replace(/\s/g, '-');
				socket.emit('posts.getRawPost', pid, function(err, post) {
					if (err) {
						return app.alertError(err.message);
					}

					$(window).trigger('action:composer.addQuote', {
						tid: tid,
						slug: ajaxify.data.slug,
						pid: pid,
						index: p.attr('data-index'),
						username: username,
						topicName: ajaxify.data.titleRaw,
						text: post
					});

					ajaxify.go('/topic/' + tid);
				});
			});
			$('.post-tools:not(:has([component="post/quote-club-ded"]))').append('<a component="post/quote-club-ded" href="#" class="no-select">Popcorn</a>');
		}
	});
}
$(window).on('action:ajaxify.contentLoaded', addClubDedQuoteButton);
$(window).on('action:posts.loaded', addClubDedQuoteButton);

// fix title thingy
$(window).on('action:ajaxify.end', function() {
	$('[component="navbar/title"] span:hidden').addClass('hidden').removeAttr('style');
});

/* jshint ignore:start */
/* Copyright (c) 2006-2013 Tyler Uebele * Released under the MIT license. * latest at https://github.com/tyleruebele/details-shim * minified by Google Closure Compiler */
function details_shim(a){if(!(a&&"nodeType"in a&&"tagName"in a))return details_shim.init();var b;if("details"==a.tagName.toLowerCase())b=a.getElementsByTagName("summary")[0];else if(a.parentNode&&"summary"==a.tagName.toLowerCase())b=a,a=b.parentNode;else return!1;if("boolean"==typeof a.open)return a.getAttribute("data-open")||(a.className=a.className.replace(/\bdetails_shim_open\b|\bdetails_shim_closed\b/g," ")),!1;var c=a.outerHTML||(new XMLSerializer).serializeToString(a),c=c.substring(0,c.indexOf(">")),
c=-1!=c.indexOf("open")&&-1==c.indexOf('open=""')?"open":"closed";a.setAttribute("data-open",c);a.className+=" details_shim_"+c;b.addEventListener?b.addEventListener("click",function(){details_shim.toggle(a)}):b.attachEvent&&b.attachEvent("onclick",function(){details_shim.toggle(a)});Object.defineProperty(a,"open",{get:function(){return"open"==this.getAttribute("data-open")},set:function(a){details_shim.toggle(this,a)}});for(b=0;b<a.childNodes.length;b++)if(3==a.childNodes[b].nodeType&&/[^\s]/.test(a.childNodes[b].data)){var c=
document.createElement("span"),d=a.childNodes[b];a.insertBefore(c,d);a.removeChild(d);c.appendChild(d)}}details_shim.toggle=function(a,b){b="undefined"===typeof b?"open"==a.getAttribute("data-open")?"closed":"open":b?"open":"closed";a.setAttribute("data-open",b);a.className=a.className.replace(/\bdetails_shim_open\b|\bdetails_shim_closed\b/g," ")+" details_shim_"+b};details_shim.init=function(){for(var a=document.getElementsByTagName("summary"),b=0;b<a.length;b++)details_shim(a[b])};
window.addEventListener?window.addEventListener("load",details_shim.init,!1):window.attachEvent&&window.attachEvent("onload",details_shim.init);

$(window).on('action:ajaxify.contentLoaded', details_shim.init);
$(window).on('action:posts.loaded', details_shim.init);

/* jshint ignore:end */
