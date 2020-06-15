package com.wu.web.result;

import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 升级版：利用springMVC得后置通知适配器来做结果拦截
 */
@RestController
@Log4j2 //lombok日志注解
@RequestMapping("/result")
public class ResultController1 {

    @Autowired
    private IUserService userService;

    /**
     * SpringMVC流程：
     * 1.拦截器
     * 2.数据类型转换器-
     * 3.全局异常处理 -返回--- 适配器 handler ---
     * 4.适配器 handler （使用后置通知来处理统一返回结果：编写返回处理类实现ResponseBodyAdivce接口）
     * <p>
     * 作业：了解一下springboot中如何整合springMVC得参数来拦截，结果拦截,全局异常。
     */

    @GetMapping("/getuser4/{id}")
    public UserDo getuser4(@PathVariable("id") Long id) {
        //System.out.println(1/0);//{status:500,msg:"服务出现故障.."} springmvc 全局异常处理
        return userService.getUser(id);
    }

    @GetMapping("/getuser5/{id}")//{id}= 13144730969
    public UserDo getuser5(@PathVariable("id") Long id) {
        return userService.getUser2(id);
    }

    @GetMapping("/login2")
    public String login2() {
        return "success";
    }

    @GetMapping("/count2")
    public int counttest() {
        return 1;
    }

}
