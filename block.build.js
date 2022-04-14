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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: Unexpected token (110:10)\n\n\u001b[0m \u001b[90m 108 | \u001b[39m    title\u001b[33m:\u001b[39m __( \u001b[32m'Slider'\u001b[39m\u001b[33m,\u001b[39m \u001b[32m'oacs-image-slider-blocks'\u001b[39m )\u001b[33m,\u001b[39m\n \u001b[90m 109 | \u001b[39m    description\u001b[33m:\u001b[39m __( \u001b[32m'Display multiple images in an elegant slider.'\u001b[39m\u001b[33m,\u001b[39m \u001b[32m'oacs-image-slider-blocks'\u001b[39m )\u001b[33m,\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 110 | \u001b[39m    icon\u001b[33m:\u001b[39m \u001b[33m<\u001b[39m\u001b[33msvg\u001b[39m viewBox\u001b[33m=\u001b[39m\u001b[32m\"0 0 24 24\"\u001b[39m xmlns\u001b[33m=\u001b[39m\u001b[32m\"http://www.w3.org/2000/svg\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mg\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mpath\u001b[39m d\u001b[33m=\u001b[39m\u001b[32m\"M16.5 20h-14c-0.827 0-1.5-0.673-1.5-1.5v-13c0-0.827 0.673-1.5 1.5-1.5h14c0.827 0 1.5 0.673 1.5 1.5v13c0 0.827-0.673 1.5-1.5 1.5zM2.5 5c-0.276 0-0.5 0.224-0.5 0.5v13c0 0.276 0.224 0.5 0.5 0.5h14c0.276 0 0.5-0.224 0.5-0.5v-13c0-0.276-0.224-0.5-0.5-0.5h-14z\"\u001b[39m fill\u001b[33m=\u001b[39m\u001b[32m\"#000000\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mpath\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mpath\u001b[39m d\u001b[33m=\u001b[39m\u001b[32m\"M16.5 3h-14c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h14c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z\"\u001b[39m fill\u001b[33m=\u001b[39m\u001b[32m\"#000000\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mpath\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mpath\u001b[39m d\u001b[33m=\u001b[39m\u001b[32m\"M15.5 1h-12c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z\"\u001b[39m fill\u001b[33m=\u001b[39m\u001b[32m\"#000000\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mpath\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mpath\u001b[39m d\u001b[33m=\u001b[39m\u001b[32m\"M11.5 13c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM11.5 11c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z\"\u001b[39m fill\u001b[33m=\u001b[39m\u001b[32m\"#000000\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mpath\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33mpath\u001b[39m d\u001b[33m=\u001b[39m\u001b[32m\"M14.5 8h-10c-0.276 0-0.5 0.224-0.5 0.5v7c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5-0.224 0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5zM5 13.675l1.266-1.582c0.073-0.091 0.164-0.142 0.259-0.144s0.189 0.044 0.266 0.131l2.596 2.92h-4.387v-1.325zM14 15h-3.275l-3.187-3.585c-0.272-0.306-0.651-0.476-1.039-0.466s-0.758 0.199-1.014 0.519l-0.485 0.606v-3.075h9v6z\"\u001b[39m fill\u001b[33m=\u001b[39m\u001b[32m\"#000000\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mpath\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mg\u001b[39m\u001b[33m>\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33msvg\u001b[39m\u001b[33m>\u001b[39m\u001b[33m,\u001b[39m\n \u001b[90m     | \u001b[39m          \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 111 | \u001b[39m    category\u001b[33m:\u001b[39m \u001b[32m'common'\u001b[39m\u001b[33m,\u001b[39m\n \u001b[90m 112 | \u001b[39m    keywords\u001b[33m:\u001b[39m [ __( \u001b[32m'images'\u001b[39m )\u001b[33m,\u001b[39m __( \u001b[32m'photos'\u001b[39m )\u001b[33m,\u001b[39m __( \u001b[32m'slider'\u001b[39m ) ]\u001b[33m,\u001b[39m\n \u001b[90m 113 | \u001b[39m    attributes\u001b[33m:\u001b[39m blockAttributes\u001b[33m,\u001b[39m\u001b[0m\n");

/***/ })

/******/ });
//# sourceMappingURL=block.build.js.map