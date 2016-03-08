<?php
class TM_EPO_FIELDS_date extends TM_EPO_FIELDS {

	public function display_field( $element=array(), $args=array() ) {
			$tm_epo_global_datepicker_theme 	= !empty(TM_EPO()->tm_epo_global_datepicker_theme)?TM_EPO()->tm_epo_global_datepicker_theme:(isset( $element['theme'] )?$element['theme']:"epo");
			$tm_epo_global_datepicker_size 		= !empty(TM_EPO()->tm_epo_global_datepicker_size)?TM_EPO()->tm_epo_global_datepicker_size:(isset( $element['theme_size'] )?$element['theme_size']:"medium");
			$tm_epo_global_datepicker_position 	= !empty(TM_EPO()->tm_epo_global_datepicker_position)?TM_EPO()->tm_epo_global_datepicker_position:(isset( $element['theme_position'] )?$element['theme_position']:"normal");

		return array(
				'textbeforeprice' 		=> isset( $element['text_before_price'] )?$element['text_before_price']:"",
				'textafterprice' 		=> isset( $element['text_after_price'] )?$element['text_after_price']:"",
				'hide_amount'  			=> isset( $element['hide_amount'] )?" ".$element['hide_amount']:"",
				'style' 				=> isset( $element['button_type'] )?$element['button_type']:"",
				'format' 				=> !empty( $element['format'] )?$element['format']:0,
				'start_year' 			=> !empty( $element['start_year'] )?$element['start_year']:"1900",
				'end_year' 				=> !empty( $element['end_year'] )?$element['end_year']:(date("Y")+10),
				'min_date' 				=> isset( $element['min_date'] )?$element['min_date']:"",
				'max_date' 				=> isset( $element['max_date'] )?$element['max_date']:"",
				'disabled_dates' 		=> !empty( $element['disabled_dates'] )?$element['disabled_dates']:"",
				'enabled_only_dates' 	=> !empty( $element['enabled_only_dates'] )?$element['enabled_only_dates']:"",
				'disabled_weekdays' 	=> isset( $element['disabled_weekdays'] )?$element['disabled_weekdays']:"",
				'tranlation_day' 		=> !empty( $element['tranlation_day'] )?$element['tranlation_day']:"",
				'tranlation_month' 		=> !empty( $element['tranlation_month'] )?$element['tranlation_month']:"",
				'tranlation_year' 		=> !empty( $element['tranlation_year'] )?$element['tranlation_year']:"",
				'quantity' 				=> isset( $element['quantity'] )?$element['quantity']:"",
				'date_theme' 			=> $tm_epo_global_datepicker_theme,
				'date_theme_size' 		=> $tm_epo_global_datepicker_size,
				'date_theme_position' 	=> $tm_epo_global_datepicker_position,
			);
	}

