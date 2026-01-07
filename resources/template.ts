import {Context, RequestTarget, ResourceInterface, tables, User} from 'harperdb';

interface Template {
	id: string;
	name: string;
	description?: string;
	content: string;
	createdDate?: Date;
	updatedAt?: Date;
}

export class template extends tables.template<Template> {
	static loadAsInstance = false;

	private isAdmin(user?: User) {
		const role = user?.role;
		return !!user?.active && (role?.role === 'admin' || role?.role === 'super_user' || role?.permission?.super_user);
	}

	allowRead(user: User, target: RequestTarget, context: Context) {
		return true;
	}

	allowCreate(user: User, record: Template, context: Context) {
		return this.isAdmin(user);
	}

	allowUpdate(user: User, record: Template, context: Context) {
		return this.isAdmin(user);
	}

	allowDelete(user: User, target: RequestTarget, context: Context) {
		return this.isAdmin(user);
	}
}
