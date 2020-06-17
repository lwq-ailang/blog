package com.wu.core.exception;

import com.wu.core.result.impl.ResponseCode;
import lombok.*;

/**
 * 这个类专门来接受异常信息的返回
 */
@Data
@Builder //builder模式
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorResult {

    private int status;// 异常状态码
    private String message;// 用户看到的异常信息
    private String exception;//异常堆栈信息

    public static ErrorResult fail(ResponseCode responseCode, Throwable e, String message) {
        ErrorResult errorResult = ErrorResult.fail(responseCode, e);
        errorResult.setMessage(message);
        return errorResult;
    }

    public static ErrorResult fail(ResponseCode responseCode, Throwable e) {
        ErrorResult errorResult = new ErrorResult();
        errorResult.setStatus(responseCode.getStatus());
        errorResult.setMessage(responseCode.getMsg());
        errorResult.setException(e.getMessage());
        return errorResult;
    }
}
