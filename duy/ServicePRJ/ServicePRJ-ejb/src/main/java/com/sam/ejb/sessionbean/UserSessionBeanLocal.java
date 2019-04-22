/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.userEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface UserSessionBeanLocal {
     public List<userEntity> listAll();
    public userEntity addUser(userEntity user);
    public userEntity editUser(userEntity user);
    public void deleteUser(Long id);
    public userEntity findOne(Long id);
}
