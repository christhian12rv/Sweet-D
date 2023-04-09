import React from 'react';
import { registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FilePondStyled } from './FileUploader.styled';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

type Props = {
	files: File[];
	onChange: (value) => any;
}

export const FileUploader: React.FunctionComponent<Props> = ({ files, onChange, }) => {
	return (
		<FilePondStyled
			files={files}
			onupdatefiles={onChange}
			allowMultiple
			allowReorder
			name="files"
			labelIdle='Arraste imagens até aqui ou clique aqui para adicionar imagens'
			acceptedFileTypes={['image/*']}
		/>
	);
};