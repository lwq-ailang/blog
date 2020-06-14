package com.wu.service;


import com.wu.pojo.UserDo;

import java.util.List;
import java.util.Map;

public interface IUserService {

    public UserDo getUser(Long id);

    public UserDo getUser2(Long id);

    List<UserDo> getUserList(int pageIndex, int pageSize, Map<String, Object> param);
}
