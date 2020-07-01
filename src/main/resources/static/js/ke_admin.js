function updateUserJifen(params) {
    var score = randomRange
    request(rootPath + "/user/updateUserJifen", function (response) {
        if (response.status == 200) {
            loading("真棒，添加积分【" + response.data + "】成功!", 5);
        }
    }, params);
}

//防止session过期造成退出的问题5分钟重新发一次session
function loadSession() {
    setInterval(function () {
        request(basePath + "/loading");
    }, 300000);
};

function toHref(obj) {
    window.location.href = $(obj).data("href");
}

//全屏
function fullScreen(obj) {
    $(obj).addClass("open");
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    }
    ;
    return;
}

//退出全屏
function exitScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
}

//ie低版本的全屏，退出全屏都这个方法
function iefull() {
    var el = document.documentElement;
    var rfs = el.msRequestFullScreen;
    if (typeof window.ActiveXObject != "undefined") {
        //这的方法 模拟f11键，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

//防止session过期造成退出的问题5分钟重新发一次session
function loadSession() {
    setInterval(function () {
        request(rootPath + "/loading");
    }, 300000);
};

function loadingtip(target, mark) {
    $.loading({target: $(target).show(), mark: mark || 7});
};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 得到焦点
function editorFocus(id) {
    CKEDITOR.instances[id].focus();
}

// 获取带有格式的内容--html
function getEditorHtml(editorId) {
    var editor = CKEDITOR.instances[editorId];
    return editor.getData();
};

// 获取编辑器内容,纯文本 text
function getEditorText(editor) {
    var stemTxt = CKEDITOR.instances[editor].document.getBody().getText();
    return stemTxt;
};

// 插入编辑器内容--覆盖
function setEditorContent(editorId, message) {
    var editor = CKEDITOR.instances[editorId];
    editor.setData(message);
};

// 追加编辑器内容--追加
function appendEditorContent(editorId, message) {
    var editor = CKEDITOR.instances[editorId];
    editor.insertHtml(message);
};

/*错误损坏图片加载*/
function imgError(obj) {
    obj.src = rootPath + "/images/noimage.gif";
};

function filterTag(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
};

function filterScript(str) {
    return str.replace(/<script.*?>.*?<\/script>/ig, '');
};


/*ajax的封装*/
var request = function (url, callback, params) {
    KAjax.request({
        url: url, callback: function (data) {
            if (callback) callback(data);
        }
    }, params);
};


//设定时间格式化函数，使用new Date().format("yyyyMMddhhmmss");
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};


function delay(callback, timer) {
    setTimeout(callback, timer || 200);
}

function loadAnimate2($obj, type) {
    $obj.show().removeClass("animated").addClass("animated " + type).fadeOut(1000);
}

function loadAnimate($obj, from, to) {
    if (window.timer) clearTimeout(window.timer);
    $obj.show().removeClass(to).addClass("animated " + from);
    window.timer = setTimeout(function () {
        $obj.removeClass("animated2").removeClass(from).removeClass(to).addClass("animated2 " + to);
    }, 3000)
}


function loadYearPayOk(callback) {
    request(rootPath + "/admin/order/getOrderYear", function (data) {
        if (data) {
            var tip = "至尊超级会员【" + data.diffday + "天】";
            if (data.diffday > 0 && data.diffday <= 3) {
                tip = "至尊月会员【" + data.diffday + "天】";
            }
            if (data.diffday > 3 && data.diffday <= 7) {
                tip = "至尊周员【" + data.diffday + "天】";
            } else if (data.diffday > 7 && data.diffday <= 31) {
                tip = "至尊月会员【" + data.diffday + "天】";
            } else if (data.diffday > 31 && data.diffday <= 93) {
                tip = "至尊季度会员【" + data.diffday + "天】";
            } else if (data.diffday > 93 && data.diffday <= 200) {
                tip = "至尊半年会员【" + data.diffday + "天】";
            } else {
                tip = "至尊超级会员【" + data.diffday + "天】";
            }
            $(".mkyearorderbtn")
                .data("opid", data.id)
                .removeClass("btn-primary")
                .addClass("paybtn-red").find("span").html("已开通" + tip)
                .end()
                .find("i").removeClass("icon-next").addClass("icon-vip");
            $(".gobuy").removeClass("gobuy").off("click").find("span").text("已订阅 ")
            callback && callback(data);
        } else {
            callback && callback(false);
        }
    });
}


function loadCourseBuy() {
    var opid = $("body").data("opid");
    request(rootPath + "/admin/courseuser/pubbuy", function (response) {
        if (response.status == 210 || response.status == 200) {
            var link = $("body").data("link");
            $(".gobuy").removeClass("gobuy");
            $(".paylink").removeClass("gobuy").off("click").attr({
                'href': link,
                'target': "_blank"
            }).html("<button class=\"course-btn sign-up\"><i class=\"iconfont icon-iconheartbeat\"></i>立即学习</button>")
            $(".onlinelink").html("<button class=\"course-btn free-study\"><i class=\"iconfont icon-video1\"></i>进入直播教室</button>").on("click", function () {
            })
        }
    }, {courseId: opid});
}


function loadCourseBuyCallback(callback) {
    var opid = $("body").data("opid");
    request(rootPath + "/admin/courseuser/pubbuy", function (response) {
        if (response.status == 210 || response.status == 200) {
            var link = $("body").data("link");
            $(".gobuy").removeClass("gobuy");
            $(".paylink").removeClass("gobuy").off("click").attr({
                'href': link,
                'target': "_blank"
            }).html("<button class=\"course-btn sign-up\"><i class=\"iconfont icon-iconheartbeat\"></i>立即学习</button>")
            $(".onlinelink").html("<button class=\"course-btn free-study\"><i class=\"iconfont icon-video1\"></i>进入直播教室</button>").on("click", function () {
            })
            callback && callback(response);
        } else {
            mkPayDialog.dialog({opid: opid, coursetype: 2, type: 1});
        }

    }, {courseId: opid});
}


/*静态化处理*/
function staticontent(contentId) {
    request(rootPath + "/static/course", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    }, {id: contentId});
}


