function loginSuccessBack(data, flag) {
    if (flag) {
        loadVue(data.data);
        loadPlay(data.data);
        // 统计课件数量
        $(".blognum").text($("#blogbox").children().length);
    } else {
        $(".nav").css("right", 0);
        mkLogin.loadLogin();
    }
}

Vue.filter('fomatTime', function (valueTime) {
    return dateDiff(getDateTimeStamp(valueTime));
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

function loadVue(userdata) {
    var vue = new Vue({
        el: "#course-toolbar-box",
        data: {
            msgcontent: "",
            courseId: 0,
            istip: false,
            tipmsg: "",
            tabindex: 1,
            pageNo: 1,
            pageSize: 10,
            totalPage: 0,
            ctotalPage: 0,
            parentId: 0,
            mark: 0,
            sortFlag: 1,
            userId: userdata.uuid,
            loading: false,
            username: userdata.username,
            uname: "",
            roleid: userdata.roleid,
            headerPic: userdata.headerPic,
            replyUserid: "",
            flag: 0,
            index: 0,
            cindex: 0,
            comments: []
        },
        computed: {
            pages: function () {
                var pages = parseInt(Math.ceil(this.totalPage / this.pageSize));
                return pages;
            },
            limitSize: function () {
                var limit = 100;
                limit = 100 - this.msgcontent.length;
                return limit;
            }
        },
        mounted() {
            this.courseId = $("body").data("opid");
            this.countComments();
        },

        methods: {
            time(time) {
                return getTimeFormat(time);
            },

            changeTab(index) {
                // 如果选中了就不选中了
                if (this.tabindex == index) {
                    return;
                }

                //  切换选中
                this.tabindex = index;

                // 如果是评论就选中评论
                if (index == 2) {
                    this.loadComments();
                }

                // 加载相关
                if (index == 3) {
                    this.loadBlogs();
                }
            },

            loadBlogs() {

            },

            countComments() {
                this.$http.get(rootPath + "//course/countcomment?courseId=" + this.courseId).then(res = > {
                    this.ctotalPage = res.data.data;
            })
            },

            loadComments() {
                this.loading = true;
                this.comments = [];
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(() = > {
                    this
                    .$http.get(rootPath + "/course/loadcomment?sortFlag=" + this.sortFlag + "&parentId=" + this.parentId + "&mark=" + this.mark + "&courseId=" + this.courseId + "&pageNo=" + this.pageNo + "&pageSize=" + this.pageSize).then((res) = > {
                        this.comments = res.data.data.data;
                this.loading = false;
                this.totalPage = res.data.data.total;
            })
                ;
            },
                200
            )
                ;
            },

            nextComment() {
                if (this.pageNo >= this.pages) {
                    this.tipMessage("加载完毕了");
                    return;
                }
                this.pageNo++;
                this.loadComments();
            },

            prevComment() {
                if (this.pageNo <= 1) {
                    this.tipMessage("到顶了");
                    this.pageNo = 1;
                    return;
                }
                this.pageNo--;
                this.loadComments();
            },

            seeComment() {
                this.mark = this.mark == 0 ? 1 : 0;
                this.pageNo = 1;
                this.sortFlag = 1;
                this.pageSize = 10;
                this.parentId = 0;
                this.comments = [];
                this.loadComments();
            },


            loadMore(pid, index) {
                var that = this;
                if (that.comments[index].pageNo >= that.comments[index].pages) {
                    return;
                }
                // 翻页
                that.comments[index].pageNo++;
                var comment = that.comments[index];
                var parentId = pid;
                var pageNo = comment.pageNo;
                var pageSize = comment.pageSize;
                var total = comment.total;
                var pages = comment.pages;
                var mark = 0;
                // 进行翻页
                that.$http.get(rootPath + "/course/loadcommentchildren?parentId=" + parentId + "&mark=" + mark + "&courseId=" + this.courseId + "&pageNo=" + pageNo + "&pageSize=" + pageSize).then((res) = > {
                    var newArray = that.comments[index].children.concat(res.data.data.data);
                that.comments[index].children = newArray;
            })
                ;
            },

            tipMessage(msg) {
                this.istip = true;
                this.tipmsg = msg;
                setTimeout(() = > {
                    this.istip = false;
            },
                2000
            )
                ;
            },
            replyComment(id, uid, index, cindex, uname) {
                if (uid == this.userId) {
                    this.tipMessage("自己不能回复自己...");
                    return;
                }
                this.parentId = id;
                this.replyUserid = uid;
                this.flag = 1;
                this.index = index;
                this.cindex = cindex;
                this.uname = uname;
                document.getElementById("auto-id-message").focus();
            },

            orderComment() {
                this.sortFlag = this.sortFlag == 1 ? 0 : 1;
                this.mark = 0;
                this.pageNo = 1;
                this.pageSize = 10;
                this.parentId = 0;
                this.comments = [];
                this.loadComments();
            },

            delComment(id, index, cindex, flag) {
                var that = this;
                mkCommon.error("你确定删除吗？", "error", function (ok) {
                    if (ok) {
                        that.$http.post(rootPath + "/admin/course/deleteComment/" + id).then(res = > {
                            if(flag == 1
                    )
                        {
                            that.comments.splice(index, 1);
                            that.totalPage--;
                            if (that.comments.length == 0) {
                                that.loadComments();
                            }
                        }
                    else
                        {
                            that.comments[index].children.splice(cindex, 1);
                            that.comments[index].total--;
                            that.comments[index].pages = parseInt(Math.ceil(that.comments[index].total / that.comments[index].pageSize));
                            that.comments[index].pageNo = that.comments[index].pages;
                            if (that.comments[index].children.length == 0) {
                                that.loadMore(that.comments[index].id, index);
                            }
                        }
                    })
                        ;
                    }
                })
            },

            saveMessage() {
                var that = this;
                var cont = that.msgcontent;
                if (isEmpty(cont)) {
                    that.tipMessage("请输入评论...");
                    $("#auto-id-message").focus();
                    return;
                }
                var courseId = this.courseId;
                var index = this.index;
                var cindex = this.cindex;
                var parentId = that.parentId;
                var replyUserid = that.replyUserid;
                that.$http.post(rootPath + "/admin/course/saveComment",
                    {
                        content: cont,
                        courseId: courseId,
                        parentId: parentId,
                        replyUserid: replyUserid
                    },
                    {emulateJSON: true}).then(res = > {
                    that.msgcontent = "";
                $('#vemojisbox').hide();
                if (this.flag == 0) {
                    var dataresults = res.data.data;
                    dataresults.headerPic = this.headerPic;
                    dataresults.username = this.username;
                    dataresults.roleid = this.roleid;
                    dataresults.children = [];
                    that.comments.push(dataresults);
                    that.totalPage++;
                    setTimeout(() = > {
                        document
                        .getElementsByClassName("posts")[0].scrollTop = document.getElementsByClassName("posts")[0].scrollHeight
                    }, 300
                )
                    ;
                } else {
                    var dataresults = res.data.data;
                    dataresults.headerPic = this.headerPic;
                    dataresults.username = this.username;
                    dataresults.cusername = this.uname;
                    dataresults.roleid = this.roleid;
                    this.comments[index].children.push(dataresults);
                    this.comments[index].total++;
                    this.comments[index].pages = parseInt(Math.ceil(that.comments[index].total / that.comments[index].pageSize));
                    this.comments[index].pageNo = this.comments[index].pages;
                    this.parentId = 0;
                    this.replyUserid = 0;
                    this.flag = 0;
                    this.index = 0;
                    this.uname = "";
                    this.cindex = 0;
                }
            })
                ;
            }
        }
    })
}

var player = null;

function loadPlay() {
    $(function () {
        setCacheLink();
        loadingtip("#loading")
        //禁止页面选择以及鼠标右键
        document.οncοntextmenu = function () {
            return false;
        };
        document.onselectstart = function () {
            return false;
        };
        $(".list-box").on("click", function (e) {
            e.stopPropagation();
        });


        $("#forum-tabbox").on("click", ".vemojis>i", function () {
            var text = $(this).text();
            $("#txt_message").insertContent(text);
        });


        $(".lesson_items_li").on("click", function (e) {
            $(".lesson_items_li").removeClass("active");
            $(this).addClass("active");
            e.stopPropagation();
        });

        $("#showbotbox").on("dblclick", function () {
            $("#maxsize").show();
            $("#closedialog").hide();
            $("#showbotbox").css("width", 700);
            $("#codeiframe").contents().find("body").css({width: "100%", margin: "0"});
        })

        $("#maxsize").on("click", function () {
            var right = parseInt($("#course-toolbar-box").css("right"));
            var cright = right == 0 ? 394 : 0;
            $("#showbotbox").stop(true).css("width", "auto").animate({right: cright});
            $("#closedialog").show();
            $(this).hide();
            $("#codeiframe").contents().find("body").css({width: 960, margin: "0 auto"});
        })

        $("#closedialog").on("click", function () {
            $("#maxsize").show();
            $(this).hide();
            $("#showbotbox").stop(true).animate({"width": 700});
            $("#codeiframe").contents().find("body").css({width: "100%", margin: "0"});
        })

        // 下载资料的校验
        $("#getdownload").on("click", function () {
            var opid = $("body").data("opid");
            validatorCoursePay(opid, function (data) {
                request(rootPath + "/admin/course/relation/" + opid, function (res) {
                    $("#getdownload").attr({
                        "href": res.downloadurl,
                        "target": "_blank"
                    }).html("<i class=\"iconfont icon-download ftp2\"></i>课程资料下载，<span class=\"fw fz16\">密码【" + res.password + "】</span>");
                });
            });
        });

        $(".showover").on("click", function () {
            if ($("#maxsize").is(":hidden")) {
                $("#maxsize").show();
                $("#closedialog").hide();
                $("#codeiframe").contents().find("body").css({width: "100%", margin: "0"});
                $("#showbotbox").stop(true).animate({"width": 700});
            } else {
                $("#maxsize").show();
                $("#closedialog").hide();
                $("#leftip").stop(true).animate({"left": 0});
                $("#showbotbox").stop(true).animate({left: -700}).next().hide();
            }
        })

        $("#leftip").on("click", function () {
            var left = parseInt($("#leftip").css("left"));
            if (left == 0) {
                $("#leftip").stop(true).animate({"left": 700});
                $("#showbotbox").stop(true).animate({left: 0}).next().show();
            } else {
                $("#leftip").stop(true).animate({"left": 0});
                $("#showbotbox").stop(true).animate({left: -700}).next().hide();
            }
        });

        $(".showchapterlink").on("click", function () {
            var right = parseInt($("#playerWrap").css("right"));
            var cleft = parseInt($("#showbotbox").css("left"))
            if (right == 380) {
                $("#course-toolbar-box").stop(true).animate({right: -380})
                $("#playerWrap,.nav").stop(true).animate({right: 0});
                if (cleft == 0) $("#showbotbox").stop(true).css({"width": "auto"}).animate({right: 0});
                $("#codeiframe").contents().find("body").css({width: 960, margin: "0 auto"});
            } else {
                $("#course-toolbar-box").stop(true).animate({right: 0})
                $("#playerWrap,.nav").stop(true).animate({right: 380});
                if (cleft == 0) $("#showbotbox").stop(true).css({"width": "auto"}).animate({right: 394});
                $("#codeiframe").contents().find("body").css({width: 960, margin: "0 auto"});
            }
            $("#closedialog").show();
            $("#maxsize").hide();
        });


        // 触发视频播放
        $(".mk_lesson_items").on("click", function () {
            if ($(this).hasClass("section-cur")) {
                return;
            }
            var $this = $(this);
            var vid = $(this).data("vid");
            var lessonId = $(this).data("id");
            var chapterId = $(this).data("chapterid");
            var title = $(this).attr("title");
            var ctitle = $(this).attr("ctitle");
            var message = ctitle + " > " + title;
            var courseId = $(this).data("courseid");
            var ctimer = $(this).data("ctimer");
            var finished = $(this).data("finished");
            var percent = $(this).data("percent");
            var params = {
                courseId: courseId,
                chapterId: chapterId,
                lessonId: lessonId,
                timer: ctimer,
                finished: finished,
                percent: percent,
                message: message
            };
            //校验是否有权限
            validatorPay(params, function (res) {
                $this.addClass("section-cur").siblings().removeClass("section-cur");
                player.changeVid({vid: res.data.vid, autoplay: false});
            });
        }).hover(function () {
            $(this).addClass("section-cur-on");
        }, function () {
            $(this).removeClass("section-cur-on");
        });


        // 触发第一个视频播放
        var opid = $(".mk_lesson_items").eq(0).data("id");
        if (isEmpty(opid)) {
            alert("暂无课程...");
            //window.location.href = $(".nav-back").attr("href");
            $(parent.document).find("#huatibox").removeClass("animated bounceInLeft").addClass("animated bounceOutRight").stop(true).fadeOut(1000);
            $(parent.document).find("#backiframe").hide();
            $(parent.document).find(".nav-logo").show();
            $(parent.document).find("html,body").css("overflowY", "auto");
            return;
        }

        // 查询用户点播得章节
        queryUserStudy(function () {
            // 初始化第一次播放
            initFirstLesson($(".mk_lesson_items").eq(0));
        });
        // 更新点击数 和收藏数
        mkCourse.init();
        // 验证是否购买
        validatorCoursePayNo();
    })

    function initFirstLesson($this) {
        var lessonId = $this.data("id");
        var chapterId = $this.data("chapterid");
        var title = $this.attr("title");
        var ctitle = $this.attr("ctitle");
        var message = ctitle + " > " + title;
        var courseId = $this.data("courseid");

        var ctimer = $this.data("ctimer");
        var finished = $this.data("finished");
        var percent = $this.data("percent");

        var params = {
            courseId: courseId,
            chapterId: chapterId,
            lessonId: lessonId,
            timer: ctimer,
            finished: finished,
            percent: percent,
            message: message
        };

        validatorPay(params, function (res) {
            player = initPlayer(res.data.vid);
        });

    }

    function getLessionInfo(lessonId, callback) {
        request(rootPath + "/lesson/getLessonVid/" + lessonId, function (data) {
            callback && callback(data);
        })
    }

    function initPlayer(vid) {
        var player = polyvPlayer({
            wrap: '#player',
            width: "100%",
            height: "100%",
            autoplay: false,
            code: "xuchengfeifei",//跑马灯设置中自定义的code值
            volume: 0.5,//视频默认音量大小，范围 (0, 1)，播放器会记录上一次播放的音量
            flash: false,
            showHd: false,//	是否显示清晰度选择
            screenshot: true,//是否开启视频截图功能
            loading_bg_img: "",//视频默认封面图
            showAuto: true,//是否显示自动清晰度按钮
            fullscreenProxy: false,//全屏代理，设置后点击全屏按钮或者双击播放器不会调用全屏api
            df: 2,//视频默认清晰度，可设置为0、1、2、3，分别对应自动、流畅、高清、超清，设置该参数会覆盖后台的设置
            speed: [2.5, 2, 1.75, 1.5, 1.2, 0.5],//设置为false则关闭倍速，可传入数组自定义显示哪几种倍速，速率1不需要填入，会自动添加，所设置速率值必须大于0，少于或等于3，最多设置6种速率（不包含1），所设置值会按由大到小自动排序
            vid: vid
        });

        return player;
    }
}


function validatorPay(params, callback) {
    request(rootPath + "/admin/lesson/getvideoinfo2", function (res) {
        if (res.status == 500) {
            var opid = $("body").data("opid");
            var type = $("body").data("type");
            var coursetype = $("body").data("coursetype");
            mkPayDialog.dialog({
                opid: opid,
                type: 1,
                coursetype: coursetype
            });

            var img = resourcePath + "/" + $("body").data("img");
            $("#app").css({
                "background": "url(" + img + ")",
                zIndex: 90,
                backgroundSize: 'cover',
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            }).empty();
            $(".nav").css("right", 0);
            window.showdialog = true
        } else {
            $("#codeiframe").attr("src", basePath + "/admin/lesson/message?lessonId=" + params.lessonId);
            callback && callback(res);
        }
    }, params);
}

function validatorCoursePay(courseId, callback) {
    request(rootPath + "/admin/courseuser/pubbuy", function (res) {
        if (res.status == 500) {
            var opid = $("body").data("opid");
            var type = $("body").data("type");
            var coursetype = $("body").data("coursetype");
            mkPayDialog.dialog({
                opid: opid,
                type: 1,
                coursetype: coursetype
            });
            var img = resourcePath + "/" + $("body").data("img");
            $("#app").css({
                "background": "url(" + img + ")",
                zIndex: 90,
                backgroundSize: 'cover',
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            }).empty();
            $(".nav").css("right", 0);
            window.showdialog = true;
            // 暂停视频
            player.destroy();
        } else {
            callback && callback(res);
        }
    }, {courseId: courseId});
}

function validatorCoursePayNo() {
    var courseId = $("body").data("opid");
    request(rootPath + "/admin/courseuser/pubbuy", function (res) {
        console.log(res);
        if (res.status != 500) {
            $(".gobuy").css("background", "#4CAF50").off("click").find("span").text("已订阅");
        }
    }, {courseId: courseId});
}

// 查询用户点播得课程
function queryUserStudy(callback) {
    var courseId = $("body").data("opid");
    request(rootPath + "/admin/course/querystudys", function (res) {
        if (res.status == 200) {
            var results = res.data;
            for (var i = 0; i < results.length; i++) {
                var chapterId = results[i].chapterId;
                var lessonId = results[i].lessonId;
                $("#mk_lesson_items_" + chapterId + "_" + lessonId)
                    .data("ctimer", results[i].timer)
                    .data("finished", results[i].finished)
                    .data("percent", results[i].percent)
                    .addClass("section-cur-over").find(".percent").width(results[i].percent + "%");
            }
            callback && callback();
        }
    }, {courseId: courseId});
}


function getPlayTimer() {
    if (window.lltimer) clearInterval(window.lltimer);
    window.lltimer = setInterval(function () {
        var ctimer = parseInt(player.j2s_getCurrentTime());
        var total = parseInt(player.j2s_getDuration());
        var finished = ctimer == total ? 1 : 0;
        var percent = (ctimer / total * 100).toFixed(2);
        $(".section-cur").find(".kstime").text(getminsec(total - ctimer))
            .end().data("ctimer", ctimer)
            .data("finished", finished)
            .data("percent", percent)
            .addClass("section-cur-over").find(".percent").width(percent + "%");
    });
}

var ttflag = true;

function updateCoursePlayTime() {
    var $this = $(".section-cur");
    var lessonId = $this.data("id");
    var chapterId = $this.data("chapterid");
    var courseId = $this.data("courseid");
    var ctimer = parseInt(player.j2s_getCurrentTime());
    var ttimer = parseInt(player.j2s_getDuration());
    var finished = ctimer == ttimer ? 1 : 0;
    var percent = ((ctimer / ttimer) * 100).toFixed(2);
    var params = {
        courseId: courseId,
        chapterId: chapterId,
        lessonId: lessonId,
        timer: ctimer,
        finished: finished,
        percent: percent
    };

    if (!ttflag) return;
    ttflag = false;
    if (window.timeer) clearTimeout(window.timeer);
    window.timeer = setTimeout(function () {
        request(rootPath + "/admin/lesson/updateCoursePlayTime", function (data) {
            ttflag = true;
            $("#mk_lesson_items_" + chapterId + "_" + lessonId).addClass("section-cur-over").find(".percent").width(percent + "%");
        }, params);
    }, 200);
}

function s2j_onVideoPlay() {
    getPlayTimer();
    $("#bofqi").css("top", 5);
    $("#leftip").stop(true).animate({"left": 0});
    $("#showbotbox").stop(true).animate({left: -700}).next().hide();
}

function s2j_onVideoPause() {
    if (window.lltimer) clearInterval(window.lltimer);
    if (!window.showdialog) {
        $("#leftip").stop(true).animate({"left": 700});
        $("#showbotbox").stop(true).animate({left: 0}).next().show();
        $("#codeiframe").contents().find("body").css({width: "100%", margin: "0"});
        updateCoursePlayTime();
    }

}


function s2j_onPlayerInitOver() {
    //console.log("0: 播放器加载完毕.....")
}

function s2j_onPlayOver() {
    var $chapter = $(".mk_lesson_items.section-cur").next();
    if (isEmpty($chapter.html())) {
        mkCommon.error("太棒了，学习完毕了...", "success");
        return;
    }
    updateCoursePlayTime();
    if ($chapter.hasClass("chapter")) {
        $(".mk_lesson_items.section-cur").next().next().trigger("click");
    } else {
        $(".mk_lesson_items.section-cur").next().trigger("click");
    }
}

// 拖拽进度条的时候触发
function s2j_onVideoSeek() {
    updateCoursePlayTime();
}

function s2j_onPlayStart() {
    console.log("4: 播放开始了.....")
}

function s2j_onPlayerError() {
    console.log("8...播放失败了....")
}

function s2j_volumeChange() {
    //console.log("7...改变了音量")
}

function s2j_onInteractionData() {
}
