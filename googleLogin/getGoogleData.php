<?php
include 'config/functions.php';
require_once("config/dbconfig.php");
session_start();

if (!empty($_GET['openid_ext1_value_firstname']) && !empty($_GET['openid_ext1_value_lastname']) && !empty($_GET['openid_ext1_value_email'])) {    
    $fname = $_GET['openid_ext1_value_firstname'];
	$lname= $_GET['openid_ext1_value_lastname'];
	   $email = $_GET['openid_ext1_value_email'];

    $user = new User();
    $userdata = $user->checkUserGoogle($uid, 'Google', $fname,$lname, $email);
    if(!empty($userdata)) {
        session_start();
        $_SESSION['id'] = $userdata['id'];
        $_SESSION['oauth_id'] = $uid;
        $_SESSION['logged'] = "true";
        $_SESSION['login_email'] = $email;
		$_SESSION['oauth_provider'] = $userdata['oauth_provider'];
        header("Location:http://fostergem.com/GettingStarted/PostGoogleRegistration");

    } else {
        // Something's missing, go back to square 1
        header('Location:http://fostergem.com/home');
    }

}
?>