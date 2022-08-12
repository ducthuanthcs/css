// IE Button-Bug Fix (ieFixButtons)
;jQuery.fn.ieFixButtons=function(){return/MSIE[567]\./i.test(window.navigator.userAgent)?this.find('button[type=submit]').click(function(){jQuery(this.form).bind('submit',{button:jQuery(this)},function(event){var $button=event.data.button;var m=$button.get(0).outerHTML.match(/value\s*=\s*['"]([^'"]*)['"]/);var val=(m?m[1]:'');var $input=jQuery('<input type="hidden" '+
($button.attr('name')?'name="'+$button.attr('name')+'" ':'')+'" value="'+val+'" />');jQuery(this).append($input);jQuery.each(jQuery(this).find('button'),function(){jQuery(this).attr('name','');});});}).end():this;};

// IE Overflow-Bug Fix (fixOverflow)
;(function($){$.fixOverflow=function(padding){if(!$.browser.msie){return this;}else{return this.each(function(){if(this.scrollWidth>this.offsetWidth){$(this).css({'overflow-y':'hidden','padding-bottom':padding+'px'});}});}};})(jQuery);

// cleanCharacters (diacritics, alt-symbols, etc.)
var cleanCharactersMap = [
	{'base':'A', 'chars':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
	{'base':'AA','chars':/[\uA732]/g},
	{'base':'AE','chars':/[\u00C6\u01FC\u01E2]/g},
	{'base':'AO','chars':/[\uA734]/g},
	{'base':'AU','chars':/[\uA736]/g},
	{'base':'AV','chars':/[\uA738\uA73A]/g},
	{'base':'AY','chars':/[\uA73C]/g},
	{'base':'B', 'chars':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
	{'base':'C', 'chars':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
	{'base':'D', 'chars':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
	{'base':'DZ','chars':/[\u01F1\u01C4]/g},
	{'base':'Dz','chars':/[\u01F2\u01C5]/g},
	{'base':'E', 'chars':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
	{'base':'F', 'chars':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
	{'base':'G', 'chars':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
	{'base':'H', 'chars':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
	{'base':'I', 'chars':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
	{'base':'J', 'chars':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
	{'base':'K', 'chars':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
	{'base':'L', 'chars':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
	{'base':'LJ','chars':/[\u01C7]/g},
	{'base':'Lj','chars':/[\u01C8]/g},
	{'base':'M', 'chars':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
	{'base':'N', 'chars':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
	{'base':'NJ','chars':/[\u01CA]/g},
	{'base':'Nj','chars':/[\u01CB]/g},
	{'base':'O', 'chars':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
	{'base':'OI','chars':/[\u01A2]/g},
	{'base':'OO','chars':/[\uA74E]/g},
	{'base':'OU','chars':/[\u0222]/g},
	{'base':'P', 'chars':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
	{'base':'Q', 'chars':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
	{'base':'R', 'chars':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
	{'base':'S', 'chars':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
	{'base':'T', 'chars':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
	{'base':'TZ','chars':/[\uA728]/g},
	{'base':'U', 'chars':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
	{'base':'V', 'chars':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
	{'base':'VY','chars':/[\uA760]/g},
	{'base':'W', 'chars':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
	{'base':'X', 'chars':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
	{'base':'Y', 'chars':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
	{'base':'Z', 'chars':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
	{'base':'a', 'chars':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
	{'base':'aa','chars':/[\uA733]/g},
	{'base':'ae','chars':/[\u00E6\u01FD\u01E3]/g},
	{'base':'ao','chars':/[\uA735]/g},
	{'base':'au','chars':/[\uA737]/g},
	{'base':'av','chars':/[\uA739\uA73B]/g},
	{'base':'ay','chars':/[\uA73D]/g},
	{'base':'b', 'chars':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
	{'base':'c', 'chars':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
	{'base':'d', 'chars':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
	{'base':'dz','chars':/[\u01F3\u01C6]/g},
	{'base':'e', 'chars':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
	{'base':'f', 'chars':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
	{'base':'g', 'chars':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
	{'base':'h', 'chars':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
	{'base':'hv','chars':/[\u0195]/g},
	{'base':'i', 'chars':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
	{'base':'j', 'chars':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
	{'base':'k', 'chars':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
	{'base':'l', 'chars':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
	{'base':'lj','chars':/[\u01C9]/g},
	{'base':'m', 'chars':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
	{'base':'n', 'chars':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
	{'base':'nj','chars':/[\u01CC]/g},
	{'base':'o', 'chars':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
	{'base':'oi','chars':/[\u01A3]/g},
	{'base':'ou','chars':/[\u0223]/g},
	{'base':'oo','chars':/[\uA74F]/g},
	{'base':'p','chars':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
	{'base':'q','chars':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
	{'base':'r','chars':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
	{'base':'s','chars':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
	{'base':'t','chars':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
	{'base':'tz','chars':/[\uA729]/g},
	{'base':'u','chars':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
	{'base':'v','chars':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
	{'base':'vy','chars':/[\uA761]/g},
	{'base':'w','chars':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
	{'base':'x','chars':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
	{'base':'y','chars':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
	{'base':'z','chars':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g},
	{'base':'"','chars':/[\u0022\u02BA\u02EE\u02F5\u02F6\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037]/g},
	{'base':"'",'chars':/[\u0027\u0060\x27\u02B9\u02BB\u02BC\u02BD\u02CA\u02CB\u2019\u275C\u07F4\u02F4\u2018\u2019\u201A\u201B\u2032\u2035]/g},
	{'base':'-','chars':/[\u002D\u2010\u2011\u2012\u2013\u2014\u2015]/g}
];
function cleanCharacters(str){
	var changes;
	if(!changes){changes=cleanCharactersMap;}
	for(var i=0;i<changes.length;i++){str=str.replace(changes[i].chars, changes[i].base);}
	return str;
}

//
// jQuery DOM-load

$(function(){

	$('body').ieFixButtons();
	$('pre').fixOverflow();
	$('.sbookmark').jBrowserBookmark();

// Navigation Drop-Menus
	/**
	 * on touch of container allow users to hide menus
	 */
	var sfTouch = function() {
		// is touch interface
		var hasTouch = 'ontouchend' in document,
			// cache container
			$ctnr = $('#container');
		
		return {
			// bind click event to container
			bind: function() {
				// open menu
				var self = this;
				// if touch
				hasTouch && $ctnr.bind('click', function() {
					// use superfish's internal public
					// interface method for hiding menus
					$(self).hideSuperfishUl();
				});
			},
			// unbind click event from container
			unbind: function() {
				// if touch
				hasTouch && $ctnr.unbind('click');
			}
		};
	// set up on load
	}();
	/*var sfTouch=function(){var hasTouch='ontouchend' in document,$ctnr=$('#container');return {bind:function(){var self=this;hasTouch && $ctnr.bind('click',function(){$(self).hideSuperfishUl();});},unbind:function(){hasTouch && $ctnr.unbind('click');}};}();*/
	
	$(".nav-main ul").add(".nav-msite ul").superfish({hoverClass:'sfhover',pathClass:'sfactive',pathLevels:2,delay:700,animation:{height:'show',opacity:'show'},speed:'normal',autoArrows:false,dropShadows:false,disableHI:false,onShow:sfTouch.bind,onHide:sfTouch.unbind});
	
	$(".nav-main ul ul").add(".nav-msite ul ul").superfish({hoverClass:'sfhover',pathClass:'sfactive',pathLevels:1,delay:700,animation:{opacity:'show'},speed:'normal',autoArrows:false,dropShadows:false,disableHI:false,onShow:sfTouch.bind,onHide:sfTouch.unbind});

// Input Title-Hint
	//$('input:text').hint();
	$('input.hint[title!=""]').hint().focus(function(){if(this.title=this.value){this.value='';}});

// Link List Collapser/Expander
	$('.linklist > li > a + ul').add('.listcollapse > li > a + ul').each(function(){$(this).parent().addClass('parent');});
	$(".linklist > li.parent > a + ul").add('.listcollapse > li.parent > a + ul').slideUp("fast");
	$(".linklist > li.parent > a").add('.listcollapse > li.parent > a').click(function(){$(this).find("+ ul").slideToggle("fast");$(this).toggleClass("closeit");return false;});

// Collapsible/Expandable
	$('.collapse > h3').add('.collapse > h4').each(function(){$(this).addClass('parent');});
	$(".collapse > h3.parent + div").add(".collapse > h4.parent + div").slideUp("fast");
	$(".collapse > h3.parent").add(".collapse > h4.parent").wrapInner("<a href=\"#\"></a>");
	$(".collapse > h3.parent > a").add(".collapse > h4.parent > a").click(function(){$(this).parent().find("+ div").slideToggle("fast");$(this).toggleClass("closeit");return false;});

// Pullquote Creator
	$('span.pullquote').each(function() {
		text = $(this).text();
		text=text.replace( /\((.*)\)/gi, " " );
		if ($(this).is(".right")) $(this).parent().before('<blockquote class="pullquote right"><p>'+text+'</p></blockquote>');
		else $(this).parent().before('<blockquote class="pullquote"><p>'+text+'</p></blockquote>');
	});

// Box Preview
	$(".lightbox").ceebox();
	$(".lightbox-dark").ceebox({boxColor:"#333"});

// jQ - Tabs
	$("ul.jtabs").tabs("div.panes > div");

// jQ - Accordion
	$('.sb-box .itemlist').pager('li',{navId:'nav3',navAttach:'prepend',navClass:'pagination-pager'});
	$("#accordion").tabs("#accordion div.pane",{tabs:'h2',effect:'slide',initialIndex:0});
	
	jQuery(function($){$("img.reflect").reflect({height:0.15, opacity:0.25});});
	
	$('#productbuttons li > a').hover(function() {
		$(this).stop().animate({backgroundColor:"#222",paddingLeft:"52px"},150);
	}, function() {
		$(this).stop().animate({backgroundColor:"#444",paddingLeft:"50px"},150);
	});
	
	$("#shippingregion").click(function (){ 
		$().ceebox();
		var shippingpopup = "<a href='/js/ajax/shipregion_ceebox_content.php' title=''></a>"
		$.fn.ceebox.overlay();
		$.fn.ceebox.popup(shippingpopup,{htmlWidth:550,htmlHeight:335,titles:false,fadeIn:100,fadeOut:100,margin:125});
		return false;
	});
  $("#changeRegionLink").click(function (){ 
    $().ceebox();
    var refURL = $(this).attr("data-ref");
    var changeregionform = '<a href="/account/change_region/?ref='+refURL+'"></a>';
    $.fn.ceebox.overlay();
    $.fn.ceebox.popup(changeregionform,{htmlWidth:400,htmlHeight:220,titles:false,fadeIn:100,fadeOut:100});
    return false;
  });
	
	$(".tooltip").tooltip({effect:'slide'});
	
	// News feeds
	var $nf = $('.newsfeed');
	if ($nf.length) {
		var limit, feed;
		$nf.each(function() {
			var $self = $(this);
			limit = $self.attr('data-rssfeed-item-limit');
			feed = $self.find('a').attr('href');
			$(this).rssfeed(feed, { limit: limit ? limit : 10 });
		});
	}
	
});

//
// jQuery Validation - Additional Methods

jQuery.validator.addMethod("maxWords", function(value, element, params) {
		return this.optional(element) || value.match(/\b\w+\b/g).length < params;
}, jQuery.format("Please enter {0} words or less."));
jQuery.validator.addMethod("minWords", function(value, element, params) {
		return this.optional(element) || value.match(/\b\w+\b/g).length >= params;
}, jQuery.format("Please enter at least {0} words."));
jQuery.validator.addMethod("rangeWords", function(value, element, params) {
		return this.optional(element) || value.match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
}, jQuery.format("Please enter between {0} and {1} words."));
jQuery.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, spaces or underscores only please.");  
jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please."); 
jQuery.validator.addMethod("nowhitespace", function(value, element) {
	return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please.");
jQuery.validator.addMethod("dateW3C", function(value, element) {
	return this.optional(element) || /^(([0-9]{4})+\-([0-9]{2})+\-([0-9]{2}))$/i.test(value);
}, "Please format the date properly (2012-07-23)."); 
jQuery.validator.addMethod("dateREAL", function(value, element) {
	return this.optional(element) || /^(([12]{1})([019]{1})([0-9]{1})([0-9]{1})\-(01|02|03|04|05|06|07|08|09|10|11|12)\-(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31))$/i.test(value);
}, "Please enter a valid date (2012-07-23)."); 
jQuery.validator.addMethod("dateUS", function(value, element) {
	return this.optional(element) || /^(([0-9]{2})+\-([0-9]{2})+\-([0-9]{4}))$/i.test(value);
}, "Please format the date properly (07-23-2012)."); 
jQuery.validator.addMethod("dateUSREAL", function(value, element) {
	return this.optional(element) || /^((01|02|03|04|05|06|07|08|09|10|11|12)\-(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\-([12]{1})([019]{1})([0-9]{1})([0-9]{1}))$/i.test(value);
}, "Please enter a valid date (07-23-2012)."); 
jQuery.validator.addMethod("dateUS2", function(value, element) {
	return this.optional(element) || /^(([0-9]{2})+\/([0-9]{2})+\/([0-9]{4}))$/i.test(value);
}, "Please format the date properly (07/23/2012).");
jQuery.validator.addMethod("dateUS2REAL", function(value, element) {
	return this.optional(element) || /^((01|02|03|04|05|06|07|08|09|10|11|12)\/(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\/([12]{1})([019]{1})([0-9]{1})([0-9]{1}))$/i.test(value);
}, "Please enter a valid date (07/23/2012).");
jQuery.validator.addMethod("dateUS2future", function(value, element) {
	return this.optional(element) || /^((01|02|03|04|05|06|07|08|09|10|11|12)\/(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\/([2]{1})([0]{1})([1]{1})([2-9]{1}))$/i.test(value);
}, "Please enter a valid future date (07/23/2012).");
jQuery.validator.addMethod("isbn", function(value, element) {
	return this.optional(element) || /^[0-9Xx\-]+$/i.test(value);
}, "Please format ISBN properly."); 
jQuery.validator.addMethod("cleaninput", function(value, element) {
	return this.optional(element) || /^[\w\s\!\@\#\$\%\&\*\(\)\-\[\]\:\;\u0022\u0027\x27\u02BC\u2019\u275C\u07F4\,\.\?\/\']+$/i.test(value);
}, "Letters, numbers, spaces or common punctuation only please.");
jQuery.validator.addMethod("cleanname", function(value, element) {
	return this.optional(element) || /^[\w\s\-\.\u0022\u0027\x27\u02BC\u2019\u275C\u07F4\,\']+$/i.test(value);
}, "Letters, numbers, spaces, hyphens or periods only please.");
jQuery.validator.addMethod("phonenumber", function(value, element) {
	return this.optional(element) || /^[\d\s\-\.\+\(\)\#\*]+$/i.test(value);
}, "Numbers, spaces and the following punctuation only please: <code>-.+()#*</code>");
jQuery.validator.addMethod(
	"dateITA",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/
		if( re.test(value)){
			var adata = value.split('/');
			var gg = parseInt(adata[0],10);
			var mm = parseInt(adata[1],10);
			var aaaa = parseInt(adata[2],10);
			var xdata = new Date(aaaa,mm-1,gg);
			if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) )
				check = true;
			else
				check = false;
		} else
			check = false;
		return this.optional(element) || check;
	}, 
	"Please enter a correct date"
);
jQuery.validator.addMethod("email2", function(value, element, param) {
	return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value); 
}, jQuery.validator.messages.email);
jQuery.validator.addMethod("password", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9\@\#\$\%\&]+$/i.test(value);
}, "Only alphanumeric and the following characters are allowed - @,#,$,%,&");

jQuery.validator.addMethod("firstname", function(value, element) {
	return this.optional(element) || /^[\w\s\-\.\u0022\u0027\x27\u02BC\u2019\u275C\u07F4\,\']+$/i.test(value);
}, "Letters, numbers, spaces, hyphens, periods, apostrophes or commas only please.");
jQuery.validator.addMethod("lastname", function(value, element) {
	return this.optional(element) || /^[\w\s\-\.\u0022\u0027\x27\u02BC\u2019\u275C\u07F4\,\']+$/i.test(value);
}, "Letters, numbers, spaces, hyphens, periods, apostrophes or commas only please.");
