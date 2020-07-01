var vue = new Vue({
    el: "#app",
    data: {
        pageNo: 1,
        pageSize: 10,
        timer: null,
    },
    mounted() {
        this.loadPage($("#posts").children().eq(0).data("psize"));
    },
    methods: {
        loadPage: function (totalPages) {
            $("#page").Page({
                totalPages: totalPages,//total Pages
                liNums: 7,
                activeClass: 'activP', //active class style
                firstPage: '<',//first button name
                lastPage: '>',//last button name
                prv: '<<',//prev button name
                next: '>>',//next button name
                hasFirstPage: true,//whether has first button
                hasLastPage: true,//whether has last button
                hasPrv: true,//whether has prev button
                hasNext: true,//whether has next button
                callBack: function (page) {//每次点击分页执行的回调函数
                    //点击分页获取吓一条数据
                    mkTopic.pageNo = page;
                    mkTopic.loadTopic();
                }
            });
        },

        //查询
        loadTopic: function (callback) {
            if (mkTopic.timer) clearTimeout(mkTopic.timer);
            mkTopic.timer = setTimeout(function () {
                //获取参数
                var params = {"pageNo": mkTopic.pageNo, "pageSize": mkTopic.pageSize};
                $("#posts").load(basePath + "/topic/template", params, function (data) {
                    var psize = $("#posts").children().eq(0).data("psize");
                    callback && callback(psize);
                });
            }, 200);
        },

        //保存
        save: function () {
            //校验
            if (!this.validator()) {
                return;
            }

            //获取参数
            var title = $("#title").val();
            var isDelete = $("#isDelete").val();
            var userId = $("#userId").val();
            var status = $("#status").val();
            var description = $("#description").val();
            var img = $("#img").val();
            var tag = $("#tag").val();
            var kcolumn = $("#kcolumn").val();
            var musicLink = $("#musicLink").val();
            var staticLink = $("#staticLink").val();
            var videolink = $("#videolink").val();
            var hits = $("#hits").val();
            var categoryId = $("#categoryId").val();
            var isComment = $("#isComment").val();
            var blogId = $("#blogId").val();
            var courseId = $("#courseId").val();
            var loves = $("#loves").val();
            var content = $("#content").val();
            var price = $("#price").val();
            var type = $("#type").val();
            var mdcontent = $("#mdcontent").val();

            //设置参数
            var params = {
                "title": title,
                "isDelete": isDelete,
                "userId": userId,
                "status": status,
                "description": description,
                "img": img,
                "tag": tag,
                "kcolumn": kcolumn,
                "musicLink": musicLink,
                "staticLink": staticLink,
                "videolink": videolink,
                "hits": hits,
                "categoryId": categoryId,
                "isComment": isComment,
                "blogId": blogId,
                "courseId": courseId,
                "loves": loves,
                "content": content,
                "price": price,
                "type": type,
                "mdcontent": mdcontent
            };
            //保存方法
            var promise = $.post(basePath + "/topic/save", params);
            promise.done(function (response) {
                console.log(response, response.data);
            }).fail(function (err) {
                console.log(err);
            });
        },

        //修改
        update: function () {
            //校验
            if (!this.validator()) {
                return;
            }

            //获取参数
            var id = $("#id").val();
            var title = $("#title").val();
            var isDelete = $("#isDelete").val();
            var userId = $("#userId").val();
            var status = $("#status").val();
            var description = $("#description").val();
            var img = $("#img").val();
            var tag = $("#tag").val();
            var kcolumn = $("#kcolumn").val();
            var musicLink = $("#musicLink").val();
            var staticLink = $("#staticLink").val();
            var videolink = $("#videolink").val();
            var hits = $("#hits").val();
            var categoryId = $("#categoryId").val();
            var isComment = $("#isComment").val();
            var blogId = $("#blogId").val();
            var courseId = $("#courseId").val();
            var loves = $("#loves").val();
            var content = $("#content").val();
            var price = $("#price").val();
            var type = $("#type").val();
            var mdcontent = $("#mdcontent").val();

            //设置参数
            var params = {
                "id": id,
                "title": title,
                "isDelete": isDelete,
                "userId": userId,
                "status": status,
                "description": description,
                "img": img,
                "tag": tag,
                "kcolumn": kcolumn,
                "musicLink": musicLink,
                "staticLink": staticLink,
                "videolink": videolink,
                "hits": hits,
                "categoryId": categoryId,
                "isComment": isComment,
                "blogId": blogId,
                "courseId": courseId,
                "loves": loves,
                "content": content,
                "price": price,
                "type": type,
                "mdcontent": mdcontent
            };
            //保存方法
            var promise = $.post(basePath + "/topic/update", params);
            promise.done(function (response) {
                console.log(response, response.data);
            }).fail(function (err) {
                console.log(err);
            });
        },

        //删除
        del: function () {
            //保存方法
            var id = 1;
            var promise = $.post(basePath + "/topic/delete/" + id);
            promise.done(function (response) {
                console.log(response, response.data);
            }).fail(function (err) {
                console.log(err);
            });
        },

        //校验器
        validator: function () {
            return true;
        }
    }


})



