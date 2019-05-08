/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

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
            @NamedQuery(name="a.findAll",query = "SELECT a FROM adminEntity a")
//            @NamedQuery(name="u.searchByName", query ="SELECT u FROM userEntity u WHERE u.UserName LIKE :str "),
//            @NamedQuery(name="u.searchByPhone", query ="SELECT u FROM userEntity u WHERE u.UserTel LIKE :str ")
        })
public class adminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long AdminID;
    @Column(name="Username", columnDefinition = "VARCHAR(50) NOT NULL")
    private String Username;
    @Column(name="Password",columnDefinition = "VARCHAR(50) NOT NULL")
    private String Password;
    @Column(name="SuperAdmin")
    private boolean SuperAdmin;

    public adminEntity() {
    }

    public adminEntity(String Username, String Password, boolean SuperAdmin) {
        this.Username = Username;
        this.Password = Password;
        this.SuperAdmin = SuperAdmin;
    }

    public Long getAdminID() {
        return AdminID;
    }

    public void setAdminID(Long AdminID) {
        this.AdminID = AdminID;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String Username) {
        this.Username = Username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String Password) {
        this.Password = Password;
    }

    public boolean isSuperAdmin() {
        return SuperAdmin;
    }

    public void setSuperAdmin(boolean SuperAdmin) {
        this.SuperAdmin = SuperAdmin;
    }
    
    
    
     
}