function staticcourse() {
    request(rootPath + "/static/course", function (data) {
        if (data != "error") loading("批量静态化成功...", 4);
    }, {pageNo: 0, pageSize: 5000});
}

function staticcourseid(courseId) {
    request(rootPath + "/static/courseid", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    }, {courseId: courseId});
}

function staticblogid(blogId) {
    request(rootPath + "/static/blogid", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    }, {blogId: blogId});
}

function staticplayid(courseId) {
    request(rootPath + "/static/playid", function (data) {
        if (data != "error") loading("播放静态化成功...", 4);
    }, {courseId: courseId});
}

function staticplay() {
    request(rootPath + "/static/play", function (data) {
        if (data != "error") loading("批量静态化成功...", 4);
    }, {pageNo: 0, pageSize: 5000});
}

function staticblog() {
    request(rootPath + "/static/blog", function (data) {
        if (data != "error") loading("批量静态化成功...", 4);
    }, {pageNo: 0, pageSize: 5000});
}

function staticindex() {
    request(rootPath + "/static/index", function (data) {
        if (data != "error") loading("首页静态化成功...", 4);
    });
}

function staticuserindex() {
    request(rootPath + "/static/user", function (data) {
        if (data != "error") loading("用户首页静态化成功...", 4);
    });
}

function statictopic() {
    request(rootPath + "/static/topic", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    });
}

function statictopicid(topicId) {
    request(rootPath + "/static/topicid", function (data) {
        if (data != "error") loading("播放静态化成功...", 4);
    }, {topicId: topicId});
}

function staticsinglebook(bookid) {
    console.log(bookid);
    request(rootPath + "/static/bookid", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    }, {bookId: bookid});
}

/*静态化书籍*/
function staticBookLink() {
    request(rootPath + "/static/books", function (data) {
        if (data != "error") loading("静态化成功...", 4);
    }, {pageNo: 0, pageSize: 5000});
};

/*执行会员过期*/
function updateYearExpire() {
    request(rootPath + "/user/updateYearExpire", function () {
        loading("执行成功...", 4);
    });
}


/*会话处理*/
function setSession(key, value, mark) {
    var stroage = mark ? sessionStorage : localStorage;
    if (stroage) stroage.setItem("keant_" + key, value);
};


function getSession(key, mark) {
    var stroage = mark ? sessionStorage : localStorage;
    if (stroage) {
        return stroage.getItem("keant_" + key);
    } else {
        return "";
    }
};

function removeSession(key, mark) {
    var stroage = mark ? sessionStorage : localStorage;
    if (stroage) {
        return stroage.removeItem("keant_" + key);
    } else {
        return "";
    }
};


/*给要预览的图片或者元素上加 class="keui-imgbox"和data-src='图片地址即可'*/
function mkImageShow() {
    var ow = window.innerWidth;
    var oh = window.innerHeight;

    $(window).resize(function () {
        var $imgbox = $(".keui-imgcontainer");
        var imgsrc = $imgbox.find(".keui-imgcnt").find("img").attr("src");
        if (isEmpty(imgsrc)) return;
        var xbit = this.innerWidth / ow;
        var ybit = this.innerHeight / oh;
        var width = $imgbox.data("width") * 1;
        var height = $imgbox.data("height") * 1;
        var wb = width * xbit;
        var yb = height * ybit;

        loadingImage(imgsrc, function (ok) {
            if (ok) {
                var imgjson = resizeImg(this, wb, yb);
                var cwidth = imgjson.width;
                var cheight = imgjson.height;
                $imgbox.find(".keui-imgcnt").stop(true, true).animate({
                    width: cwidth,
                    height: cheight,
                    marginLeft: "-" + (cwidth / 2) + "px",
                    marginTop: "-" + (cheight / 2) + "px"
                });
                $imgbox.find(".keui-imgcnt").find("img").attr("width", cwidth).attr("height", cheight);
            } else {
                mkCommon.error("图片已损坏，加载失败", "error");
            }
        });

    });

    $("body").on("click", ".keui-imgbox", function () {
        var imgsrc = $(this).attr("src");
        if (isEmpty(imgsrc)) imgsrc = $(this).data("src").replace(",", "");
        loadingImage(imgsrc, function (ok) {
            if (ok) {
                var bw = 1440;
                var bh = 900;
                if (bw >= ow) bw = ow;
                if (bh >= oh) bh = oh - 100;
                var imgjson = resizeImg(this, bw, bh);
                var width = imgjson.width;
                var height = imgjson.height;
                var html = "<div class='keui-imgcontainer' data-width='" + width + "' data-height='" + height + "'>" +
                    "  		<div class='keui-imgcnt'  style='width:" + width + "px;height:" + height + "px;margin-left:-" + (width / 2) + "px;margin-top:-" + (height / 2) + "px;'>" +
                    "  			<img src='" + imgsrc + "?d=" + new Date().getTime() + "' width='" + width + "' height='" + height + "'>" +
                    "  		</div><a href='javascript:void(0);' class='keui-imgclose'><i class='iconfont icon-remove'></i></a>" +
                    "  	</div>";
                $("body").append(html).append("<div class='keui-imgoverlay'></div>");

                $(".keui-imgcontainer").off("click").on("click", function () {
                    $(this).next().remove();
                    $(this).remove();
                });
            } else {
                mkCommon.error("图片已损坏，加载失败", "error");
            }
        });
    });
};


//记录路径
function setCacheLink() {
    setSession("cachelink", window.location.href);
}

function getCacheLink() {
    return getSession("cachelink");
}


