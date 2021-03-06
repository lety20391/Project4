/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */

@Entity
@Table(name="tbBookingDetail")
@NamedQueries
        ({
            @NamedQuery(name="bd.findAll",query = "SELECT b FROM bookingDetailEntity b"),
            @NamedQuery(name="bd.getListBDofBM", query ="SELECT b FROM bookingDetailEntity b WHERE b.bookingMasterEntity.bookingID = :bookingID "),
            @NamedQuery(name="bd.getListByUser", query ="SELECT b FROM bookingDetailEntity b WHERE b.bookingMasterEntity.userEntity.userID = :userID ")   
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class bookingDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bDetailID;    
    @Column(name="bookingDate")
    private Date BookingDate;
    @Column(name="bdstatus")
    private boolean Status;
    @Column(name="message", columnDefinition = "VARCHAR(MAX)")
    private String Message;
       
    @ManyToOne
    @JoinColumn(name = "bookingID")
    private bookingMasterEntity bookingMasterEntity;

    @ManyToOne
    @JoinColumn(name = "serID")
    private serviceEntity serviceEntity;
    @ManyToOne
    @JoinColumn(name="petID")
    private PetEntity PetEntity;
    
    public bookingDetailEntity() {
    }

    public bookingDetailEntity(Date BookingDate, boolean Status, String Message, bookingMasterEntity bookingMasterEntity, serviceEntity serviceEntity, PetEntity PetEntity) {
        this.BookingDate = BookingDate;
        this.Status = Status;
        this.Message = Message;
        this.bookingMasterEntity = bookingMasterEntity;
        this.serviceEntity = serviceEntity;
        this.PetEntity = PetEntity;
    }

    public Long getbDetailID() {
        return bDetailID;
    }

    public void setbDetailID(Long bDetailID) {
        this.bDetailID = bDetailID;
    }

    public Date getBookingDate() {
        return BookingDate;
    }

    public void setBookingDate(Date BookingDate) {
        this.BookingDate = BookingDate;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String Message) {
        this.Message = Message;
    }

    public bookingMasterEntity getBookingMasterEntity() {
        return bookingMasterEntity;
    }

    public void setBookingMasterEntity(bookingMasterEntity bookingMasterEntity) {
        this.bookingMasterEntity = bookingMasterEntity;
    }

    public serviceEntity getServiceEntity() {
        return serviceEntity;
    }

    public void setServiceEntity(serviceEntity serviceEntity) {
        this.serviceEntity = serviceEntity;
    }

    public PetEntity getPetEntity() {
        return PetEntity;
    }

    public void setPetEntity(PetEntity PetEntity) {
        this.PetEntity = PetEntity;
    }
    
}
