var mkPay = {
    load: function (callback, pid) {
        request(rootPath + "/paysetting/" + pid, function (data) {
            if (callback) callback(data);
        });
    },
    paying: function (obj) {
        $(".paydialog").remove();
        $(".popupP").remove();
        //支付中
        $("body").append("<div class='paydialog animated fadeInLeft'>" +
            "	<div class='titTop'>" +
            "		<div class='titBg money'>&nbsp;</div>" +
            "		<div class='closeBtn' style='display:none;'>&nbsp;</div>" +
            "	</div>" +
            "	<h4 class='titMain'>为确保支付，请勿关闭支付窗口。</h4>" +
            "	<div class='payWay tc'>" +
            "		<p>支付进行中...</p>" +
            "		" +
            "	</div><div style='text-align:center;'>" +
            "	<p>30分钟内完成支付，如果支付过程中遇到问题，请直接联系客服进行处理和协商</p>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#fff;' target='_blank'><i class='iconfont icon-qq'></i>&nbsp;联系客服</a></div>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='" + rootPath + "/user/order' style='color:#fff;' target='_blank'><i class='iconfont icon-go'></i>&nbsp;查看课程订单</a></div></div>" +
            "</div>");

        $(".closeBtn").on("click", function () {
            $(".paydialog_mask").remove();
            $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                $(this).remove();
                //关闭刷新当前页面
                window.location.href = window.location.href;
            });
        });

        $(".paydialog_mask").on("click", function () {
            $(".closeBtn").trigger("click");
        });
    },
    weixinpay: function (ptypeid) {
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            mkPay.load(function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                $("body").append("<div class='popupP animated fadeInUp'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titWeixin'></h4>" +
                    "	<p class='totleMoney'>" +
                    "		支付：<span id='wechatMoney'>￥" + pdata.price + "元</span>" +
                    "	</p>" +
                    "	<div class='twoCode'>" +
                    "		<div id='payloadingbox'></div><img  id='qrcode' src='" + basePath + "/weixin?pid=" + ptypeid + "'>" +
                    "	</div>" +
                    "	<p class='scan'>请使用微信扫一扫，扫描二维码支付</p>" +
                    "	<div class='payWay tc'>" +
                    "		<div class='titMain'></div>" +

                    "		<p class='red'>支付进行中...</p>" +
                    "	</div>" +
                    "	<p class='prompt'>30分钟内完成支付，如果支付遇到问题，可以点击【 <a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#41b944;' target='_blank'>联系客服</a>】或" +
                    "	【 <a href='" + rootPath + "/user/order' style='color:#41b944;' target='_blank'>查看订单</a>】</p>" +
                    "	<p class='prompt'><a href='javascript:void(0);' onclick='mkPay.alipay()'>返回支付</a></p>" +
                    "</div>");


                loading2("#payloadingbox", 4);
                $("#qrcode").hide().load(function () {
                    $("#payloadingbox").empty();
                    $(this).show();
                });
                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                        //关闭刷新当前页面
                        window.location.href = window.location.href;
                    });
                });

                $(".paydialog_mask").on("click", function () {
                    $(".closeBtn").trigger("click");
                });

            }, ptypeid)
        });
    },
    alipay: function (pdata) {
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            mkPay.load(function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                $("body").append("<div class='paydialog animated fadeInLeft'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titMain mb20'>开通学习会员,为了网站的长期发展，请支持一下，感谢！</h4>" +
                    "		<div class='paytab_typ'><a href='javascript:void(0);' data-type='1' class='on'>年会员</a><a  href='javascript:void(0);' data-type='2'>半年会员</a><a  href='javascript:void(0);' data-type='3'>季度会员</a><a  href='javascript:void(0);' data-type='4'>月会员</a></div>" +
                    "	<div class='classInfo'>" +
                    "		<div class='money'>" +
                    "			应付：<span >￥<span id='priceBox'>" + pdata.price + "</span>元</span>" +
                    "		</div>" +
                    "		<h5 id='name'>" + pdata.title + "</h5>" +
                    "		<p id='pdesc'>" + pdata.message + "</p>" +
                    "	</div>" +
                    "	<div class='payWay'>" +
                    "		<p>请选择支付方式</p>" +
                    "		<ul id='payWay'>" +
                    "			<li class='weixin active' data-pay='wechat'><span class='iconfont icon-yes'></span></li>" +
                    "			<li class='alipay' data-pay='alipay'><span class='iconfont icon-yes'></span></li>" +
                    "		</ul>" +
                    "	</div>" +
                    "	<div class='micMoney'  style='display: none;'>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			可用 <span id='userMoney'></span> 抵扣 <span id='delUserMoney'></span>" +
                    "			<div class='userMoneySwitch changeYes'>" +
                    "				<div class='switchLine'>" +
                    "					<ul>" +
                    "						<li class='switchYes'></li>" +
                    "						<li class='switchNo'></li>" +
                    "					</ul>" +
                    "				</div>" +
                    "				<div class='switchBtn btnYes'></div>" +
                    "			</div>" +
                    "		</div>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			" + pdata.description + " <span class='btnOff'></span>" +
                    "		</div>" +
                    "	</div>" +
                    "	<div class='popBtn mt10' id='payBtn'>点击支付</div>" +
                    "</div>").append("<div class='paydialog_mask'></div>");


                var bgimg = $("body").data("img");
                if (isNotEmpty(bgimg)) $(".titBg.money,#payBtn").css("backgroundImage", "url(" + rootPath + "/" + bgimg + ")");

                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                    });
                });

                $(".paydialog_mask").on("click", function () {
                    $(".closeBtn").trigger("click");
                });

                $("#payWay >li").on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                });

                $(".paytab_typ").find("a").on("click", function () {
                    if ($(this).hasClass("on")) return;
                    $(this).addClass("on").siblings().removeClass("on");
                    var opid = $(this).data("type");
                    request(basePath + "/paysetting/get/" + opid, function (data) {
                        $("#name").html(data.title);
                        $("#priceBox").html(data.price);
                        $("#pdesc").html(data.message);
                    });
                });

                $("#payBtn").on("click", function () {
                    var type = $("#payWay").find("li.active").data("pay");
                    var ptypeid = $(".paytab_typ").find(".on").data("type");
                    mkPay.paying();
                    if (type == "alipay") {
                        // 打开页面，此处最好使用提示页面
                        var newWin = window.open(rootPath + "/payloading");
                        $.post(rootPath + "/admin/alipay", {pid: ptypeid}, function (data) {
                            loadSession();//防止session过期造成userid丢失
                            mkPay.alipaying();
                            newWin.location.href = data;
                        });
                    } else {
                        mkPay.weixinpay(ptypeid);
                        loadSession();//防止session过期造成userid丢失
                        mkPay.alipaying();
                    }
                });
            }, 1);
        });
    },
    paytimer: null,
    paytimeout: null,
    alipaying: function () {
        if (this.paytimer) clearInterval(this.paytimer);
        this.paytimer = setInterval(function () {
            request(basePath + "/shoporder/countbuyyear", function (data) {
                if (data > 0) {
                    $(".titMain").css("color", "#4CAF50").html("支付成功，请点击【查看课程订单按钮】进行查看。");
                    $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
                    var index = 5;
                    setInterval(function () {
                        if (index <= 1) {
                            $(".closeBtn").trigger("click");
                            return;
                        }
                        index--;
                        $("#timerback").html(index);
                    }, 1000);
                    clearInterval(mkPay.paytimer);
                }
            });
        }, 3000);


        if (this.paytimeout) clearTimeout(this.paytimeout);
        //30分钟如果没有支付完毕关闭支付
        this.paytimeout = setTimeout(function () {
            if (mkCoursePay.paytimer) clearInterval(mkCoursePay.paytimer);
            $(".titMain").css("color", "#ff0000").html("支付超时，请点击【查看课程订单】按钮进行查看。");
            $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
            var index = 5;
            var ctimer = setInterval(function () {
                if (index <= 1) {
                    if (ctimer) clearInterval(ctimer);
                    $(".closeBtn").trigger("click");
                    return;
                }
                index--;
                $("#timerback").html(index);
            }, 1000);
            clearInterval(this.paytimeout);
            if (mkPay.paytimeout) clearTimeout(mkPay.paytimeout);
        }, 1800000);
    }
};


