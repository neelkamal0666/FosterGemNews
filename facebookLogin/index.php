<?php
    include_once "fbaccess.php";
	require_once('../config/globals.php');
require_once('../lib/db_connect.php');
	 function checkUser($oauth_provider,$uid,$name,$email,$fname,$mname,$lname,$gender,$dob,$fb_frnd,$education,$home_town,$location,$about_me,$interested_in,$relationship_status,$movies,$music,$tv,$books,$work) 
	{
        $query = "select u_id from users where email='".$email."' OR (oauth_provider='".$oauth_provider."' AND oauth_uid='".$uid."' )";
		connect_db();
		$result=mysql_query($query);
        $row = mysql_fetch_array($result);
           $p_id=$row['u_id'];
        
        if (!empty($row)) {
		   connect_db();
           $query = mysql_query("SELECT email,name,fname,lname,gender FROM ".DB_PREFIX."users where u_id=$p_id");
            $row1 = mysql_fetch_array($query);
            $_SESSION['u_id']=$p_id;
            $_SESSION['fname']=$row1['fname'];
            $_SESSION['lname']=$row1['lname'];
            $_SESSION['login_email']=$row1['email'];
			$_SESSION['gender']=$row1['gender'];
	        $_SESSION['name']=$row1['name'];
			$_SESSION['about_me']=$about_me;
			$_SESSION['interested_in']=$interested_in;
			$_SESSION['relationship_status']=$relationship_status;
			$_SESSION['movies']=$movies;
			$_SESSION['music']=$music;
			$_SESSION['tv']=$tv;
			$_SESSION['books']=$books;
            $_SESSION['logged']=true;
			 
			header("location:../profile.php?u_id={$p_id}");
        } else {
            #user not present. Insert a new Record
			
			
			
			$query1="insert into users set oauth_provider='".$oauth_provider."',oauth_uid='".$uid."',name='".$name."',fname='".$fname."',mname='".$mname."',lname='".$lname."',email='".$email."',dob='".$dob."',gender='".$gender."',fb_friend_count='".$fb_frnd."',home_town='".$home_town."',current_city='".$location."',about_me='".$about_me."',interested_in='".$interested_in."',relationship_status='".$relationship_status."'";
			
			connect_db();
			$res1=mysql_query($query1);
           
          $profile_id=mysql_insert_id();
            $_SESSION['u_id']= $profile_id;
            $_SESSION['fname']=$fname;
            $_SESSION['lname']=$lname;
             $_SESSION['login_email']=$email;
			 $_SESSION['gender']=$gender;
			 
			   if(isset($education)) {
			  foreach($education as $school)
							{
							    $name=$school['school']['name'];
								$year=$school['year']['name'];
								$type=$school['type'];
							    $query = mysql_query("INSERT INTO users_education (u_id,name,year,type) VALUES ($profile_id,'$name','$year','$type')") or die(mysql_error());
								 											
							} }
			 
			    if(isset($work)) {
			  foreach($work as $works)
							{
							    $name=$works['employer']['name'];
								$position=$works['position']['name'];
							    $query = mysql_query("INSERT INTO users_works (u_id,company,position) VALUES ($profile_id,'$name','$position')") or die(mysql_error());
								 											
							} }
			 
			 
			  if(isset($movies['data'])) {
			  foreach($movies['data'] as $data)
							{
							    $name=$data['name'];	
							    $query = mysql_query("INSERT INTO users_movies (u_id,movie) VALUES ($profile_id,'$name')") or die(mysql_error());
								 											
							} }
							  if(isset($music['data'])) {
							 foreach($music['data'] as $data)
							{
							    $name=$data['name'];	
							    $query = mysql_query("INSERT INTO users_music (u_id,music) VALUES ($profile_id,'$name')") or die(mysql_error());
								 											
							} }
							  if(isset($tv['data'])) {
							foreach($tv['data'] as $data)
							{
							    $name=$data['name'];	
							    $query = mysql_query("INSERT INTO users_tv_shows (u_id,tv_show) VALUES ($profile_id,'$name')") or die(mysql_error());
								 											
							} }
							  if(isset($books['data'])) {
			 foreach($books['data'] as $data)
							{
							    $name=$data['name'];	
							    $query = mysql_query("INSERT INTO users_books (u_id,book) VALUES ($profile_id,'$name')") or die(mysql_error());
								 											
							} }
			 
			 
			 
	       
             $_SESSION['logged']=true;
			
           header("location:../interests.php?u_id={$profile_id}");
        }
        return 0;
    }

    
	
	
	
 if(!$user) { 
header("location:{$loginUrl}");
 } else {
 
							
						if(isset($user_info['gender'])) {	if($user_info['gender']=='male') {$profile_pic='profile_pic_male.png';
							                                  $gender='m';
							                                  } else {  $profile_pic='profile_pic_female.png';
															           $gender='f';
															         }
														}
																	 
			
				if(isset($user_info['bio'])) { $about=$user_info['bio'];} else { $about='No Description Found';}
					if(isset($movies)) { $movies=$movies;} else { $movies='No movie Found';}
		
																	 
 checkUser('facebook',$user,$user_info['name'],$user_info['email'],$user_info['first_name'],$user_info['middle_name'],$user_info['last_name'],$user_info['gender'],$user_info['birthday'],count($friends_list['data']),$user_info['education'],$user_info['hometown']['name'],$user_info['location']['name'],$about,$user_info['interested_in'][0],$user_info['relationship_status'],$movies,$music,$tv,$books,$user_info['work']);
   } 
  ?>

