package com.wu.web.validator;

import com.wu.core.validator.ValidatorUtils;
import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ValidatorController2 {

    @Autowired
    private IUserService userService;

    @GetMapping("/validator2")
    public UserDo testvalidator(UserDo userDo) {
        //可以干掉大部分if(使用统一异常处理)
        ValidatorUtils.isNull(userDo, "userDo");
        ValidatorUtils.isEmpty(userDo.getUsername(), "username");
        return null;
    }

}
