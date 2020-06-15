package com.wu.core;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MybatisMetaObjectHandler implements MetaObjectHandler {


    @Override
    public void insertFill(MetaObject metaObject) {

        /*boolean isdelete = metaObject.hasSetter("isdelete");
        boolean year = metaObject.hasSetter("year");
        boolean month = metaObject.hasSetter("month");
        boolean date = metaObject.hasSetter("date");
        boolean hour = metaObject.hasSetter("hour");
        boolean minutes = metaObject.hasSetter("minutes");
        boolean seconds = metaObject.hasSetter("seconds");
        DateTime dateTime = new DateTime();

        if (isdelete) {
            setFieldValByName("isdelete", 0, metaObject);
        }
        if (year) {
            setFieldValByName("year", dateTime.getYear(), metaObject);
        }

        if (month) {
            setFieldValByName("month", dateTime.getMonthOfYear(), metaObject);
        }

        if (date) {
            setFieldValByName("date", dateTime.getDayOfMonth(), metaObject);
        }

        if (hour) {
            setFieldValByName("hour", dateTime.getHourOfDay(), metaObject);
        }

        if (minutes) {
            setFieldValByName("minutes", dateTime.getMinuteOfHour(), metaObject);
        }

        if (seconds) {
            setFieldValByName("seconds", dateTime.getSecondOfMinute(), metaObject);
        }*/
    }


    @Override
    public void updateFill(MetaObject metaObject) {
        Object updateTime = getFieldValByName("updatetime", metaObject);
        if (updateTime == null) {
            // updateTime 是实体的属性名
            setFieldValByName("updatetime", new Date(), metaObject);
        }
    }

}
