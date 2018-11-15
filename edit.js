/**
 * External Dependencies
 */
const { filter, pick, get } = lodash;

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { __, sprintf, setLocaleData } = wp.i18n;
const {
    IconButton,
    DropZone,
    FormFileUpload,
    PanelBody,
    RangeControl,
    TextControl,
    SelectControl,
    ToggleControl,
    Toolbar,
    withNotices,
} = wp.components;
const {
    BlockControls,
    MediaUpload,
    MediaPlaceholder,
    InspectorControls,
    mediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import SliderImage from './slider-image';

import './editor.scss';

setLocaleData( window.gutenberg_slider.localeData, 'gutenberg-slider' );

const effectOptions = [
    { value: 'fade', label: __( 'Fade', 'gutenberg-slider' ) },
    { value: 'scroll', label: __( 'Scroll', 'gutenberg-slider' ) },
];

const linkOptions = [
    { value: 'attachment', label: __( 'Attachment Page' ) },
    { value: 'media', label: __( 'Media File' ) },
    { value: 'none', label: __( 'None' ) },
];
const ALLOWED_MEDIA_TYPES = [ 'image' ];

export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );
	imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;
	return imageProps;
};

class SliderEdit extends Component {
    constructor() {
        super( ...arguments );

        this.getAvailableSizes = this.getAvailableSizes.bind( this );

        this.onSelectImage = this.onSelectImage.bind( this );
        this.onSelectImages = this.onSelectImages.bind( this );
        this.setLinkTo = this.setLinkTo.bind( this );
        this.setSpeed = this.setSpeed.bind( this );
        this.setEffect = this.setEffect.bind( this );
        this.toggleAutoplay = this.toggleAutoplay.bind( this );
        this.toggleImageCrop = this.toggleImageCrop.bind( this );
        this.onRemoveImage = this.onRemoveImage.bind( this );
        this.setImageAttributes = this.setImageAttributes.bind( this );
        this.addFiles = this.addFiles.bind( this );
        this.uploadFromFiles = this.uploadFromFiles.bind( this );

        this.state = {
            selectedImage: null,
        };
    }

    getAvailableSizes() {
        return get( this.props.image, [ 'media_details', 'sizes' ], {} );
    }

    onSelectImage( index ) {
        return () => {
            if ( this.state.selectedImage !== index ) {
                this.setState( {
                    selectedImage: index,
                } );
            }
        };
    }

    onRemoveImage( index ) {
        return () => {
            const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
            this.setState( { selectedImage: null } );
            this.props.setAttributes( {
                images,
            } );
        };
    }

    onSelectImages( images ) {
        console.log(JSON.stringify(images));
        this.props.setAttributes( {
            images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
        } );
    }

    setLinkTo( value ) {
        this.props.setAttributes( { linkTo: value } );
    }

    setSpeed( value ) {
        this.props.setAttributes( { speed: value } );
    }

    setEffect( value ) {
        this.props.setAttributes( { effect: value } );
    }

    toggleAutoplay() {
        this.props.setAttributes( { autoplay: ! this.props.attributes.autoplay } );
    }

    toggleImageCrop() {
        this.props.setAttributes( { imageCrop: ! this.props.attributes.imageCrop } );
    }

    getImageCropHelp( checked ) {
        return checked ? __( 'Thumbnails are cropped to align.' ) : __( 'Thumbnails are not cropped.' );
    }

    setImageAttributes( index, attributes ) {
        const { attributes: { images }, setAttributes } = this.props;
        if ( ! images[ index ] ) {
            return;
        }
        setAttributes( {
            images: [
                ...images.slice( 0, index ),
                {
                    ...images[ index ],
                    ...attributes,
                },
                ...images.slice( index + 1 ),
            ],
        } );
    }

    uploadFromFiles( event ) {
        this.addFiles( event.target.files );
    }

    addFiles( files ) {
        const currentImages = this.props.attributes.images || [];
        const { noticeOperations, setAttributes } = this.props;
        mediaUpload( {
            allowedTypes: ALLOWED_MEDIA_TYPES,
            filesList: files,
            onFileChange: ( images ) => {
                const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
                setAttributes( {
                    images: currentImages.concat( imagesNormalized ),
                } );
            },
            onError: noticeOperations.createErrorNotice,
        } );
    }

