/**
 * External dependencies
 */
const { filter, every, map, some } = lodash;

/**
 * WordPress dependencies
 */
const { __, setLocaleData } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { mediaUpload } = wp.editor;
const { RichText } = wp.blockEditor;
const { createBlobURL } = wp.blob;
const { G, Path, SVG } = wp.components;

/**
 * Internal dependencies
 */
import { default as edit, pickRelevantMediaFiles } from './edit';

import './style.scss';

//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

const blockAttributes = {
    images: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'ul.wp-block-oacs-slider .blocks-gallery-item',
        query: {
            url: {
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            link: {
                source: 'attribute',
                selector: 'img',
                attribute: 'data-link',
            },
            alt: {
                source: 'attribute',
                selector: 'img',
                attribute: 'alt',
                default: '',
            },
            id: {
                source: 'attribute',
                selector: 'img',
                attribute: 'data-id',
            },
            caption: {
                type: 'string',
                source: 'html',
                selector: 'figcaption',
            },
        },
    },
    ids: {
		type: 'array',
		default: [],
	},

    imageCrop: {
        type: 'boolean',
        default: true,
    },
    autoplay: {
        type: 'boolean',
        default: true,
    },
    arrows: {
        type: 'boolean',
        default: false,
    },
    dots: {
        type: 'boolean',
        default: false,
    },
    speed: {
        type: 'string',
        default: '300',
    },
    effect: {
        type: 'string',
        default: 'fade',
    },
    linkTo: {
        type: 'string',
        default: 'none',
    },
};

export const name = 'oacs/slider';

const parseShortcodeIds = ( ids ) => {
	if ( ! ids ) {
		return [];
	}

	return ids.split( ',' ).map( ( id ) => (
		parseInt( id, 10 )
	) );
};

export const settings = {
    title: __( 'Slider', 'oacs-image-slider-blocks' ),
    description: __( 'Display multiple images in an elegant slider.', 'oacs-image-slider-blocks' ),
    icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 20h-14c-0.827 0-1.5-0.673-1.5-1.5v-13c0-0.827 0.673-1.5 1.5-1.5h14c0.827 0 1.5 0.673 1.5 1.5v13c0 0.827-0.673 1.5-1.5 1.5zM2.5 5c-0.276 0-0.5 0.224-0.5 0.5v13c0 0.276 0.224 0.5 0.5 0.5h14c0.276 0 0.5-0.224 0.5-0.5v-13c0-0.276-0.224-0.5-0.5-0.5h-14z" fill="#000000"></path><path d="M16.5 3h-14c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h14c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" fill="#000000"></path><path d="M15.5 1h-12c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" fill="#000000"></path><path d="M11.5 13c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM11.5 11c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z" fill="#000000"></path><path d="M14.5 8h-10c-0.276 0-0.5 0.224-0.5 0.5v7c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5-0.224 0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5zM5 13.675l1.266-1.582c0.073-0.091 0.164-0.142 0.259-0.144s0.189 0.044 0.266 0.131l2.596 2.92h-4.387v-1.325zM14 15h-3.275l-3.187-3.585c-0.272-0.306-0.651-0.476-1.039-0.466s-0.758 0.199-1.014 0.519l-0.485 0.606v-3.075h9v6z" fill="#000000"></path></SVG>,
    category: 'common',
    keywords: [ __( 'images' ), __( 'photos' ), __( 'slider' ) ],
    attributes: blockAttributes,

    transforms: {
        from: [
            {
                type: 'block',
                isMultiBlock: true,
                blocks: [ 'core/image' ],
                transform: ( attributes ) => {
                    const validImages = filter( attributes, ( { id, url } ) => id && url );
                    if ( validImages.length > 0 ) {
                        return createBlock( 'oacs/slider', {
                            images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
							ids: validImages.map( ( { id } ) => id ),
                        } );
                    }
                    return createBlock( 'oacs/slider' );
                },
            },
            {
                type: 'shortcode',
                tag: 'gallery',
                attributes: {
                    images: {
                        type: 'array',
                        shortcode: ( { named: { ids } } ) => {
							return parseShortcodeIds( ids ).map( ( id ) => ( {
								id,
                            } ) );
                        },
                    },
                    ids: {
						type: 'array',
						shortcode: ( { named: { ids } } ) => {
							return parseShortcodeIds( ids );
						},
					},
                    linkTo: {
                        type: 'string',
                        shortcode: ( { named: { link = 'attachment' } } ) => {
                            return link === 'file' ? 'media' : link;
                        },
                    },
                },
            },
            {
                // When created by drag and dropping multiple files on an insertion point
                type: 'files',
                isMatch( files ) {
                    return files.length !== 1 && every( files, ( file ) => file.type.indexOf( 'image/' ) === 0 );
                },
                transform( files, onChange ) {
                    const block = createBlock( 'oacs/slider', {
                        images: files.map( ( file ) => pickRelevantMediaFiles( {
							url: createBlobURL( file ),
						} ) ),
                    } );
                    mediaUpload( {
                        filesList: files,
                        onFileChange: ( images ) => {
                            const imagesAttr = images.map(
								pickRelevantMediaFiles
							);
							onChange( block.clientId, {
                                ids: map( imagesAttr, 'id' ),
								images: imagesAttr,
							} );
						},
						allowedTypes: [ 'image' ],
                    } );
                    return block;
                },
            },
        ],
        to: [
            {
                type: 'block',
                blocks: [ 'core/image' ],
                transform: ( { images } ) => {
                    if ( images.length > 0 ) {
                        return images.map( ( { id, url, alt, caption } ) => createBlock( 'core/image', { id, url, alt, caption } ) );
                    }
                    return createBlock( 'core/image' );
                },
            },
        ],
    },

    edit,

    save( { attributes } ) {
        const { images, imageCrop, autoplay, arrows, dots, speed, effect, linkTo } = attributes;
        return (
            <ul className={ `${ imageCrop ? 'is-cropped' : '' }` } data-autoplay={ autoplay } data-speed={ speed } data-effect={ effect } data-arrows={ arrows } data-dots={ dots }>
                { images.map( ( image ) => {
                    let href;

                    switch ( linkTo ) {
                        case 'media':
                            href = image.url;
                            break;
                        case 'attachment':
                            href = image.link;
                            break;
                    }

                    const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

                    return (
                        <li key={ image.id || image.url } className="blocks-gallery-item">
                            <figure>
                                { href ? <a href={ href }>{ img }</a> : img }
                                { image.caption && image.caption.length > 0 && (
                                    <RichText.Content tagName="figcaption" value={ image.caption } />
                                ) }
                            </figure>
                        </li>
                    );
                } ) }
            </ul>
        );
    },
};

registerBlockType( name, settings );
