<?php
	$request = file_get_contents('php://input');
	$request_data = json_decode($request,true);
	$email = $request_data['email'];
	$password = md5($request_data['password']);
	$profile_id = $request_data['profile_id'];
	$profile_pic = $request_data['profile_pic'];
	$fname = $request_data['fname'];
	setcookie('login_email', $email, time()+60*60*24*365, '/', 'fostergem.com');
	setcookie('password_login', $password, time()+60*60*24*365, '/', 'fostergem.com');
	setcookie('profile_id', $profile_id, time()+60*60*24*365, '/', 'fostergem.com');
	setcookie('profile_pic', $profile_pic, time()+60*60*24*365, '/', 'fostergem.com');
	setcookie('fname', $fname, time()+60*60*24*365, '/', 'fostergem.com');
	
	setcookie('login_email', $email, time()+60*60*24*365, '/', 'www.fostergem.com');
	setcookie('password_login',$password, time()+60*60*24*365, '/', 'www.fostergem.com');
	setcookie('profile_id', $profile_id, time()+60*60*24*365, '/', 'www.fostergem.com');
	setcookie('profile_pic', $profile_pic, time()+60*60*24*365, '/', 'www.fostergem.com');
	setcookie('fname', $fname, time()+60*60*24*365, '/', 'www.fostergem.com');
	
	setcookie('login_email', $email, time()+60*60*24*365, '/', 'www.bookmarks.fostergem.com');
	setcookie('password_login',$password, time()+60*60*24*365, '/', 'www.bookmarks.fostergem.com');
	setcookie('profile_id', $profile_id, time()+60*60*24*365, '/', 'www.bookmarks.fostergem.com');
	setcookie('profile_pic', $profile_pic, time()+60*60*24*365, '/', 'www.bookmarks.fostergem.com');
	setcookie('fname', $fname, time()+60*60*24*365, '/', 'www.bookmarks.fostergem.com');
	
	setcookie('login_email', $email, time()+60*60*24*365, '/', 'bookmarks.fostergem.com');
	setcookie('password_login',$password, time()+60*60*24*365, '/', 'bookmarks.fostergem.com');
	setcookie('profile_id', $profile_id, time()+60*60*24*365, '/', 'bookmarks.fostergem.com');
	setcookie('profile_pic', $profile_pic, time()+60*60*24*365, '/', 'bookmarks.fostergem.com');
	setcookie('fname', $fname, time()+60*60*24*365, '/', 'bookmarks.fostergem.com');
?>