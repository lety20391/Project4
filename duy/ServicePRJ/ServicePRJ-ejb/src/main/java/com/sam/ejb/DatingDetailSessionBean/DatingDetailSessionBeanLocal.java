/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.DatingDetailSessionBean;

import com.sam.ejb.entity.DatingDetailEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface DatingDetailSessionBeanLocal {
    public List<DatingDetailEntity> listAll();
    public DatingDetailEntity addDatingDetail(DatingDetailEntity newDatingDetail);
}
