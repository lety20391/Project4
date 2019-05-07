/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import java.util.Date;
import java.util.List;
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
 * @author Dat Le
 */
@Entity
@Table(name="datingMasterEntity")
@NamedQueries
        ({
            @NamedQuery(name="dMaster.findAll",query = "SELECT d FROM DatingMasterEntity d"),
            @NamedQuery(name="dMaster.searchByUserID", query ="SELECT d FROM DatingMasterEntity d WHERE d.UserID = :id ")
        })
public class DatingMasterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
        
    @Column(name="userID")
    private Long UserID;
    
    @Column(name="creDate")
    private Date CreDate;
    
    @Column(name="locat", length = 200)
    private String Locat;
    
    @Column(name="status")
    private boolean Status;
    
    @OneToMany(mappedBy = "datingMasterEntity", fetch = FetchType.EAGER)
    private List<DatingDetailEntity> listDatingDetail;

    @ManyToOne
    @JoinColumn(name = "UserR_ID")
    private UserEntity userEntity;

    public DatingMasterEntity() {
    }

    public DatingMasterEntity(Long UserID, Date CreDate, String Locat, boolean Status, List<DatingDetailEntity> listDatingDetail, UserEntity userEntity) {
        this.UserID = UserID;
        this.CreDate = CreDate;
        this.Locat = Locat;
        this.Status = Status;
        this.listDatingDetail = listDatingDetail;
        this.userEntity = userEntity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserID() {
        return UserID;
    }

    public void setUserID(Long UserID) {
        this.UserID = UserID;
    }

    public Date getCreDate() {
        return CreDate;
    }

    public void setCreDate(Date CreDate) {
        this.CreDate = CreDate;
    }

    public String getLocat() {
        return Locat;
    }

    public void setLocat(String Locat) {
        this.Locat = Locat;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public List<DatingDetailEntity> getListDatingDetail() {
        return listDatingDetail;
    }

    public void setListDatingDetail(List<DatingDetailEntity> listDatingDetail) {
        this.listDatingDetail = listDatingDetail;
    }

//    public userEntity getUserEntity() {
//        return userEntity;
//    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
    
    
    
}
