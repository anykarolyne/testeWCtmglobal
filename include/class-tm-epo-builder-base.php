<?php
/* Security: Disables direct access to theme files */
if ( !defined( 'TM_EPO_PLUGIN_SECURITY' ) ) {
	die();
}

/**
 * TM EPO Builder
 */
final class TM_EPO_BUILDER_base {

	protected static $_instance = null;

	var $plugin_path;
	var $template_path;
	var $plugin_url;

	private $all_elements;

	// element options
	public $elements_array;

	private $addons_array=array();

	private $addons_attributes=array();

	// sections options
	public $_section_elements=array();

	// sizes display
	var $sizer;

	// WooCommerce Subscriptions check
	var $woo_subscriptions_check=false;

	/* Main TM EPO Builder Instance */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	function __construct() {

		$this->plugin_path      		= untrailingslashit( plugin_dir_path(  dirname( __FILE__ )  ) );
		$this->template_path    		= $this->plugin_path.'/templates/';
		$this->plugin_url       		= untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );
		$this->woo_subscriptions_check 	= tm_woocommerce_subscriptions_check();

		// element available sizes
		$this->element_available_sizes();
		
		// init section elements
		$this->init_section_elements();

		// init elements
		$this->init_elements();

	}

	/**
	 * Holds all the elements types.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function _elements() {
		/*
		[name]=Displayed name
		[width]=Initial width
		[width_display]=Initial width display
		[icon]=icon
		[is_post]=if it is post enabled field
		[type]=if it can hold multiple or single options (for post enabled fields)
		[post_name_prefix]=name for post purposes
		[fee_type]=can set cart fees
		[subscription_fee_type]=can set subscription fees
		*/
		$this->all_elements=array(
			"header"  		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Heading", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-header",
								"is_post" 				=> "display",
								"type" 					=> "",
								"post_name_prefix" 		=> "",
								"fee_type" 				=> "",
								"subscription_fee_type" 	=> "" ),
			"divider"  		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Divider", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-long-arrow-right",
								"is_post" 				=> "none",
								"type" 					=> "",
								"post_name_prefix" 		=> "",
								"fee_type" 				=> "",
								"subscription_fee_type" 	=> "" ),
			"date"  		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Date", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-calendar",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "date",
								"fee_type" 				=> "single",
								"subscription_fee_type" 	=> "single" ),
			"range"  		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Range picker", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-arrows-h",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "range",
								"fee_type" 				=> "single",
								"subscription_fee_type" 	=> "single" ),			
			"color"  		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Color picker", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-eyedropper",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "color",
								"fee_type" 				=> "single",
								"subscription_fee_type" 	=> "single" ),
			"textarea" 		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Text Area", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-terminal",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "textarea",
								"fee_type" 				=> "single",
								"subscription_fee_type" 	=> "single" ),
			"textfield" 	=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Text Field", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-terminal",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "textfield",
								"fee_type" 				=> "single",
								"subscription_fee_type" 	=> "single" ),			
			"upload" 		=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Upload", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-upload",
								"is_post" 				=> "post",
								"type" 					=> "single",
								"post_name_prefix" 		=> "upload",
								"fee_type" 				=> "",
								"subscription_fee_type" 	=> "" ),	
			"selectbox" 	=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Select Box", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-bars",
								"is_post" 				=> "post",
								"type" 					=> "multiplesingle",
								"post_name_prefix" 		=> "select",
								"fee_type" 				=> "multiple",
								"subscription_fee_type" 	=> "multiple" ),
			"radiobuttons" 	=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Radio buttons", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-dot-circle-o",
								"is_post" 				=> "post",
								"type" 					=> "multiple",
								"post_name_prefix" 		=> "radio",
								"fee_type" 				=> "multiple",
								"subscription_fee_type" 	=> "multiple" ),
			"checkboxes" 	=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Checkboxes", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-check-square-o",
								"is_post" 				=> "post",
								"type" 					=> "multipleall",
								"post_name_prefix" 		=> "checkbox",
								"fee_type" 				=> "multiple",
								"subscription_fee_type"	=> "multiple" ),
			"variations" 	=> array( 
								"_is_addon" 			=> false,
								"name" 					=> __( "Variations", TM_EPO_TRANSLATION ),
								"width" 				=> "w100",
								"width_display" 		=> "1/1",
								"icon" 					=> "fa-bullseye",
								"is_post" 				=> "display",
								"type" 					=> "multiplesingle",
								"post_name_prefix" 		=> "variations",
								"fee_type" 				=> "",
								"subscription_fee_type"	=> "",
								"one_time_field" 		=> true,
								"no_selection" 			=> true )
		);
	}

	public final function get_elements(){
		return $this->all_elements;
	}

	private function set_elements($element="",$options=array()){
		if( !empty($element) && is_array($options) ){
			$options["_is_addon"]=true;
			if(!isset($options["name"])){
				$options["name"]="";
			}
			if(!isset($options["type"])){
				$options["type"]="";
			}
			if(!isset($options["width"])){
				$options["width"]="";
			}	
			if(!isset($options["width_display"])){
				$options["width_display"]="";
			}			
			if(!isset($options["icon"])){
				$options["icon"]="";
			}			
			if(!isset($options["is_post"])){
				$options["is_post"]="";
			}			
			if(!isset($options["post_name_prefix"])){
				$options["post_name_prefix"]="";
			}			
			if(!isset($options["fee_type"])){
				$options["fee_type"]="";
			}			
			if(!isset($options["subscription_fee_type"])){
				$options["subscription_fee_type"]="";
			}			
			$this->all_elements=array_merge(array($element=>$options),$this->all_elements);
		}
	}

	public final function get_custom_properties($builder,$_prefix,$_counter,$_elements,$k0){
		$p=array();
		foreach ($this->addons_attributes as $key => $value) {
			$p[$value]=isset( $builder[$_prefix.$value][$_counter[$_elements[$k0]]])
					?$builder[$_prefix.$value][$_counter[$_elements[$k0]]]
					:"";
		}
		return $p;
	}

	public final function register_addon($args=array()){
		if ( isset($args["name"]) && isset($args["options"]) && isset($args["settings"]) ){
			$this->elements_array=array_merge(
				array(
					$args["name"] => $this->add_element( $args["name"], $args["settings"], true ) 
				),$this->elements_array);
			$this->set_elements($args["name"],$args["options"]);

			$this->addons_array[]=$args["name"];
		}
	}

	// element available sizes
	private function element_available_sizes(){
		$this->sizer=array(
			"w25"  => "1/4",
			"w33"  => "1/3",
			"w50"  => "1/2",
			"w66"  => "2/3",
			"w75"  => "3/4",
			"w100" => "1/1"
		);
	}

	// init section elements
	private function init_section_elements(){
		$this->_section_elements=array_merge( 
			$this->_prepend_div( "","tm-tabs" ),

			$this->_prepend_div( "section","tm-tab-headers" ),
			$this->_prepend_tab( "section0", __( "Title options", TM_EPO_TRANSLATION ),"","tma-tab-title" ),
			$this->_prepend_tab( "section1", __( "General options", TM_EPO_TRANSLATION ),"open","tma-tab-general" ),
			$this->_prepend_tab( "section2", __( "Conditional Logic", TM_EPO_TRANSLATION ),"","tma-tab-logic" ),				
			$this->_append_div( "section" ),
			
			$this->_prepend_div( "section0" ),
				$this->_get_header_array( "section"."_header" ),
				$this->_get_divider_array( "section"."_divider", 0 ),
				$this->_append_div( "section0" ),

			$this->_prepend_div( "section1" ),

			array(
				"sectionnum"=>array(
					"id"   		=> "sections",
					"wpmldisable"=>1,
					"default" 	=> 0,
					"nodiv"  	=> 1,
					"type"  	=> "hidden",
					"tags"  	=> array( "class"=>"tm_builder_sections", "name"=>"tm_meta[tmfbuilder][sections][]", "value"=>0 ),
					"label"  	=> "",
					"desc"   	=> ""
				),
				"sectionsize"=>array(
					"id"   		=> "sections_size",
					"wpmldisable"=>1,
					"default" 	=> "w100",
					"nodiv"  	=> 1,
					"type"  	=> "hidden",
					"tags"  	=> array( "class"=>"tm_builder_sections_size", "name"=>"tm_meta[tmfbuilder][sections_size][]", "value"=>"w100" ),
					"label"  	=> "",
					"desc"   	=> ""
				),
				"sectionuniqid"=>array(
					"id"   		=> "sections_uniqid",
					"default" 	=> "",
					"nodiv"  	=> 1,
					"type"  	=> "hidden",
					"tags"  	=> array( "class"=>"tm-builder-sections-uniqid", "name"=>"tm_meta[tmfbuilder][sections_uniqid][]", "value"=>"" ),
					"label"  	=> "",
					"desc"   	=> ""
				),
				"sectionstyle"=>array(
					"id"   		=> "sections_style",
					"wpmldisable"=>1,
					"default" 	=> "",
					"type"  	=> "select",
					"tags"  	=> array( "id"=>"tm_sections_style", "name"=>"tm_meta[tmfbuilder][sections_style][]" ),
					"options" 	=> array(
						array( "text" => __( "Normal (clear)", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text" => __( "Box", TM_EPO_TRANSLATION ), "value"=>"box" ),
						array( "text" => __( "Expand and Collapse (start opened)", TM_EPO_TRANSLATION ), "value"=>"collapse" ),
						array( "text" => __( "Expand and Collapse (start closed)", TM_EPO_TRANSLATION ), "value"=>"collapseclosed" ),
						array( "text" => __( "Accordion", TM_EPO_TRANSLATION ), "value"=>"accordion" )
					),
					"label"		=> __( "Section style", TM_EPO_TRANSLATION ),
					"desc" 		=> __("Select this section's display style.", TM_EPO_TRANSLATION )
				),
				"sectionplacement"=>array(
					"id"   		=> "sections_placement",
					"wpmldisable"=>1,
					"default" 	=> "before",
					"type"  	=> "select",
					"tags"  	=> array( "id"=>"sections_placement", "name"=>"tm_meta[tmfbuilder][sections_placement][]" ),
					"options" 	=> array(
						array( "text" => __( "Before Local Options", TM_EPO_TRANSLATION ), "value"=>"before" ),
						array( "text" => __( "After Local Options", TM_EPO_TRANSLATION ), "value"=>"after" )
					),
					"label"		=> __( "Section placement", TM_EPO_TRANSLATION ),
					"desc" 		=> __("Select where this section will appear compare to local Options.", TM_EPO_TRANSLATION )
				),
				"sectiontype"=>array(
					"id"   		=> "sections_type",
					"wpmldisable"=>1,
					"default" 	=> "",
					"type"  	=> "select",
					"tags"  	=> array( "id"=>"sections_type", "name"=>"tm_meta[tmfbuilder][sections_type][]" ),
					"options" 	=> array(
						array( "text" => __( "Normal", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text" => __( "Pop up", TM_EPO_TRANSLATION ), "value"=>"popup" )
					),
					"label"		=> __( "Section type", TM_EPO_TRANSLATION ),
					"desc" 		=> __("Select this section's display type.", TM_EPO_TRANSLATION )
				),

				"sectionsclass"=>array(
					"id" 		=> "sections_class",
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"t", "id"=>"sections_class", "name"=>"tm_meta[tmfbuilder][sections_class][]", "value"=>"" ),
					"label"		=> __( 'Section class name', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter an extra class name to add to this section', TM_EPO_TRANSLATION )
				)			
			),
				
			$this->_append_div( "section1" ),
				
			$this->_prepend_div( "section2" ),
			array(
				"sectionclogic"=>array(
					"id"   		=> "sections_clogic",
					"default" 	=> "",
					"nodiv"  	=> 1,
					"type"  	=> "hidden",
					"tags"  	=> array( "class"=>"tm-builder-clogic", "name"=>"tm_meta[tmfbuilder][sections_clogic][]", "value"=>"" ),
					"label"  	=> "",
					"desc"   	=> ""
				),
				"sectionlogic"=>array(
					"id"   		=> "sections_logic",
					"default" 	=> "",
					"type"  	=> "select",
					"tags"  	=> array( "class"=>"activate-sections-logic", "id"=>"sections_logic", "name"=>"tm_meta[tmfbuilder][sections_logic][]" ),
					"options" 	=> array(
						array( "text" => __( "No", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text" => __( "Yes", TM_EPO_TRANSLATION ), "value"=>"1" )
					),
					"extra"		=> $this->builder_showlogic(),
					"label"		=> __( "Section Conditional Logic", TM_EPO_TRANSLATION ),
					"desc" 		=> __( "Enable conditional logic for showing or hiding this section.", TM_EPO_TRANSLATION )
				)
			),
			$this->_append_div( "section2" ),

			$this->_append_div( "" )	
		);
	}

	// init elements
	private function init_elements(){
		$this->_elements();
		$this->elements_array=array(
			"divider"=>array_merge( 
				$this->_prepend_div( "","tm-tabs" ),

				$this->_prepend_div( "divider","tm-tab-headers" ),
				$this->_prepend_tab( "divider2", __( "General options", TM_EPO_TRANSLATION ),"open" ),
				$this->_prepend_tab( "divider3", __( "Conditional Logic", TM_EPO_TRANSLATION ) ),
				$this->_prepend_tab( "divider4", __( "CSS settings", TM_EPO_TRANSLATION ) ),			
				$this->_append_div( "divider" ),
				
				$this->_prepend_div( "divider2" ),
				$this->_get_divider_array() ,

				$this->_append_div( "divider2" ),
				
				$this->_prepend_div( "divider3" ),
				$this->_prepend_logic( "divider" ), 
				$this->_append_div( "divider3" ),

				$this->_prepend_div( "divider4" ),
				array(
					array(
						"id" 		=> "divider_class",
						"default"	=> "",
						"type"		=> "text",
						"tags"		=> array( "class"=>"t", "id"=>"builder_divider_class", "name"=>"tm_meta[tmfbuilder][divider_class][]", "value"=>"" ),
						"label"		=> __( 'Element class name', TM_EPO_TRANSLATION ),
						"desc" 		=> __( 'Enter an extra class name to add to this element', TM_EPO_TRANSLATION )
					)
				),
				$this->_append_div( "divider4" ),

				$this->_append_div( "" )				
			),
			
			"header"=>array_merge(
				$this->_prepend_div( "","tm-tabs" ),

				$this->_prepend_div( "header","tm-tab-headers" ),
				$this->_prepend_tab( "header2", __( "General options", TM_EPO_TRANSLATION ),"open" ),
				$this->_prepend_tab( "header3", __( "Conditional Logic", TM_EPO_TRANSLATION ) ),				
				$this->_prepend_tab( "header4", __( "CSS settings", TM_EPO_TRANSLATION ) ),			
				$this->_append_div( "header" ),
				
				$this->_prepend_div( "header2" ),	
				array(
				array(
					"id" 		=> "header_size",
					"wpmldisable"=>1,
					"default"	=> "3",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_header_size", "name"=>"tm_meta[tmfbuilder][header_size][]" ),
					"options"	=> array(
						array( "text"=> __( "H1", TM_EPO_TRANSLATION ), "value"=>"1" ),
						array( "text"=> __( "H2", TM_EPO_TRANSLATION ), "value"=>"2" ),
						array( "text"=> __( "H3", TM_EPO_TRANSLATION ), "value"=>"3" ),
						array( "text"=> __( "H4", TM_EPO_TRANSLATION ), "value"=>"4" ),
						array( "text"=> __( "H5", TM_EPO_TRANSLATION ), "value"=>"5" ),
						array( "text"=> __( "H6", TM_EPO_TRANSLATION ), "value"=>"6" ),
						array( "text"=> __( "p", TM_EPO_TRANSLATION ), "value"=>"7" ),
						array( "text"=> __( "div", TM_EPO_TRANSLATION ), "value"=>"8" ),
						array( "text"=> __( "span", TM_EPO_TRANSLATION ), "value"=>"9" )
					),
					"label"		=> __( "Header type", TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				),
				array(
					"id" 		=> "header_title",
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"t tm-header-title", "id"=>"builder_header_title", "name"=>"tm_meta[tmfbuilder][header_title][]", "value"=>"" ),
					"label"		=> __( 'Header title', TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				),
				array(
					"id" 		=> "header_title_position",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_header_title_position", "name"=>"tm_meta[tmfbuilder][header_title_position][]" ),
					"options"	=> array(
						array( "text"=> __( "Above field", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Left of the field", TM_EPO_TRANSLATION ), "value"=>"left" ),
						array( "text"=> __( "Right of the field", TM_EPO_TRANSLATION ), "value"=>"right" ),
						array( "text"=> __( "Disable", TM_EPO_TRANSLATION ), "value"=>"disable" ),
					),
					"label"		=> __( "Header position", TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				),
				array(
					"id" 		=> "header_title_color",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"tm-color-picker", "id"=>"builder_header_title_color", "name"=>"tm_meta[tmfbuilder][header_title_color][]", "value"=>"" ),
					"label"		=> __( 'Header color', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Leave empty for default value', TM_EPO_TRANSLATION )
				),
				array(
					"id" 		=> "header_subtitle",
					"default"	=> "",
					"type"		=> "textarea",
					"tags"		=> array( "id"=>"builder_header_subtitle", "name"=>"tm_meta[tmfbuilder][header_subtitle][]" ),
					"label"		=> __( "Content", TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				),
				array(
					"id" 		=> "header_subtitle_color",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"tm-color-picker", "id"=>"builder_header_subtitle_color", "name"=>"tm_meta[tmfbuilder][header_subtitle_color][]", "value"=>"" ),
					"label"		=> __( 'Content color', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Leave empty for default value', TM_EPO_TRANSLATION )
				),
				array(
					"id" 		=> "header_subtitle_position",
					"wpmldisable"=>1,
					"message0x0_class" 	=> "builder_hide_for_variation",
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_header_subtitle_position", "name"=>"tm_meta[tmfbuilder][header_subtitle_position][]" ),
					"options"	=> array(
						array( "text"=> __( "Above field", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Below field", TM_EPO_TRANSLATION ), "value"=>"below" ),
						array( "text"=> __( "Tooltip", TM_EPO_TRANSLATION ), "value"=>"tooltip" ),
					),
					"label"		=> __( "Content position", TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				),				
				),

				$this->_append_div( "header2" ),
				
				$this->_prepend_div( "header3" ),
				$this->_prepend_logic( "header" ), 
				$this->_append_div( "header3" ),

				$this->_prepend_div( "header4" ),
				array(
					array(
						"id" 		=> "header_class",
						"default"	=> "",
						"type"		=> "text",
						"tags"		=> array( "class"=>"t", "id"=>"builder_header_class", "name"=>"tm_meta[tmfbuilder][header_class][]", "value"=>"" ),
						"label"		=> __( 'Element class name', TM_EPO_TRANSLATION ),
						"desc" 		=> __( 'Enter an extra class name to add to this element', TM_EPO_TRANSLATION )
					)
				),
				$this->_append_div( "header4" ),

				$this->_append_div( "" )				
			),
			
			"textarea"=>$this->add_element(
				"textarea",
				array("required","price","text_after_price","price_type","hide_amount","quantity","placeholder","min_chars","max_chars","validation1")
				),			
			
			"textfield"=>$this->add_element(
				"textfield",
				array("required","price","text_after_price","price_type2","hide_amount","quantity","placeholder","min_chars","max_chars","min","max","validation1")
				),
			
			"selectbox"=>$this->add_element(
				"selectbox",
				array("required","text_after_price",($this->woo_subscriptions_check)?"price_type3":"price_type4","hide_amount","quantity","placeholder","use_url","changes_product_image","options")
				),			
			
			"radiobuttons"=>$this->add_element(
				"radiobuttons",
				array("required","text_after_price","hide_amount","quantity","use_url","use_images","changes_product_image","swatchmode","items_per_row","clear_options","options")
				),			

			"checkboxes"=>$this->add_element(
				"checkboxes",
				array("required","text_after_price","hide_amount","quantity","limit_choices","exactlimit_choices","use_images","changes_product_image","swatchmode","items_per_row","options")
				),			

			"upload"=>$this->add_element(
				"upload",
				array("required","price","text_after_price","price_type5","hide_amount","button_type")
				),			
			
			"date"=>$this->add_element(
				"date",
				array("required","price","text_after_price","price_type6","hide_amount","quantity","button_type2","date_format","start_year","end_year",
					array(
						"id" 				=> "date_min_date",
						"wpmldisable"=>1,
						"default"			=> "",
						"type"				=> "text",
						"tags"				=> array( "class"=>"t", "id"=>"builder_date_min_date", "name"=>"tm_meta[tmfbuilder][date_min_date][]", "value"=>"" ),
						"label"				=> __( 'Minimum selectable date', TM_EPO_TRANSLATION ),
						"desc" 				=> __( 'A number of days from today.', TM_EPO_TRANSLATION )
					),
					array(
						"id" 				=> "date_max_date",
						"wpmldisable"=>1,
						"default"			=> "",
						"type"				=> "text",
						"tags"				=> array( "class"=>"n", "id"=>"builder_date_max_date", "name"=>"tm_meta[tmfbuilder][date_max_date][]", "value"=>"" ),
						"label"				=> __( 'Maximum selectable date', TM_EPO_TRANSLATION ),
						"desc" 				=> __( 'A number of days from today.', TM_EPO_TRANSLATION )
					),
					array(
						"id" 				=> "date_disabled_dates",
						"default"			=> "",
						"type"				=> "text",
						"tags"				=> array( "class"=>"t", "id"=>"builder_date_disabled_dates", "name"=>"tm_meta[tmfbuilder][date_disabled_dates][]", "value"=>"" ),
						"label"				=> __( 'Disabled dates', TM_EPO_TRANSLATION ),
						"desc" 				=> __( 'Comma separated dates according to your selected date format. (Two digits for day, two digits for month and four digits for year)', TM_EPO_TRANSLATION )
					),
					array(
						"id" 				=> "date_enabled_only_dates",
						"default"			=> "",
						"type"				=> "text",
						"tags"				=> array( "class"=>"t", "id"=>"builder_date_enabled_only_dates", "name"=>"tm_meta[tmfbuilder][date_enabled_only_dates][]", "value"=>"" ),
						"label"				=> __( 'Enabled dates', TM_EPO_TRANSLATION ),
						"desc" 				=> __( 'Comma separated dates according to your selected date format. (Two digits for day, two digits for month and four digits for year). Please not that this will override any other setting!', TM_EPO_TRANSLATION )
					),
					array(
						"id" 		=> "date_disabled_weekdays",
						"wpmldisable"=>1,
						"default"	=> "",
						"type"		=> "hidden",
						"tags"		=> array( "class"=>"tm-weekdays", "id"=>"builder_date_disabled_weekdays", "name"=>"tm_meta[tmfbuilder][date_disabled_weekdays][]", "value"=>"" ),
						"label"		=> __( "Disable weekdays", TM_EPO_TRANSLATION ),
						"desc" 		=> __( "This allows you to disable all selected weekdays.", TM_EPO_TRANSLATION ),
						"extra" 	=> $this->get_weekdays()
					),
					array(
						"id" 			=> "date_tranlation_custom",
						"type"			=> "custom",
						"label"			=> __( 'Translations', TM_EPO_TRANSLATION ),
						"desc" 			=> "",
						"nowrap_end" 	=> 1,
						"noclear" 		=> 1
					),
					array(
						"id" 			=> "date_tranlation_day",
						"default"		=> "",
						"type"			=> "text",
						"tags"			=> array( "class"=>"n", "id"=>"builder_date_tranlation_day", "name"=>"tm_meta[tmfbuilder][date_tranlation_day][]", "value"=>"" ),
						"label"			=> "",
						"desc"			=> "",
						"prepend_element_html" => '<span class="prepend_span">'.__( 'Day', TM_EPO_TRANSLATION ).'</span> ',
						"nowrap_start" 	=> 1,
						"nowrap_end" 	=> 1
					),
					array(
						"id" 			=> "date_tranlation_month",
						"default"		=> "",
						"type"			=> "text",
						"nowrap_start" 	=> 1,
						"nowrap_end" 	=> 1,
						"tags"			=> array( "class"=>"n", "id"=>"builder_date_tranlation_month", "name"=>"tm_meta[tmfbuilder][date_tranlation_month][]", "value"=>"" ),
						"label"			=> "",
						"desc"			=> "",
						"prepend_element_html" => '<span class="prepend_span">'.__( 'Month', TM_EPO_TRANSLATION ).'</span> '
					),
					array(
						"id" 			=> "date_tranlation_year",
						"default"		=> "",
						"type"			=> "text",
						"tags"			=> array( "class"=>"n", "id"=>"builder_date_tranlation_year", "name"=>"tm_meta[tmfbuilder][date_tranlation_year][]", "value"=>"" ),
						"label"			=> "",
						"desc"			=> "",
						"prepend_element_html" => '<span class="prepend_span">'.__( 'Year', TM_EPO_TRANSLATION ).'</span> ',
						"nowrap_start" 	=> 1
					)
				)
				),

			"range"=>$this->add_element(
				"range",
				array("required","price","text_after_price","price_type7","hide_amount","quantity","min","max",
					array(
						"id" 		=> "range_step",
						"wpmldisable"=>1,
						"default"	=> "1",
						"type"		=> "text",
						"tags"		=> array( "class"=>"n", "id"=>"builder_range_step", "name"=>"tm_meta[tmfbuilder][range_step][]", "value"=>"" ),
						"label"		=> __( 'Step value', TM_EPO_TRANSLATION ),
						"desc" 		=> __( 'Enter the step for the handle.', TM_EPO_TRANSLATION )
					),
					array(
						"id" 		=> "range_show_picker_value",
						"wpmldisable"=>1,
						"default"	=> "",
						"type"		=> "select",
						"tags"		=> array( "id"=>"builder_range_show_picker_value", "name"=>"tm_meta[tmfbuilder][range_show_picker_value][]" ),
						"options"	=> array(
							array( "text"=> __( "Tooltip", TM_EPO_TRANSLATION ), "value"=>"" ),
							array( "text"=> __( "Left side", TM_EPO_TRANSLATION ), "value"=>"left" ),
							array( "text"=> __( "Right side", TM_EPO_TRANSLATION ), "value"=>"right" ),
							array( "text"=> __( "Tooltip and Left side", TM_EPO_TRANSLATION ), "value"=>"tleft" ),
							array( "text"=> __( "Tooltip and Right side", TM_EPO_TRANSLATION ), "value"=>"tright" )
						),
						"label"		=> __( "Show value on", TM_EPO_TRANSLATION ),
						"desc" 		=> __( "Select how to show the value of the range picker.", TM_EPO_TRANSLATION )
					),					array(
						"id" 		=> "range_pips",
						"wpmldisable"=>1,
						"default"	=> "",
						"type"		=> "select",
						"tags"		=> array( "id"=>"builder_range_pips", "name"=>"tm_meta[tmfbuilder][range_pips][]" ),
						"options"	=> array(
							array( "text"=> __( "No", TM_EPO_TRANSLATION ), "value"=>"" ),
							array( "text"=> __( "Yes", TM_EPO_TRANSLATION ), "value"=>"yes" )
						),
						"label"		=> __( "Enable points display?", TM_EPO_TRANSLATION ),
						"desc" 		=> __( "This allows you to generate points along the range picker.", TM_EPO_TRANSLATION )
					),"default_value"
				)
				),

			"color"=>$this->add_element(
				"color",
				array("required","price","text_after_price","price_type6","hide_amount","quantity","default_value")
				),

			"variations"=>$this->add_element(
				"variations",
				array("variations_options")
				)
			
		);
		if ($this->woo_subscriptions_check){			
			$this->elements_array["textarea"][20]['options'][]=array( "text"=> __( "Subscription fee", TM_EPO_TRANSLATION ), "value"=>"subscriptionfee" );
			$this->elements_array["textfield"][20]['options'][]=array( "text"=> __( "Subscription fee", TM_EPO_TRANSLATION ), "value"=>"subscriptionfee" );
			$this->elements_array["date"][20]['options'][]=array( "text"=> __( "Subscription fee", TM_EPO_TRANSLATION ), "value"=>"subscriptionfee" );
		}
	}

	public final function add_setting_validation1($name=""){
		return array(
					"id" 		=> $name."_validation1",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_validation1", "name"=>"tm_meta[tmfbuilder][".$name."_validation1][]" ),
					"options"	=> array(
						array( "text" => __( 'No validation', TM_EPO_TRANSLATION ), "value"=>'' ),
						array( "text" => __( 'Email', TM_EPO_TRANSLATION ), "value"=>'email' ),
						array( "text" => __( 'Url', TM_EPO_TRANSLATION ), "value"=>'url' ),
						array( "text" => __( 'Number', TM_EPO_TRANSLATION ), "value"=>'number' ),
						array( "text" => __( 'Digits', TM_EPO_TRANSLATION ), "value"=>'digits' ),
					),
					"label"		=> __( 'Validate as', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Choose whether the field will be validated against the choosen method.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_required($name=""){
		return array(
					"id" 				=> $name."_required",
					"wpmldisable" 		=> 1,
					"default"			=> "0",
					"type"				=> "select",
					"tags"				=> array( "id"=>"builder_".$name."_required", "name"=>"tm_meta[tmfbuilder][".$name."_required][]" ),
					"options"			=> array(
						array( "text" => __( 'No', TM_EPO_TRANSLATION ), "value"=>'0' ),
						array( "text" => __( 'Yes', TM_EPO_TRANSLATION ), "value"=>'1' )
					),
					"label"				=> __( 'Required', TM_EPO_TRANSLATION ),
					"desc" 				=> __( 'Choose whether the user must fill out this field or not.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_price($name=""){
		return array(
					"id" 				=> $name."_price",
					"wpmldisable" 		=> 1,
					"message0x0_class" 	=> "builder_".$name."_price_div",
					"default"			=> "",
					"type"				=> "text",
					"tags"				=> array( "class"=>"n", "id"=>"builder_".$name."_price", "name"=>"tm_meta[tmfbuilder][".$name."_price][]", "value"=>"" ),
					"label"				=> __( 'Price', TM_EPO_TRANSLATION ),
					"desc" 				=> __( 'Enter the price for this field or leave it blank for no price.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_text_after_price($name=""){
		return array(
					"id" 		=>  $name."_text_after_price",
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_text_after_price", "name"=>"tm_meta[tmfbuilder][".$name."_text_after_price][]", "value"=>"" ),
					"label"		=> __( 'Text after Price', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a text to display after the price for this field or leave it blank for no text.', TM_EPO_TRANSLATION )
				);
	}

	//textarea
	public final function add_setting_price_type($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( 'Fixed amount', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Percent of the original price', TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( 'Percent of the original price + options', TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" ),
						array( "text"=> __( 'Price per char', TM_EPO_TRANSLATION ), "value"=>"char" ),
						array( "text"=> __( "Percent of the original price per char", TM_EPO_TRANSLATION ), "value"=>"charpercent" ),
						array( "text"=> __( 'Price per char (no first char)', TM_EPO_TRANSLATION ), "value"=>"charnofirst" ),
						array( "text"=> __( "Percent of the original price per char (no first char)", TM_EPO_TRANSLATION ), "value"=>"charpercentnofirst" ),
						array( "text"=> __( 'Fee', TM_EPO_TRANSLATION ), "value"=>"fee" ),
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	//textfield
	public final function add_setting_price_type2($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( "Fixed amount", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Quantity", TM_EPO_TRANSLATION ), "value"=>"step" ),
						array( "text"=> __( "Current value", TM_EPO_TRANSLATION ), "value"=>"currentstep" ),
						array( "text"=> __( "Percent of the original price", TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( "Percent of the original price + options", TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" ),
						array( "text"=> __( "Price per char", TM_EPO_TRANSLATION ), "value"=>"char" ),
						array( "text"=> __( "Percent of the original price per char", TM_EPO_TRANSLATION ), "value"=>"charpercent" ),
						array( "text"=> __( 'Price per char (no first char)', TM_EPO_TRANSLATION ), "value"=>"charnofirst" ),
						array( "text"=> __( "Percent of the original price per char (no first char)", TM_EPO_TRANSLATION ), "value"=>"charpercentnofirst" ),
						array( "text"=> __( "Fee", TM_EPO_TRANSLATION ), "value"=>"fee" ),						
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	//selectbox with subscriptions active
	public final function add_setting_price_type3($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( 'Use options', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Fee', TM_EPO_TRANSLATION ), "value"=>"fee" ),
						array( "text"=> __( 'Subscription fee', TM_EPO_TRANSLATION ), "value"=>"subscriptionfee" ),
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}
	//selectbox
	public final function add_setting_price_type4($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( 'Use options', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Fee', TM_EPO_TRANSLATION ), "value"=>"fee" ),
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	//upload
	public final function add_setting_price_type5($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( "Fixed amount", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Percent of the original price", TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( "Percent of the original price + options", TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" )
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	//date
	public final function add_setting_price_type6($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( "Fixed amount", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Percent of the original price", TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( "Percent of the original price + options", TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" ),
						array( "text"=> __( "Fee", TM_EPO_TRANSLATION ), "value"=>"fee" ),
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	//range
	public final function add_setting_price_type7($name=""){
		return array(
					"id" 		=> $name."_price_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_price_type", "name"=>"tm_meta[tmfbuilder][".$name."_price_type][]" ),
					"options"	=> array(
						array( "text"=> __( "Fixed amount", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Step * price", TM_EPO_TRANSLATION ), "value"=>"step" ),
						array( "text"=> __( "Current value", TM_EPO_TRANSLATION ), "value"=>"currentstep" ),
						array( "text"=> __( "Percent of the original price", TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( "Percent of the original price + options", TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" ),
						array( "text"=> __( "Fee", TM_EPO_TRANSLATION ), "value"=>"fee" ),
					),
					"label"		=> __( 'Price type', TM_EPO_TRANSLATION )
				);
	}

	public final function add_setting_min($name=""){
		return array(
					"id" 		=> $name."_min",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_min", "name"=>"tm_meta[tmfbuilder][".$name."_min][]", "value"=>"" ),
					"label"		=> __( 'Min value', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter the minimum value.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_max($name=""){
		return array(
					"id" 		=> $name."_max",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_max", "name"=>"tm_meta[tmfbuilder][".$name."_max][]", "value"=>"" ),
					"label"		=> __( 'Max value', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter the maximum value.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_date_format($name=""){
		return array(
					"id" 		=> $name."_format",
					"default"	=> "0",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_format", "name"=>"tm_meta[tmfbuilder][".$name."_format][]" ),
					"options"	=> array(
						array( "text"=> __( "Day / Month / Year", TM_EPO_TRANSLATION ), "value"=>"0" ),
						array( "text"=> __( "Month / Date / Year", TM_EPO_TRANSLATION ), "value"=>"1" ),
						array( "text"=> __( "Day . Month . Year", TM_EPO_TRANSLATION ), "value"=>"2" ),
						array( "text"=> __( "Month . Date . Year", TM_EPO_TRANSLATION ), "value"=>"3" ),
						array( "text"=> __( "Day - Month - Year", TM_EPO_TRANSLATION ), "value"=>"4" ),
						array( "text"=> __( "Month - Date - Year", TM_EPO_TRANSLATION ), "value"=>"5" )
					),
					"label"		=> __( "Date format", TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_start_year($name=""){
		return array(
					"id" 		=> $name."_start_year",
					"wpmldisable"=>1,
					"default"	=> "1900",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_start_year", "name"=>"tm_meta[tmfbuilder][".$name."_start_year][]", "value"=>"" ),
					"label"		=> __( 'Start year', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter starting year.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_end_year($name=""){
		return array(
					"id" 		=> $name."_end_year",
					"wpmldisable"=>1,
					"default"	=> (date("Y")+10),
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_end_year", "name"=>"tm_meta[tmfbuilder][".$name."_end_year][]", "value"=>"" ),
					"label"		=> __( 'End year', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter ending year.', TM_EPO_TRANSLATION )
				);
	}	
	public final function add_setting_use_url($name=""){
		return array(
					"id" 		=> $name."_use_url",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "class"=>"use_url", "id"=>"builder_".$name."_use_url", "name"=>"tm_meta[tmfbuilder][".$name."_use_url][]" ),
					"options"	=> array(
						array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Yes', TM_EPO_TRANSLATION ), "value"=>"url" )
					),
					"label"		=> __( 'Use URL replacements', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Choose whether to redirect to a URL if the option is click.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_options($name=""){
		return array(
					"id" 		=> $name."_options",
					"default" 	=> "",
					"type"		=> "custom",
					"leftclass" => "onerow",
					"rightclass"=> "onerow",
					"html"		=> $this->builder_sub_options( array(), 'multiple_'.$name.'_options' ),
					"label"		=> __( 'Populate options', TM_EPO_TRANSLATION ),
					"desc" 		=> ($name=='checkboxes')?'':__( 'Double click the radio button to remove its selected attribute.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_variations_options($name=""){
		return array(
					"id" 		=> $name."_options",
					"default" 	=> "",
					"type"		=> "custom",
					"leftclass" => "onerow",
					"rightclass"=> "onerow2 tm-all-attributes",
					"html"		=> $this->builder_sub_variations_options( array() ),
					"label"		=> __( 'Variation options', TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				);
	}	
	public final function add_setting_use_images($name=""){
		return array(
					"id" 		=> $name."_use_images",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "class"=>"use_images", "id"=>"builder_".$name."_use_images", "name"=>"tm_meta[tmfbuilder][".$name."_use_images][]" ),
					"options"	=> array(
						array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Yes', TM_EPO_TRANSLATION ), "value"=>"images" )
					),
					"label"		=> __( 'Use image replacements', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Choose whether to use images in place of radio buttons.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_changes_product_image($name=""){
		return array(
					"id" 		=> $name."_changes_product_image",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "class"=>"use_images tm-changes-product-image", "id"=>"builder_".$name."_changes_product_image", "name"=>"tm_meta[tmfbuilder][".$name."_changes_product_image][]" ),
					"options"	=> array(
						array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Use the image replacements', TM_EPO_TRANSLATION ), "value"=>"images" ),
						array( "text"=> __( 'Use custom image', TM_EPO_TRANSLATION ), "value"=>"custom" )
					),
					"label"		=> __( 'Changes product image', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Choose whether to change the product image.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_swatchmode($name=""){
		return array(
					"id" 		=> $name."_swatchmode",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "class"=>"swatchmode", "id"=>"builder_".$name."_swatchmode", "name"=>"tm_meta[tmfbuilder][".$name."_swatchmode][]" ),
					"options"	=> array(
						array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Yes', TM_EPO_TRANSLATION ), "value"=>"swatch" )
					),
					"label"		=> __( 'Enable Swatch mode', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Swatch mode will show the option label on a tooltip when Use image replacements is active.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_clear_options($name=""){
		return array(
					"id" 		=> $name."_clear_options",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "class"=>"clear_options", "id"=>"builder_".$name."_clear_options", "name"=>"tm_meta[tmfbuilder][".$name."_clear_options][]" ),
					"options"	=> array(
						array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Yes', TM_EPO_TRANSLATION ), "value"=>"clear" )
					),
					"label"		=> __( 'Enable clear options button', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'This will add a button to clear the selected option.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_items_per_row($name=""){
		return array(
					"id" 		=> $name."_items_per_row",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_items_per_row", "name"=>"tm_meta[tmfbuilder][".$name."_items_per_row][]" ),
					"label"		=> __( 'Items per row', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Use this field to make a grid display. Enter how many items per row for the grid or leave blank for normal display.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_limit_choices($name=""){
		return array(
					"id" 		=> $name."_limit_choices",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_limit_choices", "name"=>"tm_meta[tmfbuilder][".$name."_limit_choices][]" ),
					"label"		=> __( 'Limit selection', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a number above 0 to limit the checkbox selection or leave blank for default behaviour.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_exactlimit_choices($name=""){
		return array(
					"id" 		=> $name."_exactlimit_choices",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_exactlimit_choices", "name"=>"tm_meta[tmfbuilder][".$name."_exactlimit_choices][]" ),
					"label"		=> __( 'Exact selection', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a number above 0 to have the user select the exact number of checkboxes or leave blank for default behaviour.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_button_type($name=""){
		return array(
					"id" 		=> $name."_button_type",
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_button_type", "name"=>"tm_meta[tmfbuilder][".$name."_button_type][]" ),
					"options"	=> array(
						array( "text"=> __( 'Normal browser button', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( 'Styled button', TM_EPO_TRANSLATION ), "value"=>"button" )
					),
					"label"		=> __( 'Upload button style', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_button_type2($name=""){
		return array(
					"id" 		=> $name."_button_type",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "select",
					"tags"		=> array( "id"=>"builder_".$name."_button_type", "name"=>"tm_meta[tmfbuilder][".$name."_button_type][]" ),
					"options"	=> array(
						array( "text"=> __( "Date field", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Date picker", TM_EPO_TRANSLATION ), "value"=>"picker" ),
						array( "text"=> __( "Date field and picker", TM_EPO_TRANSLATION ), "value"=>"fieldpicker" ),
					),
					"label"		=> __( "Date picker style", TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_hide_amount($name=""){
		return array(
					"id" 				=> $name."_hide_amount",
					"message0x0_class" 	=> "builder_".$name."_hide_amount_div",
					"wpmldisable"=>1,
					"default"			=> "",
					"type"				=> "select",
					"tags"				=> array( "id"=>"builder_".$name."_hide_amount", "name"=>"tm_meta[tmfbuilder][".$name."_hide_amount][]" ),
					"options"			=> array(
						array( "text" => __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text" => __( 'Yes', TM_EPO_TRANSLATION ), "value"=>"hidden" )
					),
					"label"				=> __( 'Hide price', TM_EPO_TRANSLATION ),
					"desc" 				=> __( 'Choose whether to hide the price or not.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_quantity($name=""){
		return array(
					"id" 				=> $name."_quantity",
					"message0x0_class" 	=> "builder_".$name."_quantity_div",
					"wpmldisable"=>1,
					"default"			=> "",
					"type"				=> "select",
					"tags"				=> array( "id"=>"builder_".$name."_quantity", "name"=>"tm_meta[tmfbuilder][".$name."_quantity][]" ),
					"options"			=> array(
						array( "text" => __( 'Disable', TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text" => __( 'Right', TM_EPO_TRANSLATION ), "value"=>"right" ),
						array( "text" => __( 'Left', TM_EPO_TRANSLATION ), "value"=>"left" ),
						array( "text" => __( 'Top', TM_EPO_TRANSLATION ), "value"=>"top" ),
						array( "text" => __( 'Bottom', TM_EPO_TRANSLATION ), "value"=>"bottom" ),
					),
					"label"				=> __( 'Quantity selector', TM_EPO_TRANSLATION ),
					"desc" 				=> __( 'This will show a quantity selector for this option.', TM_EPO_TRANSLATION )
				);
	}
	public final function add_setting_placeholder($name=""){
		return array(
					"id" 		=> $name."_placeholder",
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"t", "id"=>"builder_".$name."_placeholder", "name"=>"tm_meta[tmfbuilder][".$name."_placeholder][]", "value"=>"" ),
					"label"		=> __( 'Placeholder', TM_EPO_TRANSLATION ),
					"desc" 		=> ""
				);
	}
	public final function add_setting_min_chars($name=""){
		return array(
					"id" 		=> $name."_min_chars",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_min_chars", "name"=>"tm_meta[tmfbuilder][".$name."_min_chars][]", "value"=>"" ),
					"label"		=> __( 'Minimum characters', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a value for the minimum characters the user must enter.', TM_EPO_TRANSLATION )
				);
	}	
	public final function add_setting_max_chars($name=""){
		return array(
					"id" 		=> $name."_max_chars",
					"wpmldisable"=>1,
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"n", "id"=>"builder_".$name."_max_chars", "name"=>"tm_meta[tmfbuilder][".$name."_max_chars][]", "value"=>"" ),
					"label"		=> __( 'Maximum characters', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a value to limit the maximum characters the user can enter.', TM_EPO_TRANSLATION )
				);
	}	
	public final function add_setting_default_value($name=""){
		return array(
					"id" 		=> $name."_default_value",
					"default"	=> "",
					"type"		=> "text",
					"tags"		=> array( "class"=>"t", "id"=>"builder_".$name."_default_value", "name"=>"tm_meta[tmfbuilder][".$name."_default_value][]", "value"=>"" ),
					"label"		=> __( 'Default value', TM_EPO_TRANSLATION ),
					"desc" 		=> __( 'Enter a value to be applied to the field automatically.', TM_EPO_TRANSLATION )
				);
	}

	private function get_weekdays(){
		$out = '<div class="tm-weekdays-picker-wrap">';
		// load wp translations
		if (function_exists('wp_load_translations_early')){
			wp_load_translations_early();
			global $wp_locale;
			for ($day_index = 0; $day_index <= 6; $day_index++) {
				$out .= '<span class="tm-weekdays-picker"><label><input class="tm-weekday-picker" type="checkbox" value="'.esc_attr($day_index).'"><span>'.$wp_locale->get_weekday($day_index).'</span></label></span>';
			}
		// in case something goes wrong
		}else{
			$weekday[0] = /* translators: weekday */ __('Sunday');
			$weekday[1] = /* translators: weekday */ __('Monday');
			$weekday[2] = /* translators: weekday */ __('Tuesday');
			$weekday[3] = /* translators: weekday */ __('Wednesday');
			$weekday[4] = /* translators: weekday */ __('Thursday');
			$weekday[5] = /* translators: weekday */ __('Friday');
			$weekday[6] = /* translators: weekday */ __('Saturday');
			for ($day_index = 0; $day_index <= 6; $day_index++) {
				$out .= '<span class="tm-weekdays-picker"><label><input type="checkbox" value="'.esc_attr($day_index).'"><span>'.$weekday[$day_index].'</span></label></span>';
			}			
		}
		$out .='</div>';
		return $out;
	}
	private function remove_prefix($str="",$prefix=""){
		if (substr($str, 0, strlen($prefix)) == $prefix) {
		    $str = substr($str, strlen($prefix));
		}
		return $str;
	}

	public final function add_element($name="",$settings=array(), $is_addon=false){
		$options = array();
		$additional_currencies=TM_EPO_HELPER()->wc_aelia_cs_enabled_currencies();
		foreach ($settings as $key => $value) {
			if (is_array($value)){
				if ( $is_addon && isset($value["id"]) ){
					$this->addons_attributes[]=$value["id"];
					$value["id"]=$name."_".$value["id"];
					$value["tags"]=array( 
                                    "id"=>"builder_".$value["id"], 
                                    "name"=>"tm_meta[tmfbuilder][".$value["id"]."][]", 
                                    "value"=>"" 
                                    );
				}
				$options[]=$value;
			}else{
				$method="add_setting_".$value;
				$_value=$this->$method($name);
								

				if ($value=="price"){
					
					if (!empty($additional_currencies) && is_array($additional_currencies)){
						$_copy_value = $_value;
						$_value["label"] .=' <span class="tm-choice-currency">'.TM_EPO_HELPER()->wc_base_currency().'</span>';
						$options[]=$_value;
						foreach ($additional_currencies as $ckey => $currency) {
							$copy_value = $_copy_value;
							$copy_value["id"] .="_".$currency;
							$copy_value["label"] .=' <span class="tm-choice-currency">'.$currency.'</span>';
							$copy_value["desc"] = sprintf( __( 'Leave it blank to calculate it automatically from the %s price', TM_EPO_TRANSLATION ), TM_EPO_HELPER()->wc_base_currency() );
							$copy_value["tags"]["id"] = "builder_".$name."_price"."_".$currency;
							$copy_value["tags"]["name"] = "tm_meta[tmfbuilder][".$name."_price_".$currency."][]";
							$options[]=$copy_value;
						}
					}else{
						$options[]=$_value;
					}
				}else{
					$options[]=$_value;	
				}

				if ($is_addon && isset($_value["id"])){
					$this->addons_attributes[]=$this->remove_prefix($_value["id"],$name."_");
				}
			}
		}
		return array_merge( 
				$this->_prepend_div( "","tm-tabs" ),

				// add headers
				$this->_prepend_div( $name,"tm-tab-headers" ),
				$this->_prepend_tab( $name."1", __( "Label options", TM_EPO_TRANSLATION ),"closed","tma-tab-label" ),
				$this->_prepend_tab( $name."2", __( "General options", TM_EPO_TRANSLATION ),"open","tma-tab-general" ),
				$this->_prepend_tab( $name."3", __( "Conditional Logic", TM_EPO_TRANSLATION ),"closed","tma-tab-logic" ),
				$this->_prepend_tab( $name."4", __( "CSS settings", TM_EPO_TRANSLATION ),"closed","tma-tab-css" ),
				$this->_append_div( $name ),
				
				// add Label options
				$this->_prepend_div( $name."1" ),
				$this->_get_header_array( $name."_header" ),
				$this->_get_divider_array( $name."_divider", 0 ),
				$this->_append_div( $name."1" ),
				
				// add General options
				$this->_prepend_div( $name."2" ),	
				$options,
				$this->_append_div( $name."2" ),
				
				// add Contitional logic
				$this->_prepend_div( $name."3" ),
				$this->_prepend_logic( $name ), 
				$this->_append_div( $name."3" ),

				// add CSS settings
				$this->_prepend_div( $name."4" ),
				array(
					array(
						"id" 		=> $name."_class",
						"default"	=> "",
						"type"		=> "text",
						"tags"		=> array( "class"=>"t", "id"=>"builder_".$name."_class", "name"=>"tm_meta[tmfbuilder][".$name."_class][]", "value"=>"" ),
						"label"		=> __( 'Element class name', TM_EPO_TRANSLATION ),
						"desc" 		=> __( 'Enter an extra class name to add to this element', TM_EPO_TRANSLATION )
					)
				),
				$this->_append_div( $name."4" ),

				$this->_append_div( "" )				
			);
	}

	private function _prepend_tab( $id="",$label="" ,$closed="closed",$boxclass=""){
		if (!empty($closed)){
			$closed=" ".$closed;
		}
		if (!empty($boxclass)){
			$boxclass=" ".$boxclass;
		}
		return array(array(
						"id" 		=> $id."_custom_tabstart",
						"default" 	=> "",
						"type"		=> "custom",
						"nodiv"		=> 1,
						"html"		=> "<div class='tm-box".$boxclass."'>"
										."<h4 data-id='".$id."-tab' class='tab-header".$closed."'>"
										.$label
										."<span class='fa fa-angle-down tm-arrow'></span>"
										."</h4></div>",
						"label"		=> "",
						"desc" 		=> ""
					));
	}	

	private function _prepend_div( $id="" ,$tmtab="tm-tab"){
		if (!empty($id)){
			$id .="-tab";
		}
		return array(array(
						"id" 		=> $id."_custom_divstart",
						"default" 	=> "",
						"type"		=> "custom",
						"nodiv"		=> 1,
						"html"		=> "<div class='transition ".$tmtab." ".$id."'>",
						"label"		=> "",
						"desc" 		=> ""
					));
	}

	private function _append_div( $id="" ){
		return array(array(
						"id" 		=> $id."_custom_divend",
						"default" 	=> "",
						"type"		=> "custom",
						"nodiv"		=> 1,
						"html"		=> "</div>",
						"label"		=> "",
						"desc" 		=> ""
					));
	}

	private function builder_showlogic(){
		$h="";
		$h .= '<div class="builder-logic-div">';
			$h .= '<div class="row nopadding">';
			$h .= '<select class="epo-rule-toggle"><option value="show">Show</option><option value="hide">Hide</option></select><span>this field if</span><select class="epo-rule-what"><option value="all">all</option><option value="any">any</option></select><span>of these rules match:</span>';
			$h .= '</div>';

			$h .= '<div class="tm-logic-wrapper">';
				
			$h .= '</div>';
		$h .= '</div>';
		return $h;
	}

	/**
	 * Common element options.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @param string  $id element internal id. (key from $this->elements_array)
	 *
	 * @return array List of common element options adjusted by element internal id.
	 */
	private function _get_header_array( $id="header" ) {
		return
		array(
			array(
				"id" 		=> $id."_size",
				"wpmldisable"=>1,
				"default"	=> ($id=="section_header")?"3":"10",
				"type"		=> "select",
				"tags"		=> array( "id"=>"builder_".$id."_size", "name"=>"tm_meta[tmfbuilder][".$id."_size][]" ),
				"options"	=> 
				($id!="section_header")?
				array(					
					array( "text"=> __( "H1", TM_EPO_TRANSLATION ), "value"=>"1" ),
					array( "text"=> __( "H2", TM_EPO_TRANSLATION ), "value"=>"2" ),
					array( "text"=> __( "H3", TM_EPO_TRANSLATION ), "value"=>"3" ),
					array( "text"=> __( "H4", TM_EPO_TRANSLATION ), "value"=>"4" ),
					array( "text"=> __( "H5", TM_EPO_TRANSLATION ), "value"=>"5" ),
					array( "text"=> __( "H6", TM_EPO_TRANSLATION ), "value"=>"6" ),
					array( "text"=> __( "p", TM_EPO_TRANSLATION ), "value"=>"7" ),
					array( "text"=> __( "div", TM_EPO_TRANSLATION ), "value"=>"8" ),
					array( "text"=> __( "span", TM_EPO_TRANSLATION ), "value"=>"9" ),
					array( "text"=> __( "label", TM_EPO_TRANSLATION ), "value"=>"10" )
				):
				array(					
					array( "text"=> __( "H1", TM_EPO_TRANSLATION ), "value"=>"1" ),
					array( "text"=> __( "H2", TM_EPO_TRANSLATION ), "value"=>"2" ),
					array( "text"=> __( "H3", TM_EPO_TRANSLATION ), "value"=>"3" ),
					array( "text"=> __( "H4", TM_EPO_TRANSLATION ), "value"=>"4" ),
					array( "text"=> __( "H5", TM_EPO_TRANSLATION ), "value"=>"5" ),
					array( "text"=> __( "H6", TM_EPO_TRANSLATION ), "value"=>"6" ),
					array( "text"=> __( "p", TM_EPO_TRANSLATION ), "value"=>"7" ),
					array( "text"=> __( "div", TM_EPO_TRANSLATION ), "value"=>"8" ),
					array( "text"=> __( "span", TM_EPO_TRANSLATION ), "value"=>"9" )
				)
				,
				"label"		=> __( "Label type", TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			),
			array(
				"id" 		=> $id."_title",
				//"message0x0_class" 	=> "builder_hide_for_variation",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"t tm-header-title", "id"=>"builder_".$id."_title", "name"=>"tm_meta[tmfbuilder][".$id."_title][]", "value"=>"" ),
				"label"		=> __( 'Label', TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			),
			array(
				"id" 		=> $id."_title_position",
				"wpmldisable"=>1,
				"default"	=> "",
				"type"		=> "select",
				"tags"		=> array( "id"=>"builder_".$id."_title_position", "name"=>"tm_meta[tmfbuilder][".$id."_title_position][]" ),
				"options"	=> array(
					array( "text"=> __( "Above field", TM_EPO_TRANSLATION ), "value"=>"" ),
					array( "text"=> __( "Left of the field", TM_EPO_TRANSLATION ), "value"=>"left" ),
					array( "text"=> __( "Right of the field", TM_EPO_TRANSLATION ), "value"=>"right" ),
					array( "text"=> __( "Disable", TM_EPO_TRANSLATION ), "value"=>"disable" ),
				),
				"label"		=> __( "Label position", TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			),
			array(
				"id" 		=> $id."_title_color",
				"wpmldisable"=>1,
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"tm-color-picker", "id"=>"builder_".$id."_title_color", "name"=>"tm_meta[tmfbuilder][".$id."_title_color][]", "value"=>"" ),
				"label"		=> __( 'Label color', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Leave empty for default value', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> $id."_subtitle",
				"message0x0_class" 	=> "builder_hide_for_variation",
				"default"	=> "",
				"type"		=> "textarea",
				"tags"		=> array( "id"=>"builder_".$id."_subtitle", "name"=>"tm_meta[tmfbuilder][".$id."_subtitle][]" ),
				"label"		=> __( "Subtitle", TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			),
			array(
				"id" 		=> $id."_subtitle_position",
				"wpmldisable"=>1,
				"message0x0_class" 	=> "builder_hide_for_variation",
				"default"	=> "",
				"type"		=> "select",
				"tags"		=> array( "id"=>"builder_".$id."_subtitle_position", "name"=>"tm_meta[tmfbuilder][".$id."_subtitle_position][]" ),
				"options"	=> array(
					array( "text"=> __( "Above field", TM_EPO_TRANSLATION ), "value"=>"" ),
					array( "text"=> __( "Below field", TM_EPO_TRANSLATION ), "value"=>"below" ),
					array( "text"=> __( "Tooltip", TM_EPO_TRANSLATION ), "value"=>"tooltip" ),
				),
				"label"		=> __( "Subtitle position", TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			),
			array(
				"id" 		=> $id."_subtitle_color",
				"wpmldisable"=>1,
				"message0x0_class" 	=> "builder_hide_for_variation",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"tm-color-picker", "id"=>"builder_".$id."_subtitle_color", "name"=>"tm_meta[tmfbuilder][".$id."_subtitle_color][]", "value"=>"" ),
				"label"		=> __( 'Subtitle color', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Leave empty for default value', TM_EPO_TRANSLATION )
			)
		);
	}

	/**
	 * Sets element divider option.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @param string  $id element internal id. (key from $this->elements_array)
	 *
	 * @return array Element divider options adjusted by element internal id.
	 */
	private function _get_divider_array( $id="divider", $noempty=1 ) {
		$_divider = array(
			array(
				"id" 		=> $id."_type",
				"wpmldisable"=>1,
				"message0x0_class" 	=> "builder_hide_for_variation",
				"default"	=> "hr",
				"type"		=> "select",
				"tags"		=> array( "id"=>"builder_".$id."_type", "name"=>"tm_meta[tmfbuilder][".$id."_type][]" ),
				"options"	=> array(
					array( "text"=> __( "Horizontal rule", TM_EPO_TRANSLATION ), "value"=>"hr" ),
					array( "text"=> __( "Divider", TM_EPO_TRANSLATION ), "value"=>"divider" ),
					array( "text"=> __( "Padding", TM_EPO_TRANSLATION ), "value"=>"padding" )
				),
				"label"		=> __( "Divider type", TM_EPO_TRANSLATION ),
				"desc" 		=> ""
			)
		);
		if ( empty( $noempty ) ) {
			$_divider[0]["default"]="none";
			array_push( $_divider[0]["options"], array( "text"=>__( "None", TM_EPO_TRANSLATION ), "value"=>"none" ) );
		}
		return $_divider;
	}

	private function _prepend_logic($id=""){
		return array(
			array(
				"id" 		=> $id."_uniqid",
				"default"	=> "",
				"nodiv"  	=> 1,
				"type"		=> "hidden",
				"tags"		=> array( "class"=>"tm-builder-element-uniqid", "name"=>"tm_meta[tmfbuilder][".$id."_uniqid][]", "value"=>"" ),
				"label"		=> "",
				"desc" 		=> ""
			),
			array(
				"id"   		=> $id."_clogic",
				"default" 	=> "",
				"nodiv"  	=> 1,
				"type"  	=> "hidden",
				"tags"  	=> array( "class"=>"tm-builder-clogic", "name"=>"tm_meta[tmfbuilder][".$id."_clogic][]", "value"=>"" ),
				"label"  	=> "",
				"desc"   	=> ""
			),
			array(
				"id"   		=> $id."_logic",
				"default" 	=> "",
				"type"  	=> "select",
				"tags"  	=> array( "class"=>"activate-element-logic", "id"=>"divider_element_logic", "name"=>"tm_meta[tmfbuilder][".$id."_logic][]" ),
				"options" 	=> array(
					array( "text" => __( "No", TM_EPO_TRANSLATION ), "value"=>"" ),
					array( "text" => __( "Yes", TM_EPO_TRANSLATION ), "value"=>"1" )
				),
				"extra"		=> $this->builder_showlogic(),
				"label"		=> __("Element Conditional Logic", TM_EPO_TRANSLATION ),
				"desc" 		=> __("Enable conditional logic for showing or hiding this element.", TM_EPO_TRANSLATION )
			)
		);
	}

	/**
	 * Generates all hidden elements for use in jQuery.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function print_elements( $echo=0, $wpml_is_original_product=true ) {
		$out1='';
		$drag_elements='';
		foreach ( $this->get_elements() as $element=>$settings ) {
			if ( isset( $this->elements_array[$element] ) ) {
				if(empty($settings['no_selection'])){
					$drag_elements .="<div data-element='".$element."' class='ditem element-".$element."'><div class='tm-label'><i class='tmfa fa ".$settings["icon"]."'></i> ".$settings["name"]."</div></div>";
				}
				$_temp_option=$this->elements_array[$element];
				$internal_name_input = '<input type="hidden" value="'.esc_attr($settings["name"]).'" name="tm_meta[tmfbuilder]['.$element.'_internal_name][]" class="t tm-internal-name">';
				$out1 	.="<div class='bitem element-".$element." ".$settings["width"]."'>"
						."<input class='builder_element_type' name='tm_meta[tmfbuilder][element_type][]' type='hidden' value='".$element."' />"
						."<input class='div_size' name='tm_meta[tmfbuilder][div_size][]' type='hidden' value='".$settings["width"]."' />"
						."<div class='hstc2 closed'><div class='tmicon fa fa-sort move'></div>"
						."<div class='tmicon fa fa-minus minus'></div><div class='tmicon fa fa-plus plus'></div>"
						."<div class='tmicon size'>".$settings["width_display"]."</div>"
						."<div class='tmicon fa fa-pencil edit'></div><div class='tmicon fa fa-copy clone'></div><div class='tmicon fa fa-times delete'></div><span class='tm-element-label'>".$settings["name"]."</span>".$internal_name_input
						."<div class='tm-label-icon'><i class='tmfa fa ".$settings["icon"]."'></i></div>"
						."<div class='tm-label'>".$settings["name"]."</div><div class='inside'><div class='manager'>"
						."<div class='builder_element_wrap'>";
				foreach ( $_temp_option  as $key=>$value ) {
					$out1 .=TM_EPO_HTML()->tm_make_field( $value, 0 );
				}
				$out1 .="</div></div></div></div></div>";
			}
		}
		$out  ='<div class="builder_elements"><div class="builder_hidden_elements" data-template="'.esc_html( json_encode( array( "html"=>$out1 ) ) ).'"></div>'
				.'<div class="builder_hidden_section" data-template="'.esc_html( json_encode( array( "html"=>$this->section_elements( 0, $wpml_is_original_product ) ) ) ).'"></div>'
				.(($wpml_is_original_product)?'<div class="builder_drag_elements">'.$drag_elements.'</div>':'')
				.(($wpml_is_original_product)?'<div class="builder_actions">'.'<a class="builder_add_section tm-button bsbb" href="#"><i class="fa fa-plus-square"></i> '.__("Add section",TM_EPO_TRANSLATION).'</a>'.'</div>':'')
				."</div>";
		if ( empty( $echo ) ) {
			return $out;
		}else {
			echo $out;
		}
	}

	private function _section_template($out="",$size="",$section_size="", $elements="", $wpml_is_original_product=true){
		return "<div class='builder_wrapper ".$section_size."'>"
			. "<div class='section_elements closed'>"
			. $out
			. "</div>"
			. "<div class='btitle'>"
			. (($wpml_is_original_product)?"<div class='tmicon fa fa-sort move'></div>":"")
			. (($wpml_is_original_product)?"<div class='tmicon fa fa-minus minus'></div>":"")
			. (($wpml_is_original_product)?"<div class='tmicon fa fa-plus plus'></div>":"")
			. "<div class='tmicon size'>".$size."</div>"
			. (($wpml_is_original_product)?"<div class='tmicon builder_add_on_section'>".__("Add item",TM_EPO_TRANSLATION)." <i class='fa fa-plus plus'></i></div>":"")
			. (($wpml_is_original_product)?"<div class='tmicon fa fa-times delete'></div>":"")
			. "<div class='tmicon fa fa-pencil edit'></div>"
			. (($wpml_is_original_product)?"<div class='tmicon fa fa-copy clone'></div>":"")
			. "<div class='tmicon fa fa-caret-down fold'></div>"
			. "<div class='tmicon tm-section-label'><div class='tm-label'></div></div>"
			. "</div>"
			. "<div class='bitem_wrapper'>".$elements."</div>"
			. "</div>";
	}
	/**
	 * Generates all hidden sections for use in jQuery.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function section_elements( $echo=0, $wpml_is_original_product=true ) {
		$out='';

		foreach ( $this->_section_elements as $k=>$v ) {
			$out .=TM_EPO_HTML()->tm_make_field( $v, 0 );
		}

		$out = $this->_section_template( $out, $this->sizer["w100"], "","",$wpml_is_original_product );

		if ( empty( $echo ) ) {
			return $out;
		}else {
			echo $out;
		}

	}

	private function _tm_clear_array_values($val) { 
		if(is_array($val)){
			return array_map(array( $this,'_tm_clear_array_values'), $val);
		}else{
			return "";
		}
	}

	/**
	 * Generates all saved elements.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function print_saved_elements( $echo=0, $post_id=0, $current_post_id=0, $wpml_is_original_product=true ) {
		$builder = get_post_meta( $post_id , 'tm_meta', true );
		$current_builder = get_post_meta( $current_post_id , 'tm_meta_wpml', true );
		if (!$current_builder){
			$current_builder=array();
		}else{
			if (!isset($current_builder['tmfbuilder'])){
				$current_builder['tmfbuilder'] = array();
			}
			$current_builder = $current_builder['tmfbuilder'];
		}
		$out='';
		if (!isset($builder['tmfbuilder'])){
			$builder['tmfbuilder'] = array();
		}
		$builder = $builder['tmfbuilder'];

		/* only check for element_type meta
		   as if it exists div_size will exist too
		   unless database has been compromised
		*/
		if ( !empty( $post_id ) && is_array( $builder ) && count( $builder )>0 && isset($builder['element_type']) && is_array($builder['element_type']) && count($builder['element_type'])>0 ) {
			// All the elements
			$_elements=$builder['element_type'];
			// All element sizes
			$_div_size=$builder['div_size'];

			// All sections (holds element count for each section)
			$_sections=$builder['sections'];
			// All section sizes
			$_sections_size=$builder['sections_size'];

			if ( !is_array( $_sections ) ){
				$_sections=array( count( $_elements ) );
			}
			if ( !is_array( $_sections_size ) ){
				$_sections_size=array( "w100" );
			}

			$_helper_counter=0;
			$_this_elements= $this->get_elements();

			$additional_currencies=TM_EPO_HELPER()->wc_aelia_cs_enabled_currencies();

			$t=array();
			
			$_counter=array();
			$id_counter=array();
			for ( $_s = 0; $_s < count( $_sections ); $_s++ ) {

				$section_html='';
				foreach ( $this->_section_elements as $_sk=>$_sv ) {
					$transition_counter = $_s;
					$section_use_wpml=false;
					if(isset( $current_builder["sections_uniqid"] ) 
						&& isset($builder["sections_uniqid"]) 
						&& isset($builder["sections_uniqid"][$_s]) ){
						// get index of element id in internal array
						$get_current_builder_uniqid_index = array_search($builder["sections_uniqid"][$_s], $current_builder["sections_uniqid"] );
						if ($get_current_builder_uniqid_index!==NULL && $get_current_builder_uniqid_index!==FALSE){
							$transition_counter = $get_current_builder_uniqid_index;
							$section_use_wpml=true;
						}
					}					
					if (isset($builder[$_sv['id']]) && isset($builder[$_sv['id']][$_s])){
						$_sv['default'] = $builder[$_sv['id']][$_s];
						if ($section_use_wpml 
							&& isset($current_builder[$_sv['id']]) 
							&& isset($current_builder[$_sv['id']][$transition_counter])){
							$_sv['default'] = $current_builder[$_sv['id']][$transition_counter];
						}
					}
					if ( isset( $_sv['tags']['id'] ) ) {
						// we assume that $_sv['tags']['name'] exists if tag id is set
						$_name=str_replace(array("[","]"), "", $_sv['tags']['name']);						
						$_sv['tags']['id']=$_name.$_s;
					}
					if ($_sk=='sectionuniqid' && !isset($builder[$_sv['id']])){
						$_sv['default'] = uniqid("",true);
					}
					if($post_id!=$current_post_id && !empty($_sv['wpmldisable'])){
						$_sv['disabled']=1;
					}
					$section_html .=TM_EPO_HTML()->tm_make_field( $_sv, 0 );
				}

				$elements_html='';
				for ( $k0 = $_helper_counter; $k0 < intval( $_helper_counter+intval( $_sections[$_s] ) ); $k0++ ) {
					if (isset($_elements[$k0])){
						if ( isset( $this->elements_array[$_elements[$k0]] ) ) {
							$_temp_option=$this->elements_array[$_elements[$k0]];
							if ( !isset( $_counter[$_elements[$k0]] ) ) {
								$_counter[$_elements[$k0]]=0;
							}else {
								$_counter[$_elements[$k0]]++;
							}
							$internal_name = $_this_elements[$_elements[$k0]]["name"];
							if (isset($builder[$_elements[$k0].'_internal_name'])
								&& isset($builder[$_elements[$k0].'_internal_name'][$_counter[$_elements[$k0]]])){
								$internal_name = $builder[$_elements[$k0].'_internal_name'][$_counter[$_elements[$k0]]];
								if ($section_use_wpml 
									&& isset($current_builder[$_elements[$k0].'_internal_name']) 
									&& isset($current_builder[$_elements[$k0].'_internal_name'][$_counter[$_elements[$k0]]])){
									$internal_name = $current_builder[$_elements[$k0].'_internal_name'][$_counter[$_elements[$k0]]];
								}
							}
							$internal_name_input = '<input type="hidden" value="'.esc_attr($internal_name).'" name="tm_meta[tmfbuilder]['.$_elements[$k0].'_internal_name][]" class="t tm-internal-name">';
							

							$elements_html .="<div class='bitem element-".$_elements[$k0]." ".$_div_size[$k0]. "'>"
								 . "<input class='builder_element_type' name='tm_meta[tmfbuilder][element_type][]' type='hidden' value='". $_elements[$k0]."' />"
								 . "<input class='div_size' name='tm_meta[tmfbuilder][div_size][]' type='hidden' value='". $_div_size[$k0]."' />"
								 . "<div class='hstc2 closed'>"
								 . (($wpml_is_original_product)?"<div class='tmicon fa fa-sort move'></div>":"")
								 . (($wpml_is_original_product)?"<div class='tmicon fa fa-minus minus'></div>":"")
								 . (($wpml_is_original_product)?"<div class='tmicon fa fa-plus plus'></div>":"")
								 . "<div class='tmicon size'>". $this->sizer[$_div_size[$k0]]."</div>"
								 . "<div class='tmicon fa fa-pencil edit'></div>"
								 . (($wpml_is_original_product)?"<div class='tmicon fa fa-copy clone'></div>":"")
								 . (($wpml_is_original_product)?"<div class='tmicon fa fa-times delete'></div><span class='tm-element-label'>"
								 	.$internal_name."</span>".$internal_name_input:"")
								 . "<div class='tm-label-icon'><i class='tmfa fa ".$_this_elements[$_elements[$k0]]["icon"]."'></i></div>"
								 . "<div class='tm-label'>".$_this_elements[$_elements[$k0]]["name"]."</div>"
								 . "<div class='inside'><div class='manager'>";

							$elements_html .="<div class='builder_element_wrap'>";
							foreach ( $_temp_option  as $key=>$value ) {
								$transition_counter = $_counter[$_elements[$k0]];
								$use_wpml=false;
								if ( isset( $value['id'] ) ) {
									$_vid=$value['id'];
									if ( !isset( $t[$_vid] )  ) {
										$t[$_vid]=isset($builder[$value['id']])
										? $builder[$value['id']]
										: null;
										if($t[$_vid]!==NULL){
											if($post_id!=$current_post_id && !empty($value['wpmldisable'])){
												$value['disabled']=1;
											}
											
										}
									}elseif($t[$_vid]!==NULL){
										if($post_id!=$current_post_id && !empty($value['wpmldisable'])){
											$value['disabled']=1;
										}
									}
									if(isset( $current_builder[$_elements[$k0]."_uniqid"] ) 
										&& isset($builder[$_elements[$k0]."_uniqid"]) 
										&& isset($builder[$_elements[$k0]."_uniqid"][$_counter[$_elements[$k0]]]) ){
										// get index of element id in internal array
										$get_current_builder_uniqid_index = array_search($builder[$_elements[$k0]."_uniqid"][$_counter[$_elements[$k0]]], $current_builder[$_elements[$k0]."_uniqid"] );
										if ($get_current_builder_uniqid_index!==NULL && $get_current_builder_uniqid_index!==FALSE){
											$transition_counter = $get_current_builder_uniqid_index;
											$use_wpml=true;
										}
									} 										
									if ( $t[$_vid] !== NULL && count( $t[$_vid] )>0 && isset( $value['default'] ) && isset( $t[$_vid][$_counter[$_elements[$k0]]] ) ) {
										$value['default'] = $t[$_vid][$_counter[$_elements[$k0]]];
										if ($use_wpml 
											&& isset($current_builder[$value['id']]) 
											&& isset($current_builder[$value['id']][$transition_counter])){
											$value['default'] = $current_builder[$value['id']][$transition_counter];
										}
									}
									if ($value['id']=="variations_options"){
										$value['html'] = $this->builder_sub_variations_options( isset($builder[$value['id']])?$builder[$value['id']]:null , $post_id );
									}
									if (in_array($value['id'],array("checkboxes_options","radiobuttons_options","selectbox_options"))){
										/* holds the default checked values (cannot be cached in $t[$_vid]) */
										$_default_value=isset($builder['multiple_'.$value['id'].'_default_value'])?$builder['multiple_'.$value['id'].'_default_value']:null;
										
										if (is_null($t[$_vid])){
											// needed for WPML
											$_titles_base = isset($builder['multiple_'.$value['id'].'_title'])
												? $builder['multiple_'.$value['id'].'_title']
												: null;
											$_titles = isset($builder['multiple_'.$value['id'].'_title'])
												? isset($current_builder['multiple_'.$value['id'].'_title'])
													?$current_builder['multiple_'.$value['id'].'_title']
													:$builder['multiple_'.$value['id'].'_title']
												: null;
											
											$_values_base = isset($builder['multiple_'.$value['id'].'_value'])
												? $builder['multiple_'.$value['id'].'_value']
												: null;
											$_values = isset($builder['multiple_'.$value['id'].'_value'])
												? isset($current_builder['multiple_'.$value['id'].'_value'])
													?$current_builder['multiple_'.$value['id'].'_value']
													:$builder['multiple_'.$value['id'].'_value']
												: null;
											
											$_prices_base = isset($builder['multiple_'.$value['id'].'_price'])
												? $builder['multiple_'.$value['id'].'_price']
												: null;
											$_prices = isset($builder['multiple_'.$value['id'].'_price'])
												? isset($current_builder['multiple_'.$value['id'].'_price'])
													?$current_builder['multiple_'.$value['id'].'_price']
													:$builder['multiple_'.$value['id'].'_price']
												: null;
											
											$_images_base = isset($builder['multiple_'.$value['id'].'_image'])
												? $builder['multiple_'.$value['id'].'_image']
												: null;
											$_images = isset($builder['multiple_'.$value['id'].'_image'])
												? isset($current_builder['multiple_'.$value['id'].'_image'])
													?$current_builder['multiple_'.$value['id'].'_image']
													:$builder['multiple_'.$value['id'].'_image']
												: null;
											
											$_imagesp_base = isset($builder['multiple_'.$value['id'].'_imagep'])
												? $builder['multiple_'.$value['id'].'_imagep'] 		
												: null;
											$_imagesp = isset($builder['multiple_'.$value['id'].'_imagep'])
												? isset($current_builder['multiple_'.$value['id'].'_imagep'])
													?$current_builder['multiple_'.$value['id'].'_imagep']
													:$builder['multiple_'.$value['id'].'_imagep'] 		
												: null;
											
											$_prices_type_base = isset($builder['multiple_'.$value['id'].'_price_type'])	
												? $builder['multiple_'.$value['id'].'_price_type'] 	
												: null;
											$_prices_type = isset($builder['multiple_'.$value['id'].'_price_type'])	
												? isset($current_builder['multiple_'.$value['id'].'_price_type'])
													?$current_builder['multiple_'.$value['id'].'_price_type']
													:$builder['multiple_'.$value['id'].'_price_type'] 	
												: null;
											
											$c_prices_base = array();
											$c_prices = array();											
											if (!empty($additional_currencies) && is_array($additional_currencies)){
												foreach ($additional_currencies as $ckey => $currency) {
													$mt_prefix = TM_EPO_HELPER()->get_currency_price_prefix($currency);
													$c_prices_base[$currency] = isset($builder['multiple_'.$value['id'].'_price'.$mt_prefix])
														? $builder['multiple_'.$value['id'].'_price'.$mt_prefix]
														: null;
													$c_prices[$currency] = isset($builder['multiple_'.$value['id'].'_price'.$mt_prefix])
														? isset($current_builder['multiple_'.$value['id'].'_price'.$mt_prefix])
															?$current_builder['multiple_'.$value['id'].'_price'.$mt_prefix]
															:$builder['multiple_'.$value['id'].'_price'.$mt_prefix]
														: null;
												}
											}

											$_url_base = isset($builder['multiple_'.$value['id'].'_url'])
												? $builder['multiple_'.$value['id'].'_url']
												: null;											
											$_url = isset($builder['multiple_'.$value['id'].'_url'])
												? isset($current_builder['multiple_'.$value['id'].'_url'])
													?$current_builder['multiple_'.$value['id'].'_url']
													:$builder['multiple_'.$value['id'].'_url']
												: null;											

											if (!is_null($_titles_base) && !is_null($_values_base) && !is_null($_prices_base) ){
												$t[$_vid]=array();
												// backwards combatility

												if (is_null($_titles)){
													$_titles=$_titles_base;
												}
												if (is_null($_values)){
													$_values=$_values_base;
												}
												if (is_null($_prices)){
													$_prices=$_prices_base;
												}

												foreach ($c_prices as $ckey => $cvalue) {
													if (is_null($cvalue)){
														$c_prices[$ckey]=$c_prices_base[$ckey];
													}
												}
												
												if (is_null($_images_base)){
													$_images_base = array_map(array( $this,'_tm_clear_array_values'), $_titles_base);
												}
												if (is_null($_images)){
													$_images=$_images_base;
												}

												if (is_null($_imagesp_base)){
													$_imagesp_base = array_map(array( $this,'_tm_clear_array_values'), $_titles_base);
												}
												if (is_null($_imagesp)){
													$_imagesp=$_imagesp_base;
												}

												if (is_null($_prices_type_base)){
													$_prices_type_base = array_map(array( $this,'_tm_clear_array_values'), $_prices_base);
												}
												if (is_null($_prices_type)){
													$_prices_type=$_prices_type_base;
												}

												if (is_null($_url_base)){
													$_url_base = array_map(array( $this,'_tm_clear_array_values'), $_titles_base);
												}
												if (is_null($_url)){
													$_url=$_url_base;
												}

												foreach ($_titles_base as $option_key=>$option_value){
													$use_original_builder=false;
													$_option_key = $option_key;
													if(isset( $current_builder[$_elements[$k0]."_uniqid"] ) 
														&& isset($builder[$_elements[$k0]."_uniqid"]) 
														&& isset($builder[$_elements[$k0]."_uniqid"][$option_key]) ){
														// get index of element id in internal array
														$get_current_builder_uniqid_index = array_search($builder[$_elements[$k0]."_uniqid"][$option_key], $current_builder[$_elements[$k0]."_uniqid"] );
														if ($get_current_builder_uniqid_index!==NULL && $get_current_builder_uniqid_index!==FALSE){
															$_option_key = $get_current_builder_uniqid_index;
														}else{
															$use_original_builder=true;
														}
													}
													if (!isset($_imagesp[$_option_key])){
														$_imagesp[$_option_key]=array_map(array( $this,'_tm_clear_array_values'),  $_titles_base[$_option_key]);
													}
													if (!isset($_imagesp_base[$_option_key])){
														$_imagesp_base[$_option_key]=array_map(array( $this,'_tm_clear_array_values'),  $_titles_base[$_option_key]);
													}

													if($use_original_builder){
														$obvalues=array(
															"title" => $_titles_base[$_option_key],
															"value" => $_values_base[$_option_key],
															"price" => $_prices_base[$_option_key],
															"image" => $_images_base[$_option_key],
															"imagep" => $_imagesp_base[$_option_key],
															"price_type" => $_prices_type_base[$_option_key],
															"url" => $_url_base[$_option_key]
														);
														foreach ($c_prices_base as $ckey => $cvalue) {
															$mt_prefix = TM_EPO_HELPER()->get_currency_price_prefix($ckey);
															$obvalues["price".$mt_prefix]=$cvalue[$_option_key];
														}
														$t[$_vid][]=$obvalues;
													}else{
														$cbvalues=array(
															"title" => $_titles[$_option_key],
															"value" => $_values[$_option_key],
															"price" => $_prices[$_option_key],
															"image" => $_images[$_option_key],
															"imagep" => $_imagesp[$_option_key],
															"price_type" => $_prices_type[$_option_key],
															"url" => $_url[$_option_key]
														);
														foreach ($c_prices as $ckey => $cvalue) {
															$mt_prefix = TM_EPO_HELPER()->get_currency_price_prefix($ckey);
															$cbvalues["price".$mt_prefix]=$cvalue[$_option_key];
														}
														$t[$_vid][]=$cbvalues;
													}
												}
											}
										}
										if (!is_null($t[$_vid])){

											$value['html'] = $this->builder_sub_options( 
												$t[$_vid][$_counter[$_elements[$k0]]], 
												'multiple_'.$value['id'], 
												$_counter[$_elements[$k0]], 
												$_default_value 
											);

										}
									}
								}
								// we assume that $value['tags']['name'] exists if tag id is set
								if ( isset( $value['tags']['id'] ) ) {
									$_name=str_replace(array("[","]"), "", $value['tags']['name']);
									if (!isset($id_counter[$_name])){
										$id_counter[$_name]=0;
									}else{
										$id_counter[$_name]=$id_counter[$_name]+1;
									}
									$value['tags']['id']=$_name.$id_counter[$_name];
								}

								$elements_html .=TM_EPO_HTML()->tm_make_field( $value, 0 );
							}
							$elements_html .="</div></div></div></div></div>";							
						}						
					}
				}

				$out .= $this->_section_template( $section_html, $this->sizer[$_sections_size[$_s]], $_sections_size[$_s], $elements_html,$wpml_is_original_product );
				$_helper_counter=intval( $_helper_counter+intval( $_sections[$_s] ) );
			}
		}
		if ( empty( $echo ) ) {
			return $out;
		}else {
			echo $out;
		}
	}

	/**
	 * Generates element sub-options for variations.
	 *
	 * @since 3.0.0
	 * @access private
	 */
	public function builder_sub_variations_options( $meta=array(), $product_id=0 ) {
		$o=array();
		$name = "tm_builder_variation_options";
		$class= " withupload";

		$upload = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to use in place of the radio button.", TM_EPO_TRANSLATION )).'" class="tm_upload_button cp_button tm-tooltip"><i class="fa fa-upload"></i></span><span data-tm-tooltip-html="'.esc_attr(__( "Remove the image.", TM_EPO_TRANSLATION )).'" class="tm-upload-button-remove cp-button tm-tooltip"><i class="fa fa-times"></i></span>';
		$uploadp = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to replace the product image with.", TM_EPO_TRANSLATION )).'" class="tm_upload_button tm_upload_buttonp cp_button tm-tooltip"><i class="fa fa-upload"></i></span><span data-tm-tooltip-html="'.esc_attr(__( "Remove the image.", TM_EPO_TRANSLATION )).'" class="tm-upload-button-remove cp-button tm-tooltip"><i class="fa fa-times"></i></span>';

		$settings_attribute=array(
			array(
				"id" 		=> "variations_display_as",
				"default"	=> "select",
				"type"		=> "select",
				"tags"		=> array( "class"=>"variations-display-as", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]" ),
				"options"	=> array(
					array( "text"=> __( "Select boxes", TM_EPO_TRANSLATION ), "value"=>"select" ),
					array( "text"=> __( "Radio buttons", TM_EPO_TRANSLATION ), "value"=>"radio" ),
					array( "text"=> __( "Image swatches", TM_EPO_TRANSLATION ), "value"=>"image" ),
					array( "text"=> __( "Color swatches", TM_EPO_TRANSLATION ), "value"=>"color" ),
				),
				"label"		=> __( "Display as", TM_EPO_TRANSLATION ),
				"desc" 		=> __( "Select the display type of this attribute.", TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_show_reset_button",
				"message0x0_class" => "tma-hide-for-select-box",
				"default"	=> "",
				"type"		=> "select",
				"tags"		=> array( "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]" ),
				"options"	=> array(
					array( "text"=> __( "Disable", TM_EPO_TRANSLATION ), "value"=>"" ),
					array( "text"=> __( "Enable", TM_EPO_TRANSLATION ), "value"=>"yes" ),
				),
				"label"		=> __( 'Show reset button', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Enables the display of a reset button for this attribute.', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_class",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"t", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]", "value"=>"" ),
				"label"		=> __( 'Attribute element class name', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Enter an extra class name to add to this attribute element', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_items_per_row",
				"message0x0_class" => "tma-hide-for-select-box",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"n", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]", "value"=>"" ),
				"label"		=> __( 'Items per row', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Use this field to make a grid display. Enter how many items per row for the grid or leave blank for normal display.', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_item_width",
				"message0x0_class" => "tma-show-for-swatches tma-hide-for-select-box",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"n", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]", "value"=>"" ),
				"label"		=> __( 'Width', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Enter the width of the displayed item or leave blank for auto width.', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_item_height",
				"message0x0_class" => "tma-show-for-swatches tma-hide-for-select-box",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"n", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]", "value"=>"" ),
				"label"		=> __( 'Height', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Enter the height of the displayed item or leave blank for auto height.', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_changes_product_image",
				"default"	=> "",
				"type"		=> "select",
				"tags"		=> array( "class"=>"tm-changes-product-image", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]" ),
				"options"	=> array(
					array( "text"=> __( 'No', TM_EPO_TRANSLATION ), "value"=>"" ),
					array( "text"=> __( 'Use the image replacements', TM_EPO_TRANSLATION ), "value"=>"images" ),
					array( "text"=> __( 'Use custom image', TM_EPO_TRANSLATION ), "value"=>"custom" )
				),
				"label"		=> __( 'Changes product image', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Choose whether to change the product image.', TM_EPO_TRANSLATION )
			),
			array(
				"id" 		=> "variations_show_name",
				"message0x0_class" => "tma-show-for-swatches",
				"default"	=> "hide",
				"type"		=> "select",
				"tags"		=> array( "class"=>"variations-show-name", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][%id%]" ),
				"options"	=> array(
					array( "text"=> __( 'Hide', TM_EPO_TRANSLATION ), "value"=>"hide" ),
					array( "text"=> __( 'Show bottom', TM_EPO_TRANSLATION ), "value"=>"bottom" ),
					array( "text"=> __( 'Show inside', TM_EPO_TRANSLATION ), "value"=>"inside" ),
					array( "text"=> __( 'Tooltip', TM_EPO_TRANSLATION ), "value"=>"tooltip" )
				),
				"label"		=> __( 'Show attribute name', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Choose whether to show or hide the attribute name.', TM_EPO_TRANSLATION )
			)
		);

		$settings_term=array(
			array(
				"id" 		=> "variations_color",
				"message0x0_class" => "tma-term-color",
				"default"	=> "",
				"type"		=> "text",
				"tags"		=> array( "class"=>"tm-color-picker", "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][[%id%]][%term_id%]", "value"=>"" ),
				"label"		=> __( 'Color', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Select the color to use.', TM_EPO_TRANSLATION )
				),
			array(
				"id" 		=> "variations_image",
				"message0x0_class" => "tma-term-image",
				"default"	=> "",
				"type"		=> "hidden",
				"tags"		=> array( "class"=>"n tm_option_image".$class, "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][[%id%]][%term_id%]" ),
				"label"		=> __( 'Image replacement', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Select an image for this term.', TM_EPO_TRANSLATION ),
				"extra" 	=> $upload.'<span class="tm_upload_image"><img class="tm_upload_image_img" alt="" src="%value%" /></span>'
			),
			array(
				"id" 		=> "variations_imagep",
				"message0x0_class" => "tma-term-custom-image",
				"default"	=> "",
				"type"		=> "hidden",
				"tags"		=> array( "class"=>"n tm_option_image tm_option_imagep".$class, "id"=>"builder_%id%", "name"=>"tm_meta[tmfbuilder][variations_options][%attribute_id%][[%id%]][%term_id%]" ),
				"label"		=> __( 'Product Image replacement', TM_EPO_TRANSLATION ),
				"desc" 		=> __( 'Select the image to replace the product image with.', TM_EPO_TRANSLATION ),
				"extra" 	=> $uploadp.'<span class="tm_upload_image tm_upload_imagep"><img class="tm_upload_image_img" alt="" src="%value%" /></span>'
			)

		);

		$out  = "";

		$attributes=array();
		
		$d_counter=0;
		if (!empty($product_id)){
			$product = wc_get_product( $product_id );
			
			if($product && is_object($product) && method_exists($product, 'get_variation_attributes')){
				$attributes = $product->get_variation_attributes();
			}

		}

		if (empty($attributes)){
			return '<div class="errortitle"><p><i class="fa fa-exclamation-triangle"></i> '.__( 'No saved variations found.', TM_EPO_TRANSLATION ).'</p></div>';
		}

		foreach ($attributes as $name => $options) {
			$out .=   '<div class="tma-handle-wrap tm-attribute">'
					. '<div class="tma-handle"><div class="tma-attribute_label">'.wc_attribute_label($name).'</div><div class="tmicon fa fold fa-caret-up"></div></div>'
					. '<div class="tma-handle-wrapper tm-hidden">'
					. '<div class="tma-attribute w100">';
			$attribute_id=sanitize_title( $name );
			foreach ($settings_attribute as $setting) {
				$setting["tags"]["id"] = str_replace("%id%", $setting["id"], $setting["tags"]["id"]);
				$setting["tags"]["name"] = str_replace("%id%", $setting["id"], $setting["tags"]["name"]);
				$setting["tags"]["name"] = str_replace("%attribute_id%", $attribute_id, $setting["tags"]["name"]);
				if ( !empty($meta) && isset($meta[$attribute_id]) && isset($meta[$attribute_id][$setting["id"]]) ){
					$setting["default"] = $meta[$attribute_id][$setting["id"]];
				}
				$out .= TM_EPO_HTML()->tm_make_field( $setting, 0 );
			}			

			if ( is_array( $options ) ) {

				if ( taxonomy_exists( sanitize_title( $name ) ) ) {

					$orderby = wc_attribute_orderby( sanitize_title( $name ) );
					$args = array();
					switch ( $orderby ) {
					case 'name' :
						$args = array( 'orderby' => 'name', 'hide_empty' => false, 'menu_order' => false );
						break;
					case 'id' :
						$args = array( 'orderby' => 'id', 'order' => 'ASC', 'menu_order' => false, 'hide_empty' => false );
						break;
					case 'menu_order' :
						$args = array( 'menu_order' => 'ASC', 'hide_empty' => false );
						break;
					}

					if (!empty($args)){
						$terms = get_terms( sanitize_title( $name ), $args );

						foreach ( $terms as $term ) {
							// Get only selected terms
							if ( ! $has_term = has_term( (int) $term->term_id, sanitize_title( $name ), $product_id )  ){
								continue;
							}
							$term_id = $term->slug;
							$out .=   '<div class="tma-handle-wrap tm-term">'
									. '<div class="tma-handle"><div class="tma-attribute_label">'.apply_filters( 'woocommerce_variation_option_name', $term->name ) .'</div><div class="tmicon fa fold fa-caret-up"></div></div>'
									. '<div class="tma-handle-wrapper tm-hidden">'
									. '<div class="tma-attribute w100">';
							foreach ($settings_term as $setting) {
								$setting["tags"]["id"] = str_replace("%id%", $setting["id"], $setting["tags"]["id"]);
								$setting["tags"]["name"] = str_replace("%id%", $setting["id"], $setting["tags"]["name"]);
								$setting["tags"]["name"] = str_replace("%attribute_id%", sanitize_title( $name ), $setting["tags"]["name"]);
								$setting["tags"]["name"] = str_replace("%term_id%", esc_attr( $term_id ), $setting["tags"]["name"]);
								if ( !empty($meta) && isset($meta[$attribute_id]) && isset($meta[$attribute_id][$setting["id"]]) && isset($meta[$attribute_id][$setting["id"]][$term_id]) ){
									$setting["default"] = $meta[$attribute_id][$setting["id"]][$term_id];
									if(isset($setting["extra"])){
										$setting["extra"] = str_replace("%value%", $meta[$attribute_id][$setting["id"]][$term_id], $setting["extra"]);
									}
								}else{
									if(isset($setting["extra"])){
										$setting["extra"] = str_replace("%value%", "", $setting["extra"]);
									}
								}
								$out .= TM_EPO_HTML()->tm_make_field( $setting, 0 );
							}

							$out .= '</div></div></div>';
						}
					}

				} else {

					foreach ( $options as $option ) {
						$out .=   '<div class="tma-handle-wrap tm-term">'
								. '<div class="tma-handle"><div class="tma-attribute_label">'.esc_html( apply_filters( 'woocommerce_variation_option_name', $option ) ) .'</div><div class="tmicon fa fold fa-caret-up"></div></div>'
								. '<div class="tma-handle-wrapper tm-hidden">'
								. '<div class="tma-attribute w100">';

						foreach ($settings_term as $setting) {
							$setting["tags"]["id"] = str_replace("%id%", $setting["id"], $setting["tags"]["id"]);
							$setting["tags"]["name"] = str_replace("%id%", $setting["id"], $setting["tags"]["name"]);
							$setting["tags"]["name"] = str_replace("%attribute_id%", sanitize_title( $name ), $setting["tags"]["name"]);
							$setting["tags"]["name"] = str_replace("%term_id%", esc_attr( $option ), $setting["tags"]["name"]);
							if ( !empty($meta) && isset($meta[$attribute_id]) && isset($meta[$attribute_id][$setting["id"]]) && isset($meta[$attribute_id][$setting["id"]][$option]) ){
								$setting["default"] = $meta[$attribute_id][$setting["id"]][$option];
								if(isset($setting["extra"])){
									$setting["extra"] = str_replace("%value%", $meta[$attribute_id][$setting["id"]][$option], $setting["extra"]);
								}
							}else{
								if(isset($setting["extra"])){
									$setting["extra"] = str_replace("%value%", "", $setting["extra"]);
								}
							}
							$out .= TM_EPO_HTML()->tm_make_field( $setting, 0 );
						}

						$out .= '</div></div></div>';
					}
						
				}
			}					

			$out .= '</div></div></div>';
		}

		return $out;
	}

	/**
	 * Generates element sub-options for selectbox, checkbox and radio buttons.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function builder_sub_options( $options=array(), $name="multiple_selectbox_options", $counter=NULL , $default_value=NULL) {
		$o=array();
		$upload="";
		$uploadp="";
		$class="";
		$additional_currencies=TM_EPO_HELPER()->wc_aelia_cs_enabled_currencies();
		if ($name == "multiple_radiobuttons_options" || $name == "multiple_checkboxes_options"){
			if ($name == "multiple_radiobuttons_options"){
				$upload = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to use in place of the radio button.", TM_EPO_TRANSLATION )).'" class="tm_upload_button cp_button tm-tooltip"><i class="fa fa-upload"></i></span>';
			}elseif ($name == "multiple_checkboxes_options"){
				$upload = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to use in place of the checkbox.", TM_EPO_TRANSLATION )).'" class="tm_upload_button cp_button tm-tooltip"><i class="fa fa-upload"></i></span>';
			}
			
			$uploadp = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to replace the product image with.", TM_EPO_TRANSLATION )).'" class="tm_upload_button tm_upload_buttonp cp_button tm-tooltip"><i class="fa fa-upload"></i></span>';
			$class= " withupload";
		}
		if ($name == "multiple_selectbox_options"){
			$uploadp = '&nbsp;<span data-tm-tooltip-html="'.esc_attr(__( "Choose the image to replace the product image with.", TM_EPO_TRANSLATION )).'" class="tm_upload_button tm_upload_buttonp cp_button tm-tooltip"><i class="fa fa-upload"></i></span>';
			$class= " withupload";
		}
		$o["title"]= array(
			"id" 		=> $name."_title",
			"default"	=>"",
			"type"		=> "text",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"t tm_option_title", "id"=>$name."_title", "name"=>$name."_title", "value"=>"" ),
			//"extra" 	=> $upload
		);
		$o["value"]= array(
			"id" 		=> $name."_value",
			"default"	=> "",
			"type"		=> "text",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"t tm_option_value", "id"=>$name."_value", "name"=>$name."_value" ),
		);
		$o["price"]= array(
			"id" 		=> $name."_price",
			"default"	=> "",
			"type"		=> "text",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"n tm_option_price", "id"=>$name."_price", "name"=>$name."_price" ),
		);
		$o["image"]= array(
			"id" 		=> $name."_image",
			"default"	=> "",
			"type"		=> "hidden",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"n tm_option_image".$class, "id"=>$name."_image", "name"=>$name."_image" ),
			"extra" 	=> $upload
		);		
		$o["imagep"]= array(
			"id" 		=> $name."_imagep",
			"default"	=> "",
			"type"		=> "hidden",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"n tm_option_image tm_option_imagep".$class, "id"=>$name."_imagep", "name"=>$name."_imagep" ),
		);		
		$o["price_type"]= array(
			"id" 		=> $name."_price_type",
			"default"	=> "",
			"type"		=> "select",
			"options"	=> array(
						array( "text"=> __( "Fixed amount", TM_EPO_TRANSLATION ), "value"=>"" ),
						array( "text"=> __( "Percent of the original price", TM_EPO_TRANSLATION ), "value"=>"percent" ),
						array( "text"=> __( "Percent of the original price + options", TM_EPO_TRANSLATION ), "value"=>"percentcurrenttotal" )
					),
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"n tm_option_price_type ".$name, "id"=>$name."_price_type", "name"=>$name."_price_type" ),
		);
		$o["url"]= array(
			"id" 		=> $name."_url",
			"default"	=>"",
			"type"		=> "text",
			"nodiv"		=> 1,
			"tags"		=> array( "class"=>"t tm_option_url", "id"=>$name."_url", "name"=>$name."_url", "value"=>"" ),
			//"extra" 	=> $upload
		);
		if ($this->woo_subscriptions_check && $name!="multiple_selectbox_options"){
			$o["price_type"]['options'][]=array( "text"=> __( "Subscription fee", TM_EPO_TRANSLATION ), "value"=>"subscriptionfee" );
		}
		if ($name!="multiple_selectbox_options"){
			$o["price_type"]['options'][]=array( "text"=> __( "Fee", TM_EPO_TRANSLATION ), "value"=>"fee" );
		}
		if ( !$options ) {
			$options = array(
				"title" => array( "" ),
				"value" => array( "" ),
				"price" => array( "" ),
				"image" => array( "" ),
				"imagep" => array( "" ),
				"price_type" => array( "" ),
				"url" =>array( "" )
			);
		}

		$del=TM_EPO_HTML()->tm_make_button( array(
				"text"=>"<i class='fa fa-times'></i>",
				"tags"=>array( "href"=>"#delete", "class"=>"button button-secondary button-small builder_panel_delete" ) 
				), 0 );
		$drag=TM_EPO_HTML()->tm_make_button( array(
				"text"=>"<i class='fa fa-sort'></i>",
				"tags"=>array( "href"=>"#move", "class"=>"builder_panel_move" )
				), 0 );

		$out  = "<div class='row nopadding multiple_options'>"
			. "<div class='cell col-auto tm_cell_move'>&nbsp;</div>"
			. "<div class='cell col-auto tm_cell_default'>".(($name == "multiple_checkboxes_options")?__( "Checked", TM_EPO_TRANSLATION ):__( "Default", TM_EPO_TRANSLATION ))."</div>"
			. "<div class='cell col-3 tm_cell_title'>".__( "Label", TM_EPO_TRANSLATION )."</div>"
			. "<div class='cell col-2 tm_cell_images'>".__( "Images", TM_EPO_TRANSLATION )."</div>"
			//. "<div class='cell col-1 tm_cell_url'>".__( "URL", TM_EPO_TRANSLATION )."</div>"
			. "<div class='cell col-0 tm_cell_value'>".__( "Value", TM_EPO_TRANSLATION )."</div>"
			. "<div class='cell col-auto tm_cell_price'>".__( "Price", TM_EPO_TRANSLATION )."</div>"
			. "<div class='cell col-auto tm_cell_delete'><span class='tm-button button button-primary button-large builder_panel_delete_all'>".__( "Delete all options", TM_EPO_TRANSLATION )."</span></div>"
			. "</div>"
			. "<div class='panels_wrap nof_wrapper'>";
		
		$d_counter=0;
		foreach ( $options["title"] as $ar=>$el ) {
			$out  	.= "<div class='options_wrap'>"
					. "<div class='row nopadding'>";

			$o["title"]["default"]  		= $options["title"][$ar];//label
			$o["title"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_title][".( is_null( $counter )?0:$counter )."][]";
			$o["title"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["title"]["tags"]["name"])."_".$ar;
			//$o["title"]["extra"]			= $upload.'<span class="tm_upload_image"><img class="tm_upload_image_img" alt="" src="'.$options["image"][$ar].'" /></span>';
			
			$o["value"]["default"]  		= $options["value"][$ar];//value
			$o["value"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_value][".( is_null( $counter )?0:$counter )."][]";
			$o["value"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["value"]["tags"]["name"])."_".$ar;
			
			$o["price"]["default"]  		= $options["price"][$ar];//price
			$o["price"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_price][".( is_null( $counter )?0:$counter )."][]";
			$o["price"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["price"]["tags"]["name"])."_".$ar;

			$o["image"]["default"]  		= $options["image"][$ar];//image
			$o["image"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_image][".( is_null( $counter )?0:$counter )."][]";
			$o["image"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["image"]["tags"]["name"])."_".$ar;
			$o["image"]["extra"]			= $upload.'<span class="tm_upload_image"><img class="tm_upload_image_img" alt="" src="'.$options["image"][$ar].'" /></span>';

			$o["imagep"]["default"]  		= $options["imagep"][$ar];//imagep
			$o["imagep"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_imagep][".( is_null( $counter )?0:$counter )."][]";
			$o["imagep"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["imagep"]["tags"]["name"])."_".$ar;
			$o["imagep"]["extra"]			= $uploadp.'<span class="tm_upload_image tm_upload_imagep"><img class="tm_upload_image_img" alt="" src="'.$options["imagep"][$ar].'" /></span>';

			$o["price_type"]["default"]  		= $options["price_type"][$ar];//price type
			$o["price_type"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_price_type][".( is_null( $counter )?0:$counter )."][]";
			$o["price_type"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["price_type"]["tags"]["name"])."_".$ar;

			$o["url"]["default"]  		= $options["url"][$ar];//url
			$o["url"]["tags"]["name"] 	= "tm_meta[tmfbuilder][".$name."_url][".( is_null( $counter )?0:$counter )."][]";
			$o["url"]["tags"]["id"]		= str_replace(array("[","]"), "", $o["url"]["tags"]["name"])."_".$ar;

			if ($name == "multiple_checkboxes_options"){
				$default_select = '<input type="checkbox" value="'.$d_counter.'" name="tm_meta[tmfbuilder]['.$name.'_default_value]['.( is_null( $counter )?0:$counter ).'][]" class="tm-default-checkbox" '.checked(  ( is_null( $counter )?"":isset($default_value[$counter])?in_array($d_counter, $default_value[$counter]):"" ) , true ,0).'>';
			}else{
				$default_select = '<input type="radio" value="'.$d_counter.'" name="tm_meta[tmfbuilder]['.
				$name.'_default_value]['.( is_null( $counter )?0:$counter ).']" class="tm-default-radio" '.
				checked(  ( is_null( $counter )?"":
					(isset($default_value[$counter]) && !is_array($default_value[$counter]) )?
					(string)$default_value[$counter]:"" ) , 
				$d_counter ,0).'>';
			}
			$default_select = '<span class="tm-hidden-inline">'.(($name == "multiple_checkboxes_options")?__( "Checked", TM_EPO_TRANSLATION ):__( "Default", TM_EPO_TRANSLATION )).'</span>' . $default_select;
			$out .= "<div class='cell col-auto tm_cell_move'>".$drag."</div>";
			$out .= "<div class='cell col-auto tm_cell_default'>".$default_select."</div>";
			$out .= "<div class='cell col-3 tm_cell_title'>".TM_EPO_HTML()->tm_make_field( $o["title"], 0 )."</div>";
			$out .= "<div class='cell col-2 tm_cell_images'>".TM_EPO_HTML()->tm_make_field( $o["image"], 0 ).TM_EPO_HTML()->tm_make_field( $o["imagep"], 0 )."</div>";
			
			$out .= "<div class='cell col-0 tm_cell_value'>".TM_EPO_HTML()->tm_make_field( $o["value"], 0 )."</div>";
			$out .= "<div class='cell col-auto tm_cell_price'>";
			
			
			if (!empty($additional_currencies) && is_array($additional_currencies)){
				$_copy_value = $o["price"];
				$o["price"]["html_before_field"] ='<span class="tm-choice-currency">'.TM_EPO_HELPER()->wc_base_currency().'</span>';
				$out .=	TM_EPO_HTML()->tm_make_field( $o["price"], 0 );
				foreach ($additional_currencies as $ckey => $currency) {
					$mt_prefix = TM_EPO_HELPER()->get_currency_price_prefix($currency);
					$copy_value = $_copy_value;
					$copy_value["default"] =isset($options["price_".$currency][$ar])?$options["price".$mt_prefix][$ar]:"";
					$copy_value["id"] .= $mt_prefix;

					$copy_value["html_before_field"] = '<span class="tm-choice-currency">'.$currency.'</span>';
					$copy_value["tags"]["name"] = "tm_meta[tmfbuilder][".$name."_price".$mt_prefix."][".( is_null( $counter )?0:$counter )."][]";
					$copy_value["tags"]["id"] = str_replace(array("[","]"), "", $copy_value["tags"]["name"])."_".$ar;
					$out .=	TM_EPO_HTML()->tm_make_field( $copy_value, 0 );
				}
			}else{
				$out .=	TM_EPO_HTML()->tm_make_field( $o["price"], 0 );
			}
			
			$out .= TM_EPO_HTML()->tm_make_field( $o["price_type"], 0 )."</div>";
			$out .= "<div class='cell col-auto tm_cell_delete'>".$del."</div>";

			$out .= "<div class='cell col-12 tm_cell_url'><span class='tm-inline-label'>".__( "URL", TM_EPO_TRANSLATION )."</span>".TM_EPO_HTML()->tm_make_field( $o["url"], 0 )."</div>";

			$out .="</div></div>";
			$d_counter++;
		}
		$out .="</div>";
		$out .=' <a class="tm-button button button-primary button-large builder-panel-add" href="#">'.__( "Add item", TM_EPO_TRANSLATION ).'</a>';
		$out .=' <a class="tm-button button button-primary button-large builder-panel-mass-add" href="#">'.__( "Mass add", TM_EPO_TRANSLATION ).'</a>';

		return $out;
	}

}

?>