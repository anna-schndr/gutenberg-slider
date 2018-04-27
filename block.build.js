/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(1);
/**
 * External dependencies
 */

var _lodash = lodash,
    filter = _lodash.filter,
    every = _lodash.every;

/**
 * WordPress dependencies
 */

var __ = wp.i18n.__;
var mediaUpload = wp.utils.mediaUpload;

/**
 * Internal dependencies
 */
/*import './editor.scss';
import './style.scss';*/

var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock,
    getBlockType = _wp$blocks.getBlockType,
    getBlockTypes = _wp$blocks.getBlockTypes;




var blockAttributes = {
	images: {
		type: 'array',
		default: [],
		source: 'query',
		selector: 'ul.wp-block-occ-slider .blocks-gallery-item',
		query: {
			url: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src'
			},
			link: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-link'
			},
			alt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: ''
			},
			id: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id'
			},
			caption: {
				type: 'array',
				source: 'children',
				selector: 'figcaption'
			}
		}
	},
	imageCrop: {
		type: 'boolean',
		default: true
	},
	autoplay: {
		type: 'boolean',
		default: true
	},
	speed: {
		type: 'string',
		default: '300'
	},
	effect: {
		type: 'string',
		default: 'fade'
	},
	linkTo: {
		type: 'string',
		default: 'none'
	}
};

var name = 'occ/slider';

var settings = {
	title: __('Slider', 'gutenberg-slider'),
	description: __('Image silders are a great way to share groups of pictures on your site.', 'gutenberg-slider'),
	icon: 'format-gallery',
	category: 'common',
	keywords: [__('images'), __('photos')],
	attributes: blockAttributes,

	transforms: {
		from: [{
			type: 'block',
			isMultiBlock: true,
			blocks: ['occ/slider'],
			transform: function transform(attributes) {
				var validImages = filter(attributes, function (_ref) {
					var id = _ref.id,
					    url = _ref.url;
					return id && url;
				});
				if (validImages.length > 0) {
					return createBlock('occ/slider', {
						images: validImages.map(function (_ref2) {
							var id = _ref2.id,
							    url = _ref2.url,
							    alt = _ref2.alt,
							    caption = _ref2.caption;
							return { id: id, url: url, alt: alt, caption: caption };
						})
					});
				}
				return createBlock('occ/slider');
			}
		}, {
			type: 'shortcode',
			tag: 'gallery',
			attributes: {
				images: {
					type: 'array',
					shortcode: function shortcode(_ref3) {
						var ids = _ref3.named.ids;

						if (!ids) {
							return [];
						}

						return ids.split(',').map(function (id) {
							return {
								id: parseInt(id, 10)
							};
						});
					}
				},
				linkTo: {
					type: 'string',
					shortcode: function shortcode(_ref4) {
						var _ref4$named$link = _ref4.named.link,
						    link = _ref4$named$link === undefined ? 'attachment' : _ref4$named$link;

						return link === 'file' ? 'media' : link;
					}
				}
			}
		}, {
			type: 'files',
			isMatch: function isMatch(files) {
				return files.length !== 1 && every(files, function (file) {
					return file.type.indexOf('image/') === 0;
				});
			},
			transform: function transform(files, onChange) {
				var block = createBlock('occ/slider');
				mediaUpload(files, function (images) {
					return onChange(block.uid, { images: images });
				}, 'image');
				return block;
			}
		}],
		to: [{
			type: 'block',
			blocks: ['core/image'],
			transform: function transform(_ref5) {
				var images = _ref5.images;

				if (images.length > 0) {
					return images.map(function (_ref6) {
						var id = _ref6.id,
						    url = _ref6.url,
						    alt = _ref6.alt,
						    caption = _ref6.caption;
						return createBlock('core/image', { id: id, url: url, alt: alt, caption: caption });
					});
				}
				return createBlock('core/image');
			}
		}]
	},

	edit: __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */],

	save: function save(_ref7) {
		var attributes = _ref7.attributes;
		var images = attributes.images,
		    imageCrop = attributes.imageCrop,
		    autoplay = attributes.autoplay,
		    speed = attributes.speed,
		    effect = attributes.effect,
		    linkTo = attributes.linkTo;

		return wp.element.createElement(
			'ul',
			{ className: '' + (imageCrop ? 'is-cropped' : ''), 'data-autoplay': autoplay, 'data-speed': speed, 'data-effect': effect },
			images.map(function (image) {
				var href = void 0;

				switch (linkTo) {
					case 'media':
						href = image.url;
						break;
					case 'attachment':
						href = image.link;
						break;
				}

				var img = wp.element.createElement('img', { src: image.url, alt: image.alt, 'data-id': image.id, 'data-link': image.link });

				return wp.element.createElement(
					'li',
					{ key: image.id || image.url, className: 'blocks-gallery-item' },
					wp.element.createElement(
						'figure',
						null,
						href ? wp.element.createElement(
							'a',
							{ href: href },
							img
						) : img,
						image.caption && image.caption.length > 0 && wp.element.createElement(
							'figcaption',
							null,
							image.caption
						)
					)
				);
			})
		);
	}
};

