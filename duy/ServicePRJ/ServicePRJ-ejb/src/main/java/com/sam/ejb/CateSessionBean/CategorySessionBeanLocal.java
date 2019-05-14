/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.CateSessionBean;

import com.sam.ejb.entity.cateEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface CategorySessionBeanLocal {
    public List<cateEntity> listAll();
    public cateEntity addCate(cateEntity newCate);
    public cateEntity editCate(cateEntity updatedCate);
    public void deleteCate(Long id);
    public cateEntity findOne(Long id);
}
