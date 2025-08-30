<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1 class="wp-heading-inline"><?php _e('Bookings', 'au-lac-booking'); ?></h1>
    <a href="<?php echo admin_url('post-new.php?post_type=bookings'); ?>" class="page-title-action">
        <?php _e('Add New', 'au-lac-booking'); ?>
    </a>
    <hr class="wp-header-end">
    
    <?php
    // Check if the bookings post type exists (your existing one)
    if (post_type_exists('bookings')) {
        // Get all bookings from your existing post type
        $bookings = get_posts(array(
            'post_type' => 'bookings',
            'post_status' => 'any',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC'
        ));
        
        if ($bookings) {
            echo '<table class="wp-list-table widefat fixed striped">';
            echo '<thead><tr>';
            echo '<th>' . __('Title', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Status', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Date', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Actions', 'au-lac-booking') . '</th>';
            echo '</tr></thead>';
            echo '<tbody>';
            
            foreach ($bookings as $booking) {
                $status = get_post_meta($booking->ID, 'booking_status', true);
                $status_display = $status ? $status : $booking->post_status;
                
                echo '<tr>';
                echo '<td><strong>' . esc_html($booking->post_title) . '</strong></td>';
                echo '<td><span class="albd-status-' . esc_attr($status_display) . '">' . esc_html($status_display) . '</span></td>';
                echo '<td>' . get_the_date('Y-m-d H:i:s', $booking->ID) . '</td>';
                echo '<td>';
                echo '<a href="' . get_edit_post_link($booking->ID) . '" class="button button-small">' . __('Edit', 'au-lac-booking') . '</a> ';
                echo '<a href="' . get_permalink($booking->ID) . '" class="button button-small" target="_blank">' . __('View', 'au-lac-booking') . '</a>';
                echo '</td>';
                echo '</tr>';
            }
            
            echo '</tbody></table>';
        } else {
            echo '<p>' . __('No bookings found.', 'au-lac-booking') . '</p>';
        }
    } else {
        echo '<p>' . __('Booking post type not available.', 'au-lac-booking') . '</p>';
    }
    ?>
</div>
