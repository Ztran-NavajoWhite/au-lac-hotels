<?php
/**
 * Laravel Backend Connector for Au Lac Booking Dashboard
 * Handles API communication with Laravel backend for complex business logic
 * 
 * @package AuLacBookingDashboard
 * @version 1.0.0
 * @author Au Lac Hotels
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ALBD_Laravel_Connector {
    
    // Laravel API Configuration
    private $api_base_url;
    private $api_key;
    private $api_secret;
    private $timeout;
    private $debug_mode;
    
    // Plugin settings
    private $settings;
    
    // API endpoints
    private $endpoints = array(
        'bookings' => '/api/bookings',
        'hotels' => '/api/hotels',
        'payments' => '/api/payments',
        'reports' => '/api/reports',
        'notifications' => '/api/notifications',
        'analytics' => '/api/analytics',
        'sync' => '/api/sync'
    );
    
    public function __construct() {
        $this->init();
        $this->add_hooks();
    }
    
    /**
     * Initialize the Laravel connector
     */
    private function init() {
        $this->settings = get_option('albd_laravel_settings', array());
        
        $this->api_base_url = isset($this->settings['api_base_url']) ? $this->settings['api_base_url'] : '';
        $this->api_key = isset($this->settings['api_key']) ? $this->settings['api_key'] : '';
        $this->api_secret = isset($this->settings['api_secret']) ? $this->settings['api_secret'] : '';
        $this->timeout = isset($this->settings['timeout']) ? intval($this->settings['timeout']) : 30;
        $this->debug_mode = isset($this->settings['debug_mode']) ? $this->settings['debug_mode'] : false;
    }
    
    /**
     * Add WordPress hooks
     */
    private function add_hooks() {
        // Admin settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // AJAX handlers for Laravel communication
        add_action('wp_ajax_albd_sync_with_laravel', array($this, 'ajax_sync_with_laravel'));
        add_action('wp_ajax_albd_get_laravel_data', array($this, 'ajax_get_laravel_data'));
        add_action('wp_ajax_albd_send_to_laravel', array($this, 'ajax_send_to_laravel'));
        add_action('wp_ajax_albd_test_laravel_connection', array($this, 'ajax_test_laravel_connection'));
        add_action('wp_ajax_albd_update_booking_status', array($this, 'ajax_update_booking_status'));
        add_action('wp_ajax_albd_update_payment_status', array($this, 'ajax_update_payment_status'));
        add_action('wp_ajax_albd_update_hotel_data', array($this, 'ajax_update_hotel_data'));
        
        // Scheduled sync with Laravel
        add_action('albd_laravel_sync_cron', array($this, 'scheduled_sync_with_laravel'));
        
        // Hook into WordPress actions to sync with Laravel
        add_action('save_post', array($this, 'sync_post_to_laravel'), 10, 3);
        add_action('deleted_post', array($this, 'sync_post_deletion_to_laravel'), 10, 1);
    }
    
    /**
     * Add admin menu for Laravel settings
     */
    public function add_admin_menu() {
        add_submenu_page(
            'au-lac-dashboard',
            __('Laravel Backend', 'au-lac-booking'),
            __('Laravel Backend', 'au-lac-booking'),
            'manage_options',
            'albd-laravel-settings',
            array($this, 'admin_settings_page')
        );
    }
    
    /**
     * Register plugin settings
     */
    public function register_settings() {
        register_setting('albd_laravel_settings', 'albd_laravel_settings');
        
        add_settings_section(
            'albd_laravel_general',
            __('Laravel Backend Configuration', 'au-lac-booking'),
            array($this, 'settings_section_callback'),
            'albd_laravel_settings'
        );
        
        add_settings_field(
            'api_base_url',
            __('Laravel API Base URL', 'au-lac-booking'),
            array($this, 'text_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'api_base_url', 'description' => 'Base URL of your Laravel API (e.g., https://api.aulac-hotels.com)')
        );
        
        add_settings_field(
            'api_key',
            __('API Key', 'au-lac-booking'),
            array($this, 'text_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'api_key', 'description' => 'API key for authentication')
        );
        
        add_settings_field(
            'api_secret',
            __('API Secret', 'au-lac-booking'),
            array($this, 'password_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'api_secret', 'description' => 'API secret for secure communication')
        );
        
        add_settings_field(
            'timeout',
            __('Request Timeout (seconds)', 'au-lac-booking'),
            array($this, 'number_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'timeout', 'description' => 'API request timeout in seconds')
        );
        
        add_settings_field(
            'debug_mode',
            __('Debug Mode', 'au-lac-booking'),
            array($this, 'checkbox_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'debug_mode', 'description' => 'Enable debug logging for API calls')
        );
        
        add_settings_field(
            'auto_sync',
            __('Auto Sync', 'au-lac-booking'),
            array($this, 'checkbox_field_callback'),
            'albd_laravel_settings',
            'albd_laravel_general',
            array('field' => 'auto_sync', 'description' => 'Automatically sync data with Laravel backend')
        );
    }
    
    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo '<p>' . __('Configure connection to your Laravel backend API. This enables complex business logic processing, advanced analytics, and data synchronization.', 'au-lac-booking') . '</p>';
    }
    
    /**
     * Text field callback
     */
    public function text_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $value = isset($this->settings[$field]) ? $this->settings[$field] : '';
        
        echo '<input type="text" name="albd_laravel_settings[' . $field . ']" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Password field callback
     */
    public function password_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $value = isset($this->settings[$field]) ? $this->settings[$field] : '';
        
        echo '<input type="password" name="albd_laravel_settings[' . $field . ']" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Number field callback
     */
    public function number_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $value = isset($this->settings[$field]) ? $this->settings[$field] : '';
        
        echo '<input type="number" name="albd_laravel_backend_settings[' . $field . ']" value="' . esc_attr($value) . '" class="small-text" min="5" max="120" />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Checkbox field callback
     */
    public function checkbox_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $checked = isset($this->settings[$field]) && $this->settings[$field] ? 'checked' : '';
        
        echo '<input type="checkbox" name="albd_laravel_settings[' . $field . ']" value="1" ' . $checked . ' />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Admin settings page
     */
    public function admin_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Laravel Backend Settings', 'au-lac-booking'); ?></h1>
            
            <div class="albd-laravel-status">
                <h2><?php _e('Connection Status', 'au-lac-booking'); ?></h2>
                <?php $this->display_connection_status(); ?>
            </div>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('albd_laravel_settings');
                do_settings_sections('albd_laravel_settings');
                submit_button();
                ?>
            </form>
            
            <div class="albd-laravel-actions">
                <h2><?php _e('Manual Actions', 'au-lac-booking'); ?></h2>
                <p><?php _e('Test the connection and manually sync data with Laravel backend.', 'au-lac-booking'); ?></p>
                
                <button type="button" class="button button-secondary" id="test-connection">
                    <?php _e('Test Connection', 'au-lac-booking'); ?>
                </button>
                
                <button type="button" class="button button-primary" id="manual-sync">
                    <?php _e('Manual Sync', 'au-lac-booking'); ?>
                </button>
                
                <div id="laravel-action-results"></div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Display connection status
     */
    private function display_connection_status() {
        if ($this->validate_settings()) {
            $status = $this->test_api_connection();
            if ($status['success']) {
                echo '<div class="notice notice-success"><p>' . __('✅ Connected to Laravel backend successfully!', 'au-lac-booking') . '</p></div>';
                echo '<p><strong>' . __('API Version:', 'au-lac-booking') . '</strong> ' . esc_html($status['data']['version'] ?? 'Unknown') . '</p>';
                echo '<p><strong>' . __('Last Sync:', 'au-lac-booking') . '</strong> ' . esc_html(get_option('albd_last_laravel_sync', 'Never')) . '</p>';
            } else {
                echo '<div class="notice notice-error"><p>' . __('❌ Connection failed: ', 'au-lac-booking') . esc_html($status['message']) . '</p></div>';
            }
        } else {
            echo '<div class="notice notice-warning"><p>' . __('⚠️ Laravel backend not configured. Please fill in the settings below.', 'au-lac-booking') . '</p></div>';
        }
    }
    
    /**
     * Validate Laravel settings
     */
    private function validate_settings() {
        return !empty($this->api_base_url) && 
               !empty($this->api_key) && 
               !empty($this->api_secret);
    }
    
    /**
     * Make API request to Laravel backend
     */
    public function make_api_request($endpoint, $method = 'GET', $data = array(), $headers = array()) {
        if (!$this->validate_settings()) {
            return array('success' => false, 'message' => __('Laravel backend not configured', 'au-lac-booking'));
        }
        
        $url = rtrim($this->api_base_url, '/') . $endpoint;
        
        // Prepare headers
        $default_headers = array(
            'Content-Type: application/json',
            'Accept: application/json',
            'X-API-Key: ' . $this->api_key,
            'X-API-Secret: ' . $this->api_secret,
            'X-WordPress-Site: ' . get_site_url(),
            'X-Request-Timestamp: ' . time()
        );
        
        $headers = array_merge($default_headers, $headers);
        
        // Prepare request arguments
        $args = array(
            'method' => $method,
            'timeout' => $this->timeout,
            'headers' => $headers,
            'sslverify' => true
        );
        
        if (!empty($data) && in_array($method, array('POST', 'PUT', 'PATCH'))) {
            $args['body'] = json_encode($data);
        }
        
        // Make the request
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            $this->log_api_error($endpoint, $method, $data, $response->get_error_message());
            return array('success' => false, 'message' => $response->get_error_message());
        }
        
        $response_code = wp_remote_retrieve_response_code($response);
        $response_body = wp_remote_retrieve_body($response);
        
        // Log the request
        $this->log_api_request($endpoint, $method, $data, $response_code, $response_body);
        
        if ($response_code >= 200 && $response_code < 300) {
            $decoded_body = json_decode($response_body, true);
            return array('success' => true, 'data' => $decoded_body);
        } else {
            return array('success' => false, 'message' => sprintf(__('HTTP %d: %s', 'au-lac-booking'), $response_code, $response_body));
        }
    }
    
    /**
     * Test API connection
     */
    public function test_api_connection() {
        return $this->make_api_request('/api/health', 'GET');
    }
    
    /**
     * Sync booking data with Laravel
     */
    public function sync_booking_to_laravel($booking_id) {
        $booking = get_post($booking_id);
        if (!$booking || $booking->post_type !== 'bookings') {
            return false;
        }
        
        $booking_data = array(
            'id' => $booking_id,
            'title' => $booking->post_title,
            'status' => $booking->post_status,
            'created_at' => $booking->post_date,
            'updated_at' => $booking->post_modified,
            'meta' => $this->get_booking_meta($booking_id)
        );
        
        $response = $this->make_api_request('/api/bookings/sync', 'POST', $booking_data);
        
        if ($response['success']) {
            update_post_meta($booking_id, '_laravel_synced', current_time('mysql'));
            return true;
        }
        
        return false;
    }
    
    /**
     * Sync hotel data with Laravel
     */
    public function sync_hotel_to_laravel($hotel_id) {
        $hotel = get_post($hotel_id);
        if (!$hotel || $hotel->post_type !== 'hotels') {
            return false;
        }
        
        $hotel_data = array(
            'id' => $hotel_id,
            'title' => $hotel->post_title,
            'status' => $hotel->post_status,
            'created_at' => $hotel->post_date,
            'updated_at' => $hotel->post_modified,
            'meta' => $this->get_hotel_meta($hotel_id)
        );
        
        $response = $this->make_api_request('/api/hotels/sync', 'POST', $hotel_data);
        
        if ($response['success']) {
            update_post_meta($hotel_id, '_laravel_synced', current_time('mysql'));
            return true;
        }
        
        return false;
    }
    
    /**
     * Get booking meta data
     */
    private function get_booking_meta($booking_id) {
        $meta_keys = array('booking_status', 'payment_status', 'guest_name', 'guest_email', 'check_in', 'check_out', 'room_type', 'hotel_id');
        $meta_data = array();
        
        foreach ($meta_keys as $key) {
            $value = get_post_meta($booking_id, $key, true);
            if ($value) {
                $meta_data[$key] = $value;
            }
        }
        
        return $meta_data;
    }
    
    /**
     * Get hotel meta data
     */
    private function get_hotel_meta($hotel_id) {
        $meta_keys = array('hotel_address', 'hotel_phone', 'hotel_email', 'hotel_rating', 'hotel_features');
        $meta_data = array();
        
        foreach ($meta_keys as $key) {
            $value = get_post_meta($hotel_id, $key, true);
            if ($value) {
                $meta_data[$key] = $value;
            }
        }
        
        return $meta_data;
    }
    
    /**
     * Sync post to Laravel (WordPress hook)
     */
    public function sync_post_to_laravel($post_id, $post, $update) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (wp_is_post_revision($post_id)) {
            return;
        }
        
        if ($post->post_type === 'bookings') {
            $this->sync_booking_to_laravel($post_id);
        } elseif ($post->post_type === 'hotels') {
            $this->sync_hotel_to_laravel($post_id);
        }
    }
    
    /**
     * Sync post deletion to Laravel
     */
    public function sync_post_deletion_to_laravel($post_id) {
        $post_type = get_post_type($post_id);
        
        if ($post_type === 'bookings') {
            $this->make_api_request('/api/bookings/delete', 'DELETE', array('id' => $post_id));
        } elseif ($post_type === 'hotels') {
            $this->make_api_request('/api/hotels/delete', 'DELETE', array('id' => $post_id));
        }
    }
    
    /**
     * Get data from Laravel backend
     */
    public function get_laravel_data($endpoint, $params = array()) {
        $query_string = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->make_api_request($endpoint . $query_string, 'GET');
    }
    
    /**
     * Send data to Laravel backend
     */
    public function send_to_laravel($endpoint, $data, $method = 'POST') {
        return $this->make_api_request($endpoint, $method, $data);
    }
    
    /**
     * AJAX handler for testing Laravel connection
     */
    public function ajax_test_laravel_connection() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $response = $this->test_api_connection();
        wp_send_json($response);
    }
    
    /**
     * AJAX handler for manual sync
     */
    public function ajax_sync_with_laravel() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $sync_type = sanitize_text_field($_POST['sync_type']);
        $results = array();
        
        switch ($sync_type) {
            case 'bookings':
                $bookings = get_posts(array('post_type' => 'bookings', 'posts_per_page' => -1));
                foreach ($bookings as $booking) {
                    $results[] = array(
                        'id' => $booking->ID,
                        'title' => $booking->post_title,
                        'success' => $this->sync_booking_to_laravel($booking->ID)
                    );
                }
                break;
                
            case 'hotels':
                $hotels = get_posts(array('post_type' => 'hotels', 'posts_per_page' => -1));
                foreach ($hotels as $hotel) {
                    $results[] = array(
                        'id' => $hotel->ID,
                        'title' => $hotel->post_title,
                        'success' => $this->sync_hotel_to_laravel($hotel->ID)
                    );
                }
                break;
                
            case 'all':
                // Sync both bookings and hotels
                $this->ajax_sync_with_laravel();
                $this->ajax_sync_with_laravel();
                break;
        }
        
        update_option('albd_last_laravel_sync', current_time('mysql'));
        
        wp_send_json_success(array(
            'message' => sprintf(__('Sync completed for %d items', 'au-lac-booking'), count($results)),
            'results' => $results
        ));
    }
    
    /**
     * AJAX handler for getting Laravel data
     */
    public function ajax_get_laravel_data() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $endpoint = sanitize_text_field($_POST['endpoint']);
        $params = isset($_POST['params']) ? $_POST['params'] : array();
        
        $response = $this->get_laravel_data($endpoint, $params);
        wp_send_json($response);
    }
    
    /**
     * AJAX handler for sending data to Laravel
     */
    public function ajax_send_to_laravel() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $endpoint = sanitize_text_field($_POST['endpoint']);
        $data = isset($_POST['data']) ? $_POST['data'] : array();
        $method = sanitize_text_field($_POST['method']) ?: 'POST';
        
        $response = $this->send_to_laravel($endpoint, $data, $method);
        wp_send_json($response);
    }
    
    /**
     * AJAX handler for updating booking status
     */
    public function ajax_update_booking_status() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $booking_id = intval($_POST['booking_id']);
        $status = sanitize_text_field($_POST['status']);
        $source = sanitize_text_field($_POST['source']);
        
        if ($booking_id && $status) {
            update_post_meta($booking_id, 'booking_status', $status);
            update_post_meta($booking_id, '_status_updated_by', $source);
            update_post_meta($booking_id, '_status_updated_at', current_time('mysql'));
            
            wp_send_json_success(array(
                'message' => __('Booking status updated successfully', 'au-lac-booking'),
                'booking_id' => $booking_id,
                'status' => $status
            ));
        } else {
            wp_send_json_error(__('Invalid booking data', 'au-lac-booking'));
        }
    }
    
    /**
     * AJAX handler for updating payment status
     */
    public function ajax_update_payment_status() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $booking_id = intval($_POST['booking_id']);
        $payment_status = sanitize_text_field($_POST['payment_status']);
        $transaction_id = sanitize_text_field($_POST['transaction_id']);
        $source = sanitize_text_field($_POST['source']);
        
        if ($booking_id && $payment_status) {
            update_post_meta($booking_id, 'payment_status', $payment_status);
            if ($transaction_id) {
                update_post_meta($booking_id, 'transaction_id', $transaction_id);
            }
            update_post_meta($booking_id, '_payment_updated_by', $source);
            update_post_meta($booking_id, '_payment_updated_at', current_time('mysql'));
            
            wp_send_json_success(array(
                'message' => __('Payment status updated successfully', 'au-lac-booking'),
                'booking_id' => $booking_id,
                'payment_status' => $payment_status
            ));
        } else {
            wp_send_json_error(__('Invalid payment data', 'au-lac-booking'));
        }
    }
    
    /**
     * AJAX handler for updating hotel data
     */
    public function ajax_update_hotel_data() {
        if (!wp_verify_nonce($_POST['nonce'], 'albd_laravel_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        $hotel_id = intval($_POST['hotel_id']);
        $data = isset($_POST['data']) ? $_POST['data'] : array();
        $source = sanitize_text_field($_POST['source']);
        
        if ($hotel_id && !empty($data)) {
            foreach ($data as $key => $value) {
                if (is_string($value)) {
                    update_post_meta($hotel_id, $key, sanitize_text_field($value));
                }
            }
            
            update_post_meta($hotel_id, '_data_updated_by', $source);
            update_post_meta($hotel_id, '_data_updated_at', current_time('mysql'));
            
            wp_send_json_success(array(
                'message' => __('Hotel data updated successfully', 'au-lac-booking'),
                'hotel_id' => $hotel_id
            ));
        } else {
            wp_send_json_error(__('Invalid hotel data', 'au-lac-booking'));
        }
    }
    
    /**
     * Scheduled sync with Laravel
     */
    public function scheduled_sync_with_laravel() {
        if (get_option('albd_laravel_auto_sync', false)) {
            $this->ajax_sync_with_laravel();
        }
    }
    
    /**
     * Log API request
     */
    private function log_api_request($endpoint, $method, $data, $response_code, $response_body) {
        if (!$this->debug_mode) {
            return;
        }
        
        $log_entry = array(
            'timestamp' => current_time('mysql'),
            'endpoint' => $endpoint,
            'method' => $method,
            'data' => $data,
            'response_code' => $response_code,
            'response_body' => $response_body
        );
        
        $logs = get_option('albd_laravel_api_logs', array());
        $logs[] = $log_entry;
        
        // Keep only last 100 entries
        if (count($logs) > 100) {
            $logs = array_slice($logs, -100);
        }
        
        update_option('albd_laravel_api_logs', $logs);
    }
    
    /**
     * Log API error
     */
    private function log_api_error($endpoint, $method, $data, $error_message) {
        $log_entry = array(
            'timestamp' => current_time('mysql'),
            'endpoint' => $endpoint,
            'method' => $method,
            'data' => $data,
            'error' => $error_message
        );
        
        $logs = get_option('albd_laravel_api_errors', array());
        $logs[] = $log_entry;
        
        // Keep only last 50 entries
        if (count($logs) > 50) {
            $logs = array_slice($logs, -50);
        }
        
        update_option('albd_laravel_api_errors', $logs);
    }
    
    /**
     * Get API logs
     */
    public function get_api_logs($type = 'requests', $limit = 50) {
        $option_name = 'albd_laravel_api_' . $type;
        $logs = get_option($option_name, array());
        return array_slice(array_reverse($logs), 0, $limit);
    }
    
    /**
     * Clear API logs
     */
    public function clear_api_logs($type = 'requests') {
        $option_name = 'albd_laravel_api_' . $type;
        delete_option($option_name);
    }
}

// Initialize the Laravel connector
new ALBD_Laravel_Connector();
