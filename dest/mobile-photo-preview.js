/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-04-08
 * Time: 11:52:47
 * Contact: 55342775@qq.com
 */

(function(e,t){typeof define=="function"&&define.amd?define("dialog",["$"],t):typeof exports=="object"?module.exports=t():e.Dialog=t(window.Zepto||window.jQuery||$)})(this,function(e){e.fn.Dialog=function(n){var r=[];return e(this).each(function(){var i=new t,s=e.extend({trigger:e(this)},n);i.init(s),r.push(i)}),r},e.Dialog=function(n){if(n.type==="alert"){var r=new t,i='<div class="ui-alert-title">'+n.content+"</div>",s="";n.button?(typeof n.button=="boolean"&&(n.button="确定"),s='<p class="ui-dialog-action"><button class="ui-alert-submit  js-dialog-close">'+n.button+"</button></p>"):n.timer||(n.timer=3e3),i+=s;var o=e.extend({target:i,animate:!0,show:!0,mask:!0,className:"ui-alert",afterHide:function(e){this.dispose(),n.callback&&n.callback()}},n);r.init(o),n.timer&&setTimeout(function(){r.dispose(),n.callback&&n.callback()},n.timer)}if(n.type==="confirm"){var u=new t,i='<div class="ui-confirm-title">'+n.content+"</div>",s="";n.buttons||(n.buttons=[{yes:"确定"},{no:"取消"}]);var a="";for(var f=0,l=n.buttons.length;f<l;f++){var c=n.buttons[f];c.yes&&(a+='<td><button class="ui-confirm-submit " data-type="yes">'+c.yes+"</button></td>"),c.no&&(a+='<td><button class="ui-confirm-no" data-type="no">'+c.no+"</button></td>"),c.close&&(a+='<td><button class="ui-confirm-close js-dialog-close" data-type="close">'+c.close+"</button></td>")}s='<table class="ui-dialog-action"><tr>'+a+"</tr></table>",i+=s;var h=e.extend({target:i,animate:!0,show:!0,mask:!0,className:"ui-alert",afterHide:function(e){this.dispose()},beforeShow:function(t){u.touch(e(".ui-confirm-submit",t),function(){n.callback&&n.callback.call(u,"yes",t)}),u.touch(e(".ui-confirm-no",t),function(){n.callback&&n.callback.call(u,"no",t)}),u.touch(e(".ui-confirm-close",t),function(){n.callback&&n.callback.call(u,"close",t)})}},n);u.init(h)}},e.alert=function(t,n,r,i){e.Dialog({content:t,button:n,timer:i,callback:r,zIndex:100,type:"alert"})},e.confirm=function(t,n,r){e.Dialog({content:t,buttons:n,callback:r,zIndex:100,type:"confirm"})};var t=function(){var t=Math.random().toString().replace(".","");this.id="dialog_"+t,this.settings={},this.settings.closeTpl=e('<span class="ui-dialog-close js-dialog-close">x</span>'),this.settings.titleTpl=e('<div class="ui-dialog-title"></div>'),this.timer=null,this.showed=!1,this.mask=e()};return t.prototype={init:function(t){var n=this;this.settings=e.extend({},this.settings,t),this.settings.mask&&(this.mask=e('<div class="ui-dialog-mask"/>'),e("body").append(this.mask)),e("body").append('<div class="ui-dialog" id="'+this.id+'"></div>'),this.dialogContainer=e("#"+this.id);var r=this.settings.zIndex||10;this.dialogContainer.css({zIndex:r}),this.settings.className&&this.dialogContainer.addClass(this.settings.className),this.mask.css({zIndex:r-1}),this.settings.closeTpl&&this.dialogContainer.append(this.settings.closeTpl),this.settings.title&&(this.dialogContainer.append(this.settings.titleTpl),this.settings.titleTpl.html(this.settings.title)),this.bindEvent(),this.settings.show&&this.show()},touch:function(t,n){function i(e){return n.call(this,e)}var r;e(t).on("click",i),e(t).on("touchmove",function(e){r=!0}).on("touchend",function(e){e.preventDefault();if(!r){var t=n.call(this,e,"touch");t||(e.preventDefault(),e.stopPropagation())}r=!1})},bindEvent:function(){var t=this;this.settings.trigger&&(e(this.settings.trigger).click(function(){t.show()}),t.touch(e(this.settings.trigger),function(){t.show()})),e(this.dialogContainer).delegate(".js-dialog-close","click",function(){return t.hide(),!1}),e(window).resize(function(){t.setPosition()}),e(window).scroll(function(){t.setPosition()}),e(window).keydown(function(e){e.keyCode===27&&t.showed&&t.hide()})},dispose:function(){this.dialogContainer.remove(),this.mask.remove()},hide:function(){var t=this;t.settings.beforeHide&&t.settings.beforeHide.call(t,t.dialogContainer),this.showed=!1,this.mask.hide(),this.settings.animate?(this.dialogContainer.removeClass("zoomIn").addClass("zoomOut"),setTimeout(function(){t.dialogContainer.hide(),typeof t.settings.target=="object"&&e("body").append(t.dialogContainer.hide()),t.settings.afterHide&&t.settings.afterHide.call(t,t.dialogContainer)},500)):(this.dialogContainer.hide(),typeof this.settings.target=="object"&&e("body").append(this.dialogContainer),this.settings.afterHide&&this.settings.afterHide.call(this,this.dialogContainer))},show:function(){typeof this.settings.target=="string"?/^(\.|\#\w+)/gi.test(this.settings.target)?this.dailogContent=e(this.settings.target):this.dailogContent=e("<div>"+this.settings.target+"</div>"):this.dailogContent=this.settings.target,this.mask.show(),this.dailogContent.show(),this.height=this.settings.height||"auto",this.width=this.settings.width||"auto",this.dialogContainer.append(this.dailogContent).show().css({height:this.height,width:this.width}),this.settings.beforeShow&&this.settings.beforeShow.call(this,this.dialogContainer),this.showed=!0,this.setPosition(),this.settings.animate&&this.dialogContainer.addClass("zoomIn").removeClass("zoomOut").addClass("animated")},setPosition:function(){if(this.showed){var e=this;this.dialogContainer.show(),this.height=this.settings.height,this.width=this.settings.width,isNaN(this.height)&&(this.height=this.dialogContainer.outerHeight&&this.dialogContainer.outerHeight()||this.dialogContainer.height()),isNaN(this.width)&&(this.width=this.dialogContainer.outerWidth&&this.dialogContainer.outerWidth()||this.dialogContainer.width());var t=document.documentElement.clientHeight||document.body.clientHeight,n=document.documentElement.clientWidth||document.body.clientWidth,r=this.width/2,i=this.height/2,s=n/2-r,o=t/2-i;s=Math.max(0,s),o=Math.max(0,o),e.dialogContainer.css({position:"fixed",top:o,left:s})}}},t}),function(e,t){typeof define=="function"&&define.amd?define("mobile-photo-preview",["$","dialog"],t):typeof exports=="object"?module.exports=t():e.MobilePhotoPreview=t($,Dialog)}(this,function(e,t){function n(){var e=Math.random().toString().replace(".","");this.id="mp_"+e,this.currentIndex=1,this.sum=1,this.arr=[],this.objArr={},this.dialog,this.bloom=!0}return e.fn.MobilePhotoPreview=function(t){e(this).each(function(){var r=new n;r.init(e.extend({target:e(this)},t))})},n.prototype={init:function(t){this.settings=e.extend({animate:!0},t),this.target=e(this.settings.target),this.trigger=this.settings.trigger||"a",this.bloom=this.settings.bloom,this.bindEvent()},touch:function(t,n,r){function o(e){return r.call(this,e)}var i,s=!1;typeof n=="function"&&(r=n),e(t).on("touchmove",n,function(e){i=!0}).on("touchend",n,function(e){e.preventDefault();if(!i){var t=r.call(this,e,"touch");t===!1&&(e.preventDefault(),e.stopPropagation())}i=!1}),e(t).on("click",n,o)},bindEvent:function(){var e=this;e.touch(e.target,e.trigger,function(){return e.initDailog.call(e,this),!1})},bindSlide:function(){var t=this,n={},r=0,i={},s=!1,o={};t.imgPreview.on("touchstart",function(t){n={x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY};if(t.targetTouches.length==2)return s=!1,!1;o=e(this).position(),r=t.changedTouches[0].pageX}),t.imgPreview.on("touchmove",function(r){return r.targetTouches.length==2?!1:(s=!0,i={x:r.changedTouches[0].pageX,y:r.changedTouches[0].pageY},t.bloom?(o={left:o.left+(i.x-n.x),top:o.top+(i.y-n.y)},e(this).css(o)):(o.left=o.left+(i.x-n.x),e(this).css({left:o.left})),n=i,!1)}),t.imgPreview.on("touchend",function(o){i={x:o.changedTouches[0].pageX,y:o.changedTouches[0].pageY};if(o.targetTouches.length==1)return n=i,!1;var u=e(this).position(),a={left:u.left+(i.x-n.x),top:u.top+(i.y-n.y)};e(this).css(a);var f=Math.abs(a.left/t.maxWidth),l=f.toString().split("."),c=0,h=l.length>1?"0."+l[1]:0;h>.3?c=Math.ceil(f):c=Math.floor(f),t.currentIndex=c,r<i.x&&t.currentIndex--,t.currentIndex<0&&(t.currentIndex=0),t.currentIndex>=t.arr.length&&(t.currentIndex=t.arr.length-1),t.go(t.settings.animate),s=!1})},go:function(t){var n=this,r=n.currentIndex*n.maxWidth;t=t?"animate":"css",e(n.imgPreview)[t]({left:-r,top:0},200);var i=n.dialog.dialogContainer;e(".imgViewTop em",i).html(n.currentIndex+1+"/"+n.arr.length),n.current=e(n.arr[n.currentIndex]),n.settings.callback&&n.settings.callback.call(n,n.objArr[n.currentIndex],n.currentIndex)},initDailog:function(n){var r=this;r.dialog=null,r.dialog=new t,r.arr=r.target.find(r.trigger),r.sum=r.arr.length,r.currentIndex=e(n).index();var i=document.documentElement.clientHeight||document.body.clientHeight,s=document.documentElement.clientWidth||document.body.clientWidth,o=e.extend({target:'<div class="imgViewTop"><em>'+(r.currentIndex+1)+"/"+r.sum+'</em></div><div class="pos-relative"><div id="imgPreview"></div></div><div id="imgTitle"></div>',animate:!0,show:!0,width:s,height:i,mask:!0,className:"ui-preview",afterHide:function(e){this.dispose(),r.settings.hide&&r.settings.hide()},beforeHide:function(){var t=r.imgPreview.children()[r.currentIndex];e(t).siblings().hide()},beforeShow:function(t){var n=this;r.imgPreview=e("#imgPreview",t),r.format(t),r.bindSlide(),r.go(!1),r.settings.show&&r.settings.show.call(r,r.dialog.dialogContainer),r.imgPreview.on("click",function(){n.dispose()})}},{});r.dialog.init(o)},hide:function(){this.dialog.hide()},format:function(t){function f(t){length++;var r=e(n.imgPreview.children().get(t)),i=e(this);r.html(i),r.css("background","transparent"),n.objArr[t]={src:this.src,height:this.height,width:this.width,elem:i,index:t},n.objArr.length=length,n.initSize(t)}var n=this;this.length=0;var r="";for(var i=0,s=n.arr.length;i<s;i++){var o=e(n.arr[i]),u='style="visibility:hidden;"';i==n.currentIndex&&(u='style="display:block;"');var a=o.attr("href")||o.find("input").val()||o.find("img").attr("src");r+="<div "+u+"></div>",function(e,t,n){setTimeout(function(){var e=new Image;e.src=n,e.complete?f.call(e,t):(e.onreadystatechange=function(){(this.readystate=="complete"||this.readyState=="loaded")&&f.call(this,t)},e.onload=function(){f.call(this,t)})},100)}(o,i,a)}n.imgPreview.html(r),setTimeout(function(){n.imgPreview.children().css("visibility","visible")},500),n.setSize(),e(window).resize(e.proxy(n.setSize,n))},setSize:function(){var t=this,n=t.dialog.dialogContainer,r=document.documentElement.clientHeight||document.body.clientHeight,i=document.documentElement.clientWidth||document.body.clientWidth;this.maxHeight=r-e(".imgViewTop",n).height()-e(".imgTitle",n).height(),this.maxWidth=i,t.imgPreview.width(this.maxWidth*t.arr.length),t.imgPreview.height(this.maxHeight),t.imgPreview.children("div").width(this.maxWidth)},initSize:function(e){var t=this.objArr[e];if(this.maxHeight<t.height){t.elem.height(this.maxHeight);var n=this.maxHeight*t.width/t.height;t.elem.width(n),t.height=this.maxHeight,t.width=n}if(this.maxWidth<t.width){t.elem.width(this.maxWidth);var r=this.maxWidth*t.height/t.width;t.elem.height(r),t.height=r,t.width=this.maxWidth}var i=(this.maxHeight-t.height)/2,s=(this.maxWidth-t.width)/2;t.elem.css({top:i,left:s})}},n});