<?php
/**
 * Plugin Name: Sushma API
 * Description: A WordPress plugin to fetch data from remote API and display it through Gutenberg block.
 * Version: 1.0.0
 * Author: Sushma Kure
 * Text Domain: sushma-api
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * @package SushmaAPI
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'SUSHMA_API_VERSION', '1.0.0' );
define( 'SUSHMA_API_PLUGIN_FILE', __FILE__ );
define( 'SUSHMA_API_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'SUSHMA_API_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load composer autoloader.
if ( file_exists( SUSHMA_API_PLUGIN_DIR . 'vendor/autoload.php' ) ) {
	require_once SUSHMA_API_PLUGIN_DIR . 'vendor/autoload.php';
}

// Initialize plugin.
add_action(
	'plugins_loaded',
	function () {
		if ( class_exists( 'SushmaAPI\\ApiLoader' ) ) {
			SushmaAPI\ApiLoader::init();
		}
	}
);
