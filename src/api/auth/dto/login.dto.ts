import { t } from '@marblejs/middleware-io';

export const LoginDto = t.type({
	email: t.string,
	password: t.string
})

export type TLoginDto = t.TypeOf<typeof LoginDto>