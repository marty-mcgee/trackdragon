<?php
/**
 * TemplateX NameX: Dragon WAE Project Template
 */
?>
<?php /* while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; */ ?>

<?php /* 
<div class="navbar navbar-fixed-top">
  <div class="navbar-inner"></div>    
</div>
*/ ?>
<div class="navbar-inner">
  <div class="container-fluid">
    <?php /* <div class="app-name">-||-</div> */ ?>
    
    <div class="pull-right editable" id="project-name"></div>
    
    <div class="menubar" id="menu-view">
      <ul class="nav nav-pills"></ul>
    </div>

    <div class="container-fluid">
      <div class="btn-toolbar" id="playback-controls">

        <input type="text" id="time-display" value="-:--:--.---"><br/>
        <?php /*
        <button class="btn" id="fast-backward" title="fast-backward"><i class="fa fa-fast-backward"></i></button>
        <button class="btn" id="backward" title="backward"><i class="fa fa-backward"></i></button>
        */ ?>
        <button class="btn" id="play" title="play"><i class="fa fa-play"></i></button>
        <button class="btn" id="stop" title="stop"><i class="fa fa-stop"></i></button>
        <?php /*
        <button class="btn" id="forward" title="forward"><i class="fa fa-forward"></i></button>
        <button class="btn" id="fast-forward" title="fast-forward"><i class="fa fa-fast-forward"></i></button>
        */ ?>
        <button class="btn" id="follow" title="toggle follow"><i class="fa fa-eye"></i><i class="fa fa-eye-close"></i></button>

      </div> <!-- /div#btn-toolbar -->
    </div> <!-- /div#container-fluid -->

  </div> <!-- /div#container-fluid -->

</div> <!-- /div#navbar-inner -->

<div id="app-frame" class="container-fluid">
  <div class="row-fluid">
    <div class="span12" id="editor-view">
      <div class="inner">
        <div id="time-line"></div>
        <div id="tracks">
        </div>
          <!--<button id="m-newtrack">New Track</button>-->
      </div> 
    </div> <!-- /div#editor-view -->
  </div>
</div> <!-- /div#app-frame -->

<?php /*
<!-- JavaScript at the bottom for fast page loading 
<script data-main="/app/themes/dragon/bower_components/web-audio-editor/js/main" src="/app/themes/dragon/bower_components/web-audio-editor/js/libs/require/require.js"></script>-->
*/ ?>