function mk_guanzhumain() {
    $("body").on("click", ".kui-gz", function () {
        var $that = $(this);
        mkLogin.login(function (ok) {
            var uid = $that.data("uid");
            var suid = $("#mkaccount").data("id");
            if (uid == suid) {
                mkCommon.error("自己不能关注自己...", "tip");
                return;
            }
            request(rootPath + "/user/updateFG/" + uid, function (data) {
                if (data < 2) {
                    if (data == 0) {
                        $that.removeClass("off").addClass("active").find("span").html("<i class='iconfont icon-yes'></i>已关注");
                    } else {
                        mkCommon.error("取消关注成功...", "tip");
                        $that.addClass("off").removeClass("active").find("span").html("<i class='iconfont icon-add'></i>关注");
                    }
                } else if (data == 4) {
                    mkCommon.error("自己不能关注自己...", "tip");
                } else {
                    mkCommon.error("最多关注100个好友！已经达到极限了...", "tip");
                }
            });
        });
    });
};

function loadAnimateScroll() {
    //滚动
    window.onload = window.onscroll = function () {
        //公用滚动效果
        var aniClass = $(".mkanimated").get();
        var ch = window.innerHeight;
        var sc = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < aniClass.length; i++) {
            if (ch + sc >= gPos(aniClass[i]).t) {
                aniClass[i].style.webkitAnimationDelay = aniClass[i].getAttribute('data-time') + 's';
                aniClass[i].style.animationDelay = aniClass[i].getAttribute('data-time') + 's';
                $(aniClass[i]).addClass(aniClass[i].getAttribute('data-animate'));
            } else {
                $(aniClass[i]).removeClass(aniClass[i].getAttribute('data-animate'));
            }
        }
    }
};

//加积分
//ctype 添加类型 1 注册 2签到  3评论文章 4 评论课程  5 评论博客  6 学习课程 7加贡献值
//mark 1是增加积分 0是减去积分
//score 增加多少积分
//message 信息
//url 完成的地址
//返回结果：SELECT cmark,cscore,levels,ccron,@cron as tcron,totaljifen,ctype,userId;
function addCron(ctype, mark, message, url, obj) {
    var score = randomNum(10) + 1;
    request(rootPath + "/ujifen/opjifen", function (data) {
        if (data.cmark != 0) {
            dianzan(score, obj);
        }
    }, {ctype: ctype, mark: mark, jifen: score, message: message, url: url});
};

//加积分效果
function dianzan(score, obj, msg) {
    var $num = $("<span class='num'>+" + (msg || "积分") + score + "</span>");
    $("body").append($num);
    var left = $(obj).offset().left + $(obj).width() / 2;
    var top = $(obj).offset().top - $(obj).height();
    $num.css({
        "position": "absolute",
        "left": left + "px",
        "top": top - 40 + "px",
        "z-index": 9999,
        "font-size": 12,
        "line-height": 30,
        "color": "#8BC34A"
    });

    $num.animate({
        "font-size": 30,
        "opacity": "0",
        "top": 0
    }, 3000, function () {
        $num.remove();
    });
};


function showShareMessage(options) {
    $(".share_wrap").remove();
    $("body").append("<div class='share_wrap'>" +
        "		<div class='sharebox_c'>" +
        "			<h1 class='fz24 fw' style='color:" + options.color + "'>" + (options.message || "") + "</h1>" +
        "			<h1>非常感谢你的一直对ITBooking的支持与厚爱，为了帮助更多的热爱或即将踏上IT编程道路的年轻人获取学习权利和享受知识。</h1>" +
        "			<h3>你的分享和帮助平台的推广是一件多么可爱又有意义的事情。</h3>" +
        "			<div class='mt20'>" +
        "				<span class='ftp2' style='color:#01cd9a;'>分享：</span>" +
        "				<a class='shareicoc pr5 cof tmui-tips' data-type='1' tip='分享到QQ空间' target='_blank' href='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + rootPath + "&amp;title=我正在学习：互联网最新最前沿的IT技术平台学习编程【更多互联网最新IT技术信息访问--www.itbooking.net】&amp;summary=互联网最懂你的IT学习交流平台，课程主要包括：NodeJs,大数据,Java,Java框架SSM,SSH,人工智能,AI,区块链技术,SpringBoot等。欢迎更多的热爱编程和初学编程的加入学习平台通过学习成就自己。&amp;pics=http://www.itbooking.net/images/logob.png'><i class='fz48 iconfont icon-qzonec' style='color:#ff5722'></i></a>" +
        "				<a class='shareicoc pr5 cof tmui-tips' data-type='2' tip='分享到QQ好友' target='_blank' href='http://connect.qq.com/widget/shareqq/index.html?url=" + rootPath + "&amp;title=我正在学习：互联网最新最前沿的IT技术平台学习编程【更多互联网最新IT技术信息访问--www.itbooking.net】&amp;summary=互联网最懂你的IT学习交流平台，课程主要包括：NodeJs,大数据,Java,Java框架SSM,SSH,人工智能,AI,区块链技术,SpringBoot等。欢迎更多的热爱编程和初学编程的加入学习平台通过学习成就自己。&amp;desc=互联网最懂你的IT学习交流平台，课程主要包括：NodeJs,大数据,Java,Java框架SSM,SSH,人工智能,AI,区块链技术,SpringBoot等。欢迎更多的热爱编程和初学编程的加入学习平台通过学习成就自己。&amp;pics=http://www.itbooking.net/images/logob.png'><i class='fz48 iconfont icon-qq' style='color:#01cd9a'></i></a>" +
        "				<a class='shareicoc pr5 cof tmui-tips' data-type='3' tip='分享到微博' target='_blank' href='http://service.weibo.com/share/share.php?url=" + rootPath + "&amp;title=我正在学习：互联网最新最前沿的IT技术平台学习编程【更多互联网最新IT技术信息访问--www.itbooking.net】&amp;searchPic=false&amp;pic=http://www.itbooking.net/images/logob.png&amp;summary=互联网最懂你的IT学习交流平台，课程主要包括：NodeJs,大数据,Java,Java框架SSM,SSH,人工智能,AI,区块链技术,SpringBoot等。欢迎更多的热爱编程和初学编程的加入学习平台通过学习成就自己。&amp;desc=互联网最懂你的IT学习交流平台，课程主要包括：NodeJs,大数据,Java,Java框架SSM,SSH,人工智能,AI,区块链技术,SpringBoot等。欢迎更多的热爱编程和初学编程的加入学习平台通过学习成就自己。'><i class='fz48 iconfont icon-weibo' style='color:#ff9800'></i></a>" +
        "			</div>" +
        "			<div class='mt30'><a href='http://shang.qq.com/wpa/qunwpa?idkey=1b16cd81ab62b8e95e53d822eb2887e8e1478be7651a9bb28f3cc9d89ad0b2c3' target='_blank'  style='padding:5px 68px;' class='btn  btn-large btn-success'><span>加群申请</span><i class='iconfont icon-qq fz30 tp2' style='margin-left: 10px'></i></a>&nbsp;<a href='javascript:void(0);' onclick='mkPay.alipay(this)' style='padding:5px 68px;' class='btn mkyearorderbtn btn-large btn-danger'><span>开通会员</span><i class='iconfont icon-vip fz30 tp2' style='margin-left: 10px'></i></a></div>" +
        "		</div>	" +
        "	</div>");
    loadYearPayOk();

    $(".shareicoc").off("click").on("click", function () {
        var type = $(this).data("type");
        saveShare(type, function (bool) {
            $(".share_wrap").remove();
        });
    });
}


