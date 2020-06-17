package com.wu.core.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

// @Documented当前注解是否可以写入到javadoc
@Documented
// 这里就是核心，这里就是处理该注解的校验器类，绑定具体的校验实现类
@Constraint(validatedBy = {BettweenValidator.class})
// 注解可以使用的范围：可以用在方法上，属性上，注解上,构造函数上，参数上，
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
// 该注解在运行时进行编译生效。
@Retention(RetentionPolicy.RUNTIME)
public @interface Bettween {
    int min() default 0;

    int max() default 2147483647;

    String message() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
