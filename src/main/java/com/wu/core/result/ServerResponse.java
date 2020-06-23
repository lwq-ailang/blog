package com.wu.core.result;

import com.wu.core.result.impl.ResponseCode;

/**
 * 返回结果处理类
 */
public class ServerResponse {

    // 状态管理
    private int status;
    // 返回得数据对象
    private Object data;
    // 返回提示
    private String msg;
    // 属性字段,  这个字段仅供开放人员排查错误,用于出错的情况.
    private String field;

    private ServerResponse() {
    }

    private ServerResponse(int status, Object data, String msg) {
        this.status = status;
        this.data = data;
        this.msg = msg;
    }

    private ServerResponse(int status, Object data, String msg, String field) {
        this.status = status;
        this.data = data;
        this.msg = msg;
        this.field = field;
    }

    // 访问修饰符修饰的成员，对内无效，对外有效？
    // 定义一个成功返回的方法 ,为什么是static的，
    // 答：因为方便调用。因为静态成员可以直接都通类调用
    public static ServerResponse vsuccess(Object data, String msg) {
        return new ServerResponse(ResponseCode.SUCCESS.getStatus(),data,msg);
    }

    public static ServerResponse vsuccess(Object data) {
        return new ServerResponse(ResponseCode.SUCCESS.getStatus(),data,null);
    }

    public static ServerResponse verror(int status, String msg) {
        return new ServerResponse(status,null,msg);
    }

    public static ServerResponse verror(int status, String msg, String filed) {
        return new ServerResponse(status,null,msg,filed);
    }

    //其实就利用java多态：使用父类作为参数，子类实现
    public static ServerResponse success(ResponseInterface responseCode, Object data) {
        return new ServerResponse(responseCode.getStatus(), data, responseCode.getMsg());
    }

    public static ServerResponse success(ResponseInterface responseCode) {
        return new ServerResponse(responseCode.getStatus(), null, responseCode.getMsg());
    }


    public static ServerResponse error(ResponseInterface responseCode) {
        return new ServerResponse(responseCode.getStatus(), null, responseCode.getMsg());
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
