<?php
/*
  Plugin Name: Image Slider Block
  Description: A Gutenberg Image Slider
  Version: 1.0
  Author: Anna Schneider
  Author URI: https://annaschneider.me
  Text Domain: oacs-oacs-image-slider-blocks
  License: GPLv2 or later

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as 
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class Gutenberg_Slider {

    /**
     * Plugin instance.
     *
     * @since 1.0
     *
     */
    protected static $instance = null;


    /**
     * Access this plugin’s working instance
     *
     * @since 1.0
     *
     */
    public static function get_instance() {
        
        if ( !self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;

    }

    
    /**
     * Used for regular plugin work.
     *
     * @since 1.0
     *
     */
    public function plugin_setup() {

          $this->includes();

        add_action( 'init', array( $this, 'load_language' ) );
        add_action( 'init', array( $this, 'register_block' ) );
    
    }

    
    /**
     * Constructor. Intentionally left empty and public.
     *
     * @since 1.0
     *
     */
    public function __construct() {}
    
    
     /**
     * Includes required core files used in admin and on the frontend.
     *
     * @since 1.0
     *
     */
    protected function includes() {}


    /**
     * Loads language
     *
     * @since 1.0
     *
     */
    function load_language() {
        load_plugin_textdomain( 'oacs-image-slider-blocks', '', dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }


    /**
     * Registers block
     *
     * @since 1.0
     *
     */
    function register_block() {

        if ( ! function_exists( 'register_block_type' ) ) {
            // Gutenberg is not active.
            return;
        }

        wp_register_style(
            'oacs-image-slider-blocks',
            plugins_url( 'css/editor.css', __FILE__ ),
            array( 'wp-edit-blocks' ),
            filemtime( plugin_dir_path( __FILE__ ) . 'css/editor.css' )
        );
        wp_enqueue_style( 'oacs-image-slider-blocks');

        if ( !is_admin() ) {
            wp_register_style(
                'slick',
                plugins_url( 'css/slick.css', __FILE__ ),
                array(),
                filemtime( plugin_dir_path( __FILE__ ) . 'css/slick.css' )
            );
            wp_enqueue_style( 'slick');
        }

        wp_register_style(
            'oacs-image-slider-blocks-frontend',
            plugins_url( 'css/style.css', __FILE__ ),
            array(),
            filemtime( plugin_dir_path( __FILE__ ) . 'css/style.css' )
        );
        wp_enqueue_style( 'oacs-image-slider-blocks-frontend');
        
        if ( !is_admin() ) {
            wp_register_script(
                'slick',
                plugins_url( 'js/slick.min.js', __FILE__ ),
                array(),
                filemtime( plugin_dir_path( __FILE__ ) . 'js/slick.min.js' ),
                true
            );
            wp_enqueue_script('slick');
        }
        
        wp_register_script(
            'oacs-image-slider-blocks-frontend',
            plugins_url( 'js/frontend.js', __FILE__ ),
            array(),
            filemtime( plugin_dir_path( __FILE__ ) . 'js/frontend.js' ),
            true
        );
        wp_enqueue_script('oacs-image-slider-blocks-frontend');
        
        wp_register_script(
            'oacs-image-slider-blocks',
            plugins_url( 'block.build.js', __FILE__ ),
            array( 'lodash', 'wp-blob', 'wp-blocks', 'wp-components', 'wp-data', 'wp-editor', 'wp-element', 'wp-i18n', 'wp-keycodes' ),
            filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
        );

        register_block_type( 'oacs/slider', array(
            'editor_style'  => 'oacs-image-slider-blocks',
            'editor_script' => 'oacs-image-slider-blocks',
            'style' => 'oacs-image-slider-blocks-frontend',
            'script' => 'oacs-image-slider-blocks-frontend',
        ) );

        /*wp_add_inline_script(
            'oacs-image-slider-blocks',
            sprintf( 
                'var gutenberg_slider = { localeData: %s };', 
                json_encode( wp_get_jed_locale_data( 'oacs-image-slider-blocks' ) ) 
            ),
            'before'
        );*/

        wp_set_script_translations( 'oacs-image-slider-blocks', 'oacs-image-slider-blocks', plugin_dir_path( __FILE__ ) . 'languages' );

    }

}

add_action( 'plugins_loaded', array( Gutenberg_Slider::get_instance(), 'plugin_setup' ) );

?>