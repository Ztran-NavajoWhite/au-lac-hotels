<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'au_lac_db' );

/** Database username */
define( 'DB_USER', 'au_lac_user' );

/** Database password */
define( 'DB_PASSWORD', 'au_lac_password' );

/** Database hostname */
define( 'DB_HOST', 'mysql' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '~LG|Bj-I>bfYej80Gp2$bd}C,3{!YuA6U?F8`L5sg7u`_L5nW&nD<=+766w~f*z9' );
define( 'SECURE_AUTH_KEY',  'j8_gdFS_lkh}Yq.:13ls)aF_wXQ8zQLG}On&+i<iJ`uS|XpV&I,a%P![^Y;8bd1U' );
define( 'LOGGED_IN_KEY',    '5|&tyJnw/P,pHQ{EnhX#,d9C@a}PQnD!|yn_nZ=X]U4th*Qw&YYJ_hUz!a 9S!w0' );
define( 'NONCE_KEY',        'xlhb`i9<w>)T/5ice>U|jYeI $T&a;.E$6{Dq^#`%iMsc6,h5kQt^RwzP0Mt^S]|' );
define( 'AUTH_SALT',        '(&VVyBF&6XHJ[cvB*RAbN`+]@rT-3p?wHulc(8ZfgBrc>gV;}2p~5aw7q/hxhu?[' );
define( 'SECURE_AUTH_SALT', ';N$we jY/GpUnpPsW=1G[WK 727^E39HyO =@3f]3-7&u#uNc^#B<mQy:Wg?^>*Q' );
define( 'LOGGED_IN_SALT',   ' OALgqvK^5~w^XQd6Qo?I&ZxtfJ|Nju.DsXV>[N8g[O1EHYj3k78ku;x.XVo8B;.' );
define( 'NONCE_SALT',       'qZlQug-(MIcSM);383v;fV)~jPxw.]K9 &VMd Q/*A=+Bw{o.`{p|6{9}uL@8rvP' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */

// Include local configuration for Docker development
if (file_exists(__DIR__ . '/wp-config-local.php')) {
    require_once __DIR__ . '/wp-config-local.php';
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
