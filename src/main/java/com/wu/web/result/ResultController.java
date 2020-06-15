package com.wu.web.result;


import com.wu.core.result.ServerResponse;
import com.wu.core.result.impl.ResponseCode;
import com.wu.core.result.impl.UserResponseCode;
import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 低配版：统一返回结果（使用枚举类，小公司用的多）
 */
@RestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    IUserService userService;

    @GetMapping("/getuser1/{id}")
    public ServerResponse getUser(@PathVariable("id") Long id) {
        UserDo user = userService.getUser(id);
        return ServerResponse.success(UserResponseCode.LOGIN_SUCCESS, user);
    }


    @GetMapping("/getuser2/{id}")//{id}= 13144730969
    public ServerResponse getUser2(@PathVariable("id") Long id) {
        if (id == 1) {
            return ServerResponse.error(ResponseCode.USERNAME_EMPTY);
        }
        UserDo user = userService.getUser2(id);
        return ServerResponse.success(UserResponseCode.LOGIN_SUCCESS, user);
    }


    @GetMapping("/login")//{id}= 13144730969
    public ServerResponse login(String username, String password) {

        if (StringUtils.isEmpty(username)) {
            return ServerResponse.error(ResponseCode.USERNAME_EMPTY);
        }

        if (StringUtils.isEmpty(password)) {
            return ServerResponse.error(ResponseCode.PASSWORD_EMPTY);
        }

        return ServerResponse.success(UserResponseCode.LOGIN_SUCCESS);
    }

}
