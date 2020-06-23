package com.wu.service;

import com.wu.core.threadlocal.UserDoThreadLocalUtils;
import com.wu.pojo.UserDo;
import com.wu.core.threadlocal.HttpRequestThreadLocalUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Log4j2
public class PayServiceImpl implements IPayService {

    @Override
    public void pay(UserDo userDo) {
        //1：肯定要获取用户信息，来记录是谁支付的
        System.out.println(userDo);
    }

    @Override
    public void pay2() {
        //1：肯定要获取用户信息，来记录是谁支付的
        UserDo userDo = UserDoThreadLocalUtils.get();
        HttpServletRequest httpServletRequest = HttpRequestThreadLocalUtils.get();
        System.out.println(userDo);
        System.out.println(httpServletRequest);
    }
}
