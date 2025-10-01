/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/Block/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);

/**
 * Import WordPress dependencies
 */






/**
 * Register the gutenberg block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('sushma/api-data', {
  attributes: {
    showId: {
      type: 'boolean',
      default: true
    },
    showFname: {
      type: 'boolean',
      default: true
    },
    showLname: {
      type: 'boolean',
      default: true
    },
    showEmail: {
      type: 'boolean',
      default: true
    },
    showDate: {
      type: 'boolean',
      default: true
    }
  },
  edit: function Edit({
    attributes,
    setAttributes
  }) {
    const {
      showId,
      showFname,
      showLname,
      showEmail,
      showDate
    } = attributes;
    const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(true);
    const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();

    // Fetch data from REST API endpoint.
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
      fetch('/wp-json/sushma-api/v1/data').then(response => {
        if (!response.ok) {
          throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Failed to fetch data', 'sushma-api'));
        }
        return response.json();
      }).then(result => {
        if (result.success && result.data) {
          // console.log( "success", result.data );
          setData(result.data);
          setError(null);
        } else {
          throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Invalid data format', 'sushma-api'));
        }
      }).catch(err => {
        console.error('API Error:', err);
        setError(err.message);
      }).finally(() => {
        setLoading(false);
      });
    }, []);

    // Render data table
    const renderTable = () => {
      if (loading) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            textAlign: 'center',
            padding: '40px'
          }
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Loading data...', 'sushma-api')));
      }
      if (error) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
          status: "error",
          isDismissible: false
        }, error);
      }

      // Checking data structure, handle both nested and normal data.
      let headers, rows;
      if (data.data && data.data.headers && data.data.rows) {
        headers = data.data.headers;
        rows = data.data.rows;
      } else if (data.headers && data.rows) {
        headers = data.headers;
        rows = data.rows;
      } else {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
          status: "warning",
          isDismissible: false
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No data available', 'sushma-api'));
      }

      // Convert rows object to array if needed.
      if (!Array.isArray(rows)) {
        if ('object' === typeof rows && null !== rows) {
          rows = Object.values(rows);
        } else {
          return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
            status: "warning",
            isDismissible: false
          }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Invalid data format', 'sushma-api'));
        }
      }
      const columnMap = {
        showId: {
          key: 'id',
          label: headers[0] || 'ID'
        },
        showFname: {
          key: 'fname',
          label: headers[1] || 'First Name'
        },
        showLname: {
          key: 'lname',
          label: headers[2] || 'Last Name'
        },
        showEmail: {
          key: 'email',
          label: headers[3] || 'Email'
        },
        showDate: {
          key: 'date',
          label: headers[4] || 'Date'
        }
      };
      const visibleColumns = Object.entries(columnMap).filter(([attrKey]) => attributes[attrKey]);
      if (0 === visibleColumns.length) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
          status: "info",
          isDismissible: false
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Please select at least one column to display', 'sushma-api'));
      }
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "sushma-api-table-wrapper"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
        className: "wp-list-table widefat fixed striped sushma-api-table"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, visibleColumns.map(([attrKey, col]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
        key: col.key,
        className: `sushma-api-table-header sushma-api-table-${col.key}`
      }, col.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, rows.map((row, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
        key: index
      }, visibleColumns.map(([attrKey, col]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        key: col.key,
        className: `sushma-api-table-${col.key}`
      }, col.key === 'date' && row[col.key] ? new Date(row[col.key] * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : row[col.key] || '')))))));
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Column Visibility', 'sushma-api'),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show ID', 'sushma-api'),
      checked: showId,
      onChange: value => setAttributes({
        showId: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show First Name', 'sushma-api'),
      checked: showFname,
      onChange: value => setAttributes({
        showFname: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show Last Name', 'sushma-api'),
      checked: showLname,
      onChange: value => setAttributes({
        showLname: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show Email', 'sushma-api'),
      checked: showEmail,
      onChange: value => setAttributes({
        showEmail: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Show Date', 'sushma-api'),
      checked: showDate,
      onChange: value => setAttributes({
        showDate: value
      })
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, renderTable()));
  },
  save: function Save() {
    // This is dynamic block, rendered via PHP
    return null;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map