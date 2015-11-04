var SITE_URL="http://fostergem.com";
function submitNewLink(){
		var data_string = {};
 		data_string.url = $("#new_link").val();
 		data_string.access = $("#access").val();
 		data_string.profile_id =  window.localStorage.getItem("profile_id");
 		data_string.AccessKey =  window.localStorage.getItem("AccessKey");
 		data_string.SecretKey = window.localStorage.getItem("SecretKey");
 		data_string.toread = $('input[name=toread]:checked').val();
 		data_string.comment =$('#comment').val();
 		data_string.tags =$("#tagged_value").val();
 		var dataString = JSON.stringify(data_string);
	$("#add_new_link_rem").replaceWith('<div id="add_new_link_rem"><center><img src="'+SITE_URL+'/images/ajax-loader.gif" /></center></div>');
	$("#add_link").remove();
	var server='http://dbapi.fostergem.com/bookmarkApi/bookmark';
	 $.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) {
			  console.log(msg);
				var res = JSON.parse(msg);
				if(res.Status === 'Successfully Bookmarked'){
				  $("#add_new_link_rem").replaceWith('<h5><center>Link added successfully.</center></h5>');
				  $("#link_cancel").replaceWith('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
				} else {
					 $("#add_new_link_rem").replaceWith('<h5><center>Error in adding link! Please try again.</center></h5>');
					  $("#link_cancel").replaceWith('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
					}
			}
        });
	 return false;	
}
function addNewWebsite() {
var server=SITE_URL+'/layout/popups/add_new_website.php';
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		 $("#add_new_website_content").replaceWith('<div class="modal-dialog" id="add_new_website_content">'+msg+'</div>');
		  getCategory();
			}
        });
        //return false; // <--- important, prevents the link's href (hash in this example) from executing.
      }
function addNewTopic() {
var server=SITE_URL+'/layout/popups/add_new_topic.php';
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		 $("#add_new_topic_content").replaceWith('<div class="modal-dialog" id="add_new_topic_content">'+msg+'</div>');
		  getCategory();
			}
        });
        //return false; // <--- important, prevents the link's href (hash in this example) from executing.
      }
function getCategory(){
	var id =0;
	var server="http://dbapi.fostergem.com/v1/getTopicCategory/"+window.localStorage.getItem("profile_id")+"/"+id+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		  var res = JSON.parse(msg);
			   if(res.Status =='Success'){
					var i = 0;
					for(var prop in res.Category) {
				  		if (res.Category.hasOwnProperty(prop)) {
							$("#category").append('<option value="'+res.Category[i]["id"]+'">'+res.Category[i]["name"]+'</option>');
						}
						i++;
					}
			   }
			}
       });
        //return false; // <--- important, prevents the link's href (hash in this example) from executing.
	}
function showNotification() {
$("#drop_down_menu_content").replaceWith('<ul class="dropdown-menu" id="drop_down_menu_content"><center><br /><br /><img src="'+SITE_URL+'/images/ajax-loader.gif" /><br /><br /></center></ul>');	
var server=SITE_URL+'/layout/popups/notifications.php';
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		  $("#drop_down_menu_content").replaceWith('<ul class="dropdown-menu" id="drop_down_menu_content">'+msg+'</ul>');
		   }
        });
        //return false; // <--- important, prevents the link's href (hash in this example) from executing.
      }

function follow(id,type) {
	$("#"+id).replaceWith('<button class="btn" style="float:right;" id="'+id+'">Wait</button>');
	var server="http://api.fostergem.com/v1/follow/"+window.localStorage.getItem("profile_id")+"/"+type+"/"+id+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		   		var res = JSON.parse(msg);
			   if(res.Status =='Success'){
		  		$("#"+id).replaceWith('<button class="btn" style="float:right;" id="'+id+'" onClick="unfollow('+id+',"'+type+'");>Unfollow</button>');
			   }
			}
        });
	return false;
	}
function unfollow(id,type) {
	$("#"+id).replaceWith('<button class="btn" style="float:right;" id="'+id+'">Wait</button>');
	var server="http://api.fostergem.com/v1/unFollow/"+window.localStorage.getItem("profile_id")+"/"+type+"/"+id+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
				var res = JSON.parse(msg);
				if(res.Status =='Success'){
				  $("#"+id).replaceWith('<button class="btn btn-primary" style="float:right;"  id="'+id+'" onClick="follow('+id+',"'+type+'");>Follow</button>');
				}
			}
        });
	return false;
	}

