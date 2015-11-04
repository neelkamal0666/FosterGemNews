<?php 
$profile_link=SITE_URL."/profile/";
 if($row_friends_activities_query['activity']=='added_a_new_friend')  { 
  $user1_info=get_user_info($row_friends_activities_query['profile_ida']);
  $user2_info=get_user_info($row_friends_activities_query['profile_idb']);
 ?> 
<div class="media">
  <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
    <img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>"  width="64" height="64">
  </a>
     <div class="media-body">
           <h5 class="media-heading"><a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> <?php if ($row_friends_activities_query['profile_idb']==$_SESSION['profile_id']) {?> is now following you <?php }  else {?>is now following 
		   <a href="<?php echo $profile_link.$row_friends_activities_query['profile_idb'];?>"><?php echo $user2_info['fname'].' '.$user2_info['lname'];?></a>
		  <?php } ?> 
		   </h5>
		    <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?></p>
     </div>
</div>
<?php  //*******************************start of new channel following code********************
 } else if($row_friends_activities_query['activity']=='followed_a_new_topic')  { 
$user1_info=get_user_info($row_friends_activities_query['profile_ida']);
$topic_details=get_topic_details($row_friends_activities_query['profile_idb']); ?>

<div class="media">
  <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
    <img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
  </a>
     <div class="media-body">
           <h5 class="media-heading"><a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> is now following 
		   <a href="<?php echo SITE_URL;?>/topic/<?php echo str_replace(' ','-',$topic_details['name']);?>"><?php echo  $topic_details['name']; ?></a>
		   </h5>
		    <p><i class="icon-time"></i> <?php echo parse_date($row_friends_activities_query['date']); ?></p>
     </div>
</div>



  <?php } else if($row_friends_activities_query['activity']=='followed_a_new_website')  { 
        $user1_info=get_user_info($row_friends_activities_query['profile_ida']);
		$website_details=get_website_details($row_friends_activities_query['profile_idb']);
		?> 
	<div class="media">
	  <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
		<img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
	  </a>
		 <div class="media-body">
			   <h5 class="media-heading"><a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> is now following 
			   <a href="<?php echo SITE_URL; ?>/website/<?php echo str_replace(' ','-',$website_details['website']); ?>"><?php echo $website_details['website']; ?></a>
			   </h5>
				<p><i class="icon-time"></i> <?php echo parse_date($row_friends_activities_query['date']); ?></p>
		 </div>
	</div>

<?php } else if($row_friends_activities_query['activity']=='website_post')  {
 
  $row_web_post = get_website_posts($row_friends_activities_query['activity_tracker']);
  $website_details = get_website_details($row_friends_activities_query['profile_idb']);
?>
 <div class="media">
	  <a class="pull-left" href="<?php echo SITE_URL; ?>/website/<?php echo str_replace(' ','-',$website_details['website']); ?>">
		<img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/website/<?php echo $website_details['dp']; ?>" alt="..." width="64" height="64">
	  </a>
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo SITE_URL; ?>/website/<?php echo str_replace(' ','-',$website_details['website']); ?>"><?php echo $website_details['website']; ?></a> added a new post.
			   </h5>
			   <p><a href="<?php  echo $row_web_post['url']; ?>" target="_blank"><?php echo $row_web_post['title']; ?></a></p>
			   <p><?php echo $row_web_post['description']; ?></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?></p>
		 </div>
		 <?php if($_SESSION['logged'] == true) {
		 vote_up($row_friends_activities_query['activity_tracker'],'website',$row_friends_activities_query['profile_idb']);
		 }
		 ?>
	</div>
 
 		
		
<?php		 } /*******************************************code for profile_picture change*************************************************/
		 else if($row_friends_activities_query['activity']=='changed_profile_picture') { 
		 $user1_info=get_user_info($row_friends_activities_query['profile_ida']);
		 ?>
		 <div class="media">
	     <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
		 <img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
	     </a>
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> changed <?php  if($user1_info['gender']=='f') { echo 'her '; } else { echo 'his '; } ?> profile picture.
			   </h5>
			   <?php 
		$image=SITE_URL."uploaded/profile_pic/profile_pic/".$user1_info['profile_pic'];
		$size = getimagesize($image);
		$width = $size[0];
		?>
			   <p><img src="<?php echo $image; ?>" <?php if($width>300){?>  height="300px" width="300px";<?php } ?>/></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?></p>
		 </div>
		
	</div>
		 
		 
		 <?php	 /*******************************************code for photo*************************************************/
		 } else if($row_friends_activities_query['activity']=='shared_new_photo') { 
		 $user1_info=get_user_info($row_friends_activities_query['profile_ida']);
		 $photo = get_shared_photo_details($row_friends_activities_query['activity_tracker']);
		 ?>
		 <div class="media">
	     <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
		 <img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
	     </a>
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> shared a new photo.
			   </h5>
			   <?php 
		$image=$photo['photo_url'];
		$size = getimagesize($image);
		$width = $size[0];
		?>
			   <p><img src="<?php echo $image; ?>" <?php if($width>600){?> width="600";<?php } ?>/></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?></p>
		 </div>
		<?php if($_SESSION['logged'] == true) {
		 vote_up($row_friends_activities_query['activity_tracker'],'photos',$row_friends_activities_query['profile_ida']);
		 }
		 ?>
		 <br />
	</div>
		 
		 
		<?php /****************************code for notes********************************************************/ 
		 }  else if($row_friends_activities_query['activity']=='notes') {  
  $user1_info=get_user_info($row_friends_activities_query['profile_ida']);	 
  $row_notes = get_user_note($row_friends_activities_query['activity_tracker']);
		 ?>
	  <div class="media">
	  <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
		<img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
	  </a>
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> shared a new note.
			   </h5>
			   <p><a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>/note/<?php  echo $row_notes['id']; ?>" target="_blank"><?php echo $row_notes['title']; ?></a></p>
			   <p><?php echo $row_notes['note']; ?></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?></p>
		 </div>
		 <?php if($_SESSION['logged'] == true) {
		 vote_up($row_friends_activities_query['activity_tracker'],'notes',$row_friends_activities_query['profile_ida']);
		 }
		 ?>
		 <br />
	</div>
<?php  } else if($row_friends_activities_query['activity']=='bookmarked_link') { 
	$user1_info=get_user_info($row_friends_activities_query['profile_ida']);
	$row_bookmark = get_user_bookmark($row_friends_activities_query['activity_tracker']);
    if(check_following($_SESSION['profile_id'], $row_friends_activities_query['profile_ida'],'user') || $row_friends_activities_query['profile_ida']==$_SESSION['profile_id'] || $row_friends_activities_query['profile_ida'] == $_REQUEST['profile_id']) { 
 ?>
  <div class="media">
	  <a class="pull-left" href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>">
		<img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/profile_pic/profile/<?php echo $user1_info['profile_pic']; ?>" alt="..." width="64" height="64">
	  </a> 
	  
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a> shared a link.
			   </h5> 		   
			   <p><?php echo $row_bookmark['title']; ?></p>
			   <p><a href="<?php echo $row_bookmark['url']; ?>" target="_blank"><?php echo $row_bookmark['url']; ?></a></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?> 
			   <?php feed_conversation_icons($row_friends_activities_query['profile_ida'],$row_friends_activities_query['activity_tracker'],"bookmark");?></p>
			    <?php feed_comments($row_friends_activities_query['profile_ida'],$row_friends_activities_query['activity_tracker'],"bookmark");
				$tags = get_tags($row_friends_activities_query['activity_tracker'],'bookmark');
				show_tags($tags); ?>
		 </div>
		<?php if($_SESSION['logged'] == true) {
		vote_up($row_friends_activities_query['activity_tracker'],'bookmark',$row_friends_activities_query['profile_ida']);
		} 
		?>
	</div>
 
 <?php  } else { // *****************************************for showing topic updates ***********************
 $user1_info=get_user_info($row_friends_activities_query['profile_ida']);
 $row_bookmark = get_user_bookmark($row_friends_activities_query['activity_tracker']);
 $topic_details=get_topic_details($row_friends_activities_query['profile_idb']); 
  ?>
 
 <div class="media">
	  <a class="pull-left" href="<?php echo SITE_URL; ?>/topic/<?php echo str_replace(' ','-',$topic_details['name']); ?>">
		<img class="media-object" src="<?php echo SITE_URL; ?>/uploaded/topics/<?php echo $topic_details['dp']; ?>" alt="..." width="64" height="64">
	  </a>
		 <div class="media-body">
			   <h5 class="media-heading">
			   <a href="<?php echo SITE_URL; ?>/topic/<?php echo str_replace(' ','-',$topic_details['name']); ?>"><?php echo $topic_details['name'];  ?></a> : new link added by <a href="<?php echo $profile_link.$row_friends_activities_query['profile_ida'];?>"><?php echo $user1_info['fname'].' '.$user1_info['lname'];?></a>.
			   </h5>
			   <p><?php echo $row_bookmark['title']; ?></p>
			   <p><a href="<?php echo $row_bookmark['url']; ?>" target="_blank"><?php echo $row_notes['url']; ?></a></p>
			   <p><i class="icon-time"></i>  <?php echo parse_date($row_friends_activities_query['date']); ?> </p>
		 </div>
		 <?php if($_SESSION['logged'] == true) {
		 vote_up($row_friends_activities_query['activity_tracker'],'bookmark',$row_friends_activities_query['profile_ida']);
		 } ?>
	</div>
 
 <?php }
 
 } ?>
		     
	
		 
	