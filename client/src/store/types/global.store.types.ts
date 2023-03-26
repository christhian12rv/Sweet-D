export type RequestType = {
	success: boolean,
	status: number,
	message: string,
	errors: string[] | null;
}

export type GlobalStateType = {
	request: RequestType;
	loading: boolean;
}

export type GlobalActionType = {
	type: string;
};