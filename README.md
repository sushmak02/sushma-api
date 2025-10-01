# Sushma API Plugin

A WordPress plugin to fetch data from remote API and display it through Gutenberg block.

## Features

- **REST API Endpoint** - Added an endpoint for accessing data from an API
- **Gutenberg Block** - Display data in a table with show/hide options
- **Admin Page** - View data in a table with refresh button
- **WP-CLI Command** - Registered "wp sushma-api force-refresh" command to force refresh data
- **Transient Support** - Added cache support using transient


## Installation steps

1. Upload the `sushma-api` folder in the `/wp-content/plugins/`
2. Run `composer install` in the plugin directory
3. Run `npm install && npm run build` to compile block assets
4. Activate the plugin through the 'Plugins' menu in WordPress


### Gutenberg Block

1. Edit any page or post
2. Add a new block and search for "Sushma API Data"
3. Insert the block
4. Use the block settings from sidebar to show/hide column


### Admin Page

1. Navigate to **Sushma API** in the WordPress admin menu
2. Data retrieved from API call should be filled in the table
3. Click **Refresh Data** button to force refresh the data


### WP-CLI Command

Registered this WP-CLI command to refresh the cached data:
```
wp sushma-api force-refresh
```
This command fetches fresh data immediately.



### Build Commands

**Compile block assets:**
```bash
npm run build
```

**Watch for changes (development):**
```bash
npm run start
```

**Regenerate autoloader:**
```bash
composer dump-autoload
```


## Author

**Sushma Kure**

## Version

1.0.0
