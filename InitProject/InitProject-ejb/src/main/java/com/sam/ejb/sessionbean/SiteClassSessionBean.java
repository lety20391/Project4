/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.SiteClass;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

/**
 *
 * @author Dat ThinkPad
 */
@Stateless
public class SiteClassSessionBean implements SiteClassSessionBeanLocal {

    
    @PersistenceUnit(unitName="InitProjectPU")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public List findAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("SiteClass.findAll").getResultList();
        
    }

    @Override
    public SiteClass findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(SiteClass.class, id);
    }

    @Override
    public SiteClass addSiteClass(SiteClass site) {
        em = entityManagerFactory.createEntityManager();
        em.persist(site);
        return site;
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
