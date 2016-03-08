<?php
// Direct access security
if (!defined('TM_EPO_PLUGIN_SECURITY')){
	die();
}

/**
 * HTML creation class.
 */
final class TM_EPO_HELPER_base {

	protected static $_instance = null;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	function __construct( $args = array() ) {		
	}

	/**
	 * Filters an $input array by key.
	 */
	public function array_filter_key( $input ,$what="tmcp_",$where="start") {
		if ( !is_array( $input ) || empty( $input ) ) {
			return array();
		}

		$filtered_result=array();

		if ($where=="end"){
			$what=strrev($what);
		}

		foreach ( $input as $key => $value ) {
			$k=$key;
			if ($where=="end"){
				$k=strrev($key);
			}
			if ( strpos( $k, $what ) === 0 ) {
				$filtered_result[$key] = $value;
			}
		}

		return $filtered_result;
	}

	public function array_map_deep($array, $array2, $callback){
	    $new = array();
	    if( is_array($array) && is_array($array2)){
	    	foreach ($array as $key => $val) {
		        if (is_array($val) && is_array($array2[$key])) {
		            $new[$key] = $this->array_map_deep($val, $array2[$key], $callback);
		        } else {
		            $new[$key] = call_user_func($callback, $val, $array2[$key]);
		        }
		    }
	    }else{
	    	$new = call_user_func($callback, $array, $array2);
	    }
	    return $new;

	}

	/* Post URLs to IDs function, supports custom post types - borrowed and modified from url_to_postid() in wp-includes/rewrite.php */
	public function get_url_to_postid($url){
		global $wp_rewrite;

		$url = apply_filters('tm_url_to_postid', $url);

		// First, check to see if there is a 'p=N' or 'page_id=N' to match against
		if ( preg_match('#[?&](p|page_id|attachment_id)=(\d+)#', $url, $values) )	{
			$id = absint($values[2]);
			if ( $id )
				return $id;
		}

		// Check to see if we are using rewrite rules
		$rewrite = $wp_rewrite->wp_rewrite_rules();

		// Not using rewrite rules, and 'p=N' and 'page_id=N' methods failed, so we're out of options
		if ( empty($rewrite) )
			return 0;

		// Get rid of the #anchor
		$url_split = explode('#', $url);
		$url = $url_split[0];

		// Get rid of URL ?query=string
		$url_split = explode('?', $url);
		$url = $url_split[0];

		// Add 'www.' if it is absent and should be there
		if ( false !== strpos(home_url(), '://www.') && false === strpos($url, '://www.') )
			$url = str_replace('://', '://www.', $url);

		// Strip 'www.' if it is present and shouldn't be
		if ( false === strpos(home_url(), '://www.') )
			$url = str_replace('://www.', '://', $url);

		// Strip 'index.php/' if we're not using path info permalinks
		if ( !$wp_rewrite->using_index_permalinks() )
			$url = str_replace('index.php/', '', $url);

		if ( false !== strpos($url, home_url()) ) {
			// Chop off http://domain.com
			$url = str_replace(home_url(), '', $url);
		} else {
			// Chop off /path/to/blog
			$home_path = parse_url(home_url());
			$home_path = isset( $home_path['path'] ) ? $home_path['path'] : '' ;
			$url = str_replace($home_path, '', $url);
		}

		// Trim leading and lagging slashes
		$url = trim($url, '/');

		$request = $url;
		// Look for matches.
		$request_match = $request;
		foreach ( (array)$rewrite as $match => $query) {
			// If the requesting file is the anchor of the match, prepend it
			// to the path info.
			if ( !empty($url) && ($url != $request) && (strpos($match, $url) === 0) )
				$request_match = $url . '/' . $request;

			if ( preg_match("!^$match!", $request_match, $matches) ) {
				// Got a match.
				// Trim the query of everything up to the '?'.
				$query = preg_replace("!^.+\?!", '', $query);

				// Substitute the substring matches into the query.
				$query = addslashes(WP_MatchesMapRegex::apply($query, $matches));

				// Filter out non-public query vars
				global $wp;
				parse_str($query, $query_vars);
				$query = array();
				foreach ( (array) $query_vars as $key => $value ) {
					if ( in_array($key, $wp->public_query_vars) )
						$query[$key] = $value;
				}

			// Taken from class-wp.php
			foreach ( $GLOBALS['wp_post_types'] as $post_type => $t )
				if ( $t->query_var )
					$post_type_query_vars[$t->query_var] = $post_type;

			foreach ( $wp->public_query_vars as $wpvar ) {
				if ( isset( $wp->extra_query_vars[$wpvar] ) )
					$query[$wpvar] = $wp->extra_query_vars[$wpvar];
				elseif ( isset( $_POST[$wpvar] ) )
					$query[$wpvar] = $_POST[$wpvar];
				elseif ( isset( $_GET[$wpvar] ) )
					$query[$wpvar] = $_GET[$wpvar];
				elseif ( isset( $query_vars[$wpvar] ) )
					$query[$wpvar] = $query_vars[$wpvar];

				if ( !empty( $query[$wpvar] ) ) {
					if ( ! is_array( $query[$wpvar] ) ) {
						$query[$wpvar] = (string) $query[$wpvar];
					} else {
						foreach ( $query[$wpvar] as $vkey => $v ) {
							if ( !is_object( $v ) ) {
								$query[$wpvar][$vkey] = (string) $v;
							}
						}
					}

					if ( isset($post_type_query_vars[$wpvar] ) ) {
						$query['post_type'] = $post_type_query_vars[$wpvar];
						$query['name'] = $query[$wpvar];
					}
				}
			}

				// Do the query
				$query = new WP_Query($query);
				if ( !empty($query->posts) && $query->is_singular )
					return $query->post->ID;
				else
					return 0;
			}
		}
		return 0;
	}

