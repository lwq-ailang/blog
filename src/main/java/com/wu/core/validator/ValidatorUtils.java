package com.wu.core.validator;

import com.wu.core.exception.ValidatorException;
import com.wu.core.result.impl.ResponseCode;
import com.wu.util.PhoneUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.StringUtils;

@Log4j2
public class ValidatorUtils {

    /**
     * 空校验（null or ""）
     */
    public static void isEmpty(Object str, String fieldName) {
        if (StringUtils.isEmpty(str)) {
            log.info("[ValidatorException][isEmpty][" + fieldName + "]");
            throw new ValidatorException(ResponseCode.ISEMPTY.getStatus(), fieldName + ResponseCode.ISEMPTY.getMsg());
        }
    }

    public static void same(Object str, Object str2, String fieldName) {
        if (StringUtils.isEmpty(str)) {
            throw new ValidatorException(ResponseCode.ISEMPTY.getStatus(), fieldName + ResponseCode.ISEMPTY.getMsg());
        }

        if (StringUtils.isEmpty(str2)) {
            throw new ValidatorException(ResponseCode.ISEMPTY.getStatus(), fieldName + ResponseCode.ISEMPTY.getMsg());
        }

        if (str.equals(str2)) {
            throw new ValidatorException(ResponseCode.ISSAME.getStatus(), fieldName + ResponseCode.ISSAME.getMsg());
        }
    }

    public static void diff(Object str, Object str2, String fieldName) {
        if (StringUtils.isEmpty(str)) {
            throw new ValidatorException(ResponseCode.ISEMPTY.getStatus(), fieldName + ResponseCode.ISEMPTY.getMsg());
        }

        if (StringUtils.isEmpty(str2)) {
            throw new ValidatorException(ResponseCode.ISEMPTY.getStatus(), fieldName + ResponseCode.ISEMPTY.getMsg());
        }

        if (!str.equals(str2)) {
            throw new ValidatorException(ResponseCode.ISDIFF.getStatus(), fieldName + ResponseCode.ISDIFF.getMsg());
        }
    }

    /**
     * 判断对象不允许为null
     *
     * @param obj
     * @param fieldName
     */
    public static void isNull(Object obj, String fieldName) {
        if (null == obj) {
            throw new ValidatorException(ResponseCode.ISNULL.getStatus(), fieldName + ResponseCode.ISNULL.getMsg());
        }
    }

    /**
     * 长度校验
     */
    public static void length(String str, String fieldName, int min, int max) {
        if (StringUtils.isEmpty(str)) {
            return;
        }
        int length = 0;
        if (!StringUtils.isEmpty(str)) {
            length = str.length();
        }
        if (length < min || length > max) {
            throw new ValidatorException(ResponseCode.LENGTH.getStatus(), fieldName + "长度" + min + "~" + max + "位");
        }
    }

    /**
     * 长度校验
     */
    public static void isMobile(String str, String fieldName) {
        if (!PhoneUtils.isChinaPhoneLegal(str)) {
            throw new ValidatorException(ResponseCode.PHONEERROR.getStatus(), fieldName + ResponseCode.PHONEERROR.getMsg());
        }
    }

    public static void main(String[] args) throws ValidatorException {
        isMobile("19074816437", "phone");
    }
}
