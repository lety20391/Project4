/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.PetSessionBean;

import com.sam.ejb.entity.PetEntity;
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
public class PetManageSessionBean implements PetManageSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    private final String logClass = "--Pet Manage SessionBean: ";
    
    @Override
    public List<PetEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("----Pet Manage Session Bean: listAll()------");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pet.findAll").getResultList();
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public PetEntity addNew(PetEntity newPet) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("----Pet Manage Session Bean: addNew()------");
        em = entityManagerFactory.createEntityManager();
        em.persist(newPet);
        return newPet;
    }

    @Override
    public PetEntity findOne(Long id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " findOne: " + id);
        em = entityManagerFactory.createEntityManager();
        return em.find(PetEntity.class, id);
    }

    @Override
    public PetEntity editPet(PetEntity updatedPet) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " editPet: " + updatedPet.getPetID());
        em = entityManagerFactory.createEntityManager();
        return em.merge(updatedPet);
    }

    @Override
    public void deletePet(Long id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        em = entityManagerFactory.createEntityManager();
        em.remove(em.find(PetEntity.class, id));
    }
}