//统计是否分享
function countShare(callback) {
    request(rootPath + "/user/countShare", function (data) {
        callback && callback(data);
    });
};

function saveShare(type, callback) {
    request(rootPath + "/user/saveShare/" + type, function (data) {
        if (data == "success") callback && callback(true);
    });
};

function transfterURL(url) {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || app.indexOf("Android") > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || app.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1 || app.indexOf("iPad") > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    var p = navigator.platform;
    var system = {};
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    /*if(system.win||system.mac||system.xll){
//如果是电脑跳转到百度
        window.location.href="http://www.baidu.com/";
    }else{
//如果是手机,跳转到hao123首页
        window.location.href="http://www.hao123.com/";
    }*/

    //如果你是通过手机访问pc地址，那么跳转到你指定的地址
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
        browser.versions.iPhone || browser.versions.iPad || !(system.win || system.mac || system.xll)) {
        window.location.href = url;
    }
};


//盐
var salt = "itbooking.123sk";

function inputPassToFormPass(inputPass) {
    //混淆视听 slat
    var str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4);
    //加密一次
    return md5(str);
}


var mkCommon = {
    error: function (msg, mark) {
        $(".error_tips").remove();
        var cd = tz_animateIn(9);
        if (!mark) mark = "error";
        $(".tmui-common-overlay").remove();
        $("body").append("<div class='" + cd + " error_tips cbg' ><i class='fa fa-" + mark + " tp2'></i><span id='e_m'>" + msg + "</span></div>");
        var args = arguments;
        if (args.length > 2 && args[2]) {
            $(".error_tips").append("<a href='javascript:void(0);' class='ke_esure'>确定</a><a href='javascript:void(0);' class='ke_ecan'>取消</a>");
            $("body").append("<div class='tmui-common-overlay'></div>");
            $(".error_tips").find(".ke_esure").on("click", function () {
                deleteError();
                if (args[2]) args[2](true);
            });

            $(".error_tips").next().on("click", function () {
                deleteError();
                if (args[2]) args[2](false);
            });

            $(".error_tips").find(".ke_ecan").on("click", function () {
                deleteError();
                if (args[2]) args[2](false);
            });
        }

        $(".error_tips").off().on("click", function () {
            $(this).removeClass(cd).addClass(tz_animateOut(3)).fadeOut("slow", function () {
                $(".tmui-common-overlay").remove();
                $(this).remove();
            });
        });

        if (mark == "success") {//success
            $(".error_tips").css("background", "#449D44");
        } else if (mark == "error") {//error
            $(".error_tips").css("background", "#C9302C");
        } else if (mark == "tip") {//warn
            $(".error_tips").css("background", "#EC971F");
        }

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            deleteError();
        }, 4000);


        function deleteError() {
            $(".error_tips").removeClass(cd).addClass(tz_animateOut(3)).fadeOut("slow", function () {
                $(".tmui-common-overlay").remove();
                $(this).remove();
            });
        }
    }
};


