package com.wu.service;


import com.wu.pojo.UserDo;

import javax.servlet.http.HttpServletRequest;

public interface IPayService {

    public void pay(UserDo userDo);

    public void pay2();
}
