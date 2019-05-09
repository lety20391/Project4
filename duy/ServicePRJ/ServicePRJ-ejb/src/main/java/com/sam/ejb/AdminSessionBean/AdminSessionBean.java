/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.AdminSessionBean;

import com.sam.ejb.entity.AdminEntity;
import com.sam.ejb.entity.UserEntity;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 *
 * @author DuDu
 */
@Stateless
public class AdminSessionBean implements AdminSessionBeanLocal {
    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    private final String logClass= "--AdminSessionBean: ";
    
    @Override
    public List<AdminEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("a.findAll").getResultList();
    }

    @Override
    public AdminEntity addAdmin(AdminEntity admin) {
        em = entityManagerFactory.createEntityManager();
        em.persist(admin);
        return admin;
    }

    @Override
    public AdminEntity editAdmin(AdminEntity admin) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(admin);
    }

    @Override
    public void deleteAdmin(Long id) {
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(AdminEntity.class, id));
    }

    @Override
    public AdminEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(AdminEntity.class, id);
    }
    
    @Override
    public AdminEntity getAdminByPhone(String userPhone) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " getUserByPhone");
        em = entityManagerFactory.createEntityManager();
        return (AdminEntity) em.createNamedQuery("a.searchByPhone").setParameter("str", userPhone).getSingleResult();
    }
    
    @Override
    public int setCodeByPhone(String userPhone, String userCode) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " setCodeByePhone");
        System.out.println(logClass + " phone:" + userPhone);
        System.out.println(logClass + " userCode:" + userCode);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("a.setCodeByPhone").setParameter("code", userCode).setParameter("phone", userPhone).getFirstResult();
       
    }
    
    @Override
    public AdminEntity updateAdmin(AdminEntity updatedAdmin) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " UpdateAdim: " + updatedAdmin.getUsername());
        em = entityManagerFactory.createEntityManager();
        return em.merge(updatedAdmin);
    }
    

}
