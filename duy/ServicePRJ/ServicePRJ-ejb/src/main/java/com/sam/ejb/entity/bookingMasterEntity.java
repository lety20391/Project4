/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
            @NamedQuery(name="bm.findAll",query = "SELECT m FROM bookingMasterEntity m"),
            @NamedQuery(name="bm.getListBMOfUser", query ="SELECT m FROM bookingMasterEntity m WHERE m.userEntity.userID = :userID ")
//                @NamedQuery(name="pet.getListPetOfUser", query ="SELECT p FROM PetEntity p WHERE p.userEntity.userID = :userID ")

//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class bookingMasterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookingID;
    @Column(name="creDate")
    private Date CreDate;
    @Column(name="bmStatus")
    private boolean Status;

    @ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "bookingMasterEntity", fetch = FetchType.EAGER)
    private List<bookingDetailEntity> bookingdetails;

    public bookingMasterEntity() {
    }

    public bookingMasterEntity(Date CreDate, boolean Status, UserEntity userEntity, List<bookingDetailEntity> bookingdetails) {
        this.CreDate = CreDate;
        this.Status = Status;
        this.userEntity = userEntity;
        this.bookingdetails = bookingdetails;
    }

    public Long getBookingID() {
        return bookingID;
    }

    public void setBookingID(Long bookingID) {
        this.bookingID = bookingID;
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

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

//    public List<bookingDetailEntity> getBookingdetails() {
//        return bookingdetails;
//    }

    public void setBookingdetails(List<bookingDetailEntity> bookingdetails) {
        this.bookingdetails = bookingdetails;
    }







}
