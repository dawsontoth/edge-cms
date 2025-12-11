import {tables} from 'harperdb';

export class script_revision extends tables.script_revision {
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
