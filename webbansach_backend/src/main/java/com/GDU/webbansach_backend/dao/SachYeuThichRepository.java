package com.GDU.webbansach_backend.dao;

import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.Sach;
import com.GDU.webbansach_backend.entity.SachYeuThich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource(path = "sach-yeu-thich")
public interface SachYeuThichRepository extends JpaRepository<SachYeuThich, Integer> {
    List<SachYeuThich> findByNguoiDung(NguoiDung nguoiDung);
    boolean existsByNguoiDungAndSach(NguoiDung nguoiDung, Sach sach);
    void deleteByNguoiDungAndSach(NguoiDung nguoiDung, Sach sach);
}
