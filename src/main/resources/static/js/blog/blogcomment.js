$(function () {
    setCacheLink();
    $("pre").each(function () {
        $(this).wrapInner("<code class='hljs javascript,java,sql,nodejs,vuejs,html,css,json'></code>");
        $(this).prepend("<div class='rebtn'><button>复制代码</button>&nbsp;<button class='hide'>运行代码</button></div>");
    });

    $("pre").find("button").each(function () {
        InitCopyToClipboard(this);
    });

    var fsize = getSession("fontSize");
    var contentcolor = getSession("contentcolor");
    if (isNotEmpty(fsize)) {
        $(".post-body").find("p,span").css("fontSize", fsize);
    }

    if (isNotEmpty(contentcolor)) {
        if (contentcolor == "#1c1f2b") {
            $(".post-body").find("p,span").addClass("bcof");
            $("a,.h2t,.h3t,.catalog-title").addClass("bcof")
            $(".v *").addClass("bcof")
            $(".title-link,.title-index").addClass("bcof");
        } else {
            $(".post-body").find("p,span").removeClass("bcof");
            $("a,.h2t,.h3t,.catalog-title").removeClass("bcof")
            $(".v *").removeClass("bcof")
            $(".title-link,.title-index").removeClass("bcof");
        }
        $("body").css("background", contentcolor);
    }

    $(".changesize").on("click", function () {
        var fsize = $(this).data("size");
        setSession("fontSize", fsize);
        $(".post-body").find("p,span").css("fontSize", fsize);
    });

    $(".changecolor").on("click", function () {
        var color = $(this).data("color");
        setSession("contentcolor", color);
        if (color == "#1c1f2b") {
            $(".post-body").find("p,span").addClass("bcof");
            $("a,.h2t,.h3t,.catalog-title").addClass("bcof")
            $(".v *").addClass("bcof")
            $(".title-link,.title-index").addClass("bcof");
        } else {
            $(".post-body").find("p,span").removeClass("bcof");
            $("a,.h2t,.h3t,.catalog-title").removeClass("bcof")
            $(".v *").removeClass("bcof")
            $(".title-link,.title-index").removeClass("bcof");
        }

        $("body").css("background", color);
    });

    $("#comments").on("click", ".vemojis>i", function () {
        var text = $(this).text();
        $("#txt_message").insertContent(text);
    });

    $("#txt_message").on("input propertychange", function () {
        var $this = $(this), _val = $this.val(),
            count = "";
        var maxlen = $this.attr("maxlength");
        if (_val.length > maxlen) {
            $this.val(_val.substring(0, maxlen));
        }
        count = maxlen - $this.val().length;
        $(".numtip").text(count);
    });

    $(".menu-item-blog").find("a").addClass("active").end().siblings().find("a").removeClass("active");
    hljs.initHighlightingOnLoad();
    //更新浏览数
    updatehit();
});

function updatehit() {
    var opid = $("body").data("opid");
    $.get(basePath + "/blog/updatehit/" + opid, function (response) {
        $("#bloghits").text(response.data || 0);
    });
}

//换算添加时间距离今天还有多少天
Vue.filter('fomatTime', function (valueTime) {
    return dateDiff(getDateTimeStamp(valueTime));
});


Vue.filter("trimHtml", function (value, len) {
    return trimHtml(value, {limit: len || 200}).html;
})

//格式化日期
Vue.filter('dateFormat', function (valueTime, format) {
    return new Date(getDateTimeStamp(valueTime)).format(format || "yyyy-MM-dd HH:mm:ss");
});

//字符串转换为时间戳
function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
}

function dateDiff(hisTime, nowTime) {
    if (!arguments.length) return '';
    var arg = arguments,
        now = arg[1] ? arg[1] : new Date().getTime(),
        diffValue = now - arg[0],

        result = '',

        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;

    if (_year >= 1) result = parseInt(_year) + "年前";
    else if (_month >= 1) result = parseInt(_month) + "个月前";
    else if (_week >= 1) result = parseInt(_week) + "周前";
    else if (_day >= 1) result = parseInt(_day) + "天前";
    else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
    else if (_min >= 1) result = parseInt(_min) + "分钟前";
    else result = "刚刚";
    return result;
}

