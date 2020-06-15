package com.wu.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wu.dao.UserMapper;
import com.wu.pojo.UserDo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


//springioc规则、：如果一个接口只有一个实现类，springioc容器会自动当前这个实现给接口

/**
 * Autowired报红解决办法:
 * 1.使用lombok:
 *      @RequiredArgsConstructor(onConstructor = @__(@Autowired))
 *      final修饰变量：private final UserMapper userMapper;
 * 2.xxxMapper上使用@Repository注解
 * 3.将@Autowired(属于spring的,根据类型)用@Resource(属于J2EE的,先根据名字，再根据类型)代替
 */
@Service
//@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Log4j2 //lombok日志注解
public class UserServiceImpl implements IUserService {


    // @RequiredArgsConstructor(onConstructor = @__(@Autowired))
    // 请注意一定要加final否则报错
    // lombok在反编译的时候，会把下面的userMapper属性用构造函数注入了。但是一定要加final否则不会生成构建注入。
    //private final UserMapper userMapper;
    @Autowired
    private UserMapper userMapper;


    /**
     * 根据用户id查询用户信息
     */
    @Override
    public UserDo getUser(Long id) {
        log.info("你当前输入的用户id是:{},name:{}", id, "xxxx");
        // 这里典型动态代理机制 + 反射 ：接口调用方法没有实现类绝对是动态代理实现的。
        return userMapper.selectById(id);
    }

    @Override
    public UserDo getUser2(Long id) {
        log.info("你当前输入的用户id是:{},name:{}", id, "xxxx");
        // 这里典型动态代理机制 + 反射 ：接口调用方法没有实现类绝对是动态代理实现的。
        return userMapper.getUser(id);
    }

    @Override
    public List<UserDo> getUserList(int pageIndex, int pageSize, Map<String, Object> param) {
        try {
            Page<UserDo> page = new Page(pageIndex, pageSize);//设置分页对象
            QueryWrapper<UserDo> wrapper = new QueryWrapper();//条件查询对象
            if (!StringUtils.isEmpty(param.get("userName"))) {
                wrapper.like("username", param.get("userName"));
            }
            page = userMapper.selectPage(page, wrapper);
            return page.getRecords();//获取数据
        } catch (Exception e) {
            log.error("分页获取数据失败，e={}", e);
            return null;
        }
    }

    //不止一个作业：完成数据表增删改查和分页
}
