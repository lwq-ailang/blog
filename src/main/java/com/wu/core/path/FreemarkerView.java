package com.wu.core.path;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.view.freemarker.FreeMarkerView;

/**
 * 视图渲染到页面上去
 */
public class FreemarkerView extends FreeMarkerView {

    // freemaker顶级数据，代表在freemaker得任何模板中都可以使用该数据
    // 理解成为：application.setAttribute("basePath",basePath)
    @Override
    protected void exposeHelpers(Map<String, Object> model, HttpServletRequest request) throws Exception {
        String base = RequestUtil.getBasePath(request);
        model.put("basePath", base);
        model.put("adminPath", base + "/admin");//自己也可以加路径
        super.exposeHelpers(model, request);
    }

}