function addTopic() {
	var data_string = {};
 		data_string.topic = $("#new_topic").val();
 		data_string.cat = $("#category").val();
 		data_string.profile_id =  window.localStorage.getItem("profile_id");
 		data_string.AccessKey =  window.localStorage.getItem("AccessKey");
 		data_string.SecretKey = window.localStorage.getItem("SecretKey");
 		var dataString = JSON.stringify(data_string);
		if($("#new_topic").val() =='' || $("#topic_cat").val() == 'choose relevent category'){
			return false;
			}
		$("#add_new_topic_main").replaceWith('<div id="add_new_topic_main"><center><img src="'+SITE_URL+'/images/ajax-loader.gif" /></center></div>');
		$("#add_topic").remove();
		var server="http://dbapi.fostergem.com/v1/addNewTopic/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 	$.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) { 
			   var res = JSON.parse(msg);
			   if(res.Status =='Success'){
				$("#add_new_topic_main").replaceWith('<h5><center>Topics Added Successfully.</center></h5>');
				$("#topic_cancel").replaceWith('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
			   } else {
				   $("#add_new_topic_main").replaceWith('<h5><center>Some Error occured. Please try again!</center></h5>');
				   }
			}
        });
	 return false;
	}
	
	function addWebsite() {
		var data_string = {};
 		data_string.website = $("#new_website").val();
 		data_string.cat = $("#category").val();
		data_string.website_url = $("#website_url").val();
		data_string.rss_link = $("#rss_link").val();
 		data_string.profile_id =  window.localStorage.getItem("profile_id");
 		data_string.AccessKey =  window.localStorage.getItem("AccessKey");
 		data_string.SecretKey = window.localStorage.getItem("SecretKey");
 		var dataString = JSON.stringify(data_string);
		if($("#new_website").val() =='' || $("#website_cat").val() == 'choose relevent category' || $("#rss_link").val() =='' ){
			return false;
			}
		$("#add_new_website_main").replaceWith('<div id="add_new_website_main"><center><img src="'+SITE_URL+'/images/ajax-loader.gif" /></center></div>');
		$("#add_website").remove();
		var server="http://dbapi.fostergem.com/v1/addNewWebsite/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) { 
		  var res = JSON.parse(msg);
			   if(res.Status =='Success'){
				 $("#add_new_website_main").replaceWith('<h5><center>website added successfully</center></h5>');
		 		 $("#website_cancel").replaceWith(' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
			   } else {
				   $("#add_new_website_main").replaceWith('<h5><center>Some Error occured. Please try again!</center></h5>');
				   }
			}
        });
	 return false;
	}
	 function addCommentBox() {
				var id=$(this).attr("id");
				var stream_id="comment_box_input_"+id;
				$("#"+stream_id).replaceWith('<div class="well"><div id="comment_append_'+id+'"></div><div id="addComment_'+id+'" class="addComment"><form method="post"><input type="text" class="form-control" name="comment" id="comment_'+id+'" /><input type="submit" name="submit" class="submit_comment" id="submit_comment_'+id+'" value=""; style="visibility:hidden" /></form>		<div> </div>');

				return false; // <--- important, prevents the link's href (hash in this example) from executing.
     		 }
			function commentSubmit(){
			
				return false;
	}
function voteUp() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id"); 		
	var server="http://api.fostergem.com/v1/voteUp/"+window.localStorage.getItem("profile_id")+"/"+$(this).attr("profile_id")+"/"+$(this).attr("type")+"/"+$(this).attr("post_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	$.ajax({
      url: server,
      method: 'GET',
      cache: true,
      success: function(msg) {
		var res = JSON.parse(msg);
		if(res.Status =='Success'){
			$("#"+id).replaceWith('<div class="arrow-up-voted" id="vote_up_'+type+'_'+post_id+'"  type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"></div>');
			var count = $("#vote_count_"+type+"_"+post_id).attr("count");
			var new_count =+count+1;
			$("#vote_count_"+type+"_"+post_id).replaceWith('<div class="vote_count" id="vote_count_'+type+'_'+post_id+'"><center>'+new_count+'</center></div>');
		}
	}
        });
	return false;
}
function voteDown() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id");
	var server="http://api.fostergem.com/v1/voteDown/"+window.localStorage.getItem("profile_id")+"/"+$(this).attr("profile_id")+"/"+$(this).attr("type")+"/"+$(this).attr("post_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) {
			var res = JSON.parse(msg);
			if(res.Status =='Success'){
		  	$("#"+id).replaceWith('<div class="arrow-down-voted" id="vote_down_'+type+'_'+post_id+'"  type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"></div>');
			}
		  }
        });
	 return false;
	}
function cancelVoteUp() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id");
	var server="http://api.fostergem.com/v1/cancelVoteUp/"+window.localStorage.getItem("profile_id")+"/"+$(this).attr("profile_id")+"/"+$(this).attr("type")+"/"+$(this).attr("post_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) {
			var res = JSON.parse(msg);
			if(res.Status =='Success'){
		  	$("#"+id).replaceWith('<div class="arrow-up" id="vote_up_'+type+'_'+post_id+'" type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"></div>');
			var count = $("#vote_count_"+type+"_"+post_id).attr("count");
			var new_count =+count-1;
			$("#vote_count_"+type+"_"+post_id).replaceWith('<div class="vote_count" id="vote_count_'+type+'_'+post_id+'"><center>'+new_count+'</center></div>');
			}
			}
        });
	 return false;
	}
function cancelVoteDown() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id");
	var server="http://api.fostergem.com/v1/cancelVoteDown/"+window.localStorage.getItem("profile_id")+"/"+$(this).attr("profile_id")+"/"+$(this).attr("type")+"/"+$(this).attr("post_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) {
			 var res = JSON.parse(msg);
			if(res.Status =='Success'){
		  	$("#"+id).replaceWith('<div class="arrow-down" id="vote_down_'+type+'_'+post_id+'" type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"></div>');
			}
		  }
        });
	 return false;
	}
function readLater() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id");
	var server=SITE_URL+'/lib/ajax_call/read_later.php';
    var dataString="post_id="+post_id+"&type="+type+"&profile_id="+profile_id;
	 $.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) {
		  	$("#"+id).replaceWith('<a class="mark_read" id="'+id+'" type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"><i class="icon-save"> Mark As Read</i></a>');
			}
		});
	 return false;
	}
	function markRead() {
	var post_id = $(this).attr("post_id");
	var type = $(this).attr("type");
	var profile_id = $(this).attr("profile_id");
	var id=$(this).attr("id");
	var server=SITE_URL+'/lib/ajax_call/mark_read.php';
    var dataString="post_id="+post_id+"&type="+type+"&profile_id="+profile_id;
	 $.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) {
		  	$("#"+id).replaceWith('<a class="read_later" id="'+id+'" type="'+type+'" post_id="'+post_id+'" profile_id="'+profile_id+'"><i class="icon-save"> Read Later</i></a>');
			}
        });
	 return false;
	}
