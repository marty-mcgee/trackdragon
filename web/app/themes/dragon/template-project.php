<?php
/**
 * Template Name: Project Template
 */
?>

<?php /* while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
<?php endwhile;*/ ?>

<!--<link rel="stylesheet/less" href="/app/themes/dragon/bower_components/web-audio-editor/less/style.less">
<script src="/app/themes/dragon/bower_components/web-audio-editor/js/libs/less-1.2.2.js"></script>-->
<!-- Use SimpLESS (Win/Linux/Mac) or LESS.app (Mac) to compile your .less files
to style.css, and replace the 2 lines above by this one: -->
<!--<link rel="stylesheet" href="/app/themes/dragon/bower_components/web-audio-editor/css/style.css">-->

<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <div class="pull-left editable" id="project-name"></div>
            <div class="btn-toolbar" id="playback-controls">
                <input type="text" id="time-display" value="-:--:--.---">
                <button class="btn" id="play" title="play"><i class="fa fa-play"></i></button>
                <button class="btn" id="stop" title="stop" ><i class="fa fa-stop"></i></button>
                <button class="btn" id="follow" title="toggle follow"><i class="fa fa-eye"></i><i class="fa fa-eye-close"></i></button>
            </div>
        </div>
        <!--<div class="app-name">-||-</div>-->
    </div>
</div>
<div class="menubar" id="menu-view">
    <ul class="nav nav-pills"></ul>
</div>
<div id="app-frame" class="container-fluid">
    <div class="row-fluid">
           <div class="span12" id="editor-view">
            <div class="inner">
                <div id="time-line"></div>
                <div id="tracks"></div>
            </div> 
        </div> <!-- /div#editor-view -->
    </div> 
</div> <!-- /div#app-frame -->

<!-- JavaScript at the bottom for fast page loading 
<script data-main="/app/themes/dragon/bower_components/web-audio-editor/js/main" src="/app/themes/dragon/bower_components/web-audio-editor/js/libs/require/require.js"></script>-->
