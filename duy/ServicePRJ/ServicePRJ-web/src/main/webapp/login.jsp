<%-- 
    Document   : login
    Created on : Dec 17, 2018, 6:18:36 PM
    Author     : HERO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <jsp:include page="header.jsp"></jsp:include>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <div class="wrapper">
            <form class="form-signin" action="LoginServlet" method="POST">
                <h2 class="form-signin-heading">Xin mời đăng nhập</h2>
                <input type="text" class="form-control" name="username" id="username"/><br/>
                <input type="password" class="form-control" name="password" id="password"/><br/>                
                <button class="btn-btn-lg btn-primary btn-block" type="submit">Đăng Nhập</button>
                
            </form>
                
                
            
        </div>
    </body>
</html>
