var templates=[];

 templates['from-table-merchant']=`
		<tr>

			<td>公司名称：</td>

			<td><input type="text" name="corporation" placeholder="请输入信用代码..." class="btn-lg"></td>

		</tr>

		<tr>

			<td>类型：</td>

			<td>

			<label for="man"><input type="radio" name="merchant_type" value="1"  class="btn-lg" id="man" checked> 个体工商户</label>

			<label for="nv"><input type="radio" name="merchant_type" value="2"  class="btn-lg" id=nv> 企业</label>

			</td>

		</tr>

		<tr>

			<td>信用代码：</td>

			<td><input type="text" name="card"  placeholder="请输入信用代码..." class="btn-lg"></td>

		</tr>

		<tr>

			<td>法人代表：</td>

			<td><input type="text" name="real_name" placeholder="请输入法人代表姓名..." class="btn-lg"></td>

		</tr>

		<tr>

			<td >联系手机：</td>

			<td><input type="text" name="office_phone" placeholder="手机号..."  class="btn-lg"></td>

		</tr>

		<tr>

			<td>营业执照：</td>

			<td><input type="file" name="business" id="business" placeholder="上传营业执照..." class="btn-lg" onchange="updateimage(this,'business_card','show_img',1080,1528);"></td>
			<input type="hidden" name="business_card" id="business_card">
      <input type="hidden" name="user_type" id="user_type" value="1">

		</tr>

		<tr>

			<td></td>

			<td id="show_img"><img src=""></td>

		</tr>

`;

function check_type(id,obj){

  if(id=='from-table'){

    window.location.reload();return;

  }else{
    $('.check_type').css('background','white');
    $(obj).css('background','#e94631');
    $(obj).css('color','white');
    $('#from-table').html(templates[id]);return;

  }


}

function updateimage(obj,imgid,show,whidth,height){

	// 压缩图片需要的一些元素和对象
	var reader = new FileReader();

	// 选择的文件对象
	var file = null;

	// 缩放图片需要的canvas
	var canvas = document.createElement('canvas');
		canvas.display='none';
	var context = canvas.getContext('2d');

	img=new Image();

	// base64地址图片加载完毕后
	img.onload = function(){

	    // 图片原始尺寸
	    var originWidth = this.width;

	    var originHeight = this.height;

	    // 最大尺寸限制
	    var maxWidth = whidth, maxHeight = height;

	    // 目标尺寸
	    var targetWidth = originWidth, targetHeight = originHeight;

	    // 图片尺寸超过400x400的限制
	    if (originWidth > maxWidth || originHeight > maxHeight) {
	        if (originWidth / originHeight > maxWidth / maxHeight) {
	            // 更宽，按照宽度限定尺寸
	            targetWidth = maxWidth;
	            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
	        } else {
	            targetHeight = maxHeight;
	            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
	        }
	    }

	    // canvas对图片进行缩放
	    canvas.width = targetWidth;

	    canvas.height = targetHeight;

	    // 清除画布
	    context.clearRect(0, 0, targetWidth, targetHeight);
	    // 图片压缩
	    context.drawImage(img, 0, 0, targetWidth, targetHeight);

	    var src=canvas.toDataURL("image/png",1);
	    document.getElementById(imgid).value=src;

	    if(show!=''){
	    	document.getElementById(show).innerHTML="<img src='"+src+"'>";
	    }

	}

		// 文件base64化，以便获知图片原始尺寸
		reader.onload = function(e) {

		    img.src = e.target.result;
		};

	    file = obj.files[0];
	    // 选择的文件是图片
	    if (file.type.indexOf("image") == 0) {
	        reader.readAsDataURL(file);
	    }

}
