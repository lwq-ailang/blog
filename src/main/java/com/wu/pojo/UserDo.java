package com.wu.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("keke_user")
public class UserDo {

    // 用户id
    @TableId
    private Long id;
    // 用户名
    private String username;
    // 用户账号
    private String account;
    // 用户密码
    private String password;
    // 日期 create_time 默认遵循驼峰
    @TableField("create_time")
    private Date createTime;
}
