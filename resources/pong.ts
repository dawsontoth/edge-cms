import {Context, RecordObject, RequestTarget, RequestTargetOrId, Resource, User} from 'harperdb';

interface Pong {
	side: 'left'|'right';
	iteration: number;
	scored: boolean;
}

let side: 'left'|'right' = 'left';
let iteration: number = 0;

export class pong extends Resource<Pong> {
	static loadAsInstance = false;

	private ping(target: RequestTargetOrId) {
		this.logId(target);
		const scored = Math.random() >= 0.8;
		if (scored) {
			iteration = 0;
		} else {
			side = side === 'left' ? 'right' : 'left';
			iteration += 1;
		}
		return { side, iteration, scored };
	}

	private logId(target: RequestTargetOrId) {
		const id = (target as RequestTarget)?.id;
		console.log('... with id', id);
		console.log('');
	}

	/*
	 C
	 */
	async allowCreate(user: User, record: Promise<Pong&RecordObject>, context: Context): Promise<boolean> {
		console.log('allowCreate called', await record);
		return super.allowCreate(user, record, context);
	}

	async post(target: RequestTargetOrId, newRecord: Partial<Pong&RecordObject>): Promise<void|(Pong&Partial<RecordObject>)> {
		console.log('post called');
		return this.ping(target);
	}

	/*
	 R
	 */
	allowRead(user: User, target: RequestTarget, context: Context): boolean|Promise<boolean> {
		console.log('allowRead called');
		this.logId(target);
		return super.allowRead(user, target, context);
	}

	get(target?: RequestTargetOrId) {
		console.log('get called');
		return this.ping(target);
	}

	/*
	 U
	 */
	async allowUpdate(user: User, record: Promise<Pong&RecordObject>, context: Context): Promise<boolean> {
		console.log('allowUpdate called', await record);
		return super.allowUpdate(user, record, context);
	}

	put(target: RequestTargetOrId, record: Pong&RecordObject) {
		console.log('put called', target, record);
		return this.ping(target);
	}

	patch(target: RequestTargetOrId, record: Partial<Pong&RecordObject>) {
		console.log('patch called', target, record);
		return this.ping(target);
	}

	/*
	 D
	 */
	allowDelete(user: User, target: RequestTarget, context: Context): boolean|Promise<boolean> {
		console.log('allowDelete called');
		this.logId(target);
		return super.allowDelete(user, target, context);
	}

	delete(target: RequestTargetOrId): boolean {
		console.log('delete called');
		this.logId(target);
		iteration = 0;
		side = 'left';
		return true;
	}
}
