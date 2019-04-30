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
@Table(name="tbPet")
@NamedQueries
        ({
            @NamedQuery(name="pet.findAll",query = "SELECT p FROM PetEntity p"),
            @NamedQuery(name="pet.search", query ="SELECT p FROM PetEntity p WHERE p.PetName LIKE :str ")
        })
public class PetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
        
    @Column(name="name", length = 50)
    private String PetName;
    
    @Column(name="breed", length = 20)
    private String PetBreed;
    
    @Column(name="image", length = 50)
    private String PetImage;
    
    @Column(name="status")
    private boolean PetStatus;
    
    @Column(name="price")
    private int PetPrice;
    
    @Column(name="dob")
    private Date PetDOB;
//    
//    @Column(name="UserOwner")
//    private Long UserID;
//    
    @OneToMany(mappedBy = "petEntity", fetch = FetchType.EAGER)
    private List<DatingDetailEntity> listDatingDetail;
    
    
    @ManyToOne
    @JoinColumn(name = "UserOwner_ID")
    private userEntity userEntity;


    public PetEntity() {
    }

    public PetEntity(String PetName, String PetBreed, String PetImage, boolean PetStatus, int PetPrice, Date PetDOB) {
        this.PetName = PetName;
        this.PetBreed = PetBreed;
        this.PetImage = PetImage;
        this.PetStatus = PetStatus;
        this.PetPrice = PetPrice;
        this.PetDOB = PetDOB;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    public String getPetName() {
        return PetName;
    }

    public void setPetName(String PetName) {
        this.PetName = PetName;
    }

    public String getPetBreed() {
        return PetBreed;
    }

    public void setPetBreed(String PetBreed) {
        this.PetBreed = PetBreed;
    }

    public String getPetImage() {
        return PetImage;
    }

    public void setPetImage(String PetImage) {
        this.PetImage = PetImage;
    }

    public boolean isPetStatus() {
        return PetStatus;
    }

    public void setPetStatus(boolean PetStatus) {
        this.PetStatus = PetStatus;
    }

    public int getPetPrice() {
        return PetPrice;
    }

    public void setPetPrice(int PetPrice) {
        this.PetPrice = PetPrice;
    }

    public Date getPetDOB() {
        return PetDOB;
    }

    public void setPetDOB(Date PetDOB) {
        this.PetDOB = PetDOB;
    }

    public List<DatingDetailEntity> getListDatingDetail() {
        return listDatingDetail;
    }

    public void setListDatingDetail(List<DatingDetailEntity> listDatingDetail) {
        this.listDatingDetail = listDatingDetail;
    }
//
//    public Long getUserID() {
//        return UserID;
//    }
//
//    public void setUserID(Long UserID) {
//        this.UserID = UserID;
//    }

//    public userEntity getUserEntity() {
//        return userEntity;
//    }

    public void setUserEntity(userEntity userEntity) {
        this.userEntity = userEntity;
    }
    
    
    
    
}

