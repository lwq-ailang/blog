package com.wu.vo;

import com.wu.core.validator.Bettween;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UseVo {

    // 用户id
    private Long id;
    // 用户名
    @NotEmpty(message = "用户名不允许为空!")
    private String username;
    // 用户账号
    @NotEmpty(message = "账号不允许为空!")
    @Length(min = 6, max = 16)
    private String account;
    // 用户密码
    // 日期 create_time 默认遵循驼峰
    @Bettween(min = 6, max = 16, message = "你输入的密码必须是：6-16位")
    @NotEmpty(message = "密码不允许为空!")
    private String password;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
}
