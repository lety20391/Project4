/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import java.io.Serializable;
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
 * @author DuDu
 */
@Entity
@Table(name="tbOrderDetail")
@NamedQueries
        ({
            @NamedQuery(name="od.findAll",query = "SELECT od FROM OrderDetailEntity od"),
            @NamedQuery(name="od.sort", query = "SELECT od FROM OrderDetailEntity od ORDER BY od.Qty DESC" )
        })
public class OrderDetailEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ODetailID;
    @Column(name="OrderDate", columnDefinition= "DATETIME NOT NULL")
    private Date OrderDate;
    @Column(name="Qty", columnDefinition ="INT NOT NULL")
    private Integer Qty;
    @Column(name="Status")
    private boolean Status;
    
    @ManyToOne
    @JoinColumn(name = "Pro_ID")
    private productEntity productEntity;
    
    @ManyToOne
    @JoinColumn(name = "OrderID")
    private OrderMasterEntity OrderMasterEntity;

    public OrderDetailEntity(Date OrderDate, Integer Qty, boolean Status, productEntity productEntity, OrderMasterEntity OrderMasterEntity) {
        this.OrderDate = OrderDate;
        this.Qty = Qty;
        this.Status = Status;
        this.productEntity = productEntity;
        this.OrderMasterEntity = OrderMasterEntity;
    }

    public OrderDetailEntity() {
    }

    public Long getODetailID() {
        return ODetailID;
    }

    public void setODetailID(Long ODetailID) {
        this.ODetailID = ODetailID;
    }

    public Date getOrderDate() {
        return OrderDate;
    }

    public void setOrderDate(Date OrderDate) {
        this.OrderDate = OrderDate;
    }

    public Integer getQty() {
        return Qty;
    }

    public void setQty(Integer Qty) {
        this.Qty = Qty;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public productEntity getProductEntity() {
        return productEntity;
    }

    public void setProductEntity(productEntity productEntity) {
        this.productEntity = productEntity;
    }

    public OrderMasterEntity getOrderMasterEntity() {
        return OrderMasterEntity;
    }

    public void setOrderMasterEntity(OrderMasterEntity OrderMasterEntity) {
        this.OrderMasterEntity = OrderMasterEntity;
    }
    
    
}