function profile_page_follower(){
	$("#profile_follower").css({'color':'#000000'});
	$("#profile_following").css({'color':'#428bca'});
	$("#profile_topics").css({'color':'#428bca'});
	$("#profile_websites").css({'color':'#428bca'});
	$('#news_feed_content').replaceWith('<div class="news_feed_content" id="news_feed_content"></div>');
	scroll_count =0;
	feed_count = 0;
	followersFollowingAPICall('user',scroll_count,feed_count,'followers');
	}
function profile_page_following(){
	$("#profile_following").css({'color':'#000000'});
	$("#profile_follower").css({'color':'#428bca'});
	$("#profile_topics").css({'color':'#428bca'});
	$("#profile_websites").css({'color':'#428bca'});
	$('#news_feed_content').replaceWith('<div class="news_feed_content" id="news_feed_content"></div>');
	scroll_count =0;
	feed_count = 0;
	followersFollowingAPICall('user',scroll_count,feed_count,'followings');
	}
function profile_page_topic(){
	$("#profile_topics").css({'color':'#000000'});
	$("#profile_follower").css({'color':'#428bca'});
	$("#profile_following").css({'color':'#428bca'});
	$("#profile_websites").css({'color':'#428bca'});
	$('#news_feed_content').replaceWith('<div class="news_feed_content" id="news_feed_content"></div>');
	scroll_count =0;
	feed_count = 0;
	followersFollowingAPICall('topic',scroll_count,feed_count,'followings');
	}
function profile_page_website(){
	$("#profile_websites").css({'color':'#000000'});
	$("#profile_follower").css({'color':'#428bca'});
	$("#profile_following").css({'color':'#428bca'});
	$("#profile_topics").css({'color':'#428bca'});
	$('#news_feed_content').replaceWith('<div class="news_feed_content" id="news_feed_content"></div>');
	scroll_count =0;
	feed_count = 0;
	followersFollowingAPICall('website',scroll_count,feed_count,'followings');
	}
function followersFollowingAPICall(type,scroll_count,feed_count,follow_type){
	var profile_p=window.location.pathname.substring(1);
	var profile_p_explode=profile_p.split("/");
	var id = profile_p_explode[1];
	var first_id = (scroll_count*20);
	var last_id = 20;
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
	if(follow_type == 'followers'){
	var server="http://api.fostergem.com/v1/getFollowers/"+profile_id+"/"+type+"/"+id+"/"+first_id+"/"+last_id+"/"+AccessKey+"/"+SecretKey;
	} else {
	var server="http://api.fostergem.com/v1/getFollowings/"+profile_id+"/"+type+"/"+id+"/"+first_id+"/"+last_id+"/"+AccessKey+"/"+SecretKey;
		}
	$('#news_feed_loader_pic').replaceWith('<div id="news_feed_loader_pic"><center><img src="'+SITE_URL+'/images/ajax-loader.gif" /><br /><br /><h3>Loading.</h3></center></div>');
  var request = $.ajax({
       	url: server,
		method: 'GET',
        cache :true,
        success: function(responseData) {
			$('#news_feed_loader_pic').replaceWith('<div id="news_feed_loader_pic"></div>');
             var res = JSON.parse(responseData);
			 var c ='';
			if(res.Status == 'Success'){
				var i = 0;
				if(follow_type == 'followers'){
					var msg = 'No Followers';
					var msg1= 'No More Followers';
					for(var prop in res.Followers) {
					  if (res.Followers.hasOwnProperty(prop)) {	
						c += prepareFollowersUI(res.Followers[i]);
						feed_count++;
					  }
					  i++;
					}
				} else {
					var msg = '';
					var msg1= '';
					for(var prop in res.Followings) {
					  if (res.Followings.hasOwnProperty(prop)) {
						  if(type == 'user'){
						c += prepareFollowersUI(res.Followings[i]);
						  } else if(type == 'topic'){
							 c += prepareTopicFollowingsUI(res.Followings[i]); 
							  } else {
								 c += prepareWebsiteFollowingsUI(res.Followings[i]);   
								  }
						feed_count++;
					  }
					  i++;
					}
					}
				
			}
			
			$('#news_feed_content').append(c);
			if(feed_count == 0) {
				$('#news_feed_loader_pic').replaceWith('<div id="news_feed_loader_pic"><div class="alert alert-info"><center>'+msg+'.</center></div></div>');
			} else if(feed_count < (scroll_count*20)){
				$('#news_feed_loader_pic').replaceWith('<div id="news_feed_loader_pic"><div class="alert alert-info"><center>'+msg1+'.</center></div></div>');
			}
			
			$(window).scroll(function(){
					if ($(window).scrollTop() == $(document).height() - $(window).height()){
						if(feed_count > (((scroll_count+1) * 20) -1) ) {
							scroll_count = scroll_count + 1;
							if(request && request.readyState !== 4){
								return request;
							}
							followersAPICall(type,scroll_count,feed_count);
						}
					}
				});

			}
		});
  return false;
	}
function prepareTopicFollowingsUI(data){
	if(data['IsFollowing'] == 0){
		var d = '<button class="btn btn-primary pull-right" id="'+data['topic_details']['id']+'" onClick="follow('+data['topic_details']['id']+',&#34;topic&#34;)">Follow</button>';
		} else {
		var d = '<button class="btn pull-right"  id="'+data['topic_details']['id']+'" onClick="unfollow('+data['topic_details']['id']+',&#34;topic&#34;)">Unfollow</button>';	
			}
			var c = '<div class="media">'+
 				'<a class="pull-left" href="'+SITE_URL+'/topic/'+data["topic_details"]["name"].replace(/ /gi,"-")+'">'+
    			'<img class="media-object" src="'+SITE_URL+'/uploaded/topic/'+data["topic_details"]["dp"]+'" alt="..." width="64" height="64">'+
  				'</a>'+
				'<div class="media-body">'+
					'<h5 class="media-heading"><a href="'+SITE_URL+'/topic/'+data["topic_details"]["name"].replace(/ /gi,"-")+'">'+data["topic_details"]["name"]+'</a>'+ 
					'</h5>'+
					d+
				'</div>'+
			'</div>';
	return c;	
	}
