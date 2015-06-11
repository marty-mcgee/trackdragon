<?php
/**
 * Dragon includes
 *
 * The $dragon_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/sage/pull/1042
 */
/* CUSTOM CODE */
//if (is_page('project-huggybear')){

$dragon_includes = [
  'trackdragon/wae/wae.php',  // initialize TrackDragon Web Audio Editor
  'trackdragon/avr/avr.php',  // initialize TrackDragon Audio + Video Recorder
];

foreach ($dragon_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);

//}/* END CUSTOM CODE if (is_page('project-huggybear')){ */