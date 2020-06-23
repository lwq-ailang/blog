package com.wu.web.session;

import com.wu.core.Contants;
import com.wu.pojo.UserDo;
import com.wu.service.IPayService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 支付
 */
@Controller
@RequestMapping("/admin/pay")
@Log4j2
public class PayController extends BaseController {

    @Autowired
    private IPayService payService;

    /**
     * TODO 第一种：直接在需要的处理的方法逻辑上进行进行定义 HttpSession, 获取到了用户信息。
     * 问题：不符合代码的封装性，和维护性，很容易造成代码的冗余、还有维护起来不方便，而且耦合度很高。
     */
    @GetMapping("weixinpay")
    public String weixinpay(HttpSession session) {
        UserDo userDo = (UserDo) session.getAttribute(Contants.SESSION_USER);//从session获取数据
        if (userDo != null) {
            log.info("你服务器端的用户信息是是：{}", userDo);
        }
        //获取用户信息
        return "weixinpay";
    }

    /**
     * TODO 第二种：通过学习基础中集成父类的概念，把公共获取用户状态的信息进行封装。然后子类进行继承达到一个初级别的复用。
     * 问题：上面虽然通过父类已经达到一基本抽离，但是代码的耦合度还是存在。
     */
    @GetMapping("alipay")
    public String alipay() {
        UserDo userDo = getUserDo();
        if (userDo != null) {
            log.info("你服务器端的用户信息是是：{}", userDo);
        }
        //获取用户信息
        return "alipay";
    }

    /**
     * TODO 第三种：可以通过springmvc提供的参数注入的方式获取 编写类实现HandlerMethodArgumentResolver
     * 在springmvc中提供了很多一些handler处理器（适配器）,其中就有个专门来处理参数的的适配器就是`HandlerMethodArgumentResolver`,
     * 定义类实现它，它是拦截器处理完之后，方法进入之前，对参数进行改造和处理的一种机制，这个在开发中也可以用来获取用户的信息。
     * <p>
     * 问题：还是耦合的，需要用户信息状态得地方就必须写一个`UserDo`的参数类。
     * todo:
     * 通过反射拿到路由(url)-->requestMapping-->找到具体的方法
     * 1.拦截器-->preHandle方法，
     * 2.1返回false则直接结束
     * 2.2返回true进入适配器(HandlerMethodArgumentResolver)-->supportsParameter方法(判断参数是否包含),
     * 3.1返回false直接进入SpringMVC方法中
     * 3.2返回true执行resolveArgument方法，请求参数被注入，再进入SpringMVC方法中
     * 4.方法执行完毕，进入拦截器-->postHandle方法-->afterCompletion方法
     */
    @GetMapping("alipay")
    public String pay(UserDo userDo) {
        if (userDo != null) {
            log.info("4----->你服务器端的用户信息是是：{}", userDo);
        }
        //获取用户信息
        return "alipay";
    }

    /**
     * TODO 第四种：使用ThreadLocal的方式获取:
     *      ThreadLocal是一个线程副本，它的原理是一个`WeakupHashMap<String,Object>。
     *      但是这个东西为什么出现在程序中，并且在springmvc, spring、Hibernate、Struts2的源码中大量看见它的身影，用它能解决什么问题呢？
     *   使用规则：必须定义是一个成员变量。不是局部变量。因为线程处理对象。它本身的作用：就用存储线程在执行对象中的一些数据。
     */

    @GetMapping("alipay")
    public String alipay(HttpServletRequest request) {
        HttpSession session = request.getSession();
        UserDo userDo = (UserDo) session.getAttribute(Contants.SESSION_USER);
        if (userDo != null) {
            log.info("你服务器端的用户信息是是：{}", userDo);
        }
        //获取用户信息
        return "pay";
    }

    @GetMapping("paylist")
    public String save() {
        payService.pay2();
        //获取用户信息
        return "weixinpay";
    }


}
