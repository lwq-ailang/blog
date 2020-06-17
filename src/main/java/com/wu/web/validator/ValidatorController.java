package com.wu.web.validator;

import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import com.wu.vo.UseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class ValidatorController {

    @Autowired
    private IUserService userService;

    @GetMapping("/validator")
    public UserDo testvalidator(@Valid UseVo useVo) {
        return null;
    }

}
