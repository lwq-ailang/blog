package com.wu.core.interceptor;

import com.wu.pojo.UserDo;
import com.wu.util.HttpRequestThreadLocalUtils;
import com.wu.util.UserDoThreadLocalUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 拦截器
 */
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        UserDo userDo = (UserDo) session.getAttribute("sessionuser");
        if (userDo == null) {
            response.sendRedirect("login");
            return false;
        }
        //把用户信息放入到线程副本中
        UserDoThreadLocalUtils.set(userDo);
        HttpRequestThreadLocalUtils.set(request);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 不执行也没事
        UserDoThreadLocalUtils.remove();
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserDoThreadLocalUtils.remove();
    }
}
