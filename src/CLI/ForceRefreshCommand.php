<?php
/**
 * WP-CLI Command for Force Refresh
 *
 * @package SushmaAPI
 */

namespace SushmaAPI\CLI;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use SushmaAPI\RemoteDataLoader;
use WP_CLI;

/**
 * Class ForceRefreshCommand
 */
class ForceRefreshCommand {

	/**
	 * Initialize CLI commands
	 */
	public static function init() {
		if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
			return;
		}

		WP_CLI::add_command( 'sushma-api force-refresh', [ __CLASS__, 'force_refresh' ] );
	}

	// Force refresh cached data
	// wp sushma-api force-refresh
	public static function force_refresh( $args, $assoc_args ) {
		WP_CLI::log( __( 'Setting force refresh...', 'sushma-api' ) );

		$data_manager = new RemoteDataLoader();
		$data_manager->force_refresh_function();
		$data = $data_manager->get_data();

		if ( is_wp_error( $data ) ) {
			WP_CLI::error( __( 'Error fetching data: ' . $data->get_error_message(), 'sushma-api' ) );
		}

		WP_CLI::success( __( 'Fresh data fetched successfully..!', 'sushma-api' ) );
	}
}
