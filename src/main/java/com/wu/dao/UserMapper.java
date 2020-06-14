package com.wu.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wu.pojo.UserDo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

// 只有集成的：BaseMapper 接口你才可以享受调用mybatis-plus提供封装好的curd的方法.
//@Repository
//@Mapper //也可以使用mapper注解
public interface UserMapper extends BaseMapper<UserDo> {

    // 自定义用户的查询
    public UserDo getUser(@Param("id") Long id);

}
