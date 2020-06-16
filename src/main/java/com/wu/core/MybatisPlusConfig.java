package com.wu.core;

import com.baomidou.mybatisplus.core.injector.ISqlInjector;
import com.baomidou.mybatisplus.extension.plugins.OptimisticLockerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.aop.interceptor.PerformanceMonitorInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
// 4：springboot整合myabtis
@MapperScan("com.wu.dao")
public class MybatisPlusConfig {

    //开启mybatis-plus分页功能
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        // paginationInterceptor.setOverflow(false);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
        // paginationInterceptor.setLimit(500);
        return paginationInterceptor;
    }


    /**
     * 乐观锁插件
     *
     * @return
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }

    /**
     * sql性能分析插件，输出sql语句及所需时间
     * @return
     */
    @Bean
    @Profile({"dev", "test"})// 设置 dev test 环境开启
    public PerformanceMonitorInterceptor performanceMonitorInterceptor() {
        PerformanceMonitorInterceptor performanceMonitorInterceptor = new PerformanceMonitorInterceptor();
        return performanceMonitorInterceptor;
    }

    /**
     * sql注入器  逻辑删除插件
     * @return
     */
//    @Bean
//    public ISqlInjector iSqlInjector(){
//        return new LogicSqlInjector();
//    }
}