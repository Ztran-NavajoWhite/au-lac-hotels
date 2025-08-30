/**
 * Au Lac Booking Dashboard Admin JavaScript
 */

jQuery(document).ready(function($) {
    
    // Initialize dashboard functionality
    function initDashboard() {
        console.log('Au Lac Dashboard initialized');
        
        // Add any interactive functionality here
        $('.albd-stat-card').on('click', function() {
            // Make stat cards clickable if needed
            console.log('Stat card clicked');
        });
        
        // Add hover effects to action buttons
        $('.albd-action-buttons .button').hover(
            function() {
                $(this).addClass('button-primary');
            },
            function() {
                $(this).removeClass('button-primary');
            }
        );
    }
    
    // Initialize when page loads
    initDashboard();
    
    // Refresh dashboard data (placeholder for future AJAX functionality)
    function refreshDashboardData() {
        console.log('Refreshing dashboard data...');
        // Future implementation for real-time updates
    }
    
    // Export functions for global use
    window.ALBD = {
        refreshData: refreshDashboardData,
        init: initDashboard
    };
    
});
