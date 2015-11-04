<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'foste2cj_admin');
define('DB_PASSWORD', 'ybAA-(P=G}9P');
define('DB_DATABASE', 'foste2cj_fostergem');

define('USERS_TABLE_NAME', 'foster_users');

$connection = mysql_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD) or die(mysql_error());
$database = mysql_select_db(DB_DATABASE) or die(mysql_error());
function connect_db()
{
$conn = mysql_pconnect("localhost","foste2cj_admin","ybAA-(P=G}9P")or die("Unable to connect database.");
	mysql_select_db("foste2cj_fostergem")or die("Database Not Found.");
}
?>
