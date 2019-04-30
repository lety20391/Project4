/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.OrderMasterSessionBean;

import com.sam.ejb.entity.OrderMasterEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface OrderMasterSessionBeanLocal {
     public List<OrderMasterEntity> listAll();
    public OrderMasterEntity addOrderMaster(OrderMasterEntity orderMaster);
    public OrderMasterEntity editOrderMaster(OrderMasterEntity orderMaster);
    public void deleteOrderMaster(Long id);
    public OrderMasterEntity findOne(Long id);
}
