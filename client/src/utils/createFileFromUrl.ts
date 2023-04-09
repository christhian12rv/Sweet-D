export default async (url, name): Promise<File> => {
	const response = await fetch(url);
	const data = await response.blob();
	const metadata = {
		type: 'image/jpeg',
	};
	const file = new File([data], name, metadata);
	return file;
};