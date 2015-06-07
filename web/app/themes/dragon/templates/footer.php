<footer class="content-info" role="contentinfo">
  <div class="container">
    <?php dynamic_sidebar('sidebar-footer'); ?>
  </div>
  <div class="container">
    <?php /*
    <nav role="navigation">
      <i class="fa fa-fast-backward"></i>
      <i class="fa fa-backward"></i>
      <i class="fa fa-pause"></i>
      <i class="fa fa-play"></i>
      <i class="fa fa-forward"></i>
      <i class="fa fa-fast-forward"></i>
    </nav>
    <nav role="navigation">
      <i class="glyphicon glyphicon-fast-backward"></i>
      <i class="glyphicon glyphicon-backward"></i>
      <i class="glyphicon glyphicon-pause"></i>
      <i class="glyphicon glyphicon-play"></i>
      <i class="glyphicon glyphicon-forward"></i>
      <i class="glyphicon glyphicon-fast-forward"></i>
    </nav>*/ ?>

    <div class="btn-toolbar" id="playback-controls">
      <input type="text" id="time-display" value="-:--:--.---">
      <!--<button class="btn" id="fast-backward" title="fast-backward"><i class="fa fa-fast-backward"></i></button>
      <button class="btn" id="backward" title="backward"><i class="fa fa-backward"></i></button>-->
      <button class="btn" id="stop" title="stop"><i class="fa fa-stop"></i></button>
      <button class="btn" id="play" title="play"><i class="fa fa-play"></i></button>
      <!--<button class="btn" id="forward" title="forward"><i class="fa fa-forward"></i></button>
      <button class="btn" id="fast-forward" title="fast-forward"><i class="fa fa-fast-forward"></i></button>-->
      <button class="btn" id="follow" title="toggle follow"><i class="fa fa-eye"></i><i class="fa fa-eye-close"></i></button>
    </div>

  </div>
</footer>
