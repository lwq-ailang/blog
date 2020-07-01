package com.wu.web;

import com.wu.core.Contants;
import com.wu.pojo.UserDo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * 课程
 */
@Controller
public class LoginController {

    // 放在templates下面页面，就不是静态页面，它是一种模板保护起来得
    // 是无法直接通过浏览器访问,只能通过springmvc得路由(定义一个springmvc得方法)去调整
    // 如果放在static.直接当作文本输出。没有任何作用。
    //todo http://localhost:8080/login
    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @PostMapping("logined")
    @ResponseBody//加上 @ResponseBody 代表异步请求的时候直接把return的结果返回给异步succes中获取
    public String logined(String account, String password, HttpSession session) {
        if (account.equals("wu") && password.equals("wu")) {
            UserDo userDo = new UserDo();
            userDo.setId(1001L);
            userDo.setAccount(account);
            userDo.setPassword(password);
            // 把用户信息放入到session中
            session.setAttribute(Contants.SESSION_USER, userDo);
            return "success";
        } else {
            return "fail";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        // 把项目中所有的session的数据全部失效
        session.invalidate();
        return "redirect:/";
    }
}
