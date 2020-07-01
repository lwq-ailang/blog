function gobuy(obj) {
    var opid = $(obj).data("copid");
    var bookId = $(obj).data("opid");
    var len = $("section#" + opid).length;
    $(obj).parents("li").addClass("checked").siblings().removeClass("checked");
    if (len == 0) {
        request(basePath + "/contentdetail/get/" + bookId + "/" + opid, function (data) {
            if (data) {
                $("#sectionbox").append("<section id='" + data.id + "'>" + data.content + "</section>");
                window.location.href = "#" + data.id;
            } else {
                loading("你还没有订阅该图书。暂无学习权限", 4);
                mkBookPay.alipay(obj);
            }
        });
    } else {
        window.location.href = "#" + opid;
    }
}

function goshopbuy(callback) {
    var opid = $("body").data("opid");
    request(basePath + "/shoporderbook/countbuybook/" + opid, function (data) {
        callback(data >= 1);
    });
}


$(function () {
    setCacheLink();
    hljs.initHighlightingOnLoad();
    goshopbuy(function (ok) {
        if (ok) $("#shopbuybtn").remove();
    });
});