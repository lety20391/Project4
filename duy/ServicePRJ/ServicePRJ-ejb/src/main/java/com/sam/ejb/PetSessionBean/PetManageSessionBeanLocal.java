/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.PetSessionBean;

import com.sam.ejb.entity.PetEntity;
import com.sam.ejb.entity.productEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface PetManageSessionBeanLocal {
    public List<PetEntity> listAll();
    public PetEntity addNew(PetEntity newPet);
    public PetEntity findOne(Long id);
    public PetEntity editPet(PetEntity updatedPet);
    public void deletePet(Long id);
}
