package com.wu.core.result;

public interface ResponseInterface {

    // 外面需要什么就暴露什么
    public int getStatus();

    public String getMsg();

    public String getField();
}
