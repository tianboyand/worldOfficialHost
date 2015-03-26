jQuery(document).ready(function($) {	
//Detect device
var isMobile = {
Android: function() {
  return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
  return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
  return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
  return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};	

if(isMobile) {
jQuery('.lightbox-item-overlay-content').hover(
  function(){
	  jQuery(this).stop().fadeTo(200,1);
  }, 
  function(){
	  jQuery(this).stop().fadeTo(200,0);
  }
  );
}	

//*** Mainmenu ***//
$("ul#menu").superfish();

//*** Countent Carousel ***//
$('#client-carousel').carouFredSel({
auto: false,
responsive: true,
width: '100%',
prev: '#prev-carousel',
next: '#next-carousel',
scroll: 1,
items: {
width: 160,
//	height: '30%',	//	optionally resize item-height
visible: {
min: 5,
max: 5
}
}
});

$('#gallery-carousel').carouFredSel({
auto: false,
responsive: true,
width: '100%',
pagination: "#pager-carousel2",
scroll: 4,
items: {
width: 214,
//	height: '30%',	//	optionally resize item-height
visible: {
min: 4,
max: 4
}
}
});	

$('#testi-carousel').carouFredSel({
responsive: true,
width: '100%',
pagination: "#pager-carousel",
scroll : {
items           : 1,
timeoutDuration : 6000,            
pauseOnHover    : false
}     

});	


//*** Tabs on Top Jquery ***//
$(".tab_content").hide();$("ul.tabs li:first").addClass("active").show();$(".tab_content:first").show();$("ul.tabs li").click(function(){$("ul.tabs li").removeClass("active");
$(this).addClass("active");$(".tab_content").hide();var activeTab=$(this).find("a").attr("href");$(activeTab).fadeIn();return false});


//*** Tabs on Bottom Jquery ***//
$(".tab_content-bottom").hide();$("ul.tabs-bottom li:first").addClass("active").show();$(".tab_content-bottom:first").show();$("ul.tabs-bottom li").click(function(){$("ul.tabs-bottom li").removeClass("active");
$(this).addClass("active");$(".tab_content-bottom").hide();var activeTab=$(this).find("a").attr("href");$(activeTab).fadeIn();return false});	


//*** Tabs on Left Jquery ***//
$(".tab_content-left").hide();$("ul.tabs-left li:first").addClass("active").show();$(".tab_content-left:first").show();$("ul.tabs-left li").click(function(){$("ul.tabs-left li").removeClass("active");
$(this).addClass("active");$(".tab_content-left").hide();var activeTab=$(this).find("a").attr("href");$(activeTab).fadeIn();return false});


//*** Tabs on Right Jquery ***//
$(".tab_content-right").hide();$("ul.tabs-right li:first").addClass("active").show();$(".tab_content-right:first").show();$("ul.tabs-right li").click(function(){$("ul.tabs-right li").removeClass("active");
$(this).addClass("active");$(".tab_content-right").hide();var activeTab=$(this).find("a").attr("href");$(activeTab).fadeIn();return false});	


//*** Fancybox Jquery ***//
$(".fancybox").fancybox({padding:0,openEffect:'elastic',openSpeed:250,closeEffect:'elastic',closeSpeed:250,closeClick:false,helpers:{title:{type:'outside'},overlay:{css:{'background':'rgba(0,0,0,0.85)'}},media:{}}});
	
	
//*** TinyNav Jquery ***//
(function(a,i,g){a.fn.tinyNav=function(j){var b=a.extend({active:"selected",header:"",label:""},j);return this.each(function(){g++;var h=a(this),d="tinynav"+g,f=".l_"+d,e=a("<select/>").attr("id",d).addClass("tinynav "+d);if(h.is("ul,ol")){""!==b.header&&e.append(a("<option/>").text(b.header));var c="";h.addClass("l_"+d).find("a").each(function(){c+='<option value="'+a(this).attr("href")+'">';var b;for(b=0;b<a(this).parents("ul, ol").length-1;b++)c+="- ";c+=a(this).text()+"</option>"});e.append(c);
b.header||e.find(":eq("+a(f+" li").index(a(f+" li."+b.active))+")").attr("selected",!0);e.change(function(){i.location.href=a(this).val()});a(f).after(e);b.label&&e.before(a("<label/>").attr("for",d).addClass("tinynav_label "+d+"_label").append(b.label))}})}})(jQuery,this,0);
$('#menu').tinyNav({active: 'selected',header: 'Navigation'});	


//*** Search Panel ***//
$(".trigger").click(function(){$(".search-panel").toggle("fast");$(this).toggleClass("active");return false});


//*** Flickr Feed ***//
$('#flck-thumb').jflickrfeed({limit:9,qstrings:{id:'52617155@N08'},itemTemplate:'<div>'+'<a class="fancybox" href="{{image}}" data-fancybox-group="gallery" title="{{title}}">'+'<img src="{{image_s}}" alt="{{title}}" />'+'</a>'+'</div>'},function(data){$('#flck-thumb a').colorbox();});	


//*** Tooltip Jquery ***//
var targets=$('[class=tooltip]'),target=false,tooltip=false,title=false;targets.bind('mouseenter',function(){target=$(this);tip=target.attr('title');tooltip=$('<div id="tooltip"></div>');if(!tip||tip=='')return false;target.removeAttr('title');tooltip.css('opacity',0).html(tip).appendTo('body');var init_tooltip=function(){if($(window).width()<tooltip.outerWidth()*1.5)tooltip.css('max-width',$(window).width()/2);else tooltip.css('max-width',340);var pos_left=target.offset().left+(target.outerWidth()/2)-(tooltip.outerWidth()/2),pos_top=target.offset().top-tooltip.outerHeight()-20;if(pos_left<0){pos_left=target.offset().left+target.outerWidth()/2-20;tooltip.addClass('left')}else tooltip.removeClass('left');if(pos_left+tooltip.outerWidth()>$(window).width()){pos_left=target.offset().left-tooltip.outerWidth()+target.outerWidth()/2+20;tooltip.addClass('right')}else tooltip.removeClass('right');if(pos_top<0){var pos_top=target.offset().top+target.outerHeight();tooltip.addClass('top')}else tooltip.removeClass('top');tooltip.css({left:pos_left,top:pos_top}).animate({top:'+=10',opacity:1},50)};init_tooltip();$(window).resize(init_tooltip);var remove_tooltip=function(){tooltip.animate({top:'-=10',opacity:0},50,function(){$(this).remove()});target.attr('title',tip)};target.bind('mouseleave',remove_tooltip);tooltip.bind('click',remove_tooltip);});	


//*** To top Jquery ***//
(function($){$.fn.UItoTop=function(options){var defaults={text:'<i class="icon-chevron-up"></i>',min:200,inDelay:600,outDelay:400,containerID:'toTop',containerHoverID:'toTopHover',scrollSpeed:1200,easingType:'linear'},settings=$.extend(defaults,options),containerIDhash='#'+settings.containerID,containerHoverIDHash='#'+settings.containerHoverID;$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');$(containerIDhash).hide().on('click.UItoTop',function(){$('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);$('#'+settings.containerHoverID,this).stop().animate({'opacity':0},settings.inDelay,settings.easingType);return false;}).prepend('<span id="'+settings.containerHoverID+'"></span>').hover(function(){$(containerHoverIDHash,this).stop().animate({'opacity':1},600,'linear');},function(){$(containerHoverIDHash,this).stop().animate({'opacity':0},700,'linear');});$(window).scroll(function(){var sd=$(window).scrollTop();if(typeof document.body.style.maxHeight==="undefined"){$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
if(sd>settings.min)
$(containerIDhash).fadeIn(settings.inDelay);else
$(containerIDhash).fadeOut(settings.Outdelay);});};})(jQuery);
$().UItoTop({ easingType: 'easeOutQuart' });	


//*** Progress Bar Jquery ***//
function progress(percent, element) {
var progressBarWidth = percent * element.width() / 100;
element.find('div').animate({ width: progressBarWidth }, 2000).html("<div class='progress-meter'>"+percent+"%&nbsp;</div>");
}

$(document).ready(function() { 
$('.progress-bar').each(function() { 
var bar = $(this);
var percentage = $(this).attr('data-percent');

progress(percentage, bar);
});
});

//*** Circular Progress Bar Jquery ***//
$(function() {
$(".circular-bar").donutchart({'size': 150});
$(".circular-bar").donutchart("animate");

$(".circular-bar-green").donutchart({'size': 150, 'fgColor': '#1abc9c' });
$(".circular-bar-green").donutchart("animate");

$(".circular-bar-blue").donutchart({'size': 150, 'fgColor': '#3498db' });
$(".circular-bar-blue").donutchart("animate");

$(".circular-bar-orange").donutchart({'size': 150, 'fgColor': '#e67e22' });
$(".circular-bar-orange").donutchart("animate");

$(".circular-bar-red").donutchart({'size': 150, 'fgColor': '#e74c3c' });
$(".circular-bar-red").donutchart("animate");
});

$('audio,video').mediaelementplayer();

});