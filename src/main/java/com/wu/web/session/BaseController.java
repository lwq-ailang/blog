package com.wu.web.session;

import com.wu.core.Contants;
import com.wu.pojo.UserDo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpSession;

@Controller
public abstract class BaseController {

    @Autowired
    private HttpSession session;

    public UserDo getUserDo() {
        return (UserDo) session.getAttribute(Contants.SESSION_USER);
    }

    public Long getUserId() {
        return ((UserDo) session.getAttribute(Contants.SESSION_USER)).getId();
    }

}