var mkLogin = {
    login: function (callback, flag) {
        $.get(rootPath + "/loginSuccess", function (response) {
            if (response.status == 200 && response.data) {
                callback && callback(response.data)
            } else {
                if (!flag) {
                    mkLogin.loadLogin();
                } else {
                    callback && callback(false);
                }
            }
        });
    },

    study: function (callback) {
        request(rootPath + "/user/study", function (data) {
            callback && callback(data.data);
        });
    },

    countUserRelations: function (callback) {
        request(rootPath + "/user/countUserRelations", function (res) {
            if (res.status == 200) {
                var countdata = res.data;
                for (var key in countdata) {
                    $(".tip-" + key.replace('@', '')).text(countdata[key]);
                }
            }
        });
    },

    loadForget: function () {


    },

    loadLoginReg: function () {

    },
    loginSuccessD: function (callback) {
        $.get(rootPath + "/loginSuccess", function (response) {
            if (response.status == 200 && response.data) {
                callback && callback(response.data)
            } else {
                mkLogin.loadLogin();
            }
        });
    },
    loginsuccessnew: function (callback) {
        var login = $("body").data("login") || 0;
        $.get(rootPath + "/loginSuccessnew?login=" + login, function (response) {
            if (response) {
                $(".mkuser_infobox").html(response);
                callback && callback();
                window.loginCallback && window.loginCallback();
            }
        });
    },
    loginSuccess: function (callback) {
        $.get(rootPath + "/loginSuccess", function (response) {
            if (response.status == 200 && response.data) {
                $(".loginlink").hide();
                var html = "";
                var shtml = "";
                if (response.data.roleid == 1) {
                    shtml += "<a href='javascript:void(0);' onclick='staticindex()' class='dropdown-item' ><i class='mdi mdi-border-color mr-2 text-success'></i>静态化首页</a>";
                    shtml += "<a href='javascript:void(0);' onclick='staticcourse()' class='dropdown-item' ><i class='mdi mdi-border-color mr-2 text-success'></i>静态化课程</a>";
                    shtml += "<a href='javascript:void(0);' onclick='staticplay()' class='dropdown-item' ><i class='mdi mdi-border-color mr-2 text-success'></i>静态化播放</a>";
                    shtml += "<a href='javascript:void(0);' onclick='staticblog()' class='dropdown-item' ><i class='mdi mdi-border-color mr-2 text-success'></i>静态化博客</a>";
                    shtml += "<a href='javascript:void(0);' onclick='staticBookLink()' class='dropdown-item' ><i class='mdi mdi-border-color mr-2 text-success'></i>静态化手记</a>";
                    shtml += "<a href='" + rootPath + "/admin/addbook class='dropdown-item' target='_blank'><i class='mdi mdi-border-color mr-2 text-success'></i>添加手记</a>";
                    shtml += "<a href='" + rootPath + "/admin/addcourse' class='dropdown-item' target='_blank'><i class='mdi mdi-border-color mr-2 text-success'></i>添加课程1</a>";
                    shtml += "<a href='" + rootPath + "/admin/addtopic' class='dropdown-item' target='_blank'><i class='mdi mdi-border-color mr-2 text-success'></i>添加话题</a>";
                    shtml += "<a href='" + rootPath + "/admin/addblog' class='dropdown-item' target='_blank'><i class='mdi mdi-border-color mr-2 text-success'></i>添加故事</a>";

                    var edit = $("body").data("edit");
                    var opid = $("body").data("opid");

                    if (edit == "blog") {
                        $("#editbox").html("<a href='" + rootPath + "/admin/editblog/" + opid + "' class='cof' target='_blank'>编辑</a>");
                    }

                    if (edit == "blog") {
                        $("#editbox").html("<a href='" + rootPath + "/admin/editblog/" + opid + "' class='cof' target='_blank'>编辑</a>");
                    }

                    if (edit == "topic") {
                        $("#editbox").html("<a href='" + rootPath + "/admin/edittopic/" + opid + "' class='cof' target='_blank'>编辑</a>");
                    }

                    if (edit == "course") {
                        $("#editbox").html("<a href='" + rootPath + "/admin/editcourse/" + opid + "' class='cof' target='_blank'>编辑</a>");
                    }

                    if (edit == "book") {
                        $("#editbox").html("<a href='" + rootPath + "/admin/editbook/" + $("body").data("opid") + "' class='cof' target='_blank'>编辑</a>");
                    }
                }

                html += "<a class='nav-link dropdown-toggle' id='profileDropdown' >" +
                    "  <div class='nav-profile-img'>" +
                    "    <img src='" + response.data.headerPic + "' alt='image'>" +
                    "  </div>" +
                    "  <div class='nav-profile-text'>" +
                    "    <p class='mb-1 text-black'>" + response.data.username + "</p>" +
                    "  </div>" +
                    "</a>" +
                    "<div class='dropdown-menu navbar-dropdown' aria-labelledby='profileDropdown'>" +
                    "  <a class='dropdown-item' target='_blank' href='" + rootPath + "/user'>" +
                    "    <i class='mdi mdi-home mr-2 text-success'></i>个人中心" +
                    "  </a> " +
                    "  <a class='dropdown-item' target='_blank' href='" + rootPath + "/user#mycourse'>" +
                    "    <i class='mdi mdi-image-multiple mr-2 text-success'></i>我的课程" +
                    "  </a>" +
                    "	<a class='dropdown-item' target='_blank'  href='" + rootPath + "/user/setting'>" +
                    "    <i class='mdi mdi-settings mr-2 text-success'></i>个人设置" +
                    "  </a>" + shtml +
                    "  <div class='dropdown-divider'></div>" +
                    "  <a class='dropdown-item' href='javascript:void(0);' onclick='mkLogin.logout(this)'>" +
                    "    <i class='mdi mdi-logout mr-2 text-primary'></i>退出" +
                    "  </a>" +
                    "</div>";

                $("#loginspan,.loginuserbox,#mk_userbox").html(html);
                $(".nav-logout").attr("onclick", "mkLogin.logout(this)").find("a").attr("href", "javascript:void(0);");
                $(".dropdown-toggle").hover(function () {
                    $(".dropdown-menu").hide();
                    $(this).next().show();
                });

                $(".dropdown-menu").css("top", 46).mouseleave(function () {
                    $(".dropdown-menu").hide();
                });

                //查询最后一次学习
                loadUserStudyCourse();
                //加载用户显示信息
                mkLogin.countUserRelations();
                //查询用户的权限
                loadYearPayOk();

                // 查询课程会员
                loadCourseBuy();
                $(".mkusernamec").data("opid", response.data.uuid).data("username", response.data.username).data("headerpic", response.data.headerPic);
                $(".userlinka").attr("href", basePath + "/user").find("span").text("进入学习")
                if (window.loginSuccessBack) loginSuccessBack(response, true);
                callback && callback(true, response);
            } else {
                if (window.loginSuccessBack) loginSuccessBack(response, false);
                callback && callback(false, response);
            }
        });
    },

    logout: function () {
        $.tzConfirm({
            width: 380, background: "#fafafa", title: "退出", content: "你确定离开吗？", callback: function (ok) {
                if (ok) {
                    $.get(rootPath + "/logout", function (data) {
                        window.location.href = rootPath;
                        removeSession("cachelink");
                    });
                }
            }
        })
    },


    loadLogin: function () {
        $("#loginbox,#loginover").remove();
        $("body").append("<div id=\"loginbox\" class=\"animated1 bounceInLeft\"><a href=\"javascript:void(0);\" class=\"cof xclose\"><i class=\"iconfont icon-remove cof\"></i></a>\n" +
            "\t\t\t<iframe src=\"" + basePath + "/login?dialog=yes\" frameborder=\"0\"></iframe>\n" +
            "\t\t</div>").append("<div id=\"loginover\"></div>");

        $("#loginover,.xclose").on("click", function () {
            $("#loginover").remove();
            $("#loginbox").fadeOut("slow", function () {
                $(this).remove();
            })
        })
    }
};


