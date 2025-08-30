/**
 * OnePay Payment Gateway JavaScript
 * Handles AJAX payment processing and user interface
 * 
 * @package AuLacBookingDashboard
 * @version 1.0.0
 */

jQuery(document).ready(function($) {
    
    // Initialize OnePay payment functionality
    function initOnePayPayment() {
        console.log('OnePay Payment Gateway initialized');
        
        // Handle payment button clicks
        $('.albd-pay-button').on('click', function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $container = $button.closest('.albd-payment-container');
            var bookingId = $button.data('booking-id');
            var amount = $button.data('amount');
            var currency = $button.data('currency') || 'VND';
            
            // Show processing state
            $button.prop('disabled', true).text(albd_onepay.strings.processing);
            
            // Process payment via AJAX
            processPayment(bookingId, amount, currency, $button, $container);
        });
        
        // Handle payment status updates
        $('.albd-payment-status').each(function() {
            var $status = $(this);
            var status = $status.data('status');
            updateStatusStyling($status, status);
        });
    }
    
    /**
     * Process payment via AJAX
     */
    function processPayment(bookingId, amount, currency, $button, $container) {
        $.ajax({
            url: albd_onepay.ajax_url,
            type: 'POST',
            data: {
                action: 'albd_process_payment',
                nonce: albd_onepay.nonce,
                booking_id: bookingId,
                amount: amount,
                currency: currency
            },
            success: function(response) {
                if (response.success) {
                    // Payment URL generated successfully
                    showPaymentSuccess($container, response.data.message);
                    
                    // Redirect to OnePay payment page
                    setTimeout(function() {
                        window.location.href = response.data.payment_url;
                    }, 1500);
                    
                } else {
                    // Payment processing failed
                    showPaymentError($container, response.data);
                    resetButton($button);
                }
            },
            error: function(xhr, status, error) {
                console.error('Payment processing error:', error);
                showPaymentError($container, albd_onepay.strings.error);
                resetButton($button);
            }
        });
    }
    
    /**
     * Show payment success message
     */
    function showPaymentSuccess($container, message) {
        var $message = $('<div class="albd-payment-message albd-success">' + message + '</div>');
        $container.find('.albd-payment-message').remove();
        $container.append($message);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            $message.fadeOut();
        }, 5000);
    }
    
    /**
     * Show payment error message
     */
    function showPaymentError($container, message) {
        var $message = $('<div class="albd-payment-message albd-error">' + message + '</div>');
        $container.find('.albd-payment-message').remove();
        $container.append($message);
        
        // Auto-hide after 8 seconds
        setTimeout(function() {
            $message.fadeOut();
        }, 8000);
    }
    
    /**
     * Reset button to original state
     */
    function resetButton($button) {
        $button.prop('disabled', false).text($button.data('original-text') || 'Pay Now');
    }
    
    /**
     * Update status styling based on payment status
     */
    function updateStatusStyling($status, status) {
        $status.removeClass('albd-status-pending albd-status-completed albd-status-failed');
        $status.addClass('albd-status-' + status);
    }
    
    /**
     * Refresh payment status (for real-time updates)
     */
    function refreshPaymentStatus(bookingId, $statusContainer) {
        $.ajax({
            url: albd_onepay.ajax_url,
            type: 'POST',
            data: {
                action: 'albd_get_payment_status',
                nonce: albd_onepay.nonce,
                booking_id: bookingId
            },
            success: function(response) {
                if (response.success) {
                    var status = response.data.status;
                    var $status = $statusContainer.find('.albd-payment-status');
                    
                    $status.data('status', status).text(status);
                    updateStatusStyling($status, status);
                    
                    // Update payment button if status is completed
                    if (status === 'completed') {
                        $statusContainer.find('.albd-pay-button').prop('disabled', true).text('Paid');
                    }
                }
            }
        });
    }
    
    /**
     * Initialize payment forms
     */
    function initPaymentForms() {
        $('.albd-payment-form').on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitButton = $form.find('input[type="submit"]');
            var originalText = $submitButton.val();
            
            // Show processing state
            $submitButton.prop('disabled', true).val(albd_onepay.strings.processing);
            
            // Get form data
            var formData = $form.serializeArray();
            var paymentData = {};
            
            $.each(formData, function(i, field) {
                paymentData[field.name] = field.value;
            });
            
            // Process payment
            processPayment(
                paymentData.booking_id,
                paymentData.amount,
                paymentData.currency,
                $submitButton,
                $form
            );
        });
    }
    
    /**
     * Initialize payment history
     */
    function initPaymentHistory() {
        // Auto-refresh payment status every 30 seconds
        setInterval(function() {
            $('.albd-payment-status[data-auto-refresh="true"]').each(function() {
                var $status = $(this);
                var bookingId = $status.data('booking-id');
                var $container = $status.closest('.albd-payment-row');
                
                if (bookingId && $container.length) {
                    refreshPaymentStatus(bookingId, $container);
                }
            });
        }, 30000);
    }
    
    /**
     * Initialize payment modal
     */
    function initPaymentModal() {
        $('.albd-payment-modal-trigger').on('click', function(e) {
            e.preventDefault();
            
            var $trigger = $(this);
            var modalId = $trigger.data('modal');
            var $modal = $('#' + modalId);
            
            if ($modal.length) {
                $modal.show();
                
                // Populate modal with booking data
                var bookingId = $trigger.data('booking-id');
                var amount = $trigger.data('amount');
                var currency = $trigger.data('currency');
                
                $modal.find('[name="booking_id"]').val(bookingId);
                $modal.find('[name="amount"]').val(amount);
                $modal.find('[name="currency"]').val(currency);
                $modal.find('.albd-booking-amount').text(amount + ' ' + currency);
            }
        });
        
        // Close modal on close button or outside click
        $('.albd-modal-close, .albd-payment-modal').on('click', function(e) {
            if (e.target === this) {
                $(this).hide();
            }
        });
    }
    
    /**
     * Initialize payment statistics
     */
    function initPaymentStatistics() {
        // Refresh statistics every 5 minutes
        setInterval(function() {
            refreshPaymentStatistics();
        }, 300000);
    }
    
    /**
     * Refresh payment statistics
     */
    function refreshPaymentStatistics() {
        $.ajax({
            url: albd_onepay.ajax_url,
            type: 'POST',
            data: {
                action: 'albd_get_payment_statistics',
                nonce: albd_onepay.nonce
            },
            success: function(response) {
                if (response.success) {
                    updateStatisticsDisplay(response.data);
                }
            }
        });
    }
    
    /**
     * Update statistics display
     */
    function updateStatisticsDisplay(stats) {
        $('.albd-stat-total-attempts').text(stats.total_attempts);
        $('.albd-stat-completed').text(stats.completed);
        $('.albd-stat-pending').text(stats.pending);
        $('.albd-stat-failed').text(stats.failed);
        $('.albd-stat-total-amount').text(stats.total_amount.toLocaleString());
    }
    
    // Initialize all payment functionality
    initOnePayPayment();
    initPaymentForms();
    initPaymentHistory();
    initPaymentModal();
    initPaymentStatistics();
    
    // Export functions for global use
    window.ALBD_OnePay = {
        processPayment: processPayment,
        refreshPaymentStatus: refreshPaymentStatus,
        refreshPaymentStatistics: refreshPaymentStatistics,
        showPaymentSuccess: showPaymentSuccess,
        showPaymentError: showPaymentError
    };
    
});
