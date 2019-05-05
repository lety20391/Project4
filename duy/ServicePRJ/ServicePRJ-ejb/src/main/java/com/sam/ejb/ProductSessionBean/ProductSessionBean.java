/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.ProductSessionBean;

import com.sam.ejb.entity.productEntity;
import com.sam.ejb.entity.serviceEntity;
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
public class ProductSessionBean implements ProductSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;

    @Override
    public List<productEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pro.findAll").getResultList();
    }

    @Override
    public productEntity addProduct(productEntity product) {        
        em = entityManagerFactory.createEntityManager();
        em.persist(product);
        return product;
    }

    @Override
    public productEntity editProduct(productEntity product) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(product);
    }

    @Override
    public void deleteProduct(Long id) {
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(productEntity.class, id));
    }

    @Override
    public productEntity findOne(Long id) {
        System.out.println("--EJB: Product Sessionbean: findOne()--");
        em = entityManagerFactory.createEntityManager();
        return em.find(productEntity.class, id);
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
