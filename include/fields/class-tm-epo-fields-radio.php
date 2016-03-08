<?php
class TM_EPO_FIELDS_radio extends TM_EPO_FIELDS {

	public function display_field_pre( $element=array(), $args=array() ) {
		$this->items_per_row=$element['items_per_row'];
		$this->grid_break="";
		$this->_percent=100;
		$this->_columns=0;
		if (!empty($this->items_per_row)){
			$containter_css_id = 'element_';
			if (isset($element['containter_css_id'])){
				$containter_css_id = $element['containter_css_id'];
			}
			if (!isset($args['product_id'])){
				$args['product_id']='';
			}
			if ($this->items_per_row=="auto"){
				$this->items_per_row=0;
				$this->css_string=".tm-product-id-".$args['product_id']." .".$containter_css_id.$args['element_counter'].$args["form_prefix"]." li{float:".TM_EPO()->float_direction." !important;width:auto !important;}";
			}else{
				$this->items_per_row=(float) $element['items_per_row'];
				$this->_percent=(float) (100/$this->items_per_row);
				$this->css_string=".tm-product-id-".$args['product_id']." .".$containter_css_id.$args['element_counter'].$args["form_prefix"]." li{float:".TM_EPO()->float_direction." !important;width:".$this->_percent."% !important;}";	
			}
								
			$this->css_string = str_replace(array("\r", "\n"), "", $this->css_string);
			TM_EPO()->inline_styles=TM_EPO()->inline_styles.$this->css_string;
		}else{
			$this->items_per_row=(float) $element['items_per_row'];	
		}
							
		$this->_default_value_counter=0;
	}

