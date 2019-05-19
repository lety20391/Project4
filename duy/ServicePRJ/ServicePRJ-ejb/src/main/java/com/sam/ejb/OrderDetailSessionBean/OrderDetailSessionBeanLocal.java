/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.OrderDetailSessionBean;

import com.sam.ejb.entity.OrderDetailEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface OrderDetailSessionBeanLocal {
    public List<OrderDetailEntity> listAll();
    public OrderDetailEntity addOrderDetail(OrderDetailEntity orderDetail);
    public OrderDetailEntity editOrderDetail(OrderDetailEntity orderDetail);
    public void deleteOrderDetail(Long id);
    public OrderDetailEntity findOne(Long id);
    public List <OrderDetailEntity> listTop();
    public List<Object> getTotalQtyGroupByProduct();
}