var mkCoursePay = {
    init: function () {
        loadYearPayOk(function (ok) {
            var title = $("#cttile").html();
            if (ok) {
                var link = $("body").data("link");
                $(".mkorderbtn")
                    .attr("style", "cursor: pointer;")
                    .attr("href", rootPath + "/" + link)
                    .addClass("btn-danger")
                    .find("span").html("开始学习课程").parents(".signup-intro").append('<p class="adjustment-intro">已购买“<a href="' + rootPath + '/' + link + '" >' + title + '</a>”</p>');
                $(".mk-titlelink").attr("href", rootPath + "/" + link);
            } else {
                var courseId = $("body").data("opid");
                var link = $("body").data("link");
                request(basePath + "/shoporder/countbuy/" + courseId, function (data) {
                    if (data > 0) {
                        $(".mkorderbtn")
                            .attr("style", "cursor: pointer;")
                            .attr("href", rootPath + "/" + link)
                            .removeAttr("onclick")
                            .removeClass("btn-primary")
                            .addClass("btn-danger").find("span").html("开始学习课程").parents(".signup-intro").append('<p class="adjustment-intro">已购买“<a href="' + rootPath + '/' + link + '">' + title + '”</p>');
                        $(".mk-titlelink").attr("href", rootPath + "/" + link);
                    }
                });
            }
        });
    },
    load: function (courseId, callback) {
        request(basePath + "/course/load/" + courseId, function (data) {
            if (callback) callback(data);
        });
    },
    paying: function (obj) {
        $(".paydialog").remove();
        $(".popupP").remove();
        //支付中
        $("body").append("<div class='paydialog animated fadeInLeft'>" +
            "	<div class='titTop'>" +
            "		<div class='titBg money'>&nbsp;</div>" +
            "		<div class='closeBtn' style='display:none;'>&nbsp;</div>" +
            "	</div>" +
            "	<h4 class='titMain'>为确保支付，请勿关闭支付窗口。</h4>" +
            "	<div class='payWay tc'>" +
            "		<p>支付进行中...</p>" +
            "		" +
            "	</div><div style='text-align:center;'>" +
            "	<p>30分钟内完成支付，如果支付过程中遇到问题，请直接联系客服进行处理和协商</p>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#fff;' target='_blank'><i class='iconfont icon-qq'></i>&nbsp;联系客服</a></div>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='" + rootPath + "/user/order' style='color:#fff;' target='_blank'><i class='iconfont icon-go'></i>&nbsp;查看课程订单</a></div></div>" +
            "</div>");

        $(".closeBtn").on("click", function () {
            $(".paydialog_mask").remove();
            $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                $(this).remove();
                //关闭刷新当前页面
                window.location.href = window.location.href;
            });
        });

        $(".paydialog_mask").on("click", function () {
            $(".closeBtn").trigger("click");
        });

    },
    weixinpay: function (courseId) {
        //每次进来都把原来支付的定时器关闭
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            mkCoursePay.load(courseId, function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                var bookPrice = pdata.bookPrice;
                var html = "";
                if (bookPrice) {
                    html = "课程费用：<span id='oldPriceBox'>￥" + pdata.tprice + "元</span> - 图书费用：<span id='bookpriceBox'>￥" + pdata.bookPrice + "元</span> = 应付：<span id='wechatMoney'>￥" + (pdata.tprice - pdata.bookPrice) + "元</span>";
                } else {
                    html = "支付：<span id='wechatMoney'>￥" + pdata.tprice + "元</span>";
                }
                $("body").append("<div class='popupP animated fadeInUp'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titWeixin'></h4>" +
                    "	<p class='totleMoney'>" + html + "</p>" +
                    "	<div class='twoCode'>" +
                    "		<div id='payloadingbox'></div><img  id='qrcode' src='" + basePath + "/weixin/course?courseId=" + courseId + "'>" +
                    "	</div>" +
                    "	<p class='scan'>请使用微信扫一扫，扫描二维码支付</p>" +
                    "	<div class='payWay tc'>" +
                    "		<div class='titMain'></div>" +
                    "		<p  class='red'>支付进行中...</p>" +
                    "	</div>" +
                    "	<p class='prompt'>30分钟内完成支付，如果支付遇到问题，可以点击【 <a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#41b944;' target='_blank'>联系客服</a>】或" +
                    "	【 <a href='" + rootPath + "/user/order' style='color:#41b944;' target='_blank'>查看订单</a>】</p>" +
                    "	<p class='prompt'><a href='javascript:void(0);' onclick='mkCoursePay.alipay(this)' data-courseid='" + courseId + "'>返回支付</a></p>" +
                    "</div>");

                loading2("#payloadingbox", 4);
                $("#qrcode").hide().load(function () {
                    $("#payloadingbox").empty();
                    $(this).show();
                });
                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                        //关闭刷新当前页面
                        window.location.href = window.location.href;
                    });
                });

                $(".paydialog_mask").on("click", function () {
                    $(".closeBtn").trigger("click");
                });
            })
        });
    },
    alipay: function (obj) {
        //每次进来都把原来支付的定时器关闭
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            var courseId = $(obj).data("courseid");
            mkCoursePay.load(courseId, function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                var bookPrice = pdata.bookPrice;
                var html = "";
                if (bookPrice) {
                    html = "课程费用：<span id='oldPriceBox'>￥" + pdata.tprice + "元</span> - 图书费用：<span id='bookpriceBox'>￥" + pdata.bookPrice + "元</span> = 应付：<span id='priceBox'>￥" + (pdata.tprice - pdata.bookPrice) + "元</span>";
                } else {
                    html = "应付：<span id='priceBox'>￥" + pdata.tprice + "元</span>";
                }
                $("body").append("<div class='paydialog animated fadeInLeft'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titMain'>&nbsp;</h4>" +
                    "	<div class='classInfo'>" +
                    "		<div class='money'>" + html + "</div>" +
                    "		<h5 id='name'>" + pdata.title + "</h5>" +
                    "		<p>" + pdata.description + "</p>" +
                    "	</div>" +
                    "	<div class='payWay'>" +
                    "		<p>请选择支付方式</p>" +
                    "		<ul id='payWay'>" +
                    "			<li class='weixin active' data-pay='wechat'><span class='iconfont icon-yes'></span></li>" +
                    "			<li class='alipay' data-pay='alipay'><span class='iconfont icon-yes'></span></li>" +
                    "		</ul>" +
                    "	</div>" +
                    "	<div class='micMoney'  style='display: none;'>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			可用 <span id='userMoney'></span> 抵扣 <span id='delUserMoney'></span>" +
                    "			<div class='userMoneySwitch changeYes'>" +
                    "				<div class='switchLine'>" +
                    "					<ul>" +
                    "						<li class='switchYes'></li>" +
                    "						<li class='switchNo'></li>" +
                    "					</ul>" +
                    "				</div>" +
                    "				<div class='switchBtn btnYes'></div>" +
                    "			</div>" +
                    "		</div>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			" + pdata.description + " <span class='btnOff'></span>" +
                    "		</div>" +
                    "	</div>" +
                    "	<div class='popBtn mt10' id='payBtn'>点击支付</div>" +
                    "</div>").append("<div class='paydialog_mask'></div>");


                var bgimg = $(obj).data("img") || $("body").data("img");
                if (isNotEmpty(bgimg)) $(".titBg.money,#payBtn").css("backgroundImage", "url(" + rootPath + "/" + bgimg + ")");

                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                    });
                });

                $(".paydialog_mask").on("click", function () {
                    $(".closeBtn").trigger("click");
                });

                $("#payWay >li").on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                });

                $("#payBtn").on("click", function () {
                    var type = $("#payWay").find("li.active").data("pay");
                    mkCoursePay.paying();
                    if (type == "alipay") {
                        // 打开页面，此处最好使用提示页面
                        var newWin = window.open(rootPath + "/payloading");
                        $.post(rootPath + "/admin/alipay/course", {"courseId": courseId}, function (data) {
                            loadSession();//防止session过期造成userid丢失
                            mkCoursePay.alipaying(courseId);
                            newWin.location.href = data;
                        });
                    } else {
                        mkCoursePay.weixinpay(courseId);
                        loadSession();//防止session过期造成userid丢失
                        mkCoursePay.alipaying(courseId);
                    }
                });
            });
        });

    },
    paytimer: null,
    paytimeout: null,
    alipaying: function (courseId) {
        if (this.paytimer) clearInterval(this.paytimer);
        this.paytimer = setInterval(function () {
            request(basePath + "/shoporder/countbuy/" + courseId, function (data) {
                if (data > 0) {
                    $(".titMain").css("color", "#4CAF50").html("支付成功，请点击【查看课程订单按钮】进行查看。");
                    $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
                    var index = 5;
                    setInterval(function () {
                        if (index <= 1) {
                            $(".closeBtn").trigger("click");
                            return;
                        }
                        index--;
                        $("#timerback").html(index);
                    }, 1000);
                    if (mkCoursePay.paytimer) clearInterval(mkCoursePay.paytimer);
                }
            });
        }, 3000);

        if (this.paytimeout) clearTimeout(this.paytimeout);
        //30分钟如果没有支付完毕关闭支付
        this.paytimeout = setTimeout(function () {
            if (mkCoursePay.paytimer) clearInterval(mkCoursePay.paytimer);
            $(".titMain").css("color", "#ff0000").html("支付超时，请点击【查看课程订单】按钮进行查看。");
            $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
            var index = 5;
            var ctimer = setInterval(function () {
                if (index <= 1) {
                    $(".closeBtn").trigger("click");
                    if (ctimer) clearInterval(ctimer);
                    return;
                }
                index--;
                $("#timerback").html(index);
            }, 1000);
            clearInterval(this.paytimeout);
            if (mkCoursePay.paytimeout) clearTimeout(mkCoursePay.paytimeout);
        }, 1800000);
    }
};


