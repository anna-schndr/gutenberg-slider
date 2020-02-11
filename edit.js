/**
 * External Dependencies
 */
const { filter, pick, get, map } = lodash;

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

//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

const effectOptions = [
    { value: 'fade', label: __( 'Fade', 'oacs-image-slider-blocks' ) },
    { value: 'scroll', label: __( 'Scroll', 'oacs-image-slider-blocks' ) },
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
        this.toggleArrows = this.toggleArrows.bind( this );
        this.toggleDots = this.toggleDots.bind( this );
        this.toggleImageCrop = this.toggleImageCrop.bind( this );
        this.onRemoveImage = this.onRemoveImage.bind( this );
        this.setImageAttributes = this.setImageAttributes.bind( this );
        this.addFiles = this.addFiles.bind( this );
        this.uploadFromFiles = this.uploadFromFiles.bind( this );
        this.setAttributes = this.setAttributes.bind( this );

        this.state = {
            selectedImage: null,
        };
    }

    getAvailableSizes() {
        return get( this.props.image, [ 'media_details', 'sizes' ], {} );
    }

    setAttributes( attributes ) {
		if ( attributes.ids ) {
			throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: map( attributes.images, 'id' ),
			};
		}

		this.props.setAttributes( attributes );
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
            this.setAttributes( {
                images,
            } );
        };
    }

    onSelectImages( images ) {
        //.log(JSON.stringify(images));
        this.props.setAttributes( {
            images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
        } );
    }

    setLinkTo( value ) {
        this.setAttributes( { linkTo: value } );
    }

    setSpeed( value ) {
        this.setAttributes( { speed: value } );
    }

    setEffect( value ) {
        this.setAttributes( { effect: value } );
    }

    toggleAutoplay() {
        this.setAttributes( { autoplay: ! this.props.attributes.autoplay } );
    }

    toggleArrows() {
        this.setAttributes( { arrows: ! this.props.attributes.arrows } );
    }

    toggleDots() {
        this.setAttributes( { dots: ! this.props.attributes.dots } );
    }

    toggleImageCrop() {
        this.setAttributes( { imageCrop: ! this.props.attributes.imageCrop } );
    }

    getImageCropHelp( checked ) {
        return checked ? __( 'Thumbnails are cropped to align.' ) : __( 'Thumbnails are not cropped.' );
    }

    setImageAttributes( index, attributes ) {
        const { attributes: { images } } = this.props;
		const { setAttributes } = this;
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
        const { noticeOperations } = this.props;
		const { setAttributes } = this;
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
        const { images, imageCrop, autoplay, arrows, dots, speed, effect, linkTo } = attributes;

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
                                    label={ __( 'Edit Slider', 'oacs-image-slider-blocks' ) }
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
                            title: __( 'Slider', 'oacs-image-slider-blocks' ),
                            instructions: __( 'Drag images, upload new ones or select files from your library.', 'oacs-image-slider-blocks' ),
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

        //console.log(JSON.stringify(images));
        
        return (
            <Fragment>
                { controls }
                <InspectorControls>
                    <PanelBody title={ __( 'Slider Settings', 'oacs-image-slider-blocks' ) }>
                        <ToggleControl
                            label={ __( 'Crop Images' ) }
                            checked={ !! imageCrop }
                            onChange={ this.toggleImageCrop }
                            help={ this.getImageCropHelp }
                        />
                        <ToggleControl
                            label={ __( 'Autoplay', 'oacs-image-slider-blocks' ) }
                            checked={ !! autoplay }
                            onChange={ this.toggleAutoplay }
                        />
                        <ToggleControl
                            label={ __( 'Show Arrows', 'oacs-image-slider-blocks' ) }
                            checked={ !! arrows }
                            onChange={ this.toggleArrows }
                        />
                        <ToggleControl
                            label={ __( 'Show Dots', 'oacs-image-slider-blocks' ) }
                            checked={ !! dots }
                            onChange={ this.toggleDots }
                        />
                        <TextControl
                            label={ __( 'Speed', 'oacs-image-slider-blocks' ) }
                            type='number'
                            min='100'
                            max='500'
                            value={ speed }
                            onChange={ this.setSpeed }
                        />
                        <SelectControl
                            label={ __( 'Effect', 'oacs-image-slider-blocks' ) }
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
