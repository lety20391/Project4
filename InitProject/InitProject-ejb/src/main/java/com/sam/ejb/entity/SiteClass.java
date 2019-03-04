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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author Dat ThinkPad
 */
@Entity
@Table(name="siteClass")
@NamedQueries
        ({
            @NamedQuery(name="SiteClass.findAll",query = "SELECT c FROM SiteClass c"),
            @NamedQuery(name = "SiteClass.findByName",query ="SELECT c FROM SiteClass c WHERE c.name =:name"),
            @NamedQuery(name="SiteClass.findByTeacher",query ="SELECT c FROM SiteClass c WHERE c.teacher = :teacher")
        })
public class SiteClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name="name", nullable = false)
    private String name;
    
    @Column(name="quantity")
    private Integer quantity;
    
    @Column(name="createDate")
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date createDate;
    
    @Column(name="teacher")
    private String teacher;

    public SiteClass() {
    }

    public SiteClass(String name, Integer quantity, Date createDate, String teacher) {
        this.name = name;
        this.quantity = quantity;
        this.createDate = createDate;
        this.teacher = teacher;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    
    
}
