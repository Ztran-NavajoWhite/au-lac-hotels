<?php
/**
 * OnePay Payment Gateway for Au Lac Booking Dashboard
 * Standalone version without WooCommerce dependencies
 * 
 * @package AuLacBookingDashboard
 * @version 1.0.0
 * @author Au Lac Hotels
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ALBD_OnePay_Payment {
    
    // OnePay Configuration
    private $onepay_url;
    private $merchant_id;
    private $merchant_access_code;
    private $secure_secret;
    private $debug_mode;
    
    // Plugin settings
    private $settings;
    
    public function __construct() {
        $this->init();
        $this->add_hooks();
    }
    
    /**
     * Initialize the payment gateway
     */
    private function init() {
        $this->settings = get_option('albd_onepay_settings', array());
        
        $this->onepay_url = isset($this->settings['onepay_url']) ? $this->settings['onepay_url'] : '';
        $this->merchant_id = isset($this->settings['merchant_id']) ? $this->settings['merchant_id'] : '';
        $this->merchant_access_code = isset($this->settings['merchant_access_code']) ? $this->settings['merchant_access_code'] : '';
        $this->secure_secret = isset($this->settings['secure_secret']) ? $this->settings['secure_secret'] : '';
        $this->debug_mode = isset($this->settings['debug_mode']) ? $this->settings['debug_mode'] : false;
    }
    
    /**
     * Add WordPress hooks
     */
    private function add_hooks() {
        // AJAX handlers
        add_action('wp_ajax_albd_process_payment', array($this, 'ajax_process_payment'));
        add_action('wp_ajax_nopriv_albd_process_payment', array($this, 'ajax_process_payment'));
        
        // Admin settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // Enqueue scripts
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    /**
     * Add admin menu for OnePay settings
     */
    public function add_admin_menu() {
        add_submenu_page(
            'au-lac-dashboard',
            __('OnePay Settings', 'au-lac-booking'),
            __('OnePay Settings', 'au-lac-booking'),
            'manage_options',
            'albd-onepay-settings',
            array($this, 'admin_settings_page')
        );
    }
    
    /**
     * Register plugin settings
     */
    public function register_settings() {
        register_setting('albd_onepay_settings', 'albd_onepay_settings');
        
        add_settings_section(
            'albd_onepay_general',
            __('OnePay Configuration', 'au-lac-booking'),
            array($this, 'settings_section_callback'),
            'albd_onepay_settings'
        );
        
        add_settings_field(
            'onepay_url',
            __('OnePay URL', 'au-lac-booking'),
            array($this, 'text_field_callback'),
            'albd_onepay_settings',
            'albd_onepay_general',
            array('field' => 'onepay_url', 'description' => 'Payment gateway URL (test/live)')
        );
        
        add_settings_field(
            'merchant_id',
            __('Merchant ID', 'au-lac-booking'),
            array($this, 'text_field_callback'),
            'albd_onepay_settings',
            'albd_onepay_general',
            array('field' => 'merchant_id', 'description' => 'OnePay merchant identifier')
        );
        
        add_settings_field(
            'merchant_access_code',
            __('Merchant Access Code', 'au-lac-booking'),
            array($this, 'text_field_callback'),
            'albd_onepay_settings',
            'albd_onepay_general',
            array('field' => 'merchant_access_code', 'description' => 'Access code for payment gateway')
        );
        
        add_settings_field(
            'secure_secret',
            __('Secure Secret', 'au-lac-booking'),
            array($this, 'password_field_callback'),
            'albd_onepay_settings',
            'albd_onepay_general',
            array('field' => 'secure_secret', 'description' => 'Secret key for hash validation')
        );
        
        add_settings_field(
            'debug_mode',
            __('Debug Mode', 'au-lac-booking'),
            array($this, 'checkbox_field_callback'),
            'albd_onepay_settings',
            'albd_onepay_general',
            array('field' => 'debug_mode', 'description' => 'Enable debug logging')
        );
    }
    
    /**
     * Settings section callback
     */
    public function settings_section_callback() {
        echo '<p>' . __('Configure OnePay payment gateway settings. These settings are required for payment processing.', 'au-lac-booking') . '</p>';
    }
    
    /**
     * Text field callback
     */
    public function text_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $value = isset($this->settings[$field]) ? $this->settings[$field] : '';
        
        echo '<input type="text" name="albd_onepay_settings[' . $field . ']" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Password field callback
     */
    public function password_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $value = isset($this->settings[$field]) ? $this->settings[$field] : '';
        
        echo '<input type="password" name="albd_onepay_settings[' . $field . ']" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Checkbox field callback
     */
    public function checkbox_field_callback($args) {
        $field = $args['field'];
        $description = $args['description'];
        $checked = isset($this->settings[$field]) && $this->settings[$field] ? 'checked' : '';
        
        echo '<input type="checkbox" name="albd_onepay_settings[' . $field . ']" value="1" ' . $checked . ' />';
        echo '<p class="description">' . esc_html($description) . '</p>';
    }
    
    /**
     * Admin settings page
     */
    public function admin_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('OnePay Payment Settings', 'au-lac-booking'); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('albd_onepay_settings');
                do_settings_sections('albd_onepay_settings');
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }
    
    /**
     * Enqueue scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'albd-onepay-js',
            plugin_dir_url(__FILE__) . '../../assets/js/onepay-payment.js',
            array('jquery'),
            '1.0.0',
            true
        );
        
        wp_localize_script('albd-onepay-js', 'albd_onepay', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('albd_onepay_nonce'),
            'strings' => array(
                'processing' => __('Processing payment...', 'au-lac-booking'),
                'success' => __('Payment successful!', 'au-lac-booking'),
                'error' => __('Payment failed. Please try again.', 'au-lac-booking')
            )
        ));
    }
    
    /**
     * AJAX payment processing
     */
    public function ajax_process_payment() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'albd_onepay_nonce')) {
            wp_die(__('Security check failed', 'au-lac-booking'));
        }
        
        // Get payment data
        $booking_id = intval($_POST['booking_id']);
        $amount = floatval($_POST['amount']);
        $currency = sanitize_text_field($_POST['currency']);
        
        // Validate required fields
        if (!$booking_id || !$amount) {
            wp_send_json_error(__('Invalid payment data', 'au-lac-booking'));
        }
        
        try {
            // Generate OnePay payment URL
            $payment_url = $this->generate_payment_url($booking_id, $amount, $currency);
            
            // Update booking status
            $this->update_booking_payment_status($booking_id, 'pending');
            
            // Log payment attempt
            $this->log_payment_attempt($booking_id, $amount, $currency, 'pending');
            
            wp_send_json_success(array(
                'payment_url' => $payment_url,
                'message' => __('Payment URL generated successfully', 'au-lac-booking')
            ));
            
        } catch (Exception $e) {
            wp_send_json_error($e->getMessage());
        }
    }
    
    /**
     * Generate OnePay payment URL
     */
    private function generate_payment_url($booking_id, $amount, $currency = 'VND') {
        if (!$this->validate_settings()) {
            throw new Exception(__('OnePay settings not configured', 'au-lac-booking'));
        }
        
        // Get return URL
        $return_url = add_query_arg(array(
            'booking_id' => $booking_id,
            'payment_result' => 'return'
        ), home_url('/payment-return/'));
        
        // Build payment parameters
        $payment_params = array(
            'vpc_Locale' => get_locale() == 'vi' ? 'vn' : 'en',
            'vpc_Version' => '2',
            'vpc_Command' => 'pay',
            'vpc_Merchant' => $this->merchant_id,
            'vpc_AccessCode' => $this->merchant_access_code,
            'vpc_MerchTxnRef' => date('YmdHis') . rand(1000, 9999),
            'vpc_OrderInfo' => 'Booking-' . $booking_id,
            'vpc_Amount' => $amount * 100, // Convert to smallest currency unit
            'vpc_ReturnURL' => $return_url,
            'vpc_TicketNo' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
        );
        
        // Sort parameters alphabetically
        ksort($payment_params);
        
        // Build query string
        $query_string = '';
        $hash_data = '';
        
        foreach ($payment_params as $key => $value) {
            if (strlen($value) > 0) {
                $query_string .= ($query_string ? '&' : '') . urlencode($key) . '=' . urlencode($value);
                
                // Build hash data for vpc_ and user_ parameters
                if ((substr($key, 0, 4) == 'vpc_') || (substr($key, 0, 5) == 'user_')) {
                    $hash_data .= $key . '=' . $value . '&';
                }
            }
        }
        
        // Remove trailing & from hash data
        $hash_data = rtrim($hash_data, '&');
        
        // Generate secure hash
        $secure_hash = '';
        if (strlen($this->secure_secret) > 0) {
            $secure_hash = strtoupper(hash_hmac('SHA256', $hash_data, pack('H*', $this->secure_secret)));
        }
        
        // Build final URL
        $payment_url = $this->onepay_url . '?' . $query_string;
        if ($secure_hash) {
            $payment_url .= '&vpc_SecureHash=' . $secure_hash;
        }
        
        return $payment_url;
    }
    
    /**
     * Validate OnePay settings
     */
    private function validate_settings() {
        return !empty($this->onepay_url) && 
               !empty($this->merchant_id) && 
               !empty($this->merchant_access_code) && 
               !empty($this->secure_secret);
    }
    
    /**
     * Update booking payment status
     */
    private function update_booking_payment_status($booking_id, $status) {
        update_post_meta($booking_id, 'payment_status', $status);
        update_post_meta($booking_id, 'payment_date', current_time('mysql'));
    }
    
    /**
     * Log payment attempt
     */
    private function log_payment_attempt($booking_id, $amount, $currency, $status) {
        $log_entry = array(
            'booking_id' => $booking_id,
            'amount' => $amount,
            'currency' => $currency,
            'status' => $status,
            'timestamp' => current_time('mysql'),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        );
        
        $payment_logs = get_option('albd_payment_logs', array());
        $payment_logs[] = $log_entry;
        
        // Keep only last 1000 entries
        if (count($payment_logs) > 1000) {
            $payment_logs = array_slice($payment_logs, -1000);
        }
        
        update_option('albd_payment_logs', $payment_logs);
    }
    
    /**
     * Process payment return
     */
    public function process_payment_return($args) {
        $SECURE_SECRET = $this->secure_secret;
        $hash_validated = $this->validate_hash($args, $SECURE_SECRET);
        
        $txn_response_code = $args['vpc_TxnResponseCode'] ?? '';
        $order_info = $args['vpc_OrderInfo'] ?? '';
        
        // Extract booking ID from order info
        $booking_id = intval(str_replace('Booking-', '', $order_info));
        
        if ($hash_validated == "CORRECT") {
            if ($txn_response_code == "0") {
                // Payment successful
                $this->update_booking_payment_status($booking_id, 'completed');
                $this->log_payment_attempt($booking_id, 0, 'VND', 'completed');
                return array('success' => true, 'message' => __('Payment completed successfully', 'au-lac-booking'));
            } else {
                // Payment failed
                $this->update_booking_payment_status($booking_id, 'failed');
                $this->log_payment_attempt($booking_id, 0, 'VND', 'failed');
                return array('success' => false, 'message' => $this->get_response_description($txn_response_code));
            }
        } else {
            // Hash validation failed
            $this->update_booking_payment_status($booking_id, 'pending');
            return array('success' => false, 'message' => __('Payment verification failed', 'au-lac-booking'));
        }
    }
    
    /**
     * Validate hash from OnePay response
     */
    private function validate_hash($args, $secure_secret) {
        $vpc_secure_hash = $args['vpc_SecureHash'] ?? '';
        unset($args['vpc_SecureHash']);
        
        if (strlen($secure_secret) > 0 && isset($args['vpc_TxnResponseCode']) && $args['vpc_TxnResponseCode'] != "7") {
            ksort($args);
            $string_hash_data = "";
            
            foreach ($args as $key => $value) {
                if ($key != "vpc_SecureHash" && strlen($value) > 0 && 
                    ((substr($key, 0, 4) == "vpc_") || (substr($key, 0, 5) == "user_"))) {
                    $string_hash_data .= $key . "=" . $value . "&";
                }
            }
            
            $string_hash_data = rtrim($string_hash_data, "&");
            
            if (strtoupper($vpc_secure_hash) == strtoupper(hash_hmac('SHA256', $string_hash_data, pack('H*', $secure_secret)))) {
                return "CORRECT";
            } else {
                return "INVALID HASH";
            }
        }
        
        return "INVALID HASH";
    }
    
    /**
     * Get response description
     */
    private function get_response_description($response_code) {
        $descriptions = array(
            '0' => __('Transaction successful', 'au-lac-booking'),
            '1' => __('Bank declined transaction', 'au-lac-booking'),
            '2' => __('Bank rejected transaction', 'au-lac-booking'),
            '3' => __('No response from bank', 'au-lac-booking'),
            '4' => __('Card expired', 'au-lac-booking'),
            '5' => __('Insufficient funds', 'au-lac-booking'),
            '6' => __('Bank processing error', 'au-lac-booking'),
            '7' => __('Processing error', 'au-lac-booking'),
            '8' => __('Invalid card number', 'au-lac-booking'),
            '9' => __('Invalid cardholder name', 'au-lac-booking'),
            '10' => __('Card expired or blocked', 'au-lac-booking'),
            '11' => __('Card not registered for online payments', 'au-lac-booking'),
            '99' => __('User cancelled transaction', 'au-lac-booking')
        );
        
        return isset($descriptions[$response_code]) ? $descriptions[$response_code] : __('Unknown error', 'au-lac-booking');
    }
    
    /**
     * Get payment logs
     */
    public function get_payment_logs($limit = 50) {
        $logs = get_option('albd_payment_logs', array());
        return array_slice(array_reverse($logs), 0, $limit);
    }
    
    /**
     * Get payment statistics
     */
    public function get_payment_statistics() {
        $logs = get_option('albd_payment_logs', array());
        
        $stats = array(
            'total_attempts' => count($logs),
            'completed' => 0,
            'pending' => 0,
            'failed' => 0,
            'total_amount' => 0
        );
        
        foreach ($logs as $log) {
            if ($log['status'] == 'completed') {
                $stats['completed']++;
                $stats['total_amount'] += $log['amount'];
            } elseif ($log['status'] == 'pending') {
                $stats['pending']++;
            } elseif ($log['status'] == 'failed') {
                $stats['failed']++;
            }
        }
        
        return $stats;
    }
}

// Initialize the payment gateway
new ALBD_OnePay_Payment();
