<?php
/**
 * PLugin Setting Page
 *
 * @package SushmaAPI
 */

namespace SushmaAPI;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class AdminPage
 */
class AdminPage {

	const SLUG = 'sushma-api';

	/**
	 * Initialize the admin page
	 */
	public static function init() {
		$instance = new self();
		$instance->hooks();
	}


	/**
	 * Register admin hooks
	 */
	private function hooks() {
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'wp_ajax_sushma_api_refresh_data', array( $this, 'refresh_data' ) );
	}

	/**
	 * Add a new menu page for the plugin
	 */
	public function register_admin_menu() {
		add_menu_page(
			__( 'Sushma API', 'sushma-api' ),
			__( 'Sushma API', 'sushma-api' ),
			'manage_options',
			self::SLUG,
			array( $this, 'display_setting_page' ),
			'dashicons-cloud',
			100
		);
	}


	/**
	 * Register styles.
	 *
	 * @param string $page_name Page name.
	 */
	public function enqueue_assets( $page_name ) {
		if ( 'toplevel_page_' . self::SLUG !== $page_name ) {
			return;
		}

		wp_enqueue_style(
			'sushma-api-admin',
			SUSHMA_API_PLUGIN_URL . 'assets/css/admin.css',
			array(),
			SUSHMA_API_VERSION
		);
		wp_enqueue_script(
			'sushma-api-admin',
			SUSHMA_API_PLUGIN_URL . 'assets/js/admin.js',
			array( 'jquery' ),
			SUSHMA_API_VERSION,
			true
		);
		wp_localize_script(
			'sushma-api-admin',
			'sushmaApiAdmin',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'sushma_api_refresh' ),
				'strings'  => array(
					'refreshing' => __( 'Loading...', 'sushma-api' ),
					'refresh'    => __( 'Refresh', 'sushma-api' ),
				),
			)
		);
	}

	/**
	 * Display the admin page
	 */
	public function display_setting_page() {
		// Check user capabilities.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'sushma-api' ) );
		}

		$data_manager = new RemoteDataLoader();
		$data         = $data_manager->get_data();
		$title        = '';

		if ( ! is_wp_error( $data ) && isset( $data['title'] ) ) {
			$title = $data['title'];
		} ?>
		<div id="sushma-api-page" class="wrap sushma-api-wrap">
			<!-- Header -->
			<div class="sushma-api-header">
				<div class="sushma-api-logo">
					<svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="40" height="40" rx="8" fill="#e27730"/>
						<path d="M20 10L30 16V24L20 30L10 24V16L20 10Z" stroke="white" stroke-width="2" fill="none"/>
						<circle cx="20" cy="20" r="4" fill="white"/>
					</svg>
				</div>
				<h1 class="sushma-api-header-title">
					<?php echo esc_html( get_admin_page_title() ); ?>
				</h1>
			</div>
			<div class="sushma-api-page-title">
				<h2 class="sushma-api-page-heading">
					<?php echo esc_html( $title ? $title : __( 'API Data Table', 'sushma-api' ) ); ?>
				</h2>
				<button type="button" id="sushma-api-refresh-button" class="sushma-api-button sushma-api-button-primary">

					<span class="dashicons dashicons-update"></span>
					<?php esc_html_e( 'Refresh', 'sushma-api' ); ?>

				</button>
			</div>
			<div class="sushma-api-content-wrap">
				<div class="sushma-api-card">
					<div class="sushma-api-card-body">

						<?php $this->load_table( $data ); ?>

					</div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Retrieve table data
	 *
	 * @param mixed $data The data to display.
	 */
	private function load_table( $data ) {
		if ( is_wp_error( $data ) ) {

			?>
			<div class="notice notice-error inline">
				<p><?php echo esc_html( $data->get_error_message() ); ?></p>
			</div>
			<?php
			return;
		}

		if ( empty( $data ) || ! isset( $data['data'] ) ) {
			?>
			<div class="notice notice-warning inline">
				<p><?php esc_html_e( 'No data available.', 'sushma-api' ); ?></p>
			</div>
			<?php
			return;
		}

		$table_data = $data['data'];
		$headers    = isset( $table_data['headers'] ) ? $table_data['headers'] : array();
		$rows       = isset( $table_data['rows'] ) ? $table_data['rows'] : array();

		// Object to array conversion.
		if ( ! is_array( $rows ) || ! isset( $rows[0] ) ) {

			$rows = array_values( (array) $rows );

		}
		if ( empty( $headers ) || empty( $rows ) ) {
			?>
			<div class="notice notice-warning inline">
				<p><?php esc_html_e( 'No data available.', 'sushma-api' ); ?></p>
			</div>
			<?php
			return; }

		?>
		<div class="sushma-api-table-wrapper">
			<table class="wp-list-table widefat fixed striped sushma-api-table">
				<thead>
					<tr>
						<?php foreach ( $headers as $header ) : ?>
							<th scope="col" class="sushma-api-table-header">
							<?php echo esc_html( $header ); ?>
							</th>
						<?php endforeach; ?>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $rows as $row ) : ?>
						<tr>
							<td class="sushma-api-table-id">
								<?php echo array_key_exists( 'id', $row ) ? esc_html( $row['id'] ) : ''; ?>
							</td>
							<td class="sushma-api-table-fname">
								<?php echo array_key_exists( 'fname', $row ) ? esc_html( $row['fname'] ) : ''; ?>
							</td>
							<td class="sushma-api-table-lname">
								<?php echo array_key_exists( 'lname', $row ) ? esc_html( $row['lname'] ) : ''; ?>
							</td>
							<td class="sushma-api-table-email">
								<?php echo array_key_exists( 'email', $row ) ? esc_html( $row['email'] ) : ''; ?>
							</td>
							<td class="sushma-api-table-date">
							<?php
							if ( array_key_exists( 'date', $row ) ) {
								echo esc_html( date_i18n( get_option( 'date_format' ), $row['date'] ) );
							}
							?>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		<?php
	}

	/**
	 * AJAX function
	 */
	public function refresh_data() {
		// Verify nonce.
		check_ajax_referer( 'sushma_api_refresh', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'sushma-api' ) ) );
		}

		$data_manager = new RemoteDataLoader();
		$data_manager->force_refresh_function();
		$data = $data_manager->get_data();
		if ( is_wp_error( $data ) ) {
			wp_send_json_error( array( 'message' => $data->get_error_message() ) );
		}

		ob_start();

		$this->load_table( $data );

		$html = ob_get_clean();

		wp_send_json_success(
			array(
				'html'    => $html,
				'message' => __( 'Data refreshed successfully.', 'sushma-api' ),
			)
		);
	}
}