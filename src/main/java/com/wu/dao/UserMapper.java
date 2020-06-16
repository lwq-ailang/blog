package com.wu.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.wu.pojo.UserDo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

// 只有集成的：BaseMapper 接口你才可以享受调用mybatis-plus提供封装好的curd的方法.
//@Repository
//@Mapper //也可以使用mapper注解
public interface UserMapper extends BaseMapper<UserDo> {

    // 自定义用户的查询
    UserDo getUser(@Param("id") Long id);

    //方式一使用注解：
    //@Select("select * from keke_user ${ew.customSqlSegment}")
    //方式二使用xml配置
    List<UserDo> selectAll(@Param(Constants.WRAPPER) Wrapper<UserDo> wrappers);


}
