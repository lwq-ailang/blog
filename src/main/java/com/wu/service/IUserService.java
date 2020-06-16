package com.wu.service;


import com.wu.pojo.UserDo;

import java.util.List;
import java.util.Map;

public interface IUserService {

    UserDo selectById(Long id);

    UserDo getUser2(Long id);

    List<UserDo> getUserList(int pageIndex, int pageSize, Map<String, Object> param);

    List<UserDo> selectByIds(String ids);

    List<UserDo> selectByIds(Map<String, Object> param);

    List<UserDo> selectByWrapper(Map<String, Object> param);

    List<Map<String, Object>> selectMaps(Map<String, Object> param);
}
