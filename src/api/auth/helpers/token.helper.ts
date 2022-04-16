import { generateExpirationInHours } from '@marblejs/middleware-jwt';
import { User } from '@prisma/client';

export default function(user: User){
	return {
		uuid: user.uuid,
		email: user.email,
		username: user.username,
		exp: generateExpirationInHours(4)
	}
};
