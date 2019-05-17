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
 * @author Dat Le
 */
@Entity
@Table(name="datingDetailEntity")
@NamedQueries
        ({
            @NamedQuery(name="dDetail.findAll",query = "SELECT d FROM DatingDetailEntity d"),
            @NamedQuery(name="dDetail.findByRecieved",query = "SELECT d FROM DatingDetailEntity d WHERE d.PetRecieveEntity.petID = :id"),
            @NamedQuery(name="dDetail.findByRequest",query = "SELECT d FROM DatingDetailEntity d WHERE d.PetRequestEntity.petID = :id")
//            @NamedQuery(name="dDetail.searchRequestByPetID", query ="SELECT d FROM DatingDetailEntity d WHERE d.PetID = :id ")
        })
public class DatingDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long datingDetailID;        
    
    @Column(name="datingDate")
    private Date DatingDate;
    
    @Column(name="datingLocation")
    private String DatingLocation;
    
    @Column(name="isAccepted")
    private Boolean IsAccepted;
    
    @Column(name="specialStatus", columnDefinition = "INT CHECK (specialStatus <= 3)")
    private Integer SpecialStatus;
    
    @Column(name="isNewNotification" , columnDefinition = "BIT default 0")
    private Boolean IsNewNotification;
    
    
    @ManyToOne
    @JoinColumn(name = "petRequest_ID")
    private PetEntity PetRequestEntity;
    
    @ManyToOne
    @JoinColumn(name = "petRecieve_ID")
    private PetEntity PetRecieveEntity;
    
    @ManyToOne
    @JoinColumn(name = "datingMaster_ID")
    private DatingMasterEntity DatingMasterEntity;

    public DatingDetailEntity() {
    }

    public DatingDetailEntity(Long datingDetailID, Date DatingDate, String DatingLocation, Boolean IsAccepted) {
        this.datingDetailID = datingDetailID;
        this.DatingDate = DatingDate;
        this.DatingLocation = DatingLocation;
        this.IsAccepted = IsAccepted;
    }

    public Long getDatingDetailID() {
        return datingDetailID;
    }

    public void setDatingDetailID(Long datingDetailID) {
        this.datingDetailID = datingDetailID;
    }

    public Date getDatingDate() {
        return DatingDate;
    }

    public void setDatingDate(Date DatingDate) {
        this.DatingDate = DatingDate;
    }

    public String getDatingLocation() {
        return DatingLocation;
    }

    public void setDatingLocation(String DatingLocation) {
        this.DatingLocation = DatingLocation;
    }

    public Boolean getIsAccepted() {
        return IsAccepted;
    }

    public void setIsAccepted(Boolean IsAccepted) {
        this.IsAccepted = IsAccepted;
    }

    public PetEntity getPetRequestEntity() {
        return PetRequestEntity;
    }

    public void setPetRequestEntity(PetEntity PetRequestEntity) {
        this.PetRequestEntity = PetRequestEntity;
    }

    public PetEntity getPetRecieveEntity() {
        return PetRecieveEntity;
    }

    public void setPetRecieveEntity(PetEntity PetRecieveEntity) {
        this.PetRecieveEntity = PetRecieveEntity;
    }

    public DatingMasterEntity getDatingMasterEntity() {
        return DatingMasterEntity;
    }

    public void setDatingMasterEntity(DatingMasterEntity DatingMasterEntity) {
        this.DatingMasterEntity = DatingMasterEntity;
    }

    
    

    

    
    
    
    
}