function initLoadingJS() {
    /*//浏览器的拦截
    var v = getBroswerVersion().version;
    if(v=="ie_6" || v=="ie_7" || v=="ie_8"){
        $("body").append("<div id='tipnobox' style='background:#1F53A0;padding:20% 0px;text-align:center;font-size:36px;line-height:46px;font-weight:700;color:#fff;position:fixed;width:100%;height:100%;top:0;left:0;z-index:9999'>很是遗憾，作者关闭了IE6,7,8,为推动互联的发展做贡献....请下载ie9+浏览器,推荐使用google和火狐浏览器.</div>");
        shakeCharacter("tipnobox");
        return;
    };

    loadAnimateScroll();
    mkImageShow();
    //提示插件
    $(".mkui-tips,.tmui-tips").tmTip();
    //登录
    mkLogin.loginSuccess();
    mkLogin.loginsuccessnew();

    var topflag = getSession("toptip",false);
    if(topflag==1)$(".ud-app-loader").hide();
    $(".close-topbox").on("click",function(){
        $(".ud-app-loader").fadeOut("slow");
        setSession("toptip",1,false);
    })*/
}


function setClipboardText(event) {
    event.preventDefault();//阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。
    var node = document.createElement('div');
    //对documentfragment不熟，不知道怎么获取里面的内容，用了一个比较笨的方式
    node.appendChild(window.getSelection().getRangeAt(0).cloneContents());
    //getRangeAt(0)返回对基于零的数字索引与传递参数匹配的选择对象中的范围的引用。对于连续选择，参数应为零。
    var html = window.getSelection().getRangeAt(0);
    var html2 = node.innerHTML;
    if (html.length <= 500) return;
    var htmlData = '<div>' + html2 + '<br>/**著作权归作者所有。<br />'
        + '商业转载请联系作者获得授权，非商业转载请注明出处。<br />'
        + '作者：优码学堂<br />链接：http://www.itbooking.net<br />'
        + '来源：优码学堂分布式集群，大前端架构学习平台 **/<br />'
        + '文章地址：' + window.location.href + '<br />'
        + '</div>';
    var textData = html + '\n/**\n著作权归作者所有。\n'
        + '商业转载请联系作者获得授权，非商业转载请注明出处。\n'
        + '作者：优码学堂\n平台链接：http://www.itbooking.net\n'
        + '来源：优码学堂分布式集群，大前端架构学习平台 **/\n'
        + '文章地址：' + window.location.href + '\n';
    if (event.clipboardData) {
        //setData(剪贴板格式, 数据) 给剪贴板赋予指定格式的数据。返回 true 表示操作成功。
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData("text/plain", textData);
    } else if (window.clipboardData) { //window.clipboardData的作用是在页面上将需要的东西复制到剪贴板上，提供了对于预定义的剪贴板格式的访问，以便在编辑操作中使用。
        return window.clipboardData.setData("text", textData);
    }
};

function loadSoundplay2(obj) {
    var audios = document.getElementsByTagName("audio");
    for (var i = 0; i < audios.length; i++) {
        audios[i].pause();
    }
    if (!$(obj).find("i").hasClass("r")) {
        $(".fa-play-circle").removeClass("r");
        $(obj).find("i").addClass("r");
        $(obj).prev()[0].play();
    } else {
        $(obj).find("i").removeClass("r");
        $(obj).prev()[0].pause();
    }
}

function loadUserStudyCourse() {
    var sflag = getSession("stuyhtmlfalg", true);
    if (sflag) return;
    var stuyhtml = getSession("studyhtml", true);
    if (isEmpty(stuyhtml)) {
        request(rootPath + "/user/selectLastStudy", function (response) {
            if (!response.data) return;
            $("#userstudy").html("<span >最后学习：<a href='" + rootPath + "/" + response.data.courseLink + "#play_" + response.data.courseId + "_" + response.data.chapterId + "_" + response.data.lessonId + "' target='_blank' class=' hljs-link' title='" + response.data.ctitle + "'>【" + response.data.ctitle + "】/【" + response.data.ltitle + "】 </a>&nbsp;&nbsp;<a href='javascript:void(0);' class='removec'><i class='iconfont icon-remove pr tp2'></i></a></span>");
            setSession("stuyhtml", $("#userstudy").html(), true);
            $("#userstudy").off("click").find(".removec").on("click", function () {
                $("#userstudy").addClass("animated fadeOutLeft");
                setSession("stuyhtmlfalg", 1, true);
            });
        });
    } else {
        $("#userstudy").html(stuyhtml);
        $("#userstudy").off("click").find(".removec").on("click", function () {
            $("#userstudy").addClass("animated fadeOutLeft");
            setSession("stuyhtmlfalg", 1, true);
        });
    }
}


