/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, sprintf, setLocaleData  } from '@wordpress/i18n';

/**
 * WordPress dependenices
 */
import { 
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import {
	Button,
	DropZone,
	FormFileUpload,
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
	ToggleControl,
	ToolbarGroup, ToolbarItem,
	withNotices,
} from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * External Dependencies
 */
import { filter, pick, get, map } from 'lodash';

/**
 * Internal dependencies
 */
import SliderImage from './slider-image';


const effectOptions = [
	{ value: 'fade', label: __( 'Fade', 'oacs-image-slider-blocks' ) },
	{ value: 'scroll', label: __( 'Scroll', 'oacs-image-slider-blocks' ) },
];

const linkOptions = [
	{ value: 'url', label: __( 'Custom URL' ) },
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

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { WPElement } Element to render.
 */
export default function Edit( 
	{ 
		attributes, 
		isSelected, 
		noticeUI, 
		image,  
		setAttributes
	} ) {

		const blockProps = useBlockProps( {
			className: attributes.imageCrop ? 'is-cropped' : ''
		} );

		let selectedImage = null;
		let captionSelected = false;
	
		const getAvailableSizes = () => {
			return get( image, [ 'media_details', 'sizes' ], {} );
		}
	
		const setTheAttributes = ( attributes ) => {
			if ( attributes.ids ) {
				throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
			}
	
			if ( attributes.images ) {
				attributes = {
					...attributes,
					ids: map( attributes.images, 'id' ),
				};
			}
	
			setAttributes( attributes );
		}
	
		const onSelectImage = ( index ) => {
			return () => {
				if ( selectedImage !== index ) {
					selectedImage = index
					console.log('selectedImage: ' + selectedImage);
				}
			};
		}
	
		const onRemoveImage = ( index ) => {
			return () => {
				const images = filter( attributes.images, ( img, i ) => index !== i );
				selectedImage = null;
				setTheAttributes( {
					images,
				} );
			};
		}
	
		const onSelectImages = ( images ) => {
			setTheAttributes( {
				images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
			} );
		}
	
		const setLinkTo = ( value ) => {
			setTheAttributes( { linkTo: value } );
		}
	
		const setSpeed = ( value ) => {
			setTheAttributes( { speed: value } );
		}
	
		const setEffect = ( value ) => {
			setTheAttributes( { effect: value } );
		}
	
		const toggleAutoplay = () => {
			setTheAttributes( { autoplay: ! attributes.autoplay } );
		}
	
		const toggleArrows = () => {
			setTheAttributes( { arrows: ! attributes.arrows } );
		}
	
		const toggleDots = () => {
			setTheAttributes( { dots: ! attributes.dots } );
		}
	
		const toggleImageCrop = () => {
			setTheAttributes( { imageCrop: ! attributes.imageCrop } );
		}

		const getImageCropHelp = ( checked ) => {
			return checked ? __( 'Thumbnails are cropped to align.' ) : __( 'Thumbnails are not cropped.' );
		}
		
		const toggleAdaptiveHeight = () => {
			setTheAttributes( { adaptiveHeight: ! attributes.adaptiveHeight } );
		}

		const togglePauseOnHover = () => {
			setTheAttributes( { pauseOnHover: ! attributes.pauseOnHover } );
		}
	
		const toggleTarget = () => {
			setTheAttributes( { target: ! attributes.target } );
		}
	
	
		const setImageAttributes = ( index, attrs ) => {
			const { images } = attributes;
			if ( ! images[ index ] ) {
				return;
			}
			setTheAttributes( {
				images: [
					...images.slice( 0, index ),
					{
						...images[ index ],
						...attrs,
					},
					...images.slice( index + 1 ),
				],
			} );
		}
	
		const uploadFromFiles = ( event ) => {
			addFiles( event.target.files );
		}
	
		const addFiles = ( files ) => {
			const currentImages = attributes.images || [];
			mediaUpload( {
				allowedTypes: ALLOWED_MEDIA_TYPES,
				filesList: files,
				onFileChange: ( images ) => {
					const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
					setTheAttributes( {
						images: currentImages.concat( imagesNormalized ),
					} );
				},
			} );
		}
	
		const componentDidUpdate = ( prevProps ) => {
			// Deselect images when deselecting the block
			if ( ! isSelected && prevProps.isSelected ) {
				
				selectedImage = null;
				captionSelected = false;
			}
		}
	
		const { images, imageCrop, adaptiveHeight, autoplay, pauseOnHover, arrows, dots, speed, effect, linkTo, target } = attributes;
	
		const dropZone = (
			<DropZone
				onFilesDrop={ addFiles }
			/>
		);
	
		const controls = (
			<BlockControls>
				{ !! images.length && (
					<ToolbarGroup>
						<ToolbarItem>
							{ () => (
								<MediaUploadCheck>
									<MediaUpload
											onSelect={ onSelectImages }
											allowedTypes={ ALLOWED_MEDIA_TYPES }
											multiple
											gallery
											value={ images.map( ( img ) => img.id ) }
											render={ ( { open } ) => (
												<Button
													onClick={ open }
													className="components-toolbar__control"
													label={ __( 'Edit Slider', 'oacs-image-slider-blocks' ) }
													isSmall
													icon="edit"
												/>
											) }
										/>
								</MediaUploadCheck>
							)}
						</ToolbarItem>
					</ToolbarGroup>
				) }
			</BlockControls>
		);

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Slider Settings', 'oacs-image-slider-blocks' ) }>
					{/* <ToggleControl
						label={ __( 'Crop Images' ) }
						checked={ !! imageCrop }
						onChange={ toggleImageCrop }
						help={ getImageCropHelp }
					/> */}
					<ToggleControl
						label={ __( 'Adaptive Height', 'oacs-image-slider-blocks') }
						checked={ !! adaptiveHeight }
						onChange={ toggleAdaptiveHeight }
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'oacs-image-slider-blocks' ) }
						checked={ !! autoplay }
						onChange={ toggleAutoplay }
					/>
					{ autoplay ?
						<ToggleControl
							label={ __( 'Pause on hover', 'oacs-image-slider-blocks' ) }
							checked={ !! pauseOnHover }
							onChange={ togglePauseOnHover }
						/>
					 	: ''
					}
					<ToggleControl
						label={ __( 'Show Arrows', 'oacs-image-slider-blocks' ) }
						checked={ !! arrows }
						onChange={ toggleArrows }
					/>
					<ToggleControl
						label={ __( 'Show Dots', 'oacs-image-slider-blocks' ) }
						checked={ !! dots }
						onChange={ toggleDots }
					/>
					<TextControl
						label={ __( 'Speed', 'oacs-image-slider-blocks' ) }
						type='number'
						min='100'
						max='500'
						value={ speed }
						onChange={ setSpeed }
					/>
					<SelectControl
						label={ __( 'Effect', 'oacs-image-slider-blocks' ) }
						value={ effect }
						onChange={ setEffect }
						options={ effectOptions }
					/>
					<SelectControl
						label={ __( 'Link To' ) }
						value={ linkTo }
						onChange={ setLinkTo }
						options={ linkOptions }
					/>
					{ linkTo !== 'none' ?
						<ToggleControl
							label={ __( 'Open link in new tab', 'oacs-image-slider-blocks' ) }
							checked={ !! target }
							onChange={ toggleTarget }
						/>
					 	: ''
					}
				</PanelBody>
			</InspectorControls>
		);
	
		if ( images.length === 0 ) {
			return (
				<div { ...blockProps }>
					<Fragment>
						{ controls }
						<MediaPlaceholder
							icon="format-gallery"
							labels={ {
								title: __( 'Slider', 'oacs-image-slider-blocks' ),
								instructions: __( 'Drag images, upload new ones or select files from your library.', 'oacs-image-slider-blocks' ),
							} }
							onSelect={ onSelectImages }
							accept="image/*"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							multiple
							notices={ noticeUI }
						/>
					</Fragment>
				</div>
			);
		}

		return (
			<Fragment>
				{ controls }
				{ inspectorControls }
				{ noticeUI }
				<ul {...blockProps} >
					{ dropZone }
					{ images.map( ( img, index ) => {	
						return (
							<li className="blocks-gallery-item" key={ img.id || img.url }>
								<SliderImage
									url={ img.url }
									alt={ img.alt }
									id={ img.id }
									onRemove={ onRemoveImage( index ) }
									onSelect={ onSelectImage( index ) }
									isSelected={ isSelected }
									// isSelected={ isSelected && selectedImage === index }
									setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
									caption={ img.caption }
									link={ img.link }
									linkTo={ linkTo }
								/>
							</li>
						);
					} ) }
				</ul>
			</Fragment>
		);

};
