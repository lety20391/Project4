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
            @NamedQuery(name="dDetail.searchByPetID", query ="SELECT d FROM DatingDetailEntity d WHERE d.PetID = :id ")
        })
public class DatingDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
        
    @Column(name="petID")
    private Long PetID;
    
    @Column(name="datingMasterID")
    private Long DatingMasterID;
    
    @Column(name="date")
    private Date DatingDate;
    
    @ManyToOne
    @JoinColumn(name = "Pet_ID")
    private PetEntity petEntity;
    
    @ManyToOne
    @JoinColumn(name = "DatingMaster_ID")
    private DatingMasterEntity datingMasterEntity;

    public DatingDetailEntity() {
    }

    public DatingDetailEntity(Long PetID, Long DatingMasterID, Date DatingDate) {
        this.PetID = PetID;
        this.DatingMasterID = DatingMasterID;
        this.DatingDate = DatingDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPetID() {
        return PetID;
    }

    public void setPetID(Long PetID) {
        this.PetID = PetID;
    }

    public Long getDatingMasterID() {
        return DatingMasterID;
    }

    public void setDatingMasterID(Long DatingMasterID) {
        this.DatingMasterID = DatingMasterID;
    }

    public Date getDatingDate() {
        return DatingDate;
    }

    public void setDatingDate(Date DatingDate) {
        this.DatingDate = DatingDate;
    }

//    public PetEntity getPetEntity() {
//        return petEntity;
//    }

    public void setPetEntity(PetEntity petEntity) {
        this.petEntity = petEntity;
    }
    
    
    
}
