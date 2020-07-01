$(function () {
    //记录地址
    setCacheLink();
    var pageNo = 0;
    var pageSize = 10;

    function loadComment(pageNo, pageSize) {
        loading2("#loadingbox");
        var blogId = $("body").data("opid");
        request(basePath + "/blogcomment/template", function (data) {
            $(".nofound").hide();
            $("#loadingbox").empty();
            if (isNotEmpty(data)) {
                $("#commentbox").append(data);
                var itemcount = $("#commentbox").children().first().data("itemcount");
                $(".commentnum").html(itemcount);
                if (itemcount > 10) {
                    $("#loadmore").data("itemcount", itemcount).show();
                }
            } else {
                if (pageNo == 0) {
                    $("#loadingbox").show().html("<p class='tc' style='padding:50px 0'>暂无评论,抢沙发得积分</p>");
                } else {
                    $("#loadmore").fadeOut(2000).off("click").find("a").html("加载完毕");
                }
            }
        }, {
            pageNo: pageNo * pageSize,
            pageSize: pageSize,
            blogId: blogId
        });
    }

    $("#loadmore").on("click", function () {
        pageNo++;
        loadComment(pageNo, pageSize);
    });

    //加载评论
    loadComment(pageNo, pageSize);

    //更新点击数
    updateHits();
    queryHits();


    //评论回复
    $("#commentbox").on("click", ".content_list_resendbtn", function () {
        $(this).parents("li").find(".comment_respond_box").slideDown("slow");
        $(this).parents("li").find(".comment_respond_box").find("input").focus();
        var uid = $(this).data("uid");
        var url = $(this).data("link");
        var uname = $(this).attr("title");
        $(this).parents("li").find(".comment_respond_box").find(".rname").text("@" + uname);
        $(this).parents("li").find(".comment_respond_box").find("button").data({
            uid: uid,
            link: url
        }).attr("title", uname);
    });

    $("#commentbox").on("click", ".children-reply-in", function () {
        $(this).parents("li").find(".comment_respond_box").slideDown("slow");
        $(this).parents("li").find(".comment_respond_box").find("input").focus();
        var uid = $(this).data("uid");
        var url = $(this).data("link");
        var uname = $(this).attr("title");
        $(this).parents("li").find(".comment_respond_box").find(".rname").text("@" + uname);
        $(this).parents("li").find(".comment_respond_box").find("button").data({
            uid: uid,
            link: url
        }).attr("title", uname);
    });

    //评论回复
    $("#commentbox").on("click", ".childmorebox", function () {
        var $that = $(this);
        var pno = $that.data("pageno");
        var psize = $that.data("pagesize");
        var itemcount = $that.data("itemcount");
        var parentId = $that.data("opid");
        pno++;
        $that.data("pageno", pno);
        var params = {
            pageNo: (pno * psize),
            pageSize: psize,
            parentId: parentId
        };
        request(basePath + "/blogcomment/ctemplate", function (data) {
            if (isNotEmpty(data)) {
                $that.prev().append(data);
            } else {
                $that.fadeOut(2000).find("a").html("加载完毕");
            }
        }, params);
    });


    //删除评论
    $("#commentbox").on("click", ".delcomment", function () {
        var $that = $(this);
        var opid = $that.data("opid");
        mkCommon.error("你确定抛弃它吗？", "tip", function (ok) {
            if (ok) {
                mkLogin.login(function (udata) {
                    request(basePath + "/blogcomment/delete", function (data) {
                        $that.parents("li").slideUp("slow", function () {
                            $(this).remove();
                            //改变评论数
                            var itemcount = $(".commentnum").html();
                            $(".commentnum").html(itemcount * 1 - 1);
                        });
                    }, {
                        id: opid
                    });
                });
            }
        });
    });

    //删除子评论
    $("#commentbox").on("click", ".delcom", function () {
        var $that = $(this);
        var opid = $that.data("opid");
        mkCommon.error("你确定抛弃它吗？", "tip", function (ok) {
            if (ok) {
                mkLogin.login(function (udata) {
                    request(basePath + "/blogcomment/delete", function (data) {
                        $that.parents(".comment-chbox").slideUp("slow", function () {
                            $(this).remove();
                        });
                    }, {
                        id: opid
                    });
                });
            }
        });
    });


    //评论
    $("#send_reply").on("click", saveComment);

    function saveComment() {
        var $that = $(this);
        var reply_text = $("#reply_text").val();
        var content = filterTag(reply_text);
        var blogId = $(this).data("opid");
        if (isEmpty(content)) {
            mkCommon.error("请输入评论...");
            $("#reply_text").focus();
            return false;
        }
        if (content.length < 2) {
            mkCommon.error("评论过短最少2个字符...");
            $("#reply_text").focus();
            return false;
        }

        var params = {
            content: content,
            blogId: blogId
        };
        var codeHide = $("#codebox").is(":hidden");
        if (!codeHide) {
            var code = $("#code").val();
            if (isEmpty(code) || code.length > 4) {
                mkCommon.error("请输入验证码...", "error");
                $("#code").focus();
                return;
            }
            params["code"] = code;
        }


        mkLogin.login(function (udata) {

            $that.off("click").text("发布中...");
            var index = 5;
            if (udata.timer) clearInterval(udata.timer);
            udata.timer = setInterval(function () {
                if (index == 0) {
                    $that.on("click", saveComment).html("评论");
                    clearInterval(udata.timer);
                } else {
                    $that.off("click").html(index + "s");
                    index--;
                }
            }, 1000);


            request(basePath + "/blogcomment/save", function (data) {
                if (isEmpty(data)) {
                    mkCommon.error("别那么着急，每次评论的时间间隔是:5秒...", "error");
                } else {
                    if (data.id == -1) {
                        mkCommon.error("请输入验证码...", "error");
                        $("#codebox").show();
                        $("#code").focus();
                        $that.on("click", saveComment).html("评论");
                        clearInterval(udata.timer);
                    } else if (data.id == 0) {
                        mkCommon.error("检查一下，验证码貌似有误...", "error");
                        $("#codebox").show();
                        $("#code").val("").focus();
                        $("#codebox").find("img").trigger("click");
                        $that.on("click", saveComment).html("评论");
                        clearInterval(obj.timer);
                    } else if (data.id == -3) {
                        mkCommon.error("严重警告! 检测到敏感词，" + data.error, "error");
                        $("#reply_text").val("").focus();
                    } else if (data.id == -2) {
                        mkCommon.error("请输入内容...", "error");
                        $("#reply_text").focus();
                    } else {
                        //清空对应的数据
                        $("#reply_text").val("");
                        $("#codebox").hide();
                        $("#loadingbox").hide();
                        $("#code").val("");
                        //验证码重新激活
                        $("#codebox").find("img").trigger("click");
                        //改变评论数
                        var itemcount = $(".commentnum").html();
                        $(".commentnum").html(itemcount * 1 + 1);
                        //提示评论成功
                        mkCommon.error("评论成功...", "success");
                        //给评论按钮重新绑定事件
                        $that.on("click", saveComment).html("评论");
                        //追加内容到评论区域
                        $("#commentbox").prepend("<li class='c_items animated fadeInUp'><div class='content_list_resend'>" +
                            "	<p class='content_list_resendbtn' title='" + udata.username + "' data-uid='" + udata.id + "' data-link='" + udata.url + "'>回复</p>" +
                            "	<p class='mt15 delcomment' data-opid='" + data.id + "'><i class='iconfont icon-remove'></i></p>" +
                            "</div>" +
                            "<div class='pic_content_list_headimg'>" +
                            "	<a class='content_list_headimg_a' href='" + rootPath + "/u/" + udata.url + "' target='_blank'><img width='60' height='60' onerror='imgError(this)' src='" + rootPath + "/" + udata.headerPic + "'></a>" +
                            "</div>" +
                            "<dl>" +
                            "	<dt>" +
                            "		<a class='snick' href='" + rootPath + "/u/" + udata.url + "' target='_blank'><i class='iconfont fz22 tp1 icon-" + (udata.type == 1 ? 'vip' : 'teacher') + " " + (udata.type == 1 ? 'red' : 'green') + "'></i>&nbsp;&nbsp;" + udata.username + "</a><span><time class='green'>刚刚</time></span>" +
                            "	</dt>" +
                            "	<dd>" +
                            "		<span class='comment-text'>" + content + "</span>" +
                            "	</dd>" +
                            "<div class='comment_respond_box' style='display:none;'>" +
                            "	<div class='comment_respond_textarea'>" +
                            "		<span class='resend_sb'><a>回复<span class='rname'>@" + udata.username + "</span>：" +
                            "		</a></span>" +
                            "		<input placeholder='输入文字' maxLength='400' class='text'/>" +
                            "	</div>" +
                            "	<button class='reply-in' data-blogid='" + blogId + "' onclick='saveChildComment(this)' data-opid='" + data.id + "' data-uid='" + udata.id + "'>评论</button>" +
                            "</div></dl></li>");
                        addCron(5, 1, "评论博客", window.location.href, $("#reply_text"));
                    }
                }
            }, params);
        });
    }
});


