package com.wu.core.result.handler;

import com.wu.core.result.ServerResponse;
import com.wu.core.result.impl.ResponseCode;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.xml.ws.Response;

/**
 * ResponseBodyAdvice采用ResponseBodyAdvice技术来实现response的统一格式处理
 * 一般用来处理返回值和响应体，做数据的加密和解密，签名等等。
 * 其实就是AOP的一种实现策略
 */
@ControllerAdvice(basePackages = "com.wu")//需要拦截的package
public class ResponseBodyAdivce implements ResponseBodyAdvice<Object> {

    /**
     * 在此方法中添加需要过滤的条件
     */
    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        // 保留问题：看是否可以拿到返回结果得类型,
        /*  // 此方法，是用于校验你得结果返回值类型，如果是true,才会去执行beforeBodyWrite方法，否则直接断开
       if(methodParameter.getClass().equals(UserDo.class)) {
           return true;
       }
        */
        return true;
    }

    /**
     * 先处理supports()方法，只有返回true才会调用beforeBodyWrite()方法
     * Object o：返回的数据
     * MethodParameter methodParameter：返回的参数
     */
    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {

        //if(o instanceof ErrorResponseCode){
        //    return ServerResponse.error(ResponseCode.USERNAME_EMPTY);
        //}else {
        return ServerResponse.success(ResponseCode.SUCCESS, o);
        //}
    }
}
