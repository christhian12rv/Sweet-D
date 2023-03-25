import { Box } from '@mui/material';
import React from 'react';
import SunEditor from 'suneditor-react';
import ptBrLang from './ptBrLang';

type Props = {
	placeholder: string | undefined;
	defaultValue: any | undefined;
	onChange: (value) => any;
};

export const RichTextEditor: React.FunctionComponent<Props> = ({ placeholder, defaultValue, onChange, }) => {
	return (
		<Box component="div" sx={{
			'& .sun-editor, & .se-toolbar, & .se-container': {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
			},
			'& .se-toolbar, & .se-resizing-bar': {
				backgroundColor: '#ffff',
			},
			'& .se-wrapper-wysiwyg': {
				minHeight: '210px !important',
				height: 'auto !important',
			},
		}}>
			<SunEditor placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} lang={ptBrLang} setOptions={{
				mode: 'classic',
				buttonList: [
					['undo',
						'redo',
						'fontSize',
						'paragraphStyle',
						'blockquote',
						'bold',
						'underline',
						'italic',
						'strike',
						'subscript',
						'superscript',
						'fontColor',
						'hiliteColor',
						'textStyle',
						'removeFormat',
						'outdent',
						'indent',
						'align',
						'horizontalRule',
						'list',
						'lineHeight',
						'table',
						'link',
						'fullScreen']
				],
			}} />
		</Box>
	);
};