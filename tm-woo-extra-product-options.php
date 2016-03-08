<?php
/*
Plugin Name: WooCommerce TM Extra Product Options
Plugin URI: http://epo.themecomplete.com/
Description: A WooCommerce plugin for adding extra product options.
Version: 4.0.5
Author: themecomplete
Author URI: http://themecomplete.com/
*/

define ( 'TM_EPO_PLUGIN_SECURITY', 1 );
define ( 'TM_EPO_VERSION', "4.0.5" );
define ( 'TM_PLUGIN_ID', '7908619' );
define ( 'TM_EPO_TRANSLATION', 'woocommerce-tm-extra-product-options' );
define ( 'TM_EPO_LOCAL_POST_TYPE', "tm_product_cp" );
define ( 'TM_EPO_GLOBAL_POST_TYPE', "tm_global_cp" );
define ( 'TM_EPO_GLOBAL_POST_TYPE_PAGE_HOOK', "tm-global-epo" );
define ( 'TM_EPO_WPML_LANG_META', "tm_meta_lang" );
define ( 'TM_EPO_WPML_PARENT_POSTID', "tm_meta_parent_post_id" );
define ( 'TM_PLUGIN_PATH', untrailingslashit( plugin_dir_path(  __FILE__ ) ) );
define ( 'TM_TEMPLATE_PATH', TM_PLUGIN_PATH.'/templates/');
define ( 'TM_PLUGIN_URL', untrailingslashit( plugins_url( '/', __FILE__ ) ) );
define ( 'TM_PLUGIN_NAME_HOOK', plugin_basename(__FILE__) );
define ( 'TM_ADMIN_SETTINGS_ID', 'tm_extra_product_options' );
define ( 'TM_PLUGIN_SLUG', basename( dirname( __FILE__ ) ).'/'.basename( __FILE__ ));

// Auto-load classes on demand
spl_autoload_register( 'tm_epo_autoload' );

/**
 * Auto-load classes on demand.
 *
 * @param mixed $class
 */
function tm_epo_autoload( $class ) {
    
    $path  = null;
    $original_class = $class;
    $class = strtolower( $class );
    $file = 'class-' . str_replace( '_', '-', $class ) . '.php';

    if ( strpos( $class, 'tm_epo_fields' ) === 0 ) {
        $path = TM_PLUGIN_PATH . '/include/fields/';
    } elseif ( strpos( $class, 'tm_epo_admin_' ) === 0 ) {
        $path = TM_PLUGIN_PATH . '/admin/';
    } elseif ( strpos( $class, 'tm_extra_' ) === 0 ) {
        $path = TM_PLUGIN_PATH . '/include/';
    } elseif ( strpos( $class, 'tm_epo_' ) === 0 ) {
        $path = TM_PLUGIN_PATH . '/include/';
    } 

    // Composite products sometimes do not load the Discount and Pricing classes
    if ( $original_class=="RP_WCDPD_Pricing" && defined('TM_EPO_INCLUDED') && defined('RP_WCDPD_PLUGIN_PATH') ){
        $path = RP_WCDPD_PLUGIN_PATH . 'includes/classes/';
        $file = 'Pricing.php';
    }                   
                
    if ( $path && is_readable( $path . $file ) ) {
        include_once( $path . $file );
        return;
    }

}

/**
 * Help functions
 */
require_once ( TM_PLUGIN_PATH.'/include/tm-functions.php' );

/**
 * HTML functions
 */
function TM_EPO_HTML() {
    return TM_EPO_HTML_base::instance();
}

/**
 * HELPER functions
 */
function TM_EPO_HELPER() {
    return TM_EPO_HELPER_base::instance();
}

/**
 * WPML functions
 */
function TM_EPO_WPML() {
    return TM_EPO_WPML_base::instance();
}

/**
 * UPDATE functions
 */
function TM_EPO_LICENSE() {
    return TM_EPO_UPDATE_Licenser::instance();
}
TM_EPO_LICENSE()->init();

function TM_EPO_UPDATER() {
    return TM_EPO_UPDATE_Updater::instance();
}
TM_EPO_UPDATER()->init();

/**
 * Plugin health check
 */
function TM_EPO_CHECK() {
    return TM_EPO_CHECK_base::instance();
}
register_activation_hook( __FILE__, array( 'TM_EPO_CHECK_base', 'activation_check' ) );

if (TM_EPO_CHECK()->stop_plugin()){
    return;
}

