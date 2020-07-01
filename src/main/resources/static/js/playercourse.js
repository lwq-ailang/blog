//var videoDom = null;
//function loadVideo(vid){
//	videoDom = polyvObject('#playerboxinner').previewPlayer({
//	 	'width':'1280',
//	  	'height':'720',
//	    'vid' : vid,
//	    "priorityMode":"video",//默认打开视频模式还是音频模式，需要该视频有对应的音频转码可选video/audio
//	    "volume":0.72,//视频默认音量大小，范围 (0, 1)，播放器会记录上一次播放的音量
//	    'loop':false,//视频播放结束后是否循环播放
//	    'forceH5':true,//支持html5播放器
//		"autoplay":false,//是否自动播放
//		"screenshot":true,//是否开启视频截图功能
//		'showHd':true,//是否显示清晰度选择
//		"ban_seek_by_limit_time":false,//是否禁止视频拖拽
//		'code':"出品网址：http://www.itbooking.net",//跑马灯设置中自定义的code值
//		'speed':[2,1.8,1.5, 1.2, 0.75]
//	 });
//};
//
////播放
//function mk_resume(){
//	videoDom.j2s_resumeVideo();
//};
//
////暫停
//function mk_pause(){
//	videoDom.j2s_pauseVideo();
//};
//
////跳转
//function mk_seek(_sec){
//	videoDom.j2s_seekVideo(_sec);
//};
//
//
////停止
//function mk_stop(){
//	videoDom.j2s_stopVideo();
//};
//
////播放下一个
//function mk_nextVideo(vid){
//	try{
//		videoDom.changeVid(vid);
//	}catch(e){}
//};
//
//function s2j_onFullScreen(){
//
//}
//
//function s2j_onNormalScreen(){
//}
//
////播放完毕
//function s2j_onPlayOver(){
//	
//}
//
///*播放器加载完毕以后执行的函数*/
//function s2j_onPlayerInitOver(){
//
//	$(".pv-rate-select >div").on("click",function(){
//		var rate = $(this).data("rate");
//		setSession("speed",rate);
//	});
//	
//	var speed = getSession("speed") || 1;
//	$(".pv-rate-btn").find("span").text(speed+"x");
//	$("div[data-rate='"+speed+"']").addClass("pv-active")
//}
//
//function s2j_onPptDataParam(){
//}
//
//function s2j_onInteractionData(){
//}
//
//function s2j_onVideoSeek(){
//}
//
//function s2j_onPlayerError(){
//}
//
//function s2j_onVideoPlay(){
//	var speed = getSession("speed") || 1;
//	$(".pv-rate-btn").find("span").text(speed+"x");
//	$("div[data-rate='"+speed+"']").addClass("pv-active").trigger("click");
//};
//
//function s2j_onVideoPause(){
//};
///*******************************************播放器相关 end  ******************************************************/
//
//
///*******************************************记录播放的章节 start  ******************************************************/
//function recoredLesson($obj,callback){
//	var lessonId = $obj.data("opid");
//	var chapterId = $obj.data("chapterid");
//	var courseId = $obj.data("courseid");
//	var params = {
//		courseId:courseId,
//		chapterId:chapterId,
//		lessonId:lessonId,
//	};
//	
//	request(rootPath+"/user/updateuserhits",function(response){
//		if(response.status==200){
//			callback && callback(response);
//			//增加积分
//			var title = $(".title-link").eq(0).text();
//			//增加积分
//			updateUserJifen({
//				description:"点播课程【"+title+"】",
//				mark:courseId,
//				type:4,
//				url:window.location.href,
//			});
//			removeSession("studyhtml",true);
//		}else if(response.status==500){
//			callback && callback(response);
//		}else if(response.status==407){
//			var height = window.innerHeight-100;
//			if(window.innerHeight<700)height = 600;
//			if(window.innerHeight>900)height = 680;
//			$.tzIframe({width:1360,height:height,content:rootPath+"/gopay",showButton:false,background:"#fff"});
//		}
//	},params);
//};	
//
//function recoredLessonisfree($obj,callback){
//	var lessonId = $obj.data("opid");
//	var chapterId = $obj.data("chapterid");
//	var courseId = $obj.data("courseid");
//	var params = {
//		courseId:courseId,
//		chapterId:chapterId,
//		lessonId:lessonId,
//	};
//	
//	request(rootPath+"/user/updateuserhitsfree",function(response){
//		if(response.status==200){
//			callback && callback(response);
//			var title = $(".title-link").eq(0).text();
//			//增加积分
//			updateUserJifen({
//				description:"点播课程【"+title+"】",
//				mark:courseId,
//				type:4,
//				url:window.location.href,
//			});
//			removeSession("studyhtml",true)
//		}else if(response.status==500){
//			callback && callback(response);
//		}else if(response.status==406){
//			loading("不是免费的章节.....",5);
//		}
//	},params);
//};	
//
//
//
///*******************************************记录播放的章节  end  ******************************************************/
//
//
///*******************************************记录播放的章节  start  ******************************************************/
//function countCourseLoves(){
//	request(rootPath+"/user/countCoueseLoves",function(response){
//		if(response.status==200){
//			$(".lovec").addClass("active");
//		}
//	},{courseId:$("body").data("opid")});
//}
//
//function saveCourseLoves(){
//	mkLogin.loginSuccessD(function(flag){
//		request(rootPath+"/user/saveCoueseLoves",function(response){
//			if(response.data=="cfail" || response.data=="success" ){
//				$(".lovec").addClass("active animated2 bounceIn");
//			}else{
//				$(".lovec").removeClass("active animated2 bounceIn");
//			}
//		},{courseId:$("body").data("opid")});
//	})
//}
//
//function selectUserstudyCourse(){
//	request(rootPath+"/user/selectUserstudyCourse",function(response){
//		if(isNotEmpty(response.data)){
//			var result = response.data;
//			for(var i=0;i<result.length;i++){
//				$("#play_"+result[i].courseId+"_"+result[i].chapterId+"_"+result[i].lessonId).find("a").addClass("active").next().html('<i class="iconfont icon-dian green fz32"></i>');
//			}
//			countPercent();
//		}
//	},{courseId:$("body").data("opid")});
//};
//
//function countPercent(){
//	var total = $(".lesson-items-link-box").length;
//	var slen = $(".lesson-items-link.active").length;
//	var percent = Math.ceil(slen / total * 100) ;
//	$("#percentnum").addClass("animated bounceIn").text(percent+"%");
//	setTimeout(function(){
//		$("#percentnum").removeClass("animated bounceIn");
//	},300);
//	
//}
///*******************************************记录播放的章节  end  ******************************************************/
//
//function loginSuccessBack(){
//	countCourseLoves();
//	selectUserstudyCourse();
//	loadSession();
//}
//
//$(function(){
//	$(window).on("resize load",function(){
//		var width = $(this).width();
//		var height = $(this).height();
//		if(width>1560 && height>720){
//			$(".pv-video-player").width(1280).height(720);
//			$("#playerboxinner").css({marginLeft:-640,marginTop:-360})
//		}else{
//			if(width>1380){
//				$(".pv-video-player").width(1080).height(580);
//				$("#playerboxinner").css({marginLeft:-540,marginTop:-290})
//			}else{
//				$(".pv-video-player").width(800).height(500);
//				$("#playerboxinner").css({marginLeft:-400,marginTop:-250})
//			}
//		}
//	});
//	
//	var lessonId = null;
//	$(".lesson-items-link-box").on("click",function(){
//		var $this = $(this);
//		var cfvid = $this.data("vid");
//		if(isEmpty(cfvid) || cfvid=="szqq"){
//			loading("课程准备中...",4);
//			return;
//		}
//		var lid = $(this).data("opid");
//		if(lessonId && lessonId==lid){
//			return;
//		}
//		lessonId = lid;
//		$(".lesson-items-link").removeClass("checked");
//		$this.find("a").addClass("checked active").next().html('<i class="iconfont icon-dian green fz32"></i>');
//		mkLogin.loginSuccessD(function(flag){
//			$("#editbox").html('<a href="'+rootPath+'/admin/editcourse/'+$this.data("courseid")+'" id="editbox" target="_blank"><i class="fa fa-edit fz20"></i></a>');
//			window.location.href = "#"+$this.attr("id");
//			var isFree = $this.data("isfree");
//			if(isFree==0){
//				recoredLessonisfree($this,function(){
//					var fvid = $this.data("vid");
//					loadVideo(dencryption(fvid,5));
//					countPercent();
//					$this.find("a").addClass("checked");
//				});
//			}else{
//				recoredLesson($this,function(reponse){
//					var vid = $this.data("vid");
//					loadVideo(dencryption(vid,5));
//					countPercent();
//					$this.find("a").addClass("checked");
//				});
//			}
//		});
//	});
//
//	
//	var currentLink = window.location.href;
//	var infos =currentLink.split("#");
//	if(infos.length>1){
//		if($("#"+infos[1]).length==1){
//			$("#"+infos[1]).trigger("click");
//		}else{
//			$(".lesson-items-link-box").eq(0).trigger("click");
//		}
//	}else{
//		$(".lesson-items-link-box").eq(0).trigger("click");
//	}
//});