registerBlockType(name, settings);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider_image__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * External Dependencies
 */
/*import filter from 'lodash/filter';
import pick from 'lodash/pick';*/

var _lodash = lodash,
    filter = _lodash.filter,
    pick = _lodash.pick;

/**
 * WordPress dependencies
 */

var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var __ = wp.i18n.__;
var mediaUpload = wp.utils.mediaUpload;
var _wp$components = wp.components,
    IconButton = _wp$components.IconButton,
    DropZone = _wp$components.DropZone,
    FormFileUpload = _wp$components.FormFileUpload,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl,
    Toolbar = _wp$components.Toolbar;

/**
 * Internal dependencies
 */

var _wp$blocks = wp.blocks,
    MediaUpload = _wp$blocks.MediaUpload,
    ImagePlaceholder = _wp$blocks.ImagePlaceholder,
    InspectorControls = _wp$blocks.InspectorControls,
    BlockControls = _wp$blocks.BlockControls;




var effectOptions = [{ value: 'fade', label: __('Fade', 'gutenberg-slider') }, { value: 'scroll', label: __('Scroll', 'gutenberg-slider') }];

var linkOptions = [{ value: 'attachment', label: __('Attachment Page') }, { value: 'media', label: __('Media File') }, { value: 'none', label: __('None') }];

