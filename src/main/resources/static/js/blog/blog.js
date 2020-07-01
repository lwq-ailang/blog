$(function () {
    mkNewBlog.loadContent();
    mkNewBlog.loadScorll();
});

//记录地址
setCacheLink();
var pageNo = 0;
var pageSize = 15;
var flag = true;//目的是为了；让每一次执行完毕以后在执行下一次的数据查询
var mkflag = true;//边界锁
var ctimer = null;
var mkNewBlog = {
    loadContent: function () {
        loading2("#loader");
        if (ctimer) clearTimeout(ctimer);
        ctimer = setTimeout(function () {
            var pno = pageNo * pageSize;
            var params = {pageNo: pno, pageSize: pageSize};
            request(basePath + "/blog/ctemplate", function (data) {
                $("#loader").empty();
                if (isNotEmpty(data)) {
                    $("#container").append(data);
                    //图片延迟加载
                    KeCmpFactory("lazyLoad");
                    //提示插件
                    $(".mkui-tips,.tmui-tips").tmTip();
                    flag = true;
                } else {
                    mkflag = false;
                    var itemcount = $("#container").children().first().data("itemcount");
                    if (isEmpty(itemcount) || itemcount == 0) {
                        $("#container").append("<div class='nofound'><a href='" + basePath + "' target='_blank'><span class='n-ficon n22'</span></a></div>");
                    } else {
                        mkCommon.error("加载完毕", "tip");
                    }
                }

            }, params);
        }, 300);
    },

    loadScorll: function () {
        //给窗口绑定滚动事件
        $(window).on("scroll", function () {
            //获取滚动top距离
            var scrollTop = $(this).scrollTop();
            //获取浏览器的可视高度
            var wheight = window.innerHeight;
            //文档的高度
            var docHeight = document.body.scrollHeight;
            //如果滚动条高度 + wheight == 文档高度；代表滚动条到底了。
            //+10的目的是让滚动条提前到底，然后方便去加载下次的数据
            if (mkflag && flag && scrollTop + wheight + 10 >= docHeight) {
                //锁住，让每一次加载数据执行完毕才打开
                flag = false;
                //分页pageNo ++;
                pageNo++;
                mkNewBlog.loadContent();
            }
        });
    }

};


var mkBlog = {
    setData: function () {

    },
    edit: function (obj) {
        var opid = $(obj).data("opid");
        request(basePath + "/blog/load/" + opid, function (data) {
            if (data) {
                $("#title").val(data.name).data("opid", data.id);
                $("#category").find("option[value='" + data.categoryId + "']").prop("selected", true);
                $("#courseId").find("option[value='" + data.courseId + "']").prop("selected", true);
                $("#tag").val(data.tag);
                $(".filesbox").html("<img src='" + rootPath + "/" + data.img + "'>");
                $("#filesboximg").data({
                    width: data.width,
                    height: data.height,
                    img: data.img
                });

                $("#hits").val(data.hits);
                $("input[name='column'][value='" + data.kcolumn + "']").prop("checked", true);
                $("#audiobox").attr("src", rootPath + "/" + data.musicLink).data("img", data.musicLink);
                setEditorContent("contentBox", data.description);
                $("#addvideo").html(data.videoLink);
                $("#isComment").find("option[value=" + data.isComment + "]").prop("selected", true);
                $("#isOpen").find("option[value=" + data.isComment + "]").prop("selected", true);
                $("html,body").animate({scrollTop: 0});
                $("#thumnimg").val(data.thumnimg);
            }
        });
    },
    del: function (obj) {
        mkCommon.error("你确定抛弃它吗?", "tip", function (ok) {
            if (ok) {
                var opid = $(obj).data("opid");
                request(basePath + "/blog/delete/" + opid, function (data) {
                    if (data == "success") {
                        $(obj).parents(".mk_items").fadeOut("slow", function () {
                            $(this).remove();
                        });
                    }
                });
            }
        });
    },
    save: function () {
        var title = $("#title").val();
        var opid = $("#title").data("opid");//操作id
        var img = $("#filesboximg").data("img");
        var width = $("#filesboximg").data("width");
        var height = $("#filesboximg").data("height");
        var musicLink = $("#audiobox").data("img");
        var tag = $("#tag").val();
        var userId = $(".kusername").data("userid");
        var description = getEditorText("contentBox");
        var videoLink = $("#addvideo").val();
        var categoryId = $("#category").val();
        var courseId = $("#courseId").val();
        var isComment = $("#isComment").val();
        var thumnimg = $("#thumnimg").val();
        var isOpen = $("#isOpen").val();
        var cname = $("#category").find("option[value='" + categoryId + "']:selected").text();
        var hits = $("#hits").val();
        var kcolumn = $("input[name='column']:checked").val();

        if (isEmpty(title)) {
            loading("请输入标题", 4);
            return;
        }

        if (isEmpty(description)) {
            loading("请输入内容", 4);
            return;
        }


        description = getEditorHtml("contentBox");
        var params = {
            name: title,
            tag: tag,
            img: img,
            width: width,
            height: height,
            userId: userId,
            kcolumn: kcolumn,
            musicLink: musicLink,
            videoLink: videoLink,
            categoryId: categoryId,
            isComment: isComment,
            isOpen: isOpen,
            thumnimg: thumnimg,
            hits: hits,
            courseId: courseId,
            description: description
        };


        var method = "save";
        if (isNotEmpty(opid)) {
            params["id"] = opid;
            method = "update";
        }

        KAjax.request({
            url: basePath + "/blog/" + method, callback: function (data) {
                if (data) {
                    mkCommon.error("操作成功!", "success");
                    //清空数据
                    $("#title").empty().data("opid", "");
                    $("#audiobox").removeData("img").attr("src", "");
                    $("#tag").val("");
                    $("#addvideo").empty();
                    $("#category").val("")
                    $("#hits").val("");
                    setEditorContent("contentBox", "");
                    $("#isComment").find("option[value=1]").prop("selected", true);
                    $("#isOpen").find("option[value=1]").prop("selected", true);
                    $("#courseId").find("option[value='']").prop("selected", true);
                    $("#category").find("option[value='']").prop("selected", true);
                    $("#filesboximg").removeData("img").removeData("height").removeData("width");
                    $(".filesbox").empty();
                    removeSession("mk_blog_img");
                    removeSession("mk_blogmp3_img");
                    staticblog(data.id);
                }
            }
        }, params);
    }

};

