export type RequestErrorType = {
	message: string;
	field: string;
}

export type RequestType = {
	success: boolean,
	status: number,
	message: string,
	errors: RequestErrorType[] | null;
}

export type GlobalStateType = {
	request: RequestType | null;
	loading: boolean;
	previousType: string | null;
}

export type GlobalActionType = {
	type: string;
};