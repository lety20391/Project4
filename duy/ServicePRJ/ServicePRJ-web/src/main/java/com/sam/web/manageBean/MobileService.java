/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.manageBean;

import java.io.IOException;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

/**
 *
 * @author Dat Le
 */
public class MobileService {
    public String getMobileCode(String hashCode, String mobilePhone){
        String url = "http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/";
        //Noi dung thay doi trong content
        String body = " {\n" +
"	\"ApiKey\":\"2EFF2FDBB7A6AD84DFC2488C6DF704\",\n" +
"	\"Brandname\":\"Verify\",\n" +
"	\"Content\":\"Ma xac nhan dang nhap cua ban la: " + hashCode +"\",\n" +
"	\"Phone\":\"" + mobilePhone + "\",\n" +
"	\"SecretKey\":\"644034136AA870DCCD960255F76543\",\n" +
"	\"SmsType\":\"2\"\n" +
"} ";
        try ( CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpPost request = new HttpPost(url);
            StringEntity params = new StringEntity(body);
            request.addHeader("content-type", "application/json");
            request.setEntity(params);
            HttpResponse result = httpClient.execute(request);
            String json = EntityUtils.toString(result.getEntity(), "UTF-8");

            com.google.gson.Gson gson = new com.google.gson.Gson();
            Response respuesta = gson.fromJson(json, Response.class);

            System.out.println(respuesta.getExample());
            System.out.println(respuesta.getFr());

        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        String code = "";
        return code;
    }
    
    
    public class Response{
        private String example;
        private String fr;

        public String getExample() {
            return example;
        }
        public void setExample(String example) {
            this.example = example;
        }
        public String getFr() {
            return fr;
        }
        public void setFr(String fr) {
            this.fr = fr;
        }
    }
}
