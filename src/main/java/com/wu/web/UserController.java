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

    @Autowired
    //@Qualifier("IUserService")//指定service
            IUserService userService;

    /**
     * 直接把表单的参数写在Controller相应的方法的形参中，适用于get方式提交，不适用于post方式提交。
     */
    @GetMapping("/getuser")
    public UserDo getUser(Long userId) {
        return userService.getUser(userId);
    }

    /**
     * 通过HttpServletRequest接收，post方式和get方式都可以。
     */
    @GetMapping("/getuser1")
    public UserDo getUser1(HttpServletRequest request) {
        Long userId = Long.valueOf(request.getParameter("id"));
        return userService.getUser(userId);
    }

    /**
     * get请求通过@PathVariable获取路径中的参数
     * TODO:http://localhost:8080/getuser/13144730969
     */
    @GetMapping("/getuser2/{id}")
    public UserDo getUser2(@PathVariable("id") Long userId) {
        return userService.getUser(userId);
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

    /**
     * 作业：
     *      1.完成的mybatis-plus的curd和分页（需要配置mybatis-plus类定义分页对象）
     *      2.研究一下：lomobok
     *      3.研究一下：日志框架
     *      4.查看一个面试题：@Resource和@AutoWrired的差异和区别。
     */

}
