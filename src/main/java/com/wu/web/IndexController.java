package com.wu.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class IndexController {

    @GetMapping("/hello")
    public String index() {
        return "hello SpringBoot!";
    }

    @GetMapping("/test")
    public String test() {
        return "hello 疯童鞋!!!";
    }

}