if ( tm_woocommerce_check() ) {

    /**
     * Load plugin textdomain.
     */
    function tm_epo_load_textdomain() {
        load_plugin_textdomain( TM_EPO_TRANSLATION, false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' ); 
    }
    add_action( 'plugins_loaded', 'tm_epo_load_textdomain' );    

    /**
     *  Register post types
     */
    function tm_epo_register_post_type(){
        register_post_type( TM_EPO_LOCAL_POST_TYPE,
            array(
                'labels'                => array(
                    'name' => _x( 'TM Extra Product Options', 'post type general name' , TM_EPO_TRANSLATION)
                ),
                'publicly_queryable'    => false,
                'exclude_from_search'   => true,
                'rewrite'               => false,
                'show_in_nav_menus'     => false,
                'public'                => false,
                'hierarchical'          => false,
                'supports'              => false
            )
        );
        register_post_type( TM_EPO_GLOBAL_POST_TYPE,
            array(
                'labels' => array(
                            'name'               => __( 'TM Global Forms', TM_EPO_TRANSLATION ),
                            'singular_name'      => __( 'TM Global Form', TM_EPO_TRANSLATION ),
                            'menu_name'          => _x( 'TM Global Product Options', 'post type general name', TM_EPO_TRANSLATION ),
                            'add_new'            => __( 'Add Global Form', TM_EPO_TRANSLATION ),
                            'add_new_item'       => __( 'Add New Global Form', TM_EPO_TRANSLATION ),
                            'edit'               => __( 'Edit', TM_EPO_TRANSLATION ),
                            'edit_item'          => __( 'Edit Global Form', TM_EPO_TRANSLATION ),
                            'new_item'           => __( 'New Global Form', TM_EPO_TRANSLATION ),
                            'view'               => __( 'View Global Form', TM_EPO_TRANSLATION ),
                            'view_item'          => __( 'View Global Form', TM_EPO_TRANSLATION ),
                            'search_items'       => __( 'Search Global Form', TM_EPO_TRANSLATION ),
                            'not_found'          => __( 'No Global Form found', TM_EPO_TRANSLATION ),
                            'not_found_in_trash' => __( 'No Global Form found in trash', TM_EPO_TRANSLATION ),
                            'parent'             => __( 'Parent Global Form', TM_EPO_TRANSLATION )
                        ),
                'description'         => __( 'This is where you can add new products to your store.', 'woocommerce' ),
                'public'              => false,
                'show_ui'             => false,
                'capability_type'     => 'product',
                'map_meta_cap'        => true,
                'publicly_queryable'  => false,
                'exclude_from_search' => true,
                'hierarchical'        => false,
                'rewrite'             => false,
                'query_var'           => false,
                'supports'            => array( 'title', 'excerpt' ),
                'has_archive'         => false,
                'show_in_nav_menus'   => false
            )

        );
        register_taxonomy_for_object_type( 'product_cat', TM_EPO_GLOBAL_POST_TYPE );

    }
    add_action( 'init', 'tm_epo_register_post_type' );    

    /* Load Builder */
    function TM_EPO_BUILDER() {
        return TM_EPO_BUILDER_base::instance();
    }

    /**
     * Load admin interface
     */
    if ( is_admin() ) {

        include_once( TM_PLUGIN_PATH.'/include/tm-welcome.php' );
        
        /* Settings Page */
        function tm_add_epo_admin_settings($settings){            
            $_setting = new TM_EPO_ADMIN_SETTINGS();
            if ( $_setting instanceof WC_Settings_Page ) {
                $settings[] = $_setting;
            }
            return $settings;
        }
        add_filter( 'woocommerce_get_settings_pages', 'tm_add_epo_admin_settings' );

        /* woocommerce_bundle_rate_shipping chosen fix by removing */
        add_action('admin_enqueue_scripts',  'tm_fix_woocommerce_bundle_rate_shipping_scripts'  ,99);
        function tm_fix_woocommerce_bundle_rate_shipping_scripts(){
            if (!(isset($_GET['page']) && isset($_GET['tab']) && $_GET['page']=='wc-settings' && $_GET['tab']=='shipping' )){
                wp_dequeue_script( 'woocommerce_bundle_rate_shipping_admin_js');
            }
        }

        /* Load Globals Admin Interface */
        function TM_EPO_ADMIN_GLOBAL() {
            return TM_EPO_ADMIN_Global_base::instance();
        }
        TM_EPO_ADMIN_GLOBAL()->init();

        /* Load Admin Interface */
        function TM_EPO_ADMIN() {
            return TM_EPO_Admin_base::instance();
        }
        TM_EPO_ADMIN()->init();
        
    }

    /**
     * Load main plugin interface
     */
    function TM_EPO() {
        return TM_Extra_Product_Options::instance();
    }
    TM_EPO()->init();
}

?>