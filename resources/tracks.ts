import {Context, RequestTarget, RequestTargetOrId, tables, User} from 'harperdb/v2';

interface Track {
	id: string;
	name: string;
	album?: string;
	data: any;
	createdAt?: Date;
	updatedAt?: Date;
}

export class tracks extends tables.tracks<Track> {
	static loadAsInstance = false;

	create(target: RequestTarget, record: Partial<Track>) {
		if (record.data) {
			record.data = Buffer.from(record.data, 'base64');
		}
		return super.create(target, record);
	}

	private isAdmin(user?: User) {
		const role = user?.role;
		return !!user?.active && (role?.role === 'admin' || role?.role === 'super_user' || role?.permission?.super_user);
	}

	allowRead(user: User, target: RequestTarget, context: Context) {
		return true;
	}

	allowCreate(user: User, record: Track, context: Context) {
		return this.isAdmin(user);
	}

	allowUpdate(user: User, record: Track, context: Context) {
		return this.isAdmin(user);
	}

	allowDelete(user: User, target: RequestTarget, context: Context) {
		return this.isAdmin(user);
	}



// @ts-expect-error We are adapting the response a bit to not conform to the expected interface of tracks.
	async get(target: RequestTargetOrId) {
		const id = (target as RequestTarget)?.id ?? target;
		let record: AsyncIterable<Track>|Track;
		let track: Track;
		record = await super.get(target);
		if (isAsyncIterable(record)) {
			for await (const currentTrack of record) {
				track = currentTrack;
				// if (track.data) {
				// 	return record;
				// }
			}
		} else {
			track = record;
		}
		// if (Date.now()) {
		// 	return record;
		// }
		if (track?.data) {
			// const encoded = await track.data.text();
			// return {
			// 	status: 200,
			// 	headers: {
			// 		'Content-Type': 'audio/mpeg',
			// 		'Content-Disposition': 'inline; filename="Secure The Key.mp3"',
			// 	},
			// 	body: Buffer.from(encoded, 'base64'),
			// };
			return {
				status: 200,
				headers: {
					'Content-Type': 'audio/mpeg',
					'Content-Disposition': 'inline; filename="Secure The Key.mp3"',
				},
				body: track.data,
			};
		}
		return record;
	}
}

function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
	// @ts-ignore
	return value != null && typeof value[Symbol.asyncIterator] === 'function';
}
