export type GlobalStateType = {
	error?: GlobalErrorType;
	loading: boolean;
}

export type GlobalActionType = {
	type: string;
};

export type GlobalErrorType = {
	message: string,
	status: number;
	array?: string[]
}