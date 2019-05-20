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

    @Override
    public List<productEntity> listByCate(Long cateID) {
             em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pro.findByCategory").setParameter("str", cateID).getResultList();
    }

    @Override
    public List<productEntity> searchProductByName(String strSearch) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("--EJB: Product Sessionbean: searchProductByName()--");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pro.findByName").setParameter("str", "%" + strSearch + "%").getResultList();
    }

    @Override
    public List<productEntity> filterProductByPrice(int fromPrice, int toPrice) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("--EJB: Product Sessionbean: filterProductByPrice(): " + fromPrice + " - " + toPrice);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pro.filterProductByPrice")
                .setParameter("fromPrice", fromPrice)
                .setParameter("toPrice", toPrice)
                .getResultList();
    }

    @Override
    public List<Object> findMinMaxPrice() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("--EJB: Product Sessionbean: find Min Max Price(): ");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pro.findMinMaxPrice").getResultList();
    }

 
}
