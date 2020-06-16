package com.wu.web;

import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2 //lombok日志注解
public class UserController {

    /**
     * 作业：
     * 1.完成的mybatis-plus的curd和分页（需要配置mybatis-plus类定义分页对象）
     * 2.研究一下：lomobok
     * 3.研究一下：日志框架
     * 4.查看一个面试题：@Resource和@AutoWrired的差异和区别。
     *
     * @Autowire 默认按照类型装配，默认情况下它要求依赖对象必须存在，不存在会NullpointException，
     * 如果允许为null，可以设置它required属性为false，如果我们想使用按照名称装配，可以结合@Qualifier注解一起使用;
     * @Resource默认按照名称装配，当找不到与名称匹配的bean才会按照类型装配，可以通过name属性指定， 如果没有指定name属性，当注解标注在字段上，即默认取字段的名称作为bean名称寻找依赖对象，
     * 当注解标注在属性的setter方法上，即默认取属性名作为bean名称寻找依赖对象.
     * @Autowired字段注入会产生警告，并且建议使用构造方法注入。而使用@Resource不会有警告。 不建议使用字段注入和setter注入的方法，@Autowired可能引起NullPointerException，@Resource不能将属性设置为final。
     * 从spring4开始官方一直推荐使用构造方法注入。但是构造方法注入只能使用@Autowired，不能使用@Resource。
     * <p>
     * 推荐使用：@Resource注解在字段上，这样就不用写setter方法了，并且这个注解是属于J2EE的，减少了与spring的耦合。这样代码看起就比较优雅。如果要字段注入，使用@Resource；要构造方法注入，使用@Autowired。
     */

    //当UserService实现类有两个以上的时候，会造成了冲突，需要Qualifier通过名称指定实现类
    @Autowired
    @Qualifier("userServiceImpl")// 两个结合起来可以根据名字和类型注入,指定beanName
            IUserService userService;

    /**
     * 直接把表单的参数写在Controller相应的方法的形参中，适用于get方式提交，不适用于post方式提交。
     */
    @GetMapping("/getuser")
    public UserDo getUser(Long userId) {
        return userService.selectById(userId);
    }

    /**
     * 通过HttpServletRequest接收，post方式和get方式都可以。
     */
    @GetMapping("/getuser1")
    public UserDo getUser1(HttpServletRequest request) {
        Long userId = Long.valueOf(request.getParameter("id"));
        return userService.selectById(userId);
    }

    /**
     * get请求通过@PathVariable获取路径中的参数
     * TODO:http://localhost:8080/getuser/13144730969
     */
    @GetMapping("/getuser2/{id}")
    public UserDo getUser2(@PathVariable("id") Long userId) {
        return userService.selectById(userId);
    }

    /**
     * 使用@ModelAttribute注解获取POST请求的FORM表单数据(传对象)
     */
    @PostMapping("/getuser3")
    public UserDo getUser3(@ModelAttribute("user") UserDo user) {
        return userService.getUser2(user.getId());
    }

    /**
     * 用注解@RequestParam绑定请求参数到方法入参,当请求参数username不存在时会有异常发生,可以通过设置属性required=false解决,
     * 例如: @RequestParam(value="username", required=false)
     *
     * @RequestBody接收的是一个Json对象(对象或者List)
     */
    @GetMapping("/getUserList")
    public List<UserDo> getUserList(@RequestParam("pageIndex") int pageIndex,
                                    @RequestParam("pageSize") int pageSize,
                                    @RequestBody Map<String, Object> param) {
        return userService.getUserList(pageIndex, pageSize, param);
    }

    //案例：Map类型作为参数，只需要使用@RequestParam注解即可 @RequestParam Map<String, Object> param
    //案例：接受list请求参数:@RequestParam("listParam[]") List<String> param

}