function prepareWebsiteFollowingsUI(data){
	if(data['IsFollowing'] == 0){
		var d = '<button class="btn btn-primary pull-right" id="'+data['website_details']['id']+'" onClick="follow('+data['website_details']['id']+',&#34;website&#34;)">Follow</button>';
		} else {
		var d = '<button class="btn pull-right"  id="'+data['website_details']['id']+'" onClick="unfollow('+data['website_details']['id']+',&#34;website&#34;)">Unfollow</button>';	
			}
			var c = '<div class="media">'+
 				'<a class="pull-left" href="'+SITE_URL+'/topic/'+data["website_details"]["website"].replace(/ /gi,"-")+'">'+
    			'<img class="media-object" src="'+SITE_URL+'/uploaded/website/'+data["website_details"]["dp"]+'" alt="..." width="64" height="64">'+
  				'</a>'+
				'<div class="media-body">'+
					'<h5 class="media-heading"><a href="'+SITE_URL+'/website/'+data["website_details"]["website"].replace(/ /gi,"-")+'">'+data["website_details"]["website"]+'</a>'+ 
					'</h5>'+
					d+
				'</div>'+
			'</div>';
	return c;	
	}
function prepareFollowersUI(data){
	if(window.localStorage.getItem("profile_id") == data['user_details']['profile_id']){
		var d ='';
	} else {
	if(data['IsFollowing'] == 0){
		var d = '<button class="btn btn-primary pull-right" id="'+data['user_details']['profile_id']+'" onClick="follow('+data['user_details']['profile_id']+',&#34;user&#34;)">Follow</button>';
		} else {
		var d = '<button class="btn pull-right"  id="'+data['user_details']['profile_id']+'" onClick="unfollow('+data['user_details']['profile_id']+',&#34;user&#34;)">Unfollow</button>';	
			}
	}
	if(data['user_details']['gender'] == 'm'){
		var g= 'Male';
		} else {
			var g = 'Female';
			}
	var c = '<div class="media">'+
 				'<a class="pull-left" href="'+SITE_URL+'/profile/'+data['user_details']['profile_id']+'">'+
    			'<img class="media-object" src="'+SITE_URL+'/uploaded/profile_pic/profile/'+data['user_details']['profile_pic']+'"  width="64" height="64">'+
  				'</a>'+
				'<div class="media-body">'+
					'<h5 class="media-heading"><a href="'+SITE_URL+'/profile/'+data['user_details']['profile_id']+'">'+data['user_details']['fname']+ ' ' +data['user_details']['lname']+'</a>'+ 
					'</h5>'+
					d+
					'<p>'+g+'</p>'+
				'</div>'+
			'</div>';
	return c;	
}


	jQuery(document).ready(function() {
		$("#show_notification").click(showNotification);
		$("#add_new_website").click(addNewWebsite);
		$("#Logout").click(logout);
		$("#add_new_topic").click(addNewTopic);
		$("#profile_page_follower").click(profile_page_follower);
		$("#profile_page_following").click(profile_page_following);
		$("#profile_page_topics").click(profile_page_topic);
		$("#profile_page_websites").click(profile_page_website);
		$(".arrow-up").click(voteUp);
		$(".arrow-down").click(voteDown);
		$(".arrow-up-voted").click(cancelVoteUp);
		$(".arrow-down-voted").click(cancelVoteDown);
	 });
	
$(document).ready(function(){
	$("#search").keyup(function() {
		var searchbox = $(this).val();
		var dataString = 'searchword='+ searchbox;
		if(searchbox=='') {
		} else {
			$.ajax({
				type: "POST",
				url:"http://dbapi.fostergem.com/search.php",
				data: dataString,
				cache: false,
				success: function(html) {
					$("#display_header_search_result").html(html).show();
				}
			});
		}
		return false;    
	});
});

function passwordRecoveryIdenfityAccount(){
var email = $("#password_recovery_mail").val();	
var dataString = 'email='+ email;
		$.ajax({
				type: "POST",
				url: SITE_URL+"/lib/login_signup/password_recovery_identify_account.php",
				data: dataString,
				cache: false,
				success: function(html) {
					$("#password_recovery_div").html(html).show();
				}
			});
		return false;
}
function sendPasswordRecoveryLink(email){
	var dataString = 'email='+ email;
		$.ajax({
				type: "POST",
				url: SITE_URL+"/lib/login_signup/send_password_recovery_mail.php",
				data: dataString,
				cache: false,
				success: function(html) {
					$("#password_recovery_div").html(html).show();
				}
			});
		return false;
}
function updatePersonalInfo(){
	var data_string = {};
 		data_string.fname = $("#fname").val();
 		data_string.lname = $("#lname").val();
		data_string.bio = $("#bio").val();
		data_string.email = $("#email").val();
 		data_string.profile_id =  window.localStorage.getItem("profile_id");
 		data_string.AccessKey =  window.localStorage.getItem("AccessKey");
 		data_string.SecretKey = window.localStorage.getItem("SecretKey");
 		var dataString = JSON.stringify(data_string);
	if($("#fname").val() == '' || $("#email").val() == '') {
		$("#update_status").replaceWith('<div id="update_status" class="alert alert-danger"><center>First and Email cant be empty</center></div>');
		return false;
	}
	var server="http://dbapi.fostergem.com/v1/updatePersonalInfo/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'POST',
          data: dataString,
          cache: true,
          success: function(msg) { 
		  var res = JSON.parse(msg);
			if(res.Status =='Success'){
		  		$("#update_status").replaceWith('<div id="update_status" class="alert alert-info"><center>Updated Successfully.</center></div>');
			} else {
				$("#update_status").replaceWith('<div id="update_status" class="alert alert-danger"><center>'+res.Message+'</center></div>');
				}
			}
        });
	 return false;
}

