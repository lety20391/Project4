/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */
@Entity
@Table(name="tbBookingMaster")
@NamedQueries
        ({
            @NamedQuery(name="bm.findAll",query = "SELECT m FROM bookingMasterEntity m")
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class bookingMasterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long BookingID;
    @Column(name="CreDate")
    private Date CreDate;
    @Column(name="Status")
    private boolean Status;

    @ManyToOne
    @JoinColumn(name = "User_ID")
    private userEntity userEntity;

    @OneToMany(mappedBy = "bookingMasterEntity", fetch = FetchType.EAGER)
    private List<bookingDetailEntity> bookingdetails;

    public bookingMasterEntity() {
    }

    public bookingMasterEntity(Long BookingID, Date CreDate, boolean Status, List<bookingDetailEntity> bookingdetails) {
        this.BookingID = BookingID;
        this.CreDate = CreDate;
        this.Status = Status;
        this.bookingdetails = bookingdetails;
    }

    public Long getBookingID() {
        return BookingID;
    }

    public void setBookingID(Long BookingID) {
        this.BookingID = BookingID;
    }

    public Date getCreDate() {
        return CreDate;
    }

    public void setCreDate(Date CreDate) {
        this.CreDate = CreDate;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

//    public userEntity getUserEntity() {
//        return userEntity;
//    }

    public void setUserEntity(userEntity userEntity) {
        this.userEntity = userEntity;
    }

    public List<bookingDetailEntity> getBookingdetails() {
        return bookingdetails;
    }

    public void setBookingdetails(List<bookingDetailEntity> bookingdetails) {
        this.bookingdetails = bookingdetails;
    }






}
