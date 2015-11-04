
<div class="row text-center"><br /><br />
</div>
<!-- Timeline content -->
<!-- Online users sidebar content-->
<div class="chat-sidebar focus">
	<div class="list-group text-left" id="my_interests">
		<!-- append users interests here-->
		<a href="/?P=News" class="list-group-item" <?php if($_REQUEST["p"] == "News"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/1.png" class="img-chat img-thumbnail" /> News</a>
		<a href="/?P=Sports" class="list-group-item" <?php if($_REQUEST["p"] == "Sports"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/2.png" class="img-chat img-thumbnail" /> Sports</a>
		<a href="/?P=Movies" class="list-group-item" <?php if($_REQUEST["p"] == "Movies"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/3.png" class="img-chat img-thumbnail" /> Movies</a>
		<a href="/?P=Technology" class="list-group-item" <?php if($_REQUEST["p"] == "Technology"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/4.jpg" class="img-chat img-thumbnail" /> Technology</a>
		<a href="/?P=Music" class="list-group-item" <?php if($_REQUEST["p"] == "Music"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/5.png" class="img-chat img-thumbnail" /> Music</a>
		<a href="/?P=Politics" class="list-group-item" <?php if($_REQUEST["p"] == "Politics"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/6.jpg" class="img-chat img-thumbnail" /> Politics</a>
		<a href="/?P=Startups" class="list-group-item" <?php if($_REQUEST["p"] == "Startups"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/7.jpg" class="img-chat img-thumbnail" /> Entrepreneurship</a>
		<a href="/?P=Finance" class="list-group-item" <?php if($_REQUEST["p"] == "Finance"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/9.png" class="img-chat img-thumbnail" /> Finance</a>
		<a href="/?P=Health" class="list-group-item" <?php if($_REQUEST["p"] == "Health"){ ?> style="background-color: #e5e5e5;" <?php } ?>><img src="images/19.png" class="img-chat img-thumbnail" />Health and Fitness</a>
	</div>
	<br /><br />
</div><!-- Online users sidebar content-->


<div class="container">
	<div class="col-md-12 no-paddin-xs">
		<div class="row">
			<div class="col-md-2" style="width:14.666% !important;">&nbsp;</div>
			<!-- middle  content-->
			<div class="profile-info col-md-6" id="fg_main_content">
				<?php foreach($feeds as $feed){ ?>
					<div class="panel panel-white post panel-shadow">
						<div class="title h4" style="padding-left: 20px; padding-right: 20px;"><a href="<?php echo $feed["row_web_post"]["url"]; ?>" target="_blank"><?php echo $feed["row_web_post"]["title"]; ?></a></div>
						<div class="post-image">
							<img src="<?php echo $feed["image_url"]; ?>" class="image show-in-modal" alt="image post">
							</div>
						<div class="post-description">
							<p><?php echo $feed["row_web_post"]["description"]; ?></p>
							<p>
								<a href="<?php echo $feed["row_web_post"]["url"]; ?>" class="post-user-name" style="float: right;">  <?php echo $feed["website_details"]["website"]; ?></a>
								<h6 class="text-muted time"><?php echo $feed["row_web_post"]["date"]; ?> </h6>
							</p>
						</div>
					</div>
				<?php } ?>
			</div><!--end middle  content-->
			<?php require_once("layout/rsidebar.php");?>

		</div>
	</div>
</div>
