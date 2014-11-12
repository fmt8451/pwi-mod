/**
 * Picasa Webalbum Integration jQuery plugin
 * This library was inspired aon pwa by Dieter Raber
 * @name jquery.pwi.js
 * @author Jeroen Diderik - http://www.jdee.nl/
 * @author Johan Borkhuis - http://www.borkhuis.com/
 * @revision 2.0.2
 * @date May 7, 2013
 * @copyright (c) 2010-2013 Jeroen Diderik(www.jdee.nl) and Johan Borkhuis
 * @license Creative Commons Attribution-Share Alike 3.0 Netherlands License - http://creativecommons.org/licenses/by-sa/3.0/nl/
 * @Visit http://pwi.googlecode.com/ for more informations, discussions etc about this library
 */
function formatPhotoTitleFancyBox(){var e=this.element.title;this.title=e;return;if(this.element.parentNode.childNodes&&this.element.parentNode.childNodes.length>1){var t=$(".captiontext",this.element.parentNode);if(t.length>0){e=t[0].innerHTML}var n=$(".downloadlink",this.element.parentNode);if(n.length>0){var r='<a style="color: #FFF;" href="'+n[0].href+'">Download</a>';e=e+"  "+r}}this.title=e}function mapOverviewCallback(){var e={zoom:1,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.HYBRID};var t=new google.maps.Map(document.getElementById("map_canvas"),e);var n=new google.maps.LatLngBounds;var r=new Array;for(i=0;i<$.fn.pwi.additionalMapsSettings.length;i++){var s=$.fn.pwi.additionalMapsSettings[i];var o=s.georss$where.gml$Point.gml$pos.$t.split(" ");var u=parseFloat(o[0]);var a=parseFloat(o[1]);for(j=i+1;j<$.fn.pwi.additionalMapsSettings.length;j++){var f=$.fn.pwi.additionalMapsSettings[j].georss$where.gml$Point.gml$pos.$t.split(" ");if(Math.abs(u-parseFloat(f[0]))<1e-4&&Math.abs(a-parseFloat(f[1]))<1e-4){u+=1e-4;a+=1e-4}}var l={};l.latitude=u;l.longitude=a;l.img=s.media$group.media$thumbnail[0].url;l.summary=s.summary.$t.replace(/\n/g,"<br />\n");r.push(l)}$.each(r,function(e,r){var i=new google.maps.LatLng(r.latitude,r.longitude);var s=new google.maps.Marker({position:i,map:t});var o="<div id='content'><img src='"+r.img+"' alt='' title=''/>"+r.summary+"</div>";var u=new google.maps.InfoWindow({content:o});google.maps.event.addListener(s,"click",function(){u.open(t,s)});n.extend(i)});t.fitBounds(n)}function formatPhotoTitleColorBox(){var e=this.title;if(this.parentNode.childNodes&&this.parentNode.childNodes.length>1){var t=$(".captiontext",this.parentNode);if(t.length>0){e=t[0].innerHTML}var n=$(".downloadlink",this.parentNode);if(n.length>0){return e+"  "+"Download".link(n[0].href)}}return e}(function(e){var t,n={};e.fn.pwi=function(n){function o(){i=n;ts=(new Date).getTime();i.id=ts;s=e.fn.pwi.strings;r=e("<div id='pwi_"+ts+"'/>").appendTo(t);r.addClass("pwi_container");u();return false}function u(){if(i.username===""){alert("Make sure you specify at least your username."+"\n"+"See http://pwi.googlecode.com for more info");return}if(i.useQueryParameters){var e=document.URL.split("?",2);if(e.length==2){var t=e[1].split("&");var n=false;var r=1;for($queryParam=0;$queryParam<t.length;$queryParam++){var s=t[$queryParam].split("=",2);if(s.length==2){switch(s[0]){case"pwi_album_selected":i.mode="album";i.album=s[1];n=true;break;case"pwi_albumpage":r=s[1];break;case"pwi_showpermalink":i.showPermaLink=true;break}}}if(n){i.page=r;i.showPermaLink=false}}}switch(i.mode){case"latest":E();break;case"album":case"keyword":w();break;default:y();break}}function a(e){var t=new Date(Number(e)),n=t.getUTCFullYear();if(n<1e3){n+=1900}return t.getUTCDate()+"-"+(t.getUTCMonth()+1)+"-"+n}function f(e){var t=new Date(Number(e));$year=t.getUTCFullYear();if($year<1e3){$year+=1900}if(t=="Invalid Date"){return e}else{if(t.getUTCHours()==0&&t.getUTCMinutes()==0&&t.getUTCSeconds()==0){return t.getUTCDate()+"-"+(t.getUTCMonth()+1)+"-"+$year}else{return t.getUTCDate()+"-"+(t.getUTCMonth()+1)+"-"+$year+" "+t.getUTCHours()+":"+(t.getUTCMinutes()<10?"0"+t.getUTCMinutes():t.getUTCMinutes())}}}function l(e,t){function n(e,t){return Number(e.gphoto$timestamp.$t)-Number(t.gphoto$timestamp.$t)}function r(e,t){return Number(t.gphoto$timestamp.$t)-Number(e.gphoto$timestamp.$t)}function i(e,t){var n=e.title.$t.toLowerCase();var r=t.title.$t.toLowerCase();if(n<r){return-1}if(n>r){return 1}return 0}function s(e,t){var n=e.title.$t.toLowerCase();var r=t.title.$t.toLowerCase();if(n>r){return-1}if(n<r){return 1}return 0}if(t==="none")return;switch(t){case"ASC_DATE":e.sort(n);break;case"DESC_DATE":e.sort(r);break;case"ASC_NAME":e.sort(i);break;case"DESC_NAME":e.sort(s);break}}function c(t){var r=0;var s=0;e(n.selector+" "+t).each(function(e,t){if(t.clientHeight>r){r=t.clientHeight}if(t.clientWidth>s){s=t.clientWidth}});e(n.selector+" "+t).css("height",r+2+"px");if(i.thumbAlign){e(n.selector+" "+t).css("width",s+2+"px")}}function h(t,n,r){var s,o="",u="",a="",l;if(t.summary){var c=t.summary.$t.match(/\[youtube\s*:\s*(.*)\s*\](.*)/);if(c){a=c[1];u=c[2].replace(/[\r\n\t\s]+/g," ");l=c[2].replace(/[\n]/g,"<br/>")}else{u=t.summary.$t.replace(/[\r\n\t\s]+/g," ");l=t.summary.$t.replace(/[\n]/g,"<br/>")}}if(i.showPhotoFilename){if(l.length>0){l+=", "}l+=i.labels.fileName+" "+t.media$group.media$title.$t}if(i.showPhotoDate){if(t.exif$tags&&t.exif$tags.exif$time){o=f(t.exif$tags.exif$time.$t)+" "}}var h=u.replace(new RegExp("'","g"),"&#39;");o+=h;var p=t.media$group.media$thumbnail[0];var d=t.media$group.media$thumbnail[1];if(n){s=e("<div class='pwi_photo' style='display: none'/>");if(a==""){s.append("<a href='"+d.url+"' rel='lb-"+r+"' title='"+h+"'></a>")}}else{s=e("<div class='pwi_photo' style='cursor: pointer;'/>");if(a==""){s.append("<a href='"+d.url+"' rel='lb-"+r+"' title='"+h+(a==""?"":" ("+i.labels.videoNotSupported+")")+"'><img src='"+p.url+"' alt='"+i.labels.photo+"' height='"+p.height+"' width='"+p.width+"'/></a>")}else{s.append("<a class='"+(i.popupPlugin==="fancybox"?"fancybox.iframe":"iframe")+"' href='http://www.youtube.com/embed/"+a+"?autoplay=1&rel=0&hd=1&autohide=1' rel='yt-"+r+"' title='"+h+"'><img id='main' src='"+p.url+"' alt='"+i.labels.photo+"' height='"+p.height+"' width='"+p.width+"'/>"+"<img id='video' src='"+i.videoBorder+"' title=''"+"' alt='' height='"+p.height+"' /></a>")}if(i.showPhotoLocation||i.showPhotoCaption){s.append("<br/>");if(i.showPhotoLocation&&i.mapIconLocation!=""&&t.georss$where&&t.georss$where.gml$Point&&t.georss$where.gml$Point.gml$pos){var v=e("<a class='"+(i.popupPlugin==="fancybox"?"fancybox.iframe":"iframe")+"' href='http://maps.google.com/?output=embed&t=h&z=15&q="+t.georss$where.gml$Point.gml$pos.$t+"' rel='map-"+r+"'>"+"<img src='"+i.mapIconLocation+"' alt='map'></a>");s.append(v)}if(i.showPhotoCaption){if(i.showPhotoCaptionDate&&i.showPhotoDate){u=o}if(u.length>i.showCaptionLength){u=u.substring(0,i.showCaptionLength)}if(i.showPhotoDownload){u+='<a href="'+t.media$group.media$content[0].url+'">'+i.labels.downloadphotos+"</a>"}s.append(u)}}if(typeof i.onclickThumb==="function"){var m=t;s.bind("click.pwi",m,g)}}if(i.showPhotoDownloadPopup){var y=e("<div style='display: none'/>");y.append("<a class='downloadlink' href='"+t.media$group.media$content[0].url+"'/>");s.append(y)}var b=e("<div style='display: none'/>");b.append("<a class='captiontext'>"+l+"</a>");s.append(b);return s}function p(t){var n=e("<div/>"),r=0;var o,u;if(typeof i.onAlbumsStart==="function"){if(i.onAlbumsStart(t.feed.entry,n)==false){S(false,n);return}}if(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)==null){o=new Date(i.albumStartDateTime);if(isNaN(o)){o=new Date(i.albumStartDateTime.replace(/-/g,"/"))}u=new Date(i.albumEndDateTime);if(isNaN(u)){u=new Date(i.albumEndDateTime.replace(/-/g,"/"))}}else{o=new Date(i.albumStartDateTime.replace(/-/g,"/"));u=new Date(i.albumEndDateTime.replace(/-/g,"/"))}l(t.feed.entry,i.sortAlbums);var f=0;var h=e.grep(t.feed.entry,function(t,n){if(n>=i.albumMaxResults)return false;var r=new Date(Number(t.gphoto$timestamp.$t));if((e.inArray(t.gphoto$name.$t,i.albums)>-1||i.albums.length===0)&&e.inArray(t.gphoto$name.$t,i.removeAlbums)==-1&&(t.gphoto$albumType===undefined||e.inArray(t.gphoto$albumType.$t,i.removeAlbumTypes)==-1)&&(i.albumStartDateTime==""||r>=o)&&(i.albumEndDateTime==""||r<=u)){var s=true;if(i.albumKeywords.length>0){s=false;var a=t.summary.$t.match(/\[keywords\s*:\s*(.*)\s*\]/);if(a){var l=new Array;var c=a[1].split(/,/);for(var h in c){var p=c[h].match(/\s*['"](.*)['"]\s*/);if(p){l.push(p[1])}}if(l.length>0){s=true;for(var h in i.albumKeywords){if(e.inArray(i.albumKeywords[h],l)<0){s=false;break}}}}}if(s==false)return false;f++;if(f>i.albumsPerPage*i.albumPage||f<=i.albumsPerPage*(i.albumPage-1))return false;else return true}return false});if(h.length==0){n=e("<div class='pwi_album_description'/>");n.append("<div class='title'>"+i.labels.noalbums+"</div>");S(false,n);return}e.each(h,function(t,r){var s=e("<div class='pwi_album' style='cursor: pointer; "+(i.albumThumbAlign?"width:"+(i.albumThumbSize+1)+"px;":"")+"'/>");s.bind("click.pwi",r,function(e){e.stopPropagation();i.page=1;i.album=e.data.gphoto$name.$t;if(typeof i.onclickAlbumThumb==="function"){i.onclickAlbumThumb(e)}else{w()}return false});if(i.showAlbumThumbs){var o=r.media$group.media$thumbnail[0];s.append("<img src='"+o.url+"' height='"+o.height+"' width='"+o.width+"' alt='album'/>")}if(i.showAlbumTitles){var u=e("<div class='pwi_album_title'/>");u.append((r.title.$t.length>i.showAlbumTitlesLength?r.title.$t.substring(0,i.showCaptionLength):r.title.$t)+"<br/>"+(i.showAlbumdate?a(r.gphoto$timestamp.$t):"")+(i.showAlbumPhotoCount?"    "+r.gphoto$numphotos.$t+" "+(r.gphoto$numphotos.$t=="1"?i.labels.photo:i.labels.photos):""));s.append(u)}n.append(s)});n.append(s.clearDiv);if(f>i.albumsPerPage){var d=f/i.albumsPerPage;var v=e("<div class='pwi_prevpage'/>").text(i.labels.prev),m=e("<div class='pwi_nextpage'/>").text(i.labels.next);$navRow=e("<div class='pwi_pager'/>");if(i.albumPage>1){v.addClass("link").bind("click.pwi",function(e){e.stopPropagation();i.albumPage=parseInt(i.albumPage,10)-1;p(t);return false})}$navRow.append(v);for(var g=1;g<d+1;g++){if(g==i.albumPage){tmp="<div class='pwi_pager_current'>"+g+"</div> "}else{tmp=e("<div class='pwi_pager_page'>"+g+"</div>").bind("click.pwi",g,function(e){e.stopPropagation();i.albumPage=e.data;p(t);return false})}$navRow.append(tmp)}if(i.albumPage<d){m.addClass("link").bind("click.pwi",function(e){e.stopPropagation();i.albumPage=parseInt(i.albumPage,10)+1;p(t);return false})}$navRow.append(m);$navRow.append(s.clearDiv);if($navRow.length>0&&(i.showPager==="both"||i.showPager==="top")){n.prepend($navRow.clone(true))}if($navRow.length>0&&(i.showPager==="both"||i.showPager==="bottom")){n.append($navRow)}}if(typeof i.onAlbumsEnd==="function"){i.onAlbumsEnd(t.feed.entry,n)}i.albumstore=t;S(false,n);c("div.pwi_album")}function d(t){var r,o,u="",f=t.feed.entry.length,p="",d="",v=t.feed.gphoto$location===undefined?"":t.feed.gphoto$location.$t,m,g=a(t.feed.gphoto$timestamp===undefined?"":t.feed.gphoto$timestamp.$t),b=f=="1"?false:true;var E=i.username.replace(/[@\.]/g,"_")+(i.ownRelTag===""?i.selector:"#"+i.ownRelTag);if(typeof i.onAlbumStart==="function"){if(i.onAlbumStart(t.feed.entry,r)==false){S(false,r);return}}if(t.feed.subtitle===undefined){m=""}else{var x=t.feed.subtitle.$t.match(/\[keywords\s*:\s*.*\s*\](.*)/);if(x){m=x[1]}else{m=t.feed.subtitle.$t}}window.scrollTo(0,0);p=t.feed.title==="undefined"||i.albumTitle.length>0?i.albumTitle:t.feed.title.$t;r=e("<div/>");if(i.mode!="album"&&i.mode!="keyword"){u=e("<div class='pwi_album_backlink'>"+i.labels.albums+"</div>").bind("click.pwi",function(e){e.stopPropagation();y();return false});r.append(u)}if(i.showAlbumDescription){o=e("<div class='pwi_album_description'/>");o.append("<div class='title'>"+p+"</div>");o.append("<div class='details'>"+f+" "+(b?i.labels.photos:i.labels.photo)+(i.showAlbumdate?", "+g:"")+(i.showAlbumLocation&&v?", "+v:"")+"</div>");o.append("<div class='description'>"+m+"</div>");r.append(o)}if(i.showPhotoLocation&&typeof google!="undefined"){var T=e.grep(t.feed.entry,function(e,t){if(e.georss$where&&e.georss$where.gml$Point&&e.georss$where.gml$Point.gml$pos){return true}else{return false}});var N=e("<div class='pwi_overviewmap' />");var C=e("<a class='fancybox.inline' href='#map_canvas' rel='map_overview-"+E+"' >"+i.labels.showMap+"</a>");if(e.browser.msie&&parseFloat(e.browser.version)<8){C[0].href="#map_canvas"}N.append(C);r.append(N);r.append(s.clearDiv);var k=e("<div style='display:none' />");var L=e(window).height()*.75;var A=e(window).width()*.75;k.append("<div id='map_canvas' style='width: "+A+"px; height: "+L+"px' />");r.append(k);e.fn.pwi.additionalMapsSettings=T}if(f>i.maxResults){$pageCount=f/i.maxResults;var O=e("<div class='pwi_prevpage'/>").text(i.labels.prev),M=e("<div class='pwi_nextpage'/>").text(i.labels.next);d=e("<div class='pwi_pager'/>");if(i.page>1){O.addClass("link").bind("click.pwi",function(e){e.stopPropagation();i.page=parseInt(i.page,10)-1;w();return false})}d.append(O);if(i.showPageCounter){for(var _=1;_<$pageCount+1;_++){if(_==i.page){u="<div class='pwi_pager_current'>"+_+"</div> "}else{u=e("<div class='pwi_pager_page'>"+_+"</div>").bind("click.pwi",_,function(e){e.stopPropagation();i.page=e.data;w();return false})}d.append(u)}}if(i.page<$pageCount){M.addClass("link").bind("click.pwi",function(e){e.stopPropagation();i.page=parseInt(i.page,10)+1;w();return false})}d.append(M);d.append(s.clearDiv)}if(d.length>0&&(i.showPager==="both"||i.showPager==="top")){r.append(d)}l(t.feed.entry,i.sortPhotos);var D=(i.page-1)*i.maxResults;var P=i.maxResults*i.page;for(var H=0;H<f;H++){var B=h(t.feed.entry[H],!(H>=D&&H<P),E);r.append(B)}if(d.length>0&&(i.showPager==="both"||i.showPager==="bottom")){r.append(d.clone(true))}if(i.showPermaLink){r.append(s.clearDiv);var j=e("<div id='permalinkenable' class='pwi_nextpage'/>").text(i.labels.showPermaLink).bind("click.pwi",_,function(t){t.stopPropagation();e("#permalinkbox").show();e("#permalinkenable").hide();return false});var F=document.URL.split("?",2);var I=F[0]+"?pwi_album_selected="+t.feed.gphoto$name.$t+"&pwi_albumpage="+i.page;r.append(j);var q=e("<div style='display:none;' id='permalinkbox' />");var R=e("<form />");var U=e("<input type='text' size='40' name='PermaLink' readonly />").val(I);R.append(U);q.append(R);r.append(q)}i.photostore[i.album]=t;var z=e(".pwi_photo",r).css(i.thumbCss);i.popupExt(z.find("a[rel='lb-"+E+"']"));i.popupExt(z.find("a[rel='yt-"+E+"']"),"yt");i.popupExt(z.find("a[rel='map-"+E+"']"),"map");var z=e(n.selector+" div.pwi_overviewmap",r).css(i.thumbCss);i.popupExt(z.find("a[rel='map_overview-"+E+"']"),"map_overview");r.append(s.clearDiv);if(typeof i.onAlbumEnd==="function"){i.onAlbumEnd(t.feed.entry,r)}S(false,r);c("div.pwi_photo")}function v(t){var r=e("<div/>"),o=t.feed?t.feed.entry.length:0,u=0;var a=i.username.replace(/[@\.]/g,"_")+i.selector;l(t.feed.entry,i.sortPhotos);while(u<i.maxResults&&u<o){var f=h(t.feed.entry[u],false,a);r.append(f);u++}r.append(s.clearDiv);var p=e(".pwi_photo",r).css(i.thumbCss);i.popupExt(p.find("a[rel='lb-"+a+"']"));i.popupExt(p.find("a[rel='yt-"+a+"']"),"yt");i.popupExt(p.find("a[rel='map-"+a+"']"),"map");var p=e(n.selector+" div.pwi_overviewmap",r).css(i.thumbCss);i.popupExt(p.find("a[rel='map_overview-"+a+"']"),"map_overview");S(false,r);c("div.pwi_photo")}function m(e){e.stopPropagation();e.preventDefault();i.onclickAlbumThumb(e)}function g(e){e.stopPropagation();e.preventDefault();i.onclickThumb(e)}function y(){if(i.albumstore.feed){p(i.albumstore)}else{S(true,"");var t=s.picasaUrl+i.username+"?kind=album&access="+i.albumTypes+"&alt=json&thumbsize="+i.albumThumbSize+(i.albumCrop?"c":"u");e.getJSON(t,"callback=?",p)}return r}function b(t){var n=[94,110,128,200,220,288,320,400,512,576,640,720,800,912,1024,1152,1280,1440,1600];if(i.photoSize==="auto"){var r=e(window).height();var s=e(window).width();var o=r>s?s:r;for(var u=1;u<n.length;u++){if(o<n[u]){return n[u-1]}}}else{return t}}function w(){if(i.photostore[i.album]){d(i.photostore[i.album])}else{var t=s.picasaUrl+i.username+(i.album!==""?"/album/"+i.album:"")+"?kind=photo&alt=json"+(i.authKey!==""?"&authkey="+i.authKey:"")+(i.keyword!==""?"&tag="+i.keyword:"")+"&imgmax=d&thumbsize="+i.thumbSize+(i.thumbCrop?"c":"u")+","+b(i.photoSize);S(true,"");e.getJSON(t,"callback=?",d)}return r}function E(){S(true,"");var t=s.picasaUrl+i.username+(i.album!==""?"/album/"+i.album:"")+"?kind=photo&max-results="+i.maxResults+"&alt=json&q="+(i.authKey!==""?"&authkey="+i.authKey:"")+(i.keyword!==""?"&tag="+i.keyword:"")+"&imgmax=d&thumbsize="+i.thumbSize+(i.thumbCrop?"c":"u")+","+b(i.photoSize);e.getJSON(t,"callback=?",v);return r}function S(t,n){if(t){if(i.loadingImage.length>0){e(i.loadingImage).show()}document.body.style.cursor="wait";if(e.blockUI){r.block(i.blockUIConfig)}}else{if(i.loadingImage.length>0){e(i.loadingImage).hide()}document.body.style.cursor="default";if(e.blockUI){r.unblock()}r.html(n)}}var r,i={},s={};n=e.extend(true,{},e.fn.pwi.defaults,n);n.selector=this.selector;if(n.popupPlugin==""){if(e.fn.fancybox){n.popupPlugin="fancybox"}else if(e.fn.colorbox){n.popupPlugin="colorbox"}}if(n.popupExt==""){if(n.popupPlugin==="fancybox"){n.popupExt=function(e,t){t=typeof t!="undefined"?t:"lb";if(t==="lb"){e.fancybox(n.fancybox_config.config_photos)}else if(t==="yt"){e.fancybox(n.fancybox_config.config_youtube)}else if(t==="map"){e.fancybox(n.fancybox_config.config_maps)}else if(t==="map_overview"){e.fancybox(n.fancybox_config.config_map_overview)}}}else if(n.popupPlugin==="colorbox"){n.popupExt=function(e,t){t=typeof t!="undefined"?t:"lb";if(t==="lb"){e.colorbox(n.colorbox_config.config_photos)}else if(t==="yt"){e.colorbox(n.colorbox_config.config_youtube)}else if(t==="map"){e.colorbox(n.colorbox_config.config_maps)}else if(t==="map_overview"){e.colorbox(n.colorbox_config.config_map_overview)}}}}t=this;o()};e.fn.pwi.defaults={mode:"albums",username:"",album:"",authKey:"",albums:[],keyword:"",albumKeywords:[],albumStartDateTime:"",albumEndDateTime:"",albumCrop:true,albumTitle:"",albumThumbSize:160,albumThumbAlign:true,albumMaxResults:999,albumsPerPage:999,albumPage:1,albumTypes:"public",page:1,photoSize:"auto",maxResults:50,showPager:"bottom",thumbSize:72,thumbCrop:false,thumbAlign:false,thumbCss:{margin:"5px"},onclickThumb:"",onclickAlbumThumb:"",onAlbumsStart:"",onAlbumsEnd:"",onAlbumStart:"",onAlbumEnd:"",ownRelTag:"",sortAlbums:"none",sortPhotos:"none",removeAlbums:[],removeAlbumTypes:[],showAlbumTitles:true,showAlbumTitlesLength:9999,showAlbumThumbs:true,showAlbumdate:true,showAlbumPhotoCount:true,showAlbumDescription:true,showAlbumLocation:true,showPhotoCaption:false,showPhotoCaptionDate:false,showCaptionLength:9999,showPhotoDownload:false,showPhotoDownloadPopup:false,showPhotoDate:true,showPhotoFilename:false,showPermaLink:false,showPhotoLocation:false,showPageCounter:true,mapIconLocation:"",mapSize:.75,useQueryParameters:true,loadingImage:"",videoBorder:"images/video.jpg",labels:{photo:"photo",photos:"photos",downloadphotos:"Download photos",albums:"Back to albums",noalbums:"No albums available",page:"Page",prev:"Previous",next:"Next",showPermaLink:"Show PermaLink",showMap:"Show Map",fileName:"Filename:",videoNotSupported:"Video not supported"},months:["January","February","March","April","May","June","July","August","September","October","November","December"],fancybox_config:{config_photos:{closeClick:false,nextEffect:"none",loop:false,beforeLoad:formatPhotoTitleFancyBox,helpers:{buttons:{}}},config_youtube:{arrows:false,fitToView:false,width:"90%",height:"90%",autoSize:false,closeClick:false,openEffect:"none",closeEffect:"none"},config_maps:{arrows:false,width:"90%",height:"90%"},config_map_overview:{arrows:false,afterShow:mapOverviewCallback}},colorbox_config:{config_photos:{title:formatPhotoTitleColorBox,loop:false,slideshow:true,slideshowAuto:false},config_youtube:{iframe:true,innerWidth:"80%",innerHeight:"80%",rel:"nofollow"},config_maps:{iframe:true,innerWidth:"80%",innerHeight:"80%",rel:"nofollow"},config_map_overview:{inline:true,rel:"nofollow",onComplete:mapOverviewCallback}},blockUIConfig:{message:"<div class='lbLoading pwi_loader'>loading...</div>",css:"pwi_loader"},albumstore:{},photostore:{},popupPlugin:"",popupExt:"",token:"",selector:""};e.fn.pwi.strings={clearDiv:"<div style='clear: both;height:0px;'/>",picasaUrl:"http://picasaweb.google.com/data/feed/api/user/"}})(jQuery)
