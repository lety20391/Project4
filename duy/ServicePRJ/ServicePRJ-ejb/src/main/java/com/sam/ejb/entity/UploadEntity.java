/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */
@Entity
@Table(name="tbUploadImage")
public class UploadEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ImageID;
     @Column(name="ImageName", columnDefinition = "VARCHAR(max) NOT NULL")
    private String ImageName;
     
     @ManyToOne
    @JoinColumn(name = "SerID")
    private serviceEntity serviceEntity;

    public UploadEntity(String ImageName, serviceEntity serviceEntity) {
        this.ImageName = ImageName;
        this.serviceEntity = serviceEntity;
    }

    public UploadEntity() {
    }

    public Long getImageID() {
        return ImageID;
    }

    public void setImageID(Long ImageID) {
        this.ImageID = ImageID;
    }

    public String getImageName() {
        return ImageName;
    }

    public void setImageName(String ImageName) {
        this.ImageName = ImageName;
    }

    public serviceEntity getServiceEntity() {
        return serviceEntity;
    }

    public void setServiceEntity(serviceEntity serviceEntity) {
        this.serviceEntity = serviceEntity;
    }
     
}
