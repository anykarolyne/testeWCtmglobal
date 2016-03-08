<?php
/*
 * Settings class.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if (class_exists('WC_Settings_Page')){

	TM_EPO_ADMIN_GLOBAL()->tm_load_scripts();

	class TM_EPO_ADMIN_SETTINGS extends WC_Settings_Page {
		var $other_settings=0;
		var $other_settings_headers=0;
		/**
		 * Constructor.
		 */
		public function __construct() {
			$this->id    = TM_ADMIN_SETTINGS_ID;
			$this->label = __('Extra Product Options', TM_EPO_TRANSLATION);
			$this->tab_count=0;

			add_filter( 'woocommerce_settings_tabs_array', array( $this, 'add_settings_page' ), 20 );
			add_action( 'woocommerce_settings_' . $this->id, array( $this, 'output' ) );
			add_action( 'woocommerce_settings_save_' . $this->id, array( $this, 'save' ) );

			add_action( 'woocommerce_admin_field_tm_tabs_header', array( $this, 'tm_tabs_header_setting' ) );
			

			add_action( 'woocommerce_settings_' . 'epo_page_options' , array( $this, 'tm_settings_hook' ) );
			add_action( 'woocommerce_settings_' . 'epo_page_options' . '_end', array( $this, 'tm_settings_hook_end' ) );
			add_action( 'woocommerce_settings_' . 'epo_page_options' . '_after', array( $this, 'tm_settings_hook_after' ) );
			add_action( 'woocommerce_settings_' . $this->id, array( $this, 'tm_settings_hook_all_end' ) );
		}

		public function tm_tabs_header_setting() {
			
			echo '<div class="tm-settings-wrap tm_wrapper">';
			
				echo '<div class="header"><h3>'.__( 'Extra Product Options Settings', TM_EPO_TRANSLATION ).'</h3></div>';
					
				echo '<div class="transition tm-tabs">';
						
					echo '<div class="transition tm-tab-headers tmsettings-tab">';

					$_general_settings 	= '<div class="tm-box">'
										. '<h4 class="tab-header open" data-id="tmsettings1-tab">'.__( 'General', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>';
					$_display_settings  = '<div class="tm-box">'
										.'<h4 class="tab-header closed" data-id="tmsettings2-tab">'.__( 'Display', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										.'</div>';
					$_cart_settings 	= '<div class="tm-box">'
										. '<h4 class="tab-header closed" data-id="tmsettings3-tab">'.__( 'Cart', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>';
					$_string_settings 	= '<div class="tm-box">'
										. '<h4 class="tab-header closed" data-id="tmsettings4-tab">'.__( 'Strings', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>';
					$_style_settings 	= '<div class="tm-box">'
										. '<h4 class="tab-header closed" data-id="tmsettings5-tab">'.__( 'Style', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>';
					$_global_settings 	= '<div class="tm-box">'
										. '<h4 class="tab-header closed" data-id="tmsettings6-tab">'.__( 'Global', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>';
					$_other_settings 	= $this->get_other_settings_headers();	
					$_license_settings 	= ( !defined('TM_DISABLE_LICENSE') )
										? '<div class="tm-box">'
										. '<h4 class="tab-header closed" data-id="tmsettings'.intval(7+$this->other_settings_headers).'-tab">'.__( 'License', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>'
										. '</div>'
										: '';
						
					echo $_general_settings.$_display_settings.$_cart_settings.$_string_settings.$_style_settings.$_global_settings.$_other_settings.$_license_settings;
				
				echo '</div>';
			
		}

		public function tm_settings_hook() {
			$this->tab_count++;
			echo '</table><div class="transition tm-tab tmsettings'.$this->tab_count.'-tab"><table class="form-table">';
		}
		public function tm_settings_hook_end() {
			echo '</table></div><table>';
		}
		public function tm_settings_hook_after() {
			
		}
		public function tm_settings_hook_all_end() {
			echo '</div></div>'; // close transition tm-tabs , tm-settings-wrap
		}
		public function get_other_settings_headers(){
			$headers='';
			if(class_exists('RP_WCDPD')){
				$this->other_settings_headers++;
				$headers .='<div class="tm-box">
						<h4 class="tab-header closed" data-id="tmsettings'.intval(6+$this->other_settings_headers).'-tab">'.__( 'Dynamic Pricing & Discounts', TM_EPO_TRANSLATION ).'<span class="fa tm-arrow fa-angle-down"></span></h4>
					</div>';
			}

			return apply_filters('tm_epo_settings_headers',$headers);
		}
		public function get_other_settings(){
			$settings=array();
			if(class_exists('RP_WCDPD')){
				$dpd=array(
					array(  
						'type' => 'title', 				
						'id' => 'epo_page_options' 
					),
					
					array(
						'title' => __( 'Enable discounts on extra options', TM_EPO_TRANSLATION ),
						'desc' 		=> '<div>'.__( 'Enabling this will apply the product discounts to the extra options as well.', TM_EPO_TRANSLATION ).'</div>',
						'id' 		=> 'tm_epo_dpd_enable',
						'class'		=> 'chosen_select',
						'css' 		=> 'min-width:300px;',
						'default'	=> 'no',
						'type' 		=> 'select',
						'options' 	=> array(
							'no' 	=> __( 'Disable', TM_EPO_TRANSLATION ),
							'yes' 	=> __( 'Enable', TM_EPO_TRANSLATION )						
						),
						'desc_tip'	=>  false,
					),
					array(
						'title' => __( 'Prefix label', TM_EPO_TRANSLATION ),
						'desc' 		=> '<div>'.__( 'Display a prefix label on product page.', TM_EPO_TRANSLATION ).'</div>',
						'id' 		=> 'tm_epo_dpd_prefix',
						'default'	=> '',
						'type' 		=> 'text',					
						'desc_tip'	=>  false,
					),
					array(
						'title' => __( 'Suffix label', TM_EPO_TRANSLATION ),
						'desc' 		=> '<div>'.__( 'Display a suffix label on product page.', TM_EPO_TRANSLATION ).'</div>',
						'id' 		=> 'tm_epo_dpd_suffix',
						'default'	=> '',
						'type' 		=> 'text',					
						'desc_tip'	=>  false,
					),

					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),

				);
				$settings=array_merge($settings,$dpd);
				$this->other_settings=$this->other_settings++;
			}

			return apply_filters('tm_epo_settings_settings',$settings);
		}
		/**
		 * Get settings array
		 *
		 * @return array
		 */
		public function get_settings() {

			$_general_settings=array(
					array( 
						'type' 	=> 'title',				
						'id' 	=> 'epo_page_options' 
						),
					array(
							'title' 	=> __( 'Enable for roles', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the roles that will have access to the extra options.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_roles_enabled',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '@everyone',
							'type' 		=> 'multiselect',
							'options' 	=> tm_get_roles(),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Final total box', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select when to show the final total box', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_final_total_box',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 				=> __( 'Show Both Final and Options total box', TM_EPO_TRANSLATION ),
								'final' 				=> __( 'Show only Final total', TM_EPO_TRANSLATION ),
								'hideoptionsifzero' 	=> __( 'Show Final total and hide Options total if zero', TM_EPO_TRANSLATION ),
								'hideifoptionsiszero' 	=> __( 'Hide Final total box if Options total is zero', TM_EPO_TRANSLATION ),
								'hide' 					=> __( 'Hide Final total box', TM_EPO_TRANSLATION ),
								'pxq' 					=> __( 'Always show only Final total (Price x Quantity)', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),		
					array(
							'title' 	=> __( 'Enable Final total box for all products', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to enable Final total box even when product has no extra options', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_enable_final_total_box_all',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Strip html from emails', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to strip the html tags from emails', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_strip_html_from_emails',
							'default' 	=> 'yes',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Disable lazy load images', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to disable lazy loading images.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_no_lazy_load',
							'default' 	=> 'yes',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),				
					array(
							'title' 	=> __( 'Enable plugin for WooCommerce shortcodes', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Enabling this will load the plugin files to all WordPress pages. Use with caution.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_enable_shortcodes',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),				
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),
			);
			
			$_display_settings=array(
					array(
						'type' 	=> 'title', 
						'id' 	=> 'epo_page_options' 
					),
					array(
							'title' 	=> __( 'Display', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'This controls how your fields are displayed on the front-end.<br />If you choose "Show using action hooks" you have to manually write the code to your theme or plugin to display the fields and the placement settings below will not work. <br />If you use Composite Products extension you must leave this setting to "Normal" otherwise the extra options cannot be displayed on the composite product bundles.<br />See more at the documentation.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_display',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' => __( 'Normal', TM_EPO_TRANSLATION ),
								'action' => __( 'Show using action hooks', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Extra Options placement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select where you want the extra options to appear.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_options_placement',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'woocommerce_before_add_to_cart_button',
							'type' 		=> 'select',
							'options' 	=> array(
								'woocommerce_before_add_to_cart_button' 		=> __( 'Before add to cart button', TM_EPO_TRANSLATION ),
								'woocommerce_after_add_to_cart_button' 			=> __( 'After add to cart button', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_add_to_cart_form' 			=> __( 'Before cart form', TM_EPO_TRANSLATION ),
								'woocommerce_after_add_to_cart_form' 			=> __( 'After cart form', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_single_product' 			=> __( 'Before product', TM_EPO_TRANSLATION ),
								'woocommerce_after_single_product' 				=> __( 'After product', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_single_product_summary' 	=> __( 'Before product summary', TM_EPO_TRANSLATION ),
								'woocommerce_after_single_product_summary' 		=> __( 'After product summary', TM_EPO_TRANSLATION ),
								
								'woocommerce_product_thumbnails' 				=> __( 'After product image', TM_EPO_TRANSLATION ),

								'custom' 										=> __( 'Custom hook', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Extra Options placement custom hook', TM_EPO_TRANSLATION ),
							'desc' 		=> '',
							'id' 		=> 'tm_epo_options_placement_custom_hook',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Totals box placement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select where you want the Totals box to appear.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_totals_box_placement',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'woocommerce_before_add_to_cart_button',
							'type' 		=> 'select',
							'options' 	=> array(
								'woocommerce_before_add_to_cart_button' 		=> __( 'Before add to cart button', TM_EPO_TRANSLATION ),
								'woocommerce_after_add_to_cart_button' 			=> __( 'After add to cart button', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_add_to_cart_form' 			=> __( 'Before cart form', TM_EPO_TRANSLATION ),
								'woocommerce_after_add_to_cart_form' 			=> __( 'After cart form', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_single_product' 			=> __( 'Before product', TM_EPO_TRANSLATION ),
								'woocommerce_after_single_product' 				=> __( 'After product', TM_EPO_TRANSLATION ),
								
								'woocommerce_before_single_product_summary' 	=> __( 'Before product summary', TM_EPO_TRANSLATION ),
								'woocommerce_after_single_product_summary' 		=> __( 'After product summary', TM_EPO_TRANSLATION ),
								
								'woocommerce_product_thumbnails' 				=> __( 'After product image', TM_EPO_TRANSLATION ),

								'custom' 										=> __( 'Custom hook', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Totals box placement custom hook', TM_EPO_TRANSLATION ),
							'desc' 		=> '',
							'id' 		=> 'tm_epo_totals_box_placement_custom_hook',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Floating Totals box', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'This will enable a floating box to display your totals box.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_floating_totals_box',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'disable',
							'type' 		=> 'select',
							'options' 	=> array(
								'disable' 		=> __( 'Disable', TM_EPO_TRANSLATION ),
								'bottom right' 	=> __( 'Bottom right', TM_EPO_TRANSLATION ),
								'bottom left' 	=> __( 'Bottom left', TM_EPO_TRANSLATION ),
								'top right' 	=> __( 'Top right', TM_EPO_TRANSLATION ),
								'top left' 		=> __( 'Bottom left', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Force Select Options', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'This changes the add to cart button to display select options when the product has extra product options.<br />Enabling this will remove the ajax functionality.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_force_select_options',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 	=> __( 'Disable', TM_EPO_TRANSLATION ),
								'display' 	=> __( 'Enable', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Remove Free price label', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to remove Free price label when product has extra options', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_remove_free_price_label',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title'		=> __( 'Hide uploaded file path', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to hide the uploaded file path from users.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_hide_upload_file_path',
							'default' 	=> 'yes',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Show quantity selector only for elements with a value', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check show quantity selector only for elements with a value.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_show_only_active_quantities',
							'default' 	=> 'yes',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Hide add-to-cart button until an option is chosen', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check this to show the add to cart button only when at least one option is filled.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_hide_add_cart_button',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Auto hide price if zero', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check this to globally hide the price display if it is zero.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_auto_hide_price_if_zero',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					(TM_EPO_WPML()->is_active())
					?
					array(
							'title' 	=> __( 'Use translated values when possible on admin Order', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Please note that if the options on the Order change or get deleted you will get worng results by enabling this!', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_wpml_order_translate',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						)
					:array(),
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),
			);

			$_cart_settings=array(
					array(  
						'type' 	=> 'title', 				
						'id' 	=> 'epo_page_options' 
						),
					array(
							'title' 	=> __( 'Clear cart button', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enables or disables the clear cart button', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_clear_cart_button',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 	=> __( 'Hide', TM_EPO_TRANSLATION ),
								'show' 		=> __( 'Show', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),	
					array(
							'title' 	=> __( 'Cart Field Display', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select how to display your fields in the cart', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_cart_field_display',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 	=> __( 'Normal display', TM_EPO_TRANSLATION ),
								'link' 		=> __( 'Display a pop-up link', TM_EPO_TRANSLATION ),
								'advanced' 	=> __( 'Advanced display', TM_EPO_TRANSLATION )
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Hide extra options in cart', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enables or disables the display of options in the cart.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_hide_options_in_cart',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 	=> __( 'Show', TM_EPO_TRANSLATION ),
								'hide' 		=> __( 'Hide', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Hide extra options prices in cart', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enables or disables the display of prices of options in the cart.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_hide_options_prices_in_cart',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'normal',
							'type' 		=> 'select',
							'options' 	=> array(
								'normal' 	=> __( 'Show', TM_EPO_TRANSLATION ),
								'hide' 		=> __( 'Hide', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					version_compare( get_option( 'woocommerce_db_version' ), '2.3', '<' )?
					array():
					array(
							'title' 	=> __( 'Prevent negative priced products', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Prevent adding to the cart negative priced products.', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_no_negative_priced_products',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),

			);

			$_string_settings=array(
					array(  
						'type' 	=> 'title', 				
						'id' 	=> 'epo_page_options' 
						),
					array(
							'title' 	=> __( 'Final total text', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the Final total text or leave blank for default.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_final_total_text',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),

					array(
							'title' 	=> __( 'Options total text', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the Options total text or leave blank for default.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_options_total_text',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),

					(tm_woocommerce_subscriptions_check())?
					array(
							'title' 	=> __( 'Subscription fee text', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the Subscription fee text or leave blank for default.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_subscription_fee_text',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						):
					array(),

					array(
							'title'	 	=> __( 'Free Price text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Free price label when product has extra options.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_replacement_free_price_text',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Reset Options text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Reset options text when using custom variations.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_reset_variation_text',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Edit Options text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Edit options text on the cart.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_edit_options_text',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title'	 	=> __( 'Additional Options text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Additional options text when using the pop up setting on the cart.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_additional_options_text',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Close button text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Close button text when using the pop up setting on the cart.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_close_button_text',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Calendar close button text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Close button text on the calendar.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_closeText',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Calendar today button text replacement', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a text to replace the Today button text on the calendar.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_currentText',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),

					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),
			);
			
			$_style_settings=array(
					array(  
						'type' 	=> 'title', 				
						'id' 	=> 'epo_page_options' 
						),
					
					array(
							'title' 	=> __( 'Enable checkbox and radio styles', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enables or disables extra styling for checkboxes and radio buttons.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_css_styles',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								'' 			=> __( 'Disable', TM_EPO_TRANSLATION ),
								'on' 		=> __( 'Enable', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Style', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select a style.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_css_styles_style',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'round',
							'type' 		=> 'select',
							'options' 	=> array(
								'round' 	=> __( 'Round', TM_EPO_TRANSLATION ),
								'square' 	=> __( 'Square', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Select item border type', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select a style for the selected border when using image replacements or swatches.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_css_selected_border',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								'' 			=> __( 'Default', TM_EPO_TRANSLATION ),
								'square' 	=> __( 'Square', TM_EPO_TRANSLATION ),
								'round' 	=> __( 'Round', TM_EPO_TRANSLATION ),
								'shadow' 	=> __( 'Shadow', TM_EPO_TRANSLATION ),
								'thinline' 	=> __( 'Thin line', TM_EPO_TRANSLATION ),								
							),
							'desc_tip'	=>  false,
						),
			
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),

			);

			$_global_settings=array(
					array(  
						'type' 	=> 'title', 				
						'id' 	=> 'epo_page_options' 
						),
					array(
							'title' 	=> __( 'Enable validation', TM_EPO_TRANSLATION ),
							'desc' 		=> __( 'Check to enable validation feature for builder elements', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_global_enable_validation',
							'default' 	=> 'yes',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Radio button undo button', TM_EPO_TRANSLATION ),
							//'desc' 		=> '<div>'.__( '', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_radio_undo_button',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								'' 			=> __( 'Use field value', TM_EPO_TRANSLATION ),
								'enable' 	=> __( 'Enable', TM_EPO_TRANSLATION ),
								'disable' 	=> __( 'Disable', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Required state indicator', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Enter a string to indicate the required state of a field.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_required_indicator',
							'default'	=> '*',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Required state indicator position', TM_EPO_TRANSLATION ),
							//'desc' 		=> '<div>'.__( '', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_required_indicator_position',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> 'left',
							'type' 		=> 'select',
							'options' 	=> array(
								'left' 		=> __( 'Left of the label', TM_EPO_TRANSLATION ),
								'right' 	=> __( 'Right of the label', TM_EPO_TRANSLATION )
								
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Include tax string suffic on totals box', TM_EPO_TRANSLATION ),
							'id' 		=> 'tm_epo_global_tax_string_suffix',
							'default' 	=> 'no',
							'type' 		=> 'checkbox',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Datepicker theme', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the theme for the datepicker.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_datepicker_theme',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								''			=> __( 'Use field value', TM_EPO_TRANSLATION ),
								'epo' 		=> __( 'Epo White', TM_EPO_TRANSLATION ),
								'epo-black' => __( 'Epo Black', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Datepicker size', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the size of the datepicker.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_datepicker_size',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								''			=> __( 'Use field value', TM_EPO_TRANSLATION ),
								'small' 	=> __( 'Small', TM_EPO_TRANSLATION ),
								'medium' 	=> __( 'Medium', TM_EPO_TRANSLATION ),
								'large' 	=> __( 'Large', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Datepicker position', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Select the position of the datepicker.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_global_datepicker_position',
							'class'		=> 'chosen_select',
							'css' 		=> 'min-width:300px;',
							'default'	=> '',
							'type' 		=> 'select',
							'options' 	=> array(
								''			=> __( 'Use field value', TM_EPO_TRANSLATION ),
								'normal' 	=> __( 'Normal', TM_EPO_TRANSLATION ),
								'top' 		=> __( 'Top of screen', TM_EPO_TRANSLATION ),
								'bottom' 	=> __( 'Bottom of screen', TM_EPO_TRANSLATION ),
							),
							'desc_tip'	=>  false,
						),							
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),

			);

			$_license_settings=(!defined('TM_DISABLE_LICENSE'))?
				array(				
					array( 
						'type' 	=> 'title', 
						'id' 	=> 'epo_page_options' 
						),
					array(
							'title' 	=> __( 'Username', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'Your Envato username.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_envato_username',
							'default'	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
							
							//'custom_attributes'=>(TM_EPO_LICENSE()->get_license())?array('disabled'=>'disabled'):""
						),
					array(
							'title' 	=> __( 'Envato API Key', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div>'.__( 'You can find your API key by visiting your Account page then clicking the My Settings tab. At the bottom of the page you’ll find your account’s API key and a button to regenerate it as needed.', TM_EPO_TRANSLATION ).'</div>',
							'id' 		=> 'tm_epo_envato_apikey',
							'default'	=> '',
							'type' 		=> 'password',					
							'desc_tip'	=>  false,
						),
					array(
							'title' 	=> __( 'Purchase code', TM_EPO_TRANSLATION ),
							'desc' 		=> '<div><p>'.__( 'Please enter your <strong>CodeCanyon WooCommerce Extra Product Options purchase code</strong>.', TM_EPO_TRANSLATION ).'</p><p>'.__( 'To access your Purchase Code for an item:', TM_EPO_TRANSLATION ).'</p>'
											.'<ol>'
											.'<li>'.__('Log into your Marketplace account', TM_EPO_TRANSLATION ).'</li>'
											.'<li>'.__('From your account dropdown links, select "Downloads"', TM_EPO_TRANSLATION ).'</li>'
											.'<li>'.__('Click the "Download" button that corresponds with your purchase', TM_EPO_TRANSLATION ).'</li>'
											.'<li>'.__('Select the "License certificate &amp; purchase code" download link. Your Purchase Code will be displayed within the License Certificate.', TM_EPO_TRANSLATION ).'</li>'
											.'</ol>'
											.'<p><img alt="Purchase Code Location" src="'.TM_PLUGIN_URL.'/assets/images/download_button.gif" title="Purchase Code Location" style="vertical-align: middle;"></p>'
											.'<div class="tm-license-button">'
											
											.'<a href="#" class="'.(TM_EPO_LICENSE()->get_license()?"":"tm-hidden ").'tm-button button button-primary button-large tm-deactivate-license" id="tm_deactivate_license">'.__('Deactivate License', TM_EPO_TRANSLATION ).'</a>'
											.'<a href="#" class="'.(TM_EPO_LICENSE()->get_license()?"tm-hidden ":"").'tm-button button button-primary button-large tm-activate-license" id="tm_activate_license">'.__('Activate License', TM_EPO_TRANSLATION ).'</a>'
											
											.'</div>'
											.'<div class="tm-license-result">'
											.((TM_EPO_LICENSE()->get_license())?
											"<div class='activated'><p>".__("License activated.",TM_EPO_TRANSLATION)."</p></div>"
											:""
											)
											.'</div>'
											.'</div>',
							'id' 		=> 'tm_epo_envato_purchasecode',
							'default' 	=> '',
							'type' 		=> 'text',					
							'desc_tip'	=>  false,
							//'custom_attributes'=>(TM_EPO_LICENSE()->get_license())?array('disabled'=>'disabled'):""
						),
					array( 'type' => 'sectionend', 'id' => 'epo_page_options' ),		
				):array();

			return apply_filters( 'tm_' . $this->id . '_settings', 
				array_merge(
					array(
						array( 'type' => 'tm_tabs_header' )
					),
					$_general_settings,
					$_display_settings,
					$_cart_settings,
					$_string_settings,
					$_style_settings,
					$_global_settings,
					$this->get_other_settings(),
					$_license_settings
				)
			); // End pages settings
		}
	}
	//new TM_EPO_ADMIN_SETTINGS();
}
?>