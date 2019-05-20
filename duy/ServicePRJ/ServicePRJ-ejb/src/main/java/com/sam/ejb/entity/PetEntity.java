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
            @NamedQuery(name="pet.search", query ="SELECT p FROM PetEntity p WHERE p.PetName LIKE :str "),
            @NamedQuery(name="pet.getListPetOfUser", query ="SELECT p FROM PetEntity p WHERE p.userEntity.userID = :userID "),
            @NamedQuery(name="pet.getAllPetExceptOneUser", query ="SELECT p FROM PetEntity p WHERE p.userEntity.userID != :userID ")
            
        })
public class PetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long petID;
        
    @Column(name="petName", length = 50)
    private String PetName;
    
    @Column(name="petBreed", length = 20)
    private String PetBreed;
    
    @Column(name="petImage", length = 50)
    private String PetImage;
    
    @Column(name="petStatus")
    private boolean PetStatus;
    
    @Column(name="petPrice")
    private int PetPrice;
    
    @Column(name="petDOB")
    private Date PetDOB;
    
    @Column(name="petDating")
    private boolean PetDating;
    
    @Column(name="petStory", columnDefinition = "varchar(max)")
    private String PetStory;
    
    @Column(name="petGender")
    private String PetGender;
//    
//    @Column(name="UserOwner")
//    private Long UserID;
//    
    
    @OneToMany(mappedBy = "PetRequestEntity", fetch = FetchType.EAGER)
    private List<DatingDetailEntity> listRequestDatingDetail;
    
    @OneToMany(mappedBy = "PetRecieveEntity", fetch = FetchType.EAGER)
    private List<DatingDetailEntity> listReciveDatingDetail;
    @OneToMany(mappedBy = "PetEntity", fetch = FetchType.EAGER)
    private List<bookingDetailEntity> listBookingDetail;
    @ManyToOne
    @JoinColumn(name = "userID")
    private 
            UserEntity userEntity;


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

//    public List<bookingDetailEntity> getListBookingDetail() {
//        return listBookingDetail;
//    }

    public void setListBookingDetail(List<bookingDetailEntity> listBookingDetail) {
        this.listBookingDetail = listBookingDetail;
    }

    public Long getPetID() {
        return petID;
    }

    public void setPetID(Long petID) {
        this.petID = petID;
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

    

   

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

 


    public boolean isPetDating() {
        return PetDating;
    }

    public void setPetDating(boolean PetDating) {
        this.PetDating = PetDating;
    }

    public String getPetStory() {
        return PetStory;
    }

    public void setPetStory(String PetStory) {
        this.PetStory = PetStory;
    }

    public String getPetGender() {
        return PetGender;
    }

    public void setPetGender(String PetGender) {
        this.PetGender = PetGender;
    }

//    public List<DatingDetailEntity> getListRequestDatingDetail() {
//        return listRequestDatingDetail;
//    }

    public void setListRequestDatingDetail(List<DatingDetailEntity> listRequestDatingDetail) {
        this.listRequestDatingDetail = listRequestDatingDetail;
    }

//    public List<DatingDetailEntity> getListReciveDatingDetail() {
//        return listReciveDatingDetail;
//    }

    public void setListReciveDatingDetail(List<DatingDetailEntity> listReciveDatingDetail) {
        this.listReciveDatingDetail = listReciveDatingDetail;
    }
    
    
    
    
}

