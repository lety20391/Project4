/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.UserSessionBean;

import com.sam.ejb.entity.userEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface UserManageSessionBeanLocal {
    public List<userEntity> listAll();
    public String addUser(userEntity newUser);
    public userEntity getUserByPhone(String userPhone);
    public int setCodeByPhone(String userPhone, String userCode);
}
