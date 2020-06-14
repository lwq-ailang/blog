package com.wu.web;

import com.wu.pojo.UserDo;
import com.wu.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    //@Qualifier("IUserService")//指定service
            IUserService userService;

    /**
     * todo:http://localhost:8080/getuser/13144730969
     */
    @GetMapping("/getuser/{id}")
    public UserDo getUser(@PathVariable("id") Long userId) {
        return userService.getUser(userId);
    }


    @GetMapping("/getuser2/{id}")
    public UserDo getUser2(@PathVariable("id") Long id) {
        return userService.getUser2(id);
    }

    @GetMapping("/getUserList")
    public List<UserDo> getUserList(@PathVariable("pageIndex") int pageIndex,
                                    @PathVariable("pageIndex") int pageSize,
                                    @RequestBody Map<String, Object> param) {
        return userService.getUserList(pageIndex, pageSize, param);
    }

}
