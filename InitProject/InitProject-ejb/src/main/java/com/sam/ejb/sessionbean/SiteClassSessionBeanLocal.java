/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.SiteClass;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat ThinkPad
 */
@Local
public interface SiteClassSessionBeanLocal {
    public List findAll();
    public SiteClass findOne(Long id);
    public SiteClass addSiteClass(SiteClass site);
    
}
