package com.wu.web.exception;

import com.wu.core.exception.BusinessException;
import com.wu.core.result.impl.ResponseCode;
import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2 //lombok日志注解
public class ExceptionController {

    @Autowired
    private IUserService userService;

    //http://localhost:8080/getuserById?userId=13144730969
    @GetMapping("/getuserById")
    public UserDo getuserById(Long userId) {
        System.out.println(1 / 0);//by zero
        return userService.selectById(userId);
    }

    @GetMapping("/getuserById1")
    public UserDo getuserById1(Long userId) {
        if (userId == null) {
            throw new BusinessException(ResponseCode.ISEMPTY);
        }
        try {
            System.out.println(1 / 0);//by zero
            return userService.selectById(userId);
        } catch (BusinessException ex) {
            //抛出指定的异常
            throw new BusinessException(ResponseCode.SERVER_ERROR);
        }
    }


}
