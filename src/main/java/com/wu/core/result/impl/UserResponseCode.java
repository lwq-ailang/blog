package com.wu.core.result.impl;

import com.wu.core.result.ResponseInterface;

/**
 * user枚举类，实现公共返回结果，自定义返回结果内容
 */
public enum UserResponseCode implements ResponseInterface {

    // 什么是枚举：他是一种特殊得类，是一种可以具名调用自身构造函数得类。
    LOGIN_SUCCESS(201, "登录成功!", "");

    private final int status;
    private final String msg;
    private final String field;

    UserResponseCode(int status, String msg, String field) {
        this.status = status;
        this.msg = msg;
        this.field = field;
    }

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String getMsg() {
        return msg;
    }

    @Override
    public String getField() {
        return field;
    }
}
