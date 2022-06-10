import Edit from './edit';
import save from './save';
import { blockAttributes } from './blockAttributes'
import icons from './icons'

const parseShortcodeIds = ( ids ) => {
	if ( ! ids ) {
		return [];
	}

	return ids.split( ',' ).map( ( id ) => (
		parseInt( id, 10 )
	) );
};

export const settings = {
    icon: icons.imageSlider,
    attributes: blockAttributes,

    /**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
};