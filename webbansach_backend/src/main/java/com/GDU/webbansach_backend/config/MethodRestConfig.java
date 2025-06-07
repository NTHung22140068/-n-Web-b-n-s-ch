package com.GDU.webbansach_backend.config;

import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.TheLoai;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MethodRestConfig implements RepositoryRestConfigurer {
    private String url = "http://localhost:3000";

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        HttpMethod[] chanCacPhuongThuc = {
//                HttpMethod.POST,
//                HttpMethod.PUT,
//                HttpMethod.DELETE,
//                HttpMethod.PATCH
//        };

        // cho phep id trong khi tra ve json
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));

        // chỉ cho cái được chọn mới lấy ra được ID
//        config.exposeIdsFor(TheLoai.class);

        // CORS configuration
        cors.addMapping("/**").allowedOrigins(url).allowedMethods("GET", "POST", "PUT", "DELETE");

//        disiableHttpMethods(TheLoai.class, config, chanCacPhuongThuc);
//
//        // chan phuong thuc xoa nguoi dung
//        HttpMethod[] chanPhuongThucdelete = {
//                HttpMethod.DELETE
//        };
//        disiableHttpMethods(NguoiDung.class, config, chanPhuongThucdelete);
    }

    private void disiableHttpMethods(Class c, RepositoryRestConfiguration config, HttpMethod[] methods) {
        config.getExposureConfiguration()
                .forDomainType(c)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(methods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(methods));
    }
}
