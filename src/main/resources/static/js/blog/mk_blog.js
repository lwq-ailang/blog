$(function () {
    //记录地址
    setCacheLink();
    var $container = $("#container");
    var $loader = $('#loader');
    var iwidth = 320;
    var ispace = 50;
    var iOuterWidth = iwidth + ispace;
    var iCells = 0;//列数

    //var sUrl = "http://www.wookmark.com/api/json/popular?callback=?";//请求的地址
    var sUrl = basePath + "/blog/template.do";//请求的地址
    var iPage = -1;//分页
    var iBtn = true;

    //记录每个列的每个元素的坐标位置
    var arrT = [];
    var arrL = [];

    //设置多少列
    function setCell() {
        iCells = Math.floor($(window).width() / iOuterWidth);
        if (iCells < 3) {
            iCells = 3;
        } else if (iCells > 5) {
            iCells = 5;
        }

        $container.css("width", iCells * iOuterWidth);
    }

    setCell();

    //设置第一列的值和内容
    for (var i = 0; i < iCells; i++) {
        arrT[i] = 0;
        arrL[i] = iOuterWidth * i;
    }


    //开始查询数据
    function getData() {
        mkLogin.login(function (data) {
            if (!iBtn) {
                return;
            }
            iBtn = false;
            iPage++;
            $("#loader").show();
            $.getJSON(sUrl, {pageNo: iPage * 5}, function (jData) {
                $.each(jData, function (index, blog) {
                    var $div = $("<div class='mk_items animated fadeInUp'></div>");
                    var html = "";
                    if (isNotEmpty(data.id) && (data.id == 1 || data.id == blog.userId)) {
                        html = "&nbsp;&nbsp;<a href='javascript:void(0);' class='edit' onclick='mkBlog.edit(this)' data-opid='" + blog.id + "'><i class='iconfont icon-edit'></i></a>&nbsp;&nbsp;<a href='javascript:void(0);' onclick='mkBlog.del(this)' class='delete' data-opid='" + blog.id + "'><i class='iconfont icon-remove'></i></a>"
                    }
                    //计算等比例的高度
                    var minh = $("<div>" + blog.description + "</div>").children().length * 30;
                    var iHeight = blog.height * (iwidth / blog.width) + minh + 100;

                    $div.html("<div class='mk_kimgbox '><a href='" + rootPath + "/blog/" + blog.id + ".do' target='_blank' title='" + blog.name + "'><img  onerror='imgError(this)' src='" + rootPath + "/images/noimg.jpg' _src='" + rootPath + "/" + blog.img + "' width='100%'></a></div>" +
                        "				<a href='" + rootPath + "/blog/" + blog.id + ".do'  target='_blank' title='" + blog.name + "'><div class='mk_utbox'>" +
                        "					<h1>" + blog.name + html + "</h1>" +
                        "					<div class='mkuline'></div>" +
                        "					<div class='kc_cnt' style='height:" + minh + "px'>" + blog.description + "</div>" +
                        "					<div class='mkc_bottom'>" +
                        "						<span title='收藏'><i class='iconfont icon-love'></i>" + blog.hits + "</span>" +
                        "						<span title='浏览数'><i class='iconfont icon-star'></i>0</span>" +
                        "						<span title='创建时间'><i class='iconfont icon-time'></i>" + blog.createTime + "</span>" +
                        "					</div></a>" +
                        "				</div>");
                    $container.append($div);
                    //图片延迟加载
                    KeCmpFactory("lazyLoad");
                    //提示插件
                    $(".mkui-tips,.tmui-tips").tmTip();
                    var _index = getMin();
                    $div.width(iwidth).height(iHeight).css({
                        left: arrL[_index],
                        top: arrT[_index]
                    });

                    arrT[_index] += iHeight + ispace

                    setTimeout(function () {
                        $("#loader").hide();
                    }, 1000);

                    iBtn = true;

                });

            });

        });
    };

    //加载数据
    getData();

    //找到最小列的索引
    function getMin() {
        var v = arrT[0];
        var _index = 0;

        for (var i = 1; i < arrT.length; i++) {
            if (arrT[i] < v) {
                v = arrT[i];
                _index = i;
            }
        }
        return _index;
    };


    $(window).on('scroll', function () {
        var _index = getMin();
        var iH = $(window).scrollTop() + $(window).innerHeight();
        if (arrT[_index] + ispace < iH) {
            getData();
        }

    });

    $(window).on('resize', function () {

        var iLen = iCells;

        setCell();

        if (iLen == iCells) {
            return;
        }


        arrT = [];
        arrL = [];
        for (var i = 0; i < iCells; i++) {
            arrT[i] = 0;
            arrL[i] = iOuterWidth * i;
        }

        $container.find(".mk_items").each(function () {

            var _index = getMin();

            $(this).stop(true, true).animate({
                left: arrL[_index],
                top: arrT[_index]
            }, 1000);

            arrT[_index] += $(this).height() + ispace;

        });
    });

});


var mkBlog = {
    edit: function (obj) {
        var opid = $(obj).data("opid");
        request(basePath + "/blog/load/" + opid, function (data) {
            if (data) {
                $("#title").text(data.name).data("opid", data.id);
                $("#category").find("option[value='" + data.categoryId + "']").prop("selected", true);
                $("#tag").text(data.tag);
                $(".filesbox").html("<img src='" + rootPath + "/" + data.img + "'>");
                $("#filesboximg").data({
                    width: data.width,
                    height: data.height,
                    img: data.img
                });

                $("#hits").text(data.hits);
                $("input[name='column'][value='" + data.kcolumn + "']").prop("checked", true);
                $("#audiobox").attr("src", rootPath + "/" + data.musicLink).data("img", data.musicLink);
                $("#contentBox").html(data.description);
            }
        });
    },
    del: function (obj) {
        var opid = $(obj).data("opid");
        request(basePath + "/blog/delete/" + opid, function (data) {
            if (data == "success") {
                $(obj).parents(".mk_items").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
        });
    },
    save: function () {
        var title = $("#title").text();
        var opid = $("#title").data("opid");//操作id
        var img = $("#filesboximg").data("img");
        var width = $("#filesboximg").data("width");
        var height = $("#filesboximg").data("height");
        var musicLink = $("#audiobox").data("img");
        var tag = $("#tag").text();
        var userId = $(".kusername").data("userid");
        var description = $("#contentBox").html();
        var videoLink = $("#addvideo").val();
        var categoryId = $("#category").val();
        var cname = $("#category").find("option[value='" + categoryId + "']:selected").text();
        var hits = $("#hits").html();
        var kcolumn = $("input[name='column']:checked").val();
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
            hits: hits,
            description: description
        };

        if (isEmpty(title)) {
            loading("请输入标题", 4);
            return;
        }

        if (isEmpty(description)) {
            loading("请输入内容", 4);
            return;
        }

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
                    $("#title").empty();
                    $("#audiobox").removeData("img").attr("src", "");
                    $("#tag").empty();
                    $("#category").val("")
                    $("#hits").empty();
                    $("#contentBox").empty();
                    $("#filesboximg").removeData("img").removeData("height").removeData("width");
                    $(".filesbox").empty();
                    removeSession("mk_blog_img");
                    removeSession("mk_blogmp3_img");
                }
            }
        }, params);
    }

}

