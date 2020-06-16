package com.wu.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.conditions.query.LambdaQueryChainWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wu.dao.UserMapper;
import com.wu.pojo.UserDo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.baomidou.mybatisplus.core.toolkit.Wrappers.query;


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
    public UserDo selectById(Long id) {
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

    /**
     * 根据Ids查询多个
     *
     * @param list
     */
    @Override
    public List<UserDo> selectByIds(String ids) {
        String[] idsString = ids.split(",");
        List<String> idsList = Arrays.asList(idsString);
        return userMapper.selectBatchIds(idsList);
    }

    /**
     * 根据Ids查询多个
     *
     * @param map
     */
    @Override
    public List<UserDo> selectByIds(Map<String, Object> param) {
        //param里面是查询条件，  TODO：key=数据库对应的列
        return userMapper.selectByMap(param);
    }

    /**
     * 条件构造器（非分页）：List<实体类>
     */
    @Override
    public List<UserDo> selectByWrapper(Map<String, Object> param) {
        //第一种创建条件对象：使用子类
        UserDo userDo = new UserDo();
        userDo.setUsername("王");
        QueryWrapper<UserDo> wrapper = new QueryWrapper(userDo);//条件查询对象
        //第二种创建条件对象：使用条件工具类
        //QueryWrapper<UserDo> query = Wrappers.query();

        // like("数据库的列",value)：数据库的列 like %value%
        // likeRight("数据库的列",value)：数据库的列 like value%
        // likeLeft("数据库的列",value)：数据库的列 like %value
        // lt("数据库的列"，value)：数据库的列 ＜ value
        // eq("数据库的列", value)：数据库的列 = value
        // gt("数据库的列",value)：数据库的列 ＞ value
        // between("数据库的列",value1,value2)：value1 ≤ 数据库的列 ≤ value2
        // isNotNull("数据库的列")：数据库的列非空
        // or()：或者
        // and(wp -> wp.eq("数据库列1", "value").or().isNotNull("数据库列2"))：and(数据库列1=value or 数据列2 != null)
        // orderByAsc("数据库的列")：根据数据库的列升序
        // orderByDesc("数据库的列")：根据数据库的列降序
        // apply("date_format(dateColumn,'%Y-%m-%d')={0}",value)：这种方式可防止注入
        // inSql("数据库的列", "子查询sql语句")：子查询

        wrapper.orderByDesc();
        return userMapper.selectList(wrapper);
    }

    /**
     * 条件构造器（非分页）：List<Map<String,Object>>
     */
    @Override
    public List<Map<String, Object>> selectMaps(Map<String, Object> param) {
        QueryWrapper<UserDo> wrapper = new QueryWrapper();//条件查询对象
        wrapper.select("id userId", "username");//指定返回字段名（可以取别名）
        return userMapper.selectMaps(wrapper);
    }

    /**
     * 获取 LambdaWrapper 3种方式：
     *      LambdaQueryWrapper<UserDo> lambda = new QueryWrapper().lambda();
     *      LambdaQueryWrapper<UserDo> lambdaQuery = Wrappers.lambdaQuery();
     *      LambdaQueryWrapper<UserDo> lambda = new LambdaQueryWrapper<>();
     */

    /**
     * 分页查询+条件查询
     */
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

}
