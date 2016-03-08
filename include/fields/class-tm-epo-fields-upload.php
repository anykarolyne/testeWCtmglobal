<?php
class TM_EPO_FIELDS_upload extends TM_EPO_FIELDS {

	public function display_field( $element=array(), $args=array() ) {
		return array(
				'max_size' 		=> size_format( wp_max_upload_size() ),
				'style' 		=> isset( $element['button_type'] )?$element['button_type']:"",
				'textbeforeprice'=> isset( $element['text_before_price'] )?$element['text_before_price']:"",
				'textafterprice'=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
				'hide_amount'  	=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
				'quantity' 		=> isset( $element['quantity'] )?$element['quantity']:"",
			);
	}

	public function validate() {

		$passed = true;
		$message = array();
		
		if($this->element['required']){									
			foreach ( $this->field_names as $attribute ) {
				if ( empty( $_FILES[ $attribute ] ) || empty( $_FILES[ $attribute ]['name'] ) ) {
					$passed = false;
					$message[] = 'required';
					break;
				}										
			}
		}

		return array('passed'=>$passed,'message'=>$message);
	}

	public function add_cart_item_data_single() {
		$_price=TM_EPO()->calculate_price( $this->element, $this->key, $this->attribute, $this->per_product_pricing, $this->cpf_product_price, $this->variation_id );
		if (empty($this->key)){
			$_price=0;
		}
		if ( ! empty( $_FILES[ $this->attribute ] ) && ! empty( $_FILES[ $this->attribute ]['name'] ) ) {
			$upload = TM_EPO()->upload_file( $_FILES[ $this->attribute ] );
										
			if ( empty( $upload['error'] ) && ! empty( $upload['file'] ) ) {
				$value  = wc_clean( $upload['url'] );
				wc_add_notice( __("Upload successful",TM_EPO_TRANSLATION) , 'success' );
				return array(
					'name'   => esc_html( $this->element['label'] ),
					'value'  => esc_html( $value ),
					'display'	=> esc_html(TM_EPO()->tm_order_item_display_meta_value( $value,1 )),
					'price'  => esc_attr( $_price ),
					'section'  => esc_html( $this->element['uniqid'] ),
					'section_label'  => esc_html( $this->element['label'] ),
					'percentcurrenttotal' => isset($_POST[$this->attribute.'_hidden'])?1:0,
					'quantity' => 1
				);
			}else{											
				wc_add_notice( $upload['error'] , 'error' );
			}
		}
		return false;
	}
	
}