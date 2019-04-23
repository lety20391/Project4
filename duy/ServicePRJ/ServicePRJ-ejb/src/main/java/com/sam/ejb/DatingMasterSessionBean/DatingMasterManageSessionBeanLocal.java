/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.DatingMasterSessionBean;

import com.sam.ejb.entity.DatingMasterEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface DatingMasterManageSessionBeanLocal {
    public List<DatingMasterEntity> listAll();
}
