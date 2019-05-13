/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;


import java.util.Collection;
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
@Table(name="tbService")
@NamedQueries
        ({
            @NamedQuery(name="ser.findAll",query = "SELECT s FROM serviceEntity s")
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class serviceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long SerID;    
    @Column(name="SerName",columnDefinition = "VARCHAR(255) NOT NULL")
    private String SerName;
    @Column(name="SerDes", columnDefinition = "VARCHAR(max) NOT NULL")
    private String SerDes;
    @Column(name="SerShortDes", columnDefinition="VARCHAR(max) NOT NULL")
    private String SerShortDes;
//    @Column(name="SerImage" ,columnDefinition = "VARCHAR(max)")
//    private String SerImage;
    @Column(name="Status")
    private boolean Status;
    @OneToMany(mappedBy = "serviceEntity", fetch = FetchType.LAZY)
    private List<bookingDetailEntity> bookingDetailEntitys;
    
    
     @OneToMany(mappedBy = "serviceEntity", fetch = FetchType.LAZY)
    private List<UploadEntity> ListUploadImage;
    public serviceEntity() {
    }

    public serviceEntity(String SerName, String SerDes, String SerShortDes, boolean Status, List<bookingDetailEntity> bookingDetailEntitys, List<UploadEntity> ListUploadImage) {
        this.SerName = SerName;
        this.SerDes = SerDes;
        this.SerShortDes = SerShortDes;
        this.Status = Status;
        this.bookingDetailEntitys = bookingDetailEntitys;
        this.ListUploadImage = ListUploadImage;
    }

    public Long getSerID() {
        return SerID;
    }

    public void setSerID(Long SerID) {
        this.SerID = SerID;
    }

    public String getSerName() {
        return SerName;
    }

    public void setSerName(String SerName) {
        this.SerName = SerName;
    }

    public String getSerDes() {
        return SerDes;
    }

    public void setSerDes(String SerDes) {
        this.SerDes = SerDes;
    }

    public String getSerShortDes() {
        return SerShortDes;
    }

    public void setSerShortDes(String SerShortDes) {
        this.SerShortDes = SerShortDes;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

//    public List<bookingDetailEntity> getBookingDetailEntitys() {
//        return bookingDetailEntitys;
//    }

    public void setBookingDetailEntitys(List<bookingDetailEntity> bookingDetailEntitys) {
        this.bookingDetailEntitys = bookingDetailEntitys;
    }

//    public List<UploadEntity> getListUploadImage() {
//        return ListUploadImage;
//    }
//
    public void setListUploadImage(List<UploadEntity> ListUploadImage) {
        this.ListUploadImage = ListUploadImage;
    }

 
}
