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
 * @author DuDu
 */
@Entity
@Table(name="tbOrderMaster")
@NamedQueries
        ({
            @NamedQuery(name="om.findAll",query = "SELECT om FROM OrderDetailEntity om")
//            @NamedQuery(name="ser.search", query ="SELECT s FROM serviceEntity s WHERE s.name LIKE :str ")
        })
public class OrderMasterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long OrderID;
    @Column(name="ShipDate", columnDefinition= "DATETIME NOT NULL")
    private Date ShipDate;
    @Column(name="CreDate", columnDefinition= "DATETIME NOT NULL")
    private Date CreDate;
    @Column(name="Status")
    private boolean Status;
    
    
    @OneToMany(mappedBy = "OrderMasterEntity", fetch = FetchType.EAGER)
    private List<OrderDetailEntity> listOrderDetailEntity;
    
    @ManyToOne
    @JoinColumn(name = "User_ID")
    private userEntity userEntity;

    public OrderMasterEntity(Date ShipDate, Date CreDate, boolean Status, List<OrderDetailEntity> listOrderDetailEntity, userEntity userEntity) {
        this.ShipDate = ShipDate;
        this.CreDate = CreDate;
        this.Status = Status;
        this.listOrderDetailEntity = listOrderDetailEntity;
        this.userEntity = userEntity;
    }

    public OrderMasterEntity() {
    }

    public Long getOrderID() {
        return OrderID;
    }

    public void setOrderID(Long OrderID) {
        this.OrderID = OrderID;
    }

    public Date getShipDate() {
        return ShipDate;
    }

    public void setShipDate(Date ShipDate) {
        this.ShipDate = ShipDate;
    }

    public Date getCreDate() {
        return CreDate;
    }

    public void setCreDate(Date CreDate) {
        this.CreDate = CreDate;
    }

    public boolean isStatus() {
        return Status;
    }

    public void setStatus(boolean Status) {
        this.Status = Status;
    }

    public List<OrderDetailEntity> getListOrderDetailEntity() {
        return listOrderDetailEntity;
    }

    public void setListOrderDetailEntity(List<OrderDetailEntity> listOrderDetailEntity) {
        this.listOrderDetailEntity = listOrderDetailEntity;
    }

    public userEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(userEntity userEntity) {
        this.userEntity = userEntity;
    }
    
    
    
}
