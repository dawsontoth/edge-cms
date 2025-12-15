import {RecordObject, RequestTarget, RequestTargetOrId, Resource, User} from 'harperdb';

interface Pong {
	side: 'left'|'right';
	iteration: number;
	scored: boolean;
}

let side: 'left'|'right' = 'left';
let iteration: number = 0;

export class pong extends Resource<Pong> {
	private ping(target: RequestTargetOrId) {
		const id = (target as RequestTarget)?.id;
		console.log('... with id', id);
		console.log('');
		const scored = Math.random() >= 0.8;
		if (scored) {
			iteration = 0;
		} else {
			side = side === 'left' ? 'right' : 'left';
			iteration += 1;
		}
		return { side, iteration, scored };
	}

	/*
	 C
	 */
	allowCreate(user: User, record: Pong&RecordObject, target: RequestTarget): boolean|Promise<boolean> {
		console.log('allowCreate called');
		return super.allowCreate(user, record, target);
	}

	async post(newRecord: Partial<Pong&RecordObject>, target: RequestTargetOrId): Promise<void|(Pong&Partial<RecordObject>)> {
		console.log('post called', target, newRecord);
		return this.ping(target);
	}

	/*
	 R
	 */
	allowRead(user: User, target: RequestTarget): boolean|Promise<boolean> {
		console.log('allowRead called');
		return super.allowRead(user, target);
	}

	get(target?: RequestTargetOrId) {
		console.log('get called');
		return this.ping(target);
	}

	/*
	 U
	 */
	allowUpdate(user: User, record: Pong&RecordObject, target: RequestTarget): boolean|Promise<boolean> {
		console.log('allowUpdate called');
		return super.allowUpdate(user, record, target);
	}

	put(record: Pong&RecordObject, target: RequestTargetOrId) {
		console.log('put called', target, record);
		return this.ping(target);
	}

	patch(record: Partial<Pong&RecordObject>, target: RequestTargetOrId) {
		console.log('patch called', target, record);
		return this.ping(target);
	}

	/*
	 D
	 */
	allowDelete(user: User, target: RequestTarget): boolean|Promise<boolean> {
		console.log('allowDelete called');
		return super.allowDelete(user, target);
	}

	delete(target: RequestTargetOrId): boolean {
		console.log('delete called');
		const id = (target as RequestTarget)?.id;
		console.log('... with id', id);
		console.log('');
		iteration = 0;
		side = 'left';
		return true;
	}
}
