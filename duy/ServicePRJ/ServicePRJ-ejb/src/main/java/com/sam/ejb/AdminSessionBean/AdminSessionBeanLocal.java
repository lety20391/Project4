/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.AdminSessionBean;

import com.sam.ejb.entity.AdminEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface AdminSessionBeanLocal {
    public List<AdminEntity> listAll();
    public AdminEntity addAdmin(AdminEntity admin);
    public AdminEntity editAdmin(AdminEntity admin);
    public void deleteAdmin(Long id);
    public AdminEntity findOne(Long id);
    public AdminEntity getAdminByPhone(String adminPhone);
    public int setCodeByPhone(String adminPhone, String adminCode);
    public AdminEntity updateAdmin(AdminEntity updatedAdmin);
}
