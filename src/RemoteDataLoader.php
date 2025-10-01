<?php
/**
 * Remote Data Manager
 *
 * @package SushmaAPI
 */

namespace SushmaAPI;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_Error;

/**
 * Class RemoteDataLoader
 */
class RemoteDataLoader {

	// Constants
	const API_URL 				= 'https://miusage.com/v1/challenge/1/';
	const TRANSIENT_KEY 		= 'sushma_api_data';
	const FORCE_REFRESH_OPTION 	= 'sushma_api_force_refresh';


	/**
	 * Get data from transient
	 */
	public function get_data() {
		$force_refresh = get_option( self::FORCE_REFRESH_OPTION, false );

		if ( $force_refresh ) {
			delete_option( self::FORCE_REFRESH_OPTION );
			delete_transient( self::TRANSIENT_KEY );
		}

		$api_data = get_transient( self::TRANSIENT_KEY );

		if ( false === $api_data ) {
			$api_data = $this->get_remote_data();

			if ( ! is_wp_error( $api_data ) ) {
				set_transient( self::TRANSIENT_KEY, $api_data, HOUR_IN_SECONDS );
			}
		}

		return $api_data;
	}

	/**
	 * Fetch data from remote API
	 *
	 * @return mixed|WP_Error Data array or WP_Error on failure.
	 */
	public function get_remote_data() {

		$response = wp_remote_get(
			self::API_URL,
			[
				'timeout'  => 15,
				'headers' => [
					'Accept'  => 'application/json',
				],
			]
		);


		if ( is_wp_error( $response ) ) {
			return new WP_Error(
				'fetch_error',
				sprintf( __( 'Failed to fetch data: %s', 'sushma-api' ), $response->get_error_message() )
			);
		}

		$response_code = wp_remote_retrieve_response_code( $response );

		if ( 200 !== $response_code ) {
			return new WP_Error(
				'api_error',
				sprintf( __( 'API error! Error code: %d', 'sushma-api' ), $response_code )
			);
		}

		
		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error(
				'json_error',
				__( 'Failed to parse received API response.', 'sushma-api' )
			);
		}

		// Sanitize data.
		$data = $this->sanitize_data( $data );

		return $data;
	}



	/**
	 * Set force refresh option
	 */
	public function force_refresh_function() {

		update_option( self::FORCE_REFRESH_OPTION, true, false );

	}

	public function clear_cache() {
		delete_transient( self::TRANSIENT_KEY );
	}

	/**
	 * Sanitize data recursively
	 *
	 * @param mixed $data Data to sanitize.
	 * @return mixed Sanitized data.
	 */
	private function sanitize_data( $data ) {

		if ( is_array( $data ) ) {
			return array_map( [$this, 'sanitize_data'], $data );
		}

		if ( is_string( $data ) ) {
			return sanitize_text_field( $data );
		}
		return $data;

	}

	/**
	 * Get transient expiration time
	 *
	 * @return int|false Timestamp when transient expires, or false if no transient.
	 */
	public function get_transient_data() {

		$transient_timeout = get_option( '_transient_timeout_' . self::TRANSIENT_KEY );

		if( $transient_timeout ) {
			return (int) $transient_timeout;
		}

		return false;
	}

	/**
	 * Check if transient exists
	 *
	 * @return bool
	 */
	public function has_cache() {
		return false !== get_transient( self::TRANSIENT_KEY );
	}
}

