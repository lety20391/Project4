/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.sessionbean;

import com.sam.ejb.entity.HeroEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Dat Le
 */
@Local
public interface TestSessionBeanLocal {
    public void test();
    public List<HeroEntity> listAll();
}
