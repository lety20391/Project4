/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.serviceEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface ServiceSessionBeanLocal {
    public List<serviceEntity> listAll();
    public serviceEntity addService(serviceEntity service);
    public serviceEntity editService(serviceEntity service);
    public void deleteService(Long id);
    public serviceEntity findOne(Long id);
}
