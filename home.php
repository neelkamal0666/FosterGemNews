<?php session_start(); 
require_once("../config/config.php");
if(!isset($_COOKIE['profile_id'])){
//header("location:".SITE_URL);
}
require_once("layout/home_layout/header.php");
main_header("FosterGem","Home");
require_once("layout/home_layout/home_content.php");
require_once("layout/home_layout/footer.php");
?>