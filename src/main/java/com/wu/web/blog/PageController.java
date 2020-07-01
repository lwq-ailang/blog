package com.wu.web.blog;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 为什么使用controller注解？
 *
 * @RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。
 * 1)如果只是使用@RestController注解Controller，则Controller中的方法无法返回jsp页面，配置的视图解析器InternalResourceViewResolver不起作用，返回的内容就是Return 里的内容。
 * 例如：本来应该到login.html页面的，则其显示login.
 * 2)如果需要返回到指定页面，则需要用 @Controller配合视图解析器InternalResourceViewResolver才行。
 * 3)如果需要返回json或者xml或者自定义mediaType内容到页面，则需要在对应的方法上加上@ResponseBody注解
 * @ResponseBody作用： 该注解用于将Controller方法返回的对象，通过适当的HttpMessageConverter转换为指定格式后（如：json格式），写入到Response对象的body数据区。
 * 使用时机：返回的数据不是html标签的页面，而是其他某种格式的数据时（如json、xml等）使用当我们不需要讲数据封装,而是需要实现页面的跳转的时候,就将@responseBody去掉,然后最后返回跳转的页面名称就好.
 */
@Controller
public class PageController {

    /**
     * 跳转到添加博客页面:
     */
    @GetMapping("/admin/addblog")
    public String addblog() {
        return "blog/add";
    }

}
