package com.wu.util;

import org.springframework.beans.BeanUtils;

/*
 * @Description 数据转换工具
 * @Author 创世神Java
 * 更多精彩B站搜索: 创世神Java
 * 创世神B站：https://space.bilibili.com/490711252
 * @Date 14:36 2020/5/5
 * @Param
 * @return
 **/
public class DtoVoBeanUtils<Vo, Dto> {

    /**
     * dot 转换为Do 工具类
     *
     * @param voEntity
     * @param dtoClass
     * @return
     */
    public static <Dto> Dto voToDto(Object voEntity, Class<Dto> dtoClass) {
        // 判断VoSF是否为空!
        if (voEntity == null) {
            return null;
        }
        // 判断DtoClass 是否为空
        if (dtoClass == null) {
            return null;
        }
        try {
            Dto newInstance = dtoClass.newInstance();
            BeanUtils.copyProperties(voEntity, newInstance);
            // Dto转换Do
            return newInstance;
        } catch (Exception e) {
            return null;
        }
    }
}
