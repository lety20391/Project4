/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.AdminSessionBean;

import com.sam.ejb.entity.adminEntity;
import com.sam.ejb.entity.userEntity;
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
    @Override
    public List<adminEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("a.findAll").getResultList();
    }

    @Override
    public adminEntity addAdmin(adminEntity admin) {
        em = entityManagerFactory.createEntityManager();
        em.persist(admin);
        return admin;
    }

    @Override
    public adminEntity editAdmin(adminEntity admin) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(admin);
    }

    @Override
    public void deleteAdmin(Long id) {
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(adminEntity.class, id));
    }

    @Override
    public adminEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(adminEntity.class, id);
    }

}
