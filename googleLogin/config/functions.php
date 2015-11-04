<?php
require 'dbconfig.php';

class User {

    function checkUserGoogle($uid, $oauth_provider, $fname,$lname,$email)
	{
        $userstable = USERS_TABLE_NAME;
        $query = mysql_query("SELECT password,profile_id FROM `$userstable` WHERE email = '$email'") or die(mysql_error());
        $result = mysql_fetch_array($query);
        if (!empty($result)) {
          	 /* Set cookie to last 1 year   */
			setcookie('login_email', $email, time()+60*60*24*365, '/', 'fostergem.com');
            setcookie('password_login', $result['password'], time()+60*60*24*365, '/', 'fostergem.com');
			setcookie('profile_id', $result['profile_id'], time()+60*60*24*365, '/', 'fostergem.com');
			setcookie('login_email', $email, time()+60*60*24*365, '/', 'www.fostergem.com');
            setcookie('password_login',$result['password'], time()+60*60*24*365, '/', 'www.fostergem.com');
			setcookie('profile_id', $result['profile_id'], time()+60*60*24*365, '/', 'www.fostergem.com');
			
        } else {
                     $query = mysql_query("INSERT INTO `$userstable` (oauth_provider, oauth_uid, fname,lname, email) VALUES ('$oauth_provider', '$uid', '$fname','$lname', '$email')") or die(mysql_error());
            $query = mysql_query("SELECT * FROM `$userstable` WHERE email = '$email'");
            $result = mysql_fetch_array($query);
            return $result;
        }
        return $result;
    }

    

}

?>