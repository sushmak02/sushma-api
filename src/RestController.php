<?php
/**
 * REST API Controller
 *
 * @package SushmaAPI
 */

namespace SushmaAPI;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * Class RestController
 */
class RestController {

	/**
	 * Initialize the REST controller.
	 */
	public static function init() {
		$instance = new self();
		$instance->hooks();
	}

	/**
	 * Register hooks.
	 */
	private function hooks() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST route.
	 */
	public function register_routes() {

		register_rest_route(
			'sushma-api/v1',
			'/data',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_data' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get data endpoint callback
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function get_data( WP_REST_Request $request ) {

		$data_manager = new RemoteDataLoader();
		$data = $data_manager->get_data();

		if ( is_wp_error( $data ) ) {

			return new WP_Error(
				'data_fetch_error',
				$data->get_error_message(),
				array( 'status' => 500 )
			);

		}

		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => $data,
			),
			200
		);
	}
}
