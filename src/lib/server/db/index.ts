import { drizzle } from 'drizzle-orm/neon-http';
import * as userSchema from './schemas/users';
import * as postSchema from './schemas/posts';
import * as accountsSchema from './schemas/accounts';
import * as commentsSchema from './schemas/comments';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle(env.DATABASE_URL, {
	schema: {
		...userSchema,
		...postSchema,
		...accountsSchema,
		...commentsSchema
	}
});