var mkPayDialog = {

    // 课程和文章支付
    dialog: function (opt) {
        var opts = $.extend({}, opt);
        $("#paydialog-box").remove();
        var divbox = $("<div id='paydialog-box' class='animated fadeInLeft'></div>");
        $("body").append(divbox).append("<div id='paydialog-boxmask'></div>");
        $("#paydialog-box").width(560).css({marginLeft: -280}).show().load(basePath + "/admin/order/paydialog?opid=" + opts.opid + "&type=" + opts.type + "&coursetype=" + opts.coursetype, function () {
            $("#paydialog-boxmask,.pclose").on("click", function () {
                $("#paydialog-box").removeClass("animated fadeInLeft")
                    .addClass("animated fadeOutRight").fadeOut(1000, function () {
                    $(this).remove();
                });
                $("#paydialog-boxmask").remove();
            })
        });
    },

    // 大会员
    bigdialog: function (opt) {
        var opts = $.extend({}, opt);
        $("#paydialog-box").remove();
        var divbox = $("<div id='paydialog-box' class='animated fadeInLeft'></div>");
        $("body").append(divbox).append("<div id='paydialog-boxmask'></div>");
        var height = $(window).height() - 360;
        if (height < 420) height = 568;
        $("#paydialog-box").width(1260).css({marginLeft: -630}).height(height).show().load(basePath + "/admin/order/paybigdialog", function () {
            $("#paydialog-boxmask,.pclose").on("click", function () {
                $("#paydialog-box").removeClass("animated fadeInLeft")
                    .addClass("animated fadeOutRight").fadeOut(1000, function () {
                    $(this).remove();
                });
                $("#paydialog-boxmask").remove();
            })
        });
    },

    // 博客付费
    blogdialog: function (opt) {
        var opts = $.extend({}, opt);
        $("#paydialog-box").remove();
        var divbox = $("<div id='paydialog-box' class='animated fadeInLeft'></div>");
        $("body").append(divbox).append("<div id='paydialog-boxmask'></div>");
        $("#paydialog-box").width(680).css({marginLeft: -340}).show().load(basePath + "/admin/order/payblogdialog", function () {
            $("#paydialog-boxmask,.pclose").on("click", function () {
                $("#paydialog-box").removeClass("animated fadeInLeft")
                    .addClass("animated fadeOutRight").fadeOut(1000, function () {
                    $(this).remove();
                });
                $("#paydialog-boxmask").remove();
            })
        });
    },

    //  用户打赏
    userdialog: function (opt) {
        var opts = $.extend({}, opt);
        $("#paydialog-box").remove();
        var divbox = $("<div id='paydialog-box' class='animated fadeInLeft'></div>");
        $("body").append(divbox).append("<div id='paydialog-boxmask'></div>");
        $("#paydialog-box").show().width(1260).css({marginLeft: -630}).load(basePath + "/admin/order/payuserdialog", function () {
            $("#paydialog-boxmask").on("click", function () {
                $("#paydialog-box").removeClass("animated fadeInLeft")
                    .addClass("animated fadeOutRight").fadeOut(1000, function () {
                    $(this).remove();
                });
                $(this).remove();
            })
        });
    }

};


/**
 * 将秒转换为 分:秒
 * s int 秒数
 */
