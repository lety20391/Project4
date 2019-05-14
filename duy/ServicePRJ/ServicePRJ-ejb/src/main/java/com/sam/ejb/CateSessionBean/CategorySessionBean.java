/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.CateSessionBean;

import com.sam.ejb.entity.cateEntity;
import com.sam.ejb.entity.productEntity;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 *
 * @author Dat Le
 */
@Stateless
public class CategorySessionBean implements CategorySessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;

    @Override
    public List<cateEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("cate.findAll").getResultList();
    }

    @Override
    public cateEntity addCate(cateEntity newCate) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        em.persist(newCate);
        return newCate;
    }

    @Override
    public cateEntity editCate(cateEntity updatedCate) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.merge(updatedCate);
    }

    @Override
    public void deleteCate(Long id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(cateEntity.class, id));
    }

    @Override
    public cateEntity findOne(Long id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("--EJB: Product Sessionbean: findOne()--");
        em = entityManagerFactory.createEntityManager();
        return em.find(cateEntity.class, id);
    }

   
}
