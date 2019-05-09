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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */
@Entity
@Table(name="tbAdmin")
@NamedQueries
        ({
            @NamedQuery(name="a.findAll",query = "SELECT a FROM AdminEntity a"),
            @NamedQuery(name="a.searchByName", query ="SELECT a FROM AdminEntity a WHERE a.Username LIKE :str "),
            @NamedQuery(name="a.searchByPhone", query ="SELECT a FROM AdminEntity a WHERE a.UserTel = :str "),
            @NamedQuery(name="a.setCodeByPhone", query ="UPDATE AdminEntity a SET a.KeyCode = :code WHERE a.UserTel = :phone ")
        })
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminID;
    @Column(name="userName")
    private String Username;
    @Column(name="userTel")
    private String UserTel;
    @Column(name="keyCode")
    private String KeyCode;
    @Column(name="key_dateCreated")
    private Date Key_dateCreated;
    @Column(name="superAdmin")
    private boolean SuperAdmin;

    public AdminEntity() {
    }

    public AdminEntity(Long adminID, String Username, String UserTel, String KeyCode, Date Key_dateCreated, boolean SuperAdmin) {
        this.adminID = adminID;
        this.Username = Username;
        this.UserTel = UserTel;
        this.KeyCode = KeyCode;
        this.Key_dateCreated = Key_dateCreated;
        this.SuperAdmin = SuperAdmin;
    }

    public Long getAdminID() {
        return adminID;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String Username) {
        this.Username = Username;
    }

    public String getUserTel() {
        return UserTel;
    }

    public void setUserTel(String UserTel) {
        this.UserTel = UserTel;
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

    public boolean isSuperAdmin() {
        return SuperAdmin;
    }

    public void setSuperAdmin(boolean SuperAdmin) {
        this.SuperAdmin = SuperAdmin;
    }

    
    
     
}
