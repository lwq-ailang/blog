package com.wu.core.exception;

import com.wu.core.result.ResponseInterface;
import lombok.Data;

/**
 * 自定义系统异常类通过继承 RuntimeException。
 */
@Data
public class BusinessException extends RuntimeException {

    private Integer status;
    private String msg;

    public BusinessException(ResponseInterface responseCode) {
        this.status = responseCode.getStatus();
        this.msg = responseCode.getMsg();
    }

}