//更新点击数
function updateHits() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(function () {
        var blogId = $("body").data("opid");
        request(basePath + "/blog/updatehit/" + blogId);
    }, 200);
};

//更新点击数
function queryHits() {
    if (this.cctimer) clearTimeout(this.timer);
    this.cctimer = setTimeout(function () {
        var blogId = $("body").data("opid");
        request(basePath + "/blog/queryHits/" + blogId, function (data) {
            $("#hitsc").html(data);
        });
    }, 200);
};


//保存回复评论
function saveChildComment(obj) {
    var $that = $(obj);
    var that = obj;
    mkLogin.login(function (udata) {
        var uid = $that.data("uid"); //要回复的用户
        if (uid != udata.id) {
            var opid = $that.data("opid"); //对应的回复id
            var blogId = $that.data("blogid"); //对应的博客id
            var content = $that.parent().find(".text").val();
            if (isEmpty(content)) {
                mkCommon.error("请输入评论...");
                $that.parent().find(".text").focus();
                return false;
            }
            if (content.length < 2) {
                mkCommon.error("评论过短最少2个字符...");
                $that.parent().find(".text").focus();
                return false;
            }
            var params = {
                content: filterTag(content),
                parentId: opid,
                blogId: blogId,
                replyUserId: uid
            };

            if (that.cflag == 1) return;
            that.cflag = 1;
            var index = 5;
            if (that.timer2) clearInterval(that.timer2);
            that.timer2 = setInterval(function () {
                if (index == 0) {
                    $that.attr("onclick", "saveChildComment(this)").html("评论");
                    clearInterval(that.timer2);
                    that.cflag = 0;
                } else {
                    $that.removeAttr("onclick").html(index + "s");
                    index--;
                }
            }, 1000);

            $that.removeAttr("onclick").text("发布中...");
            request(basePath + "/blogcomment/saveChild", function (data) {
                if (isEmpty(data)) {
                    mkCommon.error("别那么着急，每次评论的时间间隔是:5秒...", "error");
                    that.cflag = 1;
                } else {
                    if (data.id == -2) {
                        mkCommon.error("请输入内容...", "error");
                        $that.parent().find(".text").focus();
                        that.cflag = 0;
                    } else if (data.id == -3) {
                        mkCommon.error("严重警告! 检测到敏感词，" + data.error, "error");
                        $that.parent().find(".text").val("").focus();
                    } else {
                        mkCommon.error("评论成功...", "success");
                        $that.parent().find(".text").focus().val("");
                        $that.attr("onclick", "saveChildComment(this)").html("评论");
                        that.cflag = 0;
                        var rlink = $(obj).data("link");
                        var runame = $(obj).attr("title");
                        $that.parents("li").find(".commentchlidbox").append("<div class='comment-chbox animated fadeInDown'>" +
                            "<div class='ch-avatar fl'><a href='" + rootPath + "/u/" + udata.url + "' target='_blank'><img width='36' height='36' onerror='imgError(this)' src='" + rootPath + "/" + udata.headerPic + "' /></a></div>" +
                            "<div class='ch-text'>" +
                            "	<div class='tit'>" +
                            "	<a href='" + rootPath + "/u/" + udata.url + "' target='_blank'>" + udata.username + "</a>" +
                            "<span class='ttx'>回复:</span>" +
                            "<a href='" + rootPath + "/u/" + rlink + "' target='_blank'>" + runame + "</a>" +
                            "<time class='green' title='刚刚'>1秒前</time>" +
                            "	</div>" +
                            "	<div class='mt5'>" + content + "</div>" +
                            "</div>" +
                            "<div class='btnbox'>" +
                            "<a  href='javascript:void(0);' class='children-reply-in pr5'  title='" + udata.username + "' data-link='" + udata.url + "' data-uid='" + udata.id + "'><i class='iconfont icon-reply'></i><span class='fz12'>&nbsp;回复</span></a>" +
                            "<a href='javascript:void(0);' class='delcom pl5' data-opid='" + data.id + "'><i class='iconfont icon-remove'></i><span class='fz12'>&nbsp;删除</span></a></div>" +
                            "</div>");
                    }
                }
            }, params);
        } else {
            mkCommon.error("自己不能回复自己", "tip");
        }
    });
}