/**
 * Import WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Spinner, Notice } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Register the gutenberg block
 */
registerBlockType('sushma/api-data', {

	attributes: {
		showId: {
			type: 'boolean',
			default: true,
		},
		showFname: {
			type: 'boolean',
			default: true,
		},
		showLname: {
			type: 'boolean',
			default: true,
		},
		showEmail: {
			type: 'boolean',
			default: true,
		},
		showDate: {
			type: 'boolean',
			default: true,
		},
	},


	edit: function Edit({ attributes, setAttributes }) {

		const { showId, showFname, showLname, showEmail, showDate } = attributes;
		const [ data, setData ] = useState(null);
		const [ loading, setLoading ] = useState(true);
		const [ error, setError ] = useState(null);

		const blockProps = useBlockProps();

		// Fetch data from REST API endpoint.
		useEffect(() => {
			fetch( '/wp-json/sushma-api/v1/data' )
				.then(response => {
					if (!response.ok) {
						throw new Error(__('Failed to fetch data', 'sushma-api'));
					}
					return response.json();
				})
				.then(result => {
					if ( result.success && result.data ) {

						// console.log( "success", result.data );
						setData( result.data );
						setError( null );

					} else {

						throw new Error( __('Invalid data format', 'sushma-api') );

					}
				})
				.catch(err => {
					console.error( 'API Error:', err );
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		}, []);

		// Render data table
		const renderTable = () => {
			if ( loading ) {
				return (
					<div style={{ textAlign: 'center', padding: '40px' }}>
						<Spinner />
						<p>{ __('Loading data...', 'sushma-api') }</p>
					</div>
				);
			}

			if ( error ) {
				return (
					<Notice status="error" isDismissible={false}>
						{error}
					</Notice>
				);
			}

			// Checking data structure, handle both nested and normal data.
			let headers, rows;

			if ( data.data && data.data.headers && data.data.rows ) {

				headers = data.data.headers;
				rows = data.data.rows;

			} else if ( data.headers && data.rows ) {

				headers = data.headers;
				rows = data.rows;

			} else {

				return (
					<Notice status="warning" isDismissible={false}>
						{ __('No data available', 'sushma-api' )}
					</Notice>
				);

			}

			// Convert rows object to array if needed.
			if ( ! Array.isArray( rows ) ) {

				if ( 'object' === typeof rows  && null !== rows ) {

					rows = Object.values(rows);

				} else {

					return (
						<Notice status="warning" isDismissible={false}>
							{ __('Invalid data format', 'sushma-api') }
						</Notice>
					);
				}
			}

			const columnMap = {
				showId: { key: 'id', label: headers[0] || 'ID' },
				showFname: { key: 'fname', label: headers[1] || 'First Name' },
				showLname: { key: 'lname', label: headers[2] || 'Last Name' },
				showEmail: { key: 'email', label: headers[3] || 'Email' },
				showDate: { key: 'date', label: headers[4] || 'Date' },
			};

			const visibleColumns = Object.entries( columnMap ).filter(
				([attrKey]) => attributes[attrKey]
			);

			if ( 0 === visibleColumns.length ) {
				return (
					<Notice status="info" isDismissible={false}>
						{ __('Please select at least one column to display', 'sushma-api') }
					</Notice>
				);
			}


			return (
				<div className="sushma-api-table-wrapper">
					<table className="wp-list-table widefat fixed striped sushma-api-table">
						<thead>
							<tr>
								{visibleColumns.map(([attrKey, col]) => (
									<th key={col.key} className={`sushma-api-table-header sushma-api-table-${col.key}`}>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((row, index) => (
								<tr key={index}>
									{visibleColumns.map(([attrKey, col]) => (
										<td key={col.key} className={`sushma-api-table-${col.key}`}>
											{col.key === 'date' && row[col.key]
												? new Date(row[col.key] * 1000).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})
												: row[col.key] || ''}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __('Column Visibility', 'sushma-api') } initialOpen={true}>
						<ToggleControl
							label={ __('Show ID', 'sushma-api') }
							checked={showId}
							onChange={(value) => setAttributes({ showId: value })}
						/>
						<ToggleControl
							label={ __('Show First Name', 'sushma-api') }
							checked={showFname}
							onChange={(value) => setAttributes({ showFname: value })}
						/>
						<ToggleControl
							label={ __('Show Last Name', 'sushma-api') }
							checked={showLname}
							onChange={(value) => setAttributes({ showLname: value })}
						/>
						<ToggleControl
							label={ __('Show Email', 'sushma-api') }
							checked={showEmail}
							onChange={(value) => setAttributes({ showEmail: value })}
						/>
						<ToggleControl
							label={ __('Show Date', 'sushma-api') }
							checked={showDate}
							onChange={(value) => setAttributes({ showDate: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{renderTable()}
				</div>
			</>
		);
	},

	save: function Save() {
		// This is dynamic block, rendered via PHP
		return null;
	},
});