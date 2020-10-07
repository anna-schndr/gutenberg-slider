this["pluginnamespace"] = this["pluginnamespace"] || {}; this["pluginnamespace"]["main"] =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./edit.js":
/*!*****************!*\
  !*** ./edit.js ***!
  \*****************/
/*! exports provided: pickRelevantMediaFiles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pickRelevantMediaFiles", function() { return pickRelevantMediaFiles; });
/* harmony import */ var _slider_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider-image */ "./slider-image.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_1__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * External Dependencies
 */
var _lodash = lodash,
    filter = _lodash.filter,
    pick = _lodash.pick,
    get = _lodash.get,
    map = _lodash.map;

/**
 * WordPress dependencies
 */

var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    sprintf = _wp$i18n.sprintf,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    DropZone = _wp$components.DropZone,
    FormFileUpload = _wp$components.FormFileUpload,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl,
    Toolbar = _wp$components.Toolbar,
    withNotices = _wp$components.withNotices;
var mediaUpload = wp.editor.mediaUpload;
var _wp$blockEditor = wp.blockEditor,
    BlockControls = _wp$blockEditor.BlockControls,
    InspectorControls = _wp$blockEditor.InspectorControls,
    MediaPlaceholder = _wp$blockEditor.MediaPlaceholder,
    MediaUpload = _wp$blockEditor.MediaUpload;

/**
 * Internal dependencies
 */





//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

var effectOptions = [{ value: 'fade', label: __('Fade', 'oacs-image-slider-blocks') }, { value: 'scroll', label: __('Scroll', 'oacs-image-slider-blocks') }];

var linkOptions = [{ value: 'attachment', label: __('Attachment Page') }, { value: 'media', label: __('Media File') }, { value: 'none', label: __('None') }];
var ALLOWED_MEDIA_TYPES = ['image'];

var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
    var imageProps = pick(image, ['alt', 'id', 'link', 'caption']);
    imageProps.url = get(image, ['sizes', 'large', 'url']) || get(image, ['media_details', 'sizes', 'large', 'source_url']) || image.url;
    return imageProps;
};

