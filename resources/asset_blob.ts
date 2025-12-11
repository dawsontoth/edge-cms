import {tables} from 'harperdb';

export class asset_blob extends tables.asset_blob {
	static loadAsInstance = false;

	allowRead(user, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowCreate(user, newData, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowUpdate(user, updatedData, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}

	allowDelete(user, target) {
		return !!user && !!user.active && user?.role?.role === 'super_user';
	}
}
