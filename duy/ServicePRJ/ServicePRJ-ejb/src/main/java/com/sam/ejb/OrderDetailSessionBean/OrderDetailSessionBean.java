/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.OrderDetailSessionBean;

import com.sam.ejb.entity.OrderDetailEntity;
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
public class OrderDetailSessionBean implements OrderDetailSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    private final String logClass = "--Order Detail:";
    
    @Override
    public List<OrderDetailEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("od.findAll").getResultList();
    }

    @Override
    public OrderDetailEntity addOrderDetail(OrderDetailEntity orderDetail) {
        em = entityManagerFactory.createEntityManager();
        em.persist(orderDetail);
        return orderDetail;
    }

    @Override
    public OrderDetailEntity editOrderDetail(OrderDetailEntity orderDetail) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(orderDetail);
    }

    @Override
    public void deleteOrderDetail(Long id) {
em = entityManagerFactory.createEntityManager();
        em.remove(em.find(OrderDetailEntity.class, id));    }

    @Override
    public OrderDetailEntity findOne(Long id) {
         em = entityManagerFactory.createEntityManager();
        return em.find(OrderDetailEntity.class, id);
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public List<OrderDetailEntity> listTop() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("od.sort").getResultList();
    }

    @Override
    public List<Object> getTotalQtyGroupByProduct() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " getTotalQtyGroupByProduct");
        em = entityManagerFactory.createEntityManager();
        List<Object> result = em.createNamedQuery("od.getTotalQtyGroupByProduct").getResultList();
        System.out.println(logClass + result.toString());
        System.out.println(logClass + " size:" + result.size());
        return result;
    }
}
