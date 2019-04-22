/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.userEntity;
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
public class UserSessionBean implements UserSessionBeanLocal {
    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    @Override
    public List<userEntity> listAll() {
          em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("u.findAll").getResultList(); 
    }

    @Override
    public userEntity addUser(userEntity user) {
          em = entityManagerFactory.createEntityManager();
        em.persist(user);
        return user;
    }

    @Override
    public userEntity editUser(userEntity user) {
        em = entityManagerFactory.createEntityManager();
        return em.merge(user);
    }

    @Override
    public void deleteUser(Long id) {
       em = entityManagerFactory.createEntityManager();
        em.remove(em.find(userEntity.class, id));
    }

    @Override
    public userEntity findOne(Long id) {
       em = entityManagerFactory.createEntityManager();
        return em.find(userEntity.class, id);
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
