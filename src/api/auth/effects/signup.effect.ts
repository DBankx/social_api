import { r, RouteEffect } from '@marblejs/http';
import { map, mergeMap } from 'rxjs/operators';
import { TUserDto } from '../dto/signup.dto';
import { AuthDao } from '../helpers/auth.dao';
import signupValidator from '../validators/signup.validator';
import makeApiResponse from '../../../utils/apiResponse.utils';
import bcrypt from 'bcryptjs';

const signup$: RouteEffect = r.pipe(
	r.matchPath('/signup'),
	r.matchType('POST'),
	r.useEffect(req$ => req$.pipe(
		signupValidator,
		map(req => req.body),
		mergeMap((user: any) => {
			const salt = bcrypt.genSaltSync(10);
			user.password = bcrypt.hashSync(user.password, salt);
			return AuthDao.createUser(user);
		}),
		map(body => ({body: makeApiResponse('User created successfully', null, true)})),
	))
)

export default signup$;