function requestInvite(){
	var email =$("#emailAddress").val();
	var dataString = '{"EmailAddress":"'+ email+'"}';
	if(email == '' || email == ' '){
		return false;
		}
	if(validateEmail(email)==false){
		return false;
		}
		$.ajax({
				type: "POST",
				url: "http://dbapi.fostergem.com/v1/invitationRequest",
				data: dataString,
				cache: false,
				success: function(res) {
					$("#invite_section").replaceWith('<div style="padding-left:30%; padding-right:20%; margin-top:20px; color:"#000000;"" id="invite_section">'+res+'</div>');
				}
			});
		return false;
}
function requestInvite1(){
	var email =$("#email1").val();
	var dataString = '{"EmailAddress":"'+ email+'"}';
	if(email == '' || email == ' '){
		return false;
		}
	if(validateEmail(email)==false){
		return false;
		}
		$.ajax({
				type: "POST",
				url: "http://dbapi.fostergem.com/v1/invitationRequest",
				data: dataString,
				cache: false,
				success: function(res) {
					$("#invite_section1").replaceWith('<div style="padding-left:30%; padding-right:20%; margin-top:20px; color:"#000000;"" id="invite_section">'+res+'</div>');
				}
			});
		return false;
}

function userLogin(p){
	$("form").submit(function(e){
        e.preventDefault();
    });
    var backdrop = $('<div class="mb-popup-backdrop" id="mbmodal"><div class="mb-popup-wrapper"><div class="mb-popup-body mb-modal-body"><span>Authenticating </span></div><div class="mb-popup-body mb-modal-body-desc"><span id="confirm_msg">Please wait...</span></div><div class="mb-dlt-progress-wrap mb-dlt-progress" data-progress-percent=25><div class="mb-dlt-progress-bar mb-dlt-progress"></div></div><div class="mb-popup-footer" id="popupfooter"><span class="mb-leadeditbtn full"><a class="mb-okbutton" id="mbclosedelete" data-dismiss="modal"></a></span></div></div></div>');
    $('html').append(backdrop);
	var email = $("#login_email").val();
	var password = $("#login_password").val();
	var data_string = {};
	data_string.EmailAddress = email;
	data_string.Password = password;
	var dataString = JSON.stringify(data_string);
	$.ajax({
				type: "POST",
				url: "http://api.fostergem.com/v1/login",
				data: dataString,
				aync:false,
				cache: false,
				success: function(responseData) {
					var res = JSON.parse(responseData);
					if(res.Status == 'Error'){
							if(p=='login'){
								$("#login_error").replaceWith('<div id="login_error" class="alert alert-danger">Invalid Email or Password</div>');
							} else {
								window.location.href ='/login?msg=invalid_credentials';
								}
						} else {
							window.localStorage.setItem("AccessKey", res.access_key);
        					window.localStorage.setItem("SecretKey", res.secret_key);
        					window.localStorage.setItem("profile_id", res.profile_id);
							setCookie(email,password,res.profile_id,res.profile_pic,res.fname,res.lname);
							}
				}
			});
	return false;
	}
function setCookie(email,password,profile_id,profile_pic,fname,lname){
	var data_string = {};
	data_string.email = email;
	data_string.password = password;
	data_string.profile_id = profile_id;
	data_string.profile_pic = profile_pic;
	data_string.fname = fname;
    data_string.lname = lname;
	var dataString = JSON.stringify(data_string);
	$.ajax({
				type: "POST",
				url: "http://fostergem.com/lib/set_cookie.php",
				data: dataString,
				aync:false,
				cache: false,
				success: function(responseData) {
					window.location.href ='/home';
						}
			});
	}
window.onload=callonLoadFunctions;
function callonLoadFunctions(){
	getNotificationCount();
	getToReadCount();
	}
function getNotificationCount(){
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
		$.ajax({
				type: "GET",
				url: "http://dbapi.fostergem.com/v1/getNotificationCount/"+profile_id+"/"+AccessKey+"/"+SecretKey,
				cache: false,
				success: function(responseData) {
					var res = JSON.parse(responseData);
					if(res.Status == 'Success'){
							$("#notification_show").append(res.Count);
						} else {
							
							}
				}
			});
	}
function getToReadCount(){
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
		$.ajax({
				type: "GET",
				url: "http://dbapi.fostergem.com/v1/getToRead/"+profile_id+"/"+AccessKey+"/"+SecretKey,
				cache: false,
				success: function(responseData) {
					var res = JSON.parse(responseData);
					if(res.Status == 'Success'){
							$("#to_read_show").html(res.Count);
						} else {
							
							}
				}
			});
	}


