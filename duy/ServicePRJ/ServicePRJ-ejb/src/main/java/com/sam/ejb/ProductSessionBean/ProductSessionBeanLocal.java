/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.ejb.ProductSessionBean;

import com.sam.ejb.entity.productEntity;
import com.sam.ejb.entity.serviceEntity;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author DuDu
 */
@Local
public interface ProductSessionBeanLocal {
    public List<productEntity> listAll();
    public List<productEntity> listByCate(Long cateID);
    public productEntity addProduct(productEntity product);
    public productEntity editProduct(productEntity product);
    public void deleteProduct(Long id);
    public productEntity findOne(Long id);
    public List<productEntity> searchProductByName(String strSearch);
}
