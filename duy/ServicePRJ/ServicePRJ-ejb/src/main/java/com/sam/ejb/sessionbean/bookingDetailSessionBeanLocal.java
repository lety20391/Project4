/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.bookingDetailEntity;
import com.sam.ejb.entity.serviceEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface bookingDetailSessionBeanLocal {
    public List<bookingDetailEntity> listAll();
    public bookingDetailEntity addBookingDetail(bookingDetailEntity service);
    public bookingDetailEntity editBookingDetail(bookingDetailEntity service);
    public void deleteBookingDetail(Long id);
    public bookingDetailEntity findOne(Long id);
        public List<bookingDetailEntity> listBMofBD(Long userID);
}
