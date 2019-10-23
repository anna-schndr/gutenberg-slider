/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { Component, Fragment } = wp.element;
const { IconButton, Spinner } = wp.components;
const { __, setLocaleData } = wp.i18n;
const { BACKSPACE, DELETE } = wp.keycodes;
const { withSelect } = wp.data;
const { RichText } = wp.editor;
const { isBlobURL } = wp.blob;

//setLocaleData( window.gutenberg_slider.localeData, 'oacs-image-slider-blocks' );

class SliderImage extends Component {
    constructor() {
        super( ...arguments );

        this.onImageClick = this.onImageClick.bind( this );
        this.onSelectCaption = this.onSelectCaption.bind( this );
        this.onKeyDown = this.onKeyDown.bind( this );
        this.bindContainer = this.bindContainer.bind( this );

        this.state = {
            captionSelected: false,
        };
    }

    bindContainer( ref ) {
        this.container = ref;
    }

    onSelectCaption() {
        if ( ! this.state.captionSelected ) {
            this.setState( {
                captionSelected: true,
            } );
        }

        if ( ! this.props.isSelected ) {
            this.props.onSelect();
        }
    }

    onImageClick() {
        if ( ! this.props.isSelected ) {
            this.props.onSelect();
        }

        if ( this.state.captionSelected ) {
            this.setState( {
                captionSelected: false,
            } );
        }
    }

    onKeyDown( event ) {
        if (
            this.container === document.activeElement &&
            this.props.isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
        ) {
            event.stopPropagation();
            event.preventDefault();
            this.props.onRemove();
        }
    }

    componentDidUpdate( prevProps ) {
        const { isSelected, image, url } = this.props;
        if ( image && ! url ) {
            this.props.setAttributes( {
                url: image.source_url,
                alt: image.alt_text,
            } );
        }

        // unselect the caption so when the user selects other image and comeback
        // the caption is not immediately selected
        if ( this.state.captionSelected && ! isSelected && prevProps.isSelected ) {
            this.setState( {
                captionSelected: false,
            } );
        }
    }

    render() {
        const { url, alt, id, linkTo, link, isSelected, caption, onRemove, setAttributes, 'aria-label': ariaLabel } = this.props;

        let href;

        switch ( linkTo ) {
            case 'media':
                href = url;
                break;
            case 'attachment':
                href = link;
                break;
        }

		const img = (
			// Disable reason: Image itself is not meant to be interactive, but should
			// direct image selection and unfocus caption fields.
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
			<Fragment>
				<img
					src={ url }
					alt={ alt }
					data-id={ id }
					onClick={ this.onImageClick }
					tabIndex="0"
					onKeyDown={ this.onImageClick }
					aria-label={ ariaLabel }
				/>
				{ isBlobURL( url ) && <Spinner /> }
			</Fragment>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		);

        const className = classnames( {
            'is-selected': isSelected,
            'is-transient': isBlobURL( url ),
        } );

        // Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
        return (
            <figure className={ className } tabIndex="-1" onKeyDown={ this.onKeyDown } ref={ this.bindContainer }>
                { isSelected &&
                    <div className="block-library-gallery-item__inline-menu">
                        <IconButton
                            icon="no-alt"
                            onClick={ onRemove }
                            className="blocks-gallery-item__remove"
                            label={ __( 'Remove Image' ) }
                        />
                    </div>
                }
                { href ? <a href={ href }>{ img }</a> : img }
                { ( ! RichText.isEmpty( caption ) || isSelected ) ? (
                    <RichText
                        tagName="figcaption"
                        placeholder={ __( 'Write caption…' ) }
                        value={ caption }
                        isSelected={ this.state.captionSelected }
                        onChange={ ( newCaption ) => setAttributes( { caption: newCaption } ) }
                        unstableOnFocus={ this.onSelectCaption }
                        inlineToolbar
                    />
                ) : null }
            </figure>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
}

export default withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { id } = ownProps;

    return {
        image: id ? getMedia( id ) : null,
    };
} )( SliderImage );
