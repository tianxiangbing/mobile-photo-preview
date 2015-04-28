# mobile-photo-preview
手机端图片查看预览
例子见[DEMO](http://www.lovewebgames.com/jsmodule/mobile-photo-preview.html)  
![预览效果:](/example/mobile-photo-preview.png "点击预览效果")
#使用方法案例:
		var photoPreview = new MobilePhotoPreview();
		photoPreview.init({
			target: $('.preview-list'),
			trigger: '.preview',
			show: function(c) {
				var del = $('<span class="icon-del"><span>');
				$('.imgViewTop', c).append(del);
				del.tap(function() {
					photoPreview.current.remove();
					photoPreview.hide();
				});
			}
		});
##或者：
		$('.preview-list').MobilePhotoPreview({
			trigger: '.preview',
			show: function(c) {
				var del = $('<span class="icon-del"><span>');
				$('.imgViewTop', c).append(del);
				var _this = this;
				del.tap(function() {
					_this.current.remove();
					_this.hide();
				});
			}
		});
*注：两种方法没有本质的区别，推荐第一种。*
#API 属性、方法及回调：
##target:
		表示是在这个容器内的元素会触发事件，它是一个范围，与trigger一同使用，委托事件节点，所以是必须的。建议不作根结点的委托.
##trigger:
		表示触发事件的对象，它可以是动态的，默认是target下面的a链接触发
##show:
		显示之后的回调，参数是dialog容器，当前this指向MobilePhotoPreview的实例。这是一个为了扩展更多功能的回调方法。为了更好的用到这个回调，你可以会对下面的属性有兴趣了解
##animate:
		滑动时的动画效果 ，默认是true,但如果性能上有问题，建议改成false
#this下的属性及方法：
## current:
		当前的结点对象
##currentIndex:
		当前索引
##objArr:
		数组对象，在这里，你可以得到一个集合，包括索引、element、宽、高。这将会是很有用的东西。
##hide:
		调用的是dialog的hide.
