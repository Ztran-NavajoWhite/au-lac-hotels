<?php
/**
 * Plugin Name: Au Lac Booking Dashboard
 * Plugin URI: https://aulac-hotels.com
 * Description: Comprehensive hotel booking management system with payment processing, notifications, and analytics for Au Lac Hotels
 * Version: 1.0.0
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Author: Au Lac Hotels
 * Author URI: https://aulac-hotels.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: au-lac-booking
 * Domain Path: /languages
 * Network: false
 * 
 * @package AuLacBookingDashboard
 * @version 1.0.0
 * @author Au Lac Hotels
 * @copyright 2024 Au Lac Hotels
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ALBD_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ALBD_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('ALBD_PLUGIN_VERSION', '1.0.0');

/**
 * Main plugin class
 */
class AuLacBookingDashboard {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain for internationalization
        load_plugin_textdomain('au-lac-booking', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Register custom post types
        $this->register_post_types();
        
        // Include OnePay payment gateway
        require_once ALBD_PLUGIN_PATH . 'includes/class-onepay-payment.php';
        
        // Include Laravel backend connector
        require_once ALBD_PLUGIN_PATH . 'includes/class-laravel-connector.php';
    }
    
    /**
     * Register custom post types
     */
    private function register_post_types() {
        // No custom post types needed - using your existing ones
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // Main menu
        add_menu_page(
            __('Au Lac Dashboard', 'au-lac-booking'),
            __('Au Lac Dashboard', 'au-lac-booking'),
            'manage_options',
            'au-lac-dashboard',
            array($this, 'dashboard_page'),
            'dashicons-admin-home',
            2
        );

        // Submenu pages
        add_submenu_page(
            'au-lac-dashboard',
            __('General', 'au-lac-booking'),
            __('General', 'au-lac-booking'),
            'manage_options',
            'au-lac-dashboard',
            array($this, 'dashboard_page')
        );

        add_submenu_page(
            'au-lac-dashboard',
            __('Bookings', 'au-lac-booking'),
            __('Bookings', 'au-lac-booking'),
            'manage_options',
            'au-lac-bookings',
            array($this, 'bookings_page')
        );

        add_submenu_page(
            'au-lac-dashboard',
            __('Hotels', 'au-lac-booking'),
            __('Hotels', 'au-lac-booking'),
            'manage_options',
            'au-lac-hotels',
            array($this, 'hotels_page')
        );

        add_submenu_page(
            'au-lac-dashboard',
            __('Reports', 'au-lac-booking'),
            __('Reports', 'au-lac-booking'),
            'manage_options',
            'au-lac-reports',
            array($this, 'reports_page')
        );
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'au-lac') !== false) {
            wp_enqueue_style('albd-admin-style', ALBD_PLUGIN_URL . 'assets/css/admin.css', array(), ALBD_PLUGIN_VERSION);
            wp_enqueue_script('albd-admin-script', ALBD_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), ALBD_PLUGIN_VERSION, true);
        }
    }
    
    /**
     * Dashboard page
     */
    public function dashboard_page() {
        include ALBD_PLUGIN_PATH . 'templates/dashboard.php';
    }
    
    /**
     * Bookings page
     */
    public function bookings_page() {
        include ALBD_PLUGIN_PATH . 'templates/bookings.php';
    }
    
    /**
     * Hotels page
     */
    public function hotels_page() {
        include ALBD_PLUGIN_PATH . 'templates/hotels.php';
    }
    
    /**
     * Reports page
     */
    public function reports_page() {
        include ALBD_PLUGIN_PATH . 'templates/reports.php';
    }
}

// Initialize the plugin
new AuLacBookingDashboard();

// Activation hook
register_activation_hook(__FILE__, 'albd_activate');
function albd_activate() {
    // Create necessary database tables or options
    add_option('albd_version', ALBD_PLUGIN_VERSION);
    
    // Flush rewrite rules to register custom post types
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'deactivate');
function albd_deactivate() {
    // Cleanup if necessary
}