    componentDidUpdate( prevProps ) {
        // Deselect images when deselecting the block
        if ( ! this.props.isSelected && prevProps.isSelected ) {
            this.setState( {
                selectedImage: null,
                captionSelected: false,
            } );
        }
    }

    render() {
        const { attributes, isSelected, className, noticeOperations, noticeUI } = this.props;
        const { images, imageCrop, autoplay, speed, effect, linkTo } = attributes;

        const dropZone = (
            <DropZone
                onFilesDrop={ this.addFiles }
            />
        );

        const controls = (
            <BlockControls>
                { !! images.length && (
                    <Toolbar>
                        <MediaUpload
                            onSelect={ this.onSelectImages }
                            allowedTypes={ ALLOWED_MEDIA_TYPES }
                            multiple
                            gallery
                            value={ images.map( ( img ) => img.id ) }
                            render={ ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit Slider', 'gutenberg-slider' ) }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                ) }
            </BlockControls>
        );

        if ( images.length === 0 ) {
            return (
                <Fragment>
                    { controls }
                    <MediaPlaceholder
                        icon="format-gallery"
                        className={ className }
                        labels={ {
                            title: __( 'Slider', 'gutenberg-slider' ),
                            instructions: __( 'Drag images, upload new ones or select files from your library.', 'gutenberg-slider' ),
                        } }
                        onSelect={ this.onSelectImages }
                        accept="image/*"
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        multiple
                        notices={ noticeUI }
                        onError={ noticeOperations.createErrorNotice }
                    />
                </Fragment>
            );
        }

        console.log(JSON.stringify(images));
        
        return (
            <Fragment>
                { controls }
                <InspectorControls>
                    <PanelBody title={ __( 'Slider Settings', 'gutenberg-slider' ) }>
                        <ToggleControl
                            label={ __( 'Crop Images' ) }
                            checked={ !! imageCrop }
                            onChange={ this.toggleImageCrop }
                            help={ this.getImageCropHelp }
                        />
                        <ToggleControl
                            label={ __( 'Autoplay', 'gutenberg-slider' ) }
                            checked={ !! autoplay }
                            onChange={ this.toggleAutoplay }
                        />
                        <TextControl
                            label={ __( 'Speed', 'gutenberg-slider' ) }
                            type='number'
                            min='100'
                            max='500'
                            value={ speed }
                            onChange={ this.setSpeed }
                        />
                        <SelectControl
                            label={ __( 'Effect', 'gutenberg-slider' ) }
                            value={ effect }
                            onChange={ this.setEffect }
                            options={ effectOptions }
                        />
                        <SelectControl
                            label={ __( 'Link To' ) }
                            value={ linkTo }
                            onChange={ this.setLinkTo }
                            options={ linkOptions }
                        />
                    </PanelBody>
                </InspectorControls>
                { noticeUI }
                <ul className={ `${ className } ${ imageCrop ? 'is-cropped' : '' }` }>
                    { dropZone }
                    { images.map( ( img, index ) => {
   						/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
						const ariaLabel = __( sprintf( 'image %1$d of %2$d in slider', ( index + 1 ), images.length ) );

						return (
                            <li className="blocks-gallery-item" key={ img.id || img.url }>
                                <SliderImage
                                    url={ img.url }
                                    alt={ img.alt }
                                    id={ img.id }
                                    isSelected={ isSelected && this.state.selectedImage === index }
                                    onRemove={ this.onRemoveImage( index ) }
                                    onSelect={ this.onSelectImage( index ) }
                                    setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
                                    caption={ img.caption }
                                    aria-label={ ariaLabel }
                                />
                            </li>
                        );
                    } ) }
                    { isSelected &&
                        <li className="blocks-gallery-item has-add-item-button">
                            <FormFileUpload
                                multiple
                                isLarge
                                className="block-library-gallery-add-item-button"
                                onChange={ this.uploadFromFiles }
                                accept="image/*"
                                icon="insert"
                            >
                                { __( 'Upload an image' ) }
                            </FormFileUpload>
                        </li>
                    }
                </ul>
            </Fragment>
        );
    }
}

export default withNotices( SliderEdit );