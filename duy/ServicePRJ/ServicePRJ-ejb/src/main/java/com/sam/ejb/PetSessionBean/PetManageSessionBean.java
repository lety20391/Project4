/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.PetSessionBean;

import com.sam.ejb.entity.PetEntity;
import com.sam.ejb.entity.productEntity;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.TemporalType;

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

    @Override
    public List<PetEntity> listPetOfUser(Long userID) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " list Pet of User: " + userID);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pet.getListPetOfUser").setParameter("userID", userID).getResultList();
        
    }

    @Override
    public List<PetEntity> listPetExceptUser(Long userID) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " list Pet Except User: " + userID);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pet.getAllPetExceptOneUser").setParameter("userID", userID).getResultList();
    }

    @Override
    public List<PetEntity> searchPetNameAndBreed(String strSearch) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " search Pet Name and Breed: " + strSearch);
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pet.searchNameAndBreed").setParameter("str", "%" + strSearch + "%").getResultList();
    }

    @Override
    public List<PetEntity> filterByPetDOB(Date startDate, Date endDate) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " filter Pet Age: " + startDate.toString() + " - " + endDate.toString());
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("pet.filterPetByAge")
                .setParameter("startDate", startDate, TemporalType.DATE)
                .setParameter("endDate", endDate, TemporalType.DATE)
                .getResultList();
    }
}
