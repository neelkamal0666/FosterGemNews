function signUp(){
    console.log('yo');
    if($("#password1").val()!=$("#password2").val()) {
        $("#password_status").html('<font color="red">Password Didnt match</font>');
    } else if($("#email").val() == ''  || $("#email").val() == '' || $("#password1").val() == '') {
        $("#final_status").html('<div style="height:25px;padding:25px;"><center><font color="red">You Must Enter All The Fields</font></center></div>');
    } else {
        if($("#gender").is(':checked')) {
            var gender = $("#gender:checked").val();
        }
        if($("#gender1").is(':checked')) {
            var gender = $("#gender1:checked").val();
        }
        var data_string = {
            FirstName : $("#fname").val(),
            LastName : $("#lname").val(),
            EmailAddress : $("#email").val(),
            Password : $("#password1").val(),
            Gender : gender
        };
	   var dataString=JSON.stringify(data_string);
        console.log(dataString);
	   $.ajax({
          url: 'http://dbapi.fostergem.com/v1/oneStepSignup',
          method: 'POST',
          data: dataString,
          cache: false,
          success: function(responseData) {
              var res = JSON.parse(responseData);
              //console.log(responseData);
              if (res.profile_id) {
                  window.localStorage.setItem("AccessKey", res.access_key);
                  window.localStorage.setItem("SecretKey", res.secret_key);
                  window.localStorage.setItem("profile_id", res.profile_id);
                  setCookie($("#email").val(),$("#password1").val(),res.profile_id,res.profile_pic,res.fname,res.lname);
                  window.location.href = 'GettingStarted';
              }
          }
       });
	}
 return false;
}

$(document).ready(function(){
    $("#email").change(function() {
        var email = $("#email").val();
        if(email.length >= 6) {
            $("#status").html('<img src="images/ajax-loader.gif" align="absmiddle">&nbsp;Checking availability...');
            $.ajax({
                type: "POST",
                url: "http://dbapi.fostergem.com/lib/check_email.php",
                data: "email="+ email,
                success: function(msg){

                                      $("#status").html(msg);
                                     }

                  });
} else {
	 $("#status").html('<font color="red">Please Enter A Valid Emaild Address</font>');
	}
});
});