var SliderEdit = function (_Component) {
    _inherits(SliderEdit, _Component);

    function SliderEdit() {
        _classCallCheck(this, SliderEdit);

        var _this = _possibleConstructorReturn(this, (SliderEdit.__proto__ || Object.getPrototypeOf(SliderEdit)).apply(this, arguments));

        _this.getAvailableSizes = _this.getAvailableSizes.bind(_this);

        _this.onSelectImage = _this.onSelectImage.bind(_this);
        _this.onSelectImages = _this.onSelectImages.bind(_this);
        _this.setLinkTo = _this.setLinkTo.bind(_this);
        _this.setSpeed = _this.setSpeed.bind(_this);
        _this.setEffect = _this.setEffect.bind(_this);
        _this.toggleAutoplay = _this.toggleAutoplay.bind(_this);
        _this.toggleArrows = _this.toggleArrows.bind(_this);
        _this.toggleDots = _this.toggleDots.bind(_this);
        _this.toggleImageCrop = _this.toggleImageCrop.bind(_this);
        _this.onRemoveImage = _this.onRemoveImage.bind(_this);
        _this.setImageAttributes = _this.setImageAttributes.bind(_this);
        _this.addFiles = _this.addFiles.bind(_this);
        _this.uploadFromFiles = _this.uploadFromFiles.bind(_this);
        _this.setAttributes = _this.setAttributes.bind(_this);

        _this.state = {
            selectedImage: null
        };
        return _this;
    }

    _createClass(SliderEdit, [{
        key: 'getAvailableSizes',
        value: function getAvailableSizes() {
            return get(this.props.image, ['media_details', 'sizes'], {});
        }
    }, {
        key: 'setAttributes',
        value: function setAttributes(attributes) {
            if (attributes.ids) {
                throw new Error('The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes');
            }

            if (attributes.images) {
                attributes = _extends({}, attributes, {
                    ids: map(attributes.images, 'id')
                });
            }

            this.props.setAttributes(attributes);
        }
    }, {
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
                _this3.setAttributes({
                    images: images
                });
            };
        }
    }, {
        key: 'onSelectImages',
        value: function onSelectImages(images) {
            //.log(JSON.stringify(images));
            this.props.setAttributes({
                images: images.map(function (image) {
                    return pickRelevantMediaFiles(image);
                })
            });
        }
    }, {
        key: 'setLinkTo',
        value: function setLinkTo(value) {
            this.setAttributes({ linkTo: value });
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(value) {
            this.setAttributes({ speed: value });
        }
    }, {
        key: 'setEffect',
        value: function setEffect(value) {
            this.setAttributes({ effect: value });
        }
    }, {
        key: 'toggleAutoplay',
        value: function toggleAutoplay() {
            this.setAttributes({ autoplay: !this.props.attributes.autoplay });
        }
    }, {
        key: 'toggleArrows',
        value: function toggleArrows() {
            this.setAttributes({ arrows: !this.props.attributes.arrows });
        }
    }, {
        key: 'toggleDots',
        value: function toggleDots() {
            this.setAttributes({ dots: !this.props.attributes.dots });
        }
    }, {
        key: 'toggleImageCrop',
        value: function toggleImageCrop() {
            this.setAttributes({ imageCrop: !this.props.attributes.imageCrop });
        }
    }, {
        key: 'getImageCropHelp',
        value: function getImageCropHelp(checked) {
            return checked ? __('Thumbnails are cropped to align.') : __('Thumbnails are not cropped.');
        }
    }, {
        key: 'setImageAttributes',
        value: function setImageAttributes(index, attributes) {
            var images = this.props.attributes.images;
            var setAttributes = this.setAttributes;

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
            var noticeOperations = this.props.noticeOperations;
            var setAttributes = this.setAttributes;

            mediaUpload({
                allowedTypes: ALLOWED_MEDIA_TYPES,
                filesList: files,
                onFileChange: function onFileChange(images) {
                    var imagesNormalized = images.map(function (image) {
                        return pickRelevantMediaFiles(image);
                    });
                    setAttributes({
                        images: currentImages.concat(imagesNormalized)
                    });
                },
                onError: noticeOperations.createErrorNotice
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // Deselect images when deselecting the block
            if (!this.props.isSelected && prevProps.isSelected) {
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

            var _props = this.props,
                attributes = _props.attributes,
                isSelected = _props.isSelected,
                className = _props.className,
                noticeOperations = _props.noticeOperations,
                noticeUI = _props.noticeUI;
            var images = attributes.images,
                imageCrop = attributes.imageCrop,
                autoplay = attributes.autoplay,
                arrows = attributes.arrows,
                dots = attributes.dots,
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
                        allowedTypes: ALLOWED_MEDIA_TYPES,
                        multiple: true,
                        gallery: true,
                        value: images.map(function (img) {
                            return img.id;
                        }),
                        render: function render(_ref) {
                            var open = _ref.open;
                            return wp.element.createElement(Button, {
                                onClick: open,
                                className: 'components-toolbar__control',
                                label: __('Edit Slider', 'oacs-image-slider-blocks'),
                                isSmall: true,
                                icon: 'edit'
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
                    wp.element.createElement(MediaPlaceholder, {
                        icon: 'format-gallery',
                        className: className,
                        labels: {
                            title: __('Slider', 'oacs-image-slider-blocks'),
                            instructions: __('Drag images, upload new ones or select files from your library.', 'oacs-image-slider-blocks')
                        },
                        onSelect: this.onSelectImages,
                        accept: 'image/*',
                        allowedTypes: ALLOWED_MEDIA_TYPES,
                        multiple: true,
                        notices: noticeUI,
                        onError: noticeOperations.createErrorNotice
                    })
                );
            }

            //console.log(JSON.stringify(images));

            return wp.element.createElement(
                Fragment,
                null,
                controls,
                wp.element.createElement(
                    InspectorControls,
                    null,
                    wp.element.createElement(
                        PanelBody,
                        { title: __('Slider Settings', 'oacs-image-slider-blocks') },
                        wp.element.createElement(ToggleControl, {
                            label: __('Crop Images'),
                            checked: !!imageCrop,
                            onChange: this.toggleImageCrop,
                            help: this.getImageCropHelp
                        }),
                        wp.element.createElement(ToggleControl, {
                            label: __('Autoplay', 'oacs-image-slider-blocks'),
                            checked: !!autoplay,
                            onChange: this.toggleAutoplay
                        }),
                        wp.element.createElement(ToggleControl, {
                            label: __('Show Arrows', 'oacs-image-slider-blocks'),
                            checked: !!arrows,
                            onChange: this.toggleArrows
                        }),
                        wp.element.createElement(ToggleControl, {
                            label: __('Show Dots', 'oacs-image-slider-blocks'),
                            checked: !!dots,
                            onChange: this.toggleDots
                        }),
                        wp.element.createElement(TextControl, {
                            label: __('Speed', 'oacs-image-slider-blocks'),
                            type: 'number',
                            min: '100',
                            max: '500',
                            value: speed,
                            onChange: this.setSpeed
                        }),
                        wp.element.createElement(SelectControl, {
                            label: __('Effect', 'oacs-image-slider-blocks'),
                            value: effect,
                            onChange: this.setEffect,
                            options: effectOptions
                        }),
                        wp.element.createElement(SelectControl, {
                            label: __('Link To'),
                            value: linkTo,
                            onChange: this.setLinkTo,
                            options: linkOptions
                        })
                    )
                ),
                noticeUI,
                wp.element.createElement(
                    'ul',
                    { className: className + ' ' + (imageCrop ? 'is-cropped' : '') },
                    dropZone,
                    images.map(function (img, index) {
                        /* translators: %1$d is the order number of the image, %2$d is the total number of images. */
                        var ariaLabel = __(sprintf('image %1$d of %2$d in slider', index + 1, images.length));

                        return wp.element.createElement(
                            'li',
                            { className: 'blocks-gallery-item', key: img.id || img.url },
                            wp.element.createElement(_slider_image__WEBPACK_IMPORTED_MODULE_0__["default"], {
                                url: img.url,
                                alt: img.alt,
                                id: img.id,
                                isSelected: isSelected && _this4.state.selectedImage === index,
                                onRemove: _this4.onRemoveImage(index),
                                onSelect: _this4.onSelectImage(index),
                                setAttributes: function setAttributes(attrs) {
                                    return _this4.setImageAttributes(index, attrs);
                                },
                                caption: img.caption,
                                'aria-label': ariaLabel
                            })
                        );
                    }),
                    isSelected && wp.element.createElement(
                        'li',
                        { className: 'blocks-gallery-item has-add-item-button' },
                        wp.element.createElement(
                            FormFileUpload,
                            {
                                multiple: true,
                                isLarge: true,
                                className: 'block-library-gallery-add-item-button',
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

    return SliderEdit;
}(Component);

/* harmony default export */ __webpack_exports__["default"] = (withNotices(SliderEdit));

/***/ }),

/***/ "./editor.scss":
/*!*********************!*\
  !*** ./editor.scss ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit */ "./edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */
var _lodash = lodash,
    filter = _lodash.filter,
    every = _lodash.every,
    map = _lodash.map,
    some = _lodash.some;

/**
 * WordPress dependencies
 */

var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    createBlock = _wp$blocks.createBlock,
    registerBlockType = _wp$blocks.registerBlockType;
var mediaUpload = wp.editor.mediaUpload;
var RichText = wp.blockEditor.RichText;
var createBlobURL = wp.blob.createBlobURL;
var _wp$components = wp.components,
    G = _wp$components.G,
    Path = _wp$components.Path,
    SVG = _wp$components.SVG;

/**
 * Internal dependencies
 */





//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

var blockAttributes = {
    images: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'ul.wp-block-oacs-slider .blocks-gallery-item',
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
                type: 'string',
                source: 'html',
                selector: 'figcaption'
            }
        }
    },
    ids: {
        type: 'array',
        default: []
    },

    imageCrop: {
        type: 'boolean',
        default: true
    },
    autoplay: {
        type: 'boolean',
        default: true
    },
    arrows: {
        type: 'boolean',
        default: false
    },
    dots: {
        type: 'boolean',
        default: false
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

var name = 'oacs/slider';

var parseShortcodeIds = function parseShortcodeIds(ids) {
    if (!ids) {
        return [];
    }

    return ids.split(',').map(function (id) {
        return parseInt(id, 10);
    });
};

var settings = {
    title: __('Slider', 'oacs-image-slider-blocks'),
    description: __('Display multiple images in an elegant slider.', 'oacs-image-slider-blocks'),
    icon: wp.element.createElement(
        SVG,
        { viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
        wp.element.createElement('path', { d: 'M16.5 20h-14c-0.827 0-1.5-0.673-1.5-1.5v-13c0-0.827 0.673-1.5 1.5-1.5h14c0.827 0 1.5 0.673 1.5 1.5v13c0 0.827-0.673 1.5-1.5 1.5zM2.5 5c-0.276 0-0.5 0.224-0.5 0.5v13c0 0.276 0.224 0.5 0.5 0.5h14c0.276 0 0.5-0.224 0.5-0.5v-13c0-0.276-0.224-0.5-0.5-0.5h-14z', fill: '#000000' }),
        wp.element.createElement('path', { d: 'M16.5 3h-14c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h14c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z', fill: '#000000' }),
        wp.element.createElement('path', { d: 'M15.5 1h-12c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z', fill: '#000000' }),
        wp.element.createElement('path', { d: 'M11.5 13c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM11.5 11c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z', fill: '#000000' }),
        wp.element.createElement('path', { d: 'M14.5 8h-10c-0.276 0-0.5 0.224-0.5 0.5v7c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5-0.224 0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5zM5 13.675l1.266-1.582c0.073-0.091 0.164-0.142 0.259-0.144s0.189 0.044 0.266 0.131l2.596 2.92h-4.387v-1.325zM14 15h-3.275l-3.187-3.585c-0.272-0.306-0.651-0.476-1.039-0.466s-0.758 0.199-1.014 0.519l-0.485 0.606v-3.075h9v6z', fill: '#000000' })
    ),
    category: 'common',
    keywords: [__('images'), __('photos'), __('slider')],
    attributes: blockAttributes,

    transforms: {
        from: [{
            type: 'block',
            isMultiBlock: true,
            blocks: ['core/image'],
            transform: function transform(attributes) {
                var validImages = filter(attributes, function (_ref) {
                    var id = _ref.id,
                        url = _ref.url;
                    return id && url;
                });
                if (validImages.length > 0) {
                    return createBlock('oacs/slider', {
                        images: validImages.map(function (_ref2) {
                            var id = _ref2.id,
                                url = _ref2.url,
                                alt = _ref2.alt,
                                caption = _ref2.caption;
                            return { id: id, url: url, alt: alt, caption: caption };
                        }),
                        ids: validImages.map(function (_ref3) {
                            var id = _ref3.id;
                            return id;
                        })
                    });
                }
                return createBlock('oacs/slider');
            }
        }, {
            type: 'shortcode',
            tag: 'gallery',
            attributes: {
                images: {
                    type: 'array',
                    shortcode: function shortcode(_ref4) {
                        var ids = _ref4.named.ids;

                        return parseShortcodeIds(ids).map(function (id) {
                            return {
                                id: id
                            };
                        });
                    }
                },
                ids: {
                    type: 'array',
                    shortcode: function shortcode(_ref5) {
                        var ids = _ref5.named.ids;

                        return parseShortcodeIds(ids);
                    }
                },
                linkTo: {
                    type: 'string',
                    shortcode: function shortcode(_ref6) {
                        var _ref6$named$link = _ref6.named.link,
                            link = _ref6$named$link === undefined ? 'attachment' : _ref6$named$link;

                        return link === 'file' ? 'media' : link;
                    }
                }
            }
        }, {
            // When created by drag and dropping multiple files on an insertion point
            type: 'files',
            isMatch: function isMatch(files) {
                return files.length !== 1 && every(files, function (file) {
                    return file.type.indexOf('image/') === 0;
                });
            },
            transform: function transform(files, onChange) {
                var block = createBlock('oacs/slider', {
                    images: files.map(function (file) {
                        return Object(_edit__WEBPACK_IMPORTED_MODULE_0__["pickRelevantMediaFiles"])({
                            url: createBlobURL(file)
                        });
                    })
                });
                mediaUpload({
                    filesList: files,
                    onFileChange: function onFileChange(images) {
                        var imagesAttr = images.map(_edit__WEBPACK_IMPORTED_MODULE_0__["pickRelevantMediaFiles"]);
                        onChange(block.clientId, {
                            ids: map(imagesAttr, 'id'),
                            images: imagesAttr
                        });
                    },
                    allowedTypes: ['image']
                });
                return block;
            }
        }],
        to: [{
            type: 'block',
            blocks: ['core/image'],
            transform: function transform(_ref7) {
                var images = _ref7.images;

                if (images.length > 0) {
                    return images.map(function (_ref8) {
                        var id = _ref8.id,
                            url = _ref8.url,
                            alt = _ref8.alt,
                            caption = _ref8.caption;
                        return createBlock('core/image', { id: id, url: url, alt: alt, caption: caption });
                    });
                }
                return createBlock('core/image');
            }
        }]
    },

    edit: _edit__WEBPACK_IMPORTED_MODULE_0__["default"],

    save: function save(_ref9) {
        var attributes = _ref9.attributes;
        var images = attributes.images,
            imageCrop = attributes.imageCrop,
            autoplay = attributes.autoplay,
            arrows = attributes.arrows,
            dots = attributes.dots,
            speed = attributes.speed,
            effect = attributes.effect,
            linkTo = attributes.linkTo;

        return wp.element.createElement(
            'ul',
            { className: '' + (imageCrop ? 'is-cropped' : ''), 'data-autoplay': autoplay, 'data-speed': speed, 'data-effect': effect, 'data-arrows': arrows, 'data-dots': dots },
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

                var img = wp.element.createElement('img', { src: image.url, alt: image.alt, 'data-id': image.id, 'data-link': image.link, className: image.id ? 'wp-image-' + image.id : null });

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
                        image.caption && image.caption.length > 0 && wp.element.createElement(RichText.Content, { tagName: 'figcaption', value: image.caption })
                    )
                );
            })
        );
    }
};

registerBlockType(name, settings);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
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
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
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

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./slider-image.js":
/*!*************************!*\
  !*** ./slider-image.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
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
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Spinner = _wp$components.Spinner;
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$keycodes = wp.keycodes,
    BACKSPACE = _wp$keycodes.BACKSPACE,
    DELETE = _wp$keycodes.DELETE;
var withSelect = wp.data.withSelect;
var RichText = wp.blockEditor.RichText;
var isBlobURL = wp.blob.isBlobURL;

//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

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
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _props = this.props,
                isSelected = _props.isSelected,
                image = _props.image,
                url = _props.url;

            if (image && !url) {
                this.props.setAttributes({
                    url: image.source_url,
                    alt: image.alt_text
                });
            }

            // unselect the caption so when the user selects other image and comeback
            // the caption is not immediately selected
            if (this.state.captionSelected && !isSelected && prevProps.isSelected) {
                this.setState({
                    captionSelected: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                url = _props2.url,
                alt = _props2.alt,
                id = _props2.id,
                linkTo = _props2.linkTo,
                link = _props2.link,
                isSelected = _props2.isSelected,
                caption = _props2.caption,
                onRemove = _props2.onRemove,
                setAttributes = _props2.setAttributes,
                ariaLabel = _props2['aria-label'];


            var href = void 0;

            switch (linkTo) {
                case 'media':
                    href = url;
                    break;
                case 'attachment':
                    href = link;
                    break;
            }

            var img =
            // Disable reason: Image itself is not meant to be interactive, but should
            // direct image selection and unfocus caption fields.
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
            wp.element.createElement(
                Fragment,
                null,
                wp.element.createElement('img', {
                    src: url,
                    alt: alt,
                    'data-id': id,
                    onClick: this.onImageClick,
                    tabIndex: '0',
                    onKeyDown: this.onImageClick,
                    'aria-label': ariaLabel
                }),
                isBlobURL(url) && wp.element.createElement(Spinner, null)
            )
            /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
            ;

            var className = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
                'is-selected': isSelected,
                'is-transient': isBlobURL(url)
            });

            // Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
            return wp.element.createElement(
                'figure',
                { className: className, tabIndex: '-1', onKeyDown: this.onKeyDown, ref: this.bindContainer },
                isSelected && wp.element.createElement(
                    'div',
                    { className: 'block-library-gallery-item__inline-menu' },
                    wp.element.createElement(Button, {
                        onClick: onRemove,
                        className: 'blocks-gallery-item__remove',
                        label: __('Remove Imagez'),
                        isSmall: true,
                        isDestructive: true,
                        icon: 'no-alt'
                    })
                ),
                href ? wp.element.createElement(
                    'a',
                    { href: href },
                    img
                ) : img,
                !RichText.isEmpty(caption) || isSelected ? wp.element.createElement(RichText, {
                    tagName: 'figcaption',
                    placeholder: __('Write caption…'),
                    value: caption,
                    isSelected: this.state.captionSelected,
                    onChange: function onChange(newCaption) {
                        return setAttributes({ caption: newCaption });
                    },
                    unstableOnFocus: this.onSelectCaption,
                    inlineToolbar: true
                }) : null
            );
            /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
        }
    }]);

    return SliderImage;
}(Component);

/* harmony default export */ __webpack_exports__["default"] = (withSelect(function (select, ownProps) {
    var _select = select('core'),
        getMedia = _select.getMedia;

    var id = ownProps.id;


    return {
        image: id ? getMedia(id) : null
    };
})(SliderImage));

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=block.build.js.map