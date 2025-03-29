import { relations } from 'drizzle-orm';
import { timestamp, pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import { accounts } from './accounts';

export const roleEnum = pgEnum('role', ['Admin', 'Author', 'User']);

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	role: roleEnum('role').notNull().default('User'),
	salt: text('salt'),
	hashedPassword: text('hashedPassword'),
	createdAt: timestamp('createdAt', { mode: 'date' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: timestamp('updatedAt', { mode: 'date' })
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts)
}));
