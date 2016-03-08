<?php
class TM_EPO_FIELDS_select extends TM_EPO_FIELDS {

	public function display_field( $element=array(), $args=array() ) {
		$display =  array(
				'options'   			=> '',
				'use_url'				=> isset( $element['use_url'] )?$element['use_url']:"",
				'textbeforeprice' 		=> isset( $element['text_before_price'] )?$element['text_before_price']:"",
				'textafterprice' 		=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
				'hide_amount'  			=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
				'changes_product_image' => empty( $element['changes_product_image'] )?"":$element['changes_product_image'],
				'quantity' 				=> isset( $element['quantity'] )?$element['quantity']:"",
			);

		$_default_value_counter=0;
		if (!empty($element['placeholder'])){
			$display['options'] .='<option value="" data-price="" data-rules="" data-rulestype="">'.
				wptexturize( apply_filters( 'woocommerce_tm_epo_option_name', $element['placeholder'] ) ).'</option>';								
		}

		$selected_value='';
		if (isset($_POST['tmcp_'.$args['name_inc']]) ){
			$selected_value=$_POST['tmcp_'.$args['name_inc']];
		}
		elseif (isset($_GET['tmcp_'.$args['name_inc']]) ){
			$selected_value=$_GET['tmcp_'.$args['name_inc']];
		}
		elseif (empty($_POST)){
			$selected_value=-1;
		}			

		foreach ( $element['options'] as $value=>$label ) {							
			$default_value=isset( $element['default_value'] )
			?
				(($element['default_value']!=="")
				?((int) $element['default_value'] == $_default_value_counter)
				:false)
			:false;

			$selected=false;
			
			if($selected_value==-1){
				if (empty($_POST) && isset($default_value)){
					if ($default_value){
						$selected=true;
					}
				}
			}else{
				if ( $default_value && !empty($element['default_value_override']) && isset($element['default_value']) ){
					$selected=true;
				}
				else if (esc_attr(stripcslashes($selected_value))==esc_attr( ( $value ) ) ){
					$selected=true;
				}
			}

			$data_url=isset($element['url'][$_default_value_counter])?$element['url'][$_default_value_counter]:"";

			$display['options'] .='<option '.
				selected( $selected, true, 0 ).
				' value="'.esc_attr( $value ).'"'.
				(!empty($data_url)?' data-url="'.esc_attr($data_url).'"':'').
				' data-imagep="'.( isset( $element['imagesp'][$_default_value_counter] )?$element['imagesp'][$_default_value_counter]:"").'"'.
				' data-price="'.( isset( $element['rules_filtered'][$value][0] )?$element['rules_filtered'][$value][0]:0).'"'.
				(isset($element['cdescription'])?
				isset($element['cdescription'][$_default_value_counter])?
				' data-tm-tooltip-html="'.esc_attr(do_shortcode($element['cdescription'][$_default_value_counter])).'"'
				:''
				:'').
				' data-rules="'.( isset( $element['rules_filtered'][$value] )?esc_html( json_encode( ( $element['rules_filtered'][$value] ) ) ):'' ).'"'.
				' data-rulestype="'.( isset( $element['rules_type'][$value] )?esc_html( json_encode( ( $element['rules_type'][$value] ) ) ):'' ).'">'.
				wptexturize( apply_filters( 'woocommerce_tm_epo_option_name', $label ) ).'</option>';
			
			$_default_value_counter++;
		}
		return $display;
	}

	public function validate() {

		$passed = true;
		$message = array();

		$quantity_once=false;
		foreach ( $this->field_names as $attribute ) {
			if (!$quantity_once && isset($this->epo_post_fields[$attribute]) && $this->epo_post_fields[$attribute]!=="" && isset($this->epo_post_fields[$attribute.'_quantity']) && !$this->epo_post_fields[$attribute.'_quantity']>0){
				$passed = false;
				$quantity_once = true;
				$message[] = sprintf( __( 'The quantity for "%s" must be greater than 0', TM_EPO_TRANSLATION ),  $this->element['options'][$this->epo_post_fields[$attribute]] );
			}
			if($this->element['required']){					
				if ( !isset( $this->epo_post_fields[$attribute] ) ||  $this->epo_post_fields[$attribute]=="" ) {
					$passed = false;
					$message[] = 'required';
					break;
				}										
			}
		}

		return array('passed'=>$passed,'message'=>$message);
	}
	
}