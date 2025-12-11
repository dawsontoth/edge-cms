import {tables} from 'harperdb';

export class script extends tables.script {
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
