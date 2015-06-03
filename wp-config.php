<?php
#echo "HEY HEY HEY ";
#echo date("Y-m-d | h:i:sa");
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
#define('DB_NAME', 'trackdragon000');
define('DB_NAME', 'td_bedrock_000');

/** MySQL database username */
define('DB_USER', 'martimus');

/** MySQL database password */
define('DB_PASSWORD', 'foooobarrr');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

// ========================
// Custom Content Directory
// see https://github.com/markjaquith/WordPress-Skeleton
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/app' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/app' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '_W*lL2wW YHwWIwAyEjU[N[ZjZ>p1)IVMo}$w9!ty`l]^Gur0TJaY7Sv$H-vni^#');
define('SECURE_AUTH_KEY',  'ozqPr^!p!b koh<IA|W!|qveF^dMs:>5j?K=%|Pz#EtU;]7}w=-NZo/``P`Knju|');
define('LOGGED_IN_KEY',    'Cw%kX908|9[N|r`=>T9pYhATH-l8j2BZ&e2|8`u,|;ks+~e.o{#P2/L!K_~z.9&d');
define('NONCE_KEY',        '`ZzDYzF zUay9R+R|w{io_#kNY-<KyC(z%e$.5g?4b2[>GMadWp.7]7QLTa~!o+F');
define('AUTH_SALT',        'UH[B1M(t-+Si`!y(zm|M&7f `-G,`{KD7*b:/|:?:~G OR)i#H8&V9u}a&-om$kl');
define('SECURE_AUTH_SALT', '*P0BZc /g&+.KV 3R>`gW;uNt^px^JKv-77/=)0=fPPf-,(cnVD}&hCjn2T[Aotx');
define('LOGGED_IN_SALT',   'F=|RFR| LTY)hUnyJs2]ET4k,|Fe-f`*jxSt>%Kg;VC--$@x>Nu#>YmW<l^B@Pd-');
define('NONCE_SALT',       '=U@,;:!+0 sZ_87F+|&P0-:K*.U~W(7b9+[P05{3|,dlZafs`X|}R]oVUtmJ#||5');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/wp/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
