package com.wu.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 正因为编译后的class文件与不使用Lambok进行处理的文件内容完全一致，所以在生产环境不需要使用Lambok插件对其进行支持，
 * 因为Lambok只是在开发阶段简化开发的工具插件，而生产环境则是对class文件进行部署。
 *
 * @Getter/@Setter: 作用类上，生成所有成员变量的getter/setter方法；
 * 作用于成员变量上，生成该成员变量的getter/setter方法。可以设定访问权限及是否懒加载等。
 * @ToString：作用于类，覆盖默认的toString()方法，可以通过of属性限定显示某些字段，通过exclude属性排除某些字段。
 * @EqualsAndHashCode：作用于类，覆盖默认的equals和hashCode
 * @NonNull：主要作用于成员变量和参数中，标识不能为空，否则抛出空指针异常。
 * @NoArgsConstructor：生成无参构造器；
 * @RequiredArgsConstructor：生成包含final和@NonNull注解的成员变量的构造器；
 * @AllArgsConstructor：生成全参构造器
 * @Value : 注解和@Data类似，区别在于它会把所有成员变量默认定义为private final修饰，并且不会生成set方法。
 * @Data：作用于类上，是以下注解的集合：@ToString @EqualsAndHashCode @Getter @Setter @RequiredArgsConstructor
 * @Builder：作用于类上，将类转变为建造者模式
 * @Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象
 **/
@Data
@ToString(of = {"id", "username", "account", "createTime"}, exclude = {"password"})
@AllArgsConstructor
@NoArgsConstructor
@TableName("keke_user")
public class UserDo {

    @NonNull
    @TableId // 声明为主键(默认叫id)
    private Long id;
    // 用户名
    @TableField(condition = SqlCondition.EQUAL)
    private String username;
    // 用户账号
    private String account;
    // 用户密码
    private String password;
    // 日期 create_time 默认遵循驼峰
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    //@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(value = "create_time", fill = FieldFill.INSERT)//指定数据库字段名
    private Date createTime;

    //三种排除非表字段方式：1.transient（不参与序列化） 2.staticstatic（参与序列化）3.使用@TableField(exist = false)
    //private transient String remark;
    //private @TableField(exist = false) String remark;
    @TableField(exist = false)
    private transient String remark;

    private String updateTime;
}
