# mobile-photo-preview
手机端图片查看预览
![预览效果:](/example/mobile-photo-preview.png "点击预览效果")
#使用方法案例:
		<script>
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
		</script>