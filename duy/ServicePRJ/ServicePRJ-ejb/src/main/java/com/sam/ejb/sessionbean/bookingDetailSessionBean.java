/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.bookingDetailEntity;
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
public class bookingDetailSessionBean implements bookingDetailSessionBeanLocal {
    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public List<bookingDetailEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("bd.findAll").getResultList(); 
    }

    @Override
    public bookingDetailEntity addBookingDetail(bookingDetailEntity service) {
        em = entityManagerFactory.createEntityManager();
        em.persist(service);
        return service;
    }

    @Override
    public bookingDetailEntity editBookingDetail(bookingDetailEntity service) {
         em = entityManagerFactory.createEntityManager();
        return em.merge(service);
    }

    @Override
    public void deleteBookingDetail(Long id) {
         em = entityManagerFactory.createEntityManager();
        em.remove(em.find(bookingDetailEntity.class, id));
    }

    @Override
    public bookingDetailEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(bookingDetailEntity.class, id);
    }

 
}
