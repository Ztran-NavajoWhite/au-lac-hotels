<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Reports & Analytics', 'au-lac-booking'); ?></h1>
    
    <div class="albd-reports-overview">
        <h2><?php _e('Overview', 'au-lac-booking'); ?></h2>
        
        <?php
        if (post_type_exists('booking') && post_type_exists('hotel')) {
            $total_bookings = wp_count_posts('booking')->publish;
            $pending_bookings = wp_count_posts('booking')->pending;
            $confirmed_bookings = wp_count_posts('booking')->confirmed;
            $cancelled_bookings = wp_count_posts('booking')->cancelled;
            $total_hotels = wp_count_posts('hotel')->publish;
            
            echo '<div class="albd-reports-grid">';
            echo '<div class="albd-report-card">';
            echo '<h3>' . __('Total Bookings', 'au-lac-booking') . '</h3>';
            echo '<div class="albd-report-number">' . $total_bookings . '</div>';
            echo '</div>';
            
            echo '<div class="albd-report-card">';
            echo '<h3>' . __('Pending Bookings', 'au-lac-booking') . '</h3>';
            echo '<div class="albd-report-number">' . $pending_bookings . '</div>';
            echo '</div>';
            
            echo '<div class="albd-report-card">';
            echo '<h3>' . __('Confirmed Bookings', 'au-lac-booking') . '</h3>';
            echo '<div class="albd-report-number">' . $confirmed_bookings . '</div>';
            echo '</div>';
            
            echo '<div class="albd-report-card">';
            echo '<h3>' . __('Cancelled Bookings', 'au-lac-booking') . '</h3>';
            echo '<div class="albd-report-number">' . $cancelled_bookings . '</div>';
            echo '</div>';
            
            echo '<div class="albd-report-card">';
            echo '<h3>' . __('Total Hotels', 'au-lac-booking') . '</h3>';
            echo '<div class="albd-report-number">' . $total_hotels . '</div>';
            echo '</div>';
            
            echo '</div>';
        } else {
            echo '<p>' . __('Post types not available for reporting.', 'au-lac-booking') . '</p>';
        }
        ?>
    </div>
    
    <div class="albd-recent-activity">
        <h2><?php _e('Recent Activity', 'au-lac-booking'); ?></h2>
        
        <?php
        if (post_type_exists('booking')) {
            $recent_bookings = get_posts(array(
                'post_type' => 'booking',
                'post_status' => 'any',
                'posts_per_page' => 10,
                'orderby' => 'date',
                'order' => 'DESC'
            ));
            
            if ($recent_bookings) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr>';
                echo '<th>' . __('Booking', 'au-lac-booking') . '</th>';
                echo '<th>' . __('Status', 'au-lac-booking') . '</th>';
                echo '<th>' . __('Date', 'au-lac-booking') . '</th>';
                echo '</tr></thead>';
                echo '<tbody>';
                
                foreach ($recent_bookings as $booking) {
                    echo '<tr>';
                    echo '<td>' . esc_html($booking->post_title) . '</td>';
                    echo '<td>' . esc_html($booking->post_status) . '</td>';
                    echo '<td>' . get_the_date('Y-m-d H:i:s', $booking->ID) . '</td>';
                    echo '</tr>';
                }
                
                echo '</tbody></table>';
            } else {
                echo '<p>' . __('No recent activity.', 'au-lac-booking') . '</p>';
            }
        }
        ?>
    </div>
</div>
