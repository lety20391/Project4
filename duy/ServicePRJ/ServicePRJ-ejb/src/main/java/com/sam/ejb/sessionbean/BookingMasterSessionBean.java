/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.bookingMasterEntity;
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
public class BookingMasterSessionBean implements BookingMasterSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public List<bookingMasterEntity> listAll() {
        System.out.println("------BMaster Bean----");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("bm.findAll").getResultList(); 
    }

    @Override
    public bookingMasterEntity addbookingMaster(bookingMasterEntity service) {
        em = entityManagerFactory.createEntityManager();
        em.persist(service);
        return service;
    }

    @Override
    public bookingMasterEntity editbookingMaster(bookingMasterEntity service) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(service);
    }

    @Override
    public void deletebookingMaster(Long id) {
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(bookingMasterEntity.class, id));
    }

    @Override
    public bookingMasterEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(bookingMasterEntity.class, id);
    }

    @Override
    public List<bookingMasterEntity> listBMOfUser(Long userID) {
//         System.out.println(logClass + " list Pet of User: " + userID);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("bm.getListBMOfUser").setParameter("userID", userID).getResultList();
    }
    
}
