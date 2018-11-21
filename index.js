/**
 * External dependencies
 */
const { filter, every, map, some } = lodash;

/**
 * WordPress dependencies
 */
const { __, setLocaleData } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { RichText, mediaUpload } = wp.editor;
const { createBlobURL } = wp.blob;
const { G, Path, SVG } = wp.components;

/**
 * Internal dependencies
 */
import { default as edit, pickRelevantMediaFiles } from './edit';

import './style.scss';

setLocaleData( window.gutenberg_slider.localeData, 'gutenberg-slider' );

const blockAttributes = {
    images: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'ul.wp-block-occ-slider .blocks-gallery-item',
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

export const name = 'occ/slider';

const parseShortcodeIds = ( ids ) => {
	if ( ! ids ) {
		return [];
	}

	return ids.split( ',' ).map( ( id ) => (
		parseInt( id, 10 )
	) );
};

export const settings = {
    title: __( 'Slider', 'gutenberg-slider' ),
    description: __( 'Display multiple images in an elegant slider.', 'gutenberg-slider' ),
    icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0z" /><Path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></SVG>,
    category: 'common',
    keywords: [ __( 'images' ), __( 'photos' ) ],
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
                        return createBlock( 'occ/slider', {
                            images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
							ids: validImages.map( ( { id } ) => id ),
                        } );
                    }
                    return createBlock( 'occ/slider' );
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
                    const block = createBlock( 'occ/slider', {
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
        const { images, imageCrop, autoplay, speed, effect, linkTo } = attributes;
        return (
            <ul className={ `${ imageCrop ? 'is-cropped' : '' }` } data-autoplay={ autoplay } data-speed={ speed } data-effect={ effect }>
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
