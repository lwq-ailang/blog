package com.wu.core.interceptor;

import com.wu.core.threadlocal.UserDoThreadLocalUtils;
import com.wu.pojo.UserDo;
import com.wu.core.threadlocal.HttpRequestThreadLocalUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 拦截器：SpringMVC处理路由时候一种统一拦截处理机制，原理是AOP思想
 */
public class LoginInterceptor implements HandlerInterceptor {

    /**
     * TODO：访问流程
     *      拦截器-->preHandle
     *      -->返回true进入SpringMVC方法中(controller对应的方法)
     *      -->return返回前进入postHandle
     *      -->return返回后进入afterCompletion
     *      -->返回结果给前端
     */

    /**
     * 拦截器是一种统一处理的机制，
     * 记住一点：public boolean preHandle方法
     * 返回为`true`的时候才会进入的`Controller`的路由方法，
     * 如果为false直接返回。
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        //todo-->分布式会话，放在Redis中，跨服务
        //获取登录的信息
        UserDo userDo = (UserDo) session.getAttribute("sessionuser");
        if (userDo == null) {
            response.sendRedirect("../login");//重定向：没有登录则跳转到登录页面
            return false;
        }
        //TODO：把用户信息放入到threadLocal线程副本中
        UserDoThreadLocalUtils.set(userDo);
        HttpRequestThreadLocalUtils.set(request);
        return true;
    }

    //只有
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 清除，不执行也没事，本身也是弱引用，防止内存溢出
        UserDoThreadLocalUtils.remove();
        HttpRequestThreadLocalUtils.remove();
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserDoThreadLocalUtils.remove();//方法执行结束，清除，防止内存溢出
        HttpRequestThreadLocalUtils.remove();
    }
}
