package com.wu.util;


import javax.servlet.http.HttpServletRequest;

/**
 * 用户线程副本类
 */
public class HttpRequestThreadLocalUtils {

    // 创建一个线程副本存储用户信息 jdk ---- ThreadLocal
    private static ThreadLocal<HttpServletRequest> requestThreadLocal = new ThreadLocal<>();


    public static void set(HttpServletRequest userDo) {
        requestThreadLocal.set(userDo);
    }

    public static HttpServletRequest get() {
        return requestThreadLocal.get();
    }

    public static void remove() {
        requestThreadLocal.remove();
    }
}
