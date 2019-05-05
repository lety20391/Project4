/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.UserSessionBean;

import com.sam.ejb.entity.userEntity;
import java.util.List;
import java.util.logging.Logger;
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
    public String addUser(userEntity newUser) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        String msgStatus = "";
        try{
            em.persist(newUser);
        }catch(javax.persistence.PersistenceException ex){
            msgStatus = "-EXCEPTION CLASS NAME: " + ex.getClass().getName().toString();
            System.out.println(msgStatus);
            
            msgStatus += "-THROWABLE CLASS NAME: " + ex.getCause().getClass().getName().toString();
            System.out.println(msgStatus);
            
            Throwable th = ex.getCause();
            msgStatus += "-THROWABLE INFO: " + th.getCause().toString();
            System.out.println(msgStatus);
            
            
        }
        return msgStatus;
    }

    @Override
    public userEntity getUserByPhone(String userPhone) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return (userEntity) em.createNamedQuery("u.searchByPhone").setParameter("str", userPhone).getSingleResult();
    }

    public int setCodeByPhone(String userPhone, String userCode) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("u.setCodeByPhone").setParameter("code", userCode).setParameter("phone", userPhone).getFirstResult();
       
    }

    @Override
    public List<userEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("u.findAll").getResultList();
    }
    
    
}