function prepareChannelPageView(name,type){
	var id =0;
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
	var server="http://api.fostergem.com/v1/getDetails/"+profile_id+"/"+type+"/"+id+"/"+name+"/"+AccessKey+"/"+SecretKey;
  var request = $.ajax({
       	url: server,
		method: 'GET',
        cache :true,
        success: function(responseData) {
             var res = JSON.parse(responseData);
			 var c ='';
			if(res.Status == 'Success'){
				var i = 0;
				$('#'+type+'_dp').attr("src",SITE_URL+"/uploaded/"+type+"/"+res.Details["dp"]);
				if(res.Followers > 1){
					$('#followers_count').append(res.Followers+' Followers');
				} else {
					$('#followers_count').append(res.Followers+' Follower');
					}
				if(isFollowing(type,profile_id,id) ==0){
					$('#main_follow_btn').append('<h5><button class="btn btn-primary pull-right" id="'+res.Details["id"]+'" onClick="follow('+res.Details["id"]+',&#34'+type+'&#34)">Follow</button></h5>');
					} else {
						$('#main_follow_btn').append('<h5><button class="btn btn-default pull-right" id="'+res.Details["id"]+'" onClick="unfollow('+res.Details["id"]+',&#34'+type+'&#34)">Unfollow</button></h5>');
						}
						var scroll_count =0;
						var feed_count =0;
						feedApiCall(type,res.Details["id"]);
				
			}
		}
		});
	}

function isFollowing(type,profile_id,id){
    var AccessKey = window.localStorage.getItem("AccessKey");
    var SecretKey = window.localStorage.getItem("SecretKey");
    var server="http://api.fostergem.com/v1/isFollowing/"+profile_id+"/"+type+"/"+id+"/"+AccessKey+"/"+SecretKey;
    var request = $.ajax({
        url: server,
        method: 'GET',
        cache :true,
        success: function(responseData) {
            var res = JSON.parse(responseData);
            if(res.Status == 'Success') {
                return res.isFollowing;
            }
        }
    });
}

$(document).ready(function(){
		request = false;
		$("#tags").keyup(function() {
		
			if(request && request.readyState !== 4){
				request.abort();
			}
			request = searchTopics();	
			
		});
});
function searchTopics(){
	var key = $("#tags").val();
	var dataString = 'key='+ key;
	if(key===''){
		return false;
	} else {
		var request = $.ajax({
	        url: "http://dbapi.fostergem.com/bookmarkApi/resources/topic_hints.php",
			method: 'POST',
			cache:true,
	        data: dataString,
	        success: function(response) {
	            $("#display").html(response).show();	  
			  	jQuery(document).ready(function() {
					$(".tag_suggestion").click(addTag);
				});  
	
	        }
        
    	});
		return request;
	}
}

function addTag(flag) {
	var val ='';
	if(flag==1) {
		 val=$('#tags').val().trim();
	} else {
		 val=$(this).attr("id");
	}
	    $( "#tagged" ).append('<p class="tags" id="rem_'+val+'">'+val+'<a class="boxclose" id="boxclose" onClick="removeTag(&#39;'+val+'&#39;)"></a></p>');
		var new_tag = $("#tagged_value").val();
		if(new_tag ==='') {
		new_tag = val;
		} else {
		new_tag=new_tag+','+val;
		}
		$("#tagged_value").val(new_tag);
		$("#tags").val('');
		$("#display").replaceWith('<div id="display" style="clear:both;"></div>');
        return false; // <--- important, prevents the link's href (hash in this example) from executing.
      }
 function removeTag(rem_val) {
 		var old_tag = $("#tagged_value").val();
 		var res_arr = old_tag.split(",");
		var new_tag='';
		for (i=0;i<res_arr.length;i++) {
			if(res_arr[i] != rem_val ){
				if(new_tag==='') {
				new_tag = res_arr[i]; 
				} else {
				new_tag=new_tag+','+res_arr[i];
				}
			}
		}
		$("#tagged_value").val(new_tag);
		$( "#rem_" +rem_val).remove();
		
        return false; // <--- important, prevents the link's href (hash in this example) from executing.
      }
  jQuery(document).ready(function() {
		 $("#boxclose").click(removeTag);
      });         
 $('#tags').keypress(function(event){
 	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		 addTag(1);	
	}
 
});

function prepareProfileUI(type,id){
	var name ="null";
    $('#profile_stream').attr("href",SITE_URL+"/profile/"+id);
    $('#profile_about').attr("href",SITE_URL+"/profile/"+id+"/about");
    $('#profile_photos').attr("href",SITE_URL+"/profile/"+id+"/photos");
    $('#profile_notes').attr("href",SITE_URL+"/profile/"+id+"/notes");
    $('#profile_bookmarks').attr("href",SITE_URL+"/profile/"+id+"/bookmarks");
    $('#'+type).attr("class","active");
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
	var server="http://api.fostergem.com/v1/getDetails/"+profile_id+"/user/"+id+"/"+name+"/"+AccessKey+"/"+SecretKey;
  	var request = $.ajax({
       	url: server,
		method: 'GET',
        cache :true,
        success: function(responseData) {
             var res = JSON.parse(responseData);
			 var c ='';
			if(res.Status == 'Success') {
                var i = 0;
                $('#user_dp').replaceWith('<img id="user_dp" src="' + SITE_URL + '/uploaded/profile_pic/profile_pic/' + res.Details["profile_pic"] + '" width="240" height="220" />');
                $('#followers').append(res.Followers);
                $('#following').append(res.Following);
                $('#topics_followed').append(res.Topics);
                $('#website_followed').append(res.Websites);
                $('#full_name').append(res.Details.fname + ' '+res.Details.lname);
                if (id != profile_id) {
                    if (isFollowing(type,profile_id,id) == 0) {
                        $('#main_follow_btn').append('<h5><button class="btn btn-primary pull-right" id="' + id + '" onClick="follow(' + id + ',&#34user&#34)">Follow</button></h5>');
                    } else {
                        $('#main_follow_btn').append('<h5><button class="btn btn-default pull-right" id="' + id + '" onClick="unfollow(' + id + ',&#34user&#34)">Unfollow</button></h5>');
                    }
                }
						var scroll_count =0;
						var feed_count =0;
						if(type ==='about'){
							show_users_full_info(id);
						} else {
							feedApiCall(type,id);
							}
				
				
			}
		}
		});
	}

