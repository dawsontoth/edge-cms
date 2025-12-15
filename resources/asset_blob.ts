import {tables, User} from 'harperdb';

export class asset_blob extends tables.asset_blob {
	static loadAsInstance = false;

	allowRead(user: User, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowCreate(user: User, newData, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowUpdate(user: User, updatedData, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowDelete(user: User, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}
}

// TODO: Hacky way of table discoverability (methods at least, stuff that isn't schema dependant)
// TODO: Generation of stronger types from the schema, and a CLI to do it? Which would work with the cloud version how?...
