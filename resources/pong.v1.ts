import {Context, RecordObject, RequestTarget, RequestTargetOrId, Resource, User} from 'harperdb';

interface Pong {
	side: 'left'|'right';
	iteration: number;
	scored: boolean;
}

let side: 'left'|'right' = 'left';
let iteration: number = 0;

export class pong_v1 extends Resource<Pong> {
	static loadAsInstance = true;

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
		console.log('v1 allowCreate called', await record);
		return super.allowCreate(user, record, context);
	}

	async post(target: RequestTargetOrId, newRecord: Partial<Pong&RecordObject>): Promise<(Pong&Partial<RecordObject>)> {
		console.log('v1 post called');
		return this.ping(target);
	}

	/*
	 R
	 */
	allowRead(user: User, target: RequestTarget, context: Context): boolean|Promise<boolean> {
		console.log('v1 allowRead called');
		this.logId(target);
		return super.allowRead(user, target, context);
	}

	get(target?: RequestTargetOrId) {
		console.log('v1 get called');
		return this.ping(target);
	}

	/*
	 U
	 */
	async allowUpdate(user: User, record: Promise<Pong&RecordObject>, context: Context): Promise<boolean> {
		console.log('v1 allowUpdate called', await record);
		return super.allowUpdate(user, record, context);
	}

	put(record: Pong&RecordObject, target: RequestTargetOrId) {
		console.log('v1 put called', target, record);
		return this.ping(target);
	}

	patch(record: Partial<Pong&RecordObject>, target: RequestTargetOrId) {
		console.log('v1 patch called', target, record);
		return this.ping(target);
	}

	/*
	 D
	 */
	allowDelete(user: User, target: RequestTarget, context: Context): boolean|Promise<boolean> {
		console.log('v1 allowDelete called');
		this.logId(target);
		return super.allowDelete(user, target, context);
	}

	delete(target: RequestTargetOrId): boolean {
		console.log('v1 delete called');
		this.logId(target);
		iteration = 0;
		side = 'left';
		return true;
	}
}
