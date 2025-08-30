<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Au Lac Dashboard', 'au-lac-booking'); ?></h1>
    
    <div class="albd-dashboard-stats">
        <h2><?php _e('Booking Statistics', 'au-lac-booking'); ?></h2>
        
        <div class="albd-stats-grid">
            <div class="albd-stat-card">
                <h3><?php _e('Total Bookings', 'au-lac-booking'); ?></h3>
                <div class="albd-stat-number">
                    <?php 
                    if (post_type_exists('bookings')) {
                        $all_bookings = get_posts(array(
                            'post_type' => 'bookings',
                            'post_status' => 'any',
                            'posts_per_page' => -1
                        ));
                        echo count($all_bookings);
                    } else {
                        echo '0';
                    }
                    ?>
                </div>
            </div>
            
            <div class="albd-stat-card">
                <h3><?php _e('Pending Bookings', 'au-lac-booking'); ?></h3>
                <div class="albd-stat-number">
                    <?php 
                    if (post_type_exists('bookings')) {
                        $pending_count = 0;
                        $all_bookings = get_posts(array(
                            'post_type' => 'bookings',
                            'post_status' => 'any',
                            'posts_per_page' => -1
                        ));
                        foreach ($all_bookings as $booking) {
                            $status = get_post_meta($booking->ID, 'booking_status', true);
                            if ($status === 'pending') {
                                $pending_count++;
                            }
                        }
                        echo $pending_count;
                    } else {
                        echo '0';
                    }
                    ?>
                </div>
            </div>
            
            <div class="albd-stat-card">
                <h3><?php _e('Confirmed Bookings', 'au-lac-booking'); ?></h3>
                <div class="albd-stat-number">
                    <?php 
                    if (post_type_exists('bookings')) {
                        $confirmed_count = 0;
                        $all_bookings = get_posts(array(
                            'post_type' => 'bookings',
                            'post_status' => 'any',
                            'posts_per_page' => -1
                        ));
                        foreach ($all_bookings as $booking) {
                            $status = get_post_meta($booking->ID, 'booking_status', true);
                            if ($status === 'confirmed') {
                                $confirmed_count++;
                            }
                        }
                        echo $confirmed_count;
                    } else {
                        echo '0';
                    }
                    ?>
                </div>
            </div>
            
            <div class="albd-stat-card">
                <h3><?php _e('Total Hotels', 'au-lac-booking'); ?></h3>
                <div class="albd-stat-number">
                    <?php 
                    if (post_type_exists('hotels')) {
                        echo wp_count_posts('hotels')->publish;
                    } else {
                        echo '0';
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    
    <div class="albd-quick-actions">
        <h2><?php _e('Quick Actions', 'au-lac-booking'); ?></h2>
        
        <div class="albd-action-buttons">
            <a href="<?php echo admin_url('post-new.php?post_type=bookings'); ?>" class="button button-primary">
                <?php _e('Add New Booking', 'au-lac-booking'); ?>
            </a>
            
            <a href="<?php echo admin_url('post-new.php?post_type=hotels'); ?>" class="button button-secondary">
                <?php _e('Add New Hotel', 'au-lac-booking'); ?>
            </a>
            
            <a href="<?php echo admin_url('admin.php?page=au-lac-bookings'); ?>" class="button button-secondary">
                <?php _e('View All Bookings', 'au-lac-booking'); ?>
            </a>
            
            <a href="<?php echo admin_url('edit.php?post_type=hotels'); ?>" class="button button-secondary">
                <?php _e('View All Hotels', 'au-lac-booking'); ?>
            </a>
        </div>
    </div>
    
    <div class="albd-recent-bookings">
        <h2><?php _e('Recent Bookings', 'au-lac-booking'); ?></h2>
        
        <?php
        if (post_type_exists('bookings')) {
            $recent_bookings = get_posts(array(
                'post_type' => 'bookings',
                'post_status' => 'any',
                'posts_per_page' => 5,
                'orderby' => 'date',
                'order' => 'DESC'
            ));
            
            if ($recent_bookings) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr>';
                echo '<th>' . __('Title', 'au-lac-booking') . '</th>';
                echo '<th>' . __('Status', 'au-lac-booking') . '</th>';
                echo '<th>' . __('Date', 'au-lac-booking') . '</th>';
                echo '<th>' . __('Actions', 'au-lac-booking') . '</th>';
                echo '</tr></thead>';
                echo '<tbody>';
                
                foreach ($recent_bookings as $booking) {
                    $status = get_post_meta($booking->ID, 'booking_status', true);
                    $status_display = $status ? $status : $booking->post_status;
                    
                    echo '<tr>';
                    echo '<td>' . esc_html($booking->post_title) . '</td>';
                    echo '<td><span class="albd-status-' . esc_attr($status_display) . '">' . esc_html($status_display) . '</span></td>';
                    echo '<td>' . get_the_date('Y-m-d H:i:s', $booking->ID) . '</td>';
                    echo '<td><a href="' . get_edit_post_link($booking->ID) . '" class="button button-small">' . __('Edit', 'au-lac-booking') . '</a></td>';
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
</div>