function show_users_full_info(id){
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
	var server="http://api.fostergem.com/v1/getUsersFullInfo/"+profile_id+"/"+id+"/"+AccessKey+"/"+SecretKey;
  	var request = $.ajax({
       	url: server,
		method: 'GET',
        cache :true,
        success: function(responseData) {
             var res = JSON.parse(responseData);
			 var c ='';
			if(res.Status == 'Success'){
				if(res.UserInfo['gender'] =='m'){
					var gen = 'Male';
					} else {
					var gen = 'Female';	
						}
			if(res.UserInfo['about_me']){
				var about_me = '<p>Bio : '+res.UserInfo['about_me']+'</p>';
				} else {
					var about_me ='';
					}
			if(res.UserInfo['company']){
				var company = '<p>Company : '+res.UserInfo['company']+'</p>';
				} else {
					var company ='';
					}
			if(res.UserInfo['school']){
				var school = '<p>Company : '+res.UserInfo['school']+'</p>';
				} else {
					var school ='';
					}
				if(res.UserInfo['college']){
				var college = '<p>College : '+res.UserInfo['college']+'</p>';
				} else {
					var college ='';
					}
		var c = '<div class="row">'+
					'<div class="well well-sm">'+
						'<b>Basic Information</b>'+
					'</div>'+
					'<p>Gender : '+gen+'</p>'+
					about_me+
					'<div class="well well-sm">'+
						'<b>Education & Work</b>'+
					'</div>'+
						company+
						college+
						school+
					
				'</div> ';
				$('#news_feed_content').append(c);
			}
		}
		});
	}
	
function accountSettings(){
	var profile_id = window.localStorage.getItem("profile_id");
	var AccessKey = window.localStorage.getItem("AccessKey");
	var SecretKey = window.localStorage.getItem("SecretKey");
	var server="http://api.fostergem.com/v1/getUsersFullInfo/"+profile_id+"/"+profile_id+"/"+AccessKey+"/"+SecretKey;
  	var request = $.ajax({
       	url: server,
		method: 'GET',
        cache :true,
        success: function(responseData) {
             var res = JSON.parse(responseData);
			 var c ='';
			if(res.Status == 'Success'){
			if(res.UserInfo['fname']){
				$("#fname").val(res.UserInfo['fname']);
				} 
			if(res.UserInfo['lname']){
				$("#lname").val(res.UserInfo['lname']);
				}
			if(res.UserInfo['email']){
				$("#email").val(res.UserInfo['email']);
				}
			if(res.UserInfo['about_me']){
				$("#bio").val(res.UserInfo['about_me']);
				} 
			}
		}
		});
	}

function prepareAllTopicsWebsitePage(type,p){
	$('#all_topics_websites').append('<div id="news_feed_loader_pic"><center><img src="'+SITE_URL+'/images/ajax-loader.gif" /></h3></center></div>');
	var server="http://dbapi.fostergem.com/v1/allTopicsWebsites/"+window.localStorage.getItem("profile_id")+"/"+type+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	 $.ajax({
          url: server,
          method: 'GET',
          cache: true,
          success: function(msg) { 
		  var res = JSON.parse(msg);
		  $("#news_feed_loader_pic").remove();
		  if(type == 'topic'){
			  var t = "Topics";
			  } else {
				  var t = 'Websites';
				  }
			   if(res.Status =='Success'){
					var i = 0;
					for(var prop in res.Data) {
				  		if (res.Data.hasOwnProperty(prop)) {
							$("#all_topics_websites").append('<div class="row">'+
														'<div class="col-lg-12">'+
														  '<ol class="breadcrumb">'+
															'<li><a id="cat_name">'+res.Data[i]['category']+'</a></li>'+
														  '</ol>'+
														'</div>'+
													'</div>'+
													'<div class="row">');
							
							var j=0;
							for(var prop in res.Data[i][t]) {
				  				if (res.Data[i][t].hasOwnProperty(prop)) {
									if(res.Data[i][t][j]["IsFollowing"] == 0){
										var btn = '<button class="btn btn-primary" style="float:right;" id="'+res.Data[i][t][j]['id']+'" onClick="follow('+res.Data[i][t][j]['id']+',&#34'+type+'&#34)">Follow</button>';
										} else {
											var btn ='<button class="btn" style="float:right;" id="'+res.Data[i][t][j]['id']+'" onClick="unfollow('+res.Data[i][t][j]['id']+',&#34'+type+'&#34)">Unfollow</button> ';
											}
											if(p == 'getting_started'){
												var linked = '';
												} else {
													var linked ='href="'+SITE_URL+'/'+type+'/'+res.Data[i][t][j]["name"].replace(/ /gi,'-')+'"';
													}
								$("#all_topics_websites").append('<div class="col-sm-6 col-md-4" style="margin-top:10px; margin-bottom:10px;">'+
														'<div class="thumbnail" id="topic_dp">'+
														  '<a '+linked+' style="float:left; margin-top:10px;"><img src="'+SITE_URL+'/uploaded/'+type+'/'+res.Data[i][t][j]["dp"]+'"></a>'+
														 '<div class="caption">'+
														  '<a '+linked+'> <h4 id="topic_name">'+res.Data[i][t][j]["name"]+' </h4></a>'+
														 
														  '<p id="description">'+res.Data[i][t][j]["description"]+'</p>'+
														 '<p>'+
														   '<a id="followers">'+res.Data[i][t][j]["followers"]+' followers</a> | <a id="link_count">'+res.Data[i][t][j]["links"]+' links</a> '+
														  btn+
														'</p>'+
														'</div>'+
														 '</div>'+
														'</div>');
								}
								j++;
							}
							$("#all_topics_websites").append('</div><!-- /.row -->');
						}
						i++;
					}
			   }
			}
       });
        //return false; // <--- important, prevents the link's href (hash in this example) from executing.
	}
