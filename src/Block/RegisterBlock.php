<?php
/**
 * Gutenberg Block Registration Class
 *
 * @package SushmaAPI
 */

namespace SushmaAPI\Block;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class RegisterBlock
 */
class RegisterBlock {

	/**
	 * Initialize block registration
	 */
	public static function init() {
		$instance = new self();
		$instance->hooks();
	}

	/**
	 * Register hooks
	 */
	private function hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Enqueue editor assets
	 */
	public function enqueue_editor_assets() {
		// Enqueue block styles in editor.
		wp_enqueue_style(
			'sushma-api-block-editor',
			SUSHMA_API_PLUGIN_URL . 'src/Block/style.css',
			array(),
			SUSHMA_API_VERSION
		);
	}

	/**
	 * Register Gutenberg block
	 */
	public function register_block() {
		register_block_type(
			SUSHMA_API_PLUGIN_DIR . 'build/Block',
			array(
				'render_callback' => array( $this, 'render_block' ),
			)
		);
	}

	/**
	 * Render the gutenberg block on frontend
	 *
	 * @param array $settings Block settings.
	 * @return string Block HTML.
	 */
	public function render_block( $settings ) {
		// Get column visibility settings.
		$show_id    = isset( $settings['showId'] ) ? $settings['showId'] : true;
		$show_fname = isset( $settings['showFname'] ) ? $settings['showFname'] : true;
		$show_lname = isset( $settings['showLname'] ) ? $settings['showLname'] : true;
		$show_email = isset( $settings['showEmail'] ) ? $settings['showEmail'] : true;
		$show_date  = isset( $settings['showDate'] ) ? $settings['showDate'] : true;

		// Fetch data.
		$data_manager = new \SushmaAPI\RemoteDataLoader();
		$data         = $data_manager->get_data();

		if ( is_wp_error( $data ) ) {
			return '<div class="sushma-api-block notice notice-error">' .
				'<p>' . esc_html( $data->get_error_message() ) . '</p>' .
				'</div>';
		}

		if ( empty( $data ) || ! isset( $data['data'] ) || ! isset( $data['data']['headers'] ) || ! isset( $data['data']['rows'] ) ) {
			return '<div class="sushma-api-block notice notice-warning">' .
				'<p>' . esc_html__( 'No data available.', 'sushma-api' ) . '</p>' .
				'</div>';
		}

		$headers = $data['data']['headers'];
		$rows    = $data['data']['rows'];
		if ( ! isset( $rows[0] ) || ! is_array( $rows ) ) {
			$rows = array_values( (array) $rows );
		}

		// Map columns.
		$columns = array(
			'id'    => array(
				'show' => $show_id,
				'label' => $headers[0] ?? 'ID',
				'key' => 'id',
			),
			'fname' => array(
				'show' => $show_fname,
				'label' => $headers[1] ?? 'First Name',
				'key' => 'fname',
			),
			'lname' => array(
				'show' => $show_lname,
				'label' => $headers[2] ?? 'Last Name',
				'key' => 'lname',
			),
			'email' => array(
				'show' => $show_email,
				'label' => $headers[3] ?? 'Email',
				'key' => 'email',
			),
			'date'  => array(
				'show' => $show_date,
				'label' => $headers[4] ?? 'Date',
				'key' => 'date',
			),
		);

		// Filter out visible columns.
		$visible_columns = array_filter(
			$columns,
			function ( $col ) {
				return $col['show'];
			}
		);

		if ( empty( $visible_columns ) ) {
			return '<div class="sushma-api-block notice notice-info">' .
				'<p>' . esc_html__( 'Please select at least one column to display.', 'sushma-api' ) . '</p>' .
				'</div>';
		}

		// Enqueue frontend styles.
		wp_enqueue_style(
			'sushma-api-block-frontend',
			SUSHMA_API_PLUGIN_URL . 'src/Block/style.css',
			array(),
			SUSHMA_API_VERSION
		);

		// Output table HTML.
		ob_start();
		?>
		<div class="sushma-api-block">
			<div class="sushma-api-table-wrapper">
				<table class="wp-list-table widefat fixed striped sushma-api-table">
					<thead>
						<tr>
							<?php foreach ( $visible_columns as $col ) : ?>
								<th class="sushma-api-table-header sushma-api-table-<?php echo esc_attr( $col['key'] ); ?>">
									<?php echo esc_html( $col['label'] ); ?>
								</th>
							<?php endforeach; ?>
						</tr>
					</thead>
					<tbody>
						<?php foreach ( $rows as $row ) : ?>
							<tr>
								<?php foreach ( $visible_columns as $col ) : ?>
									<td class="sushma-api-table-<?php echo esc_attr( $col['key'] ); ?>" data-label="<?php echo esc_attr( $col['label'] ); ?>">
										<?php
										if ( 'date' === $col['key'] && array_key_exists( $col['key'], $row ) ) {
											echo esc_html( date_i18n( get_option( 'date_format' ), $row[ $col['key'] ] ) );
										} else {
											echo array_key_exists( $col['key'], $row ) ? esc_html( $row[ $col['key'] ] ) : '';
										}
										?>
									</td>
								<?php endforeach; ?>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}