var mkBookPay = {
    init: function () {

    },
    load: function (opid, callback) {
        request(basePath + "/books/get/" + opid, function (data) {
            if (callback) callback(data);
        });
    },
    paying: function (obj) {
        $(".paydialog").remove();
        $(".popupP").remove();
        //支付中
        $("body").append("<div class='paydialog animated fadeInLeft'>" +
            "	<div class='titTop'>" +
            "		<div class='titBg money'>&nbsp;</div>" +
            "		<div class='closeBtn' style='display:none;'>&nbsp;</div>" +
            "	</div>" +
            "	<h4 class='titMain'>为确保支付，请勿关闭支付窗口。</h4>" +
            "	<div class='payWay tc'>" +
            "		<p>支付进行中...</p>" +
            "		" +
            "	</div><div style='text-align:center;'>" +
            "	<p>30分钟内完成支付，如果支付过程中遇到问题，请直接联系客服进行处理和协商</p>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#fff;' target='_blank'><i class='iconfont icon-qq'></i>&nbsp;联系客服</a></div>" +
            "	<div style='display:inline-block' class='popBtn mt10'><a href='" + rootPath + "/user/bookorder' style='color:#fff;' target='_blank'><i class='iconfont icon-go'></i>&nbsp;查看课程订单</a></div></div>" +
            "</div>");

        $(".closeBtn").on("click", function () {
            $(".paydialog_mask").remove();
            $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                $(this).remove();
                //关闭刷新当前页面
                window.location.href = window.location.href;
            });
        });

    },
    weixinpay: function (courseId) {
        //每次进来都把原来支付的定时器关闭
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            mkBookPay.load(courseId, function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                $("body").append("<div class='popupP animated fadeInUp'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titWeixin'></h4>" +
                    "	<p class='totleMoney'>" +
                    "		支付：<span id='wechatMoney'>￥" + pdata.money + "元</span>" +
                    "	</p>" +
                    "	<div class='twoCode'>" +
                    "		<div id='payloadingbox'></div><img  id='qrcode' src='" + basePath + "/weixin/book?bid=" + courseId + "'>" +
                    "	</div>" +
                    "	<p class='scan'>请使用微信扫一扫，扫描二维码支付</p>" +
                    "	<div class='payWay tc'>" +
                    "		<div class='titMain'></div>" +
                    "		<p  class='red'>支付进行中...</p>" +
                    "	</div>" +
                    "	<p class='prompt'>30分钟内完成支付，如果支付遇到问题，可以点击【 <a href='http://wpa.qq.com/msgrd?v=3&uin=1990000769&site=qq&menu=yes' style='color:#41b944;' target='_blank'>联系客服</a>】或" +
                    "	【 <a href='" + rootPath + "/user/bookorder' style='color:#41b944;' target='_blank'>查看订单</a>】</p>" +
                    "	<p class='prompt'><a href='javascript:void(0);' onclick='mkBookPay.alipay(this)' data-courseid='" + courseId + "'>返回支付</a></p>" +
                    "</div>");

                loading2("#payloadingbox", 4);
                $("#qrcode").hide().load(function () {
                    $("#payloadingbox").empty();
                    $(this).show();
                });
                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                        //关闭刷新当前页面
                        window.location.href = window.location.href;
                    });
                });
            })
        });
    },
    alipay: function (obj) {
        //每次进来都把原来支付的定时器关闭
        if (this.paytimer) clearInterval(this.paytimer);
        mkLogin.login(function () {
            var courseId = $(obj).data("courseid");
            mkBookPay.load(courseId, function (pdata) {
                $(".paydialog").remove();
                $(".popupP").remove();
                $("body").append("<div class='paydialog animated fadeInLeft'>" +
                    "	<div class='titTop'>" +
                    "		<div class='titBg money'>&nbsp;</div>" +
                    "		<div class='closeBtn'>&nbsp;</div>" +
                    "	</div>" +
                    "	<h4 class='titMain mb20'>开通学习会员,为了网站的长期发展，请支持一下，感谢！</h4>" +
                    "	<div class='classInfo'>" +
                    "		<div class='money'>" +
                    "			应付：<span id='priceBox'>￥" + pdata.money + "元</span>" +
                    "		</div>" +
                    "		<h5 id='name'>" + pdata.title + "</h5>" +
                    "		<p>" + pdata.subtitle + "</p>" +
                    "	</div>" +
                    "	<div class='payWay'>" +
                    "		<p>请选择支付方式</p>" +
                    "		<ul id='payWay'>" +
                    "			<li class='weixin active' data-pay='wechat'><span class='iconfont icon-yes'></span></li>" +
                    "			<li class='alipay' data-pay='alipay'><span class='iconfont icon-yes'></span></li>" +
                    "		</ul>" +
                    "	</div>" +
                    "	<div class='micMoney'  style='display: none;'>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			可用 <span id='userMoney'></span> 抵扣 <span id='delUserMoney'></span>" +
                    "			<div class='userMoneySwitch changeYes'>" +
                    "				<div class='switchLine'>" +
                    "					<ul>" +
                    "						<li class='switchYes'></li>" +
                    "						<li class='switchNo'></li>" +
                    "					</ul>" +
                    "				</div>" +
                    "				<div class='switchBtn btnYes'></div>" +
                    "			</div>" +
                    "		</div>" +
                    "		<div class='micItem' style='display: none;'>" +
                    "			" + pdata.subtitle + " <span class='btnOff'></span>" +
                    "		</div>" +
                    "	</div>" +
                    "	<div class='popBtn mt10' id='payBtn'>点击支付</div>" +
                    "</div>").append("<div class='paydialog_mask'></div>");


                var bgimg = $(obj).data("img") || $("body").data("img");
                if (isNotEmpty(bgimg)) $(".titBg.money,#payBtn").css("backgroundImage", "url(" + rootPath + "/" + bgimg + ")");

                $(".closeBtn").on("click", function () {
                    $(".paydialog_mask").remove();
                    $(".paydialog,.popupP").removeClass("animated fadeInLeft").addClass("animated fadeOutRight").fadeOut("slow", function () {
                        $(this).remove();
                    });
                });

                $("#payWay >li").on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                });

                $("#payBtn").on("click", function () {
                    var type = $("#payWay").find("li.active").data("pay");
                    mkBookPay.paying();
                    if (type == "alipay") {
                        // 打开页面，此处最好使用提示页面
                        var newWin = window.open(rootPath + "/payloading");
                        $.post(rootPath + "/admin/alipay/book", {"bookId": courseId}, function (data) {
                            loadSession();//防止session过期造成userid丢失
                            mkBookPay.alipaying(courseId);
                            newWin.location.href = data;
                        });
                    } else {
                        mkBookPay.weixinpay(courseId);
                        loadSession();//防止session过期造成userid丢失
                        mkBookPay.alipaying(courseId);
                    }
                });
            });
        });

    },
    paytimer: null,
    paytimeout: null,
    alipaying: function (courseId) {
        if (this.paytimer) clearInterval(this.paytimer);
        this.paytimer = setInterval(function () {
            request(basePath + "/shoporderbook/countbuybook/" + courseId, function (data) {
                if (data > 0) {
                    $(".titMain").css("color", "#4CAF50").html("支付成功，请点击【查看课程订单按钮】进行查看。");
                    $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
                    var index = 5;
                    setInterval(function () {
                        if (index <= 1) {
                            $(".closeBtn").trigger("click");
                            return;
                        }
                        index--;
                        $("#timerback").html(index);
                    }, 1000);
                    if (mkBookPay.paytimer) clearInterval(mkBookPay.paytimer);
                }
            });
        }, 3000);

        if (this.paytimeout) clearTimeout(this.paytimeout);
        //30分钟如果没有支付完毕关闭支付
        this.paytimeout = setTimeout(function () {
            if (mkBookPay.paytimer) clearInterval(mkBookPay.paytimer);
            $(".titMain").css("color", "#ff0000").html("支付超时，请点击【查看课程订单】按钮进行查看。");
            $(".payWay").find("p").html("<span id='timerback'>5</span>秒自动关闭...");
            var index = 5;
            var ctimer = setInterval(function () {
                if (index <= 1) {
                    $(".closeBtn").trigger("click");
                    if (ctimer) clearInterval(ctimer);
                    return;
                }
                index--;
                $("#timerback").html(index);
            }, 1000);
            clearInterval(this.paytimeout);
            if (mkBookPay.paytimeout) clearTimeout(mkBookPay.paytimeout);
        }, 1800000);
    }
};