var SliderBlock = function (_Component) {
	_inherits(SliderBlock, _Component);

	function SliderBlock() {
		_classCallCheck(this, SliderBlock);

		var _this = _possibleConstructorReturn(this, (SliderBlock.__proto__ || Object.getPrototypeOf(SliderBlock)).apply(this, arguments));

		_this.onSelectImage = _this.onSelectImage.bind(_this);
		_this.onSelectImages = _this.onSelectImages.bind(_this);
		_this.setLinkTo = _this.setLinkTo.bind(_this);
		_this.setSpeed = _this.setSpeed.bind(_this);
		_this.setEffect = _this.setEffect.bind(_this);
		_this.toggleAutoplay = _this.toggleAutoplay.bind(_this);
		_this.toggleImageCrop = _this.toggleImageCrop.bind(_this);
		_this.onRemoveImage = _this.onRemoveImage.bind(_this);
		_this.setImageAttributes = _this.setImageAttributes.bind(_this);
		_this.addFiles = _this.addFiles.bind(_this);
		_this.uploadFromFiles = _this.uploadFromFiles.bind(_this);

		_this.state = {
			selectedImage: null
		};
		return _this;
	}

	_createClass(SliderBlock, [{
		key: 'onSelectImage',
		value: function onSelectImage(index) {
			var _this2 = this;

			return function () {
				if (_this2.state.selectedImage !== index) {
					_this2.setState({
						selectedImage: index
					});
				}
			};
		}
	}, {
		key: 'onRemoveImage',
		value: function onRemoveImage(index) {
			var _this3 = this;

			return function () {
				var images = filter(_this3.props.attributes.images, function (img, i) {
					return index !== i;
				});
				_this3.setState({ selectedImage: null });
				_this3.props.setAttributes({
					images: images
				});
			};
		}
	}, {
		key: 'onSelectImages',
		value: function onSelectImages(images) {
			this.props.setAttributes({
				images: images.map(function (image) {
					return pick(image, ['alt', 'caption', 'id', 'url']);
				})
			});
		}
	}, {
		key: 'setLinkTo',
		value: function setLinkTo(value) {
			this.props.setAttributes({ linkTo: value });
		}
	}, {
		key: 'setSpeed',
		value: function setSpeed(value) {
			this.props.setAttributes({ speed: value });
		}
	}, {
		key: 'setEffect',
		value: function setEffect(value) {
			this.props.setAttributes({ effect: value });
		}
	}, {
		key: 'toggleAutoplay',
		value: function toggleAutoplay() {
			this.props.setAttributes({ autoplay: !this.props.attributes.autoplay });
		}
	}, {
		key: 'toggleImageCrop',
		value: function toggleImageCrop() {
			this.props.setAttributes({ imageCrop: !this.props.attributes.imageCrop });
		}
	}, {
		key: 'getImageCropHelp',
		value: function getImageCropHelp(checked) {
			return checked ? __('Thumbnails are cropped to align.') : __('Thumbnails are not cropped.');
		}
	}, {
		key: 'setImageAttributes',
		value: function setImageAttributes(index, attributes) {
			var _props = this.props,
			    images = _props.attributes.images,
			    setAttributes = _props.setAttributes;

			if (!images[index]) {
				return;
			}
			setAttributes({
				images: [].concat(_toConsumableArray(images.slice(0, index)), [_extends({}, images[index], attributes)], _toConsumableArray(images.slice(index + 1)))
			});
		}
	}, {
		key: 'uploadFromFiles',
		value: function uploadFromFiles(event) {
			this.addFiles(event.target.files);
		}
	}, {
		key: 'addFiles',
		value: function addFiles(files) {
			var currentImages = this.props.attributes.images || [];
			var setAttributes = this.props.setAttributes;

			mediaUpload(files, function (images) {
				setAttributes({
					images: currentImages.concat(images)
				});
			}, 'image');
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// Deselect images when deselecting the block
			if (!nextProps.isSelected && this.props.isSelected) {
				this.setState({
					selectedImage: null,
					captionSelected: false
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props2 = this.props,
			    attributes = _props2.attributes,
			    isSelected = _props2.isSelected,
			    className = _props2.className;
			var images = attributes.images,
			    imageCrop = attributes.imageCrop,
			    autoplay = attributes.autoplay,
			    speed = attributes.speed,
			    effect = attributes.effect,
			    linkTo = attributes.linkTo;


			var dropZone = wp.element.createElement(DropZone, {
				onFilesDrop: this.addFiles
			});

			var controls = wp.element.createElement(
				BlockControls,
				null,
				!!images.length && wp.element.createElement(
					Toolbar,
					null,
					wp.element.createElement(MediaUpload, {
						onSelect: this.onSelectImages,
						type: 'image',
						multiple: true,
						gallery: true,
						value: images.map(function (img) {
							return img.id;
						}),
						render: function render(_ref) {
							var open = _ref.open;
							return wp.element.createElement(IconButton, {
								className: 'components-toolbar__control',
								label: __('Edit Slider', 'gutenberg-slider'),
								icon: 'edit',
								onClick: open
							});
						}
					})
				)
			);

			if (images.length === 0) {
				return wp.element.createElement(
					Fragment,
					null,
					controls,
					wp.element.createElement(ImagePlaceholder, {
						className: className,
						icon: 'format-gallery',
						label: __('Slider', 'gutenberg-slider'),
						onSelectImage: this.onSelectImages,
						multiple: true
					})
				);
			}

			return wp.element.createElement(
				Fragment,
				null,
				controls,
				wp.element.createElement(
					InspectorControls,
					null,
					wp.element.createElement(
						PanelBody,
						{ title: __('Slider Settings', 'gutenberg-slider') },
						wp.element.createElement(ToggleControl, {
							label: __('Crop Images'),
							checked: !!imageCrop,
							onChange: this.toggleImageCrop,
							help: this.getImageCropHelp
						}),
						wp.element.createElement(ToggleControl, {
							label: __('Autoplay', 'gutenberg-slider'),
							checked: !!autoplay,
							onChange: this.toggleAutoplay
						}),
						wp.element.createElement(TextControl, {
							label: __('Speed', 'gutenberg-slider'),
							type: 'number',
							min: '100',
							max: '500',
							value: speed,
							onChange: this.setSpeed
						}),
						wp.element.createElement(SelectControl, {
							label: __('Effect', 'gutenberg-slider'),
							value: effect,
							onChange: this.setEffect,
							options: effectOptions
						}),
						wp.element.createElement(SelectControl, {
							label: __('Link to'),
							value: linkTo,
							onChange: this.setLinkTo,
							options: linkOptions
						})
					)
				),
				wp.element.createElement(
					'ul',
					{ className: className + ' ' + (imageCrop ? 'is-cropped' : '') },
					dropZone,
					images.map(function (img, index) {
						return wp.element.createElement(
							'li',
							{ className: 'blocks-gallery-item', key: img.id || img.url },
							wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__slider_image__["a" /* default */], {
								url: img.url,
								alt: img.alt,
								id: img.id,
								isSelected: isSelected && _this4.state.selectedImage === index,
								onRemove: _this4.onRemoveImage(index),
								onSelect: _this4.onSelectImage(index),
								setAttributes: function setAttributes(attrs) {
									return _this4.setImageAttributes(index, attrs);
								},
								caption: img.caption
							})
						);
					}),
					isSelected && wp.element.createElement(
						'li',
						{ className: 'blocks-gallery-item' },
						wp.element.createElement(
							FormFileUpload,
							{
								multiple: true,
								isLarge: true,
								className: 'blocks-gallery-add-item-button',
								onChange: this.uploadFromFiles,
								accept: 'image/*',
								icon: 'insert'
							},
							__('Upload an image')
						)
					)
				)
			);
		}
	}]);

	return SliderBlock;
}(Component);

/* harmony default export */ __webpack_exports__["a"] = (SliderBlock);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_classnames__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */
var Component = wp.element.Component;
var _wp$components = wp.components,
    IconButton = _wp$components.IconButton,
    Spinner = _wp$components.Spinner;
var __ = wp.i18n.__;
var keycodes = wp.utils.keycodes;
var withSelect = wp.data.withSelect;

/**
 * Internal dependencies
 */

var RichText = wp.blocks.RichText;

/**
 * Module constants
 */

var BACKSPACE = keycodes.BACKSPACE,
    DELETE = keycodes.DELETE;

var SliderImage = function (_Component) {
	_inherits(SliderImage, _Component);

	function SliderImage() {
		_classCallCheck(this, SliderImage);

		var _this = _possibleConstructorReturn(this, (SliderImage.__proto__ || Object.getPrototypeOf(SliderImage)).apply(this, arguments));

		_this.onImageClick = _this.onImageClick.bind(_this);
		_this.onSelectCaption = _this.onSelectCaption.bind(_this);
		_this.onKeyDown = _this.onKeyDown.bind(_this);
		_this.bindContainer = _this.bindContainer.bind(_this);

		_this.state = {
			captionSelected: false
		};
		return _this;
	}

	_createClass(SliderImage, [{
		key: 'bindContainer',
		value: function bindContainer(ref) {
			this.container = ref;
		}
	}, {
		key: 'onSelectCaption',
		value: function onSelectCaption() {
			if (!this.state.captionSelected) {
				this.setState({
					captionSelected: true
				});
			}

			if (!this.props.isSelected) {
				this.props.onSelect();
			}
		}
	}, {
		key: 'onImageClick',
		value: function onImageClick() {
			if (!this.props.isSelected) {
				this.props.onSelect();
			}

			if (this.state.captionSelected) {
				this.setState({
					captionSelected: false
				});
			}
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(event) {
			if (this.container === document.activeElement && this.props.isSelected && [BACKSPACE, DELETE].indexOf(event.keyCode) !== -1) {
				event.stopPropagation();
				event.preventDefault();
				this.props.onRemove();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var isSelected = _ref.isSelected,
			    image = _ref.image,
			    url = _ref.url;

			if (image && !url) {
				this.props.setAttributes({
					url: image.source_url,
					alt: image.alt_text
				});
			}

			// unselect the caption so when the user selects other image and comeback
			// the caption is not immediately selected
			if (this.state.captionSelected && !isSelected && this.props.isSelected) {
				this.setState({
					captionSelected: false
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    url = _props.url,
			    alt = _props.alt,
			    id = _props.id,
			    linkTo = _props.linkTo,
			    link = _props.link,
			    isSelected = _props.isSelected,
			    caption = _props.caption,
			    onRemove = _props.onRemove,
			    setAttributes = _props.setAttributes;


			var href = void 0;

			switch (linkTo) {
				case 'media':
					href = url;
					break;
				case 'attachment':
					href = link;
					break;
			}

			// Disable reason: Image itself is not meant to be
			// interactive, but should direct image selection and unfocus caption fields
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
			var img = url ? wp.element.createElement('img', { src: url, alt: alt, 'data-id': id, onClick: this.onImageClick }) : wp.element.createElement(Spinner, null);

			var className = __WEBPACK_IMPORTED_MODULE_0_classnames___default()({
				'is-selected': isSelected,
				'is-transient': url && 0 === url.indexOf('blob:')
			});

			// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
			return wp.element.createElement(
				'figure',
				{ className: className, tabIndex: '-1', onKeyDown: this.onKeyDown, ref: this.bindContainer },
				isSelected && wp.element.createElement(
					'div',
					{ className: 'blocks-gallery-item__inline-menu' },
					wp.element.createElement(IconButton, {
						icon: 'no-alt',
						onClick: onRemove,
						className: 'blocks-gallery-item__remove',
						label: __('Remove Image')
					})
				),
				href ? wp.element.createElement(
					'a',
					{ href: href },
					img
				) : img,
				caption && caption.length > 0 || isSelected ? wp.element.createElement(RichText, {
					tagName: 'figcaption',
					placeholder: __('Write caption…'),
					value: caption,
					isSelected: this.state.captionSelected,
					onChange: function onChange(newCaption) {
						return setAttributes({ caption: newCaption });
					},
					onFocus: this.onSelectCaption,
					inlineToolbar: true
				}) : null
			);
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		}
	}]);

	return SliderImage;
}(Component);

/* harmony default export */ __webpack_exports__["a"] = (withSelect(function (select, ownProps) {
	var _select = select('core'),
	    getMedia = _select.getMedia;

	var id = ownProps.id;


	return {
		image: id ? getMedia(id) : null
	};
})(SliderImage));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ })
/******/ ]);