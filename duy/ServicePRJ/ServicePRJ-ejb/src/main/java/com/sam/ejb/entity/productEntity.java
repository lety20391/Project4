/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

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
 * @author DuDu
 */
@Entity
@Table(name="tbProduct")
@NamedQueries
        ({
            @NamedQuery(name="pro.findAll",query = "SELECT p FROM productEntity p WHERE p.Status = TRUE"),
            @NamedQuery(name="pro.findByCategory",query = "SELECT p FROM productEntity p WHERE p.cateEntity.CateID = :str"),
            @NamedQuery(name="pro.findByName",query = "SELECT p FROM productEntity p WHERE p.ProName LIKE :str")
            
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class productEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ProID;    
    @Column(name="ProName",columnDefinition = "VARCHAR(255) NOT NULL")
    private String ProName;
    @Column(name="ProDes", columnDefinition = "VARCHAR(max) NOT NULL")
    private String ProDes;
    @Column(name="ProPrice", columnDefinition= "INT NOT NULL")
    private Integer ProPrice;
    @Column(name="ProColor", columnDefinition="VARCHAR(255) NOT NULL")
    private String ProColor;
    @Column(name="ProImage" ,columnDefinition = "VARCHAR(max) NOT NULL")
    private String ProImage;
    @Column(name="Status")
    private boolean Status;
    
    @ManyToOne
    @JoinColumn(name = "Cate_ID")
    private cateEntity cateEntity;

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.EAGER)
    private List<OrderDetailEntity> listOrderDetailEntity;

    public productEntity() {
    }

    public productEntity(Long ProID, String ProName, String ProDes, Integer ProPrice, String ProColor, String ProImage, boolean Status, cateEntity cateEntity) {
        this.ProID = ProID;
        this.ProName = ProName;
        this.ProDes = ProDes;
        this.ProPrice = ProPrice;
        this.ProColor = ProColor;
        this.ProImage = ProImage;
        this.Status = Status;
        this.cateEntity = cateEntity;
    }

    

    public Long getProID() {
        return ProID;
    }

    public void setProID(Long ProID) {
        this.ProID = ProID;
    }

    public String getProName() {
        return ProName;
    }

    public void setProName(String ProName) {
        this.ProName = ProName;
    }

    public String getProDes() {
        return ProDes;
    }

    public void setProDes(String ProDes) {
        this.ProDes = ProDes;
    }

    

    public Integer getProPrice() {
        return ProPrice;
    }

    public void setProPrice(Integer ProPrice) {
        this.ProPrice = ProPrice;
    }

    public String getProColor() {
        return ProColor;
    }

    public void setProColor(String ProColor) {
        this.ProColor = ProColor;
    }

    public String getProImage() {
        return ProImage;
    }

    public void setProImage(String ProImage) {
        this.ProImage = ProImage;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public cateEntity getCateEntity() {
        return cateEntity;
    }

    public void setCateEntity(cateEntity cateEntity) {
        this.cateEntity = cateEntity;
    }

//    public List<OrderDetailEntity> getListOrderDetailEntity() {
//        return listOrderDetailEntity;
//    }

    public void setListOrderDetailEntity(List<OrderDetailEntity> listOrderDetailEntity) {
        this.listOrderDetailEntity = listOrderDetailEntity;
    }
    
    
}
