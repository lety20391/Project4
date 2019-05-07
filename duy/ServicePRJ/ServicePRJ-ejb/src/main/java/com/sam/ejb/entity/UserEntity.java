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
            @NamedQuery(name="u.findAll",query = "SELECT u FROM UserEntity u"),
            @NamedQuery(name="u.searchByName", query ="SELECT u FROM UserEntity u WHERE u.UserName LIKE :str "),
            @NamedQuery(name="u.searchByPhone", query ="SELECT u FROM UserEntity u WHERE u.UserTel = :str "),
            @NamedQuery(name="u.setCodeByPhone", query ="UPDATE UserEntity u SET u.KeyCode = :code WHERE u.UserTel = :phone ")
        })
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userID;
    @Column(name="userName")
    private String UserName;
    @Column(name="userTel")
    private String UserTel;
    @Column(name="userMail")
    private String UserMail;
    @Column(name="userDOB")
    private Date UserDOB;
    @Column(name="userStatus")
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
    
    public UserEntity() {
    }

    public UserEntity(Long userID, String UserName, String UserTel, String UserMail, Date UserDOB, boolean UserStatus, String KeyCode, Date Key_dateCreated) {
        this.userID = userID;
        this.UserName = UserName;
        this.UserTel = UserTel;
        this.UserMail = UserMail;
        this.UserDOB = UserDOB;
        this.UserStatus = UserStatus;
        this.KeyCode = KeyCode;
        this.Key_dateCreated = Key_dateCreated;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
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

    public Date getUserDOB() {
        return UserDOB;
    }

    public void setUserDOB(Date UserDOB) {
        this.UserDOB = UserDOB;
    }

    public boolean isUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(boolean UserStatus) {
        this.UserStatus = UserStatus;
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

//    public List<bookingMasterEntity> getListBookingmasters() {
//        return listBookingmasters;
//    }

    public void setListBookingmasters(List<bookingMasterEntity> listBookingmasters) {
        this.listBookingmasters = listBookingmasters;
    }

//    public List<DatingMasterEntity> getListDatingMasterEntity() {
//        return listDatingMasterEntity;
//    }

    public void setListDatingMasterEntity(List<DatingMasterEntity> listDatingMasterEntity) {
        this.listDatingMasterEntity = listDatingMasterEntity;
    }

//    public List<PetEntity> getListPetEntity() {
//        return listPetEntity;
//    }

    public void setListPetEntity(List<PetEntity> listPetEntity) {
        this.listPetEntity = listPetEntity;
    }

//    public List<OrderMasterEntity> getListOrderMaster() {
//        return listOrderMaster;
//    }

    public void setListOrderMaster(List<OrderMasterEntity> listOrderMaster) {
        this.listOrderMaster = listOrderMaster;
    }

    

    




}
