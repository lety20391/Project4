/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.UserSessionBean;

import com.sam.ejb.entity.UserEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface UserManageSessionBeanLocal {
    public List<UserEntity> listAll();
    public String addUser(UserEntity newUser);
    public UserEntity getUserByPhone(String userPhone);
    public int setCodeByPhone(String userPhone, String userCode);
    public UserEntity updateUser(UserEntity updatedUser);
}
