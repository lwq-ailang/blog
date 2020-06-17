package com.wu.core.exception;

import com.wu.core.result.ResponseInterface;
import lombok.Data;

/**
 * 自定义系统异常类通过继承 RuntimeException
 * 这个地方不要写exception，因为Spring是只对运行时异常进行事务回滚，
 * 如果抛出的是exception是不会进行事务回滚的。
 */
@Data
public class ValidatorException extends RuntimeException {

    private Integer status;
    private String msg;

    public ValidatorException(ResponseInterface responseCode) {
        this.status = responseCode.getStatus();
        this.msg = responseCode.getMsg();
    }

    public ValidatorException(String message) {
        super(message);
    }

    public ValidatorException(Integer status, String message) {
        super(message);
        this.status = status;
        this.msg = message;
    }
}
