//package com.zevrant.services.zevranthomeui.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.core.io.Resource;
//import org.springframework.http.MediaType;
//import org.springframework.web.reactive.function.server.RouterFunction;
//import org.springframework.web.reactive.function.server.RouterFunctions;
//import org.springframework.web.reactive.function.server.ServerResponse;
//
//import java.io.BufferedReader;
//import java.io.BufferedWriter;
//import java.io.FileReader;
//import java.util.stream.Collectors;
//
//import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
//import static org.springframework.web.reactive.function.server.RouterFunctions.route;
//import static org.springframework.web.reactive.function.server.ServerResponse.ok;
//
//@Configuration
//public class StaticContentConfig {
//
//    @Bean
//    public RouterFunction<ServerResponse> htmlRouter(@Value("classpath:/static/index.html") Resource html) throws Exception {
//        String htmlString = new BufferedReader(new FileReader(html.getFile())).lines().collect(Collectors.joining());
//        return route(
//                GET("/"),
//                request -> ok()
//                        .contentType(MediaType.TEXT_HTML).bodyValue(htmlString)
//        );
//    }
//
//    @Bean
//    public RouterFunction<ServerResponse> mainES5Router() {
//
//        Resource javascriptResource = new ClassPathResource("static/main-es5.js");
//        return route(
//                GET("/main-es5.js"),
//                request -> ok()
//                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
//        );
//    }
//
//    @Bean
//    public RouterFunction<ServerResponse> mainES2015Router() {
//
//        Resource javascriptResource = new ClassPathResource("static/main-es2015.js");
//        return route(
//                GET("/main-es2015.js"),
//                request -> ok()
//                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
//        );
//    }
//
//    @Bean
//    public RouterFunction<ServerResponse> polyfillsES5Router() {
//
//        Resource javascriptResource = new ClassPathResource("static/pollyfills-es5.js");
//        return route(
//                GET("/main-es5.js"),
//                request -> ok()
//                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
//        );
//    }
//
//    @Bean
//    public RouterFunction<ServerResponse> pollyfillsES2015Router() {
//
//        Resource javascriptResource = new ClassPathResource("static/pollyfills-es2015.js");
//        return route(
//                GET("/main-es5.js"),
//                request -> ok()
//                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
//        );
//    }
//
////    @Bean
////    public RouterFunction<ServerResponse> mainES5Router() {
////
////        Resource javascriptResource = new ClassPathResource("static/main-es5.js");
////        return route(
////                GET("/main-es5.js"),
////                request -> ok()
////                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
////        );
////    }
////
////    @Bean
////    public RouterFunction<ServerResponse> mainES5Router() {
////
////        Resource javascriptResource = new ClassPathResource("static/main-es5.js");
////        return route(
////                GET("/main-es5.js"),
////                request -> ok()
////                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
////        );
////    }
////
////    @Bean
////    public RouterFunction<ServerResponse> mainES5Router() {
////
////        Resource javascriptResource = new ClassPathResource("static/main-es5.js");
////        return route(
////                GET("/main-es5.js"),
////                request -> ok()
////                        .contentType(MediaType.TEXT_HTML).bodyValue(javascriptResource)
////        );
////    }
//
//}