function updateEmail(){
	var email =$("#new_email").val();
	var dataString = '{"EmailAddress":"'+ email+'"}';
	if(email == '' || email == ' '){
		$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">Please enter a valid email address.</p>');
		return false;
		}
	if(validateEmail(email)==false){
		$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">Please enter a valid email address.</p>');
		return false;
		}
		$.ajax({
				type: "POST",
				url: "http://dbapi.fostergem.com/v1/changeEmailAddress/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey"),
				data: dataString,
				cache: false,
				success: function(msg) {
					var res = JSON.parse(msg);
					if(res.Status =='Success'){
						$("#msg").replaceWith('<p id="msg" style="color:#000000;">Email address updated sucessfully. Please check your inbox for the activation link.</p>');
					} else {
						$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">'+res.Message+'</p>');
						}
				}
			});
		return false;
	}
function changePassword(page){
	var password =$("#password").val();
	var password1 = $("#password1").val();
	var dataString = '{"Password":"'+ password+'"}';
	if(password == '' || password == ' '){
		$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">Please cant be empty.</p>');
		return false;
		}
	if(password != password1){
		$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">Password did not match.</p>');
		return false;
		}
		$.ajax({
				type: "POST",
				url: "http://dbapi.fostergem.com/v1/changePassword/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey"),
				data: dataString,
				cache: false,
				success: function(msg) {
					var res = JSON.parse(msg);
					if(res.Status =='Success'){
						if(page == 'set'){
							$("#set_password_container").replaceWith('Password upadted sucessfully.<br /><br /><a href="http://fostergem.com/GettingStarted/FollowTopics"><button class="btn btn-primary">Go To Next Step</button>');
							} else {
								$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">Password updated sucessfully.</p>');
								}
					} else {
						$("#msg").replaceWith('<p id="msg" style="color:#FF0000;">'+res.Message+'</p>');
						}
				}
			});
		return false;
	}
function logout(){
		$.ajax({
				type: "GET",
				url: "http://fostergem.com/lib/logout.php",
				cache: false,
				success: function(msg) {
						delete window.localStorage["profile_id"];
						delete window.localStorage["AccessKey"];
						delete window.localStorage["SecretKey"];
						window.location.href ='http://fostergem.com';
						}
			});
		return false;
	}
var interest_count =0;
function addInterests(id){
	console.log(interest_count);
	if(interest_count == 2){
		document.getElementById("proceed").setAttribute("style", "");
	}
	if(document.getElementById("item_"+id).getAttribute("class") == "btn btn-primary"){
		document.getElementById("item_"+id).setAttribute("class", "btn btn-default");
		document.getElementById("item_"+id).innerHTML = "Remove";
		interest_count++;
		var url = "http://dbapi.fostergem.com/v1/updateInterest/"+window.localStorage.getItem("profile_id")+"/"+id+"/add/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	} else {
		document.getElementById("item_"+id).setAttribute("class", "btn btn-primary");
		document.getElementById("item_"+id).innerHTML = "Add";
		var url = "http://dbapi.fostergem.com/v1/updateInterest/"+window.localStorage.getItem("profile_id")+"/"+id+"/delete/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
		interest_count--;
	}
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(msg) {

		}
	});

	return false;
}
get_users_interests();
function get_users_interests(){
	//var url = "http://dbapi.fostergem.com/v1/getUserInterests/"+window.localStorage.getItem("profile_id")+"/"+window.localStorage.getItem("AccessKey")+"/"+window.localStorage.getItem("SecretKey");
	var url = "http://api.fostergem.com/v1/getUserInterests/1/1/6c350c809e3acef7a38421b86c6619e3/6c350c809e3acef7a38421b86c6619e3";
	console.log(url);
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function(responseData) {
			var res = JSON.parse(responseData);
			//console.log(res);
			var i=0;
			for(var prop in res) {
				if (res.hasOwnProperty(prop)) {
					//console.log(get_interest_name(res.Interests[i]));
					$("#my_interests").append('<a onclick="showInterestFeed('+res[i].interest_id+',0,100)" id="interest_'+res[i]+'" class="list-group-item">'+
						'<i class="fa fa-check-circle connected-status"></i>'+
						'<img src="images/'+res[i].interest_info.dp+'" class="img-chat img-thumbnail">'+
						'<span class="chat-user-name">'+res[i].interest_info.name+'</span>'+
					'</a>');
					//$("#my_interests").append('<li onclick="showInterestFeed('+res.Interests[i]+',0,100)" id="interest_'+res.Interests[i]+'"><a>'+get_interest_name(res.Interests[i])+'</a></li>');
				}
				i++;
			}
		}
	});

}
function get_interest_name(interest_id){
	var interests_arr = ["","News", "Sports", "Movies","Technology","Music","Politics","Startups and Entrepreneurship","Literature","Finance","Fashion and Style","Marketing and sales","Travel and Tourism","Cooking","Humor and Jokes","Science and Mathematics","Business","Jobs and Careers","Computer Programming","Health and Fitness","Dating and Relationship","Photography","Agriculture and Farming", "Medical","Automobiles"];
	return interests_arr[interest_id];
}

function validateEmail(email) {
	if(email ==''){
		return true;
		}
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}