	public function validate() {

		$format = $this->element['format'];
		switch ($format){
		case "0":
			$date_format='d/m/Y H:i:s';
			$sep="/";
			break;
		case "1":
			$date_format='m/d/Y H:i:s';
			$sep="/";
			break;
		case "2":
			$date_format='d.m.Y H:i:s';
			$sep=".";
			break;
		case "3":
			$date_format='m.d.Y H:i:s';
			$sep=".";
			break;
		case "4":
			$date_format='d-m-Y H:i:s';
			$sep="-";
			break;
		case "5":
			$date_format='m-d-Y H:i:s';
			$sep="-";
			break;
		}

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
					
					break;
				}
			}

			if(!empty( $this->epo_post_fields[$attribute] ) && class_exists('DateTime')){
				$posted_date = $this->epo_post_fields[$attribute];

				$date = DateTime::createFromFormat($date_format, $posted_date.' 00:00:00');
				$date_errors = DateTime::getLastErrors();
				
				if (!empty($date_errors['error_count'])){
					$passed = false;
					$message[] = __( 'Invalid date entered!', TM_EPO_TRANSLATION );
					break;
				}
				
				$year = $_year = $date->format("Y");
				$month = $_month = $date->format("m");
				$day = $d_ay = $date->format("d");
				
				$posted_date_arr  = explode($sep, $posted_date);
				
				if (count($posted_date_arr) == 3) {
					switch ($format){
					case "0":
					case "2":
					case "4":
						$_year =$posted_date_arr[2];
						$_month = $posted_date_arr[1];
						$_day = $posted_date_arr[0];
						break;
					case "1":
					case "3":
					case "5":
						$_year =$posted_date_arr[2];
						$_month = $posted_date_arr[0];
						$_day = $posted_date_arr[1];
						break;
					}
					
					if($year!=$_year || $month!=$_month || $day!=$_day){
						$message[] = __( 'Invalid data submitted!', TM_EPO_TRANSLATION );
						$passed = false;
				        break;
					}
				}

				if (checkdate($_month,$_day,$_year) ){
				    // valid date ...
					$start_year = intval($this->element['start_year'])||1900;
					$end_year = intval($this->element['end_year'])||(date("Y")+10);
					$min_date = ($this->element['min_date']!=='')?intval($this->element['min_date']):false;
					$max_date = ($this->element['max_date']!=='')?intval($this->element['max_date']):false;
					$disabled_dates = $this->element['disabled_dates'];
					$enabled_only_dates = $this->element['enabled_only_dates'];
					$disabled_weekdays = $this->element['disabled_weekdays'];

					$now = new DateTime('00:00:00');
					$now_day = $now->format("d");
					$now_month = $now->format("m");
					$now_year = $now->format("Y");

					if($enabled_only_dates){
						$enabled_only_dates = explode(",", $enabled_only_dates);
						$_pass=false;
						foreach ($enabled_only_dates as $key => $value) {
							$temp = DateTime::createFromFormat($date_format, $value.' 00:00:00');
							$interval = $temp->diff($date);
							$sign=floatval($interval->format('%d%m%Y'));
							if(empty($sign)){
								$_pass = true;
					       		break;
							}
						}
						$passed = $_pass;
						if (!$_pass){
							$message[] = __( 'Invalid date entered!', TM_EPO_TRANSLATION );
							break;
						}
					}else{
						// validate start,end year
						if($_year<$start_year || $_year>$end_year){
							$passed = false;
							$message[] = __( 'Invalid year date entered!', TM_EPO_TRANSLATION );
					       	break;	
						}

						// validate disabled dates
						if($disabled_dates){
							$disabled_dates = explode(",", $disabled_dates);
							foreach ($disabled_dates as $key => $value) {
								$temp = DateTime::createFromFormat($date_format, $value.' 00:00:00');
								$interval = $temp->diff($date);
								$sign=floatval($interval->format('%d%m%Y'));
								if(empty($sign)){
									$passed = false;
									$message[] = __( 'You cannot select that date!', TM_EPO_TRANSLATION );
					        		break;
								}
							}
							
						}

						//validate minimum date
						if ($min_date!==false){
							$temp=clone $now;
							if($min_date>0){
								$temp->add(new DateInterval('P'.abs($min_date).'D'));
							}elseif($min_date<0){
								$temp->sub(new DateInterval('P'.abs($min_date).'D'));
							}
								
							$interval = $temp->diff($date);
							$sign=$interval->format('%r');
							if(!empty($sign)){
								$passed = false;
								$message[] = __( 'You cannot select that date!', TM_EPO_TRANSLATION );
					       		break;
							}
						}

						//validate maximum date
						if ($max_date!==false){
							$temp=clone $now;
							if($max_date>0){
								$temp->add(new DateInterval('P'.abs($max_date).'D'));
							}elseif($max_date<0){
								$temp->sub(new DateInterval('P'.abs($max_date).'D'));
							}
							
							$interval = $date->diff($temp);
							$sign=$interval->format('%r');
							if(!empty($sign)){
								$passed = false;
								$message[] = __( 'You cannot select that date!', TM_EPO_TRANSLATION );
					       		break;
							}
						}							
					}

				} else {
					// problem with dates ...
					$passed = false;
					$message[] = __( 'Invalid date entered!', TM_EPO_TRANSLATION );
					break;
				}
			}
		}

		return array('passed'=>$passed,'message'=>$message);
	}
	
}