function getminsec(s) {
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h = Math.floor(s / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s = Math.floor(s % 60);
    //将变量转换为字符串
    //如果只有一位数，前面增加一个0
    h = (h < 10) ? '0' + h : h;
    s = (s < 10) ? '0' + s : s;
    return h + ':' + s;
}


var mkCourse = {
    //  初始化
    init: function () {
        this.courseHits();
        this.countLoves();
    },

    //  点击数
    courseHits: function () {
        var courseId = $("body").data("opid") || $("#coursediv").data("opid");
        request(basePath + "/course/updatehit/" + courseId, function (res) {
            if (res.status == 200) {
                $("#coursehits").text(res.data);
            }
        })
    },

    // 收藏
    courseLoves: function () {
        var courseId = $("body").data("opid") || $("#coursediv").data("opid");
        request(basePath + "/admin/course/updateloves/" + courseId, function (res) {
            if (res.status == 200) {
                var text = $(".favor").find(".lovesm").text() * 1;
                if (res.data == 0) {
                    $(".favor").find(".lovesm").text(text + 1);
                } else {
                    $(".favor").find(".lovesm").text(text - 1);
                }
                $(".favor").removeClass("cred").addClass(res.data == 0 ? "cred" : "").find("span").text(res.data == 0 ? "已收藏" : "收藏");
            }
        })
    },

    // 统计收藏数
    countLoves: function () {
        var courseId = $("body").data("opid");
        request(basePath + "/admin/course/countloves/" + courseId, function (res) {
            if (res.status == 200) {
                $(".favor").removeClass("green").addClass(res.data.data == 0 ? "green" : "").find("span").text(res.data.data == 0 ? "已收藏" : "收藏")
                    .end().find(".lovesm").text(res.data.loves);
            }
        })
    },

    booksLoves: function () {
        var bookId = $("#booksdiv").data("opid");
        request(basePath + "/admin/books/saveBookLoves", function (res) {
            var num = $(".booksfavor").find(".lovesm").text() * 1;
            $(".booksfavor").removeClass("green").addClass(res == 1 ? "green" : "").find("span").text(res == 1 ? "已收藏" : "收藏")
                .end().find(".lovesm").text(res == 1 ? (num + 1) : (num - 1));
        }, {bookId: bookId})
    }

};


function initCourseEvent() {
    // 点击收藏课程
    $("body").on("click", ".favor", function (e) {
        mkCourse.courseLoves();
        e.stopPropagation();
    });


    // 点击收藏文案
    $("body").on("click", ".booksfavor", function (e) {
        mkCourse.booksLoves();
        e.stopPropagation();
    });

    // 点击购买课程
    $("body").on("click", ".gobuy", function (e) {
        var that = this;
        mkLogin.login(function (res) {
            var courseId = $(that).data("opid") || $("body").data("opid") || $("#coursediv").data("opid");
            var coursetype = $(that).data("coursetype") || $("body").data("coursetype") || $("#coursediv").data("coursetype");
            mkPayDialog.dialog({opid: courseId, type: 1, coursetype: coursetype});
        });
        e.stopPropagation();
    });


    // 点击购买课程
    $("body").on("click", ".bookgobuy", function (e) {
        var that = this;
        mkLogin.login(function (res) {
            var booksId = $(that).data("opid") || $("body").data("opid") || $("#booksdiv").data("opid");
            mkPayDialog.dialog({opid: booksIds, type: 2, coursetype: 3});
        });
        e.stopPropagation();
    });
}


//全屏
var bgcolor = getSession("bgcolor");

function fullScreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

//退出全屏
function exitFullscreen() {
    setSession("bgcolor", bgcolor || "white");
    $("body").removeClass("white dark").addClass(bgcolor || "white");
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

//监听window是否全屏，并进行相应的操作,支持esc键退出
/*window.onresize = function() {
	var isFull=!!(document.webkitIsFullScreen || document.mozFullScreen ||
		document.msFullscreenElement || document.fullscreenElement
	);//!document.webkitIsFullScreen都为true。因此用!!
	setSession("bgcolor",bgcolor||"white");
	$("body").removeClass("white dark").addClass(bgcolor||"white");
	if (isFull==false) {
		$("#exitFullScreen").css("display","none");
		$("#fullScreen").css("display","");
	}else{
		$("#exitFullScreen").css("display","");
		$("#fullScreen").css("display","none");
	}
}*/


$(function () {
    //监听剪切板事件
    /*document.addEventListener('copy',function(e){
       setClipboardText(e);
    });*/

    $("img").on("error", function () {
        this.src = rootPath + "/images/noimage.gif";
    });

    document.onkeydown = function () {
        //判断 Ctrl+S
        if (event.ctrlKey == true && event.keyCode == 83) {
            mkCommon.error("调皮了吧，我屏蔽了....");
            event.preventDefault(); // 或者 return false;
        }
    }

    // 点击返回
    $("body").on("click", ".closeiframe", function () {
        if (this.ccctimer) clearTimeout(this.ccctimer);
        $(parent.document).find("#huatibox").removeClass("animated bounceInLeft").addClass("animated bounceOutRight")
        this.ccctimer = setTimeout(function () {
            $(parent.document).find("#huatibox").hide();
        }, 1000);
        $(parent.document).find("#backiframe").hide();
        $(parent.document).find(".nav-logo").show();
        $(parent.document).find("html,body").removeAttr("style").css("overflowY", "auto");
        $("html,body").removeAttr("style").css("overflowY", "auto");
    })


    initLoadingJS();
    initCourseEvent();


    $("#fullScreen").on("click", function () {
        fullScreen();
    })

    //退出全屏
    $("#exitFullScreen").on("click", function () {
        exitFullscreen();
    })

    mkImageLazyLoad.load();
});

var mkImageLazyLoad = {
    load: function () {
        //测试调用，默认绑定window，或传递你需要监听的dom对象，调用就2步
        lazyload();
    }
}


//处理图片懒加载
function lazyload(option) {
    //如果不传递视图对象，则默认视图对象为window
    var viewDom = option || window,
        scroll_top, //滚动条Y轴距离
        scroll_left, //滚动条X轴距离
        viewDomWidth, //视图宽
        viewDomHeight,//视图高
        viewDomLeft, //视图左偏移量
        viewDomTop, //视图上偏移量
        imgWidth, //img宽
        imgHeight, //img高
        imgLeft, //img左偏移量
        imgTop, //img上偏移量
        imgArr = [],
        doc = document.documentElement;

    //获取视图元素宽高,左上偏移量，分为window或普通dom两种情况
    if (viewDom === window) {
        viewDomWidth = doc.clientWidth;
        viewDomHeight = doc.clientHeight;
        viewDomLeft = doc.offsetLeft;
        viewDomTop = doc.offsetTop;
    } else {
        viewDomWidth = viewDom.offsetWidth;
        viewDomHeight = viewDom.offsetHeight;
        viewDomLeft = viewDom.offsetLeft;
        viewDomTop = viewDom.offsetTop;
    }
    ;


    /**
     * @desc 将nodeList转为数组，方便操作
     * @param {object} data nodelist对象
     */
    function nodeListToArr(data) {
        var arr = [];
        try {
            //ie8及以下不支
            arr = Array.prototype.slice.call(data);
        } catch (e) {
            //兼容写法
            var len = data.length;
            for (var i = 0; i < len; i++) {
                arr.push(data[i]);
            }
        }
        ;
        return arr;
    };
    //取得所有需要懒加载的dom元素
    var imgNode = document.querySelectorAll("[data-src]");
    imgArr = nodeListToArr(imgNode);

    //替换路径函数,懒加载核心函数
    function replaceUrl() {
        //只有img数组不为空，才会执行替换路径的操作
        if (imgArr.length) {
            var i = 0;
            //获取视图元素滚动条滚动距离
            if (viewDom === window) {
                scroll_top = doc.scrollTop;
                scroll_left = doc.scrollLeft;
            } else {
                scroll_top = viewDom.scrollTop;
                scroll_left = viewDom.scrollLeft;
            }
            ;
            //遍历需要懒加载的dom节点
            for (; i < imgArr.length; i++) {
                //获取当前元素的宽高
                imgWidth = imgArr[i].offsetWidth;
                imgHeight = imgArr[i].offsetHeight;
                //当前元素随着滚动的变化的偏移量为
                imgLeft = imgArr[i].offsetLeft - scroll_left;
                imgTop = imgArr[i].offsetTop - scroll_top;
                //横向判断是否进入视图元素
                var boundaryLeft = imgLeft + imgWidth - viewDomLeft;
                var boundaryRight = viewDomLeft + viewDomWidth - imgLeft;
                //同理纵向判断是否进入视图元素
                var boundaryTop = imgTop + imgHeight - viewDomTop;
                var boundaryBottom = viewDomTop + viewDomHeight - imgTop;
                if (boundaryLeft > 0 && boundaryRight > 0 && boundaryTop > 0 && boundaryBottom > 0) {
                    //替换图片路径,添加判断，img替换src，非img替换background
                    if (imgArr[i].nodeName === "IMG") {
                        imgArr[i].src = imgArr[i].attributes['data-src'].value;
                    } else {
                        //不是图片的替换背景图
                        // imgArr[i].style.backgroundImage = imgArr[i].attributes['lazyimg-src'].value;
                    }
                    ;
                    //操作完一项就删除一项，同时重置i;
                    imgArr.splice(i, 1);
                    i -= 1;
                }
                ;
            }
            ;
        }
        ;
    };
    //自调
    replaceUrl();
    //添加事件监听
    viewDom.addEventListener("scroll", replaceUrl);
};



