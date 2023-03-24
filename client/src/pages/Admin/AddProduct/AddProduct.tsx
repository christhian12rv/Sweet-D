import { FormControl, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ProductType from '../../../types/Product/ProductType';
import { BoxTextEditor } from './AddProduct.styled';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const lang = {
	code: 'pt_br',
	toolbar: {
		default: 'Padrão',
		save: 'Salvar',
		font: 'Fonte',
		formats: 'Formatos',
		fontSize: 'Tamanho',
		bold: 'Negrito',
		underline: 'Sublinhado',
		italic: 'Itálico',
		strike: 'Riscado',
		subscript: 'Subescrito',
		superscript: 'Sobrescrito',
		removeFormat: 'Remover Formatação',
		fontColor: 'Cor da Fonte',
		hiliteColor: 'Cor de destaque',
		indent: 'Recuo',
		outdent: 'Avançar',
		align: 'Alinhar',
		alignLeft: 'Alinhar à esquerda',
		alignRight: 'Alinhar à direita',
		alignCenter: 'Centralizar',
		alignJustify: 'Justificar',
		list: 'Lista',
		orderList: 'Lista ordenada',
		unorderList: 'Lista desordenada',
		horizontalRule: 'Linha horizontal',
		hr_solid: 'sólida',
		hr_dotted: 'pontilhada',
		hr_dashed: 'tracejada',
		table: 'Tabela',
		link: 'Link',
		math: 'Matemática',
		image: 'Imagem',
		video: 'Vídeo',
		audio: 'Áudio',
		fullScreen: 'Tela cheia',
		showBlocks: 'Mostrar blocos',
		codeView: 'Mostrar códigos',
		undo: 'Voltar',
		redo: 'Refazer',
		preview: 'Prever',
		print: 'Imprimir',
		tag_p: 'Paragráfo',
		tag_div: '(DIV) Normal',
		tag_h: 'Cabeçalho',
		tag_blockquote: 'Citar',
		tag_pre: 'Código',
		template: 'Modelo',
		lineHeight: 'Altura da linha',
		paragraphStyle: 'Estilo do parágrafo',
		textStyle: 'Estilo do texto',
		imageGallery: 'Galeria de imagens',
		dir_ltr: 'Esquerda para direita',
		dir_rtl: 'Direita para esquerda',
		mention: 'Menção',
	},
	dialogBox: {
		linkBox: {
			title: 'Inserir link',
			url: 'URL para link',
			text: 'Texto a mostrar',
			newWindowCheck: 'Abrir em nova guia',
			downloadLinkCheck: 'Link para Download',
			bookmark: 'marcar páginas',
		},
		mathBox: {
			title: 'Matemática',
			inputLabel: 'Notação matemática',
			fontSizeLabel: 'Tamanho',
			previewLabel: 'Prever',
		},
		imageBox: {
			title: 'Inserir imagens',
			file: 'Selecionar arquivos',
			url: 'URL da imagem',
			altText: 'Texto alternativo',
		},
		videoBox: {
			title: 'Inserir vídeo',
			file: 'Selecionar arquivos',
			url: 'URL do YouTube/Vimeo',
		},
		audioBox: {
			title: 'Inserir áudio',
			file: 'Selecionar arquivos',
			url: 'URL da áudio',
		},
		browser: {
			tags: 'Tag',
			search: 'Procurar',
		},
		caption: 'Inserir descrição',
		close: 'Fechar',
		submitButton: 'Enviar',
		revertButton: 'Reverter',
		proportion: 'Restringir proporções',
		basic: 'Básico',
		left: 'Esquerda',
		right: 'Direita',
		center: 'Centro',
		width: 'Largura',
		height: 'Altura',
		size: 'Tamanho',
		ratio: 'Proporções',
	},
	controller: {
		edit: 'Editar',
		unlink: 'Remover link',
		remove: 'Remover',
		insertRowAbove: 'Inserir linha acima',
		insertRowBelow: 'Inserir linha abaixo',
		deleteRow: 'Deletar linha',
		insertColumnBefore: 'Inserir coluna antes',
		insertColumnAfter: 'Inserir coluna depois',
		deleteColumn: 'Deletar coluna',
		fixedColumnWidth: 'Largura fixa da coluna',
		resize100: 'Redimensionar para 100%',
		resize75: 'Redimensionar para 75%',
		resize50: 'Redimensionar para 50%',
		resize25: 'Redimensionar para 25%',
		autoSize: 'Tamanho automático',
		mirrorHorizontal: 'Espelho, Horizontal',
		mirrorVertical: 'Espelho, Vertical',
		rotateLeft: 'Girar para esquerda',
		rotateRight: 'Girar para direita',
		maxSize: 'Tam máx',
		minSize: 'Tam mín',
		tableHeader: 'Cabeçalho da tabela',
		mergeCells: 'Mesclar células',
		splitCells: 'Dividir células',
		HorizontalSplit: 'Divisão horizontal',
		VerticalSplit: 'Divisão vertical',
	},
	menu: {
		spaced: 'Espaçado',
		bordered: 'Com borda',
		neon: 'Neon',
		translucent: 'Translúcido',
		shadow: 'Sombreado',
		code: 'Código',
	},
};


export const AddProduct: React.FunctionComponent = () => {
	const [product, setProduct] = useState<ProductType>({
		id: 0,
		name: '',
		description: '',
		photos: '',
		slug: '',
		active: true,
		createdAt: new Date(),
		updatedAt: null,
		sizes: [],
		ingredients: [],
		ingredientTypes: [],
	});

	const handleEditorChange = (value): void => {
		handleChangeProduct('description', value);
	};

	const handleChangeProduct = (property, value): void => {
		setProduct({ ...product, [property]: value, });
	};
	

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Typography variant="h4">Adicionar produto</Typography>

			<FormControl>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Nome"
							type="text"
							value={product.name}
							onChange={(event): any => handleChangeProduct('name', event.target.value)}
							fullWidth
							sx={{ minHeight: 56, }}/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							label="Slug"
							type="text"
							value={product.slug}
							onChange={(event): any => handleChangeProduct('slug', event.target.value)}
							fullWidth
							sx={{ minHeight: 56, }}/>
					</Grid>

					<Grid item xs={12} md={12}>
						<BoxTextEditor component="div">
							<SunEditor onChange={handleEditorChange} lang={lang} setOptions={{
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
						</BoxTextEditor>
						{/* <TextField
							label="Descrição"
							type="text"
							multiline
							rows={5}
							value={product.description}
							onChange={(event): any => handleChangeProduct('description', event.target.value)}
							InputProps={{ inputProps: { min: 1, }, }}
							fullWidth/> */}
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							label="Nome"
							type="text"
							value={product.name}
							onChange={(event): any => handleChangeProduct('name', event.target.value)}
							InputProps={{ inputProps: { min: 1, }, }}
							fullWidth/>
					</Grid>
				</Grid>
			</FormControl>
		</Grid>
	);
};