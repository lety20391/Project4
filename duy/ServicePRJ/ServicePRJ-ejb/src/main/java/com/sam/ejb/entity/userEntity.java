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
            @NamedQuery(name="u.findAll",query = "SELECT u FROM userEntity u"),
            @NamedQuery(name="u.searchByName", query ="SELECT u FROM userEntity u WHERE u.UserName LIKE :str "),
            @NamedQuery(name="u.searchByPhone", query ="SELECT u FROM userEntity u WHERE u.UserTel = :str "),
            @NamedQuery(name="u.setCodeByPhone", query ="UPDATE userEntity u SET u.KeyCode = :code WHERE u.UserTel = :phone ")
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
    @Column(name="keyCode")
    private String KeyCode;
    @Column(name="key_dateCreated")
    private Date Key_dateCreated;


    @OneToMany(mappedBy = "userEntity", fetch = FetchType.EAGER)
    private List<bookingMasterEntity> listBookingmasters;

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.EAGER)
    private List<DatingMasterEntity> listDatingMasterEntity;

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.EAGER)
    private List<PetEntity> listPetEntity;

    @OneToMany(mappedBy="userEntity", fetch = FetchType.EAGER)
    private List<OrderMasterEntity> listOrderMaster;
    
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

    public List<DatingMasterEntity> getListDatingMasterEntity() {
        return listDatingMasterEntity;
    }

    public void setListDatingMasterEntity(List<DatingMasterEntity> listDatingMasterEntity) {
        this.listDatingMasterEntity = listDatingMasterEntity;
    }

    public List<PetEntity> getListPetEntity() {
        return listPetEntity;
    }

    public void setListPetEntity(List<PetEntity> listPetEntity) {
        this.listPetEntity = listPetEntity;
    }

    public String getKeyCode() {
        return KeyCode;
    }

    public void setKeyCode(String KeyCode) {
        this.KeyCode = KeyCode;
    }

    public Date getKey_dateCreated() {
        return Key_dateCreated;
    }

    public void setKey_dateCreated(Date Key_dateCreated) {
        this.Key_dateCreated = Key_dateCreated;
    }

//    public List<OrderMasterEntity> getListOrderMaster() {
//        return listOrderMaster;
//    }

    public void setListOrderMaster(List<OrderMasterEntity> listOrderMaster) {
        this.listOrderMaster = listOrderMaster;
    }

    




}
