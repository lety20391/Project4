/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function (){    
        console.log("document is ready");
        $("#btnLogin").click(function(){
            //kiem tra form xem co dien day du thong tin chua
                        
                var user = {
                    username: $("#username").val(), 
                    password: $("#password").val()
                };
                console.log(user);
                $.ajax({        
                    type: 'POST',
                    dataType: "json",
                    url: '/ServicePRJ-web/rest/tokens',
                    data: JSON.stringify(user),
                    contentType: 'application/json',
                    success: function(data){
                        //setCookie("user", user.employeeID, 1);
                        //location.href = "/Set3Client/Delete.jsp";
                        console.log(data);
                    },
                    error: function(data){
                        console.log("-----error----");
                        console.log(data);
                        alert("Login Failed, Please Try Again");
                    }
                });
              

        });
        
        function validateLoginForm(){
            var validate = true;
            var id = $("#txtEmployeeID").val();
            var pass = $("#txtpassword").val();
            if( id == "" || pass == ""){
                validate = false;
                alert("Please Fill in Form");
            }
            return validate;    
        }
        
        
        function setCookie(cname, cvalue, exmins) {
            var d = new Date();
            d.setTime(d.getTime() + (exmins*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires ;

        }
        
    });
