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
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */
@Entity
@Table(name="tbUser")
@NamedQueries
        ({
            @NamedQuery(name="u.findAll",query = "SELECT u FROM userEntity u")
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class userEntity {
     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long UserID;
    @Column(name="UserName")
    private String UserName;
    @Column(name="UserTel")
    private String UserTel;
    @Column(name="UserMail")
    private String UserMail;
    @Column(name="DOB")
    private Date DOB;
    @Column(name="UserStatus")
    private boolean UserStatus;


    @OneToMany(mappedBy = "userEntity", fetch = FetchType.EAGER)
    private List<bookingMasterEntity> listBookingmasters;


    public userEntity() {
    }

    public userEntity( String UserName, String UserTel, String UserMail, Date DOB, boolean UserStatus, List<bookingMasterEntity> listBookingmasters) {

        this.UserName = UserName;
        this.UserTel = UserTel;
        this.UserMail = UserMail;
        this.DOB = DOB;
        this.UserStatus = UserStatus;
        this.listBookingmasters = listBookingmasters;
    }

    public Long getUserID() {
        return UserID;
    }

    public void setUserID(Long UserID) {
        this.UserID = UserID;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public String getUserTel() {
        return UserTel;
    }

    public void setUserTel(String UserTel) {
        this.UserTel = UserTel;
    }

    public String getUserMail() {
        return UserMail;
    }

    public void setUserMail(String UserMail) {
        this.UserMail = UserMail;
    }

    public Date getDOB() {
        return DOB;
    }

    public void setDOB(Date DOB) {
        this.DOB = DOB;
    }

    public boolean isUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(boolean UserStatus) {
        this.UserStatus = UserStatus;
    }

    public List<bookingMasterEntity> getListBookingmasters() {
        return listBookingmasters;
    }

    public void setListBookingmasters(List<bookingMasterEntity> listBookingmasters) {
        this.listBookingmasters = listBookingmasters;
    }




}
