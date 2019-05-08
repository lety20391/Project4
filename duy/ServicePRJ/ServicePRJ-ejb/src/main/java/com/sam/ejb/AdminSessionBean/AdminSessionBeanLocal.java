/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.AdminSessionBean;

import com.sam.ejb.entity.adminEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface AdminSessionBeanLocal {
    public List<adminEntity> listAll();
    public adminEntity addAdmin(adminEntity admin);
    public adminEntity editAdmin(adminEntity admin);
    public void deleteAdmin(Long id);
    public adminEntity findOne(Long id);
}
