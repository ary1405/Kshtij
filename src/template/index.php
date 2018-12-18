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
    
    <meta name="description" content="Kshitij, the annual techno-management fest of IIT Kharagpur is coming with 16th edition from 18th-20th January 2019.
    While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.">
    <meta name="keywords" content="kshitij, ktj, iit, kharagpur, iit kharagpur, annual fest, technology, iit kgp, kgp">

    <base href="/" >

    <!-- Facebook meta -->
    <meta property="og:title" content="Kshitij 2019 | 18-20th January | IIT Kharagpur"/>
    <meta property="og:image" content="http://www.ktj.in/images/share/favicon.jpg"/>
    <meta property="og:url" content="http://www.ktj.in"/>
    <meta property="og:site_name" content="Kshitij 2019 | IIT Kharagpur"/>
    <meta property="og:description" content="While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields. The upcoming 16th edition is going to be held from 18th-20th January 2019"/>

    <!-- Twitter meta -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@Kshitij">
    <meta name="twitter:creator" content="@Kshitij">
    <meta name="twitter:title" content="Kshitij 2019 | 18-20th January | IIT Kharagpur">
    <meta name="twitter:description" content="While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields. The upcoming 16th edition is going to be held from 18th-20th January 2019">
    <meta name="twitter:image" content="http://www.ktj.in/images/share/twitter.jpg">
    <meta name="twitter:image:src" content="http://www.ktj.in/images/share/twitter.jpg">

    <!-- GOOGLE + Share -->
    <meta itemprop="name" content="Kshitij 2019 | 18-20th January | IIT Kharagpur">
    <meta itemprop="description" content="While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops 
      provide an enriching experience for the avid learners.The fest has been graced by the presence of such luminaries who are looked
      up to for their distinguished contribution in their respective fields. The upcoming 16th edition is going to be held from 18th-20th January 2019">
    <meta itemprop="image" content="http://www.ktj.in/images/share/favicon.jpg">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/images/share/favicon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/share/favicon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/share/favicon.png">
    <link rel="manifest" href="/images/share/site.webmanifest">
    <link rel="mask-icon" href="/images/share/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- Onesignal Notification -->
    <link rel="manifest" href="/manifest.json" />
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "217f6bfb-527b-4ec0-8978-561f3803ddb6",
    });
  });
</script>


    <?php if ($detect->isMobile() && !$detect->isTablet()) { ?>
    <link href="<%= htmlWebpackPlugin.files.chunks.mobile.css %>" rel="stylesheet"></head>
    <?php } else { ?>
    <link href="<%= htmlWebpackPlugin.files.chunks.desktop.css %>" rel="stylesheet"></head>
    <?php } ?>


  

  <body>

    <div id="application">

    </div>

    <?php if ($detect->isMobile() && !$detect->isTablet()) { ?>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.mobile.entry %>"></script>
    <?php } else { ?>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.desktop.entry %>"></script>
    <?php } ?>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-130034264-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-130034264-1');
    </script>

  </body>

</html>
