package com.wu.util;


import com.wu.pojo.UserDo;

/**
 * 用户线程副本类
 */
public class UserDoThreadLocalUtils {

    // 创建一个线程副本存储用户信息 jdk ---- ThreadLocal
    private static ThreadLocal<UserDo> userDoThreadLocal = new ThreadLocal<>();


    public static void set(UserDo userDo) {
        userDoThreadLocal.set(userDo);
    }

    public static UserDo get() {
        return userDoThreadLocal.get();
    }

    public static void remove() {
        userDoThreadLocal.remove();
    }
}
