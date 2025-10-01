/**
 * Admin page script
 */

(function($) {
	'use strict';

	const SushmaAPIAdmin = {
		init: function() {
			this.bindEvents();
		},

		bindEvents: function() {

			$(document).on('click', '#sushma-api-refresh-button', this.handleRefresh.bind(this));

		},

		// Handle refresh button
		handleRefresh: function(e) {
			e.preventDefault();

			const $button = $(e.currentTarget);
			const $cardBody = $( '.sushma-api-card-body' );
			const originalHTML = $button.html();

			// Disable button
			$button.prop( 'disabled', true ).addClass( 'loading' );
			$button.html( '<span class="dashicons dashicons-update"></span> ' + sushmaApiAdmin.strings.refreshing);
			$cardBody.addClass( 'sushma-api-loading' );

			// AJAX request
			$.ajax({
				url: sushmaApiAdmin.ajax_url,
				type: 'POST',
				data: {
					action: 'sushma_api_refresh_data',
					nonce: sushmaApiAdmin.nonce
				},
				success: function(response) {
					if (response.success) {
						$cardBody.html(response.data.html);

						// Show success for 1.5s
						$button.html( '<span class="dashicons dashicons-yes"></span> Refreshed' );

						setTimeout(function() {
							$button.html( originalHTML );
						}, 1500);
					} else {
						$button.html( '<span class="dashicons dashicons-no"></span> Try Again' );
						setTimeout(function() {
							$button.html( originalHTML );
						}, 1500);
					}
				},
				error: function() {
					$button.html( '<span class="dashicons dashicons-no"></span> Try Again' );
					setTimeout(function() {
						$button.html( originalHTML);
					}, 1500);
				},
				complete: function() {
					$button.prop( 'disabled', false ).removeClass( 'loading' );
					$cardBody.removeClass( 'sushma-api-loading' );
				}
			});
		}
	};

	// Init on ready
	$( document ).ready( function() {
		SushmaAPIAdmin.init();
	});

})(jQuery);
