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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author DuDu
 */
@Entity
@Table(name="tbCategory")
@NamedQueries
        ({
            @NamedQuery(name="cate.findAll",query = "SELECT c FROM cateEntity c")
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class cateEntity {
     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long CateID;    
    @Column(name="CateName",columnDefinition = "VARCHAR(255) NOT NULL")
    private String CateName;
    
    @Column(name="Status")
    private Boolean Status;
    
    @OneToMany(mappedBy = "cateEntity", fetch = FetchType.LAZY)
    private List<productEntity> productList;

    public cateEntity() {
    }

    public cateEntity(Long CateID, String CateName, Boolean Status) {
        this.CateID = CateID;
        this.CateName = CateName;
        this.Status = Status;
    }

    

    public Long getCateID() {
        return CateID;
    }

    public void setCateID(Long CateID) {
        this.CateID = CateID;
    }

    public String getCateName() {
        return CateName;
    }

    public void setCateName(String CateName) {
        this.CateName = CateName;
    }

//    public List<productEntity> getProductList() {
//        return productList;
//    }

    public void setProductList(List<productEntity> productList) {
        this.productList = productList;
    }

    public Boolean getStatus() {
        return Status;
    }

    public void setStatus(Boolean Status) {
        this.Status = Status;
    }
    
    
    
}
