<?php
class TM_EPO_FIELDS_select extends TM_EPO_FIELDS {

	public function display_field( $element=array(), $args=array() ) {
		$display =  array(
				'options'   			=> '',
				'use_url'				=> isset( $element['use_url'] )?$element['use_url']:"",
				'textafterprice' 		=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
				'hide_amount'  			=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
				'changes_product_image' => empty( $element['changes_product_image'] )?"":$element['changes_product_image'],
				'quantity' 		=> isset( $element['quantity'] )?$element['quantity']:"",
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

		$_pf = new WC_Product_Factory();
		$j = 0;
		foreach ( $element['options'] as $value=>$label ) {
			$product = null;
			if (substr($label, 0, 4) == 'cat-') {
				$cat_id = substr($label, 4);
				$args = array (
					'post_type'              => array( 'product' ),
					'post_status'            => array( 'publish' ),
					//'cat'                    => $cat_id,
					'tax_query' => array(
						array(
							'taxonomy' => 'product_cat',
							'field' => 'id',
							'terms' => $cat_id
						)
					),
					'pagination'             => false,
					'posts_per_page'         => -1,
					'order'                  => 'ASC',
					'orderby'                => 'title',
				);

				$query = new WP_Query( $args );
				if ( $query->have_posts() ) {
					while ( $query->have_posts() ) {
						$price = $value = $label = null;
						//$query->the_post();
						$the_post = $query->next_post();
						$price = get_post_meta($the_post->ID, '_regular_price', true);
						$value = $the_post->ID;
						$label = get_the_title($value) . ' (' . get_woocommerce_currency_symbol() . $price . ')';
						$display['options'] .= '<option ' .
							' value="' . esc_attr($value) . '_' . $j . '"' .
							(!empty($data_url) ? ' data-url="' . esc_attr($data_url) . '"' : '') .
							' data-imagep="' . (isset($element['imagesp'][$_default_value_counter]) ? $element['imagesp'][$_default_value_counter] : "") . '"' .
							' data-price="' . (isset($price) ? $price : 0) . '"' .
							' data-rules="' . esc_html(json_encode(array(strval($price)))) . '"' .
							' data-rulestype="' . esc_html(json_encode(array('biggest'))) . '">' .
							wptexturize(apply_filters('woocommerce_tm_epo_option_name', $label)) . '</option>';
						$j++;
					}
				}
				$price = $value = $label = null;
				wp_reset_postdata();
			} else {
				if (is_numeric($label)) {
					$product = $_pf->get_product($label);
				}
				if (is_object($product)) {
					$price = get_post_meta($product->id, '_regular_price', true);
					$value = $product->id;
					$label = $product->post->post_title . ' (' . get_woocommerce_currency_symbol() . $price . ')';
					$display['options'] .= '<option ' .
						' value="' . esc_attr($value) . '_' . $j . '"' .
						(!empty($data_url) ? ' data-url="' . esc_attr($data_url) . '"' : '') .
						' data-imagep="' . (isset($element['imagesp'][$_default_value_counter]) ? $element['imagesp'][$_default_value_counter] : "") . '"' .
						' data-price="' . (isset($price) ? $price : 0) . '"' .
						' data-rules="' . esc_html(json_encode(array(strval($price)))) . '"' .
						' data-rulestype="' . esc_html(json_encode(array('biggest'))) . '">' .
						wptexturize(apply_filters('woocommerce_tm_epo_option_name', $label)) . '</option>';
				} else {

					$default_value = isset($element['default_value'])
						?
						(($element['default_value'] !== "")
							? ((int)$element['default_value'] == $_default_value_counter)
							: false)
						: false;

					$selected = false;

					if ($selected_value == -1) {
						if (empty($_POST) && isset($default_value)) {
							if ($default_value) {
								$selected = true;
							}
						}
					} else {
						if (esc_attr(stripcslashes($selected_value)) == esc_attr(($value))) {
							$selected = true;
						}
					}

					$data_url = isset($element['url'][$_default_value_counter]) ? $element['url'][$_default_value_counter] : "";

					$display['options'] .= '<option ' .
						selected($selected, true, 0) .
						' value="' . esc_attr($value) . '"' .
						(!empty($data_url) ? ' data-url="' . esc_attr($data_url) . '"' : '') .
						' data-imagep="' . (isset($element['imagesp'][$_default_value_counter]) ? $element['imagesp'][$_default_value_counter] : "") . '"' .
						' data-price="' . (isset($element['rules_filtered'][$value][0]) ? $element['rules_filtered'][$value][0] : 0) . '"' .
						' data-rules="' . (isset($element['rules_filtered'][$value]) ? esc_html(json_encode(($element['rules_filtered'][$value]))) : '') . '"' .
						' data-rulestype="' . (isset($element['rules_type'][$value]) ? esc_html(json_encode(($element['rules_type'][$value]))) : '') . '">' .
						wptexturize(apply_filters('woocommerce_tm_epo_option_name', $label)) . '</option>';

					$_default_value_counter++;
				}
			}
			$j++;
		}
		return $display;
	}

	public function validate() {

		$passed = true;
									
		foreach ( $this->field_names as $attribute ) {
			if ( !isset( $this->epo_post_fields[$attribute] ) ||  $this->epo_post_fields[$attribute]=="" ) {
				$passed = false;
				break;
			}										
		}

		return $passed;
	}
	
}