	public function display_field( $element=array(), $args=array() ) {
		$this->_columns++;
		$this->grid_break="";
		$default_value=isset( $element['default_value'] )?(($element['default_value']!=="")?((int) $element['default_value'] == $this->_default_value_counter):false):false;
		
		if ((float)$this->_columns>(float)$this->items_per_row && $this->items_per_row>0){
			$this->grid_break=" cpf_clear";
			$this->_columns=1;
		}

		$hexclass="";
		$li_class="";
		$search_for_color = $args['label'];
		if (isset($element['color'])){
			$search_for_color = $element['color'];
			if(empty($search_for_color)){
				$search_for_color = 'transparent';
			}
		}
		if($search_for_color == 'transparent' || preg_match('/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/', $search_for_color)){
			$tmhexcolor='tmhexcolor_'.$args['element_counter']."_".$args['field_counter']."_".$args['tabindex'].$args['form_prefix'];
			$hexclass=$tmhexcolor;
			$this->css_string = ".".$tmhexcolor." + label .tmhexcolorimage{background-color:".$search_for_color." !important;}";
			if (!empty($element['item_width'])){
				if (is_numeric($element['item_width'])){
					$element['item_width'] .="px";
				}
				$this->css_string .= ".".$tmhexcolor." + label img{display: inline-block !important;width:".$element['item_width']." !important;min-width:".$element['item_width']." !important;max-width:".$element['item_width']." !important;}";
				$this->css_string .= ".".$tmhexcolor." + label span.tmhexcolorimage{display: inline-block !important;width:".$element['item_width']." !important;min-width:".$element['item_width']." !important;max-width:".$element['item_width']." !important;}";
			}
			if (!empty($element['item_height'])){
				if (is_numeric($element['item_height'])){
					$element['item_height'] .="px";
				}
				$this->css_string .= ".".$tmhexcolor." + label img{display: inline-block !important;height:".$element['item_height']." !important;min-height:".$element['item_height']." !important;max-height:".$element['item_height']." !important;}";
				$this->css_string .= ".".$tmhexcolor." + label span.tmhexcolorimage{display: inline-block !important;height:".$element['item_height']." !important;min-height:".$element['item_height']." !important;max-height:".$element['item_height']." !important;}";
			}
			if (!empty($element['item_width']) || !empty($element['item_height'])){
				$this->css_string .= ".tmhexcolorimage-li.tm-li-unique-".$args['element_counter']."-".$args['field_counter']."-".$args['tabindex'].$args['form_prefix']."{display: inline-block;width:auto !important;oveflow:hidden;}";				
				$li_class .="tmhexcolorimage-li tm-li-unique-".$args['element_counter']."-".$args['field_counter']."-".$args['tabindex'].$args['form_prefix'];
			}else{
				$li_class .="tmhexcolorimage-li-nowh";
			}
			$this->css_string = str_replace(array("\r", "\n"), "", $this->css_string);								
			TM_EPO()->inline_styles=TM_EPO()->inline_styles.$this->css_string;
		}

		$display = array(
			'li_class' 		=> $li_class,
			'class'   		=> !empty( $element['class'] )? $element['class'].' '.$hexclass :"".$hexclass,
			'label'   		=> wptexturize( apply_filters( 'woocommerce_tm_epo_option_name', $args['label'] ) ),
			'value'   		=> esc_attr( $args['value'] ),
			'id'    		=> 'tmcp_choice_'.$args['element_counter']."_".$args['field_counter']."_".$args['tabindex'].$args['form_prefix'],
			'textbeforeprice'=> isset( $element['text_before_price'] )?$element['text_before_price']:"",
			'textafterprice'=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
			'hide_amount'  	=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
			'use_images'	=> $element['use_images'],
			'use_lightbox'	=> isset($element['use_lightbox'])?$element['use_lightbox']:"",
			'use_url'		=> $element['use_url'],
			'grid_break'	=> $this->grid_break,
			'items_per_row' => $this->items_per_row,
			'percent'		=> $this->_percent,
			'image'   		=> isset($element['images'][$args['field_counter']])?$element['images'][$args['field_counter']]:"",
			'imagep'   		=> isset($element['imagesp'][$args['field_counter']])?$element['imagesp'][$args['field_counter']]:"",
			'url'   		=> isset($element['url'][$args['field_counter']])?$element['url'][$args['field_counter']]:"",
			'limit' 		=> empty( $element['limit'] )?"":$element['limit'],
			'exactlimit' 	=> empty( $element['exactlimit'] )?"":$element['exactlimit'],
			'minimumlimit' 	=> empty( $element['minimumlimit'] )?"":$element['minimumlimit'],
			'swatchmode' 	=> empty( $element['swatchmode'] )?"":$element['swatchmode'],
			'clear_options' => empty( $element['clear_options'] )?"":$element['clear_options'],
			'show_label' 	=> empty( $element['show_label'] )?"":$element['show_label'],
			'tm_epo_no_lazy_load' => TM_EPO()->tm_epo_no_lazy_load,
			'changes_product_image' => empty( $element['changes_product_image'] )?"":$element['changes_product_image'],
			'default_value' => $default_value,
			'quantity' 		=> isset( $element['quantity'] )?$element['quantity']:"",
		);
		if (isset($element['color'])){
			$display["color"] = $element['color'];
		}

		$this->_default_value_counter++;

		return $display;

	}

	public function validate() {

		$passed = true;
		$message = array();

		foreach ( $this->tmcp_attributes as $k=>$attribute ) {
			if (isset($this->epo_post_fields[$attribute]) && isset($this->epo_post_fields[$attribute.'_quantity']) && !$this->epo_post_fields[$attribute.'_quantity']>0){
				$passed = false;
				$message[] = sprintf( __( 'The quantity for "%s" must be greater than 0', TM_EPO_TRANSLATION ),  $this->element['options'][$this->epo_post_fields[$attribute]] );
				break;
			}
			if($this->element['required']){
				$is_cart_fee= $this->element['is_cart_fee'][$k];
				$is_fee= $this->element['is_fee'][$k];
				if ($is_cart_fee){
					if ( !isset( $this->epo_post_fields[$this->tmcp_attributes_fee[$k]] ) ) {
						$passed = false;
						$message[] = 'required';
						break;
					}
				}elseif ($is_fee){
					if ( !isset( $this->epo_post_fields[$this->tmcp_attributes_subscription_fee[$k]] ) ) {
						$passed = false;
						$message[] = 'required';
						break;
					}
				}else{
					if ( !isset( $this->epo_post_fields[$attribute] ) ) {
						$passed = false;
						$message[] = 'required';
						break;
					}
				}									
			}
		}

		return array('passed'=>$passed,'message'=>$message);
	}
}