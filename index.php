<?php session_start();
error_reporting(-1);
ini_set('display_errors', 'On');
require_once("../config/config.php");
require_once("layout/header.php");
require_once("lib/APICaller.php");
function get_id($name){
	$interests = array("", "News", "Sports", "Movies", "Technology", "Music", "Politics", "Startups", "Literature", "Finance", "Fashion", "Marketing", "Travel", "Cooking", "Humor", "Science", "Business", "Jobs", "ComputerProgramming", "Health", "Dating", "Photography", "Agriculture", "Medical", "Automobiles", "Television", "Women");
	return array_search($name, $interests);
}
if(isset($_REQUEST['p'])){
    $page = $_REQUEST['p'];
} else {
    $page = "News";
}
$title='FosterGem News| Realtime News Summary at your fingertips';
$meta_link='<meta name="keywords" content="Headlines today, latest news, Tech News, Sports news, Entertainment news, Business News, Technology News, Science News, Top News, Trending News, Todays News" />
<meta name="description" content="Discover Top News on FosterGem." />';

$url = "http://api.fostergem.com/v2/getPublicFeed/".get_id($page)."/0/100/6c350c809e3acef7a38421b86c6619e3";
$obj = new APICaller();
$feeds = json_decode($obj->getDataFromDB($url), true);

main_header($title,$meta_link,$page);
require_once("layout/home_content.php");
require_once("layout/footer.php");
						 

?>
			