	public function new_meta(){
		global $wp_version;
		return version_compare( $wp_version, '4.0.1', '>' );
	}

	public function build_meta_query($relation='OR',$meta_key='',$meta_value='', $compare='!=', $exists='NOT EXISTS'){
		$meta_array=array(
					'relation' => $relation,
					array(
						'key' => $meta_key, // get only enabled global extra options
						'value' => $meta_value,
						'compare' => $compare
					),
					array(
						'key' => $meta_key,// backwards compatibility
						'value' => $meta_value,
						'compare' => $exists
					)
					);
		if($this->new_meta()){
			$meta_array=array(
					'relation' => $relation,
					array(
						'key' => $meta_key, // get only enabled global extra options
						'value' => $meta_value,
						'compare' => $compare
					),
					array(
						'key' => $meta_key,// backwards compatibility
						'compare' => $exists
					)
					);

		}
		return $meta_array;
	}

	public function tm_temp_uniqid($s){
		$a=array();
		for ( $m = 0; $m < $s; $m++ ) {
			$a[]=uniqid('', true);
		}
		return $a;
	}

	public function encodeURIComponent($str) {
	    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
	    return strtr(rawurlencode($str), $revert);
	}

	public function reverse_strrchr($haystack, $needle, $trail=0) {
	    return strrpos($haystack, $needle) ? substr($haystack, 0, strrpos($haystack, $needle) + $trail) : false;
	}
	
	private function _count_posts_cache_key( $type = 'post', $perm = '' ) {
		$cache_key = 'tm-posts-' . $type;
		if ( 'readable' == $perm && is_user_logged_in() ) {
			$post_type_object = get_post_type_object( $type );
			if ( $post_type_object && ! current_user_can( $post_type_object->cap->read_private_posts ) ) {
				$cache_key .= '_' . $perm . '_' . get_current_user_id();
			}
		}
		return $cache_key;
	}
	
