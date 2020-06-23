package com.wu.core.threadlocal;


import javax.servlet.http.HttpServletRequest;

/**
 * 工具类：用户线程副本类（推荐使用）
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
