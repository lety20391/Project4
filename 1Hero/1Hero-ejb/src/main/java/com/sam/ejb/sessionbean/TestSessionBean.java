/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.HeroEntity;
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
public class TestSessionBean implements TestSessionBeanLocal {

    @PersistenceUnit(unitName = "HeroDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public void test() {
        
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public List<HeroEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("Hero.findAll").getResultList();
    }
}
