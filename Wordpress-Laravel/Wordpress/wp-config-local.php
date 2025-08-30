<?php
// WordPress Configuration for Docker Development
// This file should be included in wp-config.php

// Allow direct file system access (no FTP required)
define('FS_METHOD', 'direct');

// Set file permissions
define('WP_TEMP_DIR', '/tmp');

// Disable file editing in admin
define('DISALLOW_FILE_EDIT', false);

// Allow plugin and theme installation
define('DISALLOW_FILE_MODS', false);

// Set upload directory permissions
define('WP_CONTENT_DIR', '/var/www/html/wp-content');
define('WP_CONTENT_URL', '/wp-content');

// Debug settings (WP_DEBUG is already defined in wp-config.php)
// define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Memory limit
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');
