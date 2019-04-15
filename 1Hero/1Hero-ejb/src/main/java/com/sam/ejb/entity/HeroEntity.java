/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Dat Le
 */
@Entity
@Table(name="heroEntity")
@NamedQueries
        ({
            @NamedQuery(name="Hero.findAll",query = "SELECT h FROM HeroEntity h"),
            @NamedQuery(name="Hero.search", query ="SELECT h FROM HeroEntity h WHERE h.name LIKE :str ")
        })
public class HeroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column(name="name", length = 50)
    private String name;

    public HeroEntity() {
    }

    public HeroEntity(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

        
}