var vue = new Vue({
    el: "#comments",
    data: {
        total: 0,
        comments: [],
        "basePath": basePath,
        pages: 0,
        pageNo: 1,
        pageSize: 10,
        hasNext: false,
        parentId: 0,
        ruid: 0,
        index: 0,
        session_user: 0,
        "resourcePath": resourcePath
    },
    created: function () {
        mkLogin.loginSuccess(function () {
            vue.$data.session_user = $("#mkusername").data("opid");
        });
        this.load();
    },
    methods: {
        loadmore: function () {
            this.$data.pageNo = ++this.$data.pageNo;
            this.load();
        },
        del: function (e) {
            var $this = this;
            var blogId = e.target.getAttribute("opid");
            mkCommon.error("你确定删除吗?", "error", function (ok) {
                if (ok) {
                    vue.$http.post(adminPath + "/deleteComment/" + blogId, {
                        emulateJSON: true
                    }).then(function (response) {
                        if (response.body.status == 200) {
                            $("#vcard_" + blogId).addClass("animated bounceOutLeft").fadeOut(1000, function () {
                                $(this).remove();
                            });
                        }
                    });
                }
            })
        },

        load: function () {
            var blogId = $("body").data("opid");
            var pageNo = this.$data.pageNo;
            var pageSize = this.$data.pageSize;
            this.$http.get(basePath + "/loadcomment", {
                params: {
                    "blogId": blogId,
                    "pageNo": pageNo,
                    "pageSize": pageSize
                }
            }).then(function (response) {
                this.$data.comments = this.$data.comments.concat(response.data.data.blogcomments);
                this.$data.total = response.data.data.total;
                this.$data.pages = Math.floor(response.data.data.total / pageSize);
                this.$data.hasNext = this.$data.pages <= pageNo;
                $("#commentnum").text(this.$data.total);
            });
        },

        reply: function (e) {
            var name = e.target.getAttribute("at");
            $("#txt_message").focus().attr("placeholder", name);
            this.$data.parentId = e.target.getAttribute("opid");
            this.$data.ruid = e.target.getAttribute("cid");
            this.$data.index = e.target.getAttribute("index");
        },

        saveComment: function () {
            var $this = this;
            mkLogin.loginSuccess(function (data) {
                if (data) {
                    var message = $("#txt_message").val();
                    if (isEmpty(message)) {
                        mkCommon.error("请输入评论...", "error");
                        $("#txt_message").focus();
                        return;
                    }

                    if (message.length < 4) {
                        mkCommon.error("评论长度不够4位...", "error");
                        $("#txt_message").focus();
                        return;
                    }

                    var blodId = $("body").data("opid");
                    var parentId = $this.$data.parentId;
                    var ruserid = $this.$data.ruid;
                    message = filterTag(message);

                    var params = {"blogId": blodId, "content": message, "parentId": parentId, "replyUserid": ruserid};
                    vue.$http.post(adminPath + "/saveComment", params, {
                        emulateJSON: true
                    }).then(function (response) {
                        if (response.body.status == 200) {
                            mkCommon.error("评论成功!");
                            $("#txt_message").val("");
                            response.body.data.username = $("#mkusername").data("username");
                            response.body.data.headerPic = $("#mkusername").data("headerpic");
                            if (this.$data.parentId == 0) {
                                response.body.data.children = [];
                                $this.$data.comments.unshift(response.body.data);
                                $this.$data.total = ++vue.$data.total;
                                $("#commentnum").text($this.$data.total);
                            } else {
                                $this.$data.comments[this.$data.index].children.unshift(response.body.data)
                            }
                        }
                    });
                } else {
                    mkLogin.loadLogin();
                }
            });
        }
    }
});

var mkComment = {
    vcontrol: function (obj) {
        $(".vemojis").toggle();
    }
};

//将内容复制到剪切板
function InitCopyToClipboard(btnId) {
    ZeroClipboard.setMoviePath(basePath + "/js/clipboard/ZeroClipboard.swf"); //设置flash文件在项目中的位置
    var clip = new ZeroClipboard.Client(); // 新建一个对象
    clip.setHandCursor(true);
    clip.addEventListener('onmouseup', function (client) { //创建监听
        loading("复制成功！！！", 3);
        var text = $(btnId).parent().next().text();
        clip.setText(text);
    });
    clip.glue(btnId); //将flash覆盖至指定ID的DOM上

    //窗口大小发生变化时从新将flash覆盖至制定的id上，否则位置不对应导致点击时没反应
    $(window).on("resize", function () {
        clip.reposition();
    });
    return false;
}
