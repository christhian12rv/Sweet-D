interface UserType {
	id: number;
	name: string;
	password: string;
	email: string;
	phone: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date | null;
}

export default UserType;