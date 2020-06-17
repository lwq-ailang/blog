package com.wu.core.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * 创建自定义校验注解的具体实现类
 * 实现ConstraintValidator
 * 泛型一：校验的注解类
 * 泛型二：被校验的对象类型
 */
public class BettweenValidator implements ConstraintValidator<Bettween, CharSequence> {

    private int min;
    private int max;

    public BettweenValidator() {
    }

    @Override
    public void initialize(Bettween parameters) {
        //取出注解中的数据
        this.min = parameters.min();
        this.max = parameters.max();
        this.validateParameters();
    }

    /**
     * 在这里面定义校验规则
     *
     * @param value                      待校验对象
     * @param constraintValidatorContext
     * @return true 通过校验 false 无法通过校验
     */
    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext constraintValidatorContext) {
        // 这里代码的含义是：长度校验不牵涉到空判断。因为空判断是由@NotEmpty去做的。
        if (value == null) {
            return true;
        } else {
            int length = value.length();
            return length >= this.min && length <= this.max;
        }
    }

    private boolean validateParameters() {
        if (this.min < 0) {
            return false;
        } else if (this.max < 0) {
            return false;
        } else if (this.max < this.min) {
            return false;
        }
        return true;
    }
}
