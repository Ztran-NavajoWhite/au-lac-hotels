/**
 * Laravel Backend Connector JavaScript
 * Handles API communication and data synchronization with Laravel backend
 * 
 * @package AuLacBookingDashboard
 * @version 1.0.0
 */

jQuery(document).ready(function($) {
    
    // Initialize Laravel connector functionality
    function initLaravelConnector() {
        console.log('Laravel Backend Connector initialized');
        
        // Handle test connection button
        $('#test-connection').on('click', function() {
            testLaravelConnection();
        });
        
        // Handle manual sync button
        $('#manual-sync').on('click', function() {
            showSyncOptions();
        });
        
        // Handle sync type selection
        $(document).on('click', '.sync-option', function() {
            var syncType = $(this).data('sync-type');
            performManualSync(syncType);
        });
    }
    
    /**
     * Test connection to Laravel backend
     */
    function testLaravelConnection() {
        var $button = $('#test-connection');
        var originalText = $button.text();
        
        $button.prop('disabled', true).text('Testing...');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'albd_test_laravel_connection',
                nonce: albd_laravel.nonce
            },
            success: function(response) {
                if (response.success) {
                    showLaravelResult('success', 'Connection successful!', response.data);
                    // Refresh the page to update connection status
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                } else {
                    showLaravelResult('error', 'Connection failed', response.data);
                }
            },
            error: function(xhr, status, error) {
                showLaravelResult('error', 'Request failed', error);
            },
            complete: function() {
                $button.prop('disabled', false).text(originalText);
            }
        });
    }
    
    /**
     * Show sync options modal
     */
    function showSyncOptions() {
        var modal = `
            <div class="albd-sync-modal" style="display: block;">
                <div class="albd-sync-modal-content">
                    <span class="albd-modal-close">&times;</span>
                    <h3>Select Sync Type</h3>
                    <div class="albd-sync-options">
                        <button class="button button-primary sync-option" data-sync-type="bookings">
                            Sync Bookings Only
                        </button>
                        <button class="button button-primary sync-option" data-sync-type="hotels">
                            Sync Hotels Only
                        </button>
                        <button class="button button-secondary sync-option" data-sync-type="all">
                            Sync All Data
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modal);
        
        // Close modal on close button or outside click
        $('.albd-modal-close, .albd-sync-modal').on('click', function(e) {
            if (e.target === this) {
                $('.albd-sync-modal').remove();
            }
        });
    }
    
    /**
     * Perform manual sync with Laravel
     */
    function performManualSync(syncType) {
        $('.albd-sync-modal').remove();
        
        var $button = $('#manual-sync');
        var originalText = $button.text();
        
        $button.prop('disabled', true).text('Syncing...');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'albd_sync_with_laravel',
                nonce: albd_laravel.nonce,
                sync_type: syncType
            },
            success: function(response) {
                if (response.success) {
                    showLaravelResult('success', response.data.message, response.data.results);
                } else {
                    showLaravelResult('error', 'Sync failed', response.data);
                }
            },
            error: function(xhr, status, error) {
                showLaravelResult('error', 'Sync request failed', error);
            },
            complete: function() {
                $button.prop('disabled', false).text(originalText);
            }
        });
    }
    
    /**
     * Show Laravel operation result
     */
    function showLaravelResult(type, message, data) {
        var $results = $('#laravel-action-results');
        var cssClass = type === 'success' ? 'notice-success' : 'notice-error';
        
        var resultHtml = `
            <div class="notice ${cssClass}">
                <p><strong>${message}</strong></p>
        `;
        
        if (data && Array.isArray(data)) {
            resultHtml += '<ul>';
            data.forEach(function(item) {
                var status = item.success ? '✅' : '❌';
                resultHtml += `<li>${status} ${item.title} (ID: ${item.id})</li>`;
            });
            resultHtml += '</ul>';
        }
        
        resultHtml += '</div>';
        
        $results.html(resultHtml);
        
        // Auto-hide after 10 seconds
        setTimeout(function() {
            $results.find('.notice').fadeOut();
        }, 10000);
    }
    
    /**
     * Get data from Laravel backend
     */
    function getLaravelData(endpoint, params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'albd_get_laravel_data',
                    nonce: albd_laravel.nonce,
                    endpoint: endpoint,
                    params: params
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(xhr, status, error) {
                    reject(error);
                }
            });
        });
    }
    
    /**
     * Send data to Laravel backend
     */
    function sendToLaravel(endpoint, data, method) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'albd_send_to_laravel',
                    nonce: albd_laravel.nonce,
                    endpoint: endpoint,
                    data: data,
                    method: method
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(xhr, status, error) {
                    reject(error);
                }
            });
        });
    }
    
    /**
     * Sync specific post to Laravel
     */
    function syncPostToLaravel(postId, postType) {
        var data = {
            id: postId,
            type: postType,
            action: 'sync'
        };
        
        return sendToLaravel('/api/' + postType + '/sync', data, 'POST');
    }
    
    /**
     * Get advanced analytics from Laravel
     */
    function getLaravelAnalytics(timeframe) {
        var params = {
            timeframe: timeframe || 'month',
            include_metrics: true
        };
        
        return getLaravelData('/api/analytics', params);
    }
    
    /**
     * Get business intelligence data
     */
    function getBusinessIntelligence() {
        return getLaravelData('/api/business-intelligence');
    }
    
    /**
     * Get revenue reports
     */
    function getRevenueReports(startDate, endDate) {
        var params = {
            start_date: startDate,
            end_date: endDate,
            currency: 'VND'
        };
        
        return getLaravelData('/api/reports/revenue', params);
    }
    
    /**
     * Get occupancy reports
     */
    function getOccupancyReports(hotelId, startDate, endDate) {
        var params = {
            hotel_id: hotelId,
            start_date: startDate,
            end_date: endDate
        };
        
        return getLaravelData('/api/reports/occupancy', params);
    }
    
    /**
     * Get customer insights
     */
    function getCustomerInsights() {
        return getLaravelData('/api/analytics/customers');
    }
    
    /**
     * Send notification to Laravel
     */
    function sendNotification(type, data) {
        var notificationData = {
            type: type,
            data: data,
            timestamp: new Date().toISOString(),
            source: 'wordpress'
        };
        
        return sendToLaravel('/api/notifications', notificationData, 'POST');
    }
    
    /**
     * Get real-time updates from Laravel
     */
    function getRealTimeUpdates() {
        return getLaravelData('/api/real-time/updates');
    }
    
    /**
     * Initialize real-time updates
     */
    function initRealTimeUpdates() {
        // Poll for updates every 30 seconds
        setInterval(function() {
            getRealTimeUpdates().then(function(response) {
                if (response.success && response.data.updates) {
                    handleRealTimeUpdates(response.data.updates);
                }
            }).catch(function(error) {
                console.error('Real-time update failed:', error);
            });
        }, 30000);
    }
    
    /**
     * Handle real-time updates
     */
    function handleRealTimeUpdates(updates) {
        updates.forEach(function(update) {
            switch (update.type) {
                case 'booking_status_changed':
                    updateBookingStatus(update.data);
                    break;
                case 'payment_received':
                    updatePaymentStatus(update.data);
                    break;
                case 'new_booking':
                    showNewBookingNotification(update.data);
                    break;
                case 'hotel_updated':
                    updateHotelData(update.data);
                    break;
            }
        });
    }
    
    /**
     * Update booking status in WordPress
     */
    function updateBookingStatus(data) {
        // Update WordPress post meta
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'albd_update_booking_status',
                nonce: albd_laravel.nonce,
                booking_id: data.booking_id,
                status: data.status,
                source: 'laravel'
            },
            success: function(response) {
                if (response.success) {
                    // Refresh the page or update UI elements
                    if (window.location.href.includes('bookings')) {
                        location.reload();
                    }
                }
            }
        });
    }
    
    /**
     * Update payment status in WordPress
     */
    function updatePaymentStatus(data) {
        // Update WordPress payment meta
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'albd_update_payment_status',
                nonce: albd_laravel.nonce,
                booking_id: data.booking_id,
                payment_status: data.payment_status,
                transaction_id: data.transaction_id,
                source: 'laravel'
            },
            success: function(response) {
                if (response.success) {
                    // Show success notification
                    showNotification('Payment updated successfully', 'success');
                }
            }
        });
    }
    
    /**
     * Show new booking notification
     */
    function showNewBookingNotification(data) {
        var notification = `
            <div class="albd-notification albd-new-booking">
                <h4>New Booking Received</h4>
                <p><strong>Guest:</strong> ${data.guest_name}</p>
                <p><strong>Hotel:</strong> ${data.hotel_name}</p>
                <p><strong>Check-in:</strong> ${data.check_in}</p>
                <p><strong>Amount:</strong> ${data.amount} ${data.currency}</p>
                <button class="button button-primary view-booking" data-booking-id="${data.booking_id}">
                    View Booking
                </button>
            </div>
        `;
        
        // Add notification to dashboard
        $('.albd-dashboard-stats').before(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(function() {
            $('.albd-notification').fadeOut();
        }, 10000);
    }
    
    /**
     * Update hotel data in WordPress
     */
    function updateHotelData(data) {
        // Update WordPress hotel meta
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'albd_update_hotel_data',
                nonce: albd_laravel.nonce,
                hotel_id: data.hotel_id,
                data: data,
                source: 'laravel'
            },
            success: function(response) {
                if (response.success) {
                    // Show success notification
                    showNotification('Hotel data updated successfully', 'success');
                }
            }
        });
    }
    
    /**
     * Show notification
     */
    function showNotification(message, type) {
        var cssClass = type === 'success' ? 'notice-success' : 'notice-info';
        var notification = `
            <div class="notice ${cssClass} is-dismissible">
                <p>${message}</p>
            </div>
        `;
        
        // Add to admin notices area
        $('.wrap h1').after(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            $('.notice').fadeOut();
        }, 5000);
    }
    
    /**
     * Initialize dashboard integration
     */
    function initDashboardIntegration() {
        // Add Laravel data to dashboard if available
        if (typeof albd_laravel !== 'undefined' && albd_laravel.connected) {
            getLaravelAnalytics('month').then(function(response) {
                if (response.success) {
                    updateDashboardWithLaravelData(response.data);
                }
            });
        }
    }
    
    /**
     * Update dashboard with Laravel data
     */
    function updateDashboardWithLaravelData(data) {
        // Update statistics with Laravel data
        if (data.statistics) {
            $('.albd-stat-card').each(function() {
                var $card = $(this);
                var statType = $card.find('h3').text().toLowerCase();
                
                if (data.statistics[statType]) {
                    $card.find('.albd-stat-number').text(data.statistics[statType]);
                    $card.addClass('laravel-enhanced');
                }
            });
        }
        
        // Add Laravel insights if available
        if (data.insights) {
            addLaravelInsights(data.insights);
        }
    }
    
    /**
     * Add Laravel insights to dashboard
     */
    function addLaravelInsights(insights) {
        var insightsHtml = `
            <div class="albd-laravel-insights">
                <h2>Business Insights from Laravel Backend</h2>
                <div class="albd-insights-grid">
        `;
        
        insights.forEach(function(insight) {
            insightsHtml += `
                <div class="albd-insight-card">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                    <div class="albd-insight-value">${insight.value}</div>
                </div>
            `;
        });
        
        insightsHtml += '</div></div>';
        
        $('.albd-recent-bookings').after(insightsHtml);
    }
    
    // Initialize all functionality
    initLaravelConnector();
    
    // Initialize real-time updates if on dashboard
    if (window.location.href.includes('au-lac-dashboard')) {
        initRealTimeUpdates();
        initDashboardIntegration();
    }
    
    // Export functions for global use
    window.ALBD_Laravel = {
        testConnection: testLaravelConnection,
        performSync: performManualSync,
        getData: getLaravelData,
        sendData: sendToLaravel,
        syncPost: syncPostToLaravel,
        getAnalytics: getLaravelAnalytics,
        getBusinessIntelligence: getBusinessIntelligence,
        getRevenueReports: getRevenueReports,
        getOccupancyReports: getOccupancyReports,
        getCustomerInsights: getCustomerInsights,
        sendNotification: sendNotification,
        getRealTimeUpdates: getRealTimeUpdates
    };
    
});
