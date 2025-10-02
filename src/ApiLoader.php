<?php
/**
 * Plugin main loader class
 *
 * @package SushmaAPI
 */

namespace SushmaAPI;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'ApiLoader' ) ) {
	/**
	 * Class ApiLoader
	 *
	 * Main plugin loader class.
	 */
	class ApiLoader {

		/**
		 * Instance variable.
		 *
		 * @var instance
		 */
		private static $instance = null;

		/**
		 * Get instance.
		 */
		public static function instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Initialize plugin
		 */
		public static function init() {
			$instance = self::instance();
			$instance->hooks();
		}

		/**
		 * Register hooks
		 */
		private function hooks() {
			// Admin page.
			AdminPage::init();

			// REST API.
			RestController::init();

			// Gutenberg block.
			Block\RegisterBlock::init();

			// WP-CLI commands.
			CLI\ForceRefreshCommand::init();

			// Text domain.
			add_action( 'init', array( $this, 'load_textdomain' ) );
		}

		/**
		 * Load plugin text domain
		 */
		public function load_textdomain() {
			load_plugin_textdomain(
				'sushma-api',
				false,
				dirname( plugin_basename( SUSHMA_API_PLUGIN_FILE ) ) . '/languages'
			);
		}
	}
}
