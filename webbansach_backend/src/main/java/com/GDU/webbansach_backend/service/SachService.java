package com.GDU.webbansach_backend.service;

import com.GDU.webbansach_backend.entity.Sach;
import com.GDU.webbansach_backend.dao.SachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SachService {

    @Autowired
    private SachRepository sachRepository;

    public Sach laySachTheoMaSach(int maSach) {
        return sachRepository.findById(maSach).orElse(null);
    }

    @Transactional
    public Sach capNhatSach(Sach sach) {
        return sachRepository.save(sach);
    }
} 