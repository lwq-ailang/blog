package com.wu.core.result;


/**
 * 常量类
 * 一个数据如果有多种形态，可以试用面向想对象的方式来替代，那就是：枚举
 * 为什么不是类呢？因为枚举具名，类不能该名字
 * 其实枚举是：它一种特殊的类。它是可以定义别的名称来调用自身的构造函数的类。
 */
public class Constants {


    public static final int USERNAME_STATUS = 701;
    public static final String USERNAME_EMPTY = "用户名不允许为空!";


    public static final int PASSWORD_STATUS = 702;
    public static final String PASSWORD_EMPTY = "密码不允许为空!";
}
