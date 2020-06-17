package com.wu.core.exception;

import com.wu.core.result.impl.ResponseCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 自定义异常处理类：定义多个拦截方法，拦截不同的异常类，并且可以获取抛出的异常信息，自由度更大
 * 1.在类上增加`@RestControllerAdvice`注解，标注当前是springmvc异步请求的通知类。
 * 2.新增一个异常处方法，专门用来处理异常信息和做统一异常返回处理。
 * 在方法中接受具体报错异常的对象，和springmvc中的request和相应对象，顺序没有关系。
 * 3.在方式增加对那类型的异常进行处理`  @ExceptionHandler(Throwable.class)
 */
@RestControllerAdvice
@Slf4j
public class GlobalExeceptionHandler {

    //@ResponseStatus注解的异常类会被ResponseStatusExceptionResolver解析
    //指定的HTTP状态码和指定的reson响应到浏览器
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "指定的reson响应到浏览器")
    //@ExceptionHandler声明在方法上用于指定需要统一拦截的异常
    @ExceptionHandler(Throwable.class) //throwable范围：接受所有异常
    public ErrorResult handlerExcetion(Throwable e, HttpServletRequest request) {
        //处理异常
        ErrorResult errorResult = ErrorResult.fail(ResponseCode.SERVER_ERROR, e);
        log.info(" 出现了全局Exception异常, 地址是：{}，异常是：{}", request.getRequestURI(), errorResult);
        return errorResult;
    }

    /**
     * 自定义异常捕获处理
     */
    @ExceptionHandler(BusinessException.class)
    public ErrorResult handlerBusinessException(BusinessException e, HttpServletRequest request) {
        //处理异常
        ErrorResult errorResult = ErrorResult.builder().status(e.getStatus())
                .message(e.getMsg())
                .exception(e.getClass().getName())//回去报错异常的类名
                .build();
        log.info("出现了 BusinessException异常, 地址是：{}，异常是：{}", request.getRequestURI(), errorResult);
        return errorResult;
    }

    /**
     * 专门用来处理统一校验异常的信息提取返回
     */
    @ExceptionHandler(BindException.class)
    public Map<String, Object> handlerBindException(BindException e, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        BindingResult bindingResult = e.getBindingResult();
        if (bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                map.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
        }
        return map;
    }

    /**
     * 自定义校验器定义全局异常处理
     */
    @ExceptionHandler(ValidatorException.class)
    public ErrorResult handlerValidatorException(ValidatorException e, HttpServletRequest request) {
        ErrorResult errorResult = ErrorResult.builder().status(e.getStatus())
                .message(e.getMsg())
                .exception(e.getClass().getName())
                .build();
        log.info(" 出现了 ValidatorException异常, 地址是：{}，异常是：{}", request.getRequestURI(), errorResult);
        //保存mysql .日志es ELK
        return errorResult;
    }


}




  /*  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(BindException.class)
    public Map<String,Object> handlerExcetion(BindException e, HttpServletRequest request) {
        BindingResult bindingResult = e.getBindingResult();
        Map<String,Object> map = new HashMap<>();
        if(bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                map.put(fieldError.getField(),fieldError.getDefaultMessage());
            }
        }
        return map;
    }


    @ExceptionHandler(ValidatorException.class)
    public ErrorResult handlerValidatorException(ValidatorException e, HttpServletRequest request) {
        ErrorResult errorResult = ErrorResult.builder().status(e.getStatus())
                .message(e.getMsg())
                .exception(e.getClass().getName())
                .build();
        log.info(" 出现了 ValidatorException异常, 地址是：{}，异常是：{}", request.getRequestURI(), errorResult);
        return errorResult;
    }*/