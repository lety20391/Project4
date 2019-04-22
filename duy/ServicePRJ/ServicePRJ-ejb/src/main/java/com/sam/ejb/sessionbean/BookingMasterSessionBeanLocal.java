/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.bookingMasterEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface BookingMasterSessionBeanLocal {
    public List<bookingMasterEntity> listAll();
    public bookingMasterEntity addbookingMaster(bookingMasterEntity service);
    public bookingMasterEntity editbookingMaster(bookingMasterEntity service);
    public void deletebookingMaster(Long id);
    public bookingMasterEntity findOne(Long id);
}
