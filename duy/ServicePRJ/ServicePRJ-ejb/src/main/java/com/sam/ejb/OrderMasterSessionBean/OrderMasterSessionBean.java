/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.OrderMasterSessionBean;

import com.sam.ejb.entity.OrderMasterEntity;
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
public class OrderMasterSessionBean implements OrderMasterSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;

    @Override
    public List<OrderMasterEntity> listAll() {
        System.out.println("------BMaster Bean----");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("om.findAll").getResultList();
    }

    @Override
    public OrderMasterEntity addOrderMaster(OrderMasterEntity orderMaster) {
        em = entityManagerFactory.createEntityManager();
        em.persist(orderMaster);
        return orderMaster;
    }

    @Override
    public OrderMasterEntity editOrderMaster(OrderMasterEntity orderMaster) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(orderMaster);
    }

    @Override
    public void deleteOrderMaster(Long id) {
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(OrderMasterEntity.class, id));
    }

    @Override
    public OrderMasterEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(OrderMasterEntity.class, id);
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
