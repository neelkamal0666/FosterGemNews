<?php function main_header($title,$meta_link) { ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?php echo $title;?></title>
        <?php echo $meta_link; ?>
        <link rel="shortcut icon" href="<?php echo SITE_URL;?>/images/icon.ico">
        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.css">
        <!-- Add custom CSS here -->
        <link href="<?php echo SITE_URL;?>/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="<?php echo SITE_URL;?>/css/animate.min.css" rel="stylesheet">
        <link href="<?php echo SITE_URL;?>/css/timeline.css" rel="stylesheet">

    </head>

<body>

<!-- Fixed navbar -->
<!-- Fixed navbar -->
<nav class="navbar navbar-default navbar-fixed-top navbar-principal">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" style="font-family:lucida grande, tahoma, verdana, arial,sans-serif; font-size: 24px; font-weight: bold" href="">
                FosterGem News <small style="font-size: 14px; color:#000">alpha</small>
            </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">

            <ul class="nav navbar-nav navbar-right" style="margin-right: 39px !important;">

                <li ><a href="http://fostergem.com/info"><i class="fa fa-bars"></i>&nbsp;Signup</a></li>
                <li ><a href="http://fostergem.com/login"><i class="fa fa-bars"></i>&nbsp;Login</a></li>
            </ul>
        </div>
    </div>
</nav>
    <?php
}  ?>