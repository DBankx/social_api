import { t } from '@marblejs/middleware-io';

interface PasswordBrand {
	readonly password: unique symbol;
}

interface EmailBrand {
	readonly email: unique symbol;
}

export const UserDto = t.type({
	email: t.brand(
		t.string,
		(email): email is t.Branded<string, EmailBrand> =>  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
		'email'
	),
	password: t.brand(
		t.string,
		(password): password is t.Branded<string, PasswordBrand> => password.length >= 9,
		'password'
	)
})

export type TUserDto = t.TypeOf<typeof UserDto>;