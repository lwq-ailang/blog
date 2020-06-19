package com.wu.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.wu.pojo.UserDo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
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

    /**
     * @Select 是查询类的注解，所有的查询均使用这个
     * @Result 修饰返回的结果集，关联实体类属性和数据库字段一一对应，如果实体类属性和数据库属性名保持一致，就不需要这个属性来修饰。
     * @Insert 插入数据库使用，直接传入实体类会自动解析属性到对应的值
     * @Update 负责修改，也可以直接传入对象
     * @delete 负责删除
     */
    @Select("SELECT id,username,update_time,password,account FROM keke_user WHERE id = #{id}")
    @Results({@Result(property = "updateTime", column = "update_time")})
    UserDo getOne(Long id);

}
