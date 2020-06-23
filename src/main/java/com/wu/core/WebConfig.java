package com.wu.core;

import com.wu.core.arguments.UserArgumentResolver;
import com.wu.core.i18n.MyLocaleResolver;
import com.wu.core.interceptor.BasePathInterceptor;
import com.wu.core.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * 扩展SpringMVC
 * SpringBoot2使用的Spring5，因此将WebMvcConfigurerAdapter改为WebMvcConfigurer
 * 使用WebMvcConfigurer扩展SpringMVC好处既保留了SpringBoot的自动配置，又能用到我们自己的配置
 */
//@EnableWebMvc //如果我们需要全面接管SpringBoot中的SpringMVC配置则开启此注解，
//开启后，SpringMVC的自动配置将会失效。
@Configuration
public class WebConfig implements WebMvcConfigurer {

   /* @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //设置对“/”的请求映射到index
        //如果没有数据返回到页面，没有必要用控制器方法对请求进行映射
        registry.addViewController("/").setViewName("index");
    }*/

    //注册我们自定义的区域解析器，一旦将我们的区域解析器注册到Spring容器中则SpingBoot
    //默认提供的区域解析器将不会自动注册
    @Bean
    public LocaleResolver localeResolver() {
        return new MyLocaleResolver();
    }

    /**
     * 注册拦截器：因为在开发中并不是所有的路由都需要拦截器处理。所有要注册那些路由要进行拦截如下：
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                // 2：通配符简化操作
                //.addPathPatterns("/pay","/course/**");//拦截那些路径
                /**
                 * 拦截器的通用配置:
                 *      在上面的代码中，如果我模块非常的多，有几十个，
                 *      那么我拦截器器注册`addPathPatterns` 这里就需要不停的去配置和修改。
                 *      那么有一种只配置一次少量修改呢？有，统一前缀，（有点类似于springcloud的网关路由）。
                 */
                // 3：统一配置:以admin开头全部拦截，*：代表一级 **：代表子孙级
                .addPathPatterns("/admin/**")
                // 4：白名单。代表不需要拦截的请求
                .excludePathPatterns("/admin/course/list");
        //先进拦截器-->为所有页面，生成全路径
        //不建议使用
        //registry.addInterceptor(new BasePathInterceptor()).addPathPatterns("/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        // 注册参数UserArgumentResolver注入器.让springmvc容器去加载
        resolvers.add(new UserArgumentResolver());
    }

}