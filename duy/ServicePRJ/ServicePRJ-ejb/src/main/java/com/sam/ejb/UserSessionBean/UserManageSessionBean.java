/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.UserSessionBean;

import com.sam.ejb.entity.userEntity;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 *
 * @author Dat Le
 */
@Stateless
public class UserManageSessionBean implements UserManageSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;

    @Override
    public userEntity addUser(userEntity newUser) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        em.persist(newUser);
        return newUser;
    }

    @Override
    public userEntity getUserByPhone(String userPhone) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return (userEntity) em.createNamedQuery("u.searchByPhone").setParameter("str", userPhone).getSingleResult();
    }

    @Override
    public boolean setCodeByPhone(String userPhone, String userCode) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
    }
    
    
}
