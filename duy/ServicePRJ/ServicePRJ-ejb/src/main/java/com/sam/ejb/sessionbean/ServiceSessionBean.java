/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

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
public class ServiceSessionBean implements ServiceSessionBeanLocal {
    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public List<serviceEntity> listAll() {
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("ser.findAll").getResultList(); 
    }

    @Override
    public serviceEntity addService(serviceEntity service) {
        em = entityManagerFactory.createEntityManager();
        em.persist(service);
        return service;
    }

    @Override
    public serviceEntity editService(serviceEntity service) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(service);
    }

    @Override
    public void deleteService(Long id) {
      em = entityManagerFactory.createEntityManager();
        em.remove(em.find(serviceEntity.class, id));
    }

    @Override
    public serviceEntity findOne(Long id) {
        em = entityManagerFactory.createEntityManager();
        return em.find(serviceEntity.class, id); //To change body of generated methods, choose Tools | Templates.
    }


}
