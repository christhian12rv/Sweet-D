import { Box } from '@mui/material';
import React from 'react';
import SunEditor from 'suneditor-react';
import ptBrLang from './ptBrLang';

type Props = {
	error?: boolean | undefined;
	placeholder: string | undefined;
	defaultValue: any | undefined;
	onChange: (value) => any;
};

export const RichTextEditor: React.FunctionComponent<Props> = ({ error, placeholder, defaultValue, onChange, }) => {
	return (
		<Box component="div" sx={(theme): object => ({
			'& .sun-editor, & .se-toolbar, & .se-container': {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
			},
			'& .sun-editor': {
				...(error && { borderColor: theme.palette.error.main, }),
				overflow: 'hidden',
			},
			'& .se-toolbar, & .se-resizing-bar': {
				backgroundColor: '#ffff',
			},
			'& .se-wrapper-wysiwyg': {
				minHeight: '210px !important',
				height: 'auto !important',
			},
		})}>
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