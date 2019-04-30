/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.hibernate.jpa.internal.schemagen.JpaSchemaGenerator;

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
    @Column(name="SerName")
    private String SerName;
    @Column(name="SerDes")
    private String SerDes;
    @Column(name="SerImage")
    private String SerImage;
    @Column(name="Status")
    private boolean Status;
    
    @OneToMany(mappedBy = "serviceEntity", fetch = FetchType.LAZY)
   @JsonIgnore
    private List<bookingDetailEntity> bookingDetailEntitys;

    public serviceEntity() {
    }

    public serviceEntity(String SerName, String SerDes, String SerImage, boolean Status) {
        this.SerName = SerName;
        this.SerDes = SerDes;
        this.SerImage = SerImage;
        this.Status = Status;
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

    public String getSerImage() {
        return SerImage;
    }

    public void setSerImage(String SerImage) {
        this.SerImage = SerImage;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public List<bookingDetailEntity> getBookingDetailEntitys() {
        return bookingDetailEntitys;
    }

    public void setBookingDetailEntitys(List<bookingDetailEntity> bookingDetailEntitys) {
        this.bookingDetailEntitys = bookingDetailEntitys;
    }

    
}
