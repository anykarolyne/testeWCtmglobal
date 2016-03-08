<?php
// Direct access security
if (!defined('TM_EPO_PLUGIN_SECURITY')){
	die();
}

class TM_EPO_Admin_Welcome {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menus') );
		add_action( 'admin_head', array( $this, 'admin_head' ) );
		add_action( 'admin_init', array( $this, 'welcome'    ) );
	}


	public function admin_menus() {

		if ( empty( $_GET['page'] ) ) {
			return;
		}

		$welcome_page_name  = __( 'About WooCommerce TM Extra Product Options', TM_EPO_TRANSLATION );
		$welcome_page_title = __( 'Welcome to WooCommerce TM Extra Product Options', TM_EPO_TRANSLATION );

		if($_GET['page']=='tm-about'){
			$page = add_dashboard_page( $welcome_page_title, $welcome_page_name, 'manage_options', 'tm-about', array( $this, 'welcome_screen' ) );
		}
	}

	public function admin_head() {
		remove_submenu_page( 'index.php', 'tm-about' );

		if (!empty($_GET['page']) && $_GET['page']=='tm-about'){
		?>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300italic,300,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic-ext,greek-ext,greek,vietnamese,latin-ext,cyrillic' rel='stylesheet' type='text/css'>
		<style type="text/css">
			/*<![CDATA[*/
			.notice, div.updated, div.error {
				display: none;
			}
			#wpcontent{
				background: #fff;
    			color: #2c3e50;
				font-family: 'Roboto',"Open Sans",sans-serif;
			}
			.wp-core-ui .button-primary:hover,.wp-core-ui .button-primary:focus {
			    background: none repeat scroll 0 0 #95a5a6;
			    border-color: #7f8c8d;
			    -webkit-box-shadow: none;
			    box-shadow: none;
			    color: #fff;
			    text-decoration: none;
			}
			.wp-core-ui .button-primary {
			    background: none repeat scroll 0 0 #ecf0f1;
			    border-color: #ecf0f1;
			    -webkit-box-shadow: none;
			    box-shadow: none;
			    color: #7f8c8d;
			    text-decoration: none;
			}
			.about-wrap h1 {
    			color: #34495e;
			}
			a {
    			color: #16a085;
			    text-decoration: none;
			}
			a:hover,a:focus{color:#2ecc71;text-decoration: underline;}

			p.tm-actions .twitter-share-button {
			    margin-left: 3px;
			    margin-top: -3px;
			    vertical-align: middle;
			}

			.tm-logo:before {
				font-family: fontawesome !important;
				content: "\f042";
				color: #fff;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				font-size: 80px;
				font-weight: normal;
				width: 165px;
				height: 165px;
				line-height: 165px;
				text-align: center;
				position: absolute;
				top: 0;
				<?php echo is_rtl() ? 'right' : 'left'; ?>: 0;
				margin: 0;
				vertical-align: middle;
			}
			.tm-logo {
				position: relative;
				background: #16a085 none repeat scroll 0 0;
				text-rendering: optimizeLegibility;
				padding-top: 130px;
				height: 35px;
				width: 165px;
				font-weight: 600;
				font-size: 14px;
				text-align: center;
				color: #fff;
				margin: 5px 0 0 0;
				-webkit-box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);
				box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);
				-web-kit-border-radius: 100%;
				-moz-border-radius: 100%;
				border-radius: 100%;
			}
			.about-wrap .tm-logo {
				position: absolute;
				top: 0;
				<?php echo is_rtl() ? 'left' : 'right'; ?>: 0;
			}
			.about-wrap .feature-section h4{
				color: #16a085;
			}
			.about-wrap .feature-section {
			    border: 0 none;
			}
			
			.about-new {
				background: #ecf0f1 none repeat scroll 0 0;
				margin: 20px 0;
				padding: 1px 20px 10px;
			}
			.about-warning {
				border: 1px dotted #1abc9c;
				background: #fafafa none repeat scroll 0 0;
				margin: 20px 0;
				padding: 1px 20px 10px;
			}
			.about-wrap .about-warning .feature-section h4{
				color: #1abc9c;
			}
			.feature-wrap h4 {
				line-height: 1.4;
			}
			/*]]>*/
		</style>
		<?php }
	}

	private function welcome_header() {

		$major_version = explode(".", TM_EPO_VERSION, 2);
		$major_version = $major_version[0];
		?>
		<h1><?php printf( __( 'Welcome to Extra Product Options %s', TM_EPO_TRANSLATION ), $major_version ); ?></h1>

		<div class="about-text woocommerce-about-text">
			<?php
				$message = __( 'Thank you for the purchase!', TM_EPO_TRANSLATION );

				printf( __( '%s If you have any questions or problems with the plugin please visit the support forum <a href="http://support.themecomplete.com">here</a>.', TM_EPO_TRANSLATION ), $message );
			?>
		</div>

		<div class="tm-logo"><?php printf( __( 'Version %s', 'woocommerce' ), TM_EPO_VERSION ); ?></div>

		<p class="tm-actions">
			<a href="<?php echo admin_url('admin.php?page=wc-settings&tab=tm_extra_product_options'); ?>" class="button button-primary"><?php _e( 'Settings', TM_EPO_TRANSLATION ); ?></a>
			<a href="<?php echo esc_url('http://epo.themecomplete.com/documentation/woocommerce-tm-extra-product-options/index.html'); ?>" class="docs button button-primary"><?php _e( 'Documentation', TM_EPO_TRANSLATION ); ?></a>
			<a href="<?php echo esc_url('http://support.themecomplete.com/'); ?>" class="docs button button-primary"><?php _e( 'Support', TM_EPO_TRANSLATION ); ?></a>
			<a href="https://twitter.com/share" class="twitter-share-button" 
			data-url="http://codecanyon.net/item/woocommerce-extra-product-options/7908619?utm_source=sharetw" 
			data-text="Check out 'WooCommerce Extra Product Options' on #EnvatoMarket by @assetsp #codecanyon" 
			data-via="themeComplete" 
			data-size="large" 
			data-hashtags="themecomplete">Tweet</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</p>


		<?php
	}

	public function welcome_screen() {
		?>
		<div class="wrap about-wrap">

			<?php $this->welcome_header(); ?>			

			<div class="feature-wrap">

				

				<div class="feature-wrap">
					<div class="wc-feature feature-section col three-col">
						<div>
							<h4><?php _e( 'Validation features', TM_EPO_TRANSLATION ); ?></h4>
							<p><?php _e( 'You can now have validation features applied to the options created with the builder when they support it. This way you create number or email fields and the customer will not be permitted to add the product to the cart if the fields do not conform to the selected validation.', TM_EPO_TRANSLATION ); ?></p>
						</div>
						<div>
							<h4><?php _e( 'Related image sizes for image replacements', TM_EPO_TRANSLATION ); ?></h4>
							<p><?php _e( 'When choosing an image replacement or a picture to replace the product image you can now select between the various image sizes that WordPress applies to that image.', TM_EPO_TRANSLATION ); ?></p>
						</div>
						<div class="last-feature">
							<h4><?php _e( 'Include additional Global forms', TM_EPO_TRANSLATION ); ?></h4>
							<p><?php _e( 'You can now include global forms to individual products even if they are not assigned to those forms. You can do that from the new settings tab.', TM_EPO_TRANSLATION ); ?></p>
						</div>
					</div>
				</div>
			</div>

			<div class="feature-wrap about-warning">
					<div class="wc-feature feature-section">
						<div>
							<h4><?php _e( 'IMPORTANT NOTICE', TM_EPO_TRANSLATION ); ?></h4>
							<p><?php _e( 'For translating options with WPML please create the product in the default language first.', TM_EPO_TRANSLATION ); ?></p>
						</div>
						 
					</div>
				</div>
			
				<p><?php _e( 'For any problems feel free to contact us at the', TM_EPO_TRANSLATION ); ?> <a href="<?php echo esc_url('http://support.themecomplete.com/'); ?>"><?php _e( 'Support forum', TM_EPO_TRANSLATION ); ?></a>.</p>

			<hr />


		</div>
		<?php
	}

	public function welcome() {

		if ( ! get_transient( '_tm_activation_redirect' ) ) {
			return;
		}

		delete_transient( '_tm_activation_redirect' );

		if ( is_network_admin() || defined( 'IFRAME_REQUEST' ) ) {
			return;
		}

		wp_redirect( admin_url( 'index.php?page=tm-about' ) );
		exit;
	}

}

$_tm_welcome = new TM_EPO_Admin_Welcome();
?>