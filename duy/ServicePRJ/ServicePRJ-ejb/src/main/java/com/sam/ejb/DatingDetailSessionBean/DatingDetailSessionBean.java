/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.DatingDetailSessionBean;

import com.sam.ejb.entity.DatingDetailEntity;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceUnit;

/**
 *
 * @author Dat Le
 */
@Stateless
public class DatingDetailSessionBean implements DatingDetailSessionBeanLocal {

    @PersistenceUnit(unitName = "ServiceDB")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager em;
    
    private final String logClass = "--Dating Detail SessionBean: ";
    
    @Override
    public List<DatingDetailEntity> listAll() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("-----Dating Detail Session Bean: listAll()-----");
        em = entityManagerFactory.createEntityManager();
        return em.createNamedQuery("dDetail.findAll").getResultList();
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public DatingDetailEntity addDatingDetail(DatingDetailEntity newDatingDetail) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " add Dating Detail");
        em = entityManagerFactory.createEntityManager();
        em.persist(newDatingDetail);
        return newDatingDetail;
    }

    @Override
    public List<DatingDetailEntity> getListDatingReceivedByPetID(Long petID) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " getListDatingReceivedByPetID: " + petID);
        em = entityManagerFactory.createEntityManager();
        List datingDetailList = em.createNamedQuery("dDetail.findByRecieved").setParameter("id", petID).getResultList();
        System.out.println(logClass + " return Dating List: " + datingDetailList.size());
        return datingDetailList;
    }

    @Override
    public DatingDetailEntity updateDatingDetail(DatingDetailEntity updatedDating) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " update Dating Detail: " + updatedDating.getDatingDetailID() + " from:" + updatedDating.getPetRequestEntity().getPetImage());
        em = entityManagerFactory.createEntityManager();
        return em.merge(updatedDating);
    }

    @Override
    public List<DatingDetailEntity> getListDatingRequestByPetID(Long petID) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + " getListDatingRequestByPetID: " + petID);
        em = entityManagerFactory.createEntityManager();
        List datingDetailList = em.createNamedQuery("dDetail.findByRequest").setParameter("id", petID).getResultList();
        
        
        List datingRequestList = null;
        try {
            datingRequestList = em.createNamedQuery("dDetail.findByRequest").setParameter("id", petID).getResultList();
        } catch (NoResultException nre) {
            //bug neu khong tim thay ket qua
        }
        
        if (datingRequestList != null){
            //neu danh sach tra ve khac null thi lay danh sach nay return ve
            System.out.println(logClass + " return Dating List: " + datingDetailList.size());
            return datingRequestList;
        
        }
        
        //neu danh sach tra ve bi loi thi se tao 1 empty list de return ve tranh bi loi
        datingRequestList = new ArrayList();
        return datingRequestList;
    }
}
