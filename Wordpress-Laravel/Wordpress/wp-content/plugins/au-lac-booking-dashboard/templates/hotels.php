<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1 class="wp-heading-inline"><?php _e('Hotels', 'au-lac-booking'); ?></h1>
    <a href="<?php echo admin_url('post-new.php?post_type=hotels'); ?>" class="page-title-action">
        <?php _e('Add New', 'au-lac-booking'); ?>
    </a>
    <hr class="wp-header-end">
    
    <?php
    // Check if the hotels post type exists (your existing one)
    if (post_type_exists('hotels')) {
        // Get all hotels from your existing post type
        $hotels = get_posts(array(
            'post_type' => 'hotels',
            'post_status' => 'any',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC'
        ));
        
        if ($hotels) {
            echo '<table class="wp-list-table widefat fixed striped">';
            echo '<thead><tr>';
            echo '<th>' . __('Hotel Name', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Status', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Date Added', 'au-lac-booking') . '</th>';
            echo '<th>' . __('Actions', 'au-lac-booking') . '</th>';
            echo '</tr></thead>';
            echo '<tbody>';
            
            foreach ($hotels as $hotel) {
                echo '<tr>';
                echo '<td><strong>' . esc_html($hotel->post_title) . '</strong></td>';
                echo '<td>' . esc_html($hotel->post_status) . '</td>';
                echo '<td>' . get_the_date('Y-m-d H:i:s', $hotel->ID) . '</td>';
                echo '<td>';
                echo '<a href="' . get_edit_post_link($hotel->ID) . '" class="button button-small">' . __('Edit', 'au-lac-booking') . '</a> ';
                echo '<a href="' . get_permalink($hotel->ID) . '" class="button button-small" target="_blank">' . __('View', 'au-lac-booking') . '</a>';
                echo '</td>';
                echo '</tr>';
            }
            
            echo '</tbody></table>';
        } else {
            echo '<p>' . __('No hotels found.', 'au-lac-booking') . '</p>';
        }
    } else {
        echo '<div class="notice notice-warning">';
        echo '<p><strong>' . __('Hotel Post Type Not Found', 'au-lac-booking') . '</strong></p>';
        echo '<p>' . __('The hotel post type is not available. This template is designed to work with your existing hotel post type (menu position: 20).', 'au-lac-booking') . '</p>';
        echo '<p>' . __('Please ensure your hotel post type is properly registered and active.', 'au-lac-booking') . '</p>';
        echo '</div>';
    }
    ?>
</div>
