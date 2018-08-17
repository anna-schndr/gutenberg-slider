/**
 * External dependencies
 */
const { filter, every } = lodash;

/**
 * WordPress dependencies
 */
const { __, setLocaleData } = wp.i18n;
const {    createBlock, registerBlockType } = wp.blocks;
const { RichText, mediaUpload } = wp.editor;
const { createBlobURL } = wp.blob;

/**
 * Internal dependencies
 */
import { default as edit } from './edit';
//import './style.scss';

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
                type: 'array',
                source: 'children',
                selector: 'figcaption',
            },
        },
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

export const settings = {
    title: __( 'Slider', 'gutenberg-slider' ),
    description: __( 'Display multiple images in an elegant slider.', 'gutenberg-slider' ),
    icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><g><path d="M20 4v12H8V4h12m0-2H8L6 4v12l2 2h12l2-2V4l-2-2z" /><path d="M12 12l1 2 3-3 3 4H9z" /><path d="M2 6v14l2 2h14v-2H4V6H2z" /></g></svg>,
    category: 'common',
    keywords: [ __( 'images' ), __( 'photos' ) ],
    attributes: blockAttributes,

    transforms: {
        from: [
            {
                type: 'block',
                isMultiBlock: true,
                blocks: [ 'occ/slider' ],
                transform: ( attributes ) => {
                    const validImages = filter( attributes, ( { id, url } ) => id && url );
                    if ( validImages.length > 0 ) {
                        return createBlock( 'occ/slider', {
                            images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
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
                            if ( ! ids ) {
                                return [];
                            }

                            return ids.split( ',' ).map( ( id ) => ( {
                                id: parseInt( id, 10 ),
                            } ) );
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
                        images: files.map( ( file ) => ( { url: createBlobURL( file ) } ) ),
                    } );
                    mediaUpload( {
                        filesList: files,
                        onFileChange: ( images ) => onChange( block.clientId, { images } ),
                        allowedType: 'image',
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
