package com.wu.core.arguments;

import com.wu.core.Contants;
import com.wu.pojo.UserDo;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * TODO 可以通过springmvc提供的参数注入的方式获取：
 * 1.编写实现HandlerMethodArgumentResolver的类，实现方法。
 * 2.在WebMvcConfigurer实现类，添加addArgumentResolvers方法，注册参数UserArgumentResolver注入器.让springmvc容器去加载
 * 3.直接在类上用UserDo.class对象接收
 * 在springmvc中提供了很多一些handler处理器（适配器）,其中就有个专门来处理参数的的适配器就是`HandlerMethodArgumentResolver`,
 * 定义类实现它，它是拦截器处理完之后，方法进入之前，对参数进行改造和处理的一种机制，这个在开发中也可以用来获取用户的信息。
 */
@Component
public class UserArgumentResolver implements HandlerMethodArgumentResolver {

    // 此方法是过滤参数条件，如果参数包括UserDo.class对象，那么会进入resolveArgument方法，否则忽略。
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        System.out.println("2--------------supportsParameter");
        Class clazz = parameter.getParameterType();
        return clazz == UserDo.class;
    }

    // 满足supportsParameter的条件，就进行对数据进行改造
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        System.out.println("3--------------resolveArgument");
        // 获取session中的数据 ， NativeWebRequest.SCOPE_SESSION作用域是session
        UserDo userDo = (UserDo) webRequest.getAttribute(Contants.SESSION_USER, NativeWebRequest.SCOPE_SESSION);// 1代表session对象 0请求对象
        // redis 分布式架构
        return userDo;
    }

}