<?php
  require_once 'server/Mobile_Detect.php';
  $detect = new Mobile_Detect;
?>

<!DOCTYPE html>

<html lang="en">

  <head>
    <title>Kshitij 2019 | IIT Kharagpur</title>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="google-site-verification" content="jHj7Q1niJT_o96E884V3BeKAgeVU18QGhRJK4Ah7PKg" />
    
    <meta name="description" content="Kshitij, The Annual Techno-Management Fest of IIT Kharagpur is coming with its 16th edition from 18th-20th January 2019. Started in 2004, Kshitij was conceived with the aim to provide the technically inclined youth a national-level platform, where their talent and expertise would be recognized and rewarded.">
    <meta name="keywords" content="kshitij, ktj, iit, kharagpur, iit kharagpur, annual fest, technology, iit kgp, kgp">

    <base href="/" >

    <!-- Facebook meta -->
    <meta property="og:title" content="Kshitij 2019 | 18-20th January | IIT Kharagpur"/>
    <meta property="og:image" content="http://www.ktj.in/images/share/facebook.jpg"/>
    <meta property="og:url" content="http://www.ktj.in"/>
    <meta property="og:site_name" content="Kshitij 2019 | IIT Kharagpur"/>
    <meta property="og:description" content="Kshitij, The Annual Techno-Management Fest of IIT Kharagpur is coming with its 16th edition from 18th-20th January 2019. Started in 2004, Kshitij was conceived with the aim to provide the technically inclined youth a national-level platform, where their talent and expertise would be recognized and rewarded. While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields."/>

    <!-- Twitter meta -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@Kshitij">
    <meta name="twitter:creator" content="@Kshitij">
    <meta name="twitter:title" content="Kshitij 2019 | 18-20th January | IIT Kharagpur">
    <meta name="twitter:description" content="Kshitij, The Annual Techno-Management Fest of IIT Kharagpur is coming with its 16th edition from 18th-20th January 2019. Started in 2004, Kshitij was conceived with the aim to provide the technically inclined youth a national-level platform, where their talent and expertise would be recognized and rewarded. While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields.">
    <meta name="twitter:image" content="http://www.ktj.in/images/share/twitter.jpg">
    <meta name="twitter:image:src" content="http://www.ktj.in/images/share/twitter.jpg">

    <!-- GOOGLE + Share -->
    <meta itemprop="name" content="Kshitij 2019 | 18-20th January | IIT Kharagpur">
    <meta itemprop="description" content="Kshitij, The Annual Techno-Management Fest of IIT Kharagpur is coming with its 16th edition from 18th-20th January 2019. Started in 2004, Kshitij was conceived with the aim to provide the technically inclined youth a national-level platform, where their talent and expertise would be recognized and rewarded. While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields.">
    <meta itemprop="image" content="http://www.ktj.in/images/share/facebook.jpg">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/images/share/favicon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/share/favicon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/share/favicon.png">
    <link rel="manifest" href="/images/share/site.webmanifest">
    <link rel="mask-icon" href="/images/share/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <?php if ($detect->isMobile() || $detect->isTablet()) { ?>
    <link href="<%= htmlWebpackPlugin.files.chunks.mobile.css %>" rel="stylesheet"></head>
    <?php } else { ?>
    <link href="<%= htmlWebpackPlugin.files.chunks.desktop.css %>" rel="stylesheet"></head>
    <?php } ?>

  </head>

  <body>

    <div id="application">

    </div>

    <?php if ($detect->isMobile() && !$detect->isTablet()) { ?>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.mobile.entry %>"></script>
    <?php } else { ?>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.desktop.entry %>"></script>
    <?php } ?>

  </body>

</html>