	public function wp_count_posts( $type = 'post', $perm = '' ) {
		global $wpdb;

		if ( ! post_type_exists( $type ) )
			return new stdClass;

		$cache_key = $this->_count_posts_cache_key( $type, $perm );

		// WPML
		$_lang=TM_EPO_WPML()->get_lang();
		if( TM_EPO_WPML()->is_active() && TM_EPO_WPML()->get_lang()!='all' && $_lang==TM_EPO_WPML()->get_default_lang() ){
			$query = "SELECT p.post_status, COUNT( DISTINCT ID ) AS num_posts FROM {$wpdb->posts} p";
		}else{
			$query = "SELECT p.post_status, COUNT( * ) AS num_posts FROM {$wpdb->posts} p";	
		}
		// WPML
		if( TM_EPO_WPML()->is_active() && TM_EPO_WPML()->get_lang()!='all' ){
			if ($_lang==TM_EPO_WPML()->get_default_lang()){
				$query 	.= 	" LEFT JOIN {$wpdb->postmeta} ON (p.ID = {$wpdb->postmeta}.post_id)"
						.	" LEFT JOIN {$wpdb->postmeta} AS mt1 ON (p.ID = mt1.post_id AND mt1.meta_key = '".TM_EPO_WPML_LANG_META."')";
			}else{
				$query .= " JOIN  {$wpdb->postmeta} pm";
			}
		}
		// WPML
		if( TM_EPO_WPML()->is_active() && TM_EPO_WPML()->get_lang()!='all' && $_lang==TM_EPO_WPML()->get_default_lang() ){
			$query .= " WHERE 1=1 AND p.post_type = %s";
		}else{
			$query .= " WHERE p.post_type = %s";	
		}
		
		if ( 'readable' == $perm && is_user_logged_in() ) {
			$post_type_object = get_post_type_object($type);
			if ( ! current_user_can( $post_type_object->cap->read_private_posts ) ) {
				$query .= $wpdb->prepare( " AND (p.post_status != 'private' OR ( p.post_author = %d AND p.post_status = 'private' ))",
					get_current_user_id()
				);
			}
		}

		// WPML
		if( TM_EPO_WPML()->is_active() && TM_EPO_WPML()->get_lang()!='all' ){			
			if ($_lang==TM_EPO_WPML()->get_default_lang()){
				$query .= " AND ( ( ".$wpdb->prefix."postmeta.meta_key = '".TM_EPO_WPML_LANG_META."' AND CAST(".$wpdb->prefix."postmeta.meta_value AS CHAR) = '".TM_EPO_WPML()->get_lang()."' ) OR mt1.post_id IS NULL ) ";
			}else{
				$query .= " AND pm.meta_key = '".TM_EPO_WPML_LANG_META."' AND pm.meta_value = '".TM_EPO_WPML()->get_lang()."'";
			}
		}

		$query .= ' GROUP BY p.post_status';

		$counts = wp_cache_get( $cache_key, 'counts' );
		if ( false === $counts ) {
			$results = (array) $wpdb->get_results( $wpdb->prepare( $query, $type ), ARRAY_A );
			$counts = array_fill_keys( get_post_stati(), 0 );

			foreach ( $results as $row )
				$counts[ $row['post_status'] ] = $row['num_posts'];

			$counts = (object) $counts;
			wp_cache_set( $cache_key, $counts, 'counts' );
		}

		return apply_filters( 'wp_count_posts', $counts, $type, $perm );
	}

	public function wc_base_currency(){
		$from_currency = get_option('woocommerce_currency');
		return $from_currency;
	}

	public function get_currencies(){
		$enabled_currencies = apply_filters('wc_aelia_cs_enabled_currencies', array($this->wc_base_currency()));
		if (class_exists('WOOCS')){
			global $WOOCS;
			$currencies=$WOOCS->get_currencies();
			if ($currencies && is_array($currencies)){
				$enabled_currencies=array();
				foreach ($currencies as $key => $value) {
					$enabled_currencies[]=$value['name'];
				}
			}
		}
		return $enabled_currencies;
	}

	public function wc_aelia_cs_enabled_currencies(){
		$enabled_currencies = $this->get_currencies();
		$from_currency = $this->wc_base_currency();
		foreach ($enabled_currencies as $key => $value) {
			if($value==$from_currency){
				unset($enabled_currencies[$key]);
				break;
			}
		}
		return $enabled_currencies;
	}

	public function wc_aelia_num_enabled_currencies(){
		$enabled_currencies = $this->wc_aelia_cs_enabled_currencies();
		if (is_array($enabled_currencies)){
			return count($enabled_currencies);
		}
		return 0;
	}

	public function get_currency_price_prefix($currency=NULL){
		if ($currency==NULL){
			if ($this->wc_aelia_num_enabled_currencies()>0){
				$to_currency = get_woocommerce_currency();
				return "_".$to_currency;
			}else{
				return "";
			}			
		}else{
			return (empty($currency)||$currency==$this->wc_base_currency())?"":"_".$currency; 
		}
	}


}


?>