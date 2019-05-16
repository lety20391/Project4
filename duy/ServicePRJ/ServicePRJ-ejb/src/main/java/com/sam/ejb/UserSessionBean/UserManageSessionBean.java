/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.UserSessionBean;

import com.sam.ejb.entity.UserEntity;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
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

    private String logClass = "--UserManageSessionBean: ";

    @Override
    public UserEntity addUser(UserEntity newUser) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        em.persist(newUser);
        return newUser;
    }

    @Override
    public UserEntity getUserByPhone(String userPhone) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " getUserByPhone");
        em = entityManagerFactory.createEntityManager();
        UserEntity searchUser = null;
        try {
            searchUser = (UserEntity) em.createNamedQuery("u.searchByPhone").setParameter("str", userPhone).getSingleResult();
        } catch (NoResultException nre) {
            //bug neu khong tim thay ket qua
        }

        if (searchUser != null) {
            return searchUser;
        }
        searchUser = new UserEntity();
        searchUser.setUserTel("0000000000");
        return searchUser;
    }

    public int setCodeByPhone(String userPhone, String userCode) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " setCodeByePhone");
        System.out.println(logClass + " phone:" + userPhone);
        System.out.println(logClass + " userCode:" + userCode);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("u.setCodeByPhone").setParameter("code", userCode).setParameter("phone", userPhone).getFirstResult();

    }

    @Override
    public List<UserEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("u.findAll").getResultList();
    }

//    @Override
//    public Boolean checkLogin(String userPhone, String userCode) {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }
    @Override
    public UserEntity updateUser(UserEntity updatedUser) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " UpdateUser: " + updatedUser.getUserName());
        em = entityManagerFactory.createEntityManager();
        return em.merge(updatedUser);
    }

    @Override
    public UserEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(UserEntity.class, id); //To change body of generated methods, choose Tools | Templates.
    }

}
