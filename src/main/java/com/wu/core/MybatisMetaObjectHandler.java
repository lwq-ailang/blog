package com.wu.core;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * 公共字段自动填充 MybatisPlusConfig配置不生效解决
 */
@Component
public class MybatisMetaObjectHandler implements MetaObjectHandler {


    /**
     * 新增数据执行
     *
     * @param metaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        Object createTime = getFieldValByName("createTime", metaObject);
        Object updateTime = getFieldValByName("updateTime", metaObject);
        if (createTime == null) {
            setFieldValByName("createTime", new Date(), metaObject);//mybatis-plus版本2.0.9+
        }
        if (updateTime == null) {
            setFieldValByName("updateTime", new Date(), metaObject);//mybatis-plus版本2.0.9+
        }
    }

    /**
     * 更新数据执行
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        Object updateTime = getFieldValByName("updatetime", metaObject);
        if (updateTime == null) {
            // updateTime 是实体的属性名
            setFieldValByName("updatetime", new Date(), metaObject);//mybatis-plus版本2.0.9+
        }
    }

}
