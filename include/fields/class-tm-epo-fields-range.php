<?php
class TM_EPO_FIELDS_range extends TM_EPO_FIELDS {

	public function display_field( $element=array(), $args=array() ) {
		return array(
				'textbeforeprice' 	=> isset( $element['text_before_price'] )?$element['text_before_price']:"",
				'textafterprice'	=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
				'hide_amount'  		=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
				'min'  				=> isset( $element['min'] )?$element['min']:"",
				'max'  				=> isset( $element['max'] )?$element['max']:"",
				'step' 				=> isset( $element['step'] )?$element['step']:"",
				'pips' 				=> isset( $element['pips'] )?$element['pips']:"",
				'noofpips' 			=> isset( $element['pips'] )?$element['noofpips']:"",
				'show_picker_value' => isset( $element['show_picker_value'] )?$element['show_picker_value']:"",
				'quantity' 			=> isset( $element['quantity'] )?$element['quantity']:"",
				'default_value' 	=> isset( $element['default_value'] )?$element['default_value']:"",
			);
	}

	public function validate() {

		$passed = true;
		$message = array();
		
		$quantity_once = false;
		foreach ( $this->field_names as $attribute ) {
			if (!$quantity_once && isset($this->epo_post_fields[$attribute]) && $this->epo_post_fields[$attribute]!=="" && isset($this->epo_post_fields[$attribute.'_quantity']) && !$this->epo_post_fields[$attribute.'_quantity']>0){
				$passed = false;
				$quantity_once = true;
				$message[] = sprintf( __( 'The quantity for "%s" must be greater than 0', TM_EPO_TRANSLATION ),  $this->element['label'] );
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
	
	public function add_cart_item_data_single() {
		if (!$this->is_setup()){
			return false;
		}
		if (!empty($this->key)){
										
			$_price=TM_EPO()->calculate_price( $this->element, $this->key, $this->attribute, $this->per_product_pricing, $this->cpf_product_price, $this->variation_id );
									 
			return array(
				'mode' 					=> 'builder',
				'name' 					=> esc_html( $this->element['label'] ),
				'value' 				=> esc_html( $this->key ),
				'price' 				=> esc_attr( $_price ),
				'section' 				=> esc_html( $this->element['uniqid'] ),
				'section_label' 		=> esc_html( $this->element['label'] ),
				'percentcurrenttotal' 	=> isset($_POST[$this->attribute.'_hidden'])?1:0,
				'quantity' 				=> isset($_POST[$this->attribute.'_quantity'])?$_POST[$this->attribute.'_quantity']:1
			);
		}